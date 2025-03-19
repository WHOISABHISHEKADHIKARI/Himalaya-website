import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
// Remove this import at the top
// import farmVideo from '../assets/videos/farmvideo.mp4';
// Reduce stats to key metrics
const stats = [
  { value: "1000+", label: "Farmers Empowered" },
  { value: "5000+", label: "Hectares Organic" },
  { value: "15+", label: "Years Experience" }
];

// Reduce features to core offerings
const features = [
  {
    icon: "🌱",
    title: "Organic Excellence",
    description: "Promoting sustainable organic farming practices across Nepal"
  },
  {
    icon: "👨‍🌾",
    title: "Expert Support",
    description: "Guidance from experienced agricultural specialists"
  },
  {
    icon: "🤝",
    title: "Community Impact",
    description: "Building stronger farming communities across Nepal"
  }
];

// Reduce testimonials to two key stories
const testimonials = [
  {
    name: "Ram Bahadur",
    location: "Kavre, Nepal",
    quote: "Himalaya Krishi transformed my traditional farm into a thriving organic enterprise.",
    image: "/src/assets/images/testimonials/farmer1.jpg"
  },
  {
    name: "Sita Sharma",
    location: "Chitwan, Nepal",
    quote: "The expert guidance helped me achieve organic certification successfully.",
    image: "/src/assets/images/testimonials/farmer2.jpg"
  }
];

// Reduce blog posts to two key articles
const blogPosts = [
  {
    title: "Organic Farming in Nepal",
    excerpt: "Learn about climate-specific organic farming methods that work best in Nepal.",
    image: "/src/assets/images/blog/organic-techniques.jpg",
    link: "/blog/organic-techniques"
  },
  {
    title: "Seasonal Growing Guide",
    excerpt: "Your guide to growing organic crops in different Nepali seasons.",
    image: "/src/assets/images/blog/seasonal-guide.jpg",
    link: "/blog/seasonal-guide"
  }
];

