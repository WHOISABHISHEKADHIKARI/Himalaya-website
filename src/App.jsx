import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Lazy load all components
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary'));
const LoadingBar = lazy(() => import('./components/LoadingBar'));
const SEO = lazy(() => import('./pages/SEO'));
const FAQ = lazy(() => import('./pages/FAQ'));

// Lazy load route components
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));
// Enhance lazy loading with prefetch
const About = lazy(() => import(/* webpackPrefetch: true */ './pages/About'));
const Vision = lazy(() => import(/* webpackPrefetch: true */ './pages/Vision'));
const Contact = lazy(() => import(/* webpackPrefetch: true */ './pages/Contact'));

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <Suspense fallback={<div className="h-20 bg-[#1C4E37]"></div>}>
            <Navbar />
          </Suspense>
          <Suspense fallback={<LoadingBar />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/seo" element={<SEO />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Suspense fallback={<div className="h-20"></div>}>
            <Footer />
          </Suspense>
          <Analytics />
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
