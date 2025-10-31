import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email/send';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('No Stripe signature found');
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Processing checkout.session.completed:', session.id);

  const userId = session.metadata?.userId;
  const userEmail = session.metadata?.userEmail;
  const userName = session.metadata?.userName;
  const plan = session.metadata?.plan;

  if (!userId || !plan) {
    console.error('Missing metadata in checkout session:', session.id);
    return;
  }

  // Check if this is a template purchase
  if (plan.startsWith('template-')) {
    await handleTemplatePurchase(session, userId, userEmail, userName || 'there');
    return;
  }

  try {
    // Check if license already exists for this session (prevent duplicate processing)
    const existingLicense = await db.license.findFirst({
      where: { stripePaymentId: session.id },
    });

    if (existingLicense) {
      console.log('License already exists for session:', session.id);
      return;
    }

    // Determine team seats
    const teamSeats = plan === 'team' ? 5 : 1;

    // Upsert license (update if user already has one, create if not)
    const license = await db.license.upsert({
      where: { userId },
      update: {
        type: plan,
        stripePaymentId: session.id,
        stripeCustomerId: session.customer as string,
        status: 'active',
        teamSeats,
        expiresAt: null, // lifetime
        purchasedAt: new Date(),
      },
      create: {
        userId,
        type: plan,
        stripePaymentId: session.id,
        stripeCustomerId: session.customer as string,
        status: 'active',
        teamSeats,
        expiresAt: null, // lifetime
      },
    });

    // Update user cache fields
    await db.user.update({
      where: { id: userId },
      data: {
        hasActiveLicense: true,
        licenseType: plan,
      },
    });

    console.log('License created successfully:', license.id);

    // Send confirmation email
    if (userEmail) {
      try {
        await sendEmail({
          to: userEmail,
          subject: '🎉 Welcome to Blcks Premium!',
          html: generateConfirmationEmail(userName || 'there', plan, license.id),
        });
        console.log('Confirmation email sent to:', userEmail);
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't throw - license is created, email is secondary
      }
    }
  } catch (error) {
    console.error('Error creating license:', error);
    throw error;
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  console.log('Processing charge.refunded:', charge.id);

  try {
    // Find the checkout session for this charge
    const sessions = await stripe.checkout.sessions.list({
      payment_intent: charge.payment_intent as string,
      limit: 1,
    });

    if (sessions.data.length === 0) {
      console.log('No checkout session found for charge:', charge.id);
      return;
    }

    const session = sessions.data[0];

    // Find and deactivate license
    const license = await db.license.findFirst({
      where: { stripePaymentId: session.id },
      include: { user: true },
    });

    if (!license) {
      console.log('No license found for session:', session.id);
      return;
    }

    // Deactivate license
    await db.license.update({
      where: { id: license.id },
      data: { status: 'refunded' },
    });

    // Check if user has any other active licenses
    const otherActiveLicense = await db.license.findFirst({
      where: {
        userId: license.userId,
        status: 'active',
        id: { not: license.id },
      },
    });

    // Also check if user is a team member with active license
    const teamMembership = await db.teamMember.findFirst({
      where: {
        userId: license.userId,
        status: 'active',
      },
      include: {
        license: true,
      },
    });

    const hasOtherAccess = otherActiveLicense || (teamMembership && teamMembership.license.status === 'active');

    // Update user cache fields only if no other access
    if (!hasOtherAccess) {
      await db.user.update({
        where: { id: license.userId },
        data: {
          hasActiveLicense: false,
          licenseType: null,
        },
      });
    }

    console.log('License deactivated:', license.id);

    // Send refund notification email
    if (license.user.email) {
      try {
        await sendEmail({
          to: license.user.email,
          subject: 'Blcks License Refunded',
          html: generateRefundEmail(license.user.name || 'there'),
        });
        console.log('Refund email sent to:', license.user.email);
      } catch (emailError) {
        console.error('Failed to send refund email:', emailError);
      }
    }
  } catch (error) {
    console.error('Error handling refund:', error);
    throw error;
  }
}

