'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { isValidEmail } from '@/lib/validation';
import { sendEmail } from '@/lib/email/send';
import crypto from 'crypto';

export async function inviteTeamMember(email: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Validate email
    if (!isValidEmail(email)) {
      return { success: false, error: 'Invalid email address' };
    }

    // Check if user owns a team license
    const license = await db.license.findFirst({
      where: {
        userId: session.user.id,
        type: 'team',
        status: 'active',
      },
      include: {
        teamMembers: true,
      },
    });

    if (!license) {
      return { success: false, error: 'You do not have an active team license' };
    }

    // Check if team is full
    const activeMembers = license.teamMembers.filter(
      (m) => m.status === 'active' || m.status === 'invited'
    );

    if (activeMembers.length >= license.teamSeats) {
      return {
        success: false,
        error: `Team is full. Maximum ${license.teamSeats} members allowed.`,
      };
    }

    // Check if email is already invited or is a member
    const existingMember = license.teamMembers.find(
      (m) => m.invitedEmail === email && (m.status === 'active' || m.status === 'invited')
    );

    if (existingMember) {
      return { success: false, error: 'This email has already been invited' };
    }

    // Check if email belongs to the owner
    if (email === session.user.email) {
      return { success: false, error: 'You cannot invite yourself' };
    }

    // Generate invite token
    const inviteToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    // Create team member invite
    const teamMember = await db.teamMember.create({
      data: {
        licenseId: license.id,
        invitedEmail: email,
        role: 'member',
        status: 'invited',
        inviteToken,
        inviteExpiresAt: expiresAt,
      },
    });

    // Send invite email
    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const signupUrl = `${appUrl}/auth/signup?inviteEmail=${encodeURIComponent(email)}&inviteToken=${inviteToken}`;
    const acceptUrl = `${appUrl}/team/accept-invite?token=${inviteToken}`;

    await sendEmail({
      to: email,
      subject: `${session.user.name} invited you to join their Blcks team`,
      html: generateInviteEmail(
        session.user.name || session.user.email || 'A team member',
        email,
        signupUrl,
        acceptUrl,
        expiresAt
      ),
    });

    return {
      success: true,
      message: 'Invite sent successfully',
      teamMember: {
        id: teamMember.id,
        email: teamMember.invitedEmail,
        status: teamMember.status,
      },
    };
  } catch (error) {
    console.error('Error inviting team member:', error);
    return { success: false, error: 'Failed to send invite' };
  }
}

export async function removeTeamMember(memberId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Get team member
    const teamMember = await db.teamMember.findUnique({
      where: { id: memberId },
      include: {
        license: true,
      },
    });

    if (!teamMember) {
      return { success: false, error: 'Team member not found' };
    }

    // Verify ownership
    if (teamMember.license.userId !== session.user.id) {
      return { success: false, error: 'You can only remove members from your own team' };
    }

    // Delete team member
    await db.teamMember.delete({
      where: { id: memberId },
    });

    // If user was active, update their cache
    if (teamMember.userId) {
      // Check if user has other active licenses
      const otherLicense = await db.license.findFirst({
        where: {
          userId: teamMember.userId,
          status: 'active',
        },
      });

      const otherTeamMembership = await db.teamMember.findFirst({
        where: {
          userId: teamMember.userId,
          status: 'active',
          id: { not: memberId },
        },
        include: { license: true },
      });

      const hasOtherAccess =
        otherLicense || (otherTeamMembership && otherTeamMembership.license.status === 'active');

      if (!hasOtherAccess) {
        await db.user.update({
          where: { id: teamMember.userId },
          data: {
            hasActiveLicense: false,
            licenseType: null,
          },
        });
      }
    }

    return { success: true, message: 'Team member removed successfully' };
  } catch (error) {
    console.error('Error removing team member:', error);
    return { success: false, error: 'Failed to remove team member' };
  }
}

