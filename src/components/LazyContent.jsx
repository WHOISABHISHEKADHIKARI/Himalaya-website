import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkeletonLoader from './SkeletonLoader';

const LazyContent = ({ 
  children, 
  skeleton, 
  delay = 0,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
  animationType = 'fadeIn',
  showSkeleton = true
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Add delay before showing content
          setTimeout(() => {
            setIsLoaded(true);
          }, delay);
          observerRef.current?.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => observerRef.current?.disconnect();
  }, [threshold, rootMargin, delay]);

  const animationVariants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    slideUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    slideLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    slideRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    stagger: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const currentAnimation = animationVariants[animationType] || animationVariants.fadeIn;

  return (
    <div ref={ref} className={className}>
      <AnimatePresence mode="wait">
        {!isLoaded && showSkeleton ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {skeleton || (
              <div className="space-y-4">
                <SkeletonLoader type="title" width="60%" />
                <SkeletonLoader type="text" count={3} />
                <SkeletonLoader type="image" height="200px" />
              </div>
            )}
          </motion.div>
        ) : isLoaded ? (
          <motion.div
            key="content"
            initial={currentAnimation.initial}
            animate={currentAnimation.animate}
            transition={currentAnimation.transition}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

// Specialized components for common use cases
export const LazyCard = ({ children, className = '', delay = 0 }) => (
  <LazyContent
    className={className}
    delay={delay}
    animationType="scaleIn"
    skeleton={
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <SkeletonLoader type="avatar" />
        <SkeletonLoader type="title" width="80%" />
        <SkeletonLoader type="text" count={3} />
        <SkeletonLoader type="button" />
      </div>
    }
  >
    {children}
  </LazyContent>
);

export const LazySection = ({ children, className = '', delay = 0 }) => (
  <LazyContent
    className={className}
    delay={delay}
    animationType="slideUp"
    skeleton={
      <div className="space-y-6">
        <SkeletonLoader type="title" width="40%" height="32px" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonLoader key={i} type="card" height="200px" />
          ))}
        </div>
      </div>
    }
  >
    {children}
  </LazyContent>
);

export const LazyText = ({ children, className = '', lines = 3, delay = 0 }) => (
  <LazyContent
    className={className}
    delay={delay}
    animationType="fadeIn"
    skeleton={
      <div className="space-y-2">
        <SkeletonLoader type="text" count={lines} />
      </div>
    }
  >
    {children}
  </LazyContent>
);

export const LazyGrid = ({ children, className = '', items = 6, delay = 0 }) => (
  <LazyContent
    className={className}
    delay={delay}
    animationType="stagger"
    skeleton={
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(items)].map((_, i) => (
          <SkeletonLoader key={i} type="card" height="250px" />
        ))}
      </div>
    }
  >
    {children}
  </LazyContent>
);

export default LazyContent;