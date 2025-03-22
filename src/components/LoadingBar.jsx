import React from 'react';

const LoadingBar = () => {
  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 bg-[#1C4E37]/10 dark:bg-[#1C4E37]/20 z-[9999] overflow-hidden transform-gpu backface-hidden perspective-1000 backdrop-blur-sm"
      role="progressbar"
      aria-label="सामग्री लोड हुँदैछ | Loading content"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow="50"
      aria-busy="true"
    >
      <div 
        className="h-full w-0 bg-gradient-to-r from-[#1C4E37] via-[#D8A51D] to-[#1C4E37] origin-left animate-loading motion-reduce:animate-loading-reduced forced:bg-[CanvasText] forced:forced-colors-adjust-none antialiased"
        aria-hidden="true"
      ></div>
      <span className="sr-only">
        <span lang="ne">कृपया प्रतीक्षा गर्नुहोस्, सामग्री लोड हुँदैछ</span>
        <span lang="en">Please wait, content is loading</span>
      </span>
    </div>
  );
};

export default LoadingBar;