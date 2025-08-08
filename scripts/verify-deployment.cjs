const fs = require('fs');
const path = require('path');

// Function to check if all image files exist
function verifyImageFiles() {
  console.log('=== VERIFYING IMAGE FILES ===\n');
  
  const galleryDir = path.join(__dirname, '..', 'public', 'assets', 'gallary');
  const homeJsxPath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
  
  if (!fs.existsSync(galleryDir)) {
    console.error('❌ Gallery directory not found:', galleryDir);
    return false;
  }
  
  if (!fs.existsSync(homeJsxPath)) {
    console.error('❌ Home.jsx file not found:', homeJsxPath);
    return false;
  }
  
  // Read Home.jsx to extract image references
  const homeContent = fs.readFileSync(homeJsxPath, 'utf8');
  const imageMatches = homeContent.match(/\/assets\/gallary\/[^"]+/g) || [];
  
  console.log(`Found ${imageMatches.length} image references in Home.jsx`);
  
  let allFilesExist = true;
  const missingFiles = [];
  const existingFiles = [];
  
  imageMatches.forEach(imagePath => {
    const filename = imagePath.replace('/assets/gallary/', '');
    const fullPath = path.join(galleryDir, filename);
    
    if (fs.existsSync(fullPath)) {
      existingFiles.push(filename);
      console.log(`✅ ${filename}`);
    } else {
      missingFiles.push(filename);
      console.log(`❌ MISSING: ${filename}`);
      allFilesExist = false;
    }
  });
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Total references: ${imageMatches.length}`);
  console.log(`   Existing files: ${existingFiles.length}`);
  console.log(`   Missing files: ${missingFiles.length}`);
  
  if (missingFiles.length > 0) {
    console.log(`\n❌ Missing files:`);
    missingFiles.forEach(file => console.log(`   - ${file}`));
  }
  
  return allFilesExist;
}

// Function to check for problematic filenames
function checkFilenameIssues() {
  console.log('\n=== CHECKING FILENAME ISSUES ===\n');
  
  const galleryDir = path.join(__dirname, '..', 'public', 'assets', 'gallary');
  const files = fs.readdirSync(galleryDir);
  
  const problematicFiles = [];
  const goodFiles = [];
  
  files.forEach(filename => {
    const hasSpaces = filename.includes(' ');
    const hasSpecialChars = /[()\[\]{}%]/.test(filename);
    const hasUpperCase = /[A-Z]/.test(filename);
    
    if (hasSpaces || hasSpecialChars || hasUpperCase) {
      problematicFiles.push({
        name: filename,
        issues: [
          hasSpaces && 'spaces',
          hasSpecialChars && 'special characters',
          hasUpperCase && 'uppercase letters'
        ].filter(Boolean)
      });
    } else {
      goodFiles.push(filename);
    }
  });
  
  console.log(`📊 FILENAME ANALYSIS:`);
  console.log(`   Total files: ${files.length}`);
  console.log(`   Web-friendly: ${goodFiles.length}`);
  console.log(`   Problematic: ${problematicFiles.length}`);
  
  if (problematicFiles.length > 0) {
    console.log(`\n❌ Problematic filenames:`);
    problematicFiles.forEach(file => {
      console.log(`   - ${file.name} (${file.issues.join(', ')})`);
    });
    return false;
  } else {
    console.log(`\n✅ All filenames are web-friendly!`);
    return true;
  }
}

// Function to check deployment configuration
function checkDeploymentConfig() {
  console.log('\n=== CHECKING DEPLOYMENT CONFIGURATION ===\n');
  
  const gitignorePath = path.join(__dirname, '..', '.gitignore');
  const vercelignorePath = path.join(__dirname, '..', '.vercelignore');
  
  let allGood = true;
  
  // Check .gitignore
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    const excludesImages = gitignoreContent.includes('*.jpg') || 
                          gitignoreContent.includes('*.jpeg') || 
                          gitignoreContent.includes('*.png') ||
                          gitignoreContent.includes('public/assets/gallary');
    
    if (excludesImages) {
      console.log(`❌ .gitignore excludes image files - this will cause 404s on live server`);
      allGood = false;
    } else {
      console.log(`✅ .gitignore does not exclude gallery images`);
    }
  }
  
  // Check .vercelignore
  if (fs.existsSync(vercelignorePath)) {
    const vercelignoreContent = fs.readFileSync(vercelignorePath, 'utf8');
    const excludesImages = vercelignoreContent.includes('public/assets/gallary');
    
    if (excludesImages) {
      console.log(`❌ .vercelignore excludes gallery images - this will cause 404s on live server`);
      allGood = false;
    } else {
      console.log(`✅ .vercelignore does not exclude gallery images`);
    }
  }
  
  return allGood;
}

// Main verification function
function runVerification() {
  console.log('🔍 DEPLOYMENT VERIFICATION STARTING...\n');
  
  const imageFilesOk = verifyImageFiles();
  const filenamesOk = checkFilenameIssues();
  const deploymentConfigOk = checkDeploymentConfig();
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 FINAL VERIFICATION REPORT');
  console.log('='.repeat(50));
  
  console.log(`Image files exist: ${imageFilesOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Filenames web-friendly: ${filenamesOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Deployment config: ${deploymentConfigOk ? '✅ PASS' : '❌ FAIL'}`);
  
  const overallStatus = imageFilesOk && filenamesOk && deploymentConfigOk;
  console.log(`\n🎯 OVERALL STATUS: ${overallStatus ? '✅ READY FOR DEPLOYMENT' : '❌ ISSUES NEED FIXING'}`);
  
  if (overallStatus) {
    console.log('\n🚀 Your images should now load correctly on the live server!');
  } else {
    console.log('\n⚠️  Please fix the issues above before deploying.');
  }
  
  return overallStatus;
}

// Run the verification
runVerification();