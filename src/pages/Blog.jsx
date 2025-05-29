import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaTags } from 'react-icons/fa';
import logo from '../assets/logo/whitelogo-blackbg-removebg-preview.webp';

// Premium color palette
const colors = {
    primary: '#1C4E37', // Deep forest green
    secondary: '#D8A51D', // Rich gold
    light: '#F4F9F1', // Soft sage white
    accent: '#8C3E2F', // Terracotta
    background: {
        primary: '#F4F9F1',
        card: '#FFFFFF',
        accent: 'rgba(216, 165, 29, 0.07)'
    }
};

// Add Helmet import
import { Helmet } from 'react-helmet-async';

// Add structured data for blog listing
const generateBlogStructuredData = () => {
    return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Himalaya Krishi Blog",
        "description": "Latest insights on organic farming, sustainable agriculture, and agricultural technology in Nepal",
        "url": "https://himalayakrishi.com/blog",
        "publisher": {
            "@type": "Organization",
            "name": "Himalaya Krishi",
            "logo": {
                "@type": "ImageObject",
                "url": "https://himalayakrishi.com/logo_512.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://himalayakrishi.com/blog"
        }
    };
};

// Add breadcrumb structured data
const generateBreadcrumbData = () => {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://himalayakrishi.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://himalayakrishi.com/blog"
            }
        ]
    };
};

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://blogdata.dapirates.xyz/wp-json/wp/v2/posts?_embed=true');
                const data = await response.json();
                setPosts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1C4E37]/5 via-white to-[#F4F9F1]/50">
            {/* Hero Section with Search */}
            <div className="relative overflow-hidden py-20 bg-[#1C4E37]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                            Our Blog
                        </h1>
                        <p className="text-xl opacity-90 mb-8">
                            Insights and Updates from Himalaya Krishi
                        </p>
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

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1C4E37] border-t-transparent mx-auto"></div>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-500">No blog posts available.</p>
                        </div>
                    ) : (
                        posts.map(post => (
                            <Link key={post.id} to={`/blog/${post.slug}`} className="block h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full flex flex-col"
                                >
                                    <div className="w-full h-48 bg-[#1C4E37] flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                                        {/* Clean overlay for consistency */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-[#D8A51D]/20"></div>
                                        
                                        {post._embedded?.['wp:featuredmedia'] ? (
                                            <img
                                                src={post._embedded['wp:featuredmedia'][0].source_url}
                                                alt={post.title.rendered}
                                                className="w-full h-full object-cover relative z-10 opacity-80"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
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
                                        <h2 className="text-xl font-bold text-[#1C4E37] mb-3 hover:text-[#D8A51D] transition-colors line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />
                                        <div 
                                            className="text-gray-600 mb-4 line-clamp-3 flex-grow"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                        />
                                        <span className="inline-flex items-center text-[#D8A51D] hover:text-[#1C4E37] transition-colors mt-auto">
                                            Read More →
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12 gap-2">
                    {[1, 2, 3].map(page => (
                        <button
                            key={page}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                page === 1
                                    ? 'bg-[#1C4E37] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;

// Add this after the opening div in Blog component
<Helmet>
    <title>Blog | Himalaya Krishi - Organic Farming Insights & Agricultural News Nepal</title>
    <meta name="description" content="Discover the latest insights on organic farming, sustainable agriculture, and agricultural technology in Nepal. Expert advice and updates from Himalaya Krishi." />
    <meta name="keywords" content="organic farming blog, sustainable agriculture Nepal, farming tips, agricultural technology, Himalaya Krishi news" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
    
    {/* Open Graph Meta Tags */}
    <meta property="og:title" content="Himalaya Krishi Blog - Organic Farming Insights Nepal" />
    <meta property="og:description" content="Discover the latest insights on organic farming, sustainable agriculture, and agricultural technology in Nepal." />
    <meta property="og:image" content="/logo_512.png" />
    <meta property="og:url" content="https://himalayakrishi.com/blog" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Himalaya Krishi" />
    
    {/* Twitter Card Meta Tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Himalaya Krishi Blog - Organic Farming Insights Nepal" />
    <meta name="twitter:description" content="Discover the latest insights on organic farming, sustainable agriculture, and agricultural technology in Nepal." />
    <meta name="twitter:image" content="/logo_512.png" />
    
    {/* Structured Data */}
    <script type="application/ld+json">
        {JSON.stringify(generateBlogStructuredData())}
    </script>
    <script type="application/ld+json">
        {JSON.stringify(generateBreadcrumbData())}
    </script>
    
    {/* Canonical URL */}
    <link rel="canonical" href="https://himalayakrishi.com/blog" />
</Helmet>
