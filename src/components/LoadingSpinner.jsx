import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-64 h-2 bg-emerald-100 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500 animate-loading"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;