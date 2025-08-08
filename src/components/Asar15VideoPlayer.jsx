import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Asar15VideoPlayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoExists, setVideoExists] = useState(false);

  // Check if video file exists
  useEffect(() => {
    const checkVideoExists = async () => {
      try {
        const response = await fetch('/assets/video/asar15-mudfest.mp4', { 
          method: 'HEAD',
          cache: 'no-cache'
        });
        setVideoExists(response.ok);
      } catch (error) {
        // Video doesn't exist, show placeholder
        setVideoExists(false);
      }
    };
    checkVideoExists();
  }, []);

  // If video doesn't exist, show placeholder
  if (!videoExists) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="relative bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-video flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-emerald-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">Asar 15 - Farm Experience & Mudfest</h3>
              <p className="text-emerald-700 mb-6 max-w-md mx-auto">
                Our special Asar 15 celebration video showcasing the traditional Mudfest and farm experiences will be available soon.
              </p>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-emerald-200">
                <p className="text-sm text-emerald-600 font-medium mb-2">📹 Video Coming Soon</p>
                <p className="text-xs text-emerald-500">
                  We're preparing an amazing video of our Asar 15 celebration. Check back soon!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        )}
        <video
          controls
          preload="metadata"
          poster="/assets/gallary/gallery-image-015.jpg"
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
            src="/assets/video/asar15-mudfest.mp4" 
            type="video/mp4"
          />
          <source 
            src="/assets/video/asar15-mudfest.webm" 
            type="video/webm"
          />
          <div className="w-full h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
            <p className="text-gray-500">Video not supported by your browser</p>
          </div>
        </video>
        {videoError && (
          <motion.div 
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-600 text-sm font-medium mb-2">📹 Video Loading Failed</p>
            <p className="text-red-500 text-xs">
              The Asar 15 video is temporarily unavailable. This may be due to file size or network issues. 
              Please try refreshing the page or check back later.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Asar15VideoPlayer;