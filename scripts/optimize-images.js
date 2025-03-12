const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeLogos() {
  const sourceLogo = path.join(__dirname, '../src/assets/logo/logo_white_bg_removed.png');
  const publicDir = path.join(__dirname, '../public');

  // Ensure public directory exists
  await fs.mkdir(publicDir, { recursive: true });

  // Create 192x192 version
  await sharp(sourceLogo)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'logo_192.png'));

  // Create 512x512 version
  await sharp(sourceLogo)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'logo_512.png'));
}

optimizeLogos().catch(console.error);