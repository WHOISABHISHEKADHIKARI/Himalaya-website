import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonicalUrl, ogImage, ogType = 'website', twitterCard = 'summary_large_image', children }) => {
  const siteName = 'Himalaya Krishi';
  const defaultDescription = 'Experience Nepal\'s finest organic farming at Himalaya Krishi. We offer premium organic products, sustainable agriculture solutions, and empower local farmers since 1992.';
  const defaultKeywords = 'organic farming nepal, sustainable agriculture, organic products, farmer empowerment, himalayan agriculture';
  const defaultOgImage = 'https://krishihimalaya.com/assets/logo/whitelogo-blackbg.webp';

  // Structured data for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Himalaya Krishi',
    'url': 'https://krishihimalaya.com',
    'logo': 'https://krishihimalaya.com/assets/logo/whitelogo-blackbg.webp',
    'sameAs': [
      'https://facebook.com/himalayakrishi',
      'https://twitter.com/himalayakrishi',
      'https://instagram.com/himalayakrishi'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+977-9823405140',
      'contactType': 'customer service'
    }
  };

  // Structured data for website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': 'https://krishihimalaya.com',
    'name': siteName,
    'description': defaultDescription,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://krishihimalaya.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || 'https://krishihimalaya.com'} />
      
      {/* Robots Meta */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl || 'https://krishihimalaya.com'} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@himalayakrishi" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* Additional Meta Tags */}
      {children}
    </Helmet>
  );
};

export default SEO;