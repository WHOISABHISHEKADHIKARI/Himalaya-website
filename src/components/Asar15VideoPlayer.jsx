import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Asar15VideoPlayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
          </div>
        )}
        <video
          controls
          preload="metadata"
          poster="/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.47_8c730d5b.jpg"
          className="w-full rounded-lg shadow-lg"
          onLoadStart={() => setIsLoading(true)}
          onLoadedData={() => setIsLoading(false)}
          onError={(e) => {
            console.warn('Video loading failed:', e);
            setIsLoading(false);
            setVideoError(true);
          }}
        >
          <source 
            src="/assets/video/asar155.mp4" 
            type="video/mp4"
          />
          <div className="w-full h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
            <p className="text-gray-500">Video not supported by your browser</p>
          </div>
        </video>
        {videoError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-medium mb-2">Video Loading Failed</p>
            <p className="text-red-500 text-xs">
              The video file is temporarily unavailable. This may be due to the large file size or network issues. 
              Please try refreshing the page or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Asar15VideoPlayer;