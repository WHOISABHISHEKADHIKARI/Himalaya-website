import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(handleScroll);

    // Bilingual page change announcement
    const pageTitle = document.title || pathname.split('/').pop() || 'Home';
    const isNepaliPath = pathname.startsWith('/ne/');
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    
    // Set bilingual announcement text
    announcement.innerHTML = `
      <span lang="ne">पृष्ठमा पुग्नुभयो: ${isNepaliPath ? pageTitle : ''}</span>
      <span>Navigated to: ${!isNepaliPath ? pageTitle : ''}</span>
    `;
    
    // Add language attributes
    announcement.setAttribute('lang', isNepaliPath ? 'ne' : 'en');
    document.body.appendChild(announcement);

    // Handle focus management for accessibility
    const mainContent = document.querySelector('main, [role="main"]');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus({ preventScroll: true });
    }

    return () => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
      if (mainContent) {
        mainContent.removeAttribute('tabindex');
      }
    };
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;