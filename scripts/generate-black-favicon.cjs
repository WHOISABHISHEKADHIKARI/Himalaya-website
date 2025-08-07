const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateBlackFavicon() {
  const sourceLogo = path.join(__dirname, '../src/assets/logo/whitelogo-blackbg-removebg-previewaa.webp');
  const publicDir = path.join(__dirname, '../public');
  const assetsDir = path.join(__dirname, '../src/assets/logo');

  // Ensure directories exist
  await fs.mkdir(publicDir, { recursive: true });
  await fs.mkdir(assetsDir, { recursive: true });

  console.log('Generating black favicon for Google rendering...');

  try {
    // Create black version by inverting the white logo
    // This will make white parts black and transparent parts remain transparent
    const blackLogoBuffer = await sharp(sourceLogo)
      .negate({ alpha: false }) // Invert colors but keep alpha channel
      .toBuffer();

    // Generate black favicon in multiple sizes for Google
    const sizes = [16, 32, 48, 64, 96, 128, 192, 512];

    for (const size of sizes) {
      // Generate PNG version
      await sharp(blackLogoBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png({ quality: 100 })
        .toFile(path.join(publicDir, `black-favicon-${size}x${size}.png`));

      // Generate WebP version
      await sharp(blackLogoBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .webp({ quality: 90, lossless: true })
        .toFile(path.join(publicDir, `black-favicon-${size}x${size}.webp`));

      console.log(`Generated black favicon ${size}x${size}`);
    }

    // Generate ICO file for legacy support
    await sharp(blackLogoBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'black-favicon.ico'));

    // Also save the black logo in assets for potential use
    await sharp(blackLogoBuffer)
      .webp({ quality: 90, lossless: true })
      .toFile(path.join(assetsDir, 'black-logo.webp'));

    console.log('✅ Black favicon generation completed successfully!');
    console.log('Files generated:');
    console.log('- black-favicon-16x16.png/webp');
    console.log('- black-favicon-32x32.png/webp');
    console.log('- black-favicon-48x48.png/webp');
    console.log('- black-favicon-64x64.png/webp');
    console.log('- black-favicon-96x96.png/webp');
    console.log('- black-favicon-128x128.png/webp');
    console.log('- black-favicon-192x192.png/webp');
    console.log('- black-favicon-512x512.png/webp');
    console.log('- black-favicon.ico');
    console.log('- src/assets/logo/black-logo.webp');

  } catch (error) {
    console.error('❌ Error generating black favicon:', error);
    throw error;
  }
}

if (require.main === module) {
  generateBlackFavicon().catch(console.error);
}

module.exports = generateBlackFavicon;