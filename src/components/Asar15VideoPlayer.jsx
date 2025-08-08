import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Asar15VideoPlayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Video info badge */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-10">
        🎥 Asar 15 Mudfest
      </div>
      
      {/* Duration badge */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-10">
        ~5:30
      </div>

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl z-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
        </div>
      )}

      {/* Main video element */}
      <video
        controls
        preload="metadata"
        poster="/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.47_8c730d5b.jpg"
        className="w-full h-96 object-cover rounded-2xl"
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        onError={(e) => {
          console.warn('Asar 15 video loading failed:', e);
          setIsLoading(false);
          setVideoError(true);
        }}
      >
        <source 
          src="/assets/video/farmvideo.mp4" 
          type="video/mp4"
        />
        {/* Fallback content */}
        <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
          <p className="text-gray-500">Video not supported by your browser</p>
        </div>
      </video>

      {/* Error message */}
      {videoError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium mb-2">Video Loading Failed</p>
          <p className="text-red-500 text-xs">
            The Asar 15 video is temporarily unavailable. Please try refreshing the page or check back later.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Asar15VideoPlayer;