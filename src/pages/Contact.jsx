import React, { useState } from 'react';
import { BsEnvelope, BsPerson } from 'react-icons/bs';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa'; // Added FaPhone
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Premium color palette
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

const Contact = () => {
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
  // Update form data to include subject and language preference
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    language: 'en' // Default to English
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('https://formspree.io/f/mdkeolan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Unable to send message. Please check your connection and try again.',
        details: error.message
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7] min-h-screen">
      <Helmet>
        <title>सम्पर्क गर्नुहोस् | Contact Himalaya Krishi - कृषि सल्लाह र सहयोगको लागि</title>
        <meta name="description" content="कृषि सहयोग, जैविक खेती, र कृषि नीति सम्बन्धी जानकारीको लागि सम्पर्क गर्नुहोस्। विशेषज्ञ सल्लाह र मार्गदर्शन उपलब्ध छ। | Contact us for agriculture support, organic farming guidance, and policy information in Nepal." />
        <meta name="keywords" content="कृषि सम्पर्क नेपाल, agriculture contact nepal, कृषि विज्ञ सम्पर्क, farming expert contact, कृषि सहयोग, support assistance contact, जैविक खेती सल्लाह, organic farming consultation" />
        
        <link rel="alternate" hrefLang="ne" href="https://krishihimalaya.com/ne/contact" />
        <link rel="alternate" hrefLang="en" href="https://krishihimalaya.com/contact" />
        <meta property="og:locale" content="ne_NP" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Update schema for better local business visibility */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["ContactPage", "LocalBusiness"],
            "name": "हिमालय कृषि | Himalaya Krishi",
            "description": "Expert consultation for agriculture , organic farming, and sustainable practices in Nepal",
            "url": "https://krishihimalaya.com/contact",
            "areaServed": {
              "@type": "Country",
              "name": "Nepal"
            },
            "serviceType": [
              "Agriculture Consultation",
              "Organic Farming Guidance",
              "Grant Application Assistance",
              "Policy Information"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+977-9823405140",
              "contactType": "customer service",
              "areaServed": "NP",
              "availableLanguage": ["en", "ne"]
            },
            "location": {
              "@type": "Place",
              "name": "Himalaya Krishi Farm",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Manahari-5",
                "addressLocality": "Manahari",
                "addressRegion": "Makwanpur",
                "addressCountry": "Nepal"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "27.5545",
                "longitude": "84.8897"
              }
            },
            "potentialAction": {
              "@type": "ContactAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://krishihimalaya.com/contact",
                "inLanguage": "en"
              }
            }
          })}
        </script>
      </Helmet>
      <div className="container mx-auto px-4 py-32 md:py-40">
        <motion.div 
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-12 backdrop-blur-sm bg-opacity-90 border border-[rgba(255,255,255,0.2)]"
          initial="hidden"
          animate="visible"
          variants={fadeIn}>
          <div className="w-16 h-1 bg-[#D8A51D] mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4" style={{ color: colors.primary }}>Contact Us</h1>
          <p className="text-lg text-center mb-12" style={{ color: colors.text.medium }}>We&apos;d love to hear from you. Please fill out the form below.</p>
          
          {/* Add location information */}
          <div className="flex items-center mb-6 justify-center">
            <div className="bg-[#1C4E37]/10 p-3 rounded-full mr-4">
              <FaMapMarkerAlt className="text-[#1C4E37] text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg" style={{ color: colors.text.dark }}>Our Location</h3>
              <p style={{ color: colors.text.medium }}>Manahari-5, Makwanpur</p>
            </div>
          </div>
          
          <motion.div 
            className="max-w-2xl mx-auto"
            variants={staggerChildren}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <div className="flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <BsPerson className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <div className="flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <BsEnvelope className="h-5 w-5" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <div className="flex items-start">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Message"
                    rows="5"
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="text-center pt-4">
                <motion.button
                  type="submit"
                  className="group w-full md:w-auto bg-gradient-to-r from-[#1C4E37] to-[#173E2C] text-white font-medium py-4 px-10 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D8A51D] focus:ring-offset-2 transition-all duration-300 flex items-center justify-center mx-auto space-x-3"
                  disabled={status === 'Sending...'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BsEnvelope className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>{status === 'Sending...' ? 'Sending...' : 'Send Message'}</span>
                </motion.button>
                {status && (
                  <div className={`mt-4 py-3 px-4 rounded-md ${
                    status.includes('success') ? 'bg-green-50 text-green-800' : 
                    status === 'Sending...' ? 'bg-blue-50 text-blue-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {status}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
        
        {/* Premium Google Maps Section */}
        <motion.div
          className="mt-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="w-16 h-1 bg-[#D8A51D] mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-6" style={{ color: colors.primary }}>Visit Our Farm</h2>
          <p className="text-lg text-center mb-10" style={{ color: colors.text.medium }}>Experience sustainable farming practices firsthand at our location</p>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-[500px] w-full relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.6568722147323!2d84.84372097497744!3d27.479941382889246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994c90007a70f09%3A0x370a576d09ff0ad0!2sHimalaya%20Krishi%20Tatha%20Pasupalan%20Farm!5e1!3m2!1sen!2sus!4v1741707048886!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Himalaya Krishi Farm Location"
                className="filter contrast-125 brightness-105"
              ></iframe>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="bg-[#1C4E37]/10 p-3 rounded-full flex-shrink-0">
                  <FaMapMarkerAlt className="text-[#1C4E37] text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: colors.text.dark }}>Our Location</h3>
                  <p style={{ color: colors.text.medium }}>Himalaya Krishi Tatha Pasupalan Farm</p>
                  <p style={{ color: colors.text.medium }}>Manahari-5, Makwanpur</p>
                  <p style={{ color: colors.text.medium }}>Bagmati Province, Nepal</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-[#1C4E37]/10 p-3 rounded-full flex-shrink-0">
                  <FaPhone className="text-[#1C4E37] text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: colors.text.dark }}>Contact Details</h3>
                  <p style={{ color: colors.text.medium }}>Phone: +977 9823405140</p>
                  <p style={{ color: colors.text.medium }}>Email: info@krishihimalaya.com</p>
                  <p style={{ color: colors.text.medium }}>Hours: 9:00 AM - 5:00 PM (Sun-Fri)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;