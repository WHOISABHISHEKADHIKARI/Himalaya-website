import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
    <>
      <Helmet>
        <title>हिमालय कृषि | Himalaya Krishi - नेपालको अग्रणी जैविक फार्म</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="नेपालको अग्रणी जैविक कृषि फार्म। कृषि अनुदान, जैविक खेती र कृषि नीतिहरूको जानकारी उपलब्ध छ। | Nepal's leading organic farm. Information on agricultural grants, organic farming, and policies available." />
        
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://krishihimalaya.com" />
        <link rel="dns-prefetch" href="https://krishihimalaya.com" />
        <link rel="preload" href="/assets/images/himalaya-logo-white.webp" as="image" type="image/webp" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Himalaya Krishi" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Himalaya Krishi" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1C4E37" />
      </Helmet>

      <div 
        role="status"
        aria-label="हिमालय कृषि वेबसाइट लोड हुँदैछ | Loading Himalaya Krishi website"
        className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1C4E37] to-[#173E2C] transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center px-6">
          <img 
            src="/assets/images/himalaya-logo-white.webp"
            alt="हिमालय कृषि लोगो | Himalaya Krishi Logo" 
            className="w-64 h-64 mx-auto mb-6 filter brightness-100"
            onError={(e) => {
              console.error('Logo failed to load');
              setImageError(true);
            }}
            style={{ display: imageError ? 'none' : 'block' }}
            loading="eager"
            fetchpriority="high"
            width="256"
            height="256"
          />
          {imageError && (
            <h1 
              className="text-4xl font-bold text-white mb-6"
              aria-live="polite"
            >
              <span lang="ne">हिमालय कृषि</span>
              <span className="sr-only"> | </span>
              <span>Himalaya Krishi</span>
            </h1>
          )}
          <div 
            className={`transform transition-all duration-1000 ${
              showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            aria-live="polite"
          >
            <p className="text-xl text-white mb-2">
              <span lang="ne">नेपालको अग्रणी जैविक फार्ममा स्वागत छ</span>
              <span className="sr-only"> | </span>
              <span>Welcome to Nepal's Premier Organic Farm</span>
            </p>
            <p className="text-lg text-[#D8A51D]/80">
              <span lang="ne">प्रकृतिको हेरचाह, उत्कृष्टताको फसल</span>
              <span className="sr-only"> | </span>
              <span>Nurturing Nature, Harvesting Excellence</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;