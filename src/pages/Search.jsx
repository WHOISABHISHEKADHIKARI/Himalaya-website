import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { FaSearch, FaLeaf, FaUsers, FaEye, FaPhone } from 'react-icons/fa';
import SEOHelmet from '../components/SEOHelmet';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);

  // Define the main pages that should appear in search results
  const mainPages = [
    {
      title: 'About Us - Himalaya Krishi',
      description: 'Learn about Nepal\'s premier organic farm and sustainable agriculture center. Discover our mission, values, and commitment to empowering farmers since 1992.',
      url: '/about',
      icon: FaUsers,
      keywords: ['about', 'mission', 'organic farming', 'sustainable agriculture', 'nepal']
    },
    {
      title: 'Our Vision - Himalaya Krishi',
      description: 'Explore our vision for transforming Nepal\'s agricultural landscape through organic farming, innovation, and farmer empowerment.',
      url: '/vision',
      icon: FaEye,
      keywords: ['vision', 'future', 'transformation', 'innovation', 'agriculture']
    },
    {
      title: 'Contact Us - Himalaya Krishi',
      description: 'Get in touch with Himalaya Krishi. Find our location, contact information, and connect with our team for organic farming solutions.',
      url: '/contact',
      icon: FaPhone,
      keywords: ['contact', 'location', 'phone', 'address', 'connect']
    }
  ];

  // Filter pages based on search term
  const filteredPages = mainPages.filter(page => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      page.title.toLowerCase().includes(searchLower) ||
      page.description.toLowerCase().includes(searchLower) ||
      page.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
    );
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SEOHelmet />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaLeaf className="mx-auto text-6xl mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Search Himalaya Krishi
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Find information about our organic farming, sustainable agriculture, and services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for pages, services, or information..."
                className="w-full px-6 py-4 pr-16 text-lg border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors"
              >
                <FaSearch />
              </button>
            </form>
          </motion.div>

          {/* Search Results */}
          <div className="max-w-4xl mx-auto">
            {query && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Search Results for "{query}"
                </h2>
                <p className="text-gray-600">
                  Found {filteredPages.length} relevant page{filteredPages.length !== 1 ? 's' : ''}
                </p>
              </motion.div>
            )}

            <div className="grid gap-6">
              {filteredPages.map((page, index) => {
                const Icon = page.icon;
                return (
                  <motion.div
                    key={page.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      to={page.url}
                      className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-green-500 hover:border-green-600"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <Icon className="text-green-600 text-xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-green-600 transition-colors">
                            {page.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {page.description}
                          </p>
                          <div className="mt-3">
                            <span className="text-green-600 font-medium hover:underline">
                              Learn more →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {filteredPages.length === 0 && query && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <FaSearch className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try searching for "about", "vision", or "contact" to find our main pages.
                </p>
                <Link
                  to="/"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
                >
                  Return to Home
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Search;