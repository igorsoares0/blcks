import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ hasAccess: false, reason: 'not_authenticated' }, { status: 401 });
    }

    const templateId = request.nextUrl.searchParams.get('templateId');

    if (!templateId) {
      return NextResponse.json({ error: 'Template ID is required' }, { status: 400 });
    }

    // Validate template ID
    if (!['dashboard', 'landing'].includes(templateId)) {
      return NextResponse.json({ error: 'Invalid template ID' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        hasActiveLicense: true,
        licenseType: true,
      },
    });

    if (!user) {
      return NextResponse.json({ hasAccess: false, reason: 'user_not_found' }, { status: 404 });
    }

    // Check if user has premium license (individual or team)
    if (user.hasActiveLicense && (user.licenseType === 'individual' || user.licenseType === 'team')) {
      return NextResponse.json({
        hasAccess: true,
        reason: 'license',
        licenseType: user.licenseType,
      });
    }

    // Check if user purchased this specific template
    const templatePurchase = await db.templatePurchase.findUnique({
      where: {
        userId_templateId: {
          userId: user.id,
          templateId: templateId,
        },
      },
    });

    if (templatePurchase) {
      return NextResponse.json({
        hasAccess: true,
        reason: 'purchase',
        purchasedAt: templatePurchase.purchasedAt,
      });
    }

    // No access
    return NextResponse.json({
      hasAccess: false,
      reason: 'no_license_or_purchase',
    });
  } catch (error) {
    console.error('Check access error:', error);
    return NextResponse.json(
      { error: 'Failed to check access' },
      { status: 500 }
    );
  }
}
