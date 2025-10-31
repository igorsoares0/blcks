const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../public/previews');
const SCREENSHOT_WIDTH = 1200;
const SCREENSHOT_HEIGHT = 675; // 16:9 aspect ratio

// Block IDs - will be fetched from the API
async function getBlockIds() {
  try {
    const response = await fetch(`${BASE_URL}/api/blocks`);
    if (!response.ok) {
      throw new Error('Failed to fetch blocks');
    }
    const blocks = await response.json();
    return blocks;
  } catch (error) {
    console.error('Error fetching blocks:', error.message);
    console.log('Make sure the Next.js dev server is running on http://localhost:3000');
    process.exit(1);
  }
}

async function generateScreenshots() {
  console.log('🚀 Starting screenshot generation...\n');
  console.log(`📡 Fetching blocks from ${BASE_URL}...`);

  const blocks = await getBlockIds();
  console.log(`📦 Found ${blocks.length} blocks\n`);

  // Launch browser - try to find Chrome in common locations
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  } catch (error) {
    console.log('⚠️  Chrome not found. Trying alternative methods...\n');

    // Try with executablePath (Windows common locations)
    const chromePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
    ];

    let foundChrome = false;
    for (const chromePath of chromePaths) {
      try {
        const fs = require('fs');
        if (fs.existsSync(chromePath)) {
          console.log(`✅ Found Chrome at: ${chromePath}\n`);
          browser = await puppeteer.launch({
            headless: 'new',
            executablePath: chromePath,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          });
          foundChrome = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!foundChrome) {
      console.error('\n❌ Chrome not found. Please install Chrome or run:');
      console.error('   npx puppeteer browsers install chrome\n');
      process.exit(1);
    }
  }

  const page = await browser.newPage();

  // Set viewport size
  await page.setViewport({
    width: SCREENSHOT_WIDTH,
    height: SCREENSHOT_HEIGHT,
    deviceScaleFactor: 2, // Retina display
  });

  let successCount = 0;
  let errorCount = 0;

  // Process each block
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const progress = `[${i + 1}/${blocks.length}]`;

    try {
      console.log(`${progress} Processing ${block.id}...`);

      // Create directory for category if it doesn't exist
      const categoryDir = path.join(OUTPUT_DIR, block.category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      // Navigate to preview page
      const url = `${BASE_URL}/preview/${block.id}`;
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait a bit for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Remove Next.js dev overlay and any other unwanted elements
      await page.evaluate(() => {
        // Remove Next.js dev indicator
        const devIndicator = document.querySelector('#__next-build-watcher');
        if (devIndicator) devIndicator.remove();

        // Remove any portals or overlays
        const portals = document.querySelectorAll('nextjs-portal, [data-nextjs-dialog], [data-nextjs-toast]');
        portals.forEach(el => el.remove());

        // Remove iframes (like Next.js dev overlay)
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
          if (iframe.title?.includes('Next') || iframe.src?.includes('webpack')) {
            iframe.remove();
          }
        });

        // Remove any element with __nextjs class
        const nextjsElements = document.querySelectorAll('[class*="__nextjs"]');
        nextjsElements.forEach(el => el.remove());
      });

      // Take screenshot
      const screenshotPath = path.join(categoryDir, `${block.id}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
      });

      console.log(`✅ ${progress} Saved: ${block.category}/${block.id}.png`);
      successCount++;

    } catch (error) {
      console.error(`❌ ${progress} Failed to screenshot ${block.id}:`, error.message);
      errorCount++;
    }
  }

  await browser.close();

  console.log('\n📊 Screenshot generation complete!');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
}

// Run the script
generateScreenshots().catch(console.error);
