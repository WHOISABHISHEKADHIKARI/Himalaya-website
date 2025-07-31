import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo/whitelogo-blackbg-removebg-preview.webp';

const Logo = () => (
  <>
    <Helmet>
      <link rel="preload" href={logo} as="image" type="image/webp" />
      <meta property="og:image" content={`${window.location.origin}/assets/logo/logo_512.png`} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content="हिमालय कृषि लोगो | Himalaya Krishi Logo" />
      <meta name="image" content={`${window.location.origin}/assets/logo/logo_512.png`} />
      <meta name="twitter:image" content={`${window.location.origin}/assets/logo/logo_512.png`} />
      <meta name="twitter:image:alt" content="हिमालय कृषि लोगो | Himalaya Krishi Logo" />
    </Helmet>

    <Link 
      to="/home" 
      className="flex items-center space-x-2 group"
      aria-label="हिमालय कृषि - गृहपृष्ठमा फर्कनुहोस् | Himalaya Krishi - Return to Homepage"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={logo}
          alt="हिमालय कृषि लोगो | Himalaya Krishi Logo"
          className="h-16 w-auto transform transition-all duration-300 group-hover:scale-105"
          loading="eager"
          fetchPriority="high"
          width="64"
          height="64"
          decoding="async"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        ></div>
      </div>
      <span className="sr-only">
        <span lang="ne">हिमालय कृषि - नेपालको जैविक कृषि केन्द्र</span>
        <span lang="en">Himalaya Krishi - Nepal's Organic Agriculture Center</span>
      </span>
    </Link>
  </>
);

export default Logo;