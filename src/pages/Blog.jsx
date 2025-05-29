import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaTags } from 'react-icons/fa';

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
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                {post._embedded?.['wp:featuredmedia'] && (
                                    <img
                                        src={post._embedded['wp:featuredmedia'][0].source_url}
                                        alt={post.title.rendered}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <FaCalendar className="text-[#D8A51D]" />
                                            {new Date(post.date).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaUser className="text-[#D8A51D]" />
                                            Admin
                                        </span>
                                    </div>
                                    <Link to={`/blog/${post.slug}`}>
                                        <h2 className="text-xl font-bold text-[#1C4E37] hover:text-[#D8A51D] transition-colors mb-3">
                                            {post.title.rendered}
                                        </h2>
                                    </Link>
                                    <div
                                        className="text-gray-600 mb-4 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                    />
                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-[#D8A51D] hover:text-[#1C4E37] transition-colors"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </motion.div>
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
