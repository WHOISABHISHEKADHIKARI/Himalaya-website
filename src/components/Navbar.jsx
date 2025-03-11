import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../assets/logo/logo_white_bg_removed.png';
import { Helmet } from 'react-helmet'; // For SEO optimization

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState('');
  const location = useLocation();

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
        <meta name="description" content="Aayo Rides - Premium transportation services" />
        <link rel="canonical" href={`https://yourwebsite.com${location.pathname}`} />
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
                className={`h-24 w-auto object-contain transition-all duration-500 ${
                  isHovered === 'logo' ? 'filter drop-shadow-lg' : ''
                }`}
                style={{
                  filter: isHovered === 'logo' ? `drop-shadow(0 0 12px ${colors.secondary})` : 'none'
                }}
              />
            </Link>

            {/* Desktop Menu with Enhanced Animations */}
            <div className="hidden md:flex items-center space-x-10">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
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
                className="relative overflow-hidden text-white px-8 py-3.5 rounded-full font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-xl active:scale-95 group"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  boxShadow: isHovered === 'chat' ? `0 8px 24px rgba(28, 78, 55, 0.3)` : 'none'
                }}
                onMouseEnter={() => setIsHovered('chat')}
                onMouseLeave={() => setIsHovered('')}
                aria-label="Chat on WhatsApp"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Chat on WhatsApp</span>
                  <FaWhatsapp 
                    className={`w-5 h-5 transition-all duration-500 ${isHovered === 'chat' ? 'translate-x-1' : ''} group-hover:animate-pulse`} 
                  />
                </span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-180"
                  style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})` }}
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
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
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
              className="w-full text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-98 mt-4 group"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                boxShadow: `0 4px 12px rgba(28, 78, 55, 0.2)`
              }}
              aria-label="Chat on WhatsApp"
            >
              <span className="flex items-center justify-center space-x-3">
                <span>Chat on WhatsApp</span>
                <FaWhatsapp className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;