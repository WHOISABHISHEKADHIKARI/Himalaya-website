import React from 'react';
import logo from '../assets/logo/whitelogo-blackbg.png';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/" className="flex items-center space-x-2 group">
    <div className="relative overflow-hidden rounded-lg">
      <img
        src={logo}
        alt="Company Logo"
        className="h-16 w-auto transform transition-all duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  </Link>
);

export default Logo;