import React, { useState, useRef, useEffect } from 'react';

const VideoPlayer = ({ src, title, thumbnail, onError }) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = (e) => {
      console.error('Video loading error:', e);
      setError(true);
      setIsLoading(false);
      if (onError) onError(e);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      setError(false);
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [onError]);

  if (error) {
    return (
      <div className="video-error-container bg-gray-100 rounded-lg p-4 text-center">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-48 object-cover rounded mb-2"
        />
        <p className="text-red-600">Failed to load video. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="video-container relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full rounded-lg"
        controls
        preload="metadata"
        poster={thumbnail}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;