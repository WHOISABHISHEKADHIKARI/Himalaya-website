import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageHandler = ({ src, alt, className, onClick }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setLoading(false);
        img.onerror = () => setError(true);
    }, [src]);

    const handleImageClick = () => {
        if (onClick) {
            onClick();
        } else {
            setIsZoomed(!isZoomed);
        }
    };

    return (
        <>
            <motion.div
                className={`relative overflow-hidden ${className}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {loading && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                )}
                {error ? (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">Image not available</span>
                    </div>
                ) : (
                    <img
                        src={src}
                        alt={alt}
                        className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                        onClick={handleImageClick}
                    />
                )}
            </motion.div>

            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setIsZoomed(false)}
                    >
                        <motion.img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[90vh] object-contain"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ImageHandler;