import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4">
      <Helmet>
        <title>मर्मत कार्य जारी | Site Maintenance - Himalaya Krishi</title>
        <meta name="description" content="हिमालय कृषि वेबसाइट मर्मत कार्य जारी छ। जैविक खेती, कृषि सहयोग र दिगो कृषि सम्बन्धी जानकारीको लागि चाँडै फर्किनुहोस्। | Himalaya Krishi is under maintenance. Check back soon for organic farming and agricultural support information." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="alternate" hrefLang="ne" href="https://krishihimalaya.com/ne/maintenance" />
        <link rel="alternate" hrefLang="en" href="https://krishihimalaya.com/maintenance" />
        
        {/* Open Graph with bilingual support */}
        <meta property="og:locale" content="ne_NP" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:title" content="मर्मत कार्य जारी | Site Maintenance - Himalaya Krishi" />
        <meta property="og:description" content="जैविक खेती र कृषि सहयोग सम्बन्धी जानकारीको लागि चाँडै फर्किनुहोस् | Check back soon for organic farming updates" />
        
        {/* Schema.org LD+JSON with enhanced local business info */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MaintenancePage",
            "name": "मर्मत कार्य जारी | Site Maintenance",
            "description": "हिमालय कृषि वेबसाइट मर्मत कार्य जारी | Himalaya Krishi website under maintenance",
            "maintainer": {
              "@type": "LocalBusiness",
              "name": "हिमालय कृषि | Himalaya Krishi",
              "telephone": "+977-9823405140",
              "email": "info@krishihimalaya.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Manahari-5",
                "addressLocality": "Manahari",
                "addressRegion": "Makwanpur",
                "addressCountry": "Nepal"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "27.5295",
                "longitude": "84.8190"
              },
              "sameAs": [
                "https://facebook.com/himalayakrishi",
                "https://instagram.com/himalayakrishi"
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-emerald-800 mb-8">
          <span lang="ne">मर्मत कार्य जारी</span>
          <br />
          <span>Under Maintenance</span>
        </h1>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 mb-4" lang="ne">
          हामी तपाईंलाई अझ राम्रो सेवा दिन प्रणाली अपडेट गर्दैछौं।
        </p>
        <p className="text-xl text-gray-600 mb-8">
          We're updating our systems to serve you better.
        </p>
        
        <div className="space-y-4">
          <p className="text-gray-500">
            <span lang="ne">तत्काल सम्पर्कको लागि:</span>
            <br />
            For urgent inquiries:
          </p>
          <div className="space-y-2 text-emerald-700">
            <p>📞 +977-9823405140</p>
            <p>✉️ info@krishihimalaya.com</p>
            <p>📍 मनहरी-५, मकवानपुर, नेपाल</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Link 
            to="/"
            className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all transform hover:-translate-y-1"
          >
            <span lang="ne">मुख्य पृष्ठमा फर्कनुहोस्</span>
            <br />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;