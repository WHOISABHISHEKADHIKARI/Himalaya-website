const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateIcons() {
  const sourceLogo = path.join(__dirname, '../src/assets/logo/logo_white_bg_removed.png');
  const publicDir = path.join(__dirname, '../public');

  // Ensure public directory exists
  await fs.mkdir(publicDir, { recursive: true });

  // Generate PWA icons
  await sharp(sourceLogo)
    .resize(192, 192)
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, 'logo_192.webp'));

  await sharp(sourceLogo)
    .resize(192, 192)
    .avif({ quality: 80 })
    .toFile(path.join(publicDir, 'logo_192.avif'));

  await sharp(sourceLogo)
    .resize(512, 512)
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, 'logo_512.webp'));

  await sharp(sourceLogo)
    .resize(512, 512)
    .avif({ quality: 80 })
    .toFile(path.join(publicDir, 'logo_512.avif'));
}

generateIcons().catch(console.error);