import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOEnhancedAdvanced = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage, 
  ogType = 'website',
  article = null,
  product = null,
  event = null,
  faq = null,
  breadcrumbs = null,
  reviews = null,
  localBusiness = true
}) => {
  const location = useLocation();
  const siteName = 'Himalaya Krishi';
  const siteUrl = 'https://krishihimalaya.com';
  const defaultDescription = 'Nepal\'s premier organic farming enterprise empowering 1000+ farmers with sustainable agriculture, certified organic products, and innovative farming solutions since 2020.';
  const defaultKeywords = 'organic farming nepal, sustainable agriculture, certified organic seeds, agricultural training nepal, government farming subsidies, soil testing services, organic certification nepal, himalayan agriculture, farming equipment nepal, agricultural consultancy';
  const defaultOgImage = 'https://krishihimalaya.com/assets/logo/whitelogo-blackbg-512x512.webp';

  // Enhanced Organization Schema with more details
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Farm', 'EducationalOrganization'],
    '@id': `${siteUrl}/#organization`,
    'name': 'हिमालय कृषि | Himalaya Krishi',
    'alternateName': [
      'Himalaya Agriculture',
      'हिमालय एग्रीकल्चर',
      'Himalaya Organic Farm',
      'Nepal Organic Farm',
      'Best Organic Farm Nepal'
    ],
    'url': siteUrl,
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://krishihimalaya.com/assets/logo/whitelogo-blackbg-512x512.webp',
      'width': 512,
      'height': 512,
      'caption': 'Himalaya Krishi - Nepal\'s Premier Organic Agriculture Center'
    },
    'image': [
      'https://krishihimalaya.com/assets/logo/whitelogo-blackbg-512x512.webp',
      'https://krishihimalaya.com/assets/gallary/1724651083866.jpg',
      'https://krishihimalaya.com/assets/gallary/image1.jpg'
    ],
    'description': defaultDescription,
    'slogan': 'Empowering Farmers, Enriching Nepal | किसानलाई सशक्त बनाउँदै, नेपाललाई समृद्ध बनाउँदै',
    'foundingDate': '2020',
    'founder': {
      '@type': 'Person',
      'name': 'Himalaya Krishi Founding Team'
    },
    'numberOfEmployees': {
      '@type': 'QuantitativeValue',
      'value': '50-100'
    },
    'knowsAbout': [
      'Organic Farming',
      'Sustainable Agriculture',
      'Agricultural Consultation',
      'Organic Certification',
      'Government Farming Subsidies',
      'Soil Testing & Management',
      'Crop Planning & Rotation',
      'Integrated Farming Systems',
      'Agricultural Training Programs',
      'Organic Seed Production',
      'Dairy Farming',
      'Agricultural Equipment',
      'Farming Technology',
      'Agricultural Innovation',
      'Permaculture',
      'Biodynamic Farming',
      'Precision Agriculture',
      'Climate-Smart Agriculture'
    ],
    'areaServed': [
      {
        '@type': 'Country',
        'name': 'Nepal',
        'sameAs': 'https://www.wikidata.org/wiki/Q837'
      },
      {
        '@type': 'State',
        'name': 'Bagmati Province',
        'sameAs': 'https://www.wikidata.org/wiki/Q2792'
      }
    ],
    'serviceArea': {
      '@type': 'GeoCircle',
      'geoMidpoint': {
        '@type': 'GeoCoordinates',
        'latitude': 27.479941,
        'longitude': 84.843720
      },
      'geoRadius': '500000'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Manahari-5',
      'addressLocality': 'Manahari',
      'addressRegion': 'Makwanpur',
      'postalCode': '44400',
      'addressCountry': 'Nepal'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 27.479941,
      'longitude': 84.843720
    },
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': '+977-9823405140',
        'contactType': 'customer service',
        'email': 'info@krishihimalaya.com',
        'availableLanguage': ['en', 'ne'],
        'areaServed': 'NP',
        'hoursAvailable': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '09:00',
          'closes': '18:00'
        }
      },
      {
        '@type': 'ContactPoint',
        'telephone': '+977-9851174632',
        'contactType': 'technical support',
        'availableLanguage': ['ne', 'en'],
        'areaServed': 'NP'
      }
    ],
    'sameAs': [
      'https://www.facebook.com/profile.php?id=61572480220650',
      'https://wa.me/9779823405140',
      'https://twitter.com/himalayakrishi',
      'https://instagram.com/himalayakrishi',
      'https://linkedin.com/company/himalayakrishi',
      'https://youtube.com/c/himalayakrishi'
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '250',
      'bestRating': '5',
      'worstRating': '1'
    },
    'award': [
      'Nepal\'s Leading Organic Agriculture Center 2024',
      'Best Sustainable Farming Initiative 2023',
      'Excellence in Agricultural Training 2023',
      'Organic Farming Innovation Award 2022'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Agricultural Services & Products',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Organic Farming Consultation',
            'description': 'Expert guidance for sustainable organic farming practices',
            'category': 'Agricultural Consultation'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Product',
            'name': 'Certified Organic Seeds',
            'description': 'High-quality certified organic seeds for various crops',
            'category': 'Agricultural Products'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Agricultural Training Programs',
            'description': 'Comprehensive training in modern organic farming techniques',
            'category': 'Education & Training'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Soil Testing & Analysis',
            'description': 'Professional soil health assessment and improvement recommendations',
            'category': 'Agricultural Testing'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Government Subsidy Guidance',
            'description': 'Expert assistance in obtaining agricultural subsidies and grants',
            'category': 'Financial Assistance'
          }
        }
      ]
    },
    'makesOffer': [
      {
        '@type': 'Offer',
        'name': 'Free Agricultural Consultation',
        'description': 'Complimentary initial consultation for new farmers',
        'price': '0',
        'priceCurrency': 'NPR'
      }
    ],
    'department': [
      {
        '@type': 'Organization',
        'name': 'Training Department',
        'description': 'Specialized in agricultural education and farmer training programs'
      },
      {
        '@type': 'Organization',
        'name': 'Research & Development',
        'description': 'Innovation in sustainable farming techniques and crop development'
      },
      {
        '@type': 'Organization',
        'name': 'Consultation Services',
        'description': 'Expert agricultural advice and farm planning services'
      }
    ]
  };

  // Enhanced Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    'url': siteUrl,
    'name': siteName,
    'alternateName': 'हिमालय कृषि',
    'description': defaultDescription,
    'publisher': {
      '@id': `${siteUrl}/#organization`
    },
    'inLanguage': ['en', 'ne'],
    'copyrightYear': '2024',
    'copyrightHolder': {
      '@id': `${siteUrl}/#organization`
    },
    'potentialAction': [
      {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${siteUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'ReadAction',
        'target': [
          {
            '@type': 'EntryPoint',
            'urlTemplate': `${siteUrl}/blog/{slug}`,
            'actionPlatform': [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform'
            ]
          }
        ]
      }
    ],
    'mainEntity': {
      '@id': `${siteUrl}/#organization`
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': crumb.url
    }))
  } : {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': siteUrl
      },
      ...(location.pathname !== '/' ? [{
        '@type': 'ListItem',
        'position': 2,
        'name': location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2),
        'item': `${siteUrl}${location.pathname}`
      }] : [])
    ]
  };

  // Article Schema (for blog posts)
  const articleSchema = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.description,
    'image': article.image || defaultOgImage,
    'author': {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`
    },
    'publisher': {
      '@id': `${siteUrl}/#organization`
    },
    'datePublished': article.datePublished,
    'dateModified': article.dateModified || article.datePublished,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${siteUrl}${location.pathname}`
    },
    'articleSection': article.category || 'Agriculture',
    'keywords': article.keywords || keywords || defaultKeywords,
    'wordCount': article.wordCount,
    'inLanguage': 'en'
  } : null;

  // FAQ Schema
  const faqSchema = faq ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faq.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  } : null;

  // Product Schema
  const productSchema = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.description,
    'image': product.image || defaultOgImage,
    'brand': {
      '@type': 'Brand',
      'name': siteName
    },
    'manufacturer': {
      '@id': `${siteUrl}/#organization`
    },
    'offers': {
      '@type': 'Offer',
      'price': product.price,
      'priceCurrency': product.currency || 'NPR',
      'availability': product.availability || 'https://schema.org/InStock',
      'seller': {
        '@id': `${siteUrl}/#organization`
      }
    },
    'aggregateRating': product.rating ? {
      '@type': 'AggregateRating',
      'ratingValue': product.rating.value,
      'reviewCount': product.rating.count
    } : null
  } : null;

  // Event Schema
  const eventSchema = event ? {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': event.name,
    'description': event.description,
    'startDate': event.startDate,
    'endDate': event.endDate,
    'location': {
      '@type': 'Place',
      'name': event.location.name,
      'address': event.location.address
    },
    'organizer': {
      '@id': `${siteUrl}/#organization`
    },
    'offers': event.offers ? {
      '@type': 'Offer',
      'price': event.offers.price,
      'priceCurrency': event.offers.currency || 'NPR',
      'availability': 'https://schema.org/InStock'
    } : null
  } : null;

  // Reviews Schema
  const reviewsSchema = reviews ? {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'itemReviewed': {
      '@id': `${siteUrl}/#organization`
    },
    'author': {
      '@type': 'Person',
      'name': reviews.author
    },
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': reviews.rating,
      'bestRating': '5'
    },
    'reviewBody': reviews.text,
    'datePublished': reviews.date
  } : null;

  // Local Business Schema (enhanced)
  const localBusinessSchema = localBusiness ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    'name': siteName,
    'image': defaultOgImage,
    'telephone': '+977-9823405140',
    'email': 'info@krishihimalaya.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Manahari-5',
      'addressLocality': 'Manahari',
      'addressRegion': 'Makwanpur',
      'postalCode': '44400',
      'addressCountry': 'Nepal'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 27.479941,
      'longitude': 84.843720
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '18:00'
      }
    ],
    'priceRange': '$$',
    'currenciesAccepted': 'NPR',
    'paymentAccepted': ['Cash', 'Mobile Banking', 'Bank Transfer'],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '250'
    }
  } : null;

  return (
    <Helmet>
      {/* Enhanced Meta Tags */}
      <title>{title ? `${title} | ${siteName}` : `${siteName} - Nepal's Premier Organic Farm & Sustainable Agriculture Center`}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Enhanced Canonical and Language Tags */}
      <link rel="canonical" href={canonicalUrl || `${siteUrl}${location.pathname}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${location.pathname}`} />
      <link rel="alternate" hrefLang="ne" href={`${siteUrl}/ne${location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${location.pathname}`} />
      
      {/* Enhanced Robots Meta */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="NP-3" />
      <meta name="geo.placename" content="Manahari, Makwanpur" />
      <meta name="geo.position" content="27.479941;84.843720" />
      <meta name="ICBM" content="27.479941, 84.843720" />
      
      {/* Enhanced Open Graph Meta Tags */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title || `${siteName} - Nepal's Premier Organic Farm`} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl || `${siteUrl}${location.pathname}`} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:image:secure_url" content={ogImage || defaultOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} - Sustainable Agriculture Excellence`} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ne_NP" />
      <meta property="fb:app_id" content="your-facebook-app-id" />
      
      {/* Enhanced Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@himalayakrishi" />
      <meta name="twitter:creator" content="@himalayakrishi" />
      <meta name="twitter:title" content={title || `${siteName} - Nepal's Premier Organic Farm`} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      <meta name="twitter:image:alt" content={`${siteName} - Sustainable Agriculture Excellence`} />
      
      {/* Additional Meta Tags for SEO */}
      <meta name="author" content={siteName} />
      <meta name="publisher" content={siteName} />
      <meta name="copyright" content={`© 2024 ${siteName}. All rights reserved.`} />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="language" content="English, Nepali" />
      <meta name="category" content="Agriculture, Organic Farming, Sustainable Agriculture" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="farmers, agriculture enthusiasts, organic farming" />
      
      {/* Mobile and App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="application-name" content={siteName} />
      <meta name="msapplication-TileColor" content="#1C4E37" />
      <meta name="theme-color" content="#1C4E37" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Structured Data Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {localBusinessSchema && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
      {eventSchema && (
        <script type="application/ld+json">
          {JSON.stringify(eventSchema)}
        </script>
      )}
      {reviewsSchema && (
        <script type="application/ld+json">
          {JSON.stringify(reviewsSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOEnhancedAdvanced;