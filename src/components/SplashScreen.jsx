import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = ({ onFinish = () => {} }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [showText, setShowText] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onFinish) onFinish();
        navigate('/');
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1C4E37] to-[#173E2C] transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center px-6">
        <img 
          src="/assets/images/himalaya-logo-white.png"
          alt="Himalaya Krishi Logo" 
          className="w-64 h-64 mx-auto mb-6 filter brightness-100"
          onError={(e) => {
            console.error('Logo failed to load');
            setImageError(true);
          }}
          style={{ display: imageError ? 'none' : 'block' }}
        />
        {imageError && (
          <h1 className="text-4xl font-bold text-white mb-6">
            Himalaya Krishi
          </h1>
        )}
        <div className={`transform transition-all duration-1000 ${
          showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-xl text-white mb-2">
            Welcome to Nepal's Premier Organic Farm
          </p>
          <p className="text-lg text-[#D8A51D]/80">
            Nurturing Nature, Harvesting Excellence
          </p>
        </div>
        <div className="w-40 h-1 mx-auto mt-6 mb-8 bg-[#D8A51D]/30"></div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-full"></div>
          <p className="relative text-sm text-white/70 py-2 px-6 rounded-full border border-[#D8A51D]/20 hover:border-[#D8A51D]/40 transition-colors duration-300">
            © 2025 Himalaya Krishi. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;