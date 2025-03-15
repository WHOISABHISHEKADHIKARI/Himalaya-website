import React, { useState, useEffect } from 'react';
import LoadingBar from '../components/LoadingBar';
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import logo from '../assets/logo/logo_white_bg_removed.png';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
// Add these imports at the top with other image imports
import imag1 from '../assets/image/imag1.jpeg';
import imag5 from '../assets/image/imag5.jpeg';
import imag6 from '../assets/image/imag6.jpeg';
import imag7 from '../assets/image/imag7.jpeg';
import imag9 from '../assets/image/imag9.jpeg';
import founder from '../assets/image/founder.jpg';
import owner from '../assets/image/owner.jpg';     // Changed extension to .jpg to match actual file
import manager from '../assets/image/manager.jpeg'; // This one is correct as .jpeg
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

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the time as needed

    // Back to top visibility handler and scroll progress
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{ backgroundColor: colors.background.primary }}>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#1C4E37] to-[#D8A51D] z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      {loading && <LoadingBar />} {/* Show loading bar while loading */}
      {/* SEO Optimization */}
      <Helmet>
        <title>About Our Organic Farm | From Sirbani to Manahari</title>
        <meta name="description" content="Discover our journey from a small dairy farm to a thriving organic enterprise. Learn about our heritage, philosophy, and commitment to organic excellence since 1992." />
        <meta name="keywords" content="organic farm, organic dairy, sustainable farming, Murrah buffaloes, organic production" />
        <link rel="canonical" href="https://yourwebsite.com/about" />
      </Helmet>
      
      {/* Hero Section */}
      // Update the Hero section image
      <section 
        className="relative bg-cover bg-center h-screen flex items-center pt-28"
        style={{ 
          backgroundImage: `url(${imag1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: colors.primary, opacity: 0.7 }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" style={{ color: colors.text.light }}>
            The Place of Organic Excellence
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto" style={{ color: colors.text.light }}>
            From Sirbani to Manahari: A Journey of Organic Production and Community Growth
          </p>
          <a 
            href="#heritage" 
            className="inline-block px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{ 
              backgroundColor: colors.secondary, 
              color: colors.text.dark,
              boxShadow: '0 4px 12px rgba(216, 165, 29, 0.2)'
            }}
            aria-label="Learn more about our heritage"
          >
            Discover Our Story
          </a>
        </div>
      </section>

      {/* Our Heritage Section */}
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
                <div className="absolute -top-5 -right-5 w-full h-full border-2" style={{ borderColor: colors.secondary }}></div>
                <img 
                  src={imag9}
                  alt="Our organic farm heritage showing Murrah buffaloes" 
                  className="w-full h-full object-cover relative z-10 shadow-xl rounded-lg"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      

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
                  Our products stand as a testament to quality, authenticity, and the power of nature. Every step, from our cows to our crops, follows sustainable practices. We believe in working with nature, not against it.
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 - Murrah-Based Dairy */}
              <div className="group perspective-1000">
                <div className="relative transform-style-3d transition-transform duration-700 group-hover:rotate-y-180 h-[400px]">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur p-8 rounded-2xl border border-white/20">
                    <div className="h-full flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[#D8A51D] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#1C4E37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-center text-[#D8A51D]">
                        Murrah-Based Dairy
                      </h3>
                      <p className="text-white/80 text-center">Click to learn more</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#D8A51D] p-8 rounded-2xl">
                    <div className="h-full flex flex-col items-center justify-center">
                      <p className="text-[#1C4E37] text-center font-medium leading-relaxed">
                        Known for their superior quality and rich taste, our dairy products come from our carefully raised Murrah cows and represent the finest in organic dairy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Organic Farming */}
              <div className="group perspective-1000">
                <div className="relative transform-style-3d transition-transform duration-700 group-hover:rotate-y-180 h-[400px]">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur p-8 rounded-2xl border border-white/20">
                    <div className="h-full flex flex-col items-center justify-center">
                       <div className="w-20 h-20 rounded-full bg-[#D8A51D] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#1C4E37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-center text-[#D8A51D]">
                        Organic Farming
                      </h3>
                      <p className="text-white/80 text-center">Click to learn more</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#D8A51D] p-8 rounded-2xl">
                    <div className="h-full flex flex-col items-center justify-center">
                      <p className="text-[#1C4E37] text-center font-medium leading-relaxed">
                        Every step, from our cows to our crops, follows sustainable practices. We believe in working with nature, not against it to produce the finest organic products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Legacy of Growth */}
              <div className="group perspective-1000">
                <div className="relative transform-style-3d transition-transform duration-700 group-hover:rotate-y-180 h-[400px]">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur p-8 rounded-2xl border border-white/20">
                    <div className="h-full flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[#D8A51D] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#1C4E37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-center text-[#D8A51D]">
                        A Legacy of Growth
                      </h3>
                      <p className="text-white/80 text-center">Click to learn more</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#D8A51D] p-8 rounded-2xl">
                    <div className="h-full flex flex-col items-center justify-center">
                      <p className="text-[#1C4E37] text-center font-medium leading-relaxed">
                        From a small herd to a thriving business, we have always believed in growth—both in business and in the community that supports us through the years.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section aria-labelledby="testimonials" className="py-24" style={{ backgroundColor: colors.background.card }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: colors.text.dark }}>Reviews About Our Buissness</h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
            <p className="text-lg" style={{ color: colors.text.medium }}>
              What our community says about our Buissness presence
            </p>
          </div>

          {/* Testimonial 1 - Shree Krishna Parajuli */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: colors.background.card }}>
              <div className="md:flex">
                <div className="md:w-2/5 h-[400px]">
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
                    "It brings me immense joy to witness their growth from humble beginnings. As someone who has been a helping hand in their journey, I am proud to see their dedication and the meaningful impact they've created through thier Buissness."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 - Bharat Gautam */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: colors.background.card }}>
              <div className="md:flex flex-row-reverse">
                <div className="md:w-2/5 h-[400px]">
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
                  <p className="text-lg mb-4" style={{ color: colors.primary }}> Livestock & Poultry Farm Consultant</p>
                  <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.secondary }}></div>
                  <p className="italic mb-6 leading-relaxed" style={{ color: colors.text.medium }}>
                    "It's inspiring to see young leadership driving innovation in agriculture. Their energy and vision for growth is remarkable, and I'm excited to see how they've embraced digital transformation to showcase their journey."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 - Dipendra Adhikari */}
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: colors.background.card }}>
              <div className="md:flex">
                <div className="md:w-2/5 h-[400px]">
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
                  <p className="text-lg mb-4" style={{ color: colors.primary }}>Manahari 5, Ward Secretary</p>
                  <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.secondary }}></div>
                  <p className="italic mb-6 leading-relaxed" style={{ color: colors.text.medium }}>
                    "The farm beautifully captures the essence of their organic farming and Manahari. As a member of Manahari-5 ward Secretary, I am impressed by how they've showcased their commitment to serving society through this Agriculture presence through this platform."
                  </p>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </section>

      {/* Sneak Peek Section */}
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
            <video controls className="w-full rounded-lg shadow-lg">
              <source src="/assets/video/farmvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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