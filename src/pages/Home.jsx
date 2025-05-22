import React, { useState, useEffect } from "react";
import ScrollToTopButton from '../components/ScrollToTopButton';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import imag5 from '../assets/image/imag5.webp';
import imag6 from '../assets/image/imag6.webp';
import imag7 from '../assets/image/imag7.webp';
import imag9 from '../assets/image/imag9.webp';
import ekrajVisit1 from '../assets/image/ekraj-visit-1.webp';
import ekrajVisit2 from '../assets/image/ekraj-visit-2.webp';
import ekrajVisit3 from '../assets/image/ekraj-visit-3.webp';
import ekrajVisit4 from '../assets/image/ekraj-visit-4.webp';
import ekrajVisit5 from '../assets/image/ekraj-visit-5.webp';

// Testimonial images array
const testimonialImages = [
  ekrajVisit1,
  ekrajVisit2,
  ekrajVisit3,
  ekrajVisit4,
  ekrajVisit5,
];

// Stats array
const stats = [
  { value: "1000+", label: "Farmers Empowered" },
  { value: "5000+", label: "Hectares Organic" },
  { value: "15+", label: "Years Experience" }
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

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === testimonialImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? testimonialImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Reset scroll position to top when component mounts
    window.scrollTo(0, 0);
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
        ogImage="https://krishihimalaya.com/og-image.jpg"
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
      <section 
        className="relative h-screen flex items-center pt-28"
      >
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/assets/video/farmvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay for darkening the video */}
        <div className="absolute inset-0" style={{ backgroundColor: colors.primary, opacity: 0.7 }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" style={{ color: colors.text.light }}>
            Himalaya Krishi
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto" style={{ color: colors.text.light }}>
            Nepal's First Organic Farming
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center">
            <ActionButton text="Learn About Us" link="/about" variant="primary" />
            <ActionButton text="Contact Us" link="/contact" variant="secondary" />
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section id="heritage" className="py-24" style={{ backgroundColor: colors.background.card }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6" style={{ color: colors.text.dark }}>Our Heritage</h2>
              <div className="w-32 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.medium }}>
                A legacy of organic excellence since 1992, rooted in tradition and growing with innovation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: colors.text.dark }}>Our Heritage</h3>
                <div className="w-24 h-1 mb-8" style={{ backgroundColor: colors.secondary }}></div>
                <p className="text-lg mb-6 text-justify" style={{ color: colors.text.medium }}>
                  Our journey began in 1992 with a small herd of Murrah buffaloes. What started as a modest dairy farm has now evolved into a thriving organic enterprise. Through decades of dedication, we have expanded our operations while staying true to our roots.
                </p>
                <p className="text-lg mb-6 text-justify" style={{ color: colors.text.medium }}>
                  Today, we stand as a testament to sustainable growth, blending traditional wisdom with modern practices. Our commitment to quality and authenticity has never wavered, even as we've grown from a family business to a community cornerstone.
                </p>
                <div className="flex items-center mt-8">
                  <span className="w-16 h-1" style={{ backgroundColor: colors.secondary }}></span>
                  <span className="ml-4 font-medium" style={{ color: colors.text.gold }}>Est. 1992</span>
                </div>
              </div>
              <div className="relative h-[600px]">
                <div className="absolute -top-5 -right-5 w-full h-full border-2" style={{ backgroundColor: colors.secondary }}></div>
                <img 
                  src={imag9}
                  alt="Our organic farm heritage showing Murrah buffaloes" 
                  className="w-full h-full object-cover relative z-10 shadow-xl rounded-lg"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-24" style={{ backgroundColor: colors.background.accent }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6" style={{ color: colors.text.dark }}>Our Philosophy</h2>
              <div className="w-32 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.medium }}>
                Embracing nature's wisdom while pioneering sustainable agricultural practices.
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
              <div className="order-1 md:order-2">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img 
                        src={imag7}
                        alt="Organic farming practices in action" 
                        className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img 
                        src={imag5}
                        alt="Sustainable agricultural methods" 
                        className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="mt-12">
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img 
                        src={imag6}
                        alt="Our organic farm landscape" 
                        className="w-full h-96 object-cover hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What People Say Section */}
      <section className="py-24 relative" style={{ backgroundColor: colors.background.card }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4" style={{ color: colors.text.dark }}>
                Voices of vistors
              </h2>
              <div className="w-32 h-1 mx-auto mb-6" style={{ backgroundColor: colors.secondary }}></div>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.text.medium }}>
                Discover the stories and experiences shared by our valued visitors and partners.
              </p>
            </div>
            
            {/* Premium Stacked Testimonial Design - Enhanced */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl" role="region" aria-label="Testimonial carousel" aria-live="polite">
              {/* Image Section - Top */}
              <div className="relative h-[550px]">
                <motion.img 
                  key={currentImageIndex}
                  src={testimonialImages[currentImageIndex]}
                  alt={`Visitor testimonial ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70"></div>
                
                {/* Premium Image Badge */}
                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <p className="text-white text-sm font-medium">Testimonial {currentImageIndex + 1}/{testimonialImages.length}</p>
                </div>
                
                {/* Image Overlay Navigation */}
                <div className="absolute top-6 right-6 flex gap-2 z-10">
                  <button 
                    onClick={prevImage}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md transition-all duration-300 border border-white/20"
                    aria-label="Previous testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md transition-all duration-300 border border-white/20"
                    aria-label="Next testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Premium Image Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mr-4 border border-white/30 shadow-lg">
                      <span className="text-2xl font-bold text-white">E</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-semibold text-white">Ekraj Upreti</h4>
                      <p className="text-sm text-white/80">Former Municipality Chief, Manahari</p>
                    </div>
                  </div>
                </div>
                
                {/* Image Indicator Dots - Repositioned */}
                <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-3">
                  {testimonialImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125 w-6' 
                          : 'bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Text Section - Bottom */}
              <div className="bg-white p-8 md:p-10 relative">
                {/* Premium Accent Element */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border-4" style={{ borderColor: colors.secondary }}>
                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colors.secondary }}>
                      <div className="w-full h-full flex items-center justify-center text-white text-xl font-serif">❝</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center max-w-3xl mx-auto pt-6">
                  <blockquote>
                    <p className="text-lg md:text-xl leading-relaxed mb-6 italic" style={{ color: colors.text.medium }}>
                      "Visiting Himalaya Krishi Farm was a revelation. The passion and innovation of young farmers are transforming agriculture, and blending modern techniques with traditional wisdom could amplify their impact even further."
                    </p>
                  </blockquote>
                  
                  <p className="text-sm font-medium mb-4" style={{ color: colors.secondary }}>
                    Counsellor, Sanakisan Bank
                  </p>
                  
                  {/* Premium Signature Element */}
                  <div className="w-32 h-1 mx-auto mt-2 opacity-50" style={{ backgroundColor: colors.secondary }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>        
    </div>
  );
};

export default Home;