function generateConfirmationEmail(userName: string, plan: string, licenseId: string): string {
  const planName = plan === 'individual' ? 'Individual' : 'Team';
  const appUrl = process.env.APP_URL || 'http://localhost:3000';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Blcks Premium</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" width="100%" cellspacing="0" cellpadding="0" border="0">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                🎉 Welcome to Blcks Premium!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Hi ${userName},
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Thank you for purchasing <strong>Blcks ${planName} License</strong>! Your payment has been processed successfully, and you now have lifetime access to all premium blocks.
              </p>

              <!-- Features Box -->
              <table role="presentation" style="width: 100%; margin: 30px 0; background-color: #f3f4f6; border-radius: 8px; padding: 20px;" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 15px; color: #1f2937; font-size: 18px; font-weight: 600;">
                      What You Get:
                    </h2>
                    <ul style="margin: 0; padding: 0 0 0 20px; color: #374151; font-size: 15px; line-height: 1.8;">
                      <li>Access to all <strong>110 premium blocks</strong></li>
                      <li><strong>Lifetime</strong> license with free updates</li>
                      <li>19 categories of production-ready components</li>
                      <li>TypeScript support included</li>
                      <li>Dark mode compatible</li>
                      <li>Mobile responsive designs</li>
                      <li>Commercial use license</li>
                      ${plan === 'team' ? '<li>Up to <strong>5 team members</strong></li>' : ''}
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0;" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="text-align: center;">
                    <a href="${appUrl}/" style="display: inline-block; padding: 14px 32px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Browse All Blocks
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Your license ID is: <code style="background-color: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 14px;">${licenseId}</code>
              </p>

              ${plan === 'team' ? `
              <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                <p style="margin: 0; color: #1e40af; font-size: 15px; line-height: 1.6;">
                  <strong>Next Step:</strong> Visit your dashboard to invite up to 5 team members to your license.
                </p>
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                Questions? Reply to this email or contact us at support@blcks.com
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Blcks - Premium React Blocks Library
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

async function handleTemplatePurchase(
  session: Stripe.Checkout.Session,
  userId: string,
  userEmail: string | undefined,
  userName: string
) {
  console.log('Processing template purchase:', session.id);

  const plan = session.metadata?.plan;
  const templateId = plan?.replace('template-', ''); // "template-dashboard" -> "dashboard"

  if (!templateId || !['dashboard', 'landing'].includes(templateId)) {
    console.error('Invalid template ID in metadata:', plan);
    return;
  }

  try {
    // Check if template purchase already exists (prevent duplicate)
    const existingPurchase = await db.templatePurchase.findUnique({
      where: { stripePaymentIntentId: session.payment_intent as string },
    });

    if (existingPurchase) {
      console.log('Template purchase already exists:', session.id);
      return;
    }

    // Create template purchase record
    const purchase = await db.templatePurchase.create({
      data: {
        userId,
        templateId,
        stripePaymentIntentId: session.payment_intent as string,
      },
    });

    console.log('Template purchase created successfully:', purchase.id);

    // Send confirmation email
    if (userEmail) {
      try {
        await sendEmail({
          to: userEmail,
          subject: '🎉 Your Template is Ready to Download!',
          html: generateTemplatePurchaseEmail(userName, templateId),
        });
        console.log('Template purchase email sent to:', userEmail);
      } catch (emailError) {
        console.error('Failed to send template purchase email:', emailError);
      }
    }
  } catch (error) {
    console.error('Error creating template purchase:', error);
    throw error;
  }
}

function generateTemplatePurchaseEmail(userName: string, templateId: string): string {
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const templateName = templateId === 'dashboard' ? 'Modern Dashboard' : 'SaaS Landing Page';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template Ready to Download</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" width="100%" cellspacing="0" cellpadding="0" border="0">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                🎉 Template Ready!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Hi ${userName},
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Thank you for purchasing the <strong>${templateName}</strong> template! Your payment has been processed successfully.
              </p>

              <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 10px; color: #1f2937; font-size: 18px; font-weight: 600;">
                  ${templateName}
                </p>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  Production-ready template
                </p>
              </div>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0;" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="text-align: center;">
                    <a href="${appUrl}/dashboard" style="display: inline-block; padding: 14px 32px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Download Template
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center;">
                Visit your dashboard to download the template .zip file
              </p>

              <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
                  <strong>What's included:</strong> Complete source code, documentation, and all assets. Lifetime updates included!
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                Questions? Reply to this email or contact us at support@blcks.com
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Blcks - Premium React Templates
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function generateRefundEmail(userName: string): string {
  const appUrl = process.env.APP_URL || 'http://localhost:3000';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blcks License Refunded</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" width="100%" cellspacing="0" cellpadding="0" border="0">

          <!-- Header -->
          <tr>
            <td style="background-color: #f59e0b; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                License Refunded
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Hi ${userName},
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Your Blcks license has been refunded. Your access to premium blocks has been deactivated.
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                The refund will be processed back to your original payment method within 5-10 business days.
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                You can still access our <strong>33 free blocks</strong> and purchase again anytime.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0;" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="text-align: center;">
                    <a href="${appUrl}/" style="display: inline-block; padding: 14px 32px; background-color: #6b7280; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Browse Free Blocks
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                Questions? Contact us at support@blcks.com
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Blcks - Premium React Blocks Library
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
