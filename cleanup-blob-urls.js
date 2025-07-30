// Cleanup script for blob URLs in media library
const cleanupBlobUrls = () => {
    const MEDIA_STORAGE_KEY = 'himalaya_media_library';
    
    try {
        const media = JSON.parse(localStorage.getItem(MEDIA_STORAGE_KEY)) || [];
        console.log('Found media items:', media.length);
        
        // Remove all items with blob URLs
        const cleanedMedia = media.filter(item => {
            if (item.url && item.url.startsWith('blob:')) {
                console.log('Removing blob URL item:', item.name);
                return false;
            }
            return true;
        });
        
        localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(cleanedMedia));
        console.log('Cleanup complete. Remaining items:', cleanedMedia.length);
        
        // Also clear any blog posts with blob URLs
        const POSTS_KEY = 'himalaya_blog_posts';
        const posts = JSON.parse(localStorage.getItem(POSTS_KEY)) || [];
        const cleanedPosts = posts.map(post => {
            if (post.featuredImage && post.featuredImage.startsWith('blob:')) {
                console.log('Cleaning blob URL from post:', post.title);
                return { ...post, featuredImage: null };
            }
            return post;
        });
        localStorage.setItem(POSTS_KEY, JSON.stringify(cleanedPosts));
        
        console.log('All blob URLs cleaned up!');
        return true;
    } catch (error) {
        console.error('Error during cleanup:', error);
        return false;
    }
};

// Run cleanup
cleanupBlobUrls();

// Reload the page to reflect changes
window.location.reload();