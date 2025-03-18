import React, { useState } from 'react';
import { BsEnvelope, BsPerson } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Add this import
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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
      setStatus('Error sending message. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7] min-h-screen">
      <Helmet>
        <title>Contact Himalaya Krishi | Get in Touch for Organic Farming Solutions</title>
        <meta name="description" content="Connect with Himalaya Krishi for organic farming expertise, dairy solutions, and sustainable agriculture guidance. Located in Manahari, Makwanpur, Nepal." />
        <meta name="keywords" content="contact himalaya krishi, organic farming nepal, sustainable agriculture contact, manahari farm contact" />
        
        {/* Technical SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://himalayakrishi.com/contact" />
        <meta name="author" content="Himalaya Krishi" />
        <meta name="geo.region" content="NP-BAG" />
        <meta name="geo.placename" content="Manahari" />
        <meta name="geo.position" content="27.5545;84.8897" />
        <meta name="ICBM" content="27.5545, 84.8897" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Himalaya Krishi" />
        <meta property="og:locale" content="en_NP" />
        <meta property="og:url" content="https://himalayakrishi.com/contact" />
        <meta property="og:title" content="Contact Himalaya Krishi | Organic Farming Excellence" />
        <meta property="og:description" content="Reach out to Nepal's leading organic farm. Get expert guidance on sustainable farming, dairy solutions, and organic agriculture." />
        <meta property="og:image" content="https://himalayakrishi.com/og-contact.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
    
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@himalayakrishi" />
        <meta name="twitter:title" content="Contact Himalaya Krishi | Get Expert Farming Guidance" />
        <meta name="twitter:description" content="Connect with Nepal's premier organic farm for sustainable agriculture solutions and expert guidance." />
        <meta name="twitter:image" content="https://himalayakrishi.com/twitter-contact.jpg" />
    
        {/* Schema.org LD+JSON */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Himalaya Krishi",
            "description": "Get in touch with Himalaya Krishi for organic farming solutions and sustainable agriculture guidance.",
            "url": "https://himalayakrishi.com/contact",
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
                "urlTemplate": "https://himalayakrishi.com/contact",
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
          <p className="text-lg text-center mb-12" style={{ color: colors.text.medium }}>We'd love to hear from you. Please fill out the form below.</p>
          
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
      </div>
    </div>
  );
};

export default Contact;