export async function acceptInvite(token: string) {
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return { success: false, error: 'You must be logged in to accept an invite' };
    }

    // Find invite
    const teamMember = await db.teamMember.findFirst({
      where: {
        inviteToken: token,
        status: 'invited',
      },
      include: {
        license: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!teamMember) {
      console.log('No team member found for token:', token);
      return { success: false, error: 'Invalid or expired invite' };
    }

    console.log('Team member found:', {
      id: teamMember.id,
      invitedEmail: teamMember.invitedEmail,
      status: teamMember.status,
      inviteExpiresAt: teamMember.inviteExpiresAt
    });

    // Check expiry
    if (teamMember.inviteExpiresAt && teamMember.inviteExpiresAt < new Date()) {
      return { success: false, error: 'This invite has expired' };
    }

    // Verify email matches (case-insensitive comparison)
    const invitedEmail = teamMember.invitedEmail.toLowerCase().trim();
    const sessionEmail = session.user.email.toLowerCase().trim();

    console.log('Email comparison:', {
      invitedEmail,
      sessionEmail,
      match: invitedEmail === sessionEmail
    });

    if (invitedEmail !== sessionEmail) {
      return {
        success: false,
        error: `This invite was sent to ${teamMember.invitedEmail}, but you are logged in as ${session.user.email}. Please log in with the correct email address.`,
      };
    }

    // Check if license is still active
    if (teamMember.license.status !== 'active') {
      return { success: false, error: 'This team license is no longer active' };
    }

    // Check if team is full
    const activeMembers = await db.teamMember.count({
      where: {
        licenseId: teamMember.licenseId,
        status: 'active',
      },
    });

    if (activeMembers >= teamMember.license.teamSeats) {
      return { success: false, error: 'This team is full' };
    }

    // Accept invite
    await db.teamMember.update({
      where: { id: teamMember.id },
      data: {
        userId: session.user.id,
        status: 'active',
        inviteToken: null,
        inviteExpiresAt: null,
      },
    });

    // Update user cache
    await db.user.update({
      where: { id: session.user.id },
      data: {
        hasActiveLicense: true,
        licenseType: 'team',
      },
    });

    // Send confirmation email to owner
    await sendEmail({
      to: teamMember.license.user.email!,
      subject: `${session.user.name || session.user.email} joined your Blcks team`,
      html: generateAcceptedEmail(
        teamMember.license.user.name || 'there',
        session.user.name || session.user.email
      ),
    });

    return {
      success: true,
      message: 'Successfully joined the team!',
      ownerName: teamMember.license.user.name,
    };
  } catch (error) {
    console.error('Error accepting invite:', error);
    return { success: false, error: 'Failed to accept invite' };
  }
}

// Auto-accept pending invites for a user (used after signup/login)
export async function autoAcceptPendingInvites(userId: string, userEmail: string) {
  try {
    // Find all pending invites for this email
    const pendingInvites = await db.teamMember.findMany({
      where: {
        invitedEmail: userEmail.toLowerCase().trim(),
        status: 'invited',
        inviteExpiresAt: {
          gte: new Date(), // Not expired
        },
      },
      include: {
        license: {
          include: {
            user: true,
          },
        },
      },
    });

    if (pendingInvites.length === 0) {
      return { success: true, accepted: 0 };
    }

    let acceptedCount = 0;
    const ownerNames: string[] = [];

    for (const invite of pendingInvites) {
      // Check if license is still active
      if (invite.license.status !== 'active') {
        continue;
      }

      // Check if team is not full
      const activeMembers = await db.teamMember.count({
        where: {
          licenseId: invite.licenseId,
          status: 'active',
        },
      });

      if (activeMembers >= invite.license.teamSeats) {
        continue;
      }

      // Accept the invite
      await db.teamMember.update({
        where: { id: invite.id },
        data: {
          userId,
          status: 'active',
          joinedAt: new Date(),
          inviteToken: null,
          inviteExpiresAt: null,
        },
      });

      acceptedCount++;
      if (invite.license.user.name) {
        ownerNames.push(invite.license.user.name);
      }

      // Send confirmation email to owner
      await sendEmail({
        to: invite.license.user.email!,
        subject: `${userEmail} joined your Blcks team`,
        html: generateAcceptedEmail(
          invite.license.user.name || 'there',
          userEmail
        ),
      });
    }

    // Update user cache if any invites were accepted
    if (acceptedCount > 0) {
      await db.user.update({
        where: { id: userId },
        data: {
          hasActiveLicense: true,
          licenseType: 'team',
        },
      });
    }

    return {
      success: true,
      accepted: acceptedCount,
      ownerNames,
    };
  } catch (error) {
    console.error('Error auto-accepting invites:', error);
    return { success: false, accepted: 0, error: 'Failed to accept invites' };
  }
}

