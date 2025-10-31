'use server';

import { auth } from '@/lib/auth';
import {
  canAccessBlock,
  getUserLicenseDetails,
  hasActiveLicense,
  getUserLicenseType,
} from '@/lib/license';
import { isBlockPremium, getBlockById } from '@/lib/blocks-registry';

/**
 * Check if current user can access a block
 */
export async function checkBlockAccess(blockId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  const hasAccess = await canAccessBlock(userId, blockId);
  const isPremium = isBlockPremium(blockId);

  return {
    hasAccess,
    isPremium,
    requiresUpgrade: isPremium && !hasAccess,
  };
}

/**
 * Get current user's license info
 */
export async function getCurrentUserLicense() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      hasLicense: false,
      licenseType: 'none' as const,
      details: null,
    };
  }

  const hasLicense = await hasActiveLicense(session.user.id);
  const licenseType = await getUserLicenseType(session.user.id);
  const details = await getUserLicenseDetails(session.user.id);

  return {
    hasLicense,
    licenseType,
    details,
  };
}

/**
 * Get block with access check
 */
export async function getBlockWithAccess(blockId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  const block = getBlockById(blockId);

  if (!block) {
    return {
      error: 'Block not found',
      block: null,
      hasAccess: false,
    };
  }

  const hasAccess = await canAccessBlock(userId, blockId);

  return {
    block,
    hasAccess,
    isPremium: block.isPremium,
    requiresUpgrade: block.isPremium && !hasAccess,
  };
}

/**
 * Check multiple blocks access at once
 */
export async function checkMultipleBlocksAccess(blockIds: string[]) {
  const session = await auth();
  const userId = session?.user?.id;

  const results = await Promise.all(
    blockIds.map(async (blockId) => {
      const hasAccess = await canAccessBlock(userId, blockId);
      const isPremium = isBlockPremium(blockId);

      return {
        blockId,
        hasAccess,
        isPremium,
        requiresUpgrade: isPremium && !hasAccess,
      };
    })
  );

  return results;
}

/**
 * Get accessible blocks count
 */
export async function getAccessibleBlocksCount() {
  const session = await auth();
  const userId = session?.user?.id;

  const hasLicense = userId ? await hasActiveLicense(userId) : false;

  // If has license, all blocks are accessible (33 free + 73 premium = 106)
  // If no license, only free blocks (33)
  return {
    total: 110,
    accessible: hasLicense ? 110 : 33,
    locked: hasLicense ? 0 : 73,
    hasLicense,
  };
}
