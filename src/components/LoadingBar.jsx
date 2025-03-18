import React from 'react';
import { Helmet } from 'react-helmet-async';
import './LoadingBar.css';

const LoadingBar = () => {
  return (
    <>
      <Helmet>
        <link rel="preload" href="./LoadingBar.css" as="style" />
        <style>
          {`
            @keyframes loadingAnimation {
              0% { width: 0%; }
              50% { width: 70%; }
              100% { width: 100%; }
            }
          `}
        </style>
      </Helmet>
      
      <div 
        className="loading-bar-container"
        role="progressbar"
        aria-label="सामग्री लोड हुँदैछ | Loading content"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="50"
        aria-busy="true"
      >
        <div 
          className="loading-bar"
          aria-hidden="true"
        ></div>
        <span className="sr-only">
          <span lang="ne">कृपया प्रतीक्षा गर्नुहोस्, सामग्री लोड हुँदैछ</span>
          <span lang="en">Please wait, content is loading</span>
        </span>
      </div>
    </>
  );
};

export default LoadingBar;