export async function getMyTeamLicense() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const license = await db.license.findFirst({
      where: {
        userId: session.user.id,
        type: 'team',
        status: 'active',
      },
      include: {
        teamMembers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            invitedAt: 'asc',
          },
        },
      },
    });

    if (!license) {
      return { success: false, error: 'No team license found' };
    }

    return {
      success: true,
      license: {
        id: license.id,
        type: license.type,
        teamSeats: license.teamSeats,
        purchasedAt: license.purchasedAt,
        members: license.teamMembers.map((m) => ({
          id: m.id,
          email: m.user?.email || m.invitedEmail,
          name: m.user?.name,
          status: m.status,
          role: m.role,
          inviteExpiresAt: m.inviteExpiresAt,
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching team license:', error);
    return { success: false, error: 'Failed to fetch team license' };
  }
}

// Get individual license info
export async function getMyIndividualLicense() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const license = await db.license.findFirst({
      where: {
        userId: session.user.id,
        type: 'individual',
        status: 'active',
      },
    });

    if (!license) {
      return { success: false, error: 'No individual license found' };
    }

    return {
      success: true,
      license: {
        id: license.id,
        type: license.type,
        status: license.status,
        purchasedAt: license.purchasedAt,
      },
    };
  } catch (error) {
    console.error('Error fetching individual license:', error);
    return { success: false, error: 'Failed to fetch individual license' };
  }
}

// Get team membership info if user is a member (not owner)
export async function getMyTeamMembership() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const membership = await db.teamMember.findFirst({
      where: {
        userId: session.user.id,
        status: 'active',
      },
      include: {
        license: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            teamMembers: {
              where: {
                status: 'active',
              },
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!membership || membership.license.status !== 'active') {
      return { success: false, error: 'No active team membership found' };
    }

    return {
      success: true,
      membership: {
        id: membership.id,
        role: membership.role,
        joinedAt: membership.joinedAt,
        teamOwner: {
          name: membership.license.user.name,
          email: membership.license.user.email,
        },
        license: {
          id: membership.license.id,
          type: membership.license.type,
          teamSeats: membership.license.teamSeats,
          purchasedAt: membership.license.purchasedAt,
        },
        teamMembers: membership.license.teamMembers.map((m) => ({
          id: m.id,
          email: m.user?.email || m.invitedEmail,
          name: m.user?.name,
          isMe: m.userId === session.user.id,
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching team membership:', error);
    return { success: false, error: 'Failed to fetch team membership' };
  }
}

function generateInviteEmail(
  inviterName: string,
  inviteeEmail: string,
  signupUrl: string,
  acceptUrl: string,
  expiresAt: Date
): string {
  const expiryDate = expiresAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Invite - Blcks</title>
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
                👥 Team Invite
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Hi there,
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                <strong>${inviterName}</strong> has invited you to join their Blcks team license!
              </p>

              <table role="presentation" style="width: 100%; margin: 30px 0; background-color: #f3f4f6; border-radius: 8px; padding: 20px;" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 15px; color: #1f2937; font-size: 18px; font-weight: 600;">
                      What You'll Get:
                    </h2>
                    <ul style="margin: 0; padding: 0 0 0 20px; color: #374151; font-size: 15px; line-height: 1.8;">
                      <li>Access to all <strong>110 premium blocks</strong></li>
                      <li><strong>Lifetime</strong> access with free updates</li>
                      <li>19 categories of production-ready components</li>
                      <li>TypeScript support included</li>
                      <li>Dark mode compatible</li>
                      <li>Commercial use license</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- CTA Buttons -->
              <table role="presentation" style="margin: 30px 0;" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="text-align: center;">
                    <a href="${signupUrl}" style="display: inline-block; padding: 14px 32px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; margin-bottom: 12px;">
                      Create Account & Join Team
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding-top: 8px;">
                    <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">Already have an account?</p>
                    <a href="${acceptUrl}" style="display: inline-block; padding: 12px 28px; background-color: transparent; color: #667eea; text-decoration: none; border: 2px solid #667eea; border-radius: 6px; font-weight: 600; font-size: 14px;">
                      Log In & Accept Invite
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center;">
                This invite expires on <strong>${expiryDate}</strong>
              </p>

              <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  <strong>Note:</strong> You need to log in or create an account with <strong>${inviteeEmail}</strong> to accept this invite.
                </p>
              </div>
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

function generateAcceptedEmail(ownerName: string, memberName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Member Joined - Blcks</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" width="100%" cellspacing="0" cellpadding="0" border="0">

          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                ✓ Team Member Joined
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Hi ${ownerName},
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Great news! <strong>${memberName}</strong> has accepted your invite and joined your Blcks team.
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                They now have access to all premium blocks under your team license.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0;" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="text-align: center;">
                    <a href="${process.env.APP_URL}/dashboard" style="display: inline-block; padding: 14px 32px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      View Team Dashboard
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
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
