import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaTrash, FaImage, FaVideo, FaFile, FaEye, FaCrop, FaDownload } from 'react-icons/fa';

// Media storage utility
const MEDIA_STORAGE_KEY = 'himalaya_media_library';

const getMediaLibrary = () => {
    try {
        return JSON.parse(localStorage.getItem(MEDIA_STORAGE_KEY)) || [];
    } catch {
        return [];
    }
};

const saveMediaLibrary = (media) => {
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(media));
};

const addToMediaLibrary = (file) => {
    const media = getMediaLibrary();
    const newMedia = {
        id: Date.now() + Math.random(),
        name: file.name,
        url: file.url,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString(),
        alt: file.alt || '',
        caption: file.caption || ''
    };
    media.unshift(newMedia);
    saveMediaLibrary(media);
    return newMedia;
};

const removeFromMediaLibrary = (id) => {
    const media = getMediaLibrary();
    const filtered = media.filter(item => item.id !== id);
    saveMediaLibrary(filtered);
};

// Clean up blob URLs by removing them (they're invalid after page reload)
const cleanupBlobUrls = () => {
    try {
        // Clean media library
        const media = getMediaLibrary();
        const cleanedMedia = media.filter(item => {
            if (item.url && item.url.startsWith('blob:')) {
                console.warn('Removing invalid blob URL from media library:', item.name);
                return false;
            }
            return true;
        });
        
        if (cleanedMedia.length !== media.length) {
            saveMediaLibrary(cleanedMedia);
            console.log('Cleaned up blob URLs from media library');
        }
        
        // Clean blog posts
        const POSTS_KEY = 'himalaya_blog_posts';
        const posts = JSON.parse(localStorage.getItem(POSTS_KEY)) || [];
        let postsChanged = false;
        
        const cleanedPosts = posts.map(post => {
            if (post.featuredImage && post.featuredImage.startsWith('blob:')) {
                console.warn('Removing invalid blob URL from post:', post.title);
                postsChanged = true;
                return { ...post, featuredImage: null };
            }
            return post;
        });
        
        if (postsChanged) {
            localStorage.setItem(POSTS_KEY, JSON.stringify(cleanedPosts));
            console.log('Cleaned up blob URLs from blog posts');
        }
        
    } catch (error) {
        console.error('Error during blob URL cleanup:', error);
    }
};

// File type detection
const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'file';
};

