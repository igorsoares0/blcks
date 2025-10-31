/**
 * Script to test license logic manually
 *
 * Usage:
 * 1. Create a user account in the app
 * 2. Run: npx tsx scripts/test-license-logic.ts create <email> <type>
 * 3. Test in the app
 * 4. Run: npx tsx scripts/test-license-logic.ts cleanup <email>
 */

import { db } from '../src/lib/db';
import {
  canAccessBlock,
  hasActiveLicense,
  getUserLicenseType,
  getUserLicenseDetails,
} from '../src/lib/license';

const args = process.argv.slice(2);
const command = args[0];
const email = args[1];
const licenseType = args[2] as 'individual' | 'team';

async function createTestLicense(email: string, type: 'individual' | 'team') {
  console.log(`🔍 Finding user with email: ${email}...`);

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error('❌ User not found. Please create an account first.');
    process.exit(1);
  }

  console.log(`✅ Found user: ${user.name} (${user.id})`);

  // Check if user already has a license
  const existingLicense = await db.license.findUnique({
    where: { userId: user.id },
  });

  if (existingLicense) {
    console.log('⚠️  User already has a license. Deleting old one...');
    await db.license.delete({
      where: { id: existingLicense.id },
    });
  }

  console.log(`📝 Creating ${type} license...`);

  const license = await db.license.create({
    data: {
      userId: user.id,
      type,
      stripePaymentId: `test_${Date.now()}`,
      stripeCustomerId: `cus_test_${Date.now()}`,
      status: 'active',
      teamSeats: type === 'team' ? 5 : 1,
      purchasedAt: new Date(),
      expiresAt: null, // lifetime
    },
  });

  console.log(`✅ License created: ${license.id}`);

  // If team, create owner as team member
  if (type === 'team') {
    await db.teamMember.create({
      data: {
        licenseId: license.id,
        userId: user.id,
        invitedEmail: user.email!,
        role: 'owner',
        status: 'active',
        joinedAt: new Date(),
      },
    });
    console.log('✅ Owner added as team member');
  }

  // Update user cache
  await db.user.update({
    where: { id: user.id },
    data: {
      hasActiveLicense: true,
      licenseType: type,
    },
  });

  console.log('✅ User cache updated');
  console.log('\n🎉 Test license created successfully!');
  console.log('\nYou can now:');
  console.log('  1. Login with this account');
  console.log('  2. Try accessing premium blocks');
  console.log('  3. Run: npx tsx scripts/test-license-logic.ts test <email>');
}

async function testLicense(email: string) {
  console.log(`🔍 Testing license for: ${email}...`);

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error('❌ User not found.');
    process.exit(1);
  }

  console.log(`\n📊 User: ${user.name} (${user.id})`);

  const hasLicense = await hasActiveLicense(user.id);
  const licenseType = await getUserLicenseType(user.id);
  const details = await getUserLicenseDetails(user.id);

  console.log(`\n✅ Has Active License: ${hasLicense}`);
  console.log(`📋 License Type: ${licenseType}`);

  if (details) {
    console.log(`\n🎫 License Details:`);
    console.log(`  - ID: ${details.license.id}`);
    console.log(`  - Type: ${details.license.type}`);
    console.log(`  - Status: ${details.license.status}`);
    console.log(`  - Is Owner: ${details.isOwner}`);

    if (details.license.type === 'team') {
      const totalMembers = details.license.teamMembers.length + 1;
      console.log(`  - Team Members: ${totalMembers}/${details.license.teamSeats}`);
    }
  }

  // Test access to some blocks
  console.log(`\n🔐 Testing Block Access:`);
  const testBlocks = [
    { id: 'hero-1', expected: 'free' },
    { id: 'hero-3', expected: 'premium' },
    { id: 'about-1', expected: 'free' },
    { id: 'about-3', expected: 'premium' },
  ];

  for (const { id, expected } of testBlocks) {
    const canAccess = await canAccessBlock(user.id, id);
    const status = canAccess ? '✅ Accessible' : '🔒 Locked';
    console.log(`  ${id} (${expected}): ${status}`);
  }
}

async function cleanup(email: string) {
  console.log(`🧹 Cleaning up test data for: ${email}...`);

  const user = await db.user.findUnique({
    where: { email },
    include: {
      ownedLicense: true,
    },
  });

  if (!user) {
    console.error('❌ User not found.');
    process.exit(1);
  }

  if (user.ownedLicense) {
    console.log('🗑️  Deleting license and team members...');
    await db.license.delete({
      where: { id: user.ownedLicense.id },
    });
    console.log('✅ License deleted');
  }

  // Update user cache
  await db.user.update({
    where: { id: user.id },
    data: {
      hasActiveLicense: false,
      licenseType: 'none',
    },
  });

  console.log('✅ User cache reset');
  console.log('\n🎉 Cleanup complete!');
}

async function listAllLicenses() {
  console.log('📋 All Active Licenses:\n');

  const licenses = await db.license.findMany({
    where: {
      status: 'active',
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      teamMembers: {
        where: {
          status: {
            in: ['active', 'invited'],
          },
        },
      },
    },
  });

  if (licenses.length === 0) {
    console.log('  No active licenses found.');
    return;
  }

  licenses.forEach((license, i) => {
    console.log(`${i + 1}. ${license.user.name} (${license.user.email})`);
    console.log(`   Type: ${license.type}`);
    console.log(`   Status: ${license.status}`);
    console.log(`   Purchased: ${license.purchasedAt.toLocaleDateString()}`);

    if (license.type === 'team') {
      const totalMembers = license.teamMembers.length + 1;
      console.log(`   Team: ${totalMembers}/${license.teamSeats} seats`);
    }
    console.log('');
  });
}

async function main() {
  try {
    if (command === 'create') {
      if (!email || !licenseType) {
        console.error('Usage: npx tsx scripts/test-license-logic.ts create <email> <individual|team>');
        process.exit(1);
      }
      await createTestLicense(email, licenseType);
    } else if (command === 'test') {
      if (!email) {
        console.error('Usage: npx tsx scripts/test-license-logic.ts test <email>');
        process.exit(1);
      }
      await testLicense(email);
    } else if (command === 'cleanup') {
      if (!email) {
        console.error('Usage: npx tsx scripts/test-license-logic.ts cleanup <email>');
        process.exit(1);
      }
      await cleanup(email);
    } else if (command === 'list') {
      await listAllLicenses();
    } else {
      console.log('📖 Available commands:');
      console.log('  create <email> <individual|team>  - Create test license');
      console.log('  test <email>                       - Test license access');
      console.log('  cleanup <email>                    - Remove test license');
      console.log('  list                               - List all active licenses');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await db.$disconnect();
  }
}

main();
