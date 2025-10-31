import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { stripe, PLAN_DETAILS, PlanType } from '@/lib/stripe';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';
import { hasActiveLicense } from '@/lib/license';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(req.headers);
    const rateLimitResult = checkRateLimit({
      identifier,
      action: 'checkout',
      maxRequests: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many checkout attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Check authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to purchase' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { plan } = body as { plan: PlanType };

    // Validate plan
    if (!plan || !['individual', 'team', 'template-dashboard', 'template-landing'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Check if user already has a license (only for license plans, not templates)
    if (plan === 'individual' || plan === 'team') {
      const alreadyHasLicense = await hasActiveLicense(session.user.id);

      if (alreadyHasLicense) {
        return NextResponse.json(
          { error: 'You already have an active license' },
          { status: 400 }
        );
      }
    }

    // Get plan details
    const planDetails = PLAN_DETAILS[plan];

    if (!planDetails.priceId) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add price IDs to environment variables.' },
        { status: 500 }
      );
    }

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: planDetails.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/purchase/cancelled`,
      customer_email: session.user.email || undefined,
      metadata: {
        userId: session.user.id,
        userEmail: session.user.email || '',
        userName: session.user.name || '',
        plan,
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
