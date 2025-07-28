import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser } from 'react-icons/fa';
import logo from '../assets/logo/whitelogo-blackbg-removebg-preview.webp';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../components/LoadingSpinner';

// Skeleton Card Component
const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col animate-pulse">
        <div className="w-full h-48 bg-gray-200 flex-shrink-0"></div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-4 mb-3">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="space-y-2 mb-3">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="space-y-2 mb-4 flex-grow">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-24 mt-auto"></div>
        </div>
    </div>
);

const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

// Blog Card Component
const BlogCard = ({ post, index }) => (
    <Link key={post.id} to={`/blog/${post.slug}`} className="block h-full">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full flex flex-col"
        >
            <div className="w-full h-48 bg-[#1C4E37] flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-[#D8A51D]/20"></div>

                {post._embedded?.['wp:featuredmedia'] ? (
                    <img
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover relative z-10 opacity-80"
                        loading="lazy"
                        onError={e => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                        crossOrigin="anonymous"
                    />
                ) : null}
                <div
                    className="w-full h-full flex items-center justify-center relative z-10"
                    style={{ display: post._embedded?.['wp:featuredmedia'] ? 'none' : 'flex' }}
                >
                    <img
                        src={logo}
                        alt="Himalaya Krishi Logo"
                        className="h-20 w-auto opacity-90 filter brightness-0 invert"
                        loading="lazy"
                    />
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center">
                        <FaCalendar className="mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                        <FaUser className="mr-1" />
                        Admin
                    </span>
                </div>
                <h2
                    className="text-xl font-bold text-[#1C4E37] mb-3 hover:text-[#D8A51D] transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{
                        __html: post.title.rendered
                            .replace(/src="http:\/\//gi, 'src="https://')
                            .replace(/<img(.*?)>/gi, '<img$1 crossorigin="anonymous">'),
                    }}
                />
                <div
                    className="text-gray-600 mb-4 line-clamp-3 flex-grow"
                    dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered
                            .replace(/src="http:\/\//gi, 'src="https://')
                            .replace(/<img(.*?)>/gi, '<img$1 crossorigin="anonymous">'),
                    }}
                />
                <span className="inline-flex items-center text-[#D8A51D] hover:text-[#1C4E37] transition-colors mt-auto">
                    Read More →
                </span>
            </div>
        </motion.div>
    </Link>
);

// Add structured data for blog listing
const generateBlogStructuredData = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Himalaya Krishi Blog',
        description:
            'Latest insights on organic farming, sustainable agriculture, and agricultural technology in Nepal',
        url: 'https://himalayakrishi.com/blog',
        publisher: {
            '@type': 'Organization',
            name: 'Himalaya Krishi',
            logo: {
                '@type': 'ImageObject',
                url: 'https://himalayakrishi.com/logo_512.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://himalayakrishi.com/blog',
        },
    };
};

// Add breadcrumb structured data
const generateBreadcrumbData = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://himalayakrishi.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://himalayakrishi.com/blog',
            },
        ],
    };
};

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const postsPerPage = 6;

    // API base URL
    const API_BASE_URL = 'https://blogdata.dapirates.xyz';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Build URL with URLSearchParams for better parameter handling
                const apiUrl = new URL(`${API_BASE_URL}/wp-json/wp/v2/posts`);
                apiUrl.searchParams.append('_embed', 'true');
                apiUrl.searchParams.append('per_page', '20');

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data);
                setDisplayedPosts(data.slice(0, postsPerPage));
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to load blog posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const loadMorePosts = () => {
        setLoadingMore(true);
        setTimeout(() => {
            const nextPage = page + 1;
            const startIndex = (nextPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const newPosts = posts.slice(startIndex, endIndex);

            setDisplayedPosts(prev => [...prev, ...newPosts]);
            setPage(nextPage);
            setLoadingMore(false);
        }, 500); // Simulate loading delay
    };

    const hasMorePosts = displayedPosts.length < posts.length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1C4E37]/5 via-white to-[#F4F9F1]/50">
            <Helmet>
                <title>Blog | Himalaya Krishi - Organic Farming Insights & Agricultural News Nepal</title>
                <meta
                    name="description"
                    content="Discover the latest insights on organic farming, sustainable agriculture, and agricultural technology in Nepal. Expert advice and updates from Himalaya Krishi."
                />
                <meta
                    name="keywords"
                    content="organic farming blog, sustainable agriculture Nepal, farming tips, agricultural technology, Himalaya Krishi news"
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Himalaya Krishi Blog - Organic Farming Insights Nepal" />
                <meta
                    property="og:description"
                    content="Discover the latest insights on organic farming, sustainable agriculture, and agricultural technology in Nepal."
                />
                <meta property="og:image" content="/logo_512.png" />
                <meta property="og:url" content="https://himalayakrishi.com/blog" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Himalaya Krishi" />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Himalaya Krishi Blog - Organic Farming Insights Nepal" />
                <meta
                    name="twitter:description"
                    content="Discover the latest insights on organic farming, sustainable agriculture, and agricultural technology in Nepal."
                />
                <meta name="twitter:image" content="/logo_512.png" />

                {/* Structured Data */}
                <script type="application/ld+json">{JSON.stringify(generateBlogStructuredData())}</script>
                <script type="application/ld+json">{JSON.stringify(generateBreadcrumbData())}</script>

                {/* Canonical URL */}
                <link rel="canonical" href="https://himalayakrishi.com/blog" />
            </Helmet>

            {/* Hero Section with Search */}
            <div className="relative overflow-hidden py-20 bg-[#1C4E37] mt-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Blog</h1>
                        <p className="text-xl opacity-90 mb-8">Insights and Updates from Himalaya Krishi</p>
                        <div className="max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#D8A51D]"
                            />
                        </div>
                    </motion.div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 left-0 w-full h-20 bg-white transform skew-y-3"></div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-20">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-4 justify-center mb-12">
                    {['all', 'farming', 'technology', 'sustainability'].map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                filter === category
                                    ? 'bg-[#1C4E37] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-center py-10">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 inline-block">
                            <p className="text-red-600 mb-2 font-medium">Error</p>
                            <p className="text-gray-700">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-[#1C4E37] text-white rounded-lg hover:bg-[#164A32] transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        // Show skeleton cards while loading
                        Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                    ) : displayedPosts.length === 0 ? (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-500">No blog posts available.</p>
                        </div>
                    ) : (
                        displayedPosts.map((post, index) => <BlogCard key={post.id} post={post} index={index} />)
                    )}

                    {/* Show skeleton cards while loading more */}
                    {loadingMore &&
                        Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={`loading-${index}`} />)}
                </div>

                {/* Load More Button */}
                {!loading && !error && hasMorePosts && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={loadMorePosts}
                            disabled={loadingMore}
                            className="px-8 py-3 bg-[#1C4E37] text-white rounded-full hover:bg-[#D8A51D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingMore ? 'Loading...' : 'Load More Posts'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
