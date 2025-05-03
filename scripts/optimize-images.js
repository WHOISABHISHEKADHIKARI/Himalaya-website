import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function optimizeImages() {
  // Add a try/catch block at the beginning of your file
  try {
    const sharp = require('sharp');
    console.log('Starting image optimization...');
    const imageFiles = await glob('src/assets/**/*.{jpg,png,jpeg,gif}');
    const totalFiles = imageFiles.length;
    if (totalFiles === 0) {
      console.log('No images found to optimize.');
      return;
    }
    console.log(`Found ${totalFiles} images to optimize`);
    
    // Create a temp directory for processing
    const tempDir = path.join(os.tmpdir(), 'image-optimization-' + Date.now());
    await fs.mkdir(tempDir, { recursive: true });

    let successCount = 0;
    let errorCount = 0;

    for (const [index, file] of imageFiles.entries()) {
      try {
        const outputWebp = file.replace(/\.(jpg|png|jpeg)$/, '.webp');
        const outputAvif = file.replace(/\.(jpg|png|jpeg)$/, '.avif');

        // Ensure output directory exists
        const outputDir = path.dirname(outputWebp);
        await fs.mkdir(outputDir, { recursive: true });

        // Get image metadata
        const metadata = await sharp(file).metadata();

        // Calculate optimal dimensions while maintaining aspect ratio
        const maxDimension = 1200; // Optimized for web while maintaining quality
        const resizeOptions = {
          width: metadata.width > maxDimension ? maxDimension : metadata.width,
          height: metadata.height > maxDimension ? maxDimension : metadata.height,
          fit: 'inside',
          withoutEnlargement: true,
          kernel: 'cubic' // Faster processing with good quality
        };

        // Adaptive quality based on image dimensions and size
        const quality = metadata.width > 800 ? 70 : metadata.size > 500000 ? 75 : 80;

        // Process in temp directory first
        const tempWebp = path.join(tempDir, path.basename(outputWebp));
        const tempAvif = path.join(tempDir, path.basename(outputAvif));

        // Generate WebP version with smart quality settings
        await sharp(file)
          .resize(resizeOptions)
          .webp({ 
            quality,
            effort: 4, // Faster encoding
            smartSubsample: true,
            nearLossless: false, // Disable for faster processing
            reductionEffort: 2 // Lower effort for faster compression
          })
          .toFile(tempWebp);

        // Generate AVIF version with optimized settings
        await sharp(file)
          .resize(resizeOptions)
          .avif({ 
            quality: Math.max(quality - 10, 65), // More aggressive compression
            speed: 6, // Faster encoding
            chromaSubsampling: '4:2:0',
            effort: 5 // Balance between speed and compression
          })
          .toFile(tempAvif);

        // Move optimized files to final destination
        await fs.rename(tempWebp, outputWebp);
        await fs.rename(tempAvif, outputAvif);

        successCount++;
        const progress = ((index + 1) / totalFiles * 100).toFixed(1);
        console.log(`[${progress}%] Optimized (${index + 1}/${totalFiles}): ${file}`);
        console.log(`  → WebP: ${outputWebp}`);
        console.log(`  → AVIF: ${outputAvif}`);
      } catch (err) {
        errorCount++;
        console.error(`Error processing ${file}:`, err.message);
      }
    }

    // Cleanup temp directory
    await fs.rm(tempDir, { recursive: true, force: true });

    console.log('\nOptimization Summary:');
    console.log(`Total files processed: ${totalFiles}`);
    console.log(`Successfully optimized: ${successCount}`);
    console.log(`Failed to optimize: ${errorCount}`);

    if (errorCount > 0) {
      console.log('\nSome images failed to optimize. Please check the error messages above.');
    } else {
      console.log('\nAll images were successfully optimized!');
    }
  } catch (err) {
    console.error('Fatal error during optimization:', err.message);
    process.exit(1);
  }
}

optimizeImages();