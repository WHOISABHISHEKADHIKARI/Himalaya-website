import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>404 - Page Not Found | Himalaya Krishi</title>
        <meta name="description" content="The page you're looking for on Himalaya Krishi's website cannot be found. Please check the URL or navigate back to our homepage." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://himalayakrishi.com/404" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://himalayakrishi.com/404" />
        <meta property="og:title" content="404 - Page Not Found | Himalaya Krishi" />
        <meta property="og:description" content="The page you're looking for on Himalaya Krishi's website cannot be found. Please check the URL or navigate back to our homepage." />
        <meta property="og:image" content="/seo/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="404 - Page Not Found | Himalaya Krishi" />
        <meta name="twitter:description" content="The page you're looking for on Himalaya Krishi's website cannot be found. Please check the URL or navigate back to our homepage." />
        <meta name="twitter:image" content="/seo/og-image.png" />
      </Helmet>
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-3xl text-center">
          <div className="mb-12">
            <h1 className="text-9xl font-bold" style={{ color: colors.primary }}>404</h1>
            <h2 className="text-4xl mt-4" style={{ color: colors.text.dark }}>Page Not Found</h2>
          </div>
          
          <svg
            viewBox="0 0 200 200"
            className="w-64 h-64 mx-auto mb-12"
            style={{ color: colors.secondary }}
          >
            <path
              fill="currentColor"
              d="M54.2,-43.3C65.8,-27.6,68.2,-5.2,62.4,14.2C56.6,33.6,42.5,50.1,24.4,59.6C6.3,69.1,-15.9,71.6,-34.1,63.6C-52.3,55.6,-66.4,37.1,-70.2,16.2C-74.1,-4.7,-67.7,-27.1,-54.1,-43.4C-40.5,-59.7,-19.7,-70.1,2.2,-71.6C24.1,-73.1,42.6,-65.8,54.2,-43.3Z"
              transform="translate(100 100)"
            />
          </svg>

          <p className="text-xl mb-8" style={{ color: colors.text.medium }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link
            to="/"
            className="inline-block px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: colors.primary,
              color: colors.text.light,
              boxShadow: `0 4px 12px ${colors.secondary}40`
            }}
          >
            Return to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;