import React from 'react';
import { Helmet } from 'react-helmet-async';
import whiteLogoBlackBg from '../assets/logo/whitelogo-blackbg.png';

const FaviconHelmet = () => {
  return (
    <Helmet>
      <link rel="icon" href={whiteLogoBlackBg} />
      <link rel="icon" type="image/png" href={whiteLogoBlackBg} />
      <link rel="apple-touch-icon" href={whiteLogoBlackBg} />
      <meta name="theme-color" content="#1C4E37" />
    </Helmet>
  );
};

export default FaviconHelmet;