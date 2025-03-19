const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeLogo() {
  const sourceLogo = path.join(__dirname, '../src/assets/logo/logo_white_bg_removed.png');
  const publicDir = path.join(__dirname, '../public');
  const assetsDir = path.join(__dirname, '../src/assets/logo');

  // Ensure directories exist
  await fs.mkdir(publicDir, { recursive: true });
  await fs.mkdir(assetsDir, { recursive: true });

  // Generate sizes for responsive images
  const sizes = [64, 96, 128, 192, 256, 384, 512];

  // Process each size
  for (const size of sizes) {
    // WebP format with high quality for logo
    await sharp(sourceLogo)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .webp({ quality: 90, lossless: true })
      .toFile(path.join(assetsDir, `logo_${size}.webp`));

    // AVIF format for modern browsers
    await sharp(sourceLogo)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .avif({ quality: 80, speed: 0 })
      .toFile(path.join(assetsDir, `logo_${size}.avif`));
  }

  // Generate special sizes for PWA icons
  const pwaIcons = [
    { size: 192, name: 'logo_192' },
    { size: 512, name: 'logo_512' }
  ];

  for (const icon of pwaIcons) {
    await sharp(sourceLogo)
      .resize(icon.size, icon.size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .webp({ quality: 90, lossless: true })
      .toFile(path.join(publicDir, `${icon.name}.webp`));

    await sharp(sourceLogo)
      .resize(icon.size, icon.size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .avif({ quality: 80, speed: 0 })
      .toFile(path.join(publicDir, `${icon.name}.avif`));
  }

  console.log('Logo optimization completed successfully!');
}

optimizeLogo().catch(console.error);