import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({ location, navItems }) => {
  // Shared organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "हिमालय कृषि | Himalaya Krishi",
    "alternateName": ["Himalaya Agriculture", "हिमालय एग्रीकल्चर"],
    "url": "https://krishihimalaya.com",
    "logo": "https://krishihimalaya.com/assets/logo/logo_white_bg_removed.webp",
    "description": "नेपालको अग्रणी जैविक कृषि केन्द्र | Nepal's Leading Organic Agriculture Center",
    "knowsAbout": [
      "Organic Farming",
      "Agricultural Support",
      "Farming Techniques",
      "Government Subsidies",
      "Agricultural Policies",
      "Sustainable Agriculture",
      "Crop Rotation",
      "Soil Health Management"
    ],
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61572480220650",
      "https://wa.me/9779823405140"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+977-9823405140",
      "contactType": "customer service",
      "availableLanguage": ["en", "ne"],
      "areaServed": "NP"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Manahari-5",
      "addressLocality": "Manahari",
      "addressRegion": "Makwanpur",
      "postalCode": "44400",
      "addressCountry": "Nepal"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.479941",
      "longitude": "84.843720"
    },
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Himalaya Krishi Team"
    }
  };

  // Get page-specific meta content
  const getMetaContent = (pathname) => {
    switch(pathname) {
      case '/':
        return {
          title: 'हिमालय कृषि | Himalaya Krishi - नेपालको अग्रणी जैविक कृषि केन्द्र',
          description: 'नेपालमा कृषि सहयोग, जैविक खेती र कृषि नीतिहरूको बारेमा जान्नुहोस्। सरकारी सहयोग र कृषि का कार्यक्रमहरूको जानकारी उपलब्ध छ। | Learn about agriculture support, organic farming, and policies in Nepal.',
          keywords: 'कृषि सहयोग नेपाल, जैविक खेती, agriculture support nepal, organic farming, sustainable agriculture, कृषि नीति, farming subsidies',
          ogDescription: 'Discover Himalaya Krishi\'s organic farming excellence in Nepal. Leading sustainable agriculture practices and farmer empowerment since 2020.'
        };
      case '/about':
        return {
          title: 'About | कृषि सहयोग र नीतिहरू - Agriculture Support & Policies',
          description: 'जैविक खेती र कृषि सहयोग सम्बन्धी जानकारी। हाम्रो यात्रा र उपलब्धिहरू। | Information about organic farming and agricultural support. Our journey and achievements.',
          keywords: 'हिमालय कृषि इतिहास, जैविक खेती नेपाल, himalaya krishi history, organic farming nepal, sustainable agriculture practices',
          ogDescription: 'Learn about Himalaya Krishi\'s journey in organic farming, our heritage, and commitment to sustainable agriculture in Nepal.'
        };
      case '/vision':
        return {
          title: 'Vision | कृषि सहयोग र नीतिहरू - Agriculture Support & Policies',
          description: 'दिगो कृषि र जैविक खेतीको भविष्य। कृषि नीति र सहयोग कार्यक्रमहरू। | Future of sustainable farming and organic agriculture. Agricultural policies and support programs.',
          keywords: 'कृषि भविष्य, जैविक खेती योजना, agriculture future, organic farming plans, sustainable development goals',
          ogDescription: 'Explore Himalaya Krishi\'s vision for sustainable farming, organic excellence, and agricultural innovation in Nepal.'
        };
      default:
        return {
          title: 'Contact | कृषि सहयोग र नीतिहरू - Agriculture Support & Policies',
          description: 'कृषि सम्बन्धी सल्लाह र सहयोगको लागि सम्पर्क गर्नुहोस्। | Contact us for agricultural consultation and support.',
          keywords: 'कृषि सम्पर्क, जैविक खेती सल्लाह, agriculture contact, organic farming consultation, farming expert nepal',
          ogDescription: 'Connect with Himalaya Krishi for sustainable farming solutions and organic agriculture expertise in Nepal.'
        };
    }
  };

  const metaContent = getMetaContent(location.pathname);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaContent.title}</title>
      <meta name="description" content={metaContent.description} />
      <meta name="keywords" content={metaContent.keywords} />

      {/* Technical SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={`https://krishihimalaya.com${location.pathname}`} />
      <meta name="author" content="Himalaya Krishi" />

      {/* Language Alternates */}
      <link rel="alternate" hrefLang="ne" href={`https://krishihimalaya.com/ne${location.pathname}`} />
      <link rel="alternate" hrefLang="en" href={`https://krishihimalaya.com${location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://krishihimalaya.com${location.pathname}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://krishihimalaya.com${location.pathname}`} />
      <meta property="og:title" content={metaContent.title} />
      <meta property="og:description" content={metaContent.ogDescription} />
      <meta property="og:image" content="https://krishihimalaya.com/assets/logo/whitelogo-blackbg-removebg-preview.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Himalaya Krishi" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ne_NP" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@himalayakrishi" />
      <meta name="twitter:title" content={metaContent.title} />
      <meta name="twitter:description" content={metaContent.ogDescription} />
      <meta name="twitter:image" content="https://krishihimalaya.com/assets/logo/whitelogo-blackbg-removebg-preview.webp" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://krishihimalaya.com/"
            },
            ...(location.pathname !== '/' ? [{
              "@type": "ListItem",
              "position": 2,
              "name": location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2),
              "item": `https://krishihimalaya.com${location.pathname}`
            }] : [])
          ]
        })}
      </script>

      {/* Navigation Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SiteNavigationElement",
          "name": navItems.map(item => item.name),
          "url": navItems.map(item => 
            `https://krishihimalaya.com${item.name === 'Home' ? '/' : `/${item.name.toLowerCase()}`}`
          )
        })}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;