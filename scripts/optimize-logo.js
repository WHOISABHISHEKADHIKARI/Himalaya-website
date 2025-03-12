const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeLogo() {
  const sourceLogo = path.join(__dirname, '../src/assets/logo/logo_white_bg_removed.png');
  const publicDir = path.join(__dirname, '../public');

  await fs.mkdir(publicDir, { recursive: true });

  // Create PWA icons
  await sharp(sourceLogo)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'logo_192.png'));

  await sharp(sourceLogo)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'logo_512.png'));
}

optimizeLogo().catch(console.error);