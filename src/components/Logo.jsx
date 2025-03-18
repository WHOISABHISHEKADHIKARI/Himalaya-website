import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo/whitelogo-blackbg.png';


const Logo = () => (
  <>
    <Helmet>
      <link rel="preload" href={logo} as="image" />
      <meta property="og:image" content={logo} />
      <meta name="image" content={logo} />
    </Helmet>

    <Link 
      to="/" 
      className="flex items-center space-x-2 group"
      aria-label="Himalaya Krishi - Return to Homepage"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={logo}
          alt="Himalaya Krishi Logo"
          className="h-16 w-auto transform transition-all duration-300 group-hover:scale-105"
          loading="eager"
          fetchpriority="high"
          width="64"
          height="64"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        ></div>
      </div>
    </Link>
  </>
);

export default Logo;