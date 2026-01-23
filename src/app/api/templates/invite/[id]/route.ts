import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getTemplateConfig, isValidTemplateId } from '@/lib/templates-config';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: templateId } = await params;
    const body = await request.json();
    const { githubUsername } = body;

    // Validate template ID
    if (!isValidTemplateId(templateId)) {
      return NextResponse.json({ error: 'Invalid template ID' }, { status: 400 });
    }

    // Validate GitHub username
    if (!githubUsername || typeof githubUsername !== 'string') {
      return NextResponse.json({ error: 'GitHub username is required' }, { status: 400 });
    }

    const cleanUsername = githubUsername.trim().replace(/^@/, '');
    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(cleanUsername)) {
      return NextResponse.json({ error: 'Invalid GitHub username format' }, { status: 400 });
    }

    // Check GitHub token
    if (!GITHUB_TOKEN) {
      console.error('[Template Invite] GITHUB_TOKEN not configured');
      return NextResponse.json(
        { error: 'GitHub integration not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Get user and check access
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        hasActiveLicense: true,
        licenseType: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user has access (license or purchase)
    let hasAccess = false;

    if (user.hasActiveLicense && (user.licenseType === 'individual' || user.licenseType === 'team')) {
      hasAccess = true;
    }

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
      }
    }

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'You do not have access to this template. Please purchase it or upgrade your license.' },
        { status: 403 }
      );
    }

    // Get template config
    const templateConfig = getTemplateConfig(templateId);
    if (!templateConfig) {
      return NextResponse.json({ error: 'Template configuration not found' }, { status: 500 });
    }

    // Send GitHub invitation
    const [owner, repo] = templateConfig.githubRepo.split('/');

    const githubResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/collaborators/${cleanUsername}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          permission: 'pull', // Read-only access
        }),
      }
    );

    if (githubResponse.status === 201) {
      // Invitation created successfully
      return NextResponse.json({
        success: true,
        message: `Invitation sent! Check your GitHub notifications or email (${cleanUsername}@users.noreply.github.com) to accept the invitation.`,
        status: 'invited',
      });
    } else if (githubResponse.status === 204) {
      // User is already a collaborator
      return NextResponse.json({
        success: true,
        message: `You already have access to this repository! Visit github.com/${templateConfig.githubRepo} to view it.`,
        status: 'already_collaborator',
        repoUrl: `https://github.com/${templateConfig.githubRepo}`,
      });
    } else if (githubResponse.status === 404) {
      // User not found or repo not found
      const errorData = await githubResponse.json().catch(() => ({}));

      // Check if it's a user not found error
      const userCheckResponse = await fetch(`https://api.github.com/users/${cleanUsername}`, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (userCheckResponse.status === 404) {
        return NextResponse.json(
          { error: `GitHub user "${cleanUsername}" not found. Please check the username and try again.` },
          { status: 400 }
        );
      }

      console.error('[Template Invite] GitHub 404 error:', errorData);
      return NextResponse.json(
        { error: 'Repository not found. Please contact support.' },
        { status: 500 }
      );
    } else if (githubResponse.status === 422) {
      // Validation failed (e.g., user has pending invitation)
      return NextResponse.json({
        success: true,
        message: `An invitation is already pending for ${cleanUsername}. Check your GitHub notifications or email to accept it.`,
        status: 'pending',
      });
    } else {
      const errorData = await githubResponse.json().catch(() => ({}));
      console.error('[Template Invite] GitHub API error:', githubResponse.status, errorData);
      return NextResponse.json(
        { error: 'Failed to send invitation. Please try again or contact support.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[Template Invite] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to process invitation request' },
      { status: 500 }
    );
  }
}
