/**
 * Script to automatically mark the first 2 blocks of each category as free
 * and the rest as premium.
 *
 * Run with: node scripts/update-premium-flags.js
 */

const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '..', 'src', 'lib', 'blocks-registry.ts');

console.log('🔍 Reading blocks-registry.ts...');
let content = fs.readFileSync(registryPath, 'utf-8');

// Find all block objects in the registry
// Pattern: { id: 'category-number', ... }
const blockPattern = /\{\s*\n\s*id:\s*['"]([^'"]+)['"]/g;
const blocks = [];
let match;

while ((match = blockPattern.exec(content)) !== null) {
  const blockId = match[1];
  const category = blockId.split('-')[0]; // Extract category from id like "hero-1" -> "hero"
  const blockNumber = parseInt(blockId.split('-')[1]) || 0;

  blocks.push({
    id: blockId,
    category,
    number: blockNumber,
    index: match.index
  });
}

console.log(`📦 Found ${blocks.length} blocks`);

// Group blocks by category
const categoriesMap = new Map();
blocks.forEach(block => {
  if (!categoriesMap.has(block.category)) {
    categoriesMap.set(block.category, []);
  }
  categoriesMap.get(block.category).push(block);
});

console.log(`📁 Found ${categoriesMap.size} categories:`);

// Sort blocks within each category by number
categoriesMap.forEach((categoryBlocks, category) => {
  categoryBlocks.sort((a, b) => a.number - b.number);
  const freeCount = Math.min(2, categoryBlocks.length);
  const premiumCount = categoryBlocks.length - freeCount;
  console.log(`  - ${category}: ${freeCount} free, ${premiumCount} premium`);
});

// Determine which blocks should be free (first 2) and which premium
const freeBlocks = new Set();
const premiumBlocks = new Set();

categoriesMap.forEach((categoryBlocks, category) => {
  categoryBlocks.forEach((block, index) => {
    if (index < 2) {
      freeBlocks.add(block.id);
    } else {
      premiumBlocks.add(block.id);
    }
  });
});

console.log('\n✏️  Updating isPremium flags...');

// Replace content
// We need to add isPremium field to each block object
// Pattern to match block objects and add isPremium field

let updatedCount = 0;
let newContent = content;

// For each block, find its object and add/update isPremium field
blocks.forEach(block => {
  const isPremium = premiumBlocks.has(block.id);
  const isFree = freeBlocks.has(block.id);

  // Pattern to match the block object starting with the id
  // We'll look for the pattern: id: 'block-id', and add isPremium after category
  const blockIdPattern = new RegExp(
    `(id:\\s*['"]${block.id}['"],\\s*\\n\\s*name:.*?\\n\\s*description:.*?\\n\\s*category:\\s*['"][^'"]+['"],)`,
    's'
  );

  const blockMatch = newContent.match(blockIdPattern);

  if (blockMatch) {
    // Check if isPremium already exists
    const fullBlockPattern = new RegExp(
      `id:\\s*['"]${block.id}['"].*?(?=\\n\\s*\\},?\\n|\\n\\s*code:)`,
      's'
    );

    const fullBlockMatch = newContent.match(fullBlockPattern);

    if (fullBlockMatch && fullBlockMatch[0]) {
      const blockContent = fullBlockMatch[0];

      if (blockContent.includes('isPremium:')) {
        // Update existing isPremium
        const updatedBlock = blockContent.replace(
          /isPremium:\s*(true|false)/,
          `isPremium: ${isPremium}`
        );
        newContent = newContent.replace(blockContent, updatedBlock);
      } else {
        // Add isPremium after category
        const updatedBlock = blockContent.replace(
          /(category:\s*['"][^'"]+['"],)/,
          `$1\n    isPremium: ${isPremium},`
        );
        newContent = newContent.replace(blockContent, updatedBlock);
      }

      updatedCount++;
    }
  }
});

console.log(`✅ Updated ${updatedCount} blocks`);

// Write back to file
fs.writeFileSync(registryPath, newContent, 'utf-8');

console.log('💾 Saved changes to blocks-registry.ts');
console.log('\n📊 Summary:');
console.log(`  - Total blocks: ${blocks.length}`);
console.log(`  - Free blocks: ${freeBlocks.size}`);
console.log(`  - Premium blocks: ${premiumBlocks.size}`);
console.log('\n🎉 Done!');
