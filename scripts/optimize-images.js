import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function optimizeImages() {
  const imageFiles = await glob('src/assets/**/*.{jpg,png,jpeg}');
  
  for (const file of imageFiles) {
    const outputFile = file.replace(/\.(jpg|png|jpeg)$/, '.webp');
    
    await sharp(file)
      .webp({ quality: 80 })
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toFile(outputFile);
    
    console.log(`Optimized: ${file} -> ${outputFile}`);
  }
}

optimizeImages().catch(console.error);