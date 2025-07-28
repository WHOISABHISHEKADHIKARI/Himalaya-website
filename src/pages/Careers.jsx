import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Careers = () => {
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
              <span lang="ne">क्यारियर</span>
              <span> / </span>
              <span>Careers</span>
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
                  Careers
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
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1C4E37] mb-4">We&apos;re Working On It!</h2>
                  <p className="text-[#1C4E37]/80 mb-8">
                    Thank you for your interest in joining our team. While we don&apos;t have any vacancies available right now, we&apos;re always looking for talented individuals who share our passion for sustainable agriculture.
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

export default Careers;