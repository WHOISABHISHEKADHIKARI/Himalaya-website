import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollToTopButton from '../components/ScrollToTopButton';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import ProgressiveImage from '../components/ProgressiveImage';
import OptimizedImage from '../components/OptimizedImage';
import LazyContent, { LazySection, LazyCard } from '../components/LazyContent';
import SkeletonLoader from '../components/SkeletonLoader';
import imag1 from '../assets/image/imag1.webp';
import imag5 from '../assets/image/imag5.webp';
import imag6 from '../assets/image/imag6.webp';
import imag7 from '../assets/image/imag7.webp';
import imag9 from '../assets/image/imag9.webp';

// Testimonial images
import ekrajVisit2 from '../assets/image/ekraj-visit-2.webp';
import arunRajVisit from '../assets/image/Arun Raj Sumargi visit.png';
import hariHarVisit from '../assets/image/Hari Har Vist1.jpg';
import hetaudaVisit from '../assets/image/Hetauda Enterpenure viist on mudfest.jpg';

import FAQ from '../components/FAQ';
import LinkedInProfile from '../components/LinkedInProfile';

// Testimonial images array


// Stats array
// eslint-disable-next-line no-unused-vars
const stats = [
  { value: "1000+", label: "Farmers Empowered" },
  { value: "5000+", label: "Hectares Organic" },
  { value: "15+", label: "Years Experience" }
];

// Features array
// eslint-disable-next-line no-unused-vars
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

// Styles object
const styles = {
  base: "flex items-center gap-4 px-10 py-5 rounded-full text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95", // Fixed syntax
  primary: "bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 text-white hover:from-teal-400 hover:via-emerald-500 hover:to-teal-400 shadow-xl shadow-emerald-500/30 animate-float border border-emerald-300/40 backdrop-blur-lg hover:shadow-emerald-400/50",
  secondary: "bg-white/5 backdrop-blur-lg border-2 border-white/20 text-white hover:bg-white/10 hover:border-emerald-400/50 hover:text-emerald-300 hover:shadow-emerald-400/20"
};

