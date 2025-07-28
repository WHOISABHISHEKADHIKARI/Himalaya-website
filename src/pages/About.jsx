import React, { useState, useEffect } from 'react';
import LoadingBar from '../components/LoadingBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ProgressiveImage from '../components/ProgressiveImage';
import LazyContent, { LazySection, LazyCard } from '../components/LazyContent';
import SkeletonLoader from '../components/SkeletonLoader';
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import bankingPartner from '../assets/image/Partner/Banking Parntner  kantirajpath Branch.webp';
import consultingPartner from '../assets/image/Partner/Consultng Partner Pokhara Isha consulting .webp';
import creativePartner from '../assets/image/Partner/Creative Content Parnter The ads Maker HETAUDA .webp';
import techPartner from '../assets/image/Partner/Tech support Partner chitwan Sdtech .webp';
import founder from '../assets/image/founder.webp';
import owner from '../assets/image/owner.webp';
import manager from '../assets/image/manager.webp';
import fenchu from'../assets/image/fenchu.webp';


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

const About = () => {
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imagePromises = [
          founder,
          owner,
          manager,
          fenchu,
          bankingPartner,
          consultingPartner,
          creativePartner,
          techPartner
        ].map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (err) {
        setError('Failed to load some images. Please refresh the page.');
      }
    };

    loadImages();

    let timer = setTimeout(() => {
      if (!error) {
        setLoading(false);
      }
    }, 1500);

    // Back to top visibility handler and scroll progress
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      window.removeEventListener('scroll', handleScroll);
      // Cleanup image loading
      const images = document.images;
      for (let i = 0; i < images.length; i++) {
        images[i].onload = null;
        images[i].onerror = null;
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Page</h3>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.background.primary }}>
      <Helmet>
        <title>About Himalaya Krishi | Leading Organic Farm in Nepal</title>
        <meta name="description" content="नेपालमा जैविक खेती र कृषि नीतिहरूको अग्रणी संस्था। Discover our journey from a small dairy farm to Nepal's premier organic enterprise, committed to sustainable farming and community growth since 1992." />
        <meta name="keywords" content="organic farm nepal, murrah buffalo dairy, sustainable agriculture nepal, organic farming manahari, himalaya krishi history, जैविक खेती, कृषि नीति, सरकारी अनुदान, कृषि विकास" />
        
        {/* Technical SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://krishihimalaya.com/about" />
        <meta name="author" content="Himalaya Krishi" />
        <meta name="geo.region" content="NP-BAG" />
        <meta name="geo.placename" content="Manahari, Makwanpur" />
        <meta name="geo.position" content="27.5295;84.8174" />
        <meta name="ICBM" content="27.5295, 84.8174" />

        {/* Language Alternates */}
        <link rel="alternate" hrefLang="ne" href="https://krishihimalaya.com/ne/about" />
        <link rel="alternate" hrefLang="en" href="https://krishihimalaya.com/about" />
        <link rel="alternate" hrefLang="x-default" href="https://krishihimalaya.com/about" />
        
        {/* Open Graph - Bilingual */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="हिमालय कृषि | Himalaya Krishi" />
        <meta property="og:locale" content="ne_NP" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:url" content="https://krishihimalaya.com/about" />
        <meta property="og:title" content="About Himalaya Krishi | Leading Organic Farm in Nepal" />
        <meta property="og:description" content="नेपालमा र जैविक खेतीको अग्रणी संस्था। सरकारी अनुदान र कृषि नीतिहरूको जानकारी प्राप्त गर्नुहोस्। | Leading authority on agricultural and organic farming in Nepal." />
        <meta property="og:image" content="https://krishihimalaya.com/og-about.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@himalayakrishi" />
        <meta name="twitter:title" content="About Himalaya Krishi | Leading Organic Farm in Nepal" />
        <meta name="twitter:description" content="From humble beginnings to organic excellence: Discover our journey of sustainable farming and community empowerment in Nepal." />
        <meta name="twitter:image" content="https://krishihimalaya.com/twitter-about.jpg" />

        {/* Enhanced Schema.org LD+JSON */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["Organization", "LocalBusiness", "Farm"],
                "name": "हिमालय कृषि | Himalaya Krishi",
                "alternateName": ["Himalaya Agriculture", "हिमालय एग्रीकल्चर"],
                "url": "https://krishihimalaya.com",
                "logo": "https://krishihimalaya.com/logo.png",
                "sameAs": [
                  "https://facebook.com/himalayakrishi",
                  "https://linkedin.com/company/himalayakrishi"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Manahari-5",
                  "addressLocality": "Manahari",
                  "addressRegion": "Bagmati",
                  "postalCode": "44200",
                  "addressCountry": "NP"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "27.5295",
                  "longitude": "84.8174"
                },
                "foundingDate": "1992",
                "description": "Leading organic farming and sustainable agriculture enterprise in Nepal, providing premium dairy products and agricultural solutions."
              },
              {
                "@type": "WebPage",
                "name": "About Us",
                "description": "नेपालमा कृषि र जैविक खेतीको अग्रणी संस्था | Leading organic farming and agricultural enterprise in Nepal",
                "inLanguage": ["ne-NP", "en-US"],
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "Himalaya Krishi",
                  "url": "https://krishihimalaya.com"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://krishihimalaya.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "About Us",
                      "item": "https://krishihimalaya.com/about"
                    }
                  ]
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#1C4E37] to-[#D8A51D] z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      {loading && <LoadingBar />}
      
        {/* Add structured breadcrumbs for SEO */}
        <nav aria-label="breadcrumb" className="container mx-auto px-4 py-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="hover:text-[#D8A51D]">
                <span lang="ne">मुख्य पृष्ठ</span>
                <span className="mx-1">/</span>
                <span>Home</span>
              </a>
            </li>
            <li aria-current="page" className="text-[#D8A51D]">
              <span lang="ne">हाम्रो बारेमा</span>
              <span> / </span>
              <span>About Us</span>
            </li>
          </ol>
        </nav>
      {/* Hero Section */}
   

  

    

      {/* What We Are Doing Section */}
      <section className="py-24" style={{ backgroundColor: colors.light }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6" style={{ color: colors.primary }}>What We Are Doing</h2>
              <div className="w-32 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.medium }}>
                Our commitment to organic excellence is reflected in every product we create, from dairy to agriculture.
              </p>
            </div>            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {/* Card 1 - Murrah-Based Dairy */}
              <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/20 via-[#D8A51D]/10 to-[#1C4E37]/20 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:blur-3xl group-hover:scale-105 animate-pulse"></div>
                <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/95 via-white/90 to-white/80 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_rgba(28,78,55,0.15)] hover:shadow-[0_32px_80px_rgba(28,78,55,0.3)] transition-all duration-700 relative h-full overflow-hidden transform-gpu group-hover:translate-y-[-8px] hover:border-[#D8A51D]/30">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzFDNEUzNzEwIi8+PC9zdmc+')] opacity-5 group-hover:opacity-10 transition-opacity duration-700"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D8A51D]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#1C4E37]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="h-full flex flex-col items-center justify-center relative z-10">
                    <div className="relative w-28 h-28 mb-10 transform-gpu group-hover:rotate-3 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1C4E37] via-[#2A704F] to-[#1C4E37] rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#1C4E37] via-[#2A704F] to-[#1C4E37] flex items-center justify-center shadow-[0_8px_32px_rgba(28,78,55,0.3)] group-hover:shadow-[0_16px_48px_rgba(28,78,55,0.4)] transition-all duration-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#D8A51D] transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-center text-[#1C4E37] relative group-hover:transform group-hover:translate-y-[-2px] transition-all duration-700 tracking-wide">
                      Murrah-Based Dairy
                    </h3>
                    <p className="text-[#1C4E37]/80 text-center font-medium leading-relaxed tracking-wide">
                      Known for their superior quality and rich taste, our dairy products come from our carefully raised Murrah cows and represent the finest in organic dairy.
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D8A51D]/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Organic Farming */}
              <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/20 via-[#D8A51D]/10 to-[#1C4E37]/20 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:blur-3xl group-hover:scale-105 animate-pulse"></div>
                <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/95 via-white/90 to-white/80 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_rgba(28,78,55,0.15)] hover:shadow-[0_32px_80px_rgba(28,78,55,0.3)] transition-all duration-700 relative h-full overflow-hidden transform-gpu group-hover:translate-y-[-8px] hover:border-[#D8A51D]/30">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzFDNEUzNzEwIi8+PC9zdmc+')] opacity-5 group-hover:opacity-10 transition-opacity duration-700"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D8A51D]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#1C4E37]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="h-full flex flex-col items-center justify-center relative z-10">
                    <div className="relative w-28 h-28 mb-10 transform-gpu group-hover:rotate-3 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1C4E37] via-[#2A704F] to-[#1C4E37] rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#1C4E37] via-[#2A704F] to-[#1C4E37] flex items-center justify-center shadow-[0_8px_32px_rgba(28,78,55,0.3)] group-hover:shadow-[0_16px_48px_rgba(28,78,55,0.4)] transition-all duration-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#D8A51D] transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-center text-[#1C4E37] relative group-hover:transform group-hover:translate-y-[-2px] transition-all duration-700 tracking-wide">
                      Organic Farming
                    </h3>
                    <p className="text-[#1C4E37]/80 text-center font-medium leading-relaxed tracking-wide">
                      Every step, from our cows to our crops, follows sustainable practices. We believe in working with nature, not against it to produce the finest organic products.
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D8A51D]/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Legacy of Growth */}
              <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/20 via-[#D8A51D]/10 to-[#1C4E37]/20 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:blur-3xl group-hover:scale-105 animate-pulse"></div>
                <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/95 via-white/90 to-white/80 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_rgba(28,78,55,0.15)] hover:shadow-[0_32px_80px_rgba(28,78,55,0.3)] transition-all duration-700 relative h-full overflow-hidden transform-gpu group-hover:translate-y-[-8px] hover:border-[#D8A51D]/30">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzFDNEUzNzEwIi8+PC9zdmc+')] opacity-5 group-hover:opacity-10 transition-opacity duration-700"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D8A51D]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#1C4E37]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="h-full flex flex-col items-center justify-center relative z-10">
                    <div className="relative w-28 h-28 mb-10 transform-gpu group-hover:rotate-3 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1C4E37] via-[#2A704F] to-[#1C4E37] rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#1C4E37] via-[#2A704F] to-[#1C4E37] flex items-center justify-center shadow-[0_8px_32px_rgba(28,78,55,0.3)] group-hover:shadow-[0_16px_48px_rgba(28,78,55,0.4)] transition-all duration-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#D8A51D] transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-center text-[#1C4E37] relative group-hover:transform group-hover:translate-y-[-2px] transition-all duration-700 tracking-wide">
                      A Legacy of Growth
                    </h3>
                    <p className="text-[#1C4E37]/80 text-center font-medium leading-relaxed tracking-wide">
                      From our humble beginnings to our current success, we&apos;ve maintained steady growth while staying true to our organic principles and commitment to quality.
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D8A51D]/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    
      {/* Our Faces Section */}
            <section className="py-24" style={{ backgroundColor: colors.background.card }}>
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: colors.text.dark }}>Our Faces</h2>
                  <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
                  <p className="text-lg" style={{ color: colors.text.medium }}>
                    Meet the visionaries behind our journey of organic excellence.
                  </p>
                </div>
      
                {/* Co-Founder Card */}
               <div className="max-w-4xl mx-auto mb-16">
                  <div className="rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: colors.background.card }}>
                    <div className="md:flex">
                      <div className="md:w-2/5">
                        <div className="relative h-full">
                          <div className="absolute inset-0" style={{ backgroundColor: `${colors.primary}10` }}></div>
                          <img 
                            src={founder}
                            alt="Thapa Prasad Adhikari - Co-founder of our organic farm" 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="p-8 md:w-3/5">
                        <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text.dark }}>Thapa Prasad Adhikari</h3>
                        <p className="text-lg mb-4" style={{ color: colors.primary }}>Founder</p>
                        <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.secondary }}></div>
                        <p className="italic mb-6 leading-relaxed" style={{ color: colors.text.medium }}>
                        "I have no other option. As long as my interest and available resources allow, I find joy in working with soil and cow dung. Even now, at the age of 70, i am always tending to the working for cattle. That is why one must keep working wherever life takes them."
                         </p>
                      </div>
                    </div>
                  </div>
                </div>
      
                {/* Owner Card */}
                <div className="max-w-4xl mx-auto mb-16">
                  <div className="rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: colors.background.card }}>
                    <div className="md:flex flex-row-reverse">
                      <div className="md:w-2/5">
                        <div className="relative h-full">
                          <div className="absolute inset-0" style={{ backgroundColor: `${colors.primary}10` }}></div>
                          <img 
                            src={owner}
                            alt="Kedar Prasad Adhikari - Owner of our organic farm" 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="p-8 md:w-3/5">
                        <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text.dark }}>Kedar Prasad Adhikari</h3>
                        <p className="text-lg mb-4" style={{ color: colors.primary }}>Owner</p>
                        <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.secondary }}></div>
                        <p className="italic mb-6 leading-relaxed" style={{ color: colors.text.medium }}>
                          "I have completed my degree in education, and even though various opportunities came my way, I chose to reflect on what society had given me at that time. I feel a responsibility to repay that debt, so I have immersed myself in the available resources and circumstances."
                        </p>
                        <div className="flex items-center mt-6">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2" style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href="tel:9845162511" className="font-medium hover:underline" style={{ color: colors.primary }} aria-label="Call Kedar Prasad Adhikari">9845162511</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      
                {/* Manager Card */}
                <div className="max-w-4xl mx-auto">
                  <div className="rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: colors.background.card }}>
                    <div className="md:flex">
                      <div className="md:w-2/5">
                        <div className="relative h-full">
                          <div className="absolute inset-0" style={{ backgroundColor: `${colors.primary}10` }}></div>
                          <img 
                            src={manager}
                            alt="Abhishek Adhikari - Manager of our organic farm" 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="p-8 md:w-3/5">
                        <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text.dark }}>Abhishek Adhikari</h3>
                        <p className="text-lg mb-4" style={{ color: colors.primary }}>Manager</p>
                        <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.secondary }}></div>
                        <p className="italic mb-6 leading-relaxed" style={{ color: colors.text.medium }}>
                          "With decades of experience in agriculture and farming, my journey has evolved beyond primary production into scaling, exporting, and branding our traditional business on a larger platform."
                        </p>
                        <div className="flex flex-wrap gap-4 mt-6">
                          <a 
                            href="tel:9865412482" 
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm transition-colors"
                            style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}
                            aria-label="Call Abhishek Adhikari"
                          >
                            <FaPhoneAlt className="w-4 h-4 mr-2" />
                            9865412482
                          </a>
                          <a 
                            href="mailto:abhishekadhikari1254@gmail.com" 
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm transition-colors"
                            style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}
                            aria-label="Email Abhishek Adhikari"
                          >
                            <FaEnvelope className="w-4 h-4 mr-2" />
                            Email
                          </a>
                          <a 
                            href="https://www.linkedin.com/in/adheekariabhishek/" 
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm transition-colors" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}
                            aria-label="Visit Abhishek Adhikari's LinkedIn profile"
                          >
                            <FaLinkedin className="w-4 h-4 mr-2" />
                            LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
         {/* Partners Section with Enhanced Design */}
         <LazySection className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/20 via-[#D8A51D]/10 to-[#1C4E37]/20 rounded-[2.5rem] blur-2xl transition-all duration-700"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6" style={{ color: colors.primary }}>
                Our Trusted Partners
              </h2>
              <div className="w-32 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.medium }}>
                Working together to deliver excellence in every aspect
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Banking Partner */}
              <motion.div 
                className="relative group perspective-1000"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/20 via-[#D8A51D]/10 to-[#1C4E37]/20 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:blur-3xl group-hover:scale-105 animate-pulse"></div>
                <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/95 via-white/90 to-white/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_rgba(28,78,55,0.15)] hover:shadow-[0_32px_80px_rgba(28,78,55,0.3)] transition-all duration-700 relative h-full overflow-hidden transform-gpu group-hover:translate-y-[-8px] hover:border-[#D8A51D]/30">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D8A51D]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#1C4E37]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="h-full flex flex-col items-center justify-center relative z-10">
                    <div className="aspect-w-16 aspect-h-9 mb-6">
                      <ProgressiveImage
                        src={bankingPartner}
                        alt="Banking Partner - Kantirajpath Branch"
                        className="object-contain w-full h-32 transform transition-all duration-700 group-hover:scale-110"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-2" style={{ color: colors.primary }}>
                      Banking Partner
                    </h3>
                    <p className="text-center text-sm" style={{ color: colors.text.medium }}>
                      Kantirajpath Branch
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Consulting Partner */}
              <motion.div 
                className="relative group perspective-1000"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/20 via-[#D8A51D]/10 to-[#1C4E37]/20 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:blur-3xl group-hover:scale-105 animate-pulse"></div>
                <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/95 via-white/90 to-white/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_rgba(28,78,55,0.15)] hover:shadow-[0_32px_80px_rgba(28,78,55,0.3)] transition-all duration-700 relative h-full overflow-hidden transform-gpu group-hover:translate-y-[-8px] hover:border-[#D8A51D]/30">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D8A51D]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#1C4E37]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="h-full flex flex-col items-center justify-center relative z-10">
                    <div className="aspect-w-16 aspect-h-9 mb-6">
                      <ProgressiveImage
                        src={consultingPartner}
                        alt="Consulting Partner - Isha Consulting Pokhara"
                        className="object-contain w-full h-32 transform transition-all duration-700 group-hover:scale-110"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-2" style={{ color: colors.primary }}>
                      Consulting Partner
                    </h3>
                    <p className="text-center text-sm" style={{ color: colors.text.medium }}>
                      Isha Consulting, Pokhara
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Creative Content Partner */}
              <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/20 via-[#D8A51D]/10 to-[#1C4E37]/20 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:blur-3xl group-hover:scale-105 animate-pulse"></div>
                <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/95 via-white/90 to-white/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_rgba(28,78,55,0.15)] hover:shadow-[0_32px_80px_rgba(28,78,55,0.3)] transition-all duration-700 relative h-full overflow-hidden transform-gpu group-hover:translate-y-[-8px] hover:border-[#D8A51D]/30">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D8A51D]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#1C4E37]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="h-full flex flex-col items-center justify-center relative z-10">
                    <div className="aspect-w-16 aspect-h-9 mb-6">
                      <img 
                        src={creativePartner}
                        alt="Creative Content Partner - The Ads Maker Hetauda"
                        className="object-contain w-full h-32 transform transition-all duration-700 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-2" style={{ color: colors.primary }}>
                      Creative Content Partner
                    </h3>
                    <p className="text-center text-sm" style={{ color: colors.text.medium }}>
                      The Ads Maker, Hetauda
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech Support Partner */}
              <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/20 via-[#D8A51D]/10 to-[#1C4E37]/20 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:blur-3xl group-hover:scale-105 animate-pulse"></div>
                <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/95 via-white/90 to-white/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_rgba(28,78,55,0.15)] hover:shadow-[0_32px_80px_rgba(28,78,55,0.3)] transition-all duration-700 relative h-full overflow-hidden transform-gpu group-hover:translate-y-[-8px] hover:border-[#D8A51D]/30">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D8A51D]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#1C4E37]/5 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
                  <div className="h-full flex flex-col items-center justify-center relative z-10">
                    <div className="aspect-w-16 aspect-h-9 mb-6">
                      <img 
                        src={techPartner}
                        alt="Tech Support Partner - SDTech Chitwan"
                        className="object-contain w-full h-32 transform transition-all duration-700 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-2" style={{ color: colors.primary }}>
                      Tech Support Partner
                    </h3>
                    <p className="text-center text-sm" style={{ color: colors.text.medium }}>
                      SDTech, Chitwan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>
      
      
            {/* Testimonials Section */}
            <section aria-labelledby="testimonials" className="py-24" style={{ backgroundColor: colors.background.card }}>
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: colors.text.dark }}>Reviews About Our Business</h2>
                  <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
                  <p className="text-lg" style={{ color: colors.text.medium }}>
                    What our community says about our Business presence
                  </p>
                </div>
                  {/* Testimonials Section */}
            <div className="py-16">
              {/* Testimonial 1 - Shree Krishna Parajuli */}
              <div className="max-w-4xl mx-auto mb-16">
                <div className="rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: colors.background.card }}>
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <div className="relative h-full">
                        <div className="absolute inset-0" style={{ backgroundColor: `${colors.primary}10` }}></div>
                        <img 
                          src="/assets/faces/Shree Krishna Parajuli.jpg"
                          alt="Shree Krishna Parajuli" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="p-8 md:w-3/5">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text.dark }}>Shree Krishna Parajuli</h3>
                      <p className="text-lg mb-4" style={{ color: colors.primary }}>Branch Manager, ADBL</p>
                      <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.secondary }}></div>
                      <p className="italic mb-6 leading-relaxed" style={{ color: colors.text.medium }}>
                        "It brings me immense joy to witness their growth from humble beginnings. As someone who has been a helping hand in their journey, I am proud to see their dedication and the meaningful impact they&apos;ve created."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 - Bharat Gautam */}
              <div className="max-w-4xl mx-auto mb-16">
                <div className="rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: colors.background.card }}>
                  <div className="md:flex flex-row-reverse">
                    <div className="md:w-2/5">
                      <div className="relative h-full">
                        <div className="absolute inset-0" style={{ backgroundColor: `${colors.primary}10` }}></div>
                        <img 
                          src="/assets/faces/Bharat Gautam.jpg"
                          alt="Bharat Gautam" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="p-8 md:w-3/5">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text.dark }}>Bharat Gautam</h3>
                      <p className="text-lg mb-4" style={{ color: colors.primary }}>Livestock & Poultry Farm Consultant</p>
                      <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.secondary }}></div>
                      <p className="italic mb-6 leading-relaxed" style={{ color: colors.text.medium }}>
                        "It&apos;s inspiring to see young leadership driving innovation in agriculture by a small and youth-led team. Their vision has inspired me. Their energy and vision for growth is remarkable, and I&apos;m excited to see how they&apos;ve embraced transformation to showcase their journey and fix the issues."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 - Dipendra Adhikari */}
              <div className="max-w-4xl mx-auto mb-16">
                <div className="rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: colors.background.card }}>
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <div className="relative h-full">
                        <div className="absolute inset-0" style={{ backgroundColor: `${colors.primary}10` }}></div>
                        <img 
                          src="/assets/faces/Dipendra Adhikari.jpg"
                          alt="Dipendra Adhikari" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="p-8 md:w-3/5">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text.dark }}>Dipendra Adhikari</h3>
                      <p className="text-lg mb-4" style={{ color: colors.primary }}>Manahari 5 Ward Chief</p>
                      <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.secondary }}></div>
                      <p className="italic mb-6 leading-relaxed" style={{ color: colors.text.medium }}>
                        "The farm beautifully captures the essence of their organic farming journey and represents Manahari&apos;s showcase. As a member of Manahari municipality, I am impressed by how they&apos;ve showcased their commitment to serving society through this digital platform."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
                            {/* Testimonial - Fenchu Lama */}
                            <div className="max-w-4xl mx-auto mb-16">
                <div className="rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: colors.background.card }}>
                  <div className="md:flex flex-row-reverse">
                    <div className="md:w-2/5">
                      <div className="relative h-full">
                        <div className="absolute inset-0" style={{ backgroundColor: `${colors.primary}10` }}></div>
                        <img 
                          src={fenchu}
                          alt="Fenchu Lama" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="p-8 md:w-3/5">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text.dark }}>Fenchu Lama </h3>
                      <p className="text-lg mb-4" style={{ color: colors.primary }}>Senior veterinary,Agri Entrepreneur , Founer oF MNS Agro </p>
                      <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.secondary }}></div>
                      <p className="italic mb-6 leading-relaxed" style={{ color: colors.text.medium }}>
                        "It&apos;s inspiring to witness the seamless transfer of agricultural legacy across generations here. What truly sets this farm apart is seeing energetic young minds bringing fresh perspectives while honoring traditional farming wisdom. The enthusiasm and innovation of these young farmers, combined with their deep respect for sustainable practices, showcases how the next generation is revolutionizing organic agriculture in Manahari."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
       
              </div>
              
            </section>
      
            {/* Sneak Peek Section continues... */}
            <section aria-labelledby="sneak-peek" className="py-24" style={{ backgroundColor: colors.background.card }}>
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto text-center mb-16">
                  <h2 id="sneak-peek" className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: colors.text.dark }}>Sneak Peek</h2>
                  <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
                  <p className="text-lg" style={{ color: colors.text.medium }}>
                    Experience a glimpse of our farm's daily operations and organic practices through this video.
                  </p>
                </div>
      
                <div className="max-w-4xl mx-auto">
                  <div className="relative">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                      </div>
                    )}
                    <video
                      controls
                      className="w-full rounded-lg shadow-lg"
                      poster="/assets/images/farm-poster.jpg"
                      onLoadStart={() => setIsLoading(true)}
                      onLoadedData={() => setIsLoading(false)}
                      onError={(e) => {
                        console.warn('Video loading failed:', e);
                        setIsLoading(false);
                        setVideoError(true);
                      }}
                    >
                      <source 
                        src="/assets/video/farmvideo.mp4" 
                        type="video/mp4"
                      />
                      {/* Fallback content */}
                      <img 
                        src="/assets/images/farm-poster.jpg" 
                        alt="Farm overview" 
                        className="w-full rounded-lg shadow-lg"
                      />
                    </video>
                    {videoError && (
                      <div className="mt-4 text-red-600 text-sm">
                       </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
      
     
            {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
        style={{ 
          backgroundColor: colors.primary,
          boxShadow: '0 4px 20px rgba(28, 78, 55, 0.3)'
        }}
        aria-label="Back to top"
      >
        <FaArrowUp className="w-6 h-6" style={{ color: colors.text.light }} />
      </button>
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Organic Farm",
            "description": "A premium organic farm with a heritage dating back to 1992, specializing in Murrah-based dairy products and organic farming.",
            "founded": "1992",
            "foundingLocation": "Sirbani",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Manahari"
            },
            "employee": [
              {
                "@type": "Person",
                "name": "Thapa Prasad Adhikari",
                "jobTitle": "Founder"
              },
              {
                "@type": "Person",
                "name": "Kedar Prasad Adhikari",
                "jobTitle": "Owner",
                "telephone": "+9779845162511"
              },
              {
                "@type": "Person",
                "name": "Abhishek Adhikari",
                "jobTitle": "Manager",
                "telephone": "+9779865412482",
                "email": "abhishekadhikari1254@gmail.com"
              }
            ]
          }
        `}
      </script>
    </div>
  );
};

export default About;
 