const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const GALLERY_DIR = path.join(__dirname, '..', 'public', 'assets', 'gallary');
const SRC_DIR = path.join(__dirname, '..', 'src');
const HOME_JSX_PATH = path.join(SRC_DIR, 'pages', 'Home.jsx');

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Function to get next available gallery image number
function getNextImageNumber() {
    if (!fs.existsSync(GALLERY_DIR)) {
        fs.mkdirSync(GALLERY_DIR, { recursive: true });
        return 1;
    }

    const existingFiles = fs.readdirSync(GALLERY_DIR)
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return SUPPORTED_FORMATS.includes(ext) && file.startsWith('gallery-image-');
        })
        .map(file => {
            const match = file.match(/gallery-image-(\d+)\./); 
            return match ? parseInt(match[1]) : 0;
        })
        .filter(num => num > 0)
        .sort((a, b) => a - b);

    return existingFiles.length > 0 ? Math.max(...existingFiles) + 1 : 1;
}

// Function to generate new filename
function generateNewFilename(imageNumber, extension) {
    const paddedNumber = String(imageNumber).padStart(3, '0');
    return `gallery-image-${paddedNumber}${extension}`;
}

// Function to copy and rename image
function importImage(sourcePath, imageNumber, title = '', alt = '') {
    if (!fs.existsSync(sourcePath)) {
        console.error(`❌ Source image not found: ${sourcePath}`);
        return null;
    }

    const extension = path.extname(sourcePath).toLowerCase();
    if (!SUPPORTED_FORMATS.includes(extension)) {
        console.error(`❌ Unsupported image format: ${extension}`);
        console.log(`   Supported formats: ${SUPPORTED_FORMATS.join(', ')}`);
        return null;
    }

    const newFilename = generateNewFilename(imageNumber, extension);
    const destinationPath = path.join(GALLERY_DIR, newFilename);

    try {
        // Copy the image
        fs.copyFileSync(sourcePath, destinationPath);
        console.log(`✅ Imported: ${path.basename(sourcePath)} → ${newFilename}`);
        
        return {
            filename: newFilename,
            number: imageNumber,
            title: title || `Gallery Image ${imageNumber}`,
            alt: alt || `Himalaya Krishi Farm Image ${imageNumber}`
        };
    } catch (error) {
        console.error(`❌ Error importing ${sourcePath}:`, error.message);
        return null;
    }
}

// Function to add image entry to Home.jsx
function addImageToGallery(imageInfo) {
    if (!fs.existsSync(HOME_JSX_PATH)) {
        console.error(`❌ Home.jsx not found at: ${HOME_JSX_PATH}`);
        return false;
    }

    try {
        let content = fs.readFileSync(HOME_JSX_PATH, 'utf8');
        
        // Find the galleryImages array
        const galleryArrayStart = content.indexOf('const galleryImages = [');
        if (galleryArrayStart === -1) {
            console.error('❌ Could not find galleryImages array in Home.jsx');
            return false;
        }

        // Find the end of the array
        let bracketCount = 0;
        let arrayEnd = galleryArrayStart;
        let foundStart = false;
        
        for (let i = galleryArrayStart; i < content.length; i++) {
            if (content[i] === '[') {
                bracketCount++;
                foundStart = true;
            } else if (content[i] === ']') {
                bracketCount--;
                if (foundStart && bracketCount === 0) {
                    arrayEnd = i;
                    break;
                }
            }
        }

        // Create new image entry
        const newImageEntry = `    {
      src: "/assets/gallary/${imageInfo.filename}",
      alt: "${imageInfo.alt}",
      title: "${imageInfo.title}"
    },`;

        // Insert the new entry before the closing bracket
        const beforeClosing = content.substring(0, arrayEnd);
        const afterClosing = content.substring(arrayEnd);
        
        // Add comma if the last entry doesn't have one
        const trimmedBefore = beforeClosing.trim();
        const needsComma = !trimmedBefore.endsWith(',') && !trimmedBefore.endsWith('[');
        
        const updatedContent = beforeClosing + 
            (needsComma ? ',' : '') + 
            '\n' + newImageEntry + '\n  ' + 
            afterClosing;

        fs.writeFileSync(HOME_JSX_PATH, updatedContent, 'utf8');
        console.log(`✅ Added image entry to Home.jsx gallery`);
        return true;
    } catch (error) {
        console.error(`❌ Error updating Home.jsx:`, error.message);
        return false;
    }
}

