import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo/whitelogo-blackbg-removebg-preview.webp';

const Navbar = ({ isHomePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState('');
  const [isPulsing, setIsPulsing] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPulsing(false);
    }, 10000);
    
    // Preload logo
    const img = new Image();
    img.src = logo;
    
    return () => clearTimeout(timer);
  }, []);

  // Colors from the provided theme
  const colors = { 
    primary: '#1C4E37', 
    secondary: '#D8A51D', 
    light: '#F4F9F1', 
    accent: '#8C3E2F', 
    text: { 
      dark: '#1A2E1D', 
      medium: '#3A5944', 
      light: '#F9FCF7', 
      gold: '#D8A51D' 
    }, 
    background: { 
      primary: '#F4F9F1', 
      card: '#FFFFFF', 
      accent: 'rgba(216, 165, 29, 0.07)' 
    } 
  };

  // Define navigation items based on current page
  const navItems = isHomePage 
    ? ['About', 'Vision', 'Contact'] 
    : ['Home', 'About', 'Vision', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced WhatsApp click with tracking for analytics
  const handleWhatsAppClick = () => {
    // If you have analytics set up, you can track this click
    if (window.gtag) {
      window.gtag('event', 'click', {
        'event_category': 'engagement',
        'event_label': 'whatsapp_button'
      });
    }
    window.open(`https://wa.me/9779823405140`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        {/* Enhanced Bilingual Meta Tags */}
        <title>{`${
          location.pathname === '/' 
            ? 'हिमालय कृषि | Himalaya Krishi - नेपालको अग्रणी जैविक कृषि केन्द्र'
            : `${location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2)} | कृषि अनुदान र नीतिहरू - Agriculture Grants & Policies`
        }`}</title>
        
        <meta name="description" content={`${
          location.pathname === '/' 
            ? 'नेपालमा कृषि अनुदान, जैविक खेती र कृषि नीतिहरूको बारेमा जान्नुहोस्। सरकारी अनुदान र कृषि मन्त्रालयका कार्यक्रमहरूको जानकारी उपलब्ध छ। | Learn about agriculture grants, organic farming, and policies in Nepal.'
            : location.pathname === '/about'
            ? 'जैविक खेती र कृषि अनुदान सम्बन्धी जानकारी। हाम्रो यात्रा र उपलब्धिहरू। | Information about organic farming and agricultural grants. Our journey and achievements.'
            : location.pathname === '/vision'
            ? 'दिगो कृषि र जैविक खेतीको भविष्य। कृषि नीति र अनुदान कार्यक्रमहरू। | Future of sustainable farming and organic agriculture. Agricultural policies and grant programs.'
            : 'कृषि सम्बन्धी सल्लाह र सहयोगको लागि सम्पर्क गर्नुहोस्। | Contact us for agricultural consultation and support.'
        }`} />

        {/* Enhanced Keywords for Better SEO */}
        <meta name="keywords" content={`${
          location.pathname === '/' 
            ? 'कृषि अनुदान नेपाल, जैविक खेती, agriculture grants nepal, organic farming, sustainable agriculture, कृषि नीति, farming subsidies'
            : location.pathname === '/about'
            ? 'हिमालय कृषि इतिहास, जैविक खेती नेपाल, himalaya krishi history, organic farming nepal, sustainable agriculture practices'
            : location.pathname === '/vision'
            ? 'कृषि भविष्य, जैविक खेती योजना, agriculture future, organic farming plans, sustainable development goals'
            : 'कृषि सम्पर्क, जैविक खेती सल्लाह, agriculture contact, organic farming consultation, farming expert nepal'
        }`} />

        {/* Canonical URL to prevent duplicate content issues */}
        <link rel="canonical" href={`https://krishihimalaya.com${location.pathname}`} />

        {/* Language Alternates */}
        <link rel="alternate" hrefLang="ne" href={`https://krishihimalaya.com/ne${location.pathname}`} />
        <link rel="alternate" hrefLang="en" href={`https://krishihimalaya.com${location.pathname}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://krishihimalaya.com${location.pathname}`} />

        {/* Enhanced Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "हिमालय कृषि | Himalaya Krishi",
            "alternateName": ["Himalaya Agriculture", "हिमालय एग्रीकल्चर"],
            "url": "https://krishihimalaya.com",
            "logo": "https://krishihimalaya.com/assets/logo/logo_white_bg_removed.webp",
            "description": "नेपालको अग्रणी जैविक कृषि केन्द्र | Nepal's Leading Organic Agriculture Center",
            "knowsAbout": [
              "Organic Farming",
              "Agricultural Grants",
              "Farming Techniques",
              "Government Subsidies",
              "Agricultural Policies",
              "Sustainable Agriculture",
              "Crop Rotation",
              "Soil Health Management"
            ],
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61572480220650",
              "https://wa.me/9779823405140"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+977-9823405140",
              "contactType": "customer service",
              "availableLanguage": ["en", "ne"],
              "areaServed": "NP"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Manahari-5",
              "addressLocality": "Manahari",
              "addressRegion": "Makwanpur",
              "postalCode": "44400",
              "addressCountry": "Nepal"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "27.479941",
              "longitude": "84.843720"
            },
            "foundingDate": "2020",
            "founder": {
              "@type": "Person",
              "name": "Himalaya Krishi Team"
            }
          })}
        </script>

        {/* BreadcrumbList Schema for Better Navigation Understanding */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://krishihimalaya.com/"
              },
              ...(location.pathname !== '/' ? [{
                "@type": "ListItem",
                "position": 2,
                "name": location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2),
                "item": `https://krishihimalaya.com${location.pathname}`
              }] : [])
            ]
          })}
        </script>

        {/* Navigation Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": navItems.map(item => item),
            "url": navItems.map(item => 
              `https://krishihimalaya.com${item === 'Home' ? '/' : `/${item.toLowerCase()}`}`
            )
          })}
        </script>

        {/* Open Graph / Facebook - Enhanced */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://krishihimalaya.com${location.pathname}`} />
        <meta property="og:title" content={`${location.pathname === '/' ? 'Home' : location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2)} | Himalaya Krishi - Leading Organic Farming Excellence in Nepal`} />
        <meta property="og:description" content={`${location.pathname === '/' ? 'Discover Himalaya Krishi\'s organic farming excellence in Nepal. Leading sustainable agriculture practices and farmer empowerment since 2020.' : 
          location.pathname === '/about' ? 'Learn about Himalaya Krishi\'s journey in organic farming, our heritage, and commitment to sustainable agriculture in Nepal.' :
          location.pathname === '/vision' ? 'Explore Himalaya Krishi\'s vision for sustainable farming, organic excellence, and agricultural innovation in Nepal.' :
          'Connect with Himalaya Krishi for sustainable farming solutions and organic agriculture expertise in Nepal.'}`} />
        <meta property="og:image" content="https://krishihimalaya.com/assets/logo/whitelogo-blackbg-removebg-preview.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Himalaya Krishi" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ne_NP" />

        {/* Twitter - Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@himalayakrishi" />
        <meta name="twitter:url" content={`https://krishihimalaya.com${location.pathname}`} />
        <meta name="twitter:title" content={`${location.pathname === '/' ? 'Home' : location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2)} | Himalaya Krishi - Leading Organic Farming Excellence in Nepal`} />
        <meta name="twitter:description" content={`${location.pathname === '/' ? 'Discover Himalaya Krishi\'s organic farming excellence in Nepal. Leading sustainable agriculture practices and farmer empowerment since 2020.' : 
          location.pathname === '/about' ? 'Learn about Himalaya Krishi\'s journey in organic farming, our heritage, and commitment to sustainable agriculture in Nepal.' :
          location.pathname === '/vision' ? 'Explore Himalaya Krishi\'s vision for sustainable farming, organic excellence, and agricultural innovation in Nepal.' :
          'Connect with Himalaya Krishi for sustainable farming solutions and organic agriculture expertise in Nepal.'}`} />
        <meta name="twitter:image" content="https://krishihimalaya.com/assets/logo/whitelogo-blackbg-removebg-preview.webp" />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#1C4E37" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Additional SEO Enhancements */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Himalaya Krishi" />
        <meta name="google-site-verification" content="your-verification-code" />
      </Helmet>

      {/* Navigation with Bilingual Support */}
      <nav 
        className={`fixed w-full top-0 z-50 transition-all duration-700 ease-in-out ${
          scrolled ? 'bg-opacity-90 backdrop-blur-lg shadow-xl h-20' : 'bg-gradient-to-r h-28'
        }`}
        style={{
          backgroundColor: scrolled ? colors.primary : 'transparent',
          backgroundImage: !scrolled ? `linear-gradient(to right, ${colors.primary}, ${colors.primary})` : 'none'
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-700 h-full`}>
            <Link 
              to="/" 
              className="flex-shrink-0 transform hover:scale-105 transition-all duration-500"
              onMouseEnter={() => setIsHovered('logo')}
              onMouseLeave={() => setIsHovered('')}
              aria-label="Himalaya Krishi Home"
            >
              <img
                src={logo}
                alt="Himalaya Krishi Logo"
                className={`transition-all duration-700 ${
                  scrolled ? 'h-16' : 'h-24'
                } w-auto object-contain ${
                  isHovered === 'logo' ? 'filter drop-shadow-lg' : ''
                }`}
                style={{
                  filter: `drop-shadow(0 0 8px ${colors.secondary})`,
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                loading="eager"
                fetchpriority="high"
              />
            </Link>
            
            {/* Desktop Menu with Enhanced Animations */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onMouseEnter={() => setIsHovered(item)}
                  onMouseLeave={() => setIsHovered('')}
                  className={`relative text-lg font-semibold uppercase tracking-wider transition-all duration-500 group px-4 py-2 ${
                    scrolled ? 'text-base' : 'text-lg'
                  }`}
                  style={{
                    color: location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) || isHovered === item 
                      ? colors.text.gold 
                      : colors.text.light,
                    transform: isHovered === item ? 'translateY(-2px)' : 'none',
                    opacity: scrolled ? 0.9 : 1
                  }}
                >
                  {item}
                  <span 
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 group-hover:w-full w-0"
                    style={{ 
                      backgroundColor: colors.secondary,
                      boxShadow: isHovered === item ? '0 0 10px rgba(216, 165, 29, 0.5)' : 'none'
                    }}
                  ></span>
                </Link>
              ))}
              <button 
                onClick={handleWhatsAppClick}
                className={`relative overflow-hidden text-white px-8 py-3.5 rounded-full font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-xl active:scale-95 group ${
                  isPulsing ? 'animate-pulse' : ''
                }`}
                style={{ 
                  background: `linear-gradient(135deg, #D8A51D, #B88A17)`,
                  boxShadow: isHovered === 'chat' ? `0 8px 24px rgba(216, 165, 29, 0.4)` : '0 4px 12px rgba(216, 165, 29, 0.2)'
                }}
                onMouseEnter={() => setIsHovered('chat')}
                onMouseLeave={() => setIsHovered('')}
                aria-label="Get in Touch"
              >
                <span className="relative z-10">Get in Touch</span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, #B88A17, #D8A51D)` }}
                ></div>
              </button>
            </div>

            {/* Mobile Menu Button with Animations */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-3 rounded-md focus:outline-none transition-all duration-300 transform hover:scale-105"
                style={{ color: isOpen ? colors.secondary : colors.text.light }}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <HiX className="h-10 w-10 transition-transform duration-300 rotate-90" />
                ) : (
                  <HiMenu className="h-10 w-10 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with Enhanced Animations */}
        <div 
          id="mobile-menu"
          className={`md:hidden shadow-xl transition-all duration-500 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          style={{
            background: `linear-gradient(to bottom, ${colors.primary}f5, ${colors.primary}e5)`,
            backdropFilter: 'blur(8px)'
          }}
        >
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300"
                style={{
                  color: location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? colors.text.gold : colors.text.light,
                  backgroundColor: location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? `${colors.primary}a0` : 'transparent'
                }}
                onClick={() => setIsOpen(false)}
                aria-current={location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'page' : undefined}
              >
                {item}
              </Link>
            ))}
            <button 
              onClick={() => {
                handleWhatsAppClick();
                setIsOpen(false);
              }}
              className="w-full text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-98 mt-4"
              style={{ 
                background: `linear-gradient(135deg, #D8A51D, #B88A17)`,
                boxShadow: `0 4px 12px rgba(216, 165, 29, 0.3)`
              }}
              aria-label="Get in Touch"
            >
              <span className="flex items-center justify-center">
                Get in Touch
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;