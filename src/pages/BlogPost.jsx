import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaUser, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaClock, FaArrowDown, FaArrowLeft } from 'react-icons/fa';
import ImageHandler from '../components/ImageHandler';
import ShareButtons from '../components/ShareButtons';
import ScrollToTopButton from '../components/ScrollToTopButton';
import logoImage from '../assets/logo/whitelogo-blackbg-removebg-previewaa.webp';

// Premium color palette (matching Vision page)
const colors = {
  primary: '#1C4E37', // Deep forest green
  secondary: '#D8A51D', // Rich gold
  light: '#F4F9F1', // Soft sage white
  accent: '#8C3E2F', // Terracotta
  text: {
    dark: '#1A2E1D', // Almost black green
    medium: '#3A5944', // Medium forest
    light: '#F9FCF7', // Creamy white
    gold: '#D8A51D', // Rich gold
  },
  background: {
    primary: '#F4F9F1', // Soft sage white
    card: '#FFFFFF', // Pure white
    accent: 'rgba(216, 165, 29, 0.07)', // Gold with opacity
  }
};

// Animation variants (matching Vision page)
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const heroAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const heroTextAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Split useEffect for data fetching
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `https://blogdata.dapirates.xyz/wp-json/wp/v2/posts?slug=${slug}&_embed=true`
                );
                const data = await response.json();
                setPost(data[0]);
                setLoading(false);

                // Fetch related posts
                const relatedResponse = await fetch(
                    'https://blogdata.dapirates.xyz/wp-json/wp/v2/posts?_embed=true&per_page=3'
                );
                const relatedData = await relatedResponse.json();
                setRelatedPosts(relatedData.filter(p => p.id !== data[0].id));
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };

        fetchPost();
        window.scrollTo(0, 0);
    }, [slug]); // Only depend on slug

    // Separate useEffect for scroll handling and SEO
    useEffect(() => {
        if (!post) return;

        // Enhanced SEO optimization
        document.title = `${post.title.rendered} | Himalaya Krishi`;
        
        // Add canonical URL
        const canonicalLink = document.querySelector('link[rel="canonical"]') || document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = window.location.href;
        if (!document.querySelector('link[rel="canonical"]')) {
            document.head.appendChild(canonicalLink);
        }
        
        // Scroll progress handler with bounds checking
        const handleScroll = () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = Math.min(100, Math.max(0, (window.pageYOffset / totalHeight) * 100));
                setScrollProgress(progress);
            }
        };
        
        // Use passive listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Set loaded state after a short delay for initial animations
        setTimeout(() => setIsLoaded(true), 300);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Clean up canonical link on unmount
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) canonical.remove();
        };
    }, [post]); // Depend on post

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7]">
                <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#1C4E37] border-t-transparent mb-4"></div>
                    <p className="text-[#3A5944] font-medium">Loading article...</p>
                </motion.div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7] text-[#1C4E37]">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-serif font-bold mb-4">Article Not Found</h1>
                    <p className="text-[#3A5944] mb-8">The article you're looking for doesn't exist.</p>
                    <Link to="/blog">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-[#1C4E37] text-white font-bold rounded-full hover:bg-[#164A32] transition-all duration-300"
                        >
                            Back to Blog
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    // Check if featuredImage exists and is a valid URL
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    console.log('Featured Image:', featuredImage); // Debug log

    return (
        <div className="relative bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7] min-h-screen font-sans">
            <ScrollToTopButton />
            <Helmet>
                <title>{post.title.rendered} | Himalaya Krishi</title>
                <meta name="description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
                <link rel="icon" type="image/png" sizes="192x192" href="/logo_192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/logo_512.png" />
            </Helmet>

            {/* Scroll Progress Indicator */}
            <div 
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#1C4E37] to-[#D8A51D] z-50"
                style={{ width: `${scrollProgress}%` }}
            />
            
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[#1C4E37] opacity-5 rounded-b-[100px]" />
            </div>

            {/* Hero Section */}
            <header className="pt-32 pb-20 px-4 relative">
                <motion.div 
                    className="container mx-auto max-w-5xl relative z-10"
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={heroAnimation}
                >
                    {/* Back Button */}
                    <motion.div 
                        className="mb-8"
                        variants={heroTextAnimation}
                    >
                        <Link to="/blog">
                            <motion.button
                                whileHover={{ x: -5 }}
                                className="flex items-center text-[#1C4E37] hover:text-[#D8A51D] transition-colors duration-300"
                            >
                                <FaArrowLeft className="mr-2" />
                                <span>Back to Blog</span>
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Decorative gold line */}
                    <motion.div 
                        className="w-16 h-1 bg-[#D8A51D] mb-8"
                        variants={heroTextAnimation}
                    />
                    
                    <motion.h1 
                        className="text-5xl md:text-6xl font-serif font-bold text-[#1C4E37] mb-6 tracking-tight leading-tight"
                        variants={heroTextAnimation}
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    
                    <motion.div 
                        className="flex flex-wrap items-center gap-6 mb-8"
                        variants={heroTextAnimation}
                    >
                        <span className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-[#3A5944] border border-white/30">
                            <FaCalendar className="mr-2 text-[#D8A51D]" />
                            {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-[#3A5944] border border-white/30">
                            <FaUser className="mr-2 text-[#D8A51D]" />
                            Admin
                        </span>
                        <span className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-[#3A5944] border border-white/30">
                            <FaClock className="mr-2 text-[#D8A51D]" />
                            5 min read
                        </span>
                        {/* Small Share Button */}
                        <motion.button
                            className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-[#3A5944] border border-white/30 hover:bg-white/30 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: post.title.rendered,
                                        url: window.location.href
                                    });
                                } else {
                                    // Fallback: scroll to share section
                                    document.querySelector('[data-share-section]')?.scrollIntoView({ 
                                        behavior: 'smooth' 
                                    });
                                }
                            }}
                        >
                            <FaShare className="mr-2 text-[#D8A51D]" />
                            Share
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="flex justify-center"
                        variants={heroTextAnimation}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.button
                            whileHover={{ y: -5 }}
                            whileTap={{ y: 0 }}
                            className="flex items-center text-[#1C4E37]"
                            onClick={() => window.scrollTo({
                                top: window.innerHeight * 0.8,
                                behavior: 'smooth'
                            })}
                        >
                            <span className="mr-2">Read Article</span>
                            <FaArrowDown className="animate-bounce" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </header>

            <main className="container mx-auto px-4 max-w-5xl pb-32">
                {/* Enhanced Featured Image Section */}
                <motion.section 
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        {featuredImage ? (
                            <>
                                {/* Enhanced featured image with premium effects */}
                                <div className="relative overflow-hidden">
                                    <ImageHandler
                                        src={featuredImage}
                                        alt={post.title.rendered}
                                        className="w-full h-[600px] object-cover"
                                        quality="high"
                                        showControls={true}
                                    />
                                    
                                    {/* Premium overlay effects */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/10 via-transparent to-[#D8A51D]/10" />
                                    
                                    {/* Floating image metadata */}
                                    <motion.div 
                                        className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                    >
                                        <h3 className="font-semibold text-[#1C4E37] mb-1">Featured Image</h3>
                                        <p className="text-sm text-[#3A5944]">{post.title.rendered}</p>
                                    </motion.div>
                                </div>
                            </>
                        ) : (
                            // Enhanced fallback with better visual appeal
                            <div className="w-full h-[600px] bg-gradient-to-br from-[#F4F9F1] via-white to-[#EAEFE7] flex items-center justify-center rounded-3xl shadow-inner border border-[#D8A51D]/20 relative overflow-hidden">
                                {/* Animated background pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%231C4E37%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
                                </div>
                                
                                <div className="text-center relative w-full h-full">
                                    {logoImage ? (
                                        <>
                                            <div 
                                                className="absolute inset-0 bg-center bg-no-repeat bg-contain" 
                                                style={{
                                                    backgroundImage: `url(${logoImage})`,
                                                    opacity: 0.08,
                                                    pointerEvents: 'none'
                                                }}
                                            />
                                            <div className="flex flex-col items-center justify-center p-8 h-full relative z-10">
                                                <motion.img 
                                                    src={logoImage} 
                                                    alt="Himalaya Krishi Logo" 
                                                    className="h-56 w-auto mx-auto mb-8 shadow-2xl rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl"
                                                    style={{ pointerEvents: 'none' }}
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                                    onError={(e) => {
                                                        console.error('Error loading logo image');
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                                <motion.div
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.3, duration: 0.6 }}
                                                >
                                                    <h3 className="text-3xl font-serif font-bold text-[#1C4E37] mb-3">Premium Content</h3>
                                                    <p className="text-[#3A5944] max-w-md mx-auto text-lg leading-relaxed">Experience our carefully crafted content with enhanced visual storytelling.</p>
                                                </motion.div>
                                            </div>
                                        </>
                                    ) : (
                                        <motion.div 
                                            className="flex flex-col items-center justify-center h-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="w-24 h-24 bg-[#1C4E37]/10 rounded-full flex items-center justify-center mb-6">
                                                <svg className="w-12 h-12 text-[#1C4E37]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h3 className="text-3xl font-serif font-bold text-[#1C4E37] mb-3">Visual Content Loading</h3>
                                            <p className="text-[#3A5944] max-w-md mx-auto text-lg">We're preparing beautiful imagery to enhance your reading experience.</p>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* Share Section - Moved to bottom of content */}
                

                {/* Merged Article Content & Share Card - Premium Design */}
                <motion.article
                    className="mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                    data-share-section
                >
                    <div className="relative bg-gradient-to-br from-white via-white to-[#F4F9F1]/30 rounded-3xl shadow-2xl overflow-hidden border border-[#D8A51D]/10">
                        {/* Premium decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D8A51D]/5 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#1C4E37]/5 to-transparent rounded-full blur-2xl" />
                        
                        {/* Content wrapper */}
                        <div className="relative z-10 p-12 lg:p-16">
                            {/* Article metadata header */}
                            <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-[#D8A51D]/20">
                                <div className="flex flex-wrap items-center gap-4 mb-4 lg:mb-0">
                                    <span className="inline-flex items-center px-4 py-2 bg-[#1C4E37]/10 rounded-full text-[#1C4E37] font-medium text-sm">
                                        <FaCalendar className="mr-2 text-[#D8A51D]" />
                                        {new Date(post.date).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </span>
                                    <span className="inline-flex items-center px-4 py-2 bg-[#D8A51D]/10 rounded-full text-[#1C4E37] font-medium text-sm">
                                        <FaUser className="mr-2 text-[#D8A51D]" />
                                        Admin
                                    </span>
                                    <span className="inline-flex items-center px-4 py-2 bg-[#1C4E37]/10 rounded-full text-[#1C4E37] font-medium text-sm">
                                        <FaClock className="mr-2 text-[#D8A51D]" />
                                        5 min read
                                    </span>
                                </div>
                                
                                {/* Inline share buttons */}
                                <div className="flex items-center gap-3">
                                    <span className="text-[#3A5944] font-medium text-sm hidden lg:block">Share:</span>
                                    {[
                                        { 
                                            platform: 'facebook', 
                                            icon: FaFacebook, 
                                            color: 'hover:text-blue-600', 
                                            bg: 'hover:bg-blue-50',
                                            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
                                        },
                                        { 
                                            platform: 'twitter', 
                                            icon: FaTwitter, 
                                            color: 'hover:text-blue-400', 
                                            bg: 'hover:bg-blue-50',
                                            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title.rendered)}`
                                        },
                                        { 
                                            platform: 'linkedin', 
                                            icon: FaLinkedin, 
                                            color: 'hover:text-blue-700', 
                                            bg: 'hover:bg-blue-50',
                                            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
                                        }
                                    ].map(({ platform, icon: Icon, color, bg, url }) => (
                                        <motion.a 
                                            key={platform} 
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-3 rounded-xl text-[#3A5944] ${color} ${bg} transition-all duration-300 border border-transparent hover:border-current/20`}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label={`Share on ${platform}`}
                                        >
                                            <Icon size={18} />
                                        </motion.a>
                                    ))}
                                    <motion.button
                                        className="p-3 rounded-xl text-[#3A5944] hover:text-[#D8A51D] hover:bg-[#D8A51D]/10 transition-all duration-300 border border-transparent hover:border-[#D8A51D]/20"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: post.title.rendered,
                                                    url: window.location.href
                                                });
                                            }
                                        }}
                                        aria-label="Share this article"
                                    >
                                        <FaShare size={18} />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Enhanced article content */}
                            <div className="relative">
                                {/* Content typography enhancement */}
                                <div 
                                    className="prose prose-xl max-w-none text-[#3A5944] leading-relaxed"
                                    style={{
                                        fontSize: '1.2rem',
                                        lineHeight: '1.9',
                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                    }}
                                >
                                    {/* Custom content styling */}
                                    <style jsx>{`
                                        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
                                            color: #1C4E37;
                                            font-family: 'Georgia', serif;
                                            font-weight: 700;
                                            margin-top: 2.5rem;
                                            margin-bottom: 1.5rem;
                                        }
                                        .prose h2 {
                                            font-size: 2rem;
                                            border-bottom: 2px solid #D8A51D;
                                            padding-bottom: 0.5rem;
                                        }
                                        .prose h3 {
                                            font-size: 1.6rem;
                                            position: relative;
                                        }
                                        .prose h3::before {
                                            content: '';
                                            position: absolute;
                                            left: -1rem;
                                            top: 50%;
                                            transform: translateY(-50%);
                                            width: 4px;
                                            height: 1.5rem;
                                            background: linear-gradient(to bottom, #D8A51D, #1C4E37);
                                            border-radius: 2px;
                                        }
                                        .prose p {
                                            margin-bottom: 1.8rem;
                                            text-align: justify;
                                        }
                                        .prose blockquote {
                                            border-left: 4px solid #D8A51D;
                                            background: linear-gradient(to right, #F4F9F1, transparent);
                                            padding: 1.5rem 2rem;
                                            margin: 2rem 0;
                                            border-radius: 0 1rem 1rem 0;
                                            font-style: italic;
                                            color: #1C4E37;
                                        }
                                        .prose ul, .prose ol {
                                            margin: 1.5rem 0;
                                        }
                                        .prose li {
                                            margin-bottom: 0.8rem;
                                        }
                                        .prose a {
                                            color: #D8A51D;
                                            text-decoration: none;
                                            border-bottom: 1px solid transparent;
                                            transition: all 0.3s ease;
                                        }
                                        .prose a:hover {
                                            color: #1C4E37;
                                            border-bottom-color: #1C4E37;
                                        }
                                        .prose img {
                                            border-radius: 1rem;
                                            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                                            margin: 2rem auto;
                                        }
                                    `}</style>
                                    
                                    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                                </div>
                                
                                {/* Reading progress indicator */}
                                <div className="mt-12 pt-8 border-t border-[#D8A51D]/20">
                                    <div className="flex items-center justify-between text-sm text-[#3A5944]">
                                        <span>📖 Article completed</span>
                                        <div className="flex items-center gap-2">
                                            <span>Found this helpful?</span>
                                            <div className="flex gap-2">
                                                <motion.button 
                                                    className="px-4 py-2 bg-[#1C4E37]/10 hover:bg-[#1C4E37]/20 rounded-lg transition-colors duration-300"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    👍 Yes
                                                </motion.button>
                                                <motion.button 
                                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    👎 No
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Premium bottom accent */}
                        <div className="h-2 bg-gradient-to-r from-[#1C4E37] via-[#D8A51D] to-[#1C4E37]" />
                    </div>
                </motion.article>

                {/* Share Section - Moved to bottom of content */}
                <motion.section 
                    className="mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8 backdrop-blur-sm bg-opacity-90 border border-[rgba(255,255,255,0.2)]">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-serif font-bold text-[#1C4E37] mb-2">Share This Article</h3>
                            <p className="text-[#3A5944]">Help others discover this content</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <ShareButtons
                                url={window.location.href}
                                title={post.title.rendered}
                            />
                            <div className="flex items-center gap-4">
                                <span className="text-[#3A5944] font-medium">Share on Social:</span>
                                {[
                                    { platform: 'facebook', icon: FaFacebook, color: 'text-blue-600' },
                                    { platform: 'twitter', icon: FaTwitter, color: 'text-blue-400' },
                                    { platform: 'linkedin', icon: FaLinkedin, color: 'text-blue-700' }
                                ].map(({ platform, icon: Icon, color }) => (
                                    <motion.button 
                                        key={platform} 
                                        className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 ${color}`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon size={24} />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Related Posts Section */}
                {relatedPosts.length > 0 && (
                    <motion.section 
                        className="mb-24"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn}
                    >
                        <div className="text-center mb-12">
                            <span className="inline-block h-1 w-12 bg-[#D8A51D] mb-4"></span>
                            <h2 className="text-3xl font-serif font-bold text-[#1C4E37]">
                                Related Articles
                            </h2>
                        </div>
                        
                        <motion.div 
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={staggerChildren}
                        >
                            {relatedPosts.map(relatedPost => (
                                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                            ))}
                        </motion.div>
                    </motion.section>
                )}
            </main>

            {/* Contact CTA Section */}
            <footer className="bg-gradient-to-r from-[#1C4E37] to-[#164A32] text-white py-20 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-[url('/assets/patterns/leaf-pattern.png')] opacity-5" />
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#D8A51D]/10 rounded-full blur-3xl" />
                
                <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                            Explore More Articles
                        </h2>
                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Discover more insights about sustainable farming, organic products, and our journey at Himalaya Krishi.
                        </p>
                        <Link to="/blog">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-[#D8A51D] text-white font-bold rounded-full hover:bg-[#C29419] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D8A51D]/20"
                            >
                                View All Articles
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
};

// Related Post Card Component
const RelatedPostCard = ({ post }) => {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
        >
            <Link
                to={`/blog/${post.slug}`}
                className="block bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative overflow-hidden group border border-[rgba(255,255,255,0.2)]"
            >
                {/* Enhanced decorative accent */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#D8A51D]/5 via-transparent to-[#1C4E37]/5 rounded-3xl scale-0 group-hover:scale-100 transition-transform duration-700 ease-out" />
                
                {featuredImage ? (
                    <div className="overflow-hidden rounded-t-3xl relative">
                        <ImageHandler
                            src={featuredImage}
                            alt={post.title.rendered}
                            className="w-full h-56 object-cover"
                            showControls={false}
                            quality="high"
                        />
                        {/* Image overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-[#F4F9F1] to-[#EAEFE7] flex items-center justify-center rounded-t-3xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%231C4E37%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
                        <div className="text-center z-10">
                            <div className="w-16 h-16 bg-[#1C4E37]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-8 h-8 text-[#1C4E37]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-[#3A5944] font-medium">Premium Content</span>
                        </div>
                    </div>
                )}
                
                <div className="p-8 relative z-10">
                    <h3 
                        className="font-serif font-bold text-[#1C4E37] text-xl mb-4 line-clamp-2 group-hover:text-[#D8A51D] transition-colors duration-300 leading-tight"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div className="flex items-center gap-3 text-[#3A5944] text-sm">
                        <FaCalendar className="text-[#D8A51D]" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                        })}</span>
                        <span className="w-1 h-1 bg-[#D8A51D] rounded-full" />
                        <span>5 min read</span>
                    </div>
                </div>
                
                {/* Premium hover effect indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1C4E37] to-[#D8A51D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
        </motion.div>
    );
};

export default BlogPost;

                        {/* Enhanced prose styling for content images */}
                        <style jsx>{`
                            .prose img {
                                border-radius: 1.5rem;
                                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                                margin: 3rem auto;
                                transition: all 0.4s ease;
                                cursor: pointer;
                                max-width: 100%;
                                height: auto;
                            }
                            .prose img:hover {
                                transform: translateY(-8px) scale(1.02);
                                box-shadow: 0 30px 60px rgba(0,0,0,0.2);
                            }
                            .prose figure {
                                margin: 3rem 0;
                                text-align: center;
                            }
                            .prose figcaption {
                                margin-top: 1rem;
                                font-style: italic;
                                color: #3A5944;
                                font-size: 0.9rem;
                                background: linear-gradient(to right, #F4F9F1, transparent, #F4F9F1);
                                padding: 0.5rem 1rem;
                                border-radius: 0.5rem;
                                display: inline-block;
                            }
                            
                            /* Image gallery styles */
                            .prose .image-gallery {
                                display: grid;
                                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                                gap: 1.5rem;
                                margin: 3rem 0;
                            }
                            .prose .image-gallery img {
                                margin: 0;
                                border-radius: 1rem;
                                aspect-ratio: 16/9;
                                object-fit: cover;
                            }
                            
                            /* Responsive image containers */
                            .prose .image-container {
                                position: relative;
                                overflow: hidden;
                                border-radius: 1.5rem;
                                margin: 3rem auto;
                                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                            }
                            .prose .image-container::before {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: linear-gradient(45deg, rgba(28,78,55,0.1), rgba(216,165,29,0.1));
                                opacity: 0;
                                transition: opacity 0.3s ease;
                                z-index: 1;
                            }
                            .prose .image-container:hover::before {
                                opacity: 1;
                            }
                        `}</style>