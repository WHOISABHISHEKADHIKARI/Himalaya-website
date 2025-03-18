import React from 'react';
import { Helmet } from 'react-helmet-async';
import whiteLogoBlackBg from '../assets/logo/whitelogo-blackbg.png';

const FaviconHelmet = () => {
  return (
    <Helmet>
      {/* Standard Favicons - with WebP support */}
      <link rel="icon" type="image/webp" sizes="16x16" href={whiteLogoBlackBg.replace('.png', '.webp')} />
      <link rel="icon" type="image/webp" sizes="32x32" href={whiteLogoBlackBg.replace('.png', '.webp')} />
      <link rel="icon" type="image/webp" sizes="48x48" href={whiteLogoBlackBg.replace('.png', '.webp')} />
      <link rel="icon" type="image/png" sizes="16x16" href={whiteLogoBlackBg} />
      <link rel="icon" type="image/png" sizes="32x32" href={whiteLogoBlackBg} />
      <link rel="icon" type="image/png" sizes="48x48" href={whiteLogoBlackBg} />
      <link rel="shortcut icon" href={whiteLogoBlackBg} />
      
      {/* Preload Critical Assets */}
      <link rel="preload" href={whiteLogoBlackBg} as="image" type="image/png" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* PWA and Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#1C4E37" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#173E2C" media="(prefers-color-scheme: dark)" />
      
      {/* Enhanced Language Support */}
      <meta name="language" content="en-NP" />
      <meta property="og:locale" content="ne_NP" />
      <meta property="og:locale:alternate" content="en_NP" />
      
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "हिमालय कृषि | Himalaya Krishi",
          "image": whiteLogoBlackBg,
          "description": "नेपालको अग्रणी जैविक कृषि केन्द्र | Nepal's Premier Organic Agriculture Center",
          "@id": "https://krishihimalaya.com",
          "url": "https://krishihimalaya.com",
          "areaServed": {
            "@type": "Country",
            "name": "Nepal"
          }
        })}
      </script>
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href={whiteLogoBlackBg} />
      <link rel="apple-touch-icon" sizes="152x152" href={whiteLogoBlackBg} />
      <link rel="apple-touch-icon" sizes="120x120" href={whiteLogoBlackBg} />
      <link rel="apple-touch-icon" sizes="76x76" href={whiteLogoBlackBg} />
      <link rel="apple-touch-icon" sizes="60x60" href={whiteLogoBlackBg} />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-TileColor" content="#1C4E37" />
      <meta name="msapplication-TileImage" content={whiteLogoBlackBg} />
      <meta name="msapplication-config" content="browserconfig.xml" />
      
      {/* PWA Settings */}
      <meta name="theme-color" content="#1C4E37" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#173E2C" media="(prefers-color-scheme: dark)" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="हिमालय कृषि | Himalaya Krishi" />
      <meta name="application-name" content="हिमालय कृषि | Himalaya Krishi" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Safari Pinned Tab */}
      <link rel="mask-icon" href={whiteLogoBlackBg} color="#1C4E37" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* SEO Verification */}
      <meta name="google-site-verification" content="your-verification-code" />
      <meta name="facebook-domain-verification" content="your-verification-code" />
      
      {/* Preconnect to Important Origins */}
      <link rel="preconnect" href="https://krishihimalaya.com" />
      <link rel="dns-prefetch" href="https://krishihimalaya.com" />
      
      {/* Language Alternates */}
      <link rel="alternate" href="https://krishihimalaya.com" hrefLang="en" />
      <link rel="alternate" href="https://krishihimalaya.com/ne" hrefLang="ne" />
      <link rel="alternate" href="https://krishihimalaya.com" hrefLang="x-default" />
    </Helmet>
  );
};

export default FaviconHelmet;