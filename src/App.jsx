import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingBar from './components/LoadingBar';

// Lazy load route components
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));
// Enhance lazy loading with prefetch
const About = lazy(() => import(/* webpackPrefetch: true */ './pages/About'));
const Vision = lazy(() => import(/* webpackPrefetch: true */ './pages/Vision'));
const Contact = lazy(() => import(/* webpackPrefetch: true */ './pages/Contact'));

function App() {
  return (
    <Router>
      <HelmetProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <Navbar />
          <Suspense fallback={<LoadingBar />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="vision" element={<Vision />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
          <Analytics />
        </ErrorBoundary>
      </HelmetProvider>
    </Router>
  );
}

export default App;
