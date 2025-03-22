import React from 'react';
import VideoPlayer from '../components/VideoPlayer';

const VideoPage = ({ videoId }) => {
  // Video data mapping
  const videoData = {
    'modern-farming-techniques': {
      src: '/videos/modern-farming-techniques.mp4',
      title: 'Modern Farming Techniques in Nepal',
      thumbnail: '/videos/thumbnails/modern-farming.webp'
    },
    'organic-farming-guide': {
      src: '/videos/organic-farming-guide.mp4',
      title: 'Organic Farming Guide',
      thumbnail: '/videos/thumbnails/organic-farming.webp'
    },
    'agriculture-policy-updates': {
      src: '/videos/agriculture-policy-updates.mp4',
      title: 'Agricultural Policy Updates',
      thumbnail: '/videos/thumbnails/policy-updates.webp'
    }
  };

  const video = videoData[videoId];

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Video not found. Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  const handleVideoError = (error) => {
    console.error('Video playback error:', error);
    // Additional error handling logic can be added here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{video.title}</h1>
      <div className="max-w-4xl mx-auto">
        <VideoPlayer
          src={video.src}
          title={video.title}
          thumbnail={video.thumbnail}
          onError={handleVideoError}
        />
      </div>
    </div>
  );
};

export default VideoPage;