import React from 'react';

const SkeletonLoader = ({ 
  type = 'image', 
  width = '100%', 
  height = '200px', 
  className = '',
  count = 1,
  rounded = false 
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';
  
  const skeletonVariants = {
    image: `${baseClasses} ${rounded ? 'rounded-full' : 'rounded-lg'}`,
    text: `${baseClasses} rounded h-4 mb-2`,
    title: `${baseClasses} rounded h-6 mb-3`,
    card: `${baseClasses} rounded-lg p-4`,
    avatar: `${baseClasses} rounded-full w-12 h-12`,
    button: `${baseClasses} rounded-md h-10 w-24`
  };

  const renderSkeleton = (index) => {
    switch (type) {
      case 'image':
        return (
          <div 
            key={index}
            className={`${skeletonVariants.image} ${className}`}
            style={{ width, height }}
          />
        );
      
      case 'text':
        return (
          <div key={index} className={`${skeletonVariants.text} ${className}`} style={{ width }} />
        );
      
      case 'title':
        return (
          <div key={index} className={`${skeletonVariants.title} ${className}`} style={{ width }} />
        );
      
      case 'card':
        return (
          <div key={index} className={`${skeletonVariants.card} ${className}`} style={{ width, height }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded animate-pulse" />
                <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 rounded animate-pulse" />
              <div className="h-3 bg-gray-300 rounded w-5/6 animate-pulse" />
              <div className="h-3 bg-gray-300 rounded w-4/6 animate-pulse" />
            </div>
          </div>
        );
      
      case 'avatar':
        return (
          <div key={index} className={`${skeletonVariants.avatar} ${className}`} />
        );
      
      case 'button':
        return (
          <div key={index} className={`${skeletonVariants.button} ${className}`} />
        );
      
      default:
        return (
          <div 
            key={index}
            className={`${baseClasses} ${className}`}
            style={{ width, height }}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {Array.from({ length: count }, (_, index) => renderSkeleton(index))}
    </div>
  );
};

export default SkeletonLoader;