// ActionButton component
const ActionButton = ({ text, link, isExternal, variant = "primary" }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isExternal) {
      window.open(link, '_blank');
    } else {
      navigate(link);
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

// Colors object
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

// Gallery Component
const GallerySection = () => {
  // Gallery images from public/assets/gallary (corrected directory path)
  const galleryImages = [
    {
      src: "/assets/gallary/1724651083866.jpg",
      alt: "Himalaya Krishi Farm Activities",
      title: "Farm Operations"
    },
    {
      src: "/assets/gallary/1724651084206.jpg",
      alt: "Agricultural Development",
      title: "Farm Growth"
    },
    {
      src: "/assets/gallary/1724651084905.jpg",
      alt: "Organic Farming Methods",
      title: "Sustainable Practices"
    },
    {
      src: "/assets/gallary/1724651084994.jpg",
      alt: "Farm Infrastructure",
      title: "Modern Facilities"
    },
    {
      src: "/assets/gallary/1724651085198.jpg",
      alt: "Agricultural Excellence",
      title: "Quality Production"
    },
    {
      src: "/assets/gallary/1724651085671.jpg",
      alt: "Farm Landscape",
      title: "Natural Beauty"
    },
    {
      src: "/assets/gallary/1724651090098.jpg",
      alt: "Farm Activities",
      title: "Agricultural Work"
    },
    {
      src: "/assets/gallary/1751250556796.jpeg",
      alt: "Farm Activities",
      title: "Daily Operations"
    },
    {
      src: "/assets/gallary/497349672_122132875598749340_8339112857976662526_n (1).jpg",
      alt: "Farm Community",
      title: "Team Work"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.47_8c730d5b.jpg",
      alt: "Organic Farming Practices",
      title: "Sustainable Agriculture"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.47_a5cc7b1f.jpg",
      alt: "Farm Development",
      title: "Agricultural Progress"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.48_dffecf45.jpg",
      alt: "Farm Infrastructure",
      title: "Modern Facilities"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.49_9ad2ed53.jpg",
      alt: "Agricultural Methods",
      title: "Natural Farming"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.49_e7d38ea2.jpg",
      alt: "Farm Equipment",
      title: "Agricultural Tools"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.50_0f694c24.jpg",
      alt: "Farm Landscape",
      title: "Organic Fields"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.50_d4c9a0a8.jpg",
      alt: "Crop Production",
      title: "Harvest Time"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.51_1209cc07.jpg",
      alt: "Farm Workers",
      title: "Dedicated Team"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.51_33734862.jpg",
      alt: "Agricultural Innovation",
      title: "Modern Techniques"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.52_1907965d.jpg",
      alt: "Farm Management",
      title: "Efficient Operations"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.52_390d4be6.jpg",
      alt: "Sustainable Farming",
      title: "Eco-Friendly Methods"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.52_644c82e2.jpg",
      alt: "Farm Productivity",
      title: "High Yield Crops"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.52_8049a61d.jpg",
      alt: "Agricultural Excellence",
      title: "Quality Standards"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.52_a0dffc20.jpg",
      alt: "Farm Technology",
      title: "Advanced Systems"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.53_226a0733.jpg",
      alt: "Organic Cultivation",
      title: "Natural Growth"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.53_40adf995.jpg",
      alt: "Farm Sustainability",
      title: "Environmental Care"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.53_97185639.jpg",
      alt: "Agricultural Research",
      title: "Innovation Hub"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.53_9b84a2e8.jpg",
      alt: "Farm Development",
      title: "Growth & Progress"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.54_4af3acb3.jpg",
      alt: "Farm Community",
      title: "Team Collaboration"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.54_b9ff23ab.jpg",
      alt: "Agricultural Success",
      title: "Achievement"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.55_396fcdf6.jpg",
      alt: "Farm Excellence",
      title: "Quality Production"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.55_44f44ded.jpg",
      alt: "Sustainable Agriculture",
      title: "Green Farming"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.56_155f8cfc.jpg",
      alt: "Farm Innovation",
      title: "Future Farming"
    },
    {
      src: "/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.56_54241bc1.jpg",
      alt: "Agricultural Heritage",
      title: "Traditional Values"
    },
    {
      src: "/assets/gallary/image1.jpg",
      alt: "Farm Scenery",
      title: "Beautiful Landscape"
    },
    {
      src: "/assets/gallary/image2.jpg",
      alt: "Agricultural View",
      title: "Farm Panorama"
    },
    {
      src: "/assets/gallary/photo.jpg",
      alt: "Farm Photography",
      title: "Captured Moments"
    },
    {
      src: "/assets/gallary/photo1.jpg",
      alt: "Farm Life",
      title: "Rural Beauty"
    },
    {
      src: "/assets/gallary/photo2.jpg",
      alt: "Agricultural Journey",
      title: "Farm Story"
    }
  ];

  // Download function for images
  const downloadImage = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'himalaya-farm-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <motion.section 
      className="py-24" 
      style={{ backgroundColor: colors.light }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-5xl font-serif font-bold mb-6" 
              style={{ color: colors.text.dark }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Gallery
            </motion.h2>
            <div className="w-32 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
            <motion.p 
              className="text-xl max-w-3xl mx-auto" 
              style={{ color: colors.text.medium }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Explore the beauty of our organic farm through these captivating images showcasing our commitment to sustainable agriculture.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="aspect-square overflow-hidden">
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    width={400}
                    height={400}
                    quality={85}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <button
                        onClick={() => downloadImage(encodeURI(image.src), `image-${index + 1}.jpg`)}
                        className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 mx-auto"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTopButton />
      <SEO
        title="Premier Organic Farm & Sustainable Agriculture in Nepal"
        description="Experience Nepal's finest organic farming at Himalaya Krishi. We offer premium organic products, sustainable agriculture solutions, and empower local farmers since 1992."
        keywords="organic farming nepal, sustainable agriculture, organic products, farmer empowerment, murrah buffalo, organic certification, himalayan agriculture"
        canonicalUrl="https://krishihimalaya.com"
        ogImage="https://krishihimalaya.com/assets/logo/logo_512.png"
      >
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Manahari" />
        <meta property="og:locale" content="en_NP" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness", "Farm"],
            "name": "Himalaya Krishi",
            "url": "https://krishihimalaya.com",
            "logo": "https://krishihimalaya.com/assets/logo/logo_512.png",
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
                </SEO>
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
      <section className="relative h-screen flex items-center pt-28 overflow-hidden">
        {/* Progressive Background Image */}
        <div className="absolute inset-0">
          <ProgressiveImage
            src={imag1}
            alt="Himalaya Krishi organic farm landscape"
            priority={true}
            className="w-full h-full object-cover"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 z-10" style={{ backgroundColor: colors.primary, opacity: 0.7 }}></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" style={{ color: colors.text.light }}>
              Himalaya Krishi
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto" style={{ color: colors.text.light }}>
              Nepal&apos;s First Organic Farming
            </p>
            <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center">
              <ActionButton text="Learn About Us" link="/about" variant="primary" />
              <ActionButton text="Contact Us" link="/contact" variant="secondary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Heritage Section */}
      <LazySection id="heritage" className="py-24" style={{ backgroundColor: colors.background.card }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-serif font-bold mb-6" 
                style={{ color: colors.text.dark }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Heritage
              </motion.h2>
              <div className="w-32 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
              <motion.p 
                className="text-xl max-w-3xl mx-auto" 
                style={{ color: colors.text.medium }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                A legacy of organic excellence since 1992, rooted in tradition and growing with innovation.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: colors.text.dark }}>Our Heritage</h3>
                <div className="w-24 h-1 mb-8" style={{ backgroundColor: colors.secondary }}></div>
                <p className="text-lg mb-6 text-justify" style={{ color: colors.text.medium }}>
                  Our journey began in 1992 with a small herd of Murrah buffaloes. What started as a modest dairy farm has now evolved into a thriving organic enterprise. Through decades of dedication, we have expanded our operations while staying true to our roots.
                </p>
                <p className="text-lg mb-6 text-justify" style={{ color: colors.text.medium }}>
                  Today, we stand as a testament to sustainable growth, blending traditional wisdom with modern practices. Our commitment to quality and authenticity has never wavered, even as we&apos;ve grown from a family business to a community cornerstone.
                </p>
                <div className="flex items-center mt-8">
                  <span className="w-16 h-1" style={{ backgroundColor: colors.secondary }}></span>
                  <span className="ml-4 font-medium" style={{ color: colors.text.gold }}>Est. 1992</span>
                </div>
              </motion.div>
              <motion.div 
                className="relative h-[600px]"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-5 -right-5 w-full h-full border-2" style={{ backgroundColor: colors.secondary }}></div>
                <ProgressiveImage
                  src={imag9}
                  alt="Our organic farm heritage showing Murrah buffaloes"
                  className="w-full h-full object-cover relative z-10 shadow-xl rounded-lg"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  width="800"
                  height="600"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Our Philosophy Section */}
      <section className="py-24" style={{ backgroundColor: colors.background.accent }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6" style={{ color: colors.text.dark }}>Our Philosophy</h2>
              <div className="w-32 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.medium }}>
                Embracing nature&apos;s wisdom while pioneering sustainable agricultural practices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: colors.text.dark }}>Our Philosophy</h3>
                <div className="w-24 h-1 mb-8" style={{ backgroundColor: colors.secondary }}></div>
                <p className="text-lg mb-6 text-justify" style={{ color: colors.text.medium }}>
                  Our vision extends far beyond dairy. We are committed to sustainable farming, using organic practices that not only nourish our land but also support the health and well-being of our community. From dairy products to organic crops, we are scaling up and reaching new heights.
                </p>
                <p className="text-lg mb-6 text-justify" style={{ color: colors.text.medium }}>
                  Our products stand as a testament to quality, authenticity, and the power of nature. Every step, from our cows to our crops, follows sustainable practices. We believe in working with nature, not against it to produce the finest organic products.
                </p>
              </div>
              <motion.div 
                className="order-1 md:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <motion.div 
                      className="overflow-hidden rounded-lg shadow-xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <ProgressiveImage
                        src={imag7}
                        alt="Organic farming practices in action"
                        className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </motion.div>
                    <motion.div 
                      className="overflow-hidden rounded-lg shadow-xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <ProgressiveImage
                        src={imag5}
                        alt="Sustainable agricultural methods"
                        className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </motion.div>
                  </div>
                  <motion.div 
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <ProgressiveImage
                        src={imag6}
                        alt="Our organic farm landscape"
                        className="w-full h-96 object-cover hover:scale-110 transition-transform duration-700"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Voices of Transformation */}
      <section className="py-24" style={{ backgroundColor: colors.light }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-serif font-bold mb-6" 
                style={{ color: colors.text.dark }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Voices of Transformation
              </motion.h2>
              <div className="w-32 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
              <motion.p 
                className="text-xl max-w-3xl mx-auto" 
                style={{ color: colors.text.medium }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Hear from the leaders, scientists, and entrepreneurs who have witnessed our sustainable farming revolution create meaningful change across communities.
              </motion.p>
            </div>

            {/* Testimonial Card */}
            <VisitorVoiceCard />
          </div>
        </div>
      </section>

      {/* Our Gallery Section - Loads after 20 seconds */}
      <GallerySection />

      {/* Asar 15 Video Section - Placeholder until video is available */}
      <section className="py-24" style={{ backgroundColor: colors.background.card }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-serif font-bold mb-6" 
                style={{ color: colors.text.dark }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Asar 15 - Farm Experience & Mudfest
              </motion.h2>
              <div className="w-32 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
              <motion.p 
                className="text-xl max-w-3xl mx-auto" 
                style={{ color: colors.text.medium }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Experience the authentic farming life and vibrant mudfest celebrations through our exclusive Asar 15 showcase.
              </motion.p>
            </div>
            
            <motion.div
              className="relative max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                {/* Placeholder image until video is available */}
                <div className="relative h-96 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <img
                    src="/assets/gallary/WhatsApp Image 2025-08-05 at 10.37.47_8c730d5b.jpg"
                    alt="Asar 15 Farm Experience & Mudfest"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <p className="text-lg font-semibold">Video Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-lg" style={{ color: colors.text.medium }}>
                  Discover the traditional farming practices, modern techniques, and festive mudfest celebrations that make our organic farm unique.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
        
      
    </div>
  );
};

// Visitor Voice Card Component
const VisitorVoiceCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      image: ekrajVisit2,
      quote: "As an ex-municipality chairperson and advisor of Kisan Bank, I have witnessed firsthand the transformative impact of Himalaya Krishi's sustainable farming initiatives. Their approach to organic agriculture is setting new standards for rural development.",
      name: "Ek Raj Upreti",
      role: "Social Activist, Ex-Municipality Chairperson & Kisan Bank Advisor"
    },
    {
      image: arunRajVisit,
      quote: "As a Social Activist, I have witnessed firsthand the transformative impact of Himalaya Krishi's sustainable farming initiatives. Their approach to organic agriculture is setting new standards for rural development.",
      name: "Arun Raj Sumargi",
      role: "Social Activist, 100 Kisan Advisor"
    },
    {
      image: hariHarVisit,
      quote: "From a scientific perspective, Himalaya Krishi's integration of traditional knowledge with modern agricultural techniques is remarkable. Their research-based approach to organic farming is contributing significantly to sustainable agriculture development.",
      name: "Hari Har Adhikari",
      role: "Agricultural Scientists"
    },
    {
      image: hetaudaVisit,
      quote: "The entrepreneurial spirit fostered by Himalaya Krishi during our visit to the mud festival was truly inspiring. Their innovative approach to sustainable agriculture and community engagement demonstrates exceptional leadership in rural development.",
      name: "Hetauda Entrepreneurs",
      role: "Business Leaders & Community Developers"
    }
  ];

  // Auto-loop through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-80 md:h-96">
            <motion.img
              key={currentIndex}
              src={currentTestimonial.image}
              alt={`Testimonial from ${currentTestimonial.name}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Navigation dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-6' 
                        : 'hover:scale-125'
                    }`}
                    style={{ 
                      backgroundColor: index === currentIndex ? colors.secondary : colors.secondary + '40'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Quote */}
            <motion.blockquote 
              key={`quote-${currentIndex}`}
              className="relative mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -top-2 -left-2 text-4xl font-serif leading-none select-none" style={{ color: colors.secondary, opacity: 0.3 }}>"</div>
              <p className="text-lg leading-relaxed pl-6 relative z-10" style={{ color: colors.text.dark }}>
                {currentTestimonial.quote}
              </p>
            </motion.blockquote>

            {/* Author */}
            <motion.div 
              key={`author-${currentIndex}`}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.secondary }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg" style={{ color: colors.text.dark }}>{currentTestimonial.name}</h4>
                <p className="text-sm" style={{ color: colors.text.medium }}>{currentTestimonial.role}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
 };

export default Home;