const ActionButton = ({ text, link, isExternal, variant = "primary" }) => {
  const styles = {
    base: "flex items-center gap-4 px-10 py-5 rounded-full text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95 group relative overflow-hidden hover:-translate-y-2 z-50",
    primary: "bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 text-white hover:from-teal-400 hover:via-emerald-500 hover:to-teal-400 shadow-xl shadow-emerald-500/30 animate-float border border-emerald-300/40 backdrop-blur-lg hover:shadow-emerald-400/50",
    secondary: "bg-white/5 backdrop-blur-lg border-2 border-white/20 text-white hover:bg-white/10 hover:border-emerald-400/50 hover:text-emerald-300 hover:shadow-emerald-400/20",
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isExternal) {
      window.open(link, '_blank');
    } else {
      window.location.href = link;
    }
  };

  if (isExternal) {
    return (
      <a
        href={link}
        onClick={handleClick}
        className={`${styles.base} ${styles[variant]}`}
      >
        <span className="relative z-10 font-semibold tracking-wide group-hover:tracking-wider transition-all">{text}</span>
        <FaArrowRight className="transition-all duration-300 transform group-hover:translate-x-3 group-hover:scale-110 relative z-10 animate-bounce-x" />
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.base} ${styles[variant]}`}
    >
      <span className="relative z-10 font-semibold tracking-wide group-hover:tracking-wider transition-all">{text}</span>
      <FaArrowRight className="transition-all duration-300 transform group-hover:translate-x-3 group-hover:scale-110 relative z-10 animate-bounce-x" />
    </button>
  );
};

// Add these to your tailwind.config.js extend section:
// animation: {
//   'float': 'float 3s ease-in-out infinite',
//   'bounce-x': 'bounceX 1s infinite',
//   'shimmer': 'shimmer 2s linear infinite',
// },
// keyframes: {
//   float: {
//     '0%, 100%': { transform: 'translateY(0)' },
//     '50%': { transform: 'translateY(-5px)' }
//   },
//   bounceX: {
//     '0%, 100%': { transform: 'translateX(0)' },
//     '50%': { transform: 'translateX(3px)' }
//   },
//   shimmer: {
//     '0%': { backgroundPosition: '200% 0' },
//     '100%': { backgroundPosition: '-200% 0' }
//   }
// }

// Add this to your tailwind.config.js extend section:
// animation: {
//   'bounce-gentle': 'bounce 3s infinite',
//   'gradient': 'gradient 3s linear infinite',
//   'pulse': 'pulse 2s infinite',
// },
// keyframes: {
//   gradient: {
//     '0%, 100%': { backgroundPosition: '0% 50%' },
//     '50%': { backgroundPosition: '100% 50%' },
//   }
// },
// backgroundSize: {
//   'size-200': '200% 200%',
// }

const Home = () => {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const loadVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.load(); // Add load() before play()
          await videoRef.current.play();
        }
      } catch (error) {
        console.error('Video playback failed:', error);
        setVideoError(true);
      }
    };

    loadVideo();
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Himalaya Krishi - Premier Organic Farm & Sustainable Agriculture in Nepal</title>
        <meta name="description" content="Experience Nepal's finest organic farming at Himalaya Krishi. We offer premium organic products, sustainable agriculture solutions, and empower local farmers since 1992." />
        <meta name="keywords" content="organic farming nepal, sustainable agriculture, organic products, farmer empowerment, murrah buffalo, organic certification, himalayan agriculture" />
        
        {/* Technical SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://krishihimalaya.com" />
        <meta name="author" content="Himalaya Krishi" />
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Manahari" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Himalaya Krishi" />
        <meta property="og:locale" content="en_NP" />
        <meta property="og:url" content="https://krishihimalaya.com" />
        <meta property="og:title" content="Himalaya Krishi - Leading Organic Excellence in Nepal" />
        <meta property="og:description" content="Discover premium organic products and sustainable farming solutions at Himalaya Krishi. Nepal's trusted name in organic agriculture since 1992." />
        <meta property="og:image" content="https://krishihimalaya.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@himalayakrishi" />
        <meta name="twitter:title" content="Himalaya Krishi - Organic Farming Excellence in Nepal" />
        <meta name="twitter:description" content="Premium organic products and sustainable farming solutions from Nepal's leading organic farm. Trusted since 1992." />
        <meta name="twitter:image" content="https://krishihimalaya.com/twitter-card.jpg" />
        
        {/* Schema.org LD+JSON */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness", "Farm"],
            "name": "Himalaya Krishi",
            "url": "https://krishihimalaya.com",
            "logo": "https://krishihimalaya.com/logo.png",
            "description": "Nepal's premier organic farming initiative promoting sustainable agriculture since 1992.",
            "foundingDate": "1992",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Manahari",
              "addressRegion": "Makwanpur",
              "addressCountry": "Nepal"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "27.5545",
              "longitude": "84.8897"
            },
            "sameAs": [
              "https://facebook.com/himalayakrishi",
              "https://twitter.com/himalayakrishi",
              "https://instagram.com/himalayakrishi"
            ]
          })}
        </script>
      </Helmet>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-900"
          >
            <div className="text-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className="w-64 h-1 bg-emerald-400 mb-8"
              />
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl text-white font-bold"
              >
                Himalaya Krishi
              </motion.h1>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Background Media */}
        {videoError ? (
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('/assets/images/fallback.webp')" }}
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              console.error('Video loading failed:', e);
              setVideoError(true);
            }}
            poster="/assets/images/fallback.webp"
          >
            <source 
              src="/assets/video/farmvideo.mp4"
              type="video/mp4"
            />
          </video>
        )}

        {/* Overlay with improved gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

        {/* Content with enhanced typography and spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="relative flex flex-col items-center justify-center h-full text-white px-6 text-center max-w-7xl mx-auto z-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-white leading-tight">
            Himalaya Krishi
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 animate-fade-in-up delay-200 text-emerald-100 leading-relaxed">
            Nepal's First Organic Farming
          </h2>
          <div className="w-24 h-1 bg-emerald-400 rounded-full mb-8 animate-fade-in-up delay-300"></div>
          <div className="mt-8 flex flex-col md:flex-row gap-6 animate-fade-in delay-500 scale-110">
            <ActionButton text="Learn About Us" link="/about" variant="primary" />
            <ActionButton text="Contact Us" link="/contact" variant="secondary" />
          </div>
        </motion.div>

        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 via-transparent to-emerald-900/10 animate-gradient opacity-50 z-0" />
      </motion.div>
    </>
  );
};

export default Home;

 