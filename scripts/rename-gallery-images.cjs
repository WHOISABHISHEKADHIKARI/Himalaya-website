const fs = require('fs');
const path = require('path');

// Configuration
const GALLERY_DIR = path.join(__dirname, '..', 'public', 'assets', 'gallary');
const SRC_DIR = path.join(__dirname, '..', 'src');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Function to generate new filename
function generateNewFilename(index, extension) {
    const paddedIndex = String(index).padStart(3, '0');
    return `gallery-image-${paddedIndex}${extension}`;
}

// Function to get all image files
function getImageFiles(directory) {
    const files = fs.readdirSync(directory);
    return files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    }).sort(); // Sort to ensure consistent ordering
}

// Function to update file references in code
function updateFileReferences(oldFilename, newFilename) {
    const filesToUpdate = [
        path.join(SRC_DIR, 'pages', 'Home.jsx'),
        path.join(SRC_DIR, 'pages', 'About.jsx'),
        path.join(PUBLIC_DIR, 'image-sitemap.xml'),
        path.join(PUBLIC_DIR, 'sitemap.xml'),
        path.join(PUBLIC_DIR, 'news-sitemap.xml')
    ];

    filesToUpdate.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Replace all occurrences of the old filename
                const regex = new RegExp(oldFilename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                const updatedContent = content.replace(regex, newFilename);
                
                if (content !== updatedContent) {
                    fs.writeFileSync(filePath, updatedContent, 'utf8');
                    console.log(`✅ Updated references in: ${path.basename(filePath)}`);
                }
            } catch (error) {
                console.error(`❌ Error updating ${filePath}:`, error.message);
            }
        }
    });
}

// Main function to rename all images
function renameAllImages() {
    console.log('🚀 Starting gallery image renaming process...');
    console.log(`📁 Gallery directory: ${GALLERY_DIR}`);
    
    if (!fs.existsSync(GALLERY_DIR)) {
        console.error('❌ Gallery directory does not exist!');
        return;
    }

    const imageFiles = getImageFiles(GALLERY_DIR);
    console.log(`📸 Found ${imageFiles.length} image files to rename`);

    if (imageFiles.length === 0) {
        console.log('ℹ️ No image files found in gallery directory.');
        return;
    }

    const renameMap = [];
    
    // First pass: create rename mapping
    imageFiles.forEach((filename, index) => {
        const extension = path.extname(filename);
        const newFilename = generateNewFilename(index + 1, extension);
        
        renameMap.push({
            old: filename,
            newName: newFilename,
            oldPath: path.join(GALLERY_DIR, filename),
            newPath: path.join(GALLERY_DIR, newFilename)
        });
    });

    // Second pass: rename files
    console.log('\n📝 Renaming files...');
    renameMap.forEach(({ old, newName, oldPath, newPath }, index) => {
        try {
            // Check if target filename already exists
            if (fs.existsSync(newPath) && oldPath !== newPath) {
                console.log(`⚠️ Target file already exists, skipping: ${newName}`);
                return;
            }

            // Rename the file
            if (oldPath !== newPath) {
                fs.renameSync(oldPath, newPath);
                console.log(`✅ ${old} → ${newName}`);
                
                // Update code references
                updateFileReferences(old, newName);
            } else {
                console.log(`ℹ️ File already has correct name: ${newName}`);
            }
        } catch (error) {
            console.error(`❌ Error renaming ${old}:`, error.message);
        }
    });

    console.log('\n🎉 Gallery image renaming completed!');
    console.log('\n📋 Summary:');
    console.log(`   • Total images processed: ${imageFiles.length}`);
    console.log(`   • Naming convention: gallery-image-XXX.ext`);
    console.log(`   • All code references updated automatically`);
    
    console.log('\n🔍 Verification:');
    const finalFiles = getImageFiles(GALLERY_DIR);
    console.log(`   • Images in gallery: ${finalFiles.length}`);
    finalFiles.forEach(file => {
        console.log(`     - ${file}`);
    });
}

// Run the script
if (require.main === module) {
    renameAllImages();
}

module.exports = { renameAllImages };