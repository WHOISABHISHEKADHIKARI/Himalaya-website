import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

const Asar15VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef(null);

  // Check if video file exists
  useEffect(() => {
    const checkVideoExists = async () => {
      try {
        const response = await fetch('/assets/video/asar15-mudfest.mp4', { method: 'HEAD' });
        if (response.ok) {
          setHasVideo(true);
        }
      } catch (error) {
        // Video doesn't exist, keep placeholder
        setHasVideo(false);
      }
    };
    
    checkVideoExists();
  }, []);

  const handlePlayClick = () => {
    if (hasVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowPlayButton(true);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      }
    } else {
      // Show message that video is coming soon
      alert('Asar 15 Mudfest video will be available soon! Stay tuned for an amazing farming experience showcase.');
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setHasVideo(false);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowPlayButton(true);
  };

  const handleVideoClick = () => {
    if (hasVideo) {
      handlePlayClick();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl group cursor-pointer" onClick={handleVideoClick}>
      {hasVideo && !videoError ? (
        // Actual video player
        <div className="relative h-96">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.47_8c730d5b.jpg"
            onError={handleVideoError}
            onEnded={handleVideoEnded}
            onPlay={() => setShowPlayButton(false)}
            onPause={() => setShowPlayButton(true)}
          >
            <source src="/assets/video/asar15-mudfest.mp4" type="video/mp4" />
            <source src="/assets/video/asar15-mudfest.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video controls overlay */}
          {showPlayButton && (
            <motion.div 
              className="absolute inset-0 bg-black/30 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                className="bg-white/90 backdrop-blur-sm rounded-full p-6 hover:bg-white transition-all duration-300 transform hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayClick();
                }}
              >
                <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </div>
      ) : (
        // Placeholder with interactive elements
        <div className="relative h-96 bg-gradient-to-br from-green-100 to-green-200">
          <OptimizedImage
            src="/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.47_8c730d5b.jpg"
            alt="Asar 15 Farm Experience & Mudfest - Coming Soon"
            className="w-full h-full object-cover"
            width={800}
            height={400}
            priority={false}
          />
          
          {/* Interactive overlay */}
          <motion.div 
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center text-white">
              <motion.div
                className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-4 mx-auto w-fit"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-16 h-16 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-2">Asar 15 Mudfest Video</h3>
                <p className="text-lg font-semibold mb-2">Coming Soon!</p>
                <p className="text-sm opacity-90 max-w-md mx-auto">
                  Experience the authentic farming life and vibrant mudfest celebrations. 
                  Click to get notified when available.
                </p>
              </motion.div>
              
              {/* Pulse animation for attention */}
              <motion.div
                className="absolute inset-0 border-4 border-white/30 rounded-2xl"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Video info badge */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
        {hasVideo ? '🎥 Video Available' : '🎬 Coming Soon'}
      </div>
      
      {/* Duration badge (placeholder) */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
        ~5:30
      </div>
    </div>
  );
};

export default Asar15VideoPlayer;