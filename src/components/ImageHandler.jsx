import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaDownload, FaShare, FaTimes } from 'react-icons/fa';

const ImageHandler = ({ src, alt, className, onClick, showControls = true, lazy = true, quality = 'high' }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imgRef = useRef(null);
    const observerRef = useRef(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (!lazy) {
            setIsInView(true);
            return;
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observerRef.current?.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (imgRef.current) {
            observerRef.current.observe(imgRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [lazy]);

    // Image loading logic
    useEffect(() => {
        if (!src || !isInView) {
            if (!src) {
                console.error('ImageHandler: No source provided');
                setError(true);
                setLoading(false);
            }
            return;
        }
        
        console.log('ImageHandler loading image:', src);
        const img = new Image();
        
        // Add quality parameters for better image loading
        const optimizedSrc = quality === 'high' ? `${src}?w=1200&h=800&fit=crop&auto=format,compress` : src;
        img.src = optimizedSrc;
        
        img.onload = () => {
            console.log('ImageHandler: Image loaded successfully');
            setLoading(false);
            setImageLoaded(true);
        };
        
        img.onerror = (e) => {
            console.error('ImageHandler: Error loading image:', e);
            // Fallback to original src if optimized fails
            if (optimizedSrc !== src) {
                img.src = src;
            } else {
                setError(true);
                setLoading(false);
            }
        };
    }, [src, isInView, quality]);

    const handleImageClick = () => {
        if (onClick) {
            onClick();
        } else {
            setIsZoomed(!isZoomed);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = alt || 'image';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: alt || 'Image',
                    url: src
                });
            } catch (error) {
                console.error('Share failed:', error);
            }
        }
    };

    return (
        <>
            <motion.div
                ref={imgRef}
                className={`relative overflow-hidden group cursor-pointer ${className}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Loading skeleton */}
                {loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                    </div>
                )}
                
                {/* Error state */}
                {error ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-500">
                        <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3 flex items-center justify-center">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium">Image not available</span>
                    </div>
                ) : (
                    <>
                        {/* Main image */}
                        <motion.img
                            src={isInView ? src : undefined}
                            alt={alt}
                            className={`w-full h-full object-cover transition-all duration-500 ${
                                loading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                            } group-hover:scale-110`}
                            onClick={handleImageClick}
                            loading={lazy ? 'lazy' : 'eager'}
                            onLoad={() => setImageLoaded(true)}
                        />
                        
                        {/* Image overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Image controls */}
                        {showControls && imageLoaded && (
                            <motion.div 
                                className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                            >
                                <motion.button
                                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-lg"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleImageClick();
                                    }}
                                    title="Expand image"
                                >
                                    <FaExpand size={14} />
                                </motion.button>
                                
                                <motion.button
                                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-lg"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownload();
                                    }}
                                    title="Download image"
                                >
                                    <FaDownload size={14} />
                                </motion.button>
                                
                                {navigator.share && (
                                    <motion.button
                                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-lg"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleShare();
                                        }}
                                        title="Share image"
                                    >
                                        <FaShare size={14} />
                                    </motion.button>
                                )}
                            </motion.div>
                        )}
                        
                        {/* Image caption overlay */}
                        {alt && (
                            <motion.div 
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ y: 10 }}
                                animate={{ y: 0 }}
                            >
                                <p className="text-white text-sm font-medium">{alt}</p>
                            </motion.div>
                        )}
                    </>
                )}
            </motion.div>

            {/* Fullscreen zoom modal */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setIsZoomed(false)}
                    >
                        {/* Close button */}
                        <motion.button
                            className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-200 z-10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsZoomed(false)}
                        >
                            <FaTimes size={20} />
                        </motion.button>
                        
                        {/* Zoomed image */}
                        <motion.img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        
                        {/* Image info */}
                        {alt && (
                            <motion.div
                                className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <p className="text-lg font-medium">{alt}</p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Custom styles for shimmer effect */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </>
    );
};

export default ImageHandler;