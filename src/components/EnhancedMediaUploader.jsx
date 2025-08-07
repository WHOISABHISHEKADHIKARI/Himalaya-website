import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUpload, FaImage, FaVideo, FaFile, FaTrash, FaEdit,
  FaEye, FaDownload, FaCopy, FaCheck, FaTimes, FaSpinner,
  FaCloudUploadAlt, FaFolder, FaSearch, FaFilter, FaSortAmountDown,
  FaExpand, FaCompress, FaPlay, FaPause, FaVolumeUp, FaVolumeMute,
  FaCrop, FaAdjust, FaPalette, FaRedo, FaUndo, FaCamera,
  FaFileImage, FaFileVideo, FaFileAudio, FaFilePdf, FaFileWord,
  FaFileExcel, FaFilePowerpoint, FaFileArchive, FaFileCode
} from 'react-icons/fa';

// Enhanced Media Uploader Component
export const EnhancedMediaUploader = ({
  onUpload,
  onSelect,
  multiple = true,
  acceptedTypes = ['image/*', 'video/*', 'audio/*'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 10,
  enableCloudStorage = false,
  cloudProvider = 'local', // 'local', 's3', 'cloudinary'
  enableImageEditor = true,
  enableVideoPreview = true,
  showMediaLibrary = true,
  className = ''
}) => {
  const [files, setFiles] = useState([]);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showPreview, setShowPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [copiedUrl, setCopiedUrl] = useState('');
  
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Load media library on mount
  useEffect(() => {
    loadMediaLibrary();
  }, []);

  // Load media library (mock data for demo)
  const loadMediaLibrary = async () => {
    // In a real implementation, this would fetch from your backend
    const mockLibrary = [
      {
        id: '1',
        name: 'hero-image.jpg',
        type: 'image/jpeg',
        size: 2048576,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200',
        uploadDate: new Date('2024-01-15'),
        alt: 'Mountain landscape',
        caption: 'Beautiful mountain view'
      },
      {
        id: '2',
        name: 'blog-post-1.jpg',
        type: 'image/jpeg',
        size: 1536000,
        url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=200',
        uploadDate: new Date('2024-01-10'),
        alt: 'Forest path',
        caption: 'Peaceful forest trail'
      },
      {
        id: '3',
        name: 'sample-video.mp4',
        type: 'video/mp4',
        size: 15728640,
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200',
        uploadDate: new Date('2024-01-08'),
        alt: 'Sample video',
        caption: 'Demo video content'
      },
      {
        id: '4',
        name: 'document.pdf',
        type: 'application/pdf',
        size: 512000,
        url: '/sample-document.pdf',
        thumbnail: null,
        uploadDate: new Date('2024-01-05'),
        alt: 'PDF document',
        caption: 'Important document'
      }
    ];
    setMediaLibrary(mockLibrary);
  };

  // File type detection
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <FaFileImage className="text-blue-500" />;
    if (type.startsWith('video/')) return <FaFileVideo className="text-red-500" />;
    if (type.startsWith('audio/')) return <FaFileAudio className="text-green-500" />;
    if (type === 'application/pdf') return <FaFilePdf className="text-red-600" />;
    if (type.includes('word')) return <FaFileWord className="text-blue-600" />;
    if (type.includes('excel') || type.includes('spreadsheet')) return <FaFileExcel className="text-green-600" />;
    if (type.includes('powerpoint') || type.includes('presentation')) return <FaFilePowerpoint className="text-orange-600" />;
    if (type.includes('zip') || type.includes('rar') || type.includes('archive')) return <FaFileArchive className="text-yellow-600" />;
    if (type.includes('javascript') || type.includes('html') || type.includes('css')) return <FaFileCode className="text-purple-600" />;
    return <FaFile className="text-gray-500" />;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Validate file
  const validateFile = (file) => {
    const errors = [];
    
    // Check file size
    if (file.size > maxFileSize) {
      errors.push(`File size exceeds ${formatFileSize(maxFileSize)}`);
    }
    
    // Check file type
    const isValidType = acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });
    
    if (!isValidType) {
      errors.push(`File type ${file.type} is not supported`);
    }
    
    return errors;
  };

  // Handle file selection
  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    
    // Validate total number of files
    if (files.length + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }
    
    const validFiles = [];
    const invalidFiles = [];
    
    fileArray.forEach(file => {
      const errors = validateFile(file);
      if (errors.length === 0) {
        const fileWithId = {
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          type: file.type,
          size: file.size,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
          status: 'pending',
          progress: 0,
          errors: []
        };
        validFiles.push(fileWithId);
      } else {
        invalidFiles.push({ file, errors });
      }
    });
    
    if (invalidFiles.length > 0) {
      const errorMessage = invalidFiles.map(f => 
        `${f.file.name}: ${f.errors.join(', ')}`
      ).join('\n');
      alert(`Some files were rejected:\n${errorMessage}`);
    }
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      uploadFiles(validFiles);
    }
  };

  // Upload files
  const uploadFiles = async (filesToUpload) => {
    setUploading(true);
    
    for (const fileData of filesToUpload) {
      try {
        // Update file status
        setFiles(prev => prev.map(f => 
          f.id === fileData.id ? { ...f, status: 'uploading' } : f
        ));
        
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setUploadProgress(prev => ({ ...prev, [fileData.id]: progress }));
          setFiles(prev => prev.map(f => 
            f.id === fileData.id ? { ...f, progress } : f
          ));
        }
        
        // Simulate upload completion
        const uploadedFile = {
          id: fileData.id,
          name: fileData.name,
          type: fileData.type,
          size: fileData.size,
          url: fileData.preview || `/uploads/${fileData.name}`,
          thumbnail: fileData.preview,
          uploadDate: new Date(),
          alt: '',
          caption: ''
        };
        
        // Update file status
        setFiles(prev => prev.map(f => 
          f.id === fileData.id ? { ...f, status: 'completed', uploadedFile } : f
        ));
        
        // Add to media library
        setMediaLibrary(prev => [uploadedFile, ...prev]);
        
        // Call onUpload callback
        if (onUpload) {
          onUpload(uploadedFile);
        }
        
      } catch (error) {
        console.error('Upload failed:', error);
        setFiles(prev => prev.map(f => 
          f.id === fileData.id ? { ...f, status: 'error', errors: [error.message] } : f
        ));
      }
    }
    
    setUploading(false);
  };

  // Drag and drop handlers
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
      handleFileSelect(e.dataTransfer.files);
    }
  }, []);

  // Filter and search media
  const filteredMedia = mediaLibrary.filter(item => {
    const matchesType = filterType === 'all' || item.type.startsWith(filterType);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.alt && item.alt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (item.caption && item.caption.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return b.size - a.size;
      case 'type':
        return a.type.localeCompare(b.type);
      default: // date
        return new Date(b.uploadDate) - new Date(a.uploadDate);
    }
  });

  // Copy URL to clipboard
  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(''), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  // Remove file from upload queue
  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Delete from media library
  const deleteFromLibrary = (fileId) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setMediaLibrary(prev => prev.filter(f => f.id !== fileId));
    }
  };

  // Select/deselect files
  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  // Select files for insertion
  const handleSelectFiles = () => {
    const selected = mediaLibrary.filter(f => selectedFiles.includes(f.id));
    if (onSelect) {
      onSelect(selected);
    }
    setSelectedFiles([]);
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Media Library</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaUpload />
              Upload Files
            </button>
            {selectedFiles.length > 0 && (
              <button
                onClick={handleSelectFiles}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaCheck />
                Select ({selectedFiles.length})
              </button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="application">Documents</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
            <option value="type">Sort by Type</option>
          </select>
          
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            >
              <FaFolder />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            >
              <FaSortAmountDown />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        ref={dropZoneRef}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`p-8 border-2 border-dashed transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <div className="text-center">
          <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drag and drop files here, or click to select
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supports: {acceptedTypes.join(', ')} • Max size: {formatFileSize(maxFileSize)} • Max files: {maxFiles}
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Choose Files
          </button>
        </div>
      </div>

      {/* Upload Queue */}
      {files.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <h4 className="font-medium mb-3">Upload Queue</h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {file.preview ? (
                    <img src={file.preview} alt={file.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  
                  {file.status === 'uploading' && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{file.progress}%</p>
                    </div>
                  )}
                  
                  {file.status === 'error' && (
                    <p className="text-xs text-red-500 mt-1">{file.errors.join(', ')}</p>
                  )}
                  
                  {file.status === 'completed' && (
                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                      <FaCheck /> Uploaded successfully
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {file.status === 'uploading' && (
                    <FaSpinner className="animate-spin text-blue-600" />
                  )}
                  {file.status === 'completed' && (
                    <FaCheck className="text-green-600" />
                  )}
                  {file.status === 'error' && (
                    <FaTimes className="text-red-600" />
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Grid/List */}
      <div className="p-4">
        {filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <FaImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No media files found</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'
            : 'space-y-2'
          }>
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className={`group relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                  selectedFiles.includes(item.id) ? 'ring-2 ring-blue-500' : ''
                } ${
                  viewMode === 'list' ? 'flex items-center p-3' : 'aspect-square'
                }`}
              >
                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(item.id)}
                    onChange={() => toggleFileSelection(item.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                {/* Media Preview */}
                <div className={viewMode === 'list' ? 'flex-shrink-0 w-16 h-16 mr-3' : 'w-full h-full'}>
                  {item.type.startsWith('image/') ? (
                    <img
                      src={item.thumbnail || item.url}
                      alt={item.alt || item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : item.type.startsWith('video/') ? (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <FaFileVideo className="text-4xl text-gray-400" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaPlay className="text-white text-2xl drop-shadow-lg" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        {getFileIcon(item.type)}
                        {viewMode === 'grid' && (
                          <p className="text-xs text-gray-600 mt-1 truncate px-2">
                            {item.name.split('.').pop()?.toUpperCase()}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* File Info (List View) */}
                {viewMode === 'list' && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(item.size)} • {new Date(item.uploadDate).toLocaleDateString()}
                    </p>
                    {item.alt && (
                      <p className="text-xs text-gray-400 truncate">{item.alt}</p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className={`absolute ${viewMode === 'grid' ? 'top-2 right-2' : 'right-2'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setPreviewFile(item);
                        setShowPreview(true);
                      }}
                      className="p-1 bg-white rounded shadow-sm hover:bg-gray-50 transition-colors"
                      title="Preview"
                    >
                      <FaEye className="text-xs" />
                    </button>
                    
                    <button
                      onClick={() => copyToClipboard(item.url)}
                      className="p-1 bg-white rounded shadow-sm hover:bg-gray-50 transition-colors"
                      title="Copy URL"
                    >
                      {copiedUrl === item.url ? (
                        <FaCheck className="text-xs text-green-600" />
                      ) : (
                        <FaCopy className="text-xs" />
                      )}
                    </button>
                    
                    {item.type.startsWith('image/') && enableImageEditor && (
                      <button
                        onClick={() => {
                          setEditingImage(item);
                          setShowImageEditor(true);
                        }}
                        className="p-1 bg-white rounded shadow-sm hover:bg-gray-50 transition-colors"
                        title="Edit Image"
                      >
                        <FaEdit className="text-xs" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => deleteFromLibrary(item.id)}
                      className="p-1 bg-white rounded shadow-sm hover:bg-gray-50 transition-colors"
                      title="Delete"
                    >
                      <FaTrash className="text-xs text-red-600" />
                    </button>
                  </div>
                </div>

                {/* File Name (Grid View) */}
                {viewMode === 'grid' && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                    <p className="text-xs truncate" title={item.name}>{item.name}</p>
                    <p className="text-xs opacity-75">{formatFileSize(item.size)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={acceptedTypes.join(',')}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] w-full h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Header */}
              <div className="flex items-center justify-between p-4 bg-black bg-opacity-50">
                <div>
                  <h3 className="text-white font-medium">{previewFile.name}</h3>
                  <p className="text-gray-300 text-sm">
                    {formatFileSize(previewFile.size)} • {previewFile.type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={previewFile.url}
                    download={previewFile.name}
                    className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                    title="Download"
                  >
                    <FaDownload />
                  </a>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 flex items-center justify-center p-4">
                {previewFile.type.startsWith('image/') ? (
                  <img
                    src={previewFile.url}
                    alt={previewFile.alt || previewFile.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : previewFile.type.startsWith('video/') ? (
                  <video
                    src={previewFile.url}
                    controls
                    className="max-w-full max-h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : previewFile.type.startsWith('audio/') ? (
                  <div className="text-center">
                    <FaFileAudio className="text-6xl text-white mb-4 mx-auto" />
                    <audio src={previewFile.url} controls className="mx-auto" />
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">{getFileIcon(previewFile.type)}</div>
                    <p className="text-lg">{previewFile.name}</p>
                    <p className="text-gray-300">{previewFile.type}</p>
                    <a
                      href={previewFile.url}
                      download={previewFile.name}
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FaDownload /> Download
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Editor Modal (Placeholder) */}
      <AnimatePresence>
        {showImageEditor && editingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setShowImageEditor(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Image Editor</h3>
                <button
                  onClick={() => setShowImageEditor(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="text-center py-12">
                <FaImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Image Editor Coming Soon</p>
                <p className="text-sm text-gray-500">
                  This would integrate with a library like Fabric.js or Konva.js for image editing capabilities.
                </p>
                <div className="flex justify-center gap-2 mt-6">
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center gap-2">
                    <FaCrop /> Crop
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center gap-2">
                    <FaAdjust /> Adjust
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center gap-2">
                    <FaPalette /> Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedMediaUploader;