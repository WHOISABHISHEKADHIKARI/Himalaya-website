import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
        <title>पृष्ठ फेला परेन | Page Not Found - Himalaya Krishi</title>
        <meta name="description" content="माफ गर्नुहोस्, यो पृष्ठ उपलब्ध छैन। हिमालय कृषिको मुख्य पृष्ठमा फर्कनुहोस् र जैविक खेती, कृषि सहयोग र दिगो कृषि समाधानहरू पत्ता लगाउनुहोस्। | Sorry, this page isn't available. Return to Himalaya Krishi for organic farming solutions." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://krishihimalaya.com" />
        <link rel="alternate" hrefLang="ne" href="https://krishihimalaya.com/ne/404" />
        <link rel="alternate" hrefLang="en" href="https://krishihimalaya.com/404" />
        
        {/* Open Graph with bilingual support */}
        <meta property="og:locale" content="ne_NP" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:title" content="पृष्ठ फेला परेन | Page Not Found - Himalaya Krishi" />
        <meta property="og:description" content="जैविक खेती र कृषि समाधानहरूको लागि हाम्रो मुख्य पृष्ठमा जानुहोस् | Visit our homepage for organic farming solutions" />
        
        {/* Rest of meta tags remain the same ... */}
      </Helmet>
      <main className="flex-grow flex items-center justify-center py-20 px-4 pt-32">
        <div className="max-w-3xl text-center">
          <div className="mb-12">
            <h1 className="text-9xl font-bold" style={{ color: colors.primary }}>४०४</h1>
            <h2 className="text-4xl mt-4" style={{ color: colors.text.dark }}>
              पृष्ठ फेला परेन | Page Not Found
            </h2>
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

          <p className="text-xl mb-4" style={{ color: colors.text.medium }} lang="ne">
            माफ गर्नुहोस्, तपाईंले खोज्नुभएको पृष्ठ उपलब्ध छैन।
          </p>
          <p className="text-xl mb-8" style={{ color: colors.text.medium }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: colors.primary,
                color: colors.text.light,
                boxShadow: `0 4px 12px ${colors.secondary}40`
              }}
            >
              मुख्य पृष्ठमा फर्कनुहोस् | Return to Homepage
            </Link>
            
            <div className="mt-6">
              <p className="text-lg" style={{ color: colors.text.medium }}>
                हाम्रो लोकप्रिय सामग्रीहरू हेर्नुहोस् | Check our popular content:
              </p>
              <div className="mt-4 space-x-4">
                <Link to="/organic-farming" className="text-[#1C4E37] hover:underline">जैविक खेती | Organic Farming</Link>
                <Link to="/" className="text-[#1C4E37] hover:underline">कृषि सहयोग | Agriculture Support</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;