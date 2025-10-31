import { db } from './db';
import { isBlockPremium } from './blocks-registry';

/**
 * Get user's active license
 */
export async function getUserLicense(userId: string) {
  if (!userId) {
    return null;
  }

  const license = await db.license.findUnique({
    where: {
      userId,
      status: 'active',
    },
    include: {
      teamMembers: {
        where: {
          status: 'active',
        },
      },
    },
  });

  return license;
}

/**
 * Check if user has an active license (individual or team)
 */
export async function hasActiveLicense(userId: string): Promise<boolean> {
  if (!userId) {
    return false;
  }

  // Check if user owns a license
  const ownedLicense = await db.license.findFirst({
    where: {
      userId,
      status: 'active',
    },
  });

  if (ownedLicense) {
    return true;
  }

  // Check if user is a member of an active team
  const teamMembership = await db.teamMember.findFirst({
    where: {
      userId,
      status: 'active',
    },
    include: {
      license: true,
    },
  });

  if (teamMembership && teamMembership.license.status === 'active') {
    return true;
  }

  return false;
}

/**
 * Get user's license type
 */
export async function getUserLicenseType(userId: string): Promise<'none' | 'individual' | 'team'> {
  if (!userId) {
    return 'none';
  }

  // Check if user owns a license
  const ownedLicense = await db.license.findFirst({
    where: {
      userId,
      status: 'active',
    },
  });

  if (ownedLicense) {
    return ownedLicense.type as 'individual' | 'team';
  }

  // Check if user is a team member
  const teamMembership = await db.teamMember.findFirst({
    where: {
      userId,
      status: 'active',
    },
    include: {
      license: true,
    },
  });

  if (teamMembership && teamMembership.license.status === 'active') {
    return 'team';
  }

  return 'none';
}

/**
 * Check if user can access a specific block
 * Returns true if:
 * - Block is free (not premium)
 * - User has an active license (individual or team)
 */
export async function canAccessBlock(userId: string | null | undefined, blockId: string): Promise<boolean> {
  // Check if block is premium
  const isPremium = isBlockPremium(blockId);

  // If block is free, everyone can access
  if (!isPremium) {
    return true;
  }

  // Block is premium, user must have license
  if (!userId) {
    return false;
  }

  // Check if user has active license
  const hasLicense = await hasActiveLicense(userId);
  return hasLicense;
}

/**
 * Get user's license details including team info
 */
export async function getUserLicenseDetails(userId: string) {
  if (!userId) {
    return null;
  }

  // Check if user owns a license
  const ownedLicense = await db.license.findFirst({
    where: {
      userId,
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
      },
    },
  });

  if (ownedLicense) {
    return {
      isOwner: true,
      license: ownedLicense,
    };
  }

  // Check if user is a team member
  const teamMembership = await db.teamMember.findFirst({
    where: {
      userId,
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

  if (teamMembership && teamMembership.license.status === 'active') {
    return {
      isOwner: false,
      license: teamMembership.license,
      membership: teamMembership,
    };
  }

  return null;
}

/**
 * Check if team has available seats
 */
export async function hasAvailableTeamSeats(licenseId: string): Promise<boolean> {
  const license = await db.license.findUnique({
    where: { id: licenseId },
    include: {
      teamMembers: {
        where: {
          status: {
            in: ['active', 'invited'],
          },
        },
      },
    },
  });

  if (!license) {
    return false;
  }

  const usedSeats = license.teamMembers.length + 1; // +1 for owner
  return usedSeats < license.teamSeats;
}

/**
 * Get number of used team seats
 */
export async function getUsedTeamSeats(licenseId: string): Promise<number> {
  const license = await db.license.findUnique({
    where: { id: licenseId },
    include: {
      teamMembers: {
        where: {
          status: {
            in: ['active', 'invited'],
          },
        },
      },
    },
  });

  if (!license) {
    return 0;
  }

  return license.teamMembers.length + 1; // +1 for owner
}

/**
 * Sync user cache fields with actual license status
 */
export async function syncUserLicenseCache(userId: string): Promise<void> {
  const hasLicense = await hasActiveLicense(userId);
  const licenseType = await getUserLicenseType(userId);

  await db.user.update({
    where: { id: userId },
    data: {
      hasActiveLicense: hasLicense,
      licenseType,
    },
  });
}
