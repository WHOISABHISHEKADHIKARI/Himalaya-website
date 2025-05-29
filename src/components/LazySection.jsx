import React, { lazy, Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

const LazySection = ({ component: Component, ...props }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};

// Usage in pages
const TestimonialSlider = lazy(() => import('../components/TestimonialSlider'));
const FAQ = lazy(() => import('../components/FAQ'));