// File size formatter
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Media Item Component
const MediaItem = ({ media, onSelect, onDelete, selected, showActions = true }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ alt: media.alt, caption: media.caption });

    const handleSaveEdit = () => {
        const mediaLibrary = getMediaLibrary();
        const updatedLibrary = mediaLibrary.map(item => 
            item.id === media.id ? { ...item, ...editData } : item
        );
        saveMediaLibrary(updatedLibrary);
        setEditMode(false);
    };

    const getIcon = () => {
        switch (media.type.split('/')[0]) {
            case 'image': return <FaImage />;
            case 'video': return <FaVideo />;
            default: return <FaFile />;
        }
    };

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`relative group bg-white rounded-lg border-2 transition-all cursor-pointer ${
                    selected ? 'border-[#1C4E37] ring-2 ring-[#1C4E37]/20' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onSelect && onSelect(media)}
            >
                <div className="aspect-square p-4 flex items-center justify-center">
                    {media.type.startsWith('image/') ? (
                        <img
                            src={media.url}
                            alt={media.alt || media.name}
                            className="w-full h-full object-cover rounded"
                        />
                    ) : (
                        <div className="text-4xl text-gray-400">
                            {getIcon()}
                        </div>
                    )}
                </div>
                
                <div className="p-3 border-t">
                    <h4 className="font-medium text-sm truncate" title={media.name}>
                        {media.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(media.size)}
                    </p>
                </div>

                {showActions && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowPreview(true);
                                }}
                                className="p-1 bg-black/50 text-white rounded hover:bg-black/70"
                            >
                                <FaEye className="text-xs" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(media.id);
                                }}
                                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                <FaTrash className="text-xs" />
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Preview Modal */}
            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowPreview(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold">{media.name}</h3>
                                    <button
                                        onClick={() => setShowPreview(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        ×
                                    </button>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        {media.type.startsWith('image/') ? (
                                            <img
                                                src={media.url}
                                                alt={media.alt}
                                                className="w-full rounded-lg"
                                            />
                                        ) : (
                                            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                                                <div className="text-6xl text-gray-400">
                                                    {getIcon()}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">File Name</label>
                                            <p className="text-gray-600">{media.name}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium mb-1">File Size</label>
                                            <p className="text-gray-600">{formatFileSize(media.size)}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Upload Date</label>
                                            <p className="text-gray-600">{new Date(media.uploadDate).toLocaleDateString()}</p>
                                        </div>
                                        
                                        {editMode ? (
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Alt Text</label>
                                                    <input
                                                        type="text"
                                                        value={editData.alt}
                                                        onChange={(e) => setEditData({ ...editData, alt: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Caption</label>
                                                    <textarea
                                                        value={editData.caption}
                                                        onChange={(e) => setEditData({ ...editData, caption: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg"
                                                        rows={3}
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="px-4 py-2 bg-[#1C4E37] text-white rounded-lg hover:bg-[#164A32]"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditMode(false)}
                                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Alt Text</label>
                                                    <p className="text-gray-600">{media.alt || 'No alt text'}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Caption</label>
                                                    <p className="text-gray-600">{media.caption || 'No caption'}</p>
                                                </div>
                                                <button
                                                    onClick={() => setEditMode(true)}
                                                    className="px-4 py-2 bg-[#1C4E37] text-white rounded-lg hover:bg-[#164A32]"
                                                >
                                                    Edit Details
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Main Media Uploader Component
const MediaUploader = ({ onSelect, multiple = false, selectedMedia = [], maxFiles = 10 }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [mediaLibrary, setMediaLibrary] = useState(getMediaLibrary());
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const fileInputRef = useRef(null);
    
    // Clean up blob URLs on component mount
    React.useEffect(() => {
        cleanupBlobUrls();
        setMediaLibrary(getMediaLibrary());
    }, []);

    const handleFiles = useCallback(async (files) => {
        setUploading(true);
        const newMedia = [];

        for (const file of Array.from(files)) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                alert(`File ${file.name} is too large. Maximum size is 10MB.`);
                continue;
            }

            try {
                const url = URL.createObjectURL(file);
                const mediaItem = addToMediaLibrary({
                    name: file.name,
                    url,
                    type: file.type,
                    size: file.size
                });
                newMedia.push(mediaItem);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

        setMediaLibrary(getMediaLibrary());
        setUploading(false);
    }, []);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    }, [handleFiles]);

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleDelete = (id) => {
        removeFromMediaLibrary(id);
        setMediaLibrary(getMediaLibrary());
    };

    const filteredMedia = mediaLibrary.filter(media => {
        const matchesFilter = filter === 'all' || media.type.startsWith(filter);
        const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-[#1C4E37] bg-[#1C4E37]/5' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Drag and drop files here
                </h3>
                <p className="text-gray-500 mb-4">
                    or click to select files (Max 10MB each)
                </p>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-6 py-3 bg-[#1C4E37] text-white rounded-lg hover:bg-[#164A32] disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Select Files'}
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={multiple}
                    accept="image/*,video/*"
                    onChange={handleFileInput}
                    className="hidden"
                />
            </div>

            {/* Filters and Search */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                    {['all', 'image', 'video'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === type
                                    ? 'bg-[#1C4E37] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Search media..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                />
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <AnimatePresence>
                    {filteredMedia.map(media => (
                        <MediaItem
                            key={media.id}
                            media={media}
                            onSelect={onSelect}
                            onDelete={handleDelete}
                            selected={selectedMedia.some(item => item.id === media.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {filteredMedia.length === 0 && (
                <div className="text-center py-12">
                    <FaImage className="mx-auto text-6xl text-gray-300 mb-4" />
                    <p className="text-gray-500">
                        {searchTerm ? 'No media found matching your search.' : 'No media uploaded yet.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default MediaUploader;
export { getMediaLibrary, addToMediaLibrary, removeFromMediaLibrary, cleanupBlobUrls };