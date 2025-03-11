import React, { useState } from 'react';
import { BsEnvelope, BsPerson } from 'react-icons/bs';
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
        <title>Contact Us | Himalaya Krishi</title>
        <meta name="description" content="Get in touch with Himalaya Krishi. We'd love to hear from you and discuss how we can help with your organic farming and dairy needs." />
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