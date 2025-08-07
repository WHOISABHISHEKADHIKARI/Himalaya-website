import React, { useState, useEffect, useCallback } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Throttle scroll event handler for better performance
  const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  const toggleVisibility = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    setIsVisible(scrollY > 300);
  }, []);

  useEffect(() => {
    const throttledToggle = throttle(toggleVisibility, 150);
    window.addEventListener('scroll', throttledToggle, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledToggle);
  }, [toggleVisibility]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <aside role="complementary" aria-label="Scroll to top button container">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          title="Scroll to top"
          className="fixed bottom-8 right-8 bg-[#1C4E37] hover:bg-[#D8A51D] text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C4E37]"
        >
          <FaArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </aside>
  );
};

export default ScrollToTopButton;