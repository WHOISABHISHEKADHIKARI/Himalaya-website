const fs = require('fs');
const path = require('path');

// Directory containing the images
const galleryDir = path.join(__dirname, '..', 'public', 'assets', 'gallary');
const srcDir = path.join(__dirname, '..', 'src');

// Function to create web-friendly filename
function createWebFriendlyName(filename) {
  return filename
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[()]/g, '')           // Remove parentheses
    .replace(/[^a-zA-Z0-9.-_]/g, '-') // Replace special chars with hyphens
    .replace(/-+/g, '-')            // Replace multiple hyphens with single
    .replace(/^-|-$/g, '')          // Remove leading/trailing hyphens
    .toLowerCase();                 // Convert to lowercase
}

// Function to update file references in source files
function updateFileReferences(oldName, newName) {
  const filesToUpdate = [
    path.join(srcDir, 'pages', 'Home.jsx'),
    path.join(srcDir, 'pages', 'About.jsx'),
    path.join(__dirname, '..', 'public', 'image-sitemap.xml'),
    path.join(__dirname, '..', 'public', 'sitemap.xml'),
    path.join(__dirname, '..', 'public', 'news-sitemap.xml')
  ];

  filesToUpdate.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const oldPath = `/assets/gallary/${oldName}`;
      const newPath = `/assets/gallary/${newName}`;
      
      if (content.includes(oldPath)) {
        content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}: ${oldName} -> ${newName}`);
      }
    }
  });
}

// Main function to rename files and update references
function fixImageNames() {
  console.log('Starting image name fix process...');
  
  if (!fs.existsSync(galleryDir)) {
    console.error('Gallery directory not found:', galleryDir);
    return;
  }

  const files = fs.readdirSync(galleryDir);
  const renamedFiles = [];

  files.forEach(filename => {
    const oldPath = path.join(galleryDir, filename);
    const newFilename = createWebFriendlyName(filename);
    const newPath = path.join(galleryDir, newFilename);

    // Only rename if the name would change
    if (filename !== newFilename) {
      try {
        // Check if target file already exists
        if (fs.existsSync(newPath)) {
          console.warn(`Target file already exists: ${newFilename}`);
          return;
        }

        // Rename the file
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${filename} -> ${newFilename}`);
        
        // Update references in source files
        updateFileReferences(filename, newFilename);
        
        renamedFiles.push({ old: filename, new: newFilename });
      } catch (error) {
        console.error(`Error renaming ${filename}:`, error.message);
      }
    }
  });

  console.log('\n=== SUMMARY ===');
  console.log(`Total files processed: ${files.length}`);
  console.log(`Files renamed: ${renamedFiles.length}`);
  
  if (renamedFiles.length > 0) {
    console.log('\nRenamed files:');
    renamedFiles.forEach(({ old, new: newName }) => {
      console.log(`  ${old} -> ${newName}`);
    });
  }
  
  console.log('\nImage name fix process completed!');
}

// Run the script
fixImageNames();