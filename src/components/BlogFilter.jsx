import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaSearch, FaTags, FaFolder } from 'react-icons/fa';

const BlogFilter = ({ posts, onFilteredPosts, categories, tags }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        filterPosts();
    }, [searchTerm, selectedCategory, selectedTag, sortBy, sortOrder, posts]);

    const filterPosts = () => {
        let filtered = [...posts];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => 
                post.category && post.category.slug === selectedCategory
            );
        }

        // Tag filter
        if (selectedTag !== 'all') {
            filtered = filtered.filter(post =>
                post.tags && post.tags.some(tag => tag.slug === selectedTag)
            );
        }

        // Sort posts
        filtered.sort((a, b) => {
            let aValue, bValue;
            
            switch (sortBy) {
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                case 'views':
                    aValue = a.views || 0;
                    bValue = b.views || 0;
                    break;
                case 'date':
                default:
                    aValue = new Date(a.date);
                    bValue = new Date(b.date);
                    break;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        onFilteredPosts(filtered);
    };

    return (
        <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-2 mb-6">
                <FaFilter className="text-[#D8A51D]" />
                <h3 className="text-xl font-semibold text-[#1C4E37]">Filter & Search Posts</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Search Input */}
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D8A51D] focus:border-transparent"
                    />
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <FaFolder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D8A51D] focus:border-transparent appearance-none"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tag Filter */}
                <div className="relative">
                    <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D8A51D] focus:border-transparent appearance-none"
                    >
                        <option value="all">All Tags</option>
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.slug}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Options */}
                <div className="flex gap-2">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D8A51D] focus:border-transparent"
                    >
                        <option value="date">Date</option>
                        <option value="title">Title</option>
                        <option value="views">Views</option>
                    </select>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D8A51D] focus:border-transparent"
                    >
                        <option value="desc">↓</option>
                        <option value="asc">↑</option>
                    </select>
                </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => {
                        setSelectedCategory('grass-farming');
                        setSelectedTag('all');
                    }}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
                >
                    Grass Farming
                </button>
                <button
                    onClick={() => {
                        setSelectedCategory('cattle-care');
                        setSelectedTag('all');
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                >
                    Cattle Care
                </button>
                <button
                    onClick={() => {
                        setSelectedCategory('vegetable-cultivation');
                        setSelectedTag('all');
                    }}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm hover:bg-orange-200 transition-colors"
                >
                    Vegetables
                </button>
                <button
                    onClick={() => {
                        setSelectedCategory('organic-fertilizer');
                        setSelectedTag('all');
                    }}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm hover:bg-yellow-200 transition-colors"
                >
                    Organic Fertilizer
                </button>
                <button
                    onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSelectedTag('all');
                        setSortBy('date');
                        setSortOrder('desc');
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                    Clear All
                </button>
            </div>
        </motion.div>
    );
};

export default BlogFilter;