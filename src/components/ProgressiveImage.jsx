import React, { useState, useRef, useEffect } from 'react';
import SkeletonLoader from './SkeletonLoader';

const ProgressiveImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder,
  blurDataURL,
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
}) => {
  const [imageState, setImageState] = useState('loading'); // loading, loaded, error
  const [isInView, setIsInView] = useState(priority);
  const [lowResLoaded, setLowResLoaded] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Generate low-res placeholder
  const lowResSrc = src ? src.replace(/\.(jpg|jpeg|png)$/i, '_10w.$1') : null;
  
  // Generate responsive srcsets
  const generateSrcSet = (baseSrc, format) => {
    if (!baseSrc) return '';
    const breakpoints = [320, 480, 768, 1024, 1280, 1920];
    return breakpoints
      .map(size => {
        const optimizedSrc = baseSrc.replace(
          /\.(jpg|jpeg|png)$/i, 
          `_${size}w.${format}?q=${quality}`
        );
        return `${optimizedSrc} ${size}w`;
      })
      .join(', ');
  };

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
      { 
        threshold: 0.1, 
        rootMargin: '100px' // Load images 100px before they come into view
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [priority]);

  // Load low-res image first
  useEffect(() => {
    if (!isInView || !lowResSrc) return;

    const lowResImage = new Image();
    lowResImage.onload = () => setLowResLoaded(true);
    lowResImage.src = lowResSrc;
  }, [isInView, lowResSrc]);

  const handleImageLoad = () => {
    setImageState('loaded');
  };

  const handleImageError = () => {
    setImageState('error');
  };

  // Error state
  if (imageState === 'error') {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-gray-50 ${className}`}
      style={{ width, height }}
    >
      {/* Skeleton loader - shows initially */}
      {imageState === 'loading' && !lowResLoaded && !blurDataURL && (
        <div className="absolute inset-0 z-20">
          <SkeletonLoader 
            type="image" 
            width="100%" 
            height="100%" 
            className="absolute inset-0"
          />
        </div>
      )}

      {/* Blur placeholder or low-res image */}
      {(blurDataURL || (lowResLoaded && lowResSrc)) && imageState === 'loading' && (
        <img
          src={blurDataURL || lowResSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110 transition-opacity duration-300"
          style={{
            opacity: lowResLoaded || blurDataURL ? 1 : 0
          }}
          aria-hidden="true"
        />
      )}

      {/* Main high-res image */}
      {isInView && (
        <picture>
          {/* AVIF format for modern browsers */}
          <source 
            srcSet={generateSrcSet(src?.replace(/\.(jpg|jpeg|png)$/i, '.avif'), 'avif')} 
            type="image/avif" 
            sizes={sizes}
          />
          {/* WebP format fallback */}
          <source 
            srcSet={generateSrcSet(src?.replace(/\.(jpg|jpeg|png)$/i, '.webp'), 'webp')} 
            type="image/webp" 
            sizes={sizes}
          />
          {/* Original format fallback */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
              imageState === 'loaded'
                ? 'opacity-100 scale-100 filter-none'
                : 'opacity-0 scale-105 filter blur-sm'
            }`}
            style={{
              transform: imageState === 'loaded' ? 'scale(1)' : 'scale(1.02)',
              filter: imageState === 'loaded' ? 'blur(0px)' : 'blur(2px)'
            }}
          />
        </picture>
      )}

      {/* Loading indicator overlay */}
      {imageState === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 z-10">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin opacity-70" />
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;