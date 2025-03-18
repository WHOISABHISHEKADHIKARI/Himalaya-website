import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4">
      <Helmet>
        <title>Site Maintenance | Himalaya Krishi</title>
        <meta name="description" content="Himalaya Krishi is currently under maintenance. We're updating our systems to provide better organic farming solutions and sustainable agriculture services." />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Himalaya Krishi" />
        <meta property="og:title" content="Site Maintenance | Himalaya Krishi" />
        <meta property="og:description" content="We're currently updating our systems. Please check back soon for organic farming expertise and sustainable agriculture solutions." />
        <meta property="og:image" content="https://krishihimalaya.com/og-maintenance.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@himalayakrishi" />
        <meta name="twitter:title" content="Site Maintenance | Himalaya Krishi" />
        <meta name="twitter:description" content="Temporarily down for maintenance. Contact us for immediate assistance with organic farming needs." />
        
        {/* Schema.org LD+JSON */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MaintenancePage",
            "name": "Site Maintenance",
            "description": "Himalaya Krishi website is temporarily under maintenance",
            "maintainer": {
              "@type": "Organization",
              "name": "Himalaya Krishi",
              "telephone": "+977-9823405140",
              "email": "info@krishihimalaya.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Manahari-5",
                "addressLocality": "Manahari",
                "addressRegion": "Makwanpur",
                "addressCountry": "Nepal"
              }
            },
            "serviceStatus": "TemporarilyDown",
            "serviceContact": {
              "@type": "ContactPoint",
              "telephone": "+977-9823405140",
              "contactType": "customer service",
              "availableLanguage": ["en", "ne"]
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-emerald-800 mb-8">
          Under Maintenance
        </h1>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 mb-8">
          We're currently updating our systems to serve you better. Please check back soon.
        </p>
        <div className="space-y-4">
          <p className="text-gray-500">
            For urgent inquiries, please contact us:
          </p>
          <div className="space-y-2 text-emerald-700">
            <p>📞 +977-9823405140</p>
            <p>✉️ info@krishihimalaya.com</p>
            <p>📍 Manahari-5, Makwanpur, Nepal</p>
          </div>
        </div>
        <Link 
          to="/"
          className="inline-block mt-8 px-8 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all transform hover:-translate-y-1"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Maintenance;