import React, { useState, useRef, useEffect } from 'react';
import SkeletonLoader from './SkeletonLoader';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  showSkeleton = true,
  blurDataURL,
  quality = 75
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef(null);
  const observerRef = useRef(null);
  const maxRetries = 3;

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [priority]);

  // Generate optimized image sources (only if optimized versions exist)
  const generateSrcSet = (baseSrc, format) => {
    // For now, return empty string to use original images
    // This prevents 404 errors for non-existent optimized versions
    return '';
  };

  // Use original src for now since optimized versions may not exist
  const webpSrc = '';
  const avifSrc = '';

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    // Add retry mechanism with longer fallback time
    if (retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Attempt to reload image
        const img = imgRef.current;
        if (img) img.src = src;
      }, Math.max(20000, 1000 * Math.pow(2, retryCount))); // At least 20 seconds fallback
    }
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
        style={{ width, height }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Skeleton Loader */}
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 z-10">
          <SkeletonLoader 
            type="image" 
            width="100%" 
            height="100%" 
            className="absolute inset-0"
          />
        </div>
      )}

      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded 
              ? 'opacity-100 scale-100 filter-none' 
              : 'opacity-0 scale-105 filter blur-sm'
          }`}
          style={{
            transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
            filter: isLoaded ? 'blur(0px)' : 'blur(4px)'
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;