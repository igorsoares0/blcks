import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (!checkoutSession) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 404 }
      );
    }

    // Verify this session belongs to the current user
    if (checkoutSession.metadata?.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Session does not belong to this user' },
        { status: 403 }
      );
    }

    const plan = checkoutSession.metadata?.plan;
    const isTemplate = plan?.startsWith('template-');

    // Check if license was created (for license purchases)
    let licenseCreated = false;
    let templatePurchased = false;

    if (isTemplate) {
      // Check if template purchase was created
      const templatePurchase = await db.templatePurchase.findFirst({
        where: {
          stripePaymentIntentId: checkoutSession.payment_intent as string,
        },
      });
      templatePurchased = !!templatePurchase;
    } else {
      // Check if license was created
      const license = await db.license.findFirst({
        where: {
          stripePaymentId: sessionId,
        },
      });
      licenseCreated = !!license;
    }

    return NextResponse.json({
      status: checkoutSession.payment_status,
      customerEmail: checkoutSession.customer_details?.email,
      licenseCreated,
      templatePurchased,
      isTemplate,
      plan,
      amount: checkoutSession.amount_total ? checkoutSession.amount_total / 100 : 0,
    });
  } catch (error) {
    console.error('Error verifying session:', error);

    return NextResponse.json(
      { error: 'Failed to verify session' },
      { status: 500 }
    );
  }
}
