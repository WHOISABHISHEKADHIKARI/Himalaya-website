// API configuration for blog and other data fetching
const API_CONFIG = {
    // Base URL for API
    baseUrl: 'https://blogdata.dapirates.xyz',

    // API endpoints
    endpoints: {
        posts: '/wp-json/wp/v2/posts',
        categories: '/wp-json/wp/v2/categories',
        tags: '/wp-json/wp/v2/tags',
    },

    // Common parameters for API requests
    params: {
        posts: {
            _embed: true,
            per_page: 20,
        },
        singlePost: {
            _embed: true,
        },
    },

    // Get the base URL
    getBaseUrl: () => {
        return API_CONFIG.baseUrl;
    },

    // Helper function to build URLs with parameters
    buildUrl: (endpoint, params = {}) => {
        const baseUrl = API_CONFIG.getBaseUrl();
        const url = new URL(`${baseUrl}${endpoint}`);

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value);
            }
        });

        return url.toString();
    },
};

export default API_CONFIG;
