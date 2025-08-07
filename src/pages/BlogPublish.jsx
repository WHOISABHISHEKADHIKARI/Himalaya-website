import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import {
    FaSave, FaEye, FaImage, FaTags, FaFolder, FaCalendar,
    FaUser, FaUpload, FaTimes, FaPlus, FaTrash, FaPhotoVideo,
    FaArrowLeft
} from 'react-icons/fa';
import BLOG_CONFIG from '../config/api';
import MediaUploader from '../components/MediaUploader';
import RichTextEditor from '../components/RichTextEditor';
import { EnhancedProtectedRoute } from '../components/EnhancedAdminAuth';

const BlogPublish = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        category: '',
        tags: [],
        author: 'Himalaya Krishi Team',
        status: 'draft', // draft, published
    });
    const [categories] = useState(BLOG_CONFIG.getCategories());
    const [availableTags] = useState(BLOG_CONFIG.getTags());
    const [selectedTags, setSelectedTags] = useState([]);
    const [isPreview, setIsPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [showMediaLibrary, setShowMediaLibrary] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        if (editId) {
            const post = BLOG_CONFIG.getPostById(editId);
            if (post) {
                setIsEditing(true);
                setFormData({
                    title: post.title,
                    content: post.content,
                    excerpt: post.excerpt,
                    featuredImage: post.featuredImage,
                    category: post.category ? post.category.id.toString() : '',
                    author: post.author,
                    status: post.status,
                });
                setSelectedTags(post.tags || []);
            }
        }
    }, [editId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTagToggle = (tag) => {
        setSelectedTags(prev => {
            const isSelected = prev.find(t => t.id === tag.id);
            if (isSelected) {
                return prev.filter(t => t.id !== tag.id);
            } else {
                return [...prev, tag];
            }
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    featuredImage: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const saveBlogPost = (status = 'draft') => {
        setIsSaving(true);
        
        const postData = {
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt || formData.content.substring(0, 150) + '...',
            featuredImage: formData.featuredImage,
            category: categories.find(c => c.id === parseInt(formData.category)),
            tags: selectedTags,
            author: formData.author,
            status: status,
        };

        if (isEditing && editId) {
            // Update existing post
            BLOG_CONFIG.updatePost(editId, postData);
            setMessage(`Blog post ${status === 'published' ? 'updated and published' : 'updated'} successfully!`);
        } else {
            // Create new post
            BLOG_CONFIG.createPost(postData);
            setMessage(`Blog post ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
        }
        
        setIsSaving(false);
        
        setTimeout(() => {
            navigate('/blog/cms');
        }, 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveBlogPost('published');
    };

    const handleSaveDraft = () => {
        saveBlogPost('draft');
    };

    return (
        <>
            <SEOHelmet />

            <div className="min-h-screen bg-gradient-to-br from-[#F4F9F1] to-[#EAEFE7] py-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <button
                            onClick={() => navigate('/blog')}
                            className="flex items-center gap-2 text-[#1C4E37] hover:text-[#D8A51D] transition-colors mb-4"
                        >
                            <FaArrowLeft /> Back to Blog
                        </button>
                        <h1 className="text-4xl font-serif font-bold text-[#1C4E37] mb-2">
                            {isEditing ? 'Edit Blog Post' : 'Publish New Blog Post'}
                        </h1>
                        <p className="text-[#3A5944]">
                            {isEditing ? 'Update your blog post content' : 'Share your knowledge and insights with the farming community'}
                        </p>
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-[#1C4E37] font-semibold mb-2">
                                            Blog Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                            placeholder="Enter your blog title..."
                                            required
                                        />
                                    </div>

                                    {/* Excerpt */}
                                    <div>
                                        <label className="block text-[#1C4E37] font-semibold mb-2">
                                            Excerpt (Optional)
                                        </label>
                                        <textarea
                                            name="excerpt"
                                            value={formData.excerpt}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                            placeholder="Brief description of your blog post..."
                                        />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <label className="block text-[#1C4E37] font-semibold mb-2">
                                            Content *
                                        </label>
                                        <RichTextEditor
                                            value={formData.content}
                                            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                                            placeholder="Tell your story..."
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-4 pt-6">
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="flex items-center gap-2 bg-[#1C4E37] text-white px-6 py-3 rounded-lg hover:bg-[#2A5F47] transition-colors disabled:opacity-50"
                                        >
                                            <FaSave /> {isSaving ? 'Publishing...' : 'Publish'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveDraft}
                                            disabled={isSaving}
                                            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                                        >
                                            <FaSave /> Save Draft
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsPreview(!isPreview)}
                                            className="flex items-center gap-2 bg-[#D8A51D] text-white px-6 py-3 rounded-lg hover:bg-[#C4941A] transition-colors"
                                        >
                                            <FaEye /> {isPreview ? 'Edit' : 'Preview'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Featured Image */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <h3 className="text-[#1C4E37] font-semibold mb-4 flex items-center gap-2">
                                    <FaImage /> Featured Image
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            placeholder="Enter image URL..."
                                            value={formData.featuredImage}
                                            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowMediaLibrary(true)}
                                            className="px-4 py-3 bg-[#1C4E37] text-white rounded-lg hover:bg-[#164A32] transition-colors flex items-center gap-2"
                                        >
                                            <FaPhotoVideo /> Media Library
                                        </button>
                                    </div>
                                    {formData.featuredImage && (
                                        <div className="relative">
                                            <img
                                                src={formData.featuredImage}
                                                alt="Featured preview"
                                                className="w-full h-48 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, featuredImage: '' })}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <FaTimes className="text-sm" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Category */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <h3 className="text-[#1C4E37] font-semibold mb-4 flex items-center gap-2">
                                    <FaFolder /> Category
                                </h3>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </motion.div>

                            {/* Tags */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <h3 className="text-[#1C4E37] font-semibold mb-4 flex items-center gap-2">
                                    <FaTags /> Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableTags.map(tag => (
                                        <button
                                            key={tag.id}
                                            type="button"
                                            onClick={() => handleTagToggle(tag)}
                                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                                selectedTags.find(t => t.id === tag.id)
                                                    ? 'bg-[#1C4E37] text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {tag.name}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Author */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <h3 className="text-[#1C4E37] font-semibold mb-4 flex items-center gap-2">
                                    <FaUser /> Author
                                </h3>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                    placeholder="Author name"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Preview Modal */}
                    {isPreview && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                            onClick={() => setIsPreview(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="bg-white rounded-2xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-[#1C4E37]">Preview</h2>
                                    <button
                                        onClick={() => setIsPreview(false)}
                                        className="text-gray-500 hover:text-gray-700 text-xl"
                                    >
                                        ×
                                    </button>
                                </div>
                                
                                <article className="prose prose-lg max-w-none">
                                    <h1 className="text-3xl font-serif font-bold text-[#1C4E37] mb-4">
                                        {formData.title || 'Blog Title'}
                                    </h1>
                                    
                                    <div className="flex items-center gap-4 text-[#3A5944] text-sm mb-6">
                                        <span className="flex items-center gap-1">
                                            <FaUser /> {formData.author}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaCalendar /> {new Date().toLocaleDateString()}
                                        </span>
                                    </div>
                                    
                                    {formData.featuredImage && (
                                        <img
                                            src={formData.featuredImage}
                                            alt="Featured"
                                            className="w-full h-64 object-cover rounded-lg mb-6"
                                        />
                                    )}
                                    
                                    <div 
                                        className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: formData.content || '<p class="text-gray-400 italic">Blog content will appear here...</p>'
                                        }}
                                    />
                                    
                                    {selectedTags.length > 0 && (
                                        <div className="mt-8 pt-6 border-t">
                                            <h4 className="text-[#1C4E37] font-semibold mb-3">Tags:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedTags.map(tag => (
                                                    <span
                                                        key={tag.id}
                                                        className="bg-[#1C4E37] text-white px-3 py-1 rounded-full text-sm"
                                                    >
                                                        {tag.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </article>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Media Library Modal */}
                    <AnimatePresence>
                        {showMediaLibrary && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                                onClick={() => setShowMediaLibrary(false)}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-white rounded-2xl p-6 max-w-4xl max-h-[80vh] overflow-hidden"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-[#1C4E37]">Media Library</h2>
                                        <button
                                            onClick={() => setShowMediaLibrary(false)}
                                            className="text-gray-500 hover:text-gray-700 text-xl"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                    
                                    <MediaUploader
                                         onSelect={async (media) => {
                                             // Convert blob URL to data URL for persistence
                                             if (media.url.startsWith('blob:')) {
                                                 try {
                                                     const response = await fetch(media.url);
                                                     const blob = await response.blob();
                                                     const reader = new FileReader();
                                                     reader.onload = (e) => {
                                                         setFormData({ ...formData, featuredImage: e.target.result });
                                                     };
                                                     reader.readAsDataURL(blob);
                                                 } catch (error) {
                                                     console.error('Error converting blob to data URL:', error);
                                                     setFormData({ ...formData, featuredImage: media.url });
                                                 }
                                             } else {
                                                 setFormData({ ...formData, featuredImage: media.url });
                                             }
                                             setShowMediaLibrary(false);
                                         }}
                                         multiple={false}
                                         selectedMedia={selectedImages}
                                     />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

// Wrap with authentication
const ProtectedBlogPublish = () => {
    return (
        <EnhancedProtectedRoute>
            <BlogPublish />
        </EnhancedProtectedRoute>
    );
};

export default ProtectedBlogPublish;