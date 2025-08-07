const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const sourceLogo = path.join(__dirname, '../src/assets/logo/logo_white_bg_removed.png');
  const publicDir = path.join(__dirname, '../public');
  const assetsDir = path.join(__dirname, '../src/assets/logo');

  // Ensure directories exist
  await fs.mkdir(publicDir, { recursive: true });
  await fs.mkdir(assetsDir, { recursive: true });

  // Generate all sizes in one go
  const sizes = [64, 96, 128, 192, 256, 384, 512];
  
  await Promise.all(sizes.map(async (size) => {
    // Generate both WebP and AVIF in parallel
    await Promise.all([
      sharp(sourceLogo)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .webp({ quality: 85, effort: 4, nearLossless: true })
        .toFile(path.join(size >= 192 ? publicDir : assetsDir, `logo_${size}.webp`)),
      
      sharp(sourceLogo)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .avif({ quality: 80, speed: 5 })
        .toFile(path.join(size >= 192 ? publicDir : assetsDir, `logo_${size}.avif`))
    ]);
  }));
}

optimizeImages().catch(console.error);