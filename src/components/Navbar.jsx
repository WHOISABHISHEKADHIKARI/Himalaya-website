import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo/logo_white_bg_removed.png';
 
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
      {/* SEO Optimization */}
      <Helmet>
        <title>{`${location.pathname === '/' ? 'Home' : location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2)} | Himalaya Krishi - Leading Organic Farming Excellence in Nepal`}</title>
        <meta name="description" content={`${location.pathname === '/' ? 'Discover Himalaya Krishi\'s organic farming excellence in Nepal. Leading sustainable agriculture practices and farmer empowerment since 1992.' : 
          location.pathname === '/about' ? 'Learn about Himalaya Krishi\'s journey in organic farming, our heritage, and commitment to sustainable agriculture in Nepal.' :
          location.pathname === '/vision' ? 'Explore Himalaya Krishi\'s vision for sustainable farming, organic excellence, and agricultural innovation in Nepal.' :
          'Connect with Himalaya Krishi for sustainable farming solutions and organic agriculture expertise in Nepal.'}`} />
        <link rel="canonical" href={`https://himalayakrishi.com${location.pathname}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://himalayakrishi.com${location.pathname}`} />
        <meta property="og:title" content={`${location.pathname === '/' ? 'Home' : location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2)} | Himalaya Krishi - Leading Organic Farming Excellence in Nepal`} />
        <meta property="og:description" content={`${location.pathname === '/' ? 'Discover Himalaya Krishi\'s organic farming excellence in Nepal. Leading sustainable agriculture practices and farmer empowerment since 1992.' : 
          location.pathname === '/about' ? 'Learn about Himalaya Krishi\'s journey in organic farming, our heritage, and commitment to sustainable agriculture in Nepal.' :
          location.pathname === '/vision' ? 'Explore Himalaya Krishi\'s vision for sustainable farming, organic excellence, and agricultural innovation in Nepal.' :
          'Connect with Himalaya Krishi for sustainable farming solutions and organic agriculture expertise in Nepal.'}`} />
        <meta property="og:image" content="/seo/og-image.png" />
        <meta property="og:site_name" content="Himalaya Krishi" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@himalayakrishi" />
        <meta name="twitter:url" content={`https://himalayakrishi.com${location.pathname}`} />
        <meta name="twitter:title" content={`${location.pathname === '/' ? 'Home' : location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2)} | Himalaya Krishi - Leading Organic Farming Excellence in Nepal`} />
        <meta name="twitter:description" content={`${location.pathname === '/' ? 'Discover Himalaya Krishi\'s organic farming excellence in Nepal. Leading sustainable agriculture practices and farmer empowerment since 1992.' : 
          location.pathname === '/about' ? 'Learn about Himalaya Krishi\'s journey in organic farming, our heritage, and commitment to sustainable agriculture in Nepal.' :
          location.pathname === '/vision' ? 'Explore Himalaya Krishi\'s vision for sustainable farming, organic excellence, and agricultural innovation in Nepal.' :
          'Connect with Himalaya Krishi for sustainable farming solutions and organic agriculture expertise in Nepal.'}`} />
        <meta name="twitter:image" content="/seo/og-image.png" />
      </Helmet>

      <nav 
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? `bg-opacity-95 backdrop-blur-md shadow-lg` 
            : 'bg-gradient-to-r'
        }`}
        style={{
          backgroundColor: scrolled ? colors.primary : 'transparent',
          backgroundImage: !scrolled ? `linear-gradient(to right, ${colors.primary}, ${colors.primary})` : 'none'
        }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-28 items-center">
            {/* Logo with Animation */}
            <Link 
              to="/" 
              className="flex-shrink-0 transform hover:scale-105 transition-all duration-500"
              onMouseEnter={() => setIsHovered('logo')}
              onMouseLeave={() => setIsHovered('')}
              aria-label="Aayo Rides Home"
            >
              <img
                src={logo}
                alt="Aayo Rides Logo"
                className={`h-24 w-auto object-contain transition-all duration-500 animate-glow ${
                  isHovered === 'logo' ? 'filter drop-shadow-lg' : ''
                }`}
                style={{
                  filter: `drop-shadow(0 0 8px ${colors.secondary})`,
                  transition: 'filter 0.5s ease-in-out'
                }}
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
                  className="relative text-lg font-semibold uppercase tracking-wider transition-all duration-300 group px-4 py-2"
                  style={{
                    color: location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) || isHovered === item 
                      ? colors.text.gold 
                      : colors.text.light,
                    transform: isHovered === item ? 'translateY(-2px)' : 'none'
                  }}
                  aria-current={location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'page' : undefined}
                >
                  {item}
                  <span 
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 group-hover:w-full w-0"
                    style={{ backgroundColor: colors.secondary }}
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