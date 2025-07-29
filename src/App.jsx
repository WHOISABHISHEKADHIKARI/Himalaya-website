import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import ErrorBoundary from './components/ErrorBoundary'; // Import directly to avoid circular dependency

// Lazy load components
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const LoadingBar = lazy(() => import('./components/LoadingBar'));
const SEO = lazy(() => import('./pages/SEO'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Terms = lazy(() => import('./pages/Terms')); // Add this line

// Lazy load route components
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));
// Enhance lazy loading with prefetch
const About = lazy(() => import(/* webpackPrefetch: true */ './pages/About'));
const Vision = lazy(() => import(/* webpackPrefetch: true */ './pages/Vision'));
const Contact = lazy(() => import(/* webpackPrefetch: true */ './pages/Contact'));
const NewsAboutUs = lazy(() => import('./pages/NewsAboutUs'));
const Careers = lazy(() => import('./pages/Careers')); // Add this line
// Add these imports at the top with other lazy imports
const AgricultureSupport = lazy(() => import('./pages/AgricultureSupport'));
const Centers = lazy(() => import('./pages/Centers'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
  </div>
);

function App() {
  const location = useLocation();
  return (
    <ErrorBoundary location={location}>
      <HelmetProvider>
        <Suspense fallback={<div className="h-20 bg-[#1C4E37]"></div>}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/seo" element={<SEO />} />
            <Route path="/NewsAboutUs" element={<NewsAboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/agriculture-support-policies" element={<AgricultureSupport />} />
            <Route path="/centers/:centerName" element={<Centers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/ne/about" element={<About />} />
            <Route path="/ne/vision" element={<Vision />} />
            <Route path="/ne/contact" element={<Contact />} />
            <Route path="/ne/seo" element={<SEO />} />
            <Route path="/ne/news" element={<NewsAboutUs />} />
            <Route path="/ne/faq" element={<FAQ />} />
            <Route path="/ne/careers" element={<Careers />} />
            <Route path="/ne/terms" element={<Terms />} />
            <Route path="/ne/agriculture-support-policies" element={<AgricultureSupport />} />
            <Route path="/ne/centers/:centerName" element={<Centers />} />
            <Route path="/ne/blog" element={<Blog />} />
            <Route path="/ne/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Suspense fallback={<div className="h-20"></div>}>
          <Footer />
        </Suspense>
        <Analytics />
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
