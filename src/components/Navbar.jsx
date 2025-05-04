import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

// Lazy load components
const SEOHelmet = lazy(() => import('./SEOHelmet'));
const logo = new URL('../assets/logo/whitelogo-blackbg-removebg-preview.webp', import.meta.url).href;

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

  const colors = {
    primary: '#1C4E37',
    secondary: '#D8A51D',
    text: {
      light: '#F9FCF7',
      gold: '#D8A51D'
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
      <Suspense fallback={null}>
        <SEOHelmet location={location} navItems={navItems} />
      </Suspense>

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
                loading="lazy"
                decoding="async"
                width="150"
                height="150"
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