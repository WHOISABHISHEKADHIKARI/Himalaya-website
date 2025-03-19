import React, { useRef, useState, useEffect } from 'react';

const VideoBackground = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play();
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Video playback failed:', error);
        setVideoError(true);
        setIsLoading(false);
      }
    };

    loadVideo();
  }, []);

  if (videoError || isLoading) {
    return (
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/assets/images/fallback-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      onError={() => setVideoError(true)}
    >
      <source src="/videos/about-background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;