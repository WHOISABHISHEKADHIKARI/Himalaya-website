import React from 'react';
import { Helmet } from 'react-helmet-async';
import './LoadingBar.css';

const LoadingBar = () => {
  return (
    <>
      <Helmet>
        <link rel="preload" href="LoadingBar.css" as="style" />
      </Helmet>
      
      <div 
        className="loading-bar-container"
        role="progressbar"
        aria-label="Loading content"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="50"
      >
        <div 
          className="loading-bar"
          aria-hidden="true"
        ></div>
      </div>
    </>
  );
};

export default LoadingBar;