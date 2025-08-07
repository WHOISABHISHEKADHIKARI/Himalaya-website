// Local blog data configuration with full CRUD operations
const BLOG_CONFIG = {
    // Local storage keys
    storageKeys: {
        posts: 'himalaya_blog_posts',
        categories: 'himalaya_blog_categories',
        tags: 'himalaya_blog_tags',
    },

    // Default categories
    defaultCategories: [
        { id: 1, name: 'Organic Farming', slug: 'organic-farming' },
        { id: 2, name: 'Sustainable Agriculture', slug: 'sustainable-agriculture' },
        { id: 3, name: 'Crop Management', slug: 'crop-management' },
        { id: 4, name: 'Animal Health', slug: 'animal-health' },
        { id: 5, name: 'Technology', slug: 'technology' },
    ],

    // Default tags
    defaultTags: [
        { id: 1, name: 'Nepal', slug: 'nepal' },
        { id: 2, name: 'Himalayan Farming', slug: 'himalayan-farming' },
        { id: 3, name: 'Organic', slug: 'organic' },
        { id: 4, name: 'Sustainable', slug: 'sustainable' },
        { id: 5, name: 'Innovation', slug: 'innovation' },
        { id: 6, name: 'Livestock', slug: 'livestock' },
        { id: 7, name: 'Disease Prevention', slug: 'disease-prevention' },
        { id: 8, name: 'Cattle Care', slug: 'cattle-care' },
    ],

    // CRUD Operations for Posts
    getPosts: () => {
        const posts = localStorage.getItem(BLOG_CONFIG.storageKeys.posts);
        return posts ? JSON.parse(posts) : [];
    },

    getPostById: (id) => {
        const posts = BLOG_CONFIG.getPosts();
        return posts.find(post => post.id === id);
    },

    getPostBySlug: (slug) => {
        const posts = BLOG_CONFIG.getPosts();
        return posts.find(post => post.slug === slug);
    },

    createPost: (postData) => {
        const posts = BLOG_CONFIG.getPosts();
        const newPost = {
            id: BLOG_CONFIG.generateId(),
            ...postData,
            slug: BLOG_CONFIG.generateSlug(postData.title),
            date: new Date().toISOString(),
            modified: new Date().toISOString(),
            views: 0,
        };
        const updatedPosts = [newPost, ...posts];
        BLOG_CONFIG.savePosts(updatedPosts);
        return newPost;
    },

    updatePost: (id, postData) => {
        const posts = BLOG_CONFIG.getPosts();
        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex !== -1) {
            posts[postIndex] = {
                ...posts[postIndex],
                ...postData,
                modified: new Date().toISOString(),
            };
            BLOG_CONFIG.savePosts(posts);
            return posts[postIndex];
        }
        return null;
    },

    deletePost: (id) => {
        const posts = BLOG_CONFIG.getPosts();
        const filteredPosts = posts.filter(post => post.id !== id);
        BLOG_CONFIG.savePosts(filteredPosts);
        return true;
    },

    savePosts: (posts) => {
        localStorage.setItem(BLOG_CONFIG.storageKeys.posts, JSON.stringify(posts));
    },

    // CRUD Operations for Categories
    getCategories: () => {
        const categories = localStorage.getItem(BLOG_CONFIG.storageKeys.categories);
        return categories ? JSON.parse(categories) : BLOG_CONFIG.defaultCategories;
    },

    createCategory: (categoryData) => {
        const categories = BLOG_CONFIG.getCategories();
        const newCategory = {
            id: BLOG_CONFIG.generateId(),
            ...categoryData,
            slug: BLOG_CONFIG.generateSlug(categoryData.name),
        };
        const updatedCategories = [...categories, newCategory];
        localStorage.setItem(BLOG_CONFIG.storageKeys.categories, JSON.stringify(updatedCategories));
        return newCategory;
    },

    updateCategory: (id, categoryData) => {
        const categories = BLOG_CONFIG.getCategories();
        const categoryIndex = categories.findIndex(cat => cat.id === id);
        if (categoryIndex !== -1) {
            categories[categoryIndex] = {
                ...categories[categoryIndex],
                ...categoryData,
                slug: BLOG_CONFIG.generateSlug(categoryData.name || categories[categoryIndex].name),
            };
            localStorage.setItem(BLOG_CONFIG.storageKeys.categories, JSON.stringify(categories));
            return categories[categoryIndex];
        }
        return null;
    },

    deleteCategory: (id) => {
        const categories = BLOG_CONFIG.getCategories();
        const filteredCategories = categories.filter(cat => cat.id !== id);
        localStorage.setItem(BLOG_CONFIG.storageKeys.categories, JSON.stringify(filteredCategories));
        return true;
    },

    // CRUD Operations for Tags
    getTags: () => {
        const tags = localStorage.getItem(BLOG_CONFIG.storageKeys.tags);
        return tags ? JSON.parse(tags) : BLOG_CONFIG.defaultTags;
    },

    createTag: (tagData) => {
        const tags = BLOG_CONFIG.getTags();
        const newTag = {
            id: BLOG_CONFIG.generateId(),
            ...tagData,
            slug: BLOG_CONFIG.generateSlug(tagData.name),
        };
        const updatedTags = [...tags, newTag];
        localStorage.setItem(BLOG_CONFIG.storageKeys.tags, JSON.stringify(updatedTags));
        return newTag;
    },

    updateTag: (id, tagData) => {
        const tags = BLOG_CONFIG.getTags();
        const tagIndex = tags.findIndex(tag => tag.id === id);
        if (tagIndex !== -1) {
            tags[tagIndex] = {
                ...tags[tagIndex],
                ...tagData,
                slug: BLOG_CONFIG.generateSlug(tagData.name || tags[tagIndex].name),
            };
            localStorage.setItem(BLOG_CONFIG.storageKeys.tags, JSON.stringify(tags));
            return tags[tagIndex];
        }
        return null;
    },

    deleteTag: (id) => {
        const tags = BLOG_CONFIG.getTags();
        const filteredTags = tags.filter(tag => tag.id !== id);
        localStorage.setItem(BLOG_CONFIG.storageKeys.tags, JSON.stringify(filteredTags));
        return true;
    },

    // Utility functions
    generateId: () => {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },

    generateSlug: (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    },

    // Search and filter functions
    searchPosts: (query) => {
        const posts = BLOG_CONFIG.getPosts();
        return posts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.content.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(query.toLowerCase())
        );
    },

    getPostsByCategory: (categoryId) => {
        const posts = BLOG_CONFIG.getPosts();
        return posts.filter(post => post.category && post.category.id === categoryId);
    },

    getPostsByTag: (tagId) => {
        const posts = BLOG_CONFIG.getPosts();
        return posts.filter(post => 
            post.tags && post.tags.some(tag => tag.id === tagId)
        );
    },

    // Utility function to clear all blog data
    clearAllData: () => {
        localStorage.removeItem(BLOG_CONFIG.storageKeys.posts);
        localStorage.removeItem(BLOG_CONFIG.storageKeys.categories);
        localStorage.removeItem(BLOG_CONFIG.storageKeys.tags);
        console.log('All blog data cleared from localStorage');
    },

    // Utility function to fix placeholder images in existing posts
    fixPlaceholderImages: () => {
        const posts = BLOG_CONFIG.getPosts();
        const updatedPosts = posts.map(post => {
            if (post.featuredImage && post.featuredImage.includes('/api/placeholder/')) {
                return { ...post, featuredImage: null };
            }
            return post;
        });
        BLOG_CONFIG.savePosts(updatedPosts);
        console.log('Fixed placeholder image URLs in existing posts');
        return updatedPosts.filter(p => p.featuredImage === null).length;
    },

    getPostsByStatus: (status) => {
        const posts = BLOG_CONFIG.getPosts();
        return posts.filter(post => post.status === status);
    },
};

export default BLOG_CONFIG;
