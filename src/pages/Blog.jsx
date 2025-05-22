import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const heroTextAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://blogdata.dapirates.xyz/wp-json/wp/v2/posts?_embed=true', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }
                
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Unable to load blog posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        // Reset scroll position to top when component mounts
        window.scrollTo(0, 0);

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1C4E37]/5 via-white to-[#F4F9F1]/50 pt-3">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-[#1C4E37]/10 via-[#D8A51D]/5 to-[#1C4E37]/10 transform -skew-y-6"></div>
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#D8A51D]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-[#1C4E37]/5 rounded-full blur-4xl animate-pulse"></div>

            {/* Content */}
            <div className="relative">
                {/* Breadcrumb Navigation */}
                <nav aria-label="breadcrumb" className="container mx-auto px-4 py-4">
                    <ol className="flex items-center space-x-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-[#D8A51D] transition-colors duration-300">
                                <span lang="ne">मुख्य पृष्ठ</span>
                                <span className="mx-1">/</span>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li aria-current="page" className="text-[#D8A51D]">
                            <span lang="ne">ब्लग</span>
                            <span> / </span>
                            <span>Blog</span>
                        </li>
                    </ol>
                </nav>

                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            {/* Decorative gold line */}
                            <motion.div className="w-16 h-1 bg-[#D8A51D] mx-auto mb-8" variants={heroTextAnimation} />
                            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#1C4E37] relative">
                                <span className="relative">Blog</span>
                            </h1>
                            <p className="text-xl text-[#3A5944] max-w-3xl mx-auto font-light leading-relaxed">
                                Get the latest updates and insights from Himalaya Krishi.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="grid grid-cols-1 gap-6"
                        >
                            {loading ? (
                                <div className="flex justify-center items-center py-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D8A51D]"></div>
                                </div>
                            ) : error ? (
                                <div className="text-center py-8">
                                    <p className="text-red-500">{error}</p>
                                    <button 
                                        onClick={() => window.location.reload()} 
                                        className="mt-4 px-4 py-2 bg-[#D8A51D] text-white rounded hover:bg-[#1C4E37] transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : posts.length === 0 ? (
                                <p className="text-center text-gray-500">No blog posts available.</p>
                            ) : (
                                posts.map(post => (
                                    <div
                                        key={post.id}
                                        className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden p-4 md:p-6"
                                    >
                                        <div className="flex flex-col justify-between">
                                            <Link to={`/blog/${post.slug}`}>
                                                <h2 className="text-lg font-semibold text-[#1C4E37] hover:text-[#D8A51D] transition-colors">
                                                    {post.title.rendered}
                                                </h2>
                                            </Link>
                                            <p className="text-sm text-gray-500 mt-2">
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                            <p
                                                className="text-sm text-gray-600 mt-2"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        post.excerpt.rendered.length > 80
                                                            ? post.excerpt.rendered.substring(0, 80) + '...'
                                                            : post.excerpt.rendered,
                                                }}
                                            ></p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
