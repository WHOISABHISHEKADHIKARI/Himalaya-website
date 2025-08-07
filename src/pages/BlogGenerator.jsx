import React, { useState } from 'react';
import BLOG_CONFIG from '../config/api';
import { generateBlogPosts } from '../utils/blogPostGenerator';

const BlogGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
  const [postCount, setPostCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [tagCount, setTagCount] = useState(0);

  const updateCounts = () => {
    const posts = BLOG_CONFIG.getPosts();
    const categories = BLOG_CONFIG.getCategories();
    const tags = BLOG_CONFIG.getTags();
    
    setPostCount(posts.length);
    setCategoryCount(categories.length);
    setTagCount(tags.length);
  };

  React.useEffect(() => {
    updateCounts();
  }, []);

  const handleGeneratePosts = async () => {
    setIsGenerating(true);
    setGenerationStatus('Starting blog post generation...');
    
    try {
      await generateBlogPosts((status) => {
        setGenerationStatus(status);
      });
      
      setGenerationStatus('Blog posts generated successfully!');
      updateCounts();
    } catch (error) {
      setGenerationStatus(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearPosts = () => {
    if (window.confirm('Are you sure you want to clear all blog posts? This action cannot be undone.')) {
      BLOG_CONFIG.clearAllData();
      setGenerationStatus('All blog data cleared.');
      updateCounts();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog Post Generator
            </h1>
            <p className="text-lg text-gray-600">
              Generate comprehensive agricultural blog posts for Himalaya Krishi
            </p>
          </div>

          {/* Current Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Blog Posts</h3>
              <p className="text-3xl font-bold">{postCount}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <p className="text-3xl font-bold">{categoryCount}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <p className="text-3xl font-bold">{tagCount}</p>
            </div>
          </div>

          {/* Generation Controls */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGeneratePosts}
                disabled={isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isGenerating ? 'Generating...' : 'Generate 50+ Blog Posts'}
              </button>
              
              <button
                onClick={handleClearPosts}
                disabled={isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Clear All Posts
              </button>
            </div>

            {/* Status Display */}
            {generationStatus && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
                <p className="text-gray-700">{generationStatus}</p>
                {isGenerating && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features List */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Content Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    50+ Unique Blog Posts
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    SEO Optimized Content
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Multiple Categories
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Rich Tag System
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Author: Himalaya Krishi
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    300+ Words Per Post
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Featured Images
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Social Media Ready
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="text-center space-y-4">
              <p className="text-gray-600">After generation, explore your content:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/blog"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View Blog
                </a>
                <a
                  href="/blog/cms"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Manage CMS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogGenerator;
 