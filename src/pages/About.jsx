import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo/logo_white_bg_removed.png';
import { Helmet } from 'react-helmet-async';

// Premium color scheme
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
  return (
    <div style={{ backgroundColor: colors.background.primary }}>
      {/* SEO Optimization */}
      <Helmet>
        <title>About Our Organic Farm | From Sirbani to Manahari</title>
        <meta name="description" content="Discover our journey from a small dairy farm to a thriving organic enterprise. Learn about our heritage, philosophy, and commitment to organic excellence since 1992." />
        <meta name="keywords" content="organic farm, organic dairy, sustainable farming, Murrah buffaloes, organic production" />
        <link rel="canonical" href="https://yourwebsite.com/about" />
      </Helmet>
      
      {/* Hero Section - Updated with premium colors */}
      <section 
        className="relative bg-cover bg-center h-screen flex items-center"
        style={{ backgroundImage: "url('/src/assets/image/imag1.jpeg')" }}
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
            className="inline-block px-8 py-4 font-bold uppercase tracking-wider text-sm transition duration-300"
            style={{ backgroundColor: colors.secondary, color: colors.text.dark }}
            aria-label="Learn more about our heritage"
          >
            Discover Our Story
          </a>
        </div>
      </section>

      {/* Our Heritage Section - Updated with premium colors */}
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
              <div className="relative">
                <div className="absolute -top-5 -right-5 w-full h-full border-2" style={{ borderColor: colors.secondary }}></div>
                <img 
                  src="/src/assets/image/imag9.jpeg" 
                  alt="Our organic farm heritage showing Murrah buffaloes" 
                  className="w-full h-auto relative z-10 shadow-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section - Updated with premium colors */}
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
                        src="/src/assets/image/imag9.jpeg" 
                        alt="Organic farming practices in action" 
                        className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img 
                        src="/src/assets/image/imag6.jpeg" 
                        alt="Sustainable agricultural methods" 
                        className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="mt-12">
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img 
                        src="/src/assets/image/imag3.jpeg" 
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

      {/* What We Are Doing Section - Updated with premium colors */}
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
              {/* Card 1 */}
              <div className="p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: colors.background.card }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: `${colors.primary}20` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8" style={{ color: colors.primary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: colors.text.dark }}>Production</h3>
                <p className="text-justify" style={{ color: colors.text.medium }}>
                  Sustainable farming methods that prioritize both yield and environmental responsibility in our agricultural practices.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: colors.background.card }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: `${colors.primary}20` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8" style={{ color: colors.primary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: colors.text.dark }}>Authenticity</h3>
                <p className="text-justify" style={{ color: colors.text.medium }}>
                  Every product carries our guarantee of genuine organic certification and traceable origins.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: colors.background.card }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: `${colors.primary}20` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8" style={{ color: colors.primary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: colors.text.dark }}>Organic</h3>
                <p className="text-justify" style={{ color: colors.text.medium }}>
                  100% organic practices from seed to harvest, ensuring pure and natural products for healthier living.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced with premium colors */}
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
                      src="/src/assets/image/founder.jpg" 
                      alt="Thapa Prasad Adhikari - Co-Founder of our organic farm" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="p-8 md:w-3/5">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text.dark }}>Thapa Prasad Adhikari</h3>
                  <p className="text-lg mb-4" style={{ color: colors.primary }}>Co-Founder</p>
                  <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.secondary }}></div>
                  <p className="italic mb-6 leading-relaxed" style={{ color: colors.text.medium }}>
                    "I have no other option. As long as my interest and available resources allow, I find joy in working with soil and cow dung. Even now, at the age of 70, my mother herself is tending to the cattle. That is why one must keep working wherever life takes them."
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
                      src="/src/assets/image/owner.jpg" 
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
                      src="/src/assets/image/manager.jpeg" 
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

      {/* What Sets Us Apart Section - Updated with premium colors */}
      <section className="py-24" style={{ backgroundColor: colors.primary }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: colors.text.light }}>What Sets Us Apart</h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-10 border-b-4" style={{ backgroundColor: `${colors.primary}90`, borderColor: colors.secondary }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: colors.secondary }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8" style={{ color: colors.primary }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.text.light }}>Murrah-Based Dairy Products</h3>
              <p style={{ color: `${colors.text.light}90` }}>
                Known for their superior quality and rich taste, our dairy products come from our carefully raised Murrah cows and represent the finest in organic dairy.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-10 border-b-4" style={{ backgroundColor: `${colors.primary}90`, borderColor: colors.secondary }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: colors.secondary }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8" style={{ color: colors.primary }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.text.light }}>Organic Farming</h3>
              <p style={{ color: `${colors.text.light}90` }}>
                Every step, from our cows to our crops, follows sustainable practices. We believe in working with nature, not against it to produce the finest organic products.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-10 border-b-4" style={{ backgroundColor: `${colors.primary}90`, borderColor: colors.secondary }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: colors.secondary }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8" style={{ color: colors.primary }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.text.light }}>A Legacy of Growth</h3>
              <p style={{ color: `${colors.text.light}90` }}>
                From a small herd to a thriving business, we have always believed in growth—both in business and in the community that supports us through the years.
              </p>
            </div>
          </div>
        </div>
      </section>

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
                "jobTitle": "Co-Founder"
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