// Function to import multiple images from a directory
function importFromDirectory(sourceDir, startNumber = null) {
    if (!fs.existsSync(sourceDir)) {
        console.error(`❌ Source directory not found: ${sourceDir}`);
        return;
    }

    const files = fs.readdirSync(sourceDir)
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return SUPPORTED_FORMATS.includes(ext);
        })
        .sort();

    if (files.length === 0) {
        console.log(`ℹ️ No supported image files found in: ${sourceDir}`);
        return;
    }

    console.log(`📁 Found ${files.length} image(s) to import from: ${sourceDir}`);
    
    let currentNumber = startNumber || getNextImageNumber();
    const importedImages = [];

    files.forEach((file, index) => {
        const sourcePath = path.join(sourceDir, file);
        const title = `Gallery Image ${currentNumber}`;
        const alt = `Himalaya Krishi Farm - ${path.parse(file).name}`;
        
        const imageInfo = importImage(sourcePath, currentNumber, title, alt);
        if (imageInfo) {
            importedImages.push(imageInfo);
            addImageToGallery(imageInfo);
            currentNumber++;
        }
    });

    console.log(`\n🎉 Successfully imported ${importedImages.length} image(s)!`);
    return importedImages;
}

// Function to import a single image
function importSingleImage(sourcePath, title = '', alt = '') {
    const nextNumber = getNextImageNumber();
    const imageInfo = importImage(sourcePath, nextNumber, title, alt);
    
    if (imageInfo) {
        addImageToGallery(imageInfo);
        console.log(`\n🎉 Successfully imported 1 image!`);
        return imageInfo;
    }
    return null;
}

// Interactive CLI function
function startInteractiveImport() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('🖼️  Gallery Image Import Tool');
    console.log('================================');
    console.log('1. Import single image');
    console.log('2. Import from directory');
    console.log('3. Exit');
    console.log('');

    rl.question('Choose an option (1-3): ', (choice) => {
        switch (choice.trim()) {
            case '1':
                rl.question('Enter image file path: ', (imagePath) => {
                    rl.question('Enter title (optional): ', (title) => {
                        rl.question('Enter alt text (optional): ', (alt) => {
                            importSingleImage(imagePath.trim(), title.trim(), alt.trim());
                            rl.close();
                        });
                    });
                });
                break;
            
            case '2':
                rl.question('Enter directory path: ', (dirPath) => {
                    importFromDirectory(dirPath.trim());
                    rl.close();
                });
                break;
            
            case '3':
                console.log('👋 Goodbye!');
                rl.close();
                break;
            
            default:
                console.log('❌ Invalid option. Please choose 1, 2, or 3.');
                rl.close();
        }
    });
}

// Command line usage
function showUsage() {
    console.log('🖼️  Gallery Image Import Tool');
    console.log('================================');
    console.log('');
    console.log('Usage:');
    console.log('  node import-gallery-images.cjs                    # Interactive mode');
    console.log('  node import-gallery-images.cjs <image-path>       # Import single image');
    console.log('  node import-gallery-images.cjs <directory-path>   # Import from directory');
    console.log('');
    console.log('Examples:');
    console.log('  node import-gallery-images.cjs ./new-image.jpg');
    console.log('  node import-gallery-images.cjs ./images-folder/');
    console.log('');
    console.log('Supported formats: .jpg, .jpeg, .png, .gif, .webp');
}

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        // Interactive mode
        startInteractiveImport();
    } else if (args.length === 1) {
        const inputPath = args[0];
        
        if (fs.existsSync(inputPath)) {
            const stats = fs.statSync(inputPath);
            
            if (stats.isDirectory()) {
                importFromDirectory(inputPath);
            } else if (stats.isFile()) {
                importSingleImage(inputPath);
            } else {
                console.error('❌ Invalid path type');
            }
        } else {
            console.error(`❌ Path not found: ${inputPath}`);
        }
    } else {
        showUsage();
    }
}

// Export functions for use in other scripts
module.exports = {
    importSingleImage,
    importFromDirectory,
    getNextImageNumber,
    generateNewFilename
};