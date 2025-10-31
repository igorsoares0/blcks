import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('[Template Download] Starting download request...');

    const session = await auth();
    console.log('[Template Download] Session:', session?.user?.email || 'No session');

    if (!session?.user?.email) {
      console.log('[Template Download] Unauthorized - no session');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: templateId } = await params;
    console.log('[Template Download] Template ID:', templateId);

    // Validate template ID
    if (!['dashboard', 'landing'].includes(templateId)) {
      console.log('[Template Download] Invalid template ID');
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

    console.log('[Template Download] User:', {
      id: user?.id,
      hasActiveLicense: user?.hasActiveLicense,
      licenseType: user?.licenseType,
    });

    if (!user) {
      console.log('[Template Download] User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user has access (license or purchase)
    let hasAccess = false;
    let accessReason = '';

    // Check license
    if (user.hasActiveLicense && (user.licenseType === 'individual' || user.licenseType === 'team')) {
      hasAccess = true;
      accessReason = 'license';
    }

    // Check individual template purchase
    if (!hasAccess) {
      const templatePurchase = await db.templatePurchase.findUnique({
        where: {
          userId_templateId: {
            userId: user.id,
            templateId: templateId,
          },
        },
      });

      if (templatePurchase) {
        hasAccess = true;
        accessReason = 'purchase';
      }
    }

    console.log('[Template Download] Access check:', { hasAccess, accessReason });

    if (!hasAccess) {
      console.log('[Template Download] Access denied');
      return NextResponse.json(
        { error: 'You do not have access to this template. Please purchase it or upgrade your license.' },
        { status: 403 }
      );
    }

    // Read the template file
    const filePath = join(process.cwd(), 'storage', 'templates', `${templateId}.zip`);
    console.log('[Template Download] File path:', filePath);

    try {
      const fileBuffer = await readFile(filePath);
      console.log('[Template Download] File loaded, size:', fileBuffer.length, 'bytes');

      // Return the file as a download
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${templateId}-template.zip"`,
          'Content-Length': fileBuffer.length.toString(),
        },
      });
    } catch (fileError) {
      console.error('[Template Download] File read error:', fileError);
      return NextResponse.json(
        { error: 'Template file not found. Please contact support.' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('[Template Download] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to download template' },
      { status: 500 }
    );
  }
}
