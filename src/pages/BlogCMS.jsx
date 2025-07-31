import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import {
    FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter,
    FaTags, FaFolder, FaCalendar, FaUser, FaChartBar,
    FaSave, FaTimes, FaCheck, FaSignOutAlt, FaShieldAlt,
    FaImage, FaCog, FaUsers, FaFileAlt, FaCopy, FaExternalLinkAlt,
    FaEyeSlash
} from 'react-icons/fa';
import BLOG_CONFIG from '../config/api';
import { EnhancedProtectedRoute, useEnhancedAdminAuth, EnhancedSessionStatus, EnhancedLogoutButton } from '../components/EnhancedAdminAuth';
import MediaUploader from '../components/MediaUploader';
import RichTextEditor from '../components/RichTextEditor';

const BlogCMS = () => {
    const navigate = useNavigate();
    const { user, logout } = useEnhancedAdminAuth();
    const [activeTab, setActiveTab] = useState('posts');
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'category', 'tag', 'delete', 'media', 'settings'
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({ name: '' });
    const [message, setMessage] = useState('');
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [showQuickEdit, setShowQuickEdit] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [quickEditData, setQuickEditData] = useState({
        title: '',
        content: '',
        excerpt: '',
        status: 'draft'
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setPosts(BLOG_CONFIG.getPosts());
        setCategories(BLOG_CONFIG.getCategories());
        setTags(BLOG_CONFIG.getTags());
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
    };

    // Post operations
    const deletePost = (id) => {
        BLOG_CONFIG.deletePost(id);
        loadData();
        showMessage('Post deleted successfully!');
        setShowModal(false);
    };

    const handleDeletePost = (id) => {
        const post = posts.find(p => p.id === id);
        openModal('delete', post);
    };

    const handleQuickEdit = (post) => {
        setEditingPost(post);
        setQuickEditData({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
            status: post.status
        });
        setShowQuickEdit(true);
    };

    const handleSaveQuickEdit = () => {
        if (editingPost) {
            const updatedPost = {
                ...editingPost,
                ...quickEditData,
                updatedAt: new Date().toISOString()
            };
            
            BLOG_CONFIG.updatePost(editingPost.id, updatedPost);
            loadData();
            setShowQuickEdit(false);
            setEditingPost(null);
            showMessage('Post updated successfully!');
        }
    };

    const handleDuplicatePost = (post) => {
        const duplicatedPost = {
            ...post,
            title: `${post.title} (Copy)`,
            status: 'draft',
            id: undefined // Let the system generate a new ID
        };
        
        BLOG_CONFIG.createPost(duplicatedPost);
        loadData();
        showMessage('Post duplicated successfully!');
    };

    const togglePostStatus = (post) => {
        const newStatus = post.status === 'published' ? 'draft' : 'published';
        BLOG_CONFIG.updatePost(post.id, { status: newStatus });
        loadData();
        showMessage(`Post ${newStatus === 'published' ? 'published' : 'moved to draft'}!`);
    };

    // Category operations
    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (selectedItem) {
            BLOG_CONFIG.updateCategory(selectedItem.id, formData);
            showMessage('Category updated successfully!');
        } else {
            BLOG_CONFIG.createCategory(formData);
            showMessage('Category created successfully!');
        }
        loadData();
        setShowModal(false);
        setFormData({ name: '' });
        setSelectedItem(null);
    };

    const deleteCategory = (id) => {
        BLOG_CONFIG.deleteCategory(id);
        loadData();
        showMessage('Category deleted successfully!');
        setShowModal(false);
    };

    // Tag operations
    const handleTagSubmit = (e) => {
        e.preventDefault();
        if (selectedItem) {
            BLOG_CONFIG.updateTag(selectedItem.id, formData);
            showMessage('Tag updated successfully!');
        } else {
            BLOG_CONFIG.createTag(formData);
            showMessage('Tag created successfully!');
        }
        loadData();
        setShowModal(false);
        setFormData({ name: '' });
        setSelectedItem(null);
    };

    const deleteTag = (id) => {
        BLOG_CONFIG.deleteTag(id);
        loadData();
        showMessage('Tag deleted successfully!');
        setShowModal(false);
    };

    // Modal handlers
    const openModal = (type, item = null) => {
        setModalType(type);
        setSelectedItem(item);
        if (item) {
            setFormData({ name: item.name });
        } else {
            setFormData({ name: '' });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
        setSelectedItem(null);
        setFormData({ name: '' });
    };

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Statistics
    const stats = {
        totalPosts: posts.length,
        publishedPosts: posts.filter(p => p.status === 'published').length,
        draftPosts: posts.filter(p => p.status === 'draft').length,
        totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
    };

    return (
        <>
            <SEOHelmet />

            <div className="min-h-screen bg-gradient-to-br from-[#F4F9F1] to-[#EAEFE7]">
                {/* Admin Header */}
                <div className="bg-[#1C4E37] text-white shadow-lg">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center gap-4">
                                <FaShieldAlt className="text-2xl" />
                                <div>
                                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                                    <p className="text-white/70 text-sm">Welcome back, {user?.username}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/blog"
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    <FaEye /> View Blog
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <FaSignOutAlt /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-7xl py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-serif font-bold text-[#1C4E37] mb-2">
                                    Blog Management System
                                </h1>
                                <p className="text-[#3A5944]">
                                    Manage your blog posts, categories, and media content
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <EnhancedSessionStatus />
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => navigate('/blog')}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#1C4E37] text-white rounded-lg hover:bg-[#164A32] transition-colors"
                                    >
                                        <FaEye /> View Blog
                                    </button>
                                    <EnhancedLogoutButton />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Statistics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[#3A5944] text-sm">Total Posts</p>
                                        <p className="text-2xl font-bold text-[#1C4E37]">{stats.totalPosts}</p>
                                    </div>
                                    <FaFileAlt className="text-[#1C4E37] text-2xl" />
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[#3A5944] text-sm">Published</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.publishedPosts}</p>
                                    </div>
                                    <FaEye className="text-green-600 text-2xl" />
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[#3A5944] text-sm">Drafts</p>
                                        <p className="text-2xl font-bold text-orange-600">{stats.draftPosts}</p>
                                    </div>
                                    <FaEdit className="text-orange-600 text-2xl" />
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[#3A5944] text-sm">Total Views</p>
                                        <p className="text-2xl font-bold text-blue-600">{stats.totalViews}</p>
                                    </div>
                                    <FaChartBar className="text-blue-600 text-2xl" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Message */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6"
                        >
                            {message}
                        </motion.div>
                    )}

                    {/* Tabs */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="flex border-b">
                            {[
                                { id: 'posts', label: 'Posts', icon: FaFileAlt },
                                { id: 'categories', label: 'Categories', icon: FaFolder },
                                { id: 'tags', label: 'Tags', icon: FaTags },
                                { id: 'media', label: 'Media Library', icon: FaImage },
                                { id: 'settings', label: 'Settings', icon: FaCog },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-[#1C4E37] text-white'
                                            : 'text-[#3A5944] hover:bg-gray-50'
                                    }`}
                                >
                                    <tab.icon /> {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="p-6">
                            {/* Posts Tab */}
                            {activeTab === 'posts' && (
                                <div>
                                    {/* Search and Filter */}
                                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                                        <div className="flex-1 relative">
                                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search posts..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                            />
                                        </div>
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                        </select>
                                    </div>

                                    {/* Posts List */}
                                    <div className="space-y-4">
                                        {filteredPosts.map(post => (
                                            <motion.div
                                                key={post.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                                            >
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-[#1C4E37] mb-1">{post.title}</h3>
                                                    <div className="flex items-center gap-4 text-sm text-[#3A5944]">
                                                        <span>By {post.author}</span>
                                                        <span>{new Date(post.date).toLocaleDateString()}</span>
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            post.status === 'published'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-orange-100 text-orange-800'
                                                        }`}>
                                                            {post.status}
                                                        </span>
                                                        <span>{post.views || 0} views</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleQuickEdit(post)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                        title="Quick Edit"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDuplicatePost(post)}
                                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="Duplicate"
                                                    >
                                                        <FaCopy />
                                                    </button>
                                                    <button
                                                        onClick={() => togglePostStatus(post)}
                                                        className={`p-2 rounded-lg transition-colors ${
                                                            post.status === 'published'
                                                                ? 'text-orange-600 hover:bg-orange-100'
                                                                : 'text-green-600 hover:bg-green-100'
                                                        }`}
                                                        title={post.status === 'published' ? 'Move to Draft' : 'Publish'}
                                                    >
                                                        {post.status === 'published' ? <FaEyeSlash /> : <FaEye />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePost(post.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Categories Tab */}
                            {activeTab === 'categories' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-[#1C4E37]">Manage Categories</h2>
                                        <button
                                            onClick={() => openModal('category')}
                                            className="flex items-center gap-2 bg-[#1C4E37] text-white px-4 py-2 rounded-lg hover:bg-[#2A5F47] transition-colors"
                                        >
                                            <FaPlus /> Add Category
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {categories.map(category => (
                                            <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-[#1C4E37]">{category.name}</h3>
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => openModal('category', category)}
                                                            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                                        >
                                                            <FaEdit size={12} />
                                                        </button>
                                                        <button
                                                            onClick={() => openModal('delete', category)}
                                                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                        >
                                                            <FaTrash size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-[#3A5944]">
                                                    {BLOG_CONFIG.getPostsByCategory(category.id).length} posts
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags Tab */}
                            {activeTab === 'tags' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-[#1C4E37]">Manage Tags</h2>
                                        <button
                                            onClick={() => openModal('tag')}
                                            className="flex items-center gap-2 bg-[#1C4E37] text-white px-4 py-2 rounded-lg hover:bg-[#2A5F47] transition-colors"
                                        >
                                            <FaPlus /> Add Tag
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {tags.map(tag => (
                                            <div key={tag.id} className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-[#1C4E37]">{tag.name}</h3>
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => openModal('tag', tag)}
                                                            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                                        >
                                                            <FaEdit size={12} />
                                                        </button>
                                                        <button
                                                            onClick={() => openModal('delete', tag)}
                                                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                        >
                                                            <FaTrash size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-[#3A5944]">
                                                    {BLOG_CONFIG.getPostsByTag(tag.id).length} posts
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Media Library Tab */}
                            {activeTab === 'media' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-[#1C4E37]">Media Library</h2>
                                        <button
                                            onClick={() => openModal('media')}
                                            className="flex items-center gap-2 bg-[#1C4E37] text-white px-4 py-2 rounded-lg hover:bg-[#2A5F47] transition-colors"
                                        >
                                            <FaPlus /> Upload Media
                                        </button>
                                    </div>
                                    <MediaUploader
                                        onMediaSelect={(media) => setSelectedMedia(media)}
                                        multiple={true}
                                        showLibrary={true}
                                    />
                                </div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === 'settings' && (
                                <div>
                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold text-[#1C4E37] mb-4">Blog Settings</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h3 className="font-semibold text-[#1C4E37] mb-4 flex items-center gap-2">
                                                <FaUsers /> User Management
                                            </h3>
                                            <p className="text-[#3A5944] mb-4">Manage admin users and permissions</p>
                                            <button className="bg-[#1C4E37] text-white px-4 py-2 rounded-lg hover:bg-[#2A5F47] transition-colors">
                                                Manage Users
                                            </button>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h3 className="font-semibold text-[#1C4E37] mb-4 flex items-center gap-2">
                                                <FaCog /> General Settings
                                            </h3>
                                            <p className="text-[#3A5944] mb-4">Configure blog appearance and behavior</p>
                                            <button className="bg-[#1C4E37] text-white px-4 py-2 rounded-lg hover:bg-[#2A5F47] transition-colors">
                                                Configure
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Edit Modal */}
            <AnimatePresence>
                {showQuickEdit && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowQuickEdit(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-[#1C4E37]">
                                    Quick Edit: {editingPost?.title}
                                </h3>
                                <button
                                    onClick={() => setShowQuickEdit(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#3A5944] mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={quickEditData.title}
                                        onChange={(e) => setQuickEditData({ ...quickEditData, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#3A5944] mb-1">
                                        Excerpt
                                    </label>
                                    <textarea
                                        value={quickEditData.excerpt}
                                        onChange={(e) => setQuickEditData({ ...quickEditData, excerpt: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#3A5944] mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={quickEditData.status}
                                        onChange={(e) => setQuickEditData({ ...quickEditData, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#3A5944] mb-1">
                                        Content
                                    </label>
                                    <RichTextEditor
                                        value={quickEditData.content}
                                        onChange={(content) => setQuickEditData({ ...quickEditData, content })}
                                        height={300}
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={handleSaveQuickEdit}
                                        className="flex-1 bg-[#1C4E37] text-white py-2 rounded-lg hover:bg-[#2A5F47] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaSave /> Save Changes
                                    </button>
                                    <button
                                        onClick={() => setShowQuickEdit(false)}
                                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enhanced Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className={`bg-white rounded-xl p-6 w-full ${
                                modalType === 'media' ? 'max-w-6xl max-h-[90vh] overflow-auto' : 'max-w-md'
                            }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-[#1C4E37]">
                                    {modalType === 'media' ? 'Media Library' :
                                     modalType === 'delete' ? 'Confirm Delete' :
                                     `${selectedItem ? 'Edit' : 'Add'} ${modalType === 'category' ? 'Category' : 'Tag'}`}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {modalType === 'media' ? (
                                <MediaUploader
                                    onSelect={async (media) => {
                                        // Convert blob URL to data URL for persistence
                                        let processedMedia = media;
                                        if (media.url.startsWith('blob:')) {
                                            try {
                                                const response = await fetch(media.url);
                                                const blob = await response.blob();
                                                const reader = new FileReader();
                                                reader.onload = (e) => {
                                                    processedMedia = { ...media, url: e.target.result };
                                                    setSelectedMedia(prev => [...prev, processedMedia]);
                                                };
                                                reader.readAsDataURL(blob);
                                            } catch (error) {
                                                console.error('Error converting blob to data URL:', error);
                                                setSelectedMedia(prev => [...prev, media]);
                                            }
                                        } else {
                                            setSelectedMedia(prev => [...prev, media]);
                                        }
                                        setShowModal(false);
                                    }}
                                    multiple={true}
                                    selectedMedia={selectedMedia}
                                />
                            ) : modalType === 'delete' ? (
                                <div className="space-y-4">
                                    <p className="text-gray-600">
                                        Are you sure you want to delete "{selectedItem?.title || selectedItem?.name}"? This action cannot be undone.
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                if (selectedItem.title) {
                                                    deletePost(selectedItem.id);
                                                } else if (activeTab === 'categories') {
                                                    deleteCategory(selectedItem.id);
                                                } else {
                                                    deleteTag(selectedItem.id);
                                                }
                                            }}
                                            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={modalType === 'category' ? handleCategorySubmit : handleTagSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#3A5944] mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    {modalType === 'category' && (
                                        <div>
                                            <label className="block text-sm font-medium text-[#3A5944] mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                value={formData.description || ''}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                                rows={3}
                                            />
                                        </div>
                                    )}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-[#1C4E37] text-white py-2 rounded-lg hover:bg-[#2A5F47] transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaSave /> Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Wrap with authentication
const ProtectedBlogCMS = () => {
    return (
        <EnhancedProtectedRoute>
            <BlogCMS />
        </EnhancedProtectedRoute>
    );
};

export default ProtectedBlogCMS;