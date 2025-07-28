import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GiCow, GiFarmTractor, GiWheat, GiMilkCarton } from 'react-icons/gi';
import { FaHotel, FaSeedling, FaLeaf, FaChartLine, FaArrowDown, FaMountain, FaHandHoldingHeart } from 'react-icons/fa';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from '../components/ProgressiveImage';

// Premium color palette - preserved from original
const colors = {
  primary: '#1C4E37', // Deep forest green
  secondary: '#D8A51D', // Rich gold
  light: '#F4F9F1', // Soft sage white
  accent: '#8C3E2F', // Terracotta
  text: {
    dark: '#1A2E1D', // Almost black green
    medium: '#3A5944', // Medium forest
    light: '#F9FCF7', // Creamy white
    gold: '#D8A51D', // Rich gold
  },
  background: {
    primary: '#F4F9F1', // Soft sage white
    card: '#FFFFFF', // Pure white
    accent: 'rgba(216, 165, 29, 0.07)', // Gold with opacity
  }
};

// Enhanced animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const heroAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const heroTextAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// New reveal animations
const revealFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const revealFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const Vision = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect values
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroBackgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // SEO optimization
  useEffect(() => {
    document.title = "Our Vision | Himalaya Krishi | Premium Sustainable Agriculture";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Experience Himalaya Krishi's vision for premium organic dairy and sustainable agriculture solutions from the pristine Himalayan region of Nepal.";
    
    // Enhanced structured data for SEO
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "हिमालय कृषि तथा पशुपालन फार्म | Himalaya Krishi Tatha Pasupalan Farm",
      "description": "नेपालको अग्रणी जैविक कृषि र पशुपालन फार्म | Leading organic farming and dairy production in Nepal",
      "url": window.location.href,
      "areaServed": {
        "@type": "Country",
        "name": "Nepal"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hetauda",
        "addressRegion": "Bagmati",
        "addressCountry": "Nepal"
      },
      "sameAs": [
        "https://facebook.com/himalayakrishi",
        "https://instagram.com/himalayakrishi"
      ]
    };

    let scriptTag = document.querySelector('#schema-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = "schema-data";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.innerHTML = JSON.stringify(schemaData);
    
    // Scroll progress handler
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Set loaded state after a short delay for initial animations
    setTimeout(() => setIsLoaded(true), 300);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7] min-h-screen font-sans">
      <ScrollToTopButton />
      <Helmet>
        <title>Our Vision & Business Plan | Himalaya Krishi</title>
        <meta name="description" content="Discover our comprehensive approach to sustainable agriculture and dairy production at Himalaya Krishi." />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo_192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo_512.png" />
      </Helmet>
      
      {/* Enhanced Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#1C4E37] via-[#D8A51D] to-[#1C4E37]"
          style={{ 
            width: `${scrollProgress}%`,
            backgroundSize: '200% 100%',
            backgroundPosition: `${scrollProgress}% 0`
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
      
      {/* Enhanced Hero Section with Parallax */}
      <header ref={heroRef} className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[90vh] flex items-center">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-[#1C4E37] opacity-[0.03] rounded-b-[100px]"
            style={{ y: heroBackgroundY }}
          />
          <motion.div 
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#D8A51D] opacity-[0.03] blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#1C4E37] opacity-[0.03] blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2
            }}
          />
        </div>
        
        <motion.div 
          className="container mx-auto max-w-5xl text-center relative z-10"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={heroAnimation}
          style={{ y: heroTextY }}
        >
          {/* Premium badge */}
          <motion.div 
            className="inline-block mb-8 px-4 py-2 rounded-full bg-[rgba(28,78,55,0.06)] text-[#1C4E37] text-sm font-medium tracking-wide"
            variants={heroTextAnimation}
          >
            <span className="text-[#D8A51D] mr-2">✦</span>
            PREMIUM SUSTAINABLE AGRICULTURE
            <span className="text-[#D8A51D] ml-2">✦</span>
          </motion.div>
          
          {/* Decorative gold line */}
          <motion.div 
            className="w-16 h-1 bg-[#D8A51D] mx-auto mb-8"
            variants={heroTextAnimation}
          />
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1C4E37] mb-6 tracking-tight leading-tight"
            variants={heroTextAnimation}
          >
            Our Vision & <br className="hidden md:block" />
            <span className="text-[#D8A51D]">Business Plan</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-[#3A5944] max-w-3xl mx-auto font-light leading-relaxed mb-12"
            variants={heroTextAnimation}
          >
            A comprehensive approach to sustainable agriculture and dairy production, 
            focusing on premium products and community development.
          </motion.p>
          
          <motion.div
            className="flex justify-center"
            variants={heroTextAnimation}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(28, 78, 55, 0.1)' }}
              whileTap={{ y: 0 }}
              className="flex items-center justify-center gap-2 bg-[#1C4E37] text-white px-8 py-4 rounded-full group transition-all duration-300"
              onClick={() => window.scrollTo({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
              })}
            >
              <span className="font-medium">Explore Our Vision</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <FaArrowDown className="text-[#D8A51D] group-hover:text-white transition-colors duration-300" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 max-w-5xl pb-32">
        {/* Enhanced Company Overview Section */}
        <section aria-labelledby="company-overview" className="mb-24">
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-10 backdrop-blur-sm bg-opacity-90 border border-[rgba(255,255,255,0.2)] relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[rgba(216,165,29,0.05)]"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[rgba(28,78,55,0.05)]"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[rgba(28,78,55,0.06)] flex items-center justify-center">
                  <GiWheat className="text-3xl text-[#D8A51D]" />
                </div>
                <div>
                  <h2 id="company-overview" className="text-3xl font-serif font-bold text-[#1C4E37]">
                    Company Overview
                  </h2>
                  <div className="w-20 h-1 bg-[#D8A51D] mt-2 mb-2 opacity-70"></div>
                </div>
              </div>
              
              <p className="text-[#3A5944] leading-relaxed text-lg">
                Himalaya Krishi Tatha Pasupalan Farm is pioneering sustainable agriculture 
                and dairy production in Nepal. Our focus spans premium dairy products including 
                Murrah Ghee, butter, cheese, and fresh milk, alongside organic agricultural 
                products such as rice (chamal), corn flour (makai ko pitho), and innovative 
                cow dung-based products (gobar).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <motion.div 
                  className="p-6 rounded-xl bg-[rgba(28,78,55,0.03)] border border-[rgba(28,78,55,0.06)]"
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(28, 78, 55, 0.1)' }}
                  variants={staggerChildren}
                >
                  <FaMountain className="text-2xl text-[#D8A51D] mb-4" />
                  <h3 className="text-xl font-bold text-[#1C4E37] mb-2">Himalayan Quality</h3>
                  <p className="text-[#3A5944] text-sm">Premium products from the pristine Himalayan region</p>
                </motion.div>
                
                <motion.div 
                  className="p-6 rounded-xl bg-[rgba(28,78,55,0.03)] border border-[rgba(28,78,55,0.06)]"
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(28, 78, 55, 0.1)' }}
                  variants={staggerChildren}
                >
                  <FaLeaf className="text-2xl text-[#D8A51D] mb-4" />
                  <h3 className="text-xl font-bold text-[#1C4E37] mb-2">Organic Excellence</h3>
                  <p className="text-[#3A5944] text-sm">100% organic farming practices with no pesticides</p>
                </motion.div>
                
                <motion.div 
                  className="p-6 rounded-xl bg-[rgba(28,78,55,0.03)] border border-[rgba(28,78,55,0.06)]"
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(28, 78, 55, 0.1)' }}
                  variants={staggerChildren}
                >
                  <FaHandHoldingHeart className="text-2xl text-[#D8A51D] mb-4" />
                  <h3 className="text-xl font-bold text-[#1C4E37] mb-2">Community Impact</h3>
                  <p className="text-[#3A5944] text-sm">Supporting local farmers and sustainable practices</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Enhanced Key Metrics Section */}
        <section aria-labelledby="key-metrics" className="mb-24">
          <div className="text-center mb-12">
            <span className="inline-block h-1 w-12 bg-[#D8A51D] mb-4"></span>
            <h2 id="key-metrics" className="text-3xl font-serif font-bold text-[#1C4E37] inline-flex items-center justify-center">
              <FaChartLine className="mr-3 text-[#D8A51D]" />
              <span>Key Farm Metrics</span>
            </h2>
            <p className="text-[#3A5944] mt-4 max-w-2xl mx-auto">Our farm operations by the numbers, showcasing our growth and capacity</p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerChildren}
          >
            <MetricCard
              icon={<GiMilkCarton />}
              title="Dairy Production"
              value="250 Liters Daily"
              subtitle="Current Production"
            />
            <MetricCard
              icon={<GiCow />}
              title="Buffalo Herd"
              value="180 Buffaloes"
              subtitle="Including 30 milking & 50 pregnant"
            />
            <MetricCard
              icon={<FaSeedling />}
              title="Farm Land"
              value="5 Bigha*2"
              subtitle="For grass+ oeganic vegitable cultivation"
            />
            <MetricCard
              icon={<FaHotel />}
              title="Expansion"
              value="Organic Hotel+Dairy Outlates"
              subtitle="Coming to Hetauda"
            />
          </motion.div>
        </section>

        {/* Enhanced Growth Timeline Section */}
        <section aria-labelledby="growth-timeline" className="mb-24">
          <motion.div 
            className="rounded-2xl p-10 bg-gradient-to-br from-[#1C4E37] to-[#173E2C] text-white shadow-xl relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {/* Decorative patterns */}
            <div className="absolute inset-0 bg-[url('/assets/patterns/leaf-pattern.png')] opacity-5" />
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#D8A51D]/5 blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                <h2 id="growth-timeline" className="text-3xl font-serif font-bold text-white inline-flex items-center mb-4 md:mb-0">
                  <FaChartLine className="mr-4 text-[#D8A51D]" />
                  <span>Growth Timeline</span>
                </h2>
                
                <span className="px-4 py-2 bg-[rgba(216,165,29,0.2)] text-[#D8A51D] rounded-full text-sm font-medium">
                  5-Year Strategic Plan
                </span>
              </div>
              
              <motion.div 
                className="grid md:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
              >
                <TimelineCard
                  year="Year 1"
                  title="Foundation"
                  points={[
                    "Processing plant setup",
                    "Initial 20 milking buffaloes",
                    "Hotel location secured"
                  ]}
                />
                <TimelineCard
                  year="Year 2-3"
                  title="Expansion"
                  points={[
                    "500L daily milk production",
                    "Launch grain milling",
                    "E-commerce platform"
                  ]}
                />
                <TimelineCard
                  year="Year 4-5"
                  title="Maturity"
                  points={[
                    "Full hotel operations",
                    "International market entry",
                    "Complete product line"
                  ]}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Enhanced Operations Section with Side-by-Side Layout */}
        <section aria-labelledby="operations" className="mb-24">
          <div className="text-center mb-12">
            <span className="inline-block h-1 w-12 bg-[#D8A51D] mb-4"></span>
            <h2 id="operations" className="text-3xl font-serif font-bold text-[#1C4E37] inline-flex items-center justify-center">
              <GiFarmTractor className="mr-3 text-[#D8A51D]" />
              <span>Farm Operations</span>
            </h2>
            <p className="text-[#3A5944] mt-4 max-w-2xl mx-auto">Our diverse agricultural and hospitality operations</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 border border-[rgba(255,255,255,0.2)] relative overflow-hidden h-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealFromLeft}
            >
              {/* Decorative accent */}
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-[rgba(216,165,29,0.1)]" />
              
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-[#1C4E37] mb-6 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[rgba(28,78,55,0.06)] flex items-center justify-center mr-4">
                    <GiCow className="text-[#D8A51D] text-2xl" />
                  </div>
                  <span>Dairy Operations</span>
                </h3>
                
                <div className="bg-[rgba(28,78,55,0.02)] p-6 rounded-xl mb-6">
                  <p className="text-[#3A5944] mb-4">Our premium dairy operation focuses on quality over quantity, producing some of Nepal's finest dairy products from our carefully maintained buffalo herd.</p>
                </div>
                
                <ul className="space-y-4 mt-auto">
                  <OperationItem text="Current: 200L daily production" />
                  <OperationItem text="Target: 500L daily with expansion" />
                  <OperationItem text="Premium products: Murrah Ghee, butter, cheese" />
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 border border-[rgba(255,255,255,0.2)] relative overflow-hidden h-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealFromRight}
              transition={{ delay: 0.2 }}
            >
              {/* Decorative accent */}
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-[rgba(216,165,29,0.1)]" />
              
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-[#1C4E37] mb-6 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[rgba(28,78,55,0.06)] flex items-center justify-center mr-4">
                    <FaHotel className="text-[#D8A51D] text-xl" />
                  </div>
                  <span>Organic Hotel</span>
                </h3>
                
                <div className="bg-[rgba(28,78,55,0.02)] p-6 rounded-xl mb-6">
                  <p className="text-[#3A5944] mb-4">Our farm-to-table organic hotel concept brings the freshest ingredients directly from our farm to your plate, offering an authentic taste of Nepal.</p>
                </div>
                
                <ul className="space-y-4 mt-auto">
                  <OperationItem text="Location: Hetauda" />
                  <OperationItem text="Traditional Nepali snacks" />
                  <OperationItem text="Farm-to-table concept" />
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Vegetable Farming Section */}
        <section aria-labelledby="vegetable-farming">
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-10 backdrop-blur-sm bg-opacity-90 border border-[rgba(255,255,255,0.2)] relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[rgba(28,78,55,0.02)] rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[rgba(216,165,29,0.02)] rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[rgba(28,78,55,0.06)] flex items-center justify-center">
                  <FaLeaf className="text-3xl text-[#D8A51D]" />
                </div>
                <div>
                  <h2 id="vegetable-farming" className="text-3xl font-serif font-bold text-[#1C4E37]">
                    Vegetable Farming
                  </h2>
                  <div className="w-20 h-1 bg-[#D8A51D] mt-2 mb-2 opacity-70"></div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  variants={revealFromLeft}
                >
                  <h3 className="text-2xl font-serif font-bold text-[#1C4E37] mb-4">6 Bigha Farming Operations</h3>
                  <p className="text-[#3A5944] leading-relaxed mb-6">
                    We cultivate a variety of organic vegetables across 6 bigha of land, using sustainable farming practices to ensure the highest quality produce while preserving the natural ecosystem.
                  </p>
                  <div className="p-6 bg-[rgba(28,78,55,0.03)] rounded-xl mb-6">
                    <h4 className="font-bold text-[#1C4E37] mb-3">Our Farming Principles</h4>
                    <ul className="space-y-4">
                      <OperationItem text="Organic vegetable cultivation without pesticides" />
                      <OperationItem text="Seasonal crop rotation maximizing soil fertility" />
                      <OperationItem text="Natural compost-based fertilization techniques" />
                    </ul>
                  </div>
                </motion.div>
                
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerChildren}
                >
                  <h3 className="text-2xl font-serif font-bold text-[#1C4E37] mb-6">Key Crops</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <CropCard 
                      title="Leafy Vegetables" 
                      items="Spinach, Mustard, Lettuce" 
                    />
                    <CropCard 
                      title="Root Vegetables" 
                      items="Carrot, Radish, Beetroot" 
                    />
                    <CropCard 
                      title="Fruit Vegetables" 
                      items="Tomato, Cucumber, Eggplant" 
                    />
                    <CropCard 
                      title="Legumes" 
                      items="Peas, Beans, Lentils" 
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
        
      {/* Enhanced Contact CTA Section */}
      <footer className="bg-gradient-to-r from-[#1C4E37] to-[#164A32] text-white py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('/assets/patterns/leaf-pattern.png')] opacity-5" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#D8A51D]/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#D8A51D] text-sm font-medium mb-6">
              PARTNER WITH US
            </span>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              Ready to Experience <span className="text-[#D8A51D]">Premium Quality</span>?
            </h2>
            
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover how our premium organic products can enhance your business or delight your family.
            </p>
            
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(216, 165, 29, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#D8A51D] text-white font-bold rounded-full hover:bg-[#C29419] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D8A51D]/20"
              >
                Contact Us Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

// Enhanced Helper Components
const MetricCard = ({ icon, title, value, subtitle }) => (
  <motion.div 
    className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }}
  >
    {/* Enhanced decorative accent */}
    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[rgba(28,78,55,0.02)] group-hover:bg-[rgba(216,165,29,0.05)] transition-colors duration-500" />
    <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[rgba(216,165,29,0.02)] group-hover:bg-[rgba(28,78,55,0.05)] transition-colors duration-500" />
    
    <div className="relative z-10">
      <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[rgba(28,78,55,0.06)] mb-6 text-[#D8A51D] group-hover:bg-[rgba(216,165,29,0.1)] transition-colors duration-300">
        <motion.div 
          className="text-3xl"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
      </div>
      
      <h3 className="font-serif font-bold text-[#1C4E37] text-xl mb-2">{title}</h3>
      <p className="text-[#D8A51D] font-bold text-2xl mb-1">{value}</p>
      <p className="text-[#3A5944] text-sm font-medium">{subtitle}</p>
    </div>
  </motion.div>
);

const TimelineCard = ({ year, title, points }) => (
  <motion.div 
    className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
    variants={fadeIn}
  >
    {/* Enhanced decorative elements */}
    <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[rgba(216,165,29,0.05)] opacity-30" />
    
    <div className="relative z-10">
      <h3 className="text-[#D8A51D] font-serif font-bold text-2xl mb-2">{year}</h3>
      <h4 className="font-bold text-white text-xl mb-4">{title}</h4>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li 
            key={index} 
            className="text-[rgba(255,255,255,0.8)] flex items-start"
          >
            <motion.span 
              className="text-[#D8A51D] mr-3"
              whileHover={{ scale: 1.2 }}
            >•</motion.span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const OperationItem = ({ text }) => (
  <motion.li 
    className="flex items-start"
    whileHover={{ x: 5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="mr-4 mt-1">
      <motion.div 
        className="w-3 h-3 rounded-full bg-[#D8A51D]"
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.2 }}
      />
    </div>
    <span className="text-[#3A5944] font-medium">{text}</span>
  </motion.li>
);

const CropCard = ({ title, items }) => (
  <motion.div 
    className="bg-[rgba(28,78,55,0.03)] p-6 rounded-xl border border-[rgba(28,78,55,0.1)] hover:border-[#D8A51D] transition-all duration-300 hover:shadow-md relative overflow-hidden group"
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
    }}
    whileHover={{ y: -5 }}
  >
    {/* Enhanced decorative elements */}
    <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[rgba(216,165,29,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <h4 className="font-serif font-bold text-[#1C4E37] mb-2 group-hover:text-[#D8A51D] transition-colors duration-300">{title}</h4>
      <p className="text-[#3A5944] text-sm">{items}</p>
    </div>
  </motion.div>
);

export default Vision;
