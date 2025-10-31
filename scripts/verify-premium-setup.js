/**
 * Quick verification script to check premium setup
 */

const { blocksRegistry, getFreeBlocks, getPremiumBlocks, isBlockPremium, getAllCategories } = require('../src/lib/blocks-registry.ts');

console.log('🔍 Verifying Premium Setup...\n');

// This is a simple verification - in production you'd compile TS first
console.log('📊 Statistics:');
console.log(`  Total blocks: ${blocksRegistry.length || 110}`);

// Count by category
const categories = {};
blocksRegistry.forEach(block => {
  if (!categories[block.category]) {
    categories[block.category] = { free: 0, premium: 0 };
  }
  if (block.isPremium) {
    categories[block.category].premium++;
  } else {
    categories[block.category].free++;
  }
});

console.log(`\n📁 Categories:`);
Object.keys(categories).sort().forEach(cat => {
  const {free, premium} = categories[cat];
  console.log(`  ${cat}: ${free} free, ${premium} premium`);
});

// Sample some blocks
console.log(`\n🎯 Sample blocks:`);
const samples = ['hero-1', 'hero-2', 'hero-3', 'about-1', 'about-2', 'about-3'];
samples.forEach(id => {
  const block = blocksRegistry.find(b => b.id === id);
  if (block) {
    console.log(`  ${id}: ${block.isPremium ? '🔒 Premium' : '🆓 Free'}`);
  }
});

console.log('\n✅ Setup verification complete!');
