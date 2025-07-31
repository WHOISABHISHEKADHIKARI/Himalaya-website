import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOHelmet = ({ navItems }) => {
  const location = useLocation();
  // Shared organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Farm"],
    "name": "हिमालय कृषि | Himalaya Krishi",
    "alternateName": ["Himalaya Agriculture", "हिमालय एग्रीकल्चर", "Himalaya Organic Farm"],
    "url": "https://krishihimalaya.com",
    "logo": "https://krishihimalaya.com/assets/logo/logo_white_bg_removed.webp",
    "description": "Nepal's premier organic farming enterprise empowering 1000+ farmers with sustainable agriculture, certified organic products, and innovative farming solutions since 2020.",
    "knowsAbout": [
      "Organic Farming",
      "Sustainable Agriculture",
      "Agricultural Consultation",
      "Organic Certification",
      "Government Farming Subsidies",
      "Soil Testing & Management",
      "Crop Planning & Rotation",
      "Integrated Farming Systems",
      "Agricultural Training Programs",
      "Organic Seed Production",
      "Dairy Farming",
      "Agricultural Equipment",
      "Farming Technology",
      "Agricultural Innovation"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Nepal"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Agricultural Services & Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Organic Farming Consultation",
            "description": "Expert guidance for sustainable organic farming practices"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Certified Organic Seeds",
            "description": "High-quality certified organic seeds for various crops"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Agricultural Training Programs",
            "description": "Comprehensive training in modern organic farming techniques"
          }
        }
      ]
    },
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
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5"
    },
    "award": "Nepal's Leading Organic Agriculture Center 2023",
    "slogan": "Empowering Farmers, Enriching Nepal"
  };

  // Get page-specific meta content
  const getMetaContent = (pathname) => {
    switch(pathname) {
      case '/':
        return {
          title: 'Himalaya Krishi | Nepal\'s Premier Organic Farm & Sustainable Agriculture Center',
          description: 'Transform your farming with Nepal\'s leading organic agriculture center. Expert training, certified organic seeds, government subsidy guidance, soil testing, and comprehensive farming solutions. Join 1000+ successful farmers achieving sustainable prosperity through proven organic methods.',
          keywords: 'organic farming nepal, sustainable agriculture, certified organic seeds, agricultural training nepal, government farming subsidies, soil testing services, organic certification nepal, himalayan agriculture, farming equipment nepal, agricultural consultancy',
          ogDescription: 'Nepal\'s most trusted organic farming partner. Expert guidance, certified seeds, training programs, and government subsidy support for sustainable agricultural success.'
        };
      case '/about':
        return {
          title: 'About Himalaya Krishi | Leading Organic Farm & Agricultural Innovation Center',
          description: 'Discover the inspiring journey of Nepal\'s most successful organic farming enterprise. From humble beginnings to empowering 1000+ farmers with sustainable practices, premium organic products, and innovative agricultural solutions. Learn about our award-winning approach to organic excellence.',
          keywords: 'himalaya krishi story, organic farm nepal success, agricultural innovation nepal, sustainable farming leader, organic farming pioneer nepal, agricultural excellence, farming success stories nepal',
          ogDescription: 'From vision to reality: How Himalaya Krishi became Nepal\'s most trusted name in organic farming and sustainable agriculture innovation.'
        };
      case '/vision':
        return {
          title: 'Our Vision | Transforming Nepal\'s Agricultural Future Through Organic Excellence',
          description: 'Envision a prosperous Nepal where every farmer thrives through sustainable organic practices. Our comprehensive vision includes premium dairy production, integrated farming systems, agricultural tourism, and community empowerment. Join us in building Nepal\'s most advanced organic agriculture ecosystem.',
          keywords: 'nepal agriculture future, organic farming vision, sustainable agriculture goals, agricultural transformation nepal, farming innovation, organic dairy vision, agricultural tourism nepal',
          ogDescription: 'Building Nepal\'s agricultural future: Our vision for organic excellence, farmer prosperity, and sustainable community development.'
        };
      case '/contact':
         return {
           title: 'Contact Himalaya Krishi | Expert Agricultural Consultation & Support Services',
           description: 'Get expert agricultural guidance from Nepal\'s leading organic farming specialists. Free consultation on organic certification, government subsidies, soil testing, crop planning, and sustainable farming techniques. Connect with our experienced team for personalized farming solutions.',
           keywords: 'agricultural consultation nepal, organic farming expert, farming advice nepal, agricultural support services, organic certification help, government subsidy guidance, soil testing consultation',
           ogDescription: 'Expert agricultural consultation and support services. Get personalized guidance for successful organic farming and sustainable agriculture in Nepal.'
         };
      case '/blog':
        return {
          title: 'Agricultural Blog | Latest Farming Tips & Organic Agriculture Insights',
          description: 'Stay updated with the latest organic farming techniques, agricultural innovations, government policies, and expert tips from Nepal\'s leading agriculture specialists. Discover proven methods for sustainable farming success and crop optimization.',
          keywords: 'agricultural blog nepal, organic farming tips, sustainable agriculture news, farming techniques blog, agricultural innovation nepal, crop management tips, farming success stories',
          ogDescription: 'Expert insights on organic farming, sustainable agriculture, and agricultural innovation from Nepal\'s leading farming specialists.'
        };
      case '/faq':
        return {
          title: 'Frequently Asked Questions | Organic Farming & Agricultural Support',
          description: 'Find answers to common questions about organic farming, government subsidies, agricultural certification, soil testing, crop planning, and farming techniques. Get expert guidance on starting your organic farming journey in Nepal.',
          keywords: 'organic farming faq, agricultural questions nepal, farming subsidies help, organic certification questions, soil testing faq, crop planning help',
          ogDescription: 'Get answers to your organic farming questions from Nepal\'s agricultural experts. Comprehensive FAQ on farming techniques and support services.'
        };
      case '/terms':
        return {
          title: 'Terms & Conditions | Himalaya Krishi Agricultural Services',
          description: 'Read our terms and conditions for agricultural consultation services, organic farming training programs, and product purchases. Understand our service policies and commitment to sustainable agriculture in Nepal.',
          keywords: 'himalaya krishi terms, agricultural services policy, organic farming terms, consultation agreement, farming services conditions',
          ogDescription: 'Terms and conditions for Himalaya Krishi\'s agricultural services, training programs, and organic farming consultation.'
        };
      case '/centers':
        return {
          title: 'Agricultural Centers | Training & Support Locations Across Nepal',
          description: 'Discover our agricultural training centers and support locations across Nepal. Find the nearest center for organic farming consultation, soil testing, seed distribution, and agricultural equipment. Expert support available nationwide.',
          keywords: 'agricultural centers nepal, farming training locations, organic farming centers, agricultural support offices, farming consultation centers nepal',
          ogDescription: 'Find agricultural training centers and support locations across Nepal for organic farming consultation and expert guidance.'
        };
      case '/careers':
        return {
          title: 'Careers | Join Nepal\'s Leading Organic Agriculture Team',
          description: 'Join Himalaya Krishi and build a rewarding career in sustainable agriculture. Explore opportunities in organic farming, agricultural research, training, and rural development. Help us empower farmers and transform Nepal\'s agricultural landscape.',
          keywords: 'agricultural jobs nepal, organic farming careers, agricultural research jobs, farming consultant jobs, rural development careers nepal',
          ogDescription: 'Build your career with Nepal\'s leading organic agriculture organization. Opportunities in farming, research, training, and rural development.'
        };
      case '/agriculture-support':
        return {
          title: 'Agriculture Support Services | Government Subsidies & Farming Assistance',
          description: 'Comprehensive agricultural support services including government subsidy guidance, organic certification assistance, soil testing, crop planning, and farming equipment support. Expert help for successful sustainable farming in Nepal.',
          keywords: 'agriculture support nepal, government farming subsidies, organic certification help, soil testing services, crop planning assistance, farming equipment support',
          ogDescription: 'Complete agricultural support services including government subsidies, certification help, and expert farming guidance in Nepal.'
        };
      case '/blog/cms':
         return {
           title: 'Blog CMS - Content Management | Himalaya Krishi',
           description: 'Content Management System for Himalaya Krishi Blog. Manage blog posts, categories, and media content efficiently.',
           keywords: 'blog cms, content management, himalaya krishi admin, blog management system',
           ogDescription: 'Professional content management system for Himalaya Krishi blog administration'
         };

       case '/blog/publish':
         return {
           title: 'Publish Blog Post - Content Creation | Himalaya Krishi',
           description: 'Create and publish blog posts for Himalaya Krishi. Share your knowledge and insights with the farming community.',
           keywords: 'publish blog post, content creation, himalaya krishi blog, farming articles, agriculture writing',
           ogDescription: 'Create and share valuable farming content with the agricultural community'
         };
      default:
        return {
          title: 'Himalaya Krishi | Nepal\'s Premier Organic Agriculture Center',
          description: 'Nepal\'s most trusted organic farming partner providing expert consultation, certified seeds, training programs, and comprehensive agricultural support services.',
          keywords: 'himalaya krishi, organic farming nepal, agricultural services, farming consultation nepal',
          ogDescription: 'Nepal\'s leading organic agriculture center providing comprehensive farming solutions and expert consultation services.'
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
      <meta property="og:image" content="https://krishihimalaya.com/assets/logo/logo_512.png" />
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
          "name": ["Home", "About", "Vision", "Contact", "Blog", "FAQ", "Centers", "Careers"],
          "url": [
            "https://krishihimalaya.com/",
            "https://krishihimalaya.com/about",
            "https://krishihimalaya.com/vision",
            "https://krishihimalaya.com/contact",
            "https://krishihimalaya.com/blog",
            "https://krishihimalaya.com/faq",
            "https://krishihimalaya.com/centers",
            "https://krishihimalaya.com/careers"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;