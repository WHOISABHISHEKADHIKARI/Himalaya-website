import React, { useRef, useState, useEffect } from 'react';
import fallbackImage from '../assets/image/imag1.webp';

const VideoBackground = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        if (videoRef.current) {
          videoRef.current.load();
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Video playback failed:', error);
        setVideoError(true);
        setIsLoading(false);
      }
    };

    const handleVideoError = () => {
      console.error('Video loading failed');
      setVideoError(true);
      setIsLoading(false);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('error', handleVideoError);
      loadVideo();
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('error', handleVideoError);
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, []);

  if (videoError || isLoading) {
    return (
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-in"
        style={{ 
          backgroundImage: `url(${fallbackImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        role="img"
        aria-label="Background fallback image"
      >
        {isLoading && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
      onError={() => setVideoError(true)}
    >
      <source src="/videos/about-background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;