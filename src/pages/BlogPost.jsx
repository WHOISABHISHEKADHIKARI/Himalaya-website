import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
    FaCalendar,
    FaUser,
    FaShare,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaClock,
    FaArrowDown,
    FaArrowLeft,
} from 'react-icons/fa';
import ImageHandler from '../components/ImageHandler';
import ShareButtons from '../components/ShareButtons';
import ScrollToTopButton from '../components/ScrollToTopButton';
import logoImage from '../assets/logo/whitelogo-blackbg-removebg-previewaa.webp';

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const heroAnimation = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const heroTextAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

// Related Post Card Component
const RelatedPostCard = ({ post }) => {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
        >
            <Link
                to={`/blog/${post.slug}`}
                className="block bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative overflow-hidden group border border-[rgba(255,255,255,0.2)]"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#D8A51D]/5 via-transparent to-[#1C4E37]/5 rounded-3xl scale-0 group-hover:scale-100 transition-transform duration-700 ease-out" />

                {featuredImage ? (
                    <div className="overflow-hidden rounded-t-3xl relative">
                        <ImageHandler
                            src={featuredImage}
                            alt={post.title.rendered}
                            className="w-full h-56 object-cover"
                            showControls={false}
                            quality="high"
                            crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-[#F4F9F1] to-[#EAEFE7] flex items-center justify-center rounded-t-3xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%231C4E37%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
                        <div className="text-center z-10">
                            <div className="w-16 h-16 bg-[#1C4E37]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-8 h-8 text-[#1C4E37]" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"
                                    />
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
                        <span>
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                        <span className="w-1 h-1 bg-[#D8A51D] rounded-full" />
                        <span>5 min read</span>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1C4E37] to-[#D8A51D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
        </motion.div>
    );
};

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPOV, setCurrentPOV] = useState('reader');
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [error, setError] = useState(null);

    // API base URL - same for all environments
    const API_BASE_URL = 'https://blogdata.dapirates.xyz';

    // Helper function to get canonical URL for the blog post
    const getCanonicalUrl = () => {
        const baseUrl = 'https://himalayakrishi.com';
        return `${baseUrl}/blog/${slug}`;
    };

    // Fix images in content by adding crossOrigin attribute and fixing URLs
    const fixContentImages = htmlContent => {
        if (!htmlContent) return '';

        // Add crossOrigin attribute to all img tags and ensure HTTPS URLs
        return htmlContent
            .replace(/src="http:\/\//gi, 'src="https://')
            .replace(/<img(.*?)>/gi, '<img$1 crossorigin="anonymous">');
    };

    // Transform content based on POV
    const transformContent = content => {
        if (!content) return '';

        // First fix images in the content
        const fixedContent = fixContentImages(content);

        switch (currentPOV) {
            case 'farmer':
                return `
          <div class="farmer-view">
            <div class="pov-header bg-[#1C4E37]/10 p-4 rounded-lg mb-6">
              <h4 class="text-[#1C4E37] font-bold mb-2">Farmer's Perspective</h4>
              <p class="text-[#3A5944]">Practical insights for agricultural implementation</p>
            </div>
            ${fixedContent}
            <div class="practical-tips mt-8 bg-[#F4F9F1] p-6 rounded-xl border border-[#1C4E37]/20">
              <h5 class="text-[#1C4E37] font-bold mb-4">Quick Implementation Guide</h5>
              <ul class="space-y-3">
                <li class="flex items-center"><span class="mr-2">🌱</span> Step-by-step application</li>
                <li class="flex items-center"><span class="mr-2">⚡</span> Resource requirements</li>
                <li class="flex items-center"><span class="mr-2">💰</span> Expected outcomes</li>
              </ul>
            </div>
          </div>
        `;
            case 'expert':
                return `
          <div class="expert-view">
            <div class="pov-header bg-[#D8A51D]/10 p-4 rounded-lg mb-6">
              <h4 class="text-[#D8A51D] font-bold mb-2">Expert Analysis</h4>
              <p class="text-[#3A5944]">Technical breakdown and research insights</p>
            </div>
            ${fixedContent}
            <div class="technical-notes mt-8 bg-[#F4F9F1] p-6 rounded-xl border border-[#D8A51D]/20">
              <h5 class="text-[#D8A51D] font-bold mb-4">Research Notes</h5>
              <ul class="space-y-3">
                <li class="flex items-center"><span class="mr-2">📊</span> Data analysis</li>
                <li class="flex items-center"><span class="mr-2">🔬</span> Methodology</li>
                <li class="flex items-center"><span class="mr-2">📚</span> References</li>
              </ul>
            </div>
          </div>
        `;
            default:
                return fixedContent; // Reader view shows original content with fixed images
        }
    };

    // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(null);

                // Build URL with URLSearchParams for better parameter handling
                const apiUrl = new URL(`${API_BASE_URL}/wp-json/wp/v2/posts`);
                apiUrl.searchParams.append('slug', slug);
                apiUrl.searchParams.append('_embed', 'true');

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (!data || data.length === 0) {
                    throw new Error('Post not found');
                }

                setPost(data[0]);

                // Fetch related posts
                const relatedUrl = new URL(`${API_BASE_URL}/wp-json/wp/v2/posts`);
                relatedUrl.searchParams.append('_embed', 'true');
                relatedUrl.searchParams.append('per_page', '3');

                const relatedResponse = await fetch(relatedUrl);

                if (!relatedResponse.ok) {
                    throw new Error(`HTTP error! status: ${relatedResponse.status}`);
                }

                const relatedData = await relatedResponse.json();
                setRelatedPosts(relatedData.filter(p => p.id !== data[0].id));
            } catch (error) {
                console.error('Error fetching post:', error);
                setError(error.message);
                setPost(null);
                setRelatedPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
        window.scrollTo(0, 0);
    }, [slug, API_BASE_URL]);

    // Handle scroll and SEO
    useEffect(() => {
        if (!post) return;

        // Enhanced SEO optimization
        document.title = `${post.title.rendered} | Himalaya Krishi`;

        // Add canonical URL
        const canonicalLink = document.querySelector('link[rel="canonical"]') || document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = getCanonicalUrl();
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
    }, [post]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7]">
                <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#1C4E37] border-t-transparent mb-4"></div>
                    <p className="text-[#3A5944] font-medium">Loading article...</p>
                </motion.div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7] text-[#1C4E37]">
                <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-serif font-bold mb-4">Article Not Found</h1>
                    <p className="text-[#3A5944] mb-8">{error || "The article you're looking for doesn't exist."}</p>
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

    return (
        <div className="relative bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7] min-h-screen font-sans">
            <ScrollToTopButton />
            <Helmet>
                <title>{post.title.rendered} | Himalaya Krishi</title>
                <meta name="description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
                <link rel="canonical" href={getCanonicalUrl()} />
                <meta property="og:url" content={getCanonicalUrl()} />
                <meta property="og:title" content={`${post.title.rendered} | Himalaya Krishi`} />
                <meta property="og:description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={featuredImage || 'https://himalayakrishi.com/logo_512.png'} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Himalaya Krishi" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${post.title.rendered} | Himalaya Krishi`} />
                <meta name="twitter:description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
                <meta name="twitter:image" content={featuredImage || 'https://himalayakrishi.com/logo_512.png'} />
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
                    animate={isLoaded ? 'visible' : 'hidden'}
                    variants={heroAnimation}
                >
                    {/* Back Button */}
                    <motion.div className="mb-8" variants={heroTextAnimation}>
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
                    <motion.div className="w-16 h-1 bg-[#D8A51D] mb-8" variants={heroTextAnimation} />

                    <motion.h1
                        className="text-5xl md:text-6xl font-serif font-bold text-[#1C4E37] mb-6 tracking-tight leading-tight"
                        variants={heroTextAnimation}
                        dangerouslySetInnerHTML={{
                            __html: post.title.rendered
                                .replace(/src="http:\/\//gi, 'src="https://')
                                .replace(/<img(.*?)>/gi, '<img$1 crossorigin="anonymous">'),
                        }}
                    />

                    <motion.div className="flex flex-wrap items-center gap-6 mb-8" variants={heroTextAnimation}>
                        <span className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-[#3A5944] border border-white/30">
                            <FaCalendar className="mr-2 text-[#D8A51D]" />
                            {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-[#3A5944] border border-white/30">
                            <FaUser className="mr-2 text-[#D8A51D]" />
                            Admin
                        </span>
                        <span className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-[#3A5944] border border-white/30">
                            <FaClock className="mr-2 text-[#D8A51D]" />5 min read
                        </span>
                    </motion.div>
                </motion.div>
            </header>

            <main className="container mx-auto px-4 max-w-5xl pb-32">
                {/* Featured Image Section */}
                <motion.section
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={fadeIn}
                >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        {featuredImage ? (
                            <div className="relative overflow-hidden">
                                <ImageHandler
                                    src={featuredImage}
                                    alt={post.title.rendered}
                                    className="w-full h-[600px] object-cover"
                                    quality="high"
                                    showControls={true}
                                    crossOrigin="anonymous"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </div>
                        ) : (
                            <div className="w-full h-[600px] bg-gradient-to-br from-[#F4F9F1] via-white to-[#EAEFE7] flex items-center justify-center rounded-3xl shadow-inner border border-[#D8A51D]/20 relative overflow-hidden">
                                <div className="text-center relative w-full h-full">
                                    {logoImage && (
                                        <div className="flex flex-col items-center justify-center p-8 h-full relative z-10">
                                            <motion.img
                                                src={logoImage}
                                                alt="Himalaya Krishi Logo"
                                                className="h-56 w-auto mx-auto mb-8 shadow-2xl rounded-2xl"
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.8 }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* Article Content */}
                <motion.article
                    className="mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={fadeIn}
                    data-share-section
                >
                    <div className="relative bg-gradient-to-br from-white via-white to-[#F4F9F1]/30 rounded-3xl shadow-2xl overflow-hidden border border-[#D8A51D]/10">
                        <div className="relative z-10 p-12 lg:p-16">
                            {/* POV and Preview Controls */}
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-[#3A5944] font-medium">Point of View:</span>
                                    <select
                                        value={currentPOV}
                                        onChange={e => setCurrentPOV(e.target.value)}
                                        className="px-4 py-2 rounded-full bg-white border border-[#D8A51D]/20 text-[#1C4E37] focus:outline-none focus:ring-2 focus:ring-[#D8A51D]/50"
                                    >
                                        <option value="reader">Reader</option>
                                        <option value="farmer">Farmer</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                                    className="px-6 py-2 rounded-full bg-[#1C4E37] text-white hover:bg-[#164A32] transition-all duration-300 flex items-center gap-2"
                                >
                                    {isPreviewMode ? 'Exit Preview' : 'Preview'}
                                </button>
                            </div>

                            {/* Enhanced article content */}
                            <div className="relative">
                                <div
                                    className={`prose prose-xl max-w-none text-[#3A5944] leading-relaxed ${isPreviewMode ? 'opacity-60 pointer-events-none' : ''}`}
                                    style={{
                                        fontSize: '1.2rem',
                                        lineHeight: '1.9',
                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                    }}
                                >
                                    <div
                                        className={`relative ${currentPOV !== 'reader' ? 'pov-content' : ''}`}
                                        dangerouslySetInnerHTML={{
                                            __html: isPreviewMode
                                                ? `<div class="preview-overlay bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-[#D8A51D]/20 shadow-xl">
                            <div class="flex items-center justify-between mb-6">
                              <h3 class="text-2xl font-serif font-bold text-[#1C4E37]">Preview Mode: ${currentPOV.charAt(0).toUpperCase() + currentPOV.slice(1)} View</h3>
                              <span class="pov-badge"></span>
                            </div>
                            ${transformContent(post.content.rendered)}
                          </div>`
                                                : transformContent(post.content.rendered),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.article>

                {/* Related Posts Section */}
                {relatedPosts.length > 0 && (
                    <motion.section
                        className="mb-24"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={fadeIn}
                    >
                        <div className="text-center mb-12">
                            <span className="inline-block h-1 w-12 bg-[#D8A51D] mb-4"></span>
                            <h2 className="text-3xl font-serif font-bold text-[#1C4E37]">Related Articles</h2>
                        </div>

                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={staggerChildren}
                        >
                            {relatedPosts.map(relatedPost => (
                                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                            ))}
                        </motion.div>
                    </motion.section>
                )}
            </main>

            {/* Footer CTA */}
            <footer className="bg-gradient-to-r from-[#1C4E37] to-[#164A32] text-white py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Explore More Articles</h2>
                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Discover more insights about sustainable farming, organic products, and our journey at
                            Himalaya Krishi.
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

export default BlogPost;
