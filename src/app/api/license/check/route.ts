import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { hasActiveLicense, getUserLicenseType } from '@/lib/license';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({
        hasLicense: false,
        licenseType: 'none',
      });
    }

    const hasLicense = await hasActiveLicense(session.user.id);
    const licenseType = await getUserLicenseType(session.user.id);

    return NextResponse.json({
      hasLicense,
      licenseType,
    });
  } catch (error) {
    console.error('Error checking license:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
