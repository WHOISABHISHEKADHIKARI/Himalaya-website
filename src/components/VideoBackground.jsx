import React, { useRef, useEffect, useState } from 'react';

const VideoBackground = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(err => {
        console.error('Video playback error:', err);
        setError(true);
      });
    }
  }, []);

  if (error) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-cover bg-center bg-no-repeat">
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-w-full min-h-full object-cover w-full h-full"
        onError={() => setError(true)}
      >
        <source src="../videos/farmvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;