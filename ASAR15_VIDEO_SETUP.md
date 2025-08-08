# Asar 15 Video Setup Instructions

## Adding the Asar 15 Mudfest Video

To make the Asar 15 video section functional, follow these steps:

### 1. Video File Placement
Place your Asar 15 mudfest video file in the following location:
```
public/assets/video/asar15-mudfest.mp4
```

### 2. Supported Video Formats
The video player supports multiple formats for better browser compatibility:
- **Primary**: `asar15-mudfest.mp4` (H.264 encoding recommended)
- **Alternative**: `asar15-mudfest.webm` (WebM format for better compression)

### 3. Video Specifications
**Recommended video specifications:**
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Aspect Ratio**: 16:9
- **Duration**: 3-8 minutes (optimal for web viewing)
- **File Size**: Under 50MB for better loading performance
- **Encoding**: H.264 for MP4, VP9 for WebM

### 4. Thumbnail Image
The video player uses this thumbnail image:
```
/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.47_8c730d5b.jpg
```

You can replace this with a custom video thumbnail if needed.

### 5. Current Functionality

**Without Video File:**
- Shows an interactive placeholder with "Coming Soon" message
- Displays thumbnail image with hover effects
- Shows notification when clicked
- Includes visual indicators (badges, animations)

**With Video File:**
- Automatically detects video presence
- Provides full video player controls
- Shows play/pause functionality
- Includes video duration and status badges
- Responsive design for all devices

### 6. Testing

After adding the video file:
1. Refresh the website
2. Navigate to the Asar 15 section
3. The video should automatically be detected
4. Click to play and test all controls

### 7. Git Considerations

Note: Video files are currently ignored by Git (see `.gitignore`):
```
*.mp4
*.webm
public/assets/video/*.mp4
```

If you want to commit video files to the repository:
1. Remove the video extensions from `.gitignore`
2. Use Git LFS for large video files
3. Consider hosting videos externally for better performance

### 8. Alternative: External Video Hosting

For better performance, consider hosting the video on:
- **YouTube** (embed with custom player)
- **Vimeo** (professional hosting)
- **AWS S3** or **Cloudinary** (CDN hosting)

To use external hosting, modify the video source in:
```
src/components/Asar15VideoPlayer.jsx
```

### 9. Performance Optimization

The video player includes:
- ✅ Lazy loading
- ✅ Poster image for faster initial load
- ✅ Multiple format support
- ✅ Error handling
- ✅ Mobile-responsive design
- ✅ Accessibility features

---

**Ready to go!** Once you add the video file, the Asar 15 section will automatically become fully functional.