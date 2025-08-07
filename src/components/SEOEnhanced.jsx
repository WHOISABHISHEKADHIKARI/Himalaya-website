import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOEnhanced = ({
  title,
  description,
  keywords,
  image,
  article = false,
  author = 'Himalaya Krishi',
  publishedTime,
  modifiedTime,
  readingTime,
  category = 'Agriculture'
}) => {
  const location = useLocation();
  const siteUrl = 'https://krishihimalaya.com';
  const currentUrl = `${siteUrl}${location.pathname}`;
  
  const defaultTitle = 'Himalaya Krishi - Nepal\'s Leading Organic Farm & Sustainable Agriculture';
  const defaultDescription = 'Leading sustainable agriculture solutions in Nepal. Expert organic farming, dairy production, and agricultural innovation since 2020.';
  const defaultImage = `${siteUrl}/seo/og-image.webp`;
  
  const seoTitle = title ? `${title} | Himalaya Krishi` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  
  // Enhanced structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': article ? 'Article' : 'WebPage',
    headline: title,
    description: seoDescription,
    url: currentUrl,
    image: {
      '@type': 'ImageObject',
      url: seoImage,
      width: 1200,
      height: 630
    },
    author: {
      '@type': 'Organization',
      name: author,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo_512.png`
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Himalaya Krishi',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo_512.png`,
        width: 512,
        height: 512
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl
    },
    ...(article && {
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      articleSection: category,
      wordCount: readingTime ? readingTime * 200 : undefined,
      timeRequired: readingTime ? `PT${readingTime}M` : undefined
    })
  };
  
  return (
    <Helmet>
      {/* Enhanced Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={keywords || 'organic farming Nepal, sustainable agriculture, dairy farm, agricultural innovation'} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={currentUrl} />
      
      {/* Reading Time for Articles */}
      {article && readingTime && (
        <meta name="twitter:label1" content="Reading time" />
      )}
      {article && readingTime && (
        <meta name="twitter:data1" content={`${readingTime} min read`} />
      )}
      
      {/* Enhanced Open Graph */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Himalaya Krishi" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ne_NP" />
      
      {/* Article-specific OG tags */}
      {article && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime} />
          <meta property="article:section" content={category} />
        </>
      )}
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@HimalayaKrishi" />
      <meta name="twitter:creator" content="@HimalayaKrishi" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={title || 'Himalaya Krishi'} />
      
      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOEnhanced;