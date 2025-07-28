import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const Terms = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C4E37]/5 via-white to-[#F4F9F1]/50">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-[#1C4E37]/10 via-[#D8A51D]/5 to-[#1C4E37]/10 transform -skew-y-6"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#D8A51D]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-[#1C4E37]/5 rounded-full blur-4xl animate-pulse"></div>

      {/* Content */}
      <div className="relative">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="container mx-auto px-4 py-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#D8A51D] transition-colors duration-300">
                <span lang="ne">मुख्य पृष्ठ</span>
                <span className="mx-1">/</span>
                <span>Home</span>
              </Link>
            </li>
            <li aria-current="page" className="text-[#D8A51D]">
              <span lang="ne">नियम र सर्तहरू</span>
              <span> / </span>
              <span>Terms & Conditions</span>
            </li>
          </ol>
        </nav>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#1C4E37] relative">
                <span className="relative">
                  Terms & Conditions
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D8A51D] to-transparent"></div>
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_rgba(28,78,55,0.15)]">
                <div className="text-center">
                  <div className="mb-8">
                    <svg className="w-24 h-24 mx-auto text-[#1C4E37]/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1C4E37] mb-4">We're Working On Our Terms & Conditions</h2>
                  <p className="text-[#1C4E37]/80 mb-8">
                    We are currently drafting our Terms & Conditions to ensure transparency and clarity in our services. Please check back soon or contact us if you have any specific questions.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-3 bg-[#1C4E37] text-white rounded-full hover:bg-[#2A704F] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Contact Us
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;