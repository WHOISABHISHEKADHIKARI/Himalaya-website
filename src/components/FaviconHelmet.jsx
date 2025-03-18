import React from 'react';
import { Helmet } from 'react-helmet-async';
import whiteLogoBlackBg from '../assets/logo/whitelogo-blackbg.png';

const FaviconHelmet = () => {
  return (
    <Helmet>
      {/* Standard Favicons */}
      <link rel="icon" type="image/png" sizes="16x16" href={whiteLogoBlackBg} />
      <link rel="icon" type="image/png" sizes="32x32" href={whiteLogoBlackBg} />
      <link rel="icon" type="image/png" sizes="48x48" href={whiteLogoBlackBg} />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href={whiteLogoBlackBg} />
      <link rel="apple-touch-icon" sizes="152x152" href={whiteLogoBlackBg} />
      <link rel="apple-touch-icon" sizes="120x120" href={whiteLogoBlackBg} />
      <link rel="apple-touch-icon" sizes="76x76" href={whiteLogoBlackBg} />
      <link rel="apple-touch-icon" sizes="60x60" href={whiteLogoBlackBg} />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-TileColor" content="#1C4E37" />
      <meta name="msapplication-TileImage" content={whiteLogoBlackBg} />
      
      {/* PWA Settings */}
      <meta name="theme-color" content="#1C4E37" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Himalaya Krishi" />
      
      {/* Safari Pinned Tab */}
      <link rel="mask-icon" href={whiteLogoBlackBg} color="#1C4E37" />
    </Helmet>
  );
};

export default FaviconHelmet;