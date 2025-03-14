import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiCow, GiFarmTractor, GiWheat, GiMilkCarton } from 'react-icons/gi';
import { FaHotel, FaSeedling, FaLeaf, FaChartLine, FaArrowDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Premium color palette
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

// Add this at the top with other imports
import { Helmet } from 'react-helmet-async';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const heroAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const heroTextAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const Vision = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // SEO optimization
  useEffect(() => {
    document.title = "Himalaya Krishi | Premium Sustainable Agriculture & Dairy";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Experience Himalaya Krishi Tatha Pasupalan Farm's premium organic dairy and sustainable agriculture solutions from the pristine Himalayan region of Nepal.";
    
    // Add structured data for SEO
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Himalaya Krishi Tatha Pasupalan Farm",
      "description": "Premium organic dairy and sustainable agriculture solutions from Nepal",
      "url": window.location.href,
      "foundingDate": "2022"
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const heroAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const heroTextAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7] min-h-screen font-sans">
      <Helmet>
        <title>Our Vision & Business Plan | Himalaya Krishi</title>
        <meta name="description" content="Discover our comprehensive approach to sustainable agriculture and dairy production at Himalaya Krishi." />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo_192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo_512.png" />
      </Helmet>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#1C4E37] to-[#D8A51D] z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[480px] overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[#1C4E37] opacity-5 rounded-b-[100px]" />
      </div>
      
      {/* Hero Section with semantic header */}
      <header className="pt-32 pb-20 px-4 relative">
        <motion.div 
          className="container mx-auto max-w-5xl text-center relative z-10"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={heroAnimation}
        >
          {/* Decorative gold line */}
          <motion.div 
            className="w-16 h-1 bg-[#D8A51D] mx-auto mb-8"
            variants={heroTextAnimation}
          />
          
          <motion.h1 
            className="text-6xl font-serif font-bold text-[#1C4E37] mb-6 tracking-tight"
            variants={heroTextAnimation}
          >
            Our Vision & Business Plan
          </motion.h1>
          
          <motion.p 
            className="text-xl text-[#3A5944] max-w-3xl mx-auto font-light leading-relaxed"
            variants={heroTextAnimation}
          >
            A comprehensive approach to sustainable agriculture and dairy production, 
            focusing on premium products and community development.
          </motion.p>
          
          <motion.div
            className="mt-12 flex justify-center"
            variants={heroTextAnimation}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ y: -5 }}
              whileTap={{ y: 0 }}
              className="flex items-center text-[#1C4E37]"
              onClick={() => window.scrollTo({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
              })}
            >
              <span className="mr-2">Explore</span>
              <FaArrowDown className="animate-bounce" />
            </motion.button>
          </motion.div>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 max-w-5xl pb-32">
        {/* Company Overview Section */}
        <section aria-labelledby="company-overview" className="mb-24">
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-10 backdrop-blur-sm bg-opacity-90 border border-[rgba(255,255,255,0.2)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 id="company-overview" className="text-3xl font-serif font-bold text-[#1C4E37] mb-8 inline-flex items-center">
              <GiWheat className="mr-4 text-[#D8A51D]" />
              <span>Company Overview</span>
            </h2>
            <p className="text-[#3A5944] leading-relaxed text-lg">
              Himalaya Krishi Tatha Pasupalan Farm is pioneering sustainable agriculture 
              and dairy production in Nepal. Our focus spans premium dairy products including 
              Murrah Ghee, butter, cheese, and fresh milk, alongside organic agricultural 
              products such as rice (chamal), corn flour (makai ko pitho), and innovative 
              cow dung-based products (gobar).
            </p>
          </motion.div>
        </section>

        {/* Key Metrics Section */}
        <section aria-labelledby="key-metrics" className="mb-24">
          <div className="text-center mb-12">
            <span className="inline-block h-1 w-12 bg-[#D8A51D] mb-4"></span>
            <h2 id="key-metrics" className="text-3xl font-serif font-bold text-[#1C4E37] inline-flex items-center justify-center">
              <FaChartLine className="mr-3 text-[#D8A51D]" />
              <span>Key Farm Metrics</span>
            </h2>
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
              value="200 Liters Daily"
              subtitle="Current Production"
            />
            <MetricCard
              icon={<GiCow />}
              title="Buffalo Herd"
              value="130 Buffaloes"
              subtitle="Including 20 milking & 50 pregnant"
            />
            <MetricCard
              icon={<FaSeedling />}
              title="Farm Land"
              value="5 Bigha"
              subtitle="For grass cultivation"
            />
            <MetricCard
              icon={<FaHotel />}
              title="Expansion"
              value="Organic Hotel"
              subtitle="Coming to Hetauda"
            />
          </motion.div>
        </section>

        {/* Growth Timeline Section */}
        <section aria-labelledby="growth-timeline" className="mb-24">
          <motion.div 
            className="rounded-2xl p-10 bg-gradient-to-br from-[#1C4E37] to-[#173E2C] text-white shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
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
          </motion.div>
        </section>

        {/* Operations Section */}
        <section aria-labelledby="operations" className="mb-24">
          <div className="text-center mb-12">
            <span className="inline-block h-1 w-12 bg-[#D8A51D] mb-4"></span>
            <h2 id="operations" className="text-3xl font-serif font-bold text-[#1C4E37] inline-flex items-center justify-center">
              <GiFarmTractor className="mr-3 text-[#D8A51D]" />
              <span>Farm Operations</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 border border-[rgba(255,255,255,0.2)] relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              {/* Decorative accent */}
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-[rgba(216,165,29,0.1)]" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold text-[#1C4E37] mb-6 flex items-center">
                  <GiCow className="text-[#D8A51D] mr-3 text-3xl" />
                  <span>Dairy Operations</span>
                </h3>
                <ul className="space-y-4">
                  <OperationItem text="Current: 200L daily production" />
                  <OperationItem text="Target: 500L daily with expansion" />
                  <OperationItem text="Premium products: Murrah Ghee, butter, cheese" />
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 border border-[rgba(255,255,255,0.2)] relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              {/* Decorative accent */}
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-[rgba(216,165,29,0.1)]" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold text-[#1C4E37] mb-6 flex items-center">
                  <FaHotel className="text-[#D8A51D] mr-3 text-2xl" />
                  <span>Organic Hotel</span>
                </h3>
                <ul className="space-y-4">
                  <OperationItem text="Location: Hetauda" />
                  <OperationItem text="Traditional Nepali snacks" />
                  <OperationItem text="Farm-to-table concept" />
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vegetable Farming Section */}
        <section aria-labelledby="vegetable-farming">
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-10 backdrop-blur-sm bg-opacity-90 border border-[rgba(255,255,255,0.2)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 id="vegetable-farming" className="text-3xl font-serif font-bold text-[#1C4E37] mb-8 inline-flex items-center">
              <FaLeaf className="mr-4 text-[#D8A51D]" />
              <span>Vegetable Farming</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#1C4E37] mb-4">6 Bigha Farming Operations</h3>
                <p className="text-[#3A5944] leading-relaxed mb-6">
                  We cultivate a variety of organic vegetables across 6 bigha of land, using sustainable farming practices to ensure the highest quality produce while preserving the natural ecosystem.
                </p>
                <ul className="space-y-4">
                  <OperationItem text="Organic vegetable cultivation without pesticides" />
                  <OperationItem text="Seasonal crop rotation maximizing soil fertility" />
                  <OperationItem text="Natural compost-based fertilization techniques" />
                </ul>
              </div>
              
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
          </motion.div>
        </section>
        
        {/* Community Leaders Testimonials */}
        <section aria-labelledby="testimonials" className="mb-24">
          <div className="text-center mb-12">
            <span className="inline-block h-1 w-12 bg-[#D8A51D] mb-4"></span>
            <h2 id="testimonials" className="text-3xl font-serif font-bold text-[#1C4E37] mb-4">
              Community Leaders' Endorsements
            </h2>
            <p className="text-[#3A5944] text-lg max-w-2xl mx-auto">
              Trusted and recognized by leading figures in our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <img 
                  src="/assets/images/leaders/hari-bahadur.jpg"
                  alt="Hari Bahadur Tamang"
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-emerald-100"
                />
                <p className="text-[#3A5944] italic mb-6 leading-relaxed">
                  "Their innovative approach to organic farming has set new standards in our region. They're not just a business, but a catalyst for positive change in our community."
                </p>
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1C4E37]">Hari Bahadur Tamang</h3>
                    <p className="text-[#D8A51D] text-sm">Ward Chairman, Manahari-5</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <img 
                  src="/assets/images/leaders/sita-gurung.jpg"
                  alt="Sita Gurung"
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-emerald-100"
                />
                <p className="text-[#3A5944] italic mb-6 leading-relaxed">
                  "As agricultural consultants, we're impressed by their dedication to quality and sustainability. They're setting an example for modern organic farming in Nepal."
                </p>
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1C4E37]">Sita Gurung</h3>
                    <p className="text-[#D8A51D] text-sm">Director, ISHO Consultancy Pokhara</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        </main>
        
        {/* Contact CTA Section */}
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
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
                Ready to Partner With Us?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Discover how our premium organic products can enhance your business or delight your family.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
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
    {/* Decorative accent circle */}
    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(216,165,29,0.03)] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out" />
    
    <div className="relative z-10">
      <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[rgba(28,78,55,0.06)] mb-6 text-[#D8A51D]">
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
    className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 transform hover:-translate-y-2"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }}
  >
    <h3 className="text-[#D8A51D] font-serif font-bold text-2xl mb-2">{year}</h3>
    <h4 className="font-bold text-white text-xl mb-4">{title}</h4>
    <ul className="space-y-3">
      {points.map((point, index) => (
        <li key={index} className="text-[rgba(255,255,255,0.8)] flex items-start">
          <motion.span 
            className="text-[#D8A51D] mr-3"
            whileHover={{ scale: 1.2 }}
          >•</motion.span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
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
    className="bg-[rgba(28,78,55,0.03)] p-6 rounded-xl border border-[rgba(28,78,55,0.1)] hover:border-[#D8A51D] transition-all duration-300 hover:shadow-md"
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
    }}
    whileHover={{ y: -5 }}
  >
    <h4 className="font-serif font-bold text-[#1C4E37] mb-2">{title}</h4>
    <p className="text-[#3A5944] text-sm">{items}</p>
  </motion.div>
);

// Remove these lines
const ownerImage = new URL('../assets/image/owner.jpg', import.meta.url).href;
const managerImage = new URL('../assets/image/manager.jpeg', import.meta.url).href;

// Remove the entire TeamSection component definition
const TeamSection = () => (
  <section aria-labelledby="team" className="mb-24 relative">
    {/* Decorative background elements */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/50 to-transparent -z-10" />
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl -z-10" />
    <div className="absolute left-0 top-1/4 w-48 h-48 bg-[#D8A51D]/10 rounded-full blur-2xl -z-10" />

    <div className="container mx-auto px-4 max-w-5xl">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block h-1 w-24 bg-[#D8A51D] mb-6"></span>
        <h2 className="text-4xl font-serif font-bold text-[#1C4E37] mb-4">
          Meet Our Leadership
        </h2>
        <p className="text-[#3A5944] text-lg max-w-2xl mx-auto">
          Dedicated professionals committed to sustainable agriculture and innovation
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Kedar's Card */}
        <motion.div 
          className="group"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/20 to-transparent rounded-bl-full" />
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-emerald-100 shadow-lg">
                <img 
                  src={ownerImage}
                  alt="Kedar Prasad Adhikari"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1C4E37] mb-2">Kedar Prasad Adhikari</h3>
              <p className="text-[#D8A51D] font-medium mb-4">Owner</p>
              <p className="text-[#3A5944] leading-relaxed">
                Visionary leader with extensive experience in sustainable agriculture
              </p>
            </div>
          </div>
        </motion.div>

        {/* Abhishek's Card */}
        <motion.div 
          className="group"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/20 to-transparent rounded-bl-full" />
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-emerald-100 shadow-lg">
                <img 
                  src={managerImage}
                  alt="Abhishek Adhikari"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1C4E37] mb-2">Abhishek Adhikari</h3>
              <p className="text-[#D8A51D] font-medium mb-4">Manager</p>
              <p className="text-[#3A5944] leading-relaxed">
                Operations expert focused on implementing innovative farming solutions
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Vision;