import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaClock } from 'react-icons/fa';
import ImageHandler from '../components/ImageHandler';
import ShareButtons from '../components/ShareButtons';
import styles from './BlogPost.module.css';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState([]);

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
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1C4E37] border-t-transparent"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-[#1C4E37]">
                Post not found
            </div>
        );
    }

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return (
        <div className={styles.blogPost}>
            <Helmet>
                <title>{post.title.rendered} | Himalaya Krishi</title>
                <meta name="description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
            </Helmet>

            <div className={styles.hero}>
                {featuredImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={featuredImage}
                            alt={post.title.rendered}
                            className={styles.heroImage}
                        />
                        <div className={styles.heroOverlay} />
                    </motion.div>
                )}
                <div className={styles.heroContent}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className={styles.title}>{post.title.rendered}</h1>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <span className={styles.metaBadge}>
                                <FaCalendar className={styles.metaIcon} />
                                {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className={styles.metaBadge}>
                                <FaUser className={styles.metaIcon} />
                                Admin
                            </span>
                            <span className={styles.metaBadge}>
                                <FaClock className={styles.metaIcon} />
                                5 min read
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className={styles.content}>
                {featuredImage && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.featuredImage}
                    >
                        <ImageHandler
                            src={featuredImage}
                            alt={post.title.rendered}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={styles.shareSection}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <ShareButtons
                            url={window.location.href}
                            title={post.title.rendered}
                        />
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 font-medium">Share on Social:</span>
                            {['facebook', 'twitter', 'linkedin'].map((platform) => (
                                <button key={platform} className={styles.socialButton}>
                                    {platform === 'facebook' && <FaFacebook size={28} className="text-blue-600" />}
                                    {platform === 'twitter' && <FaTwitter size={28} className="text-blue-400" />}
                                    {platform === 'linkedin' && <FaLinkedin size={28} className="text-blue-700" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={styles.articleContent}
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className={styles.relatedSection}
                >
                    <h2 className={styles.relatedTitle}>Related Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map(relatedPost => (
                            <Link
                                key={relatedPost.id}
                                to={`/blog/${relatedPost.slug}`}
                                className={styles.relatedCard}
                            >
                                {relatedPost._embedded?.['wp:featuredmedia'] && (
                                    <div className="overflow-hidden">
                                        <img
                                            src={relatedPost._embedded['wp:featuredmedia'][0].source_url}
                                            alt={relatedPost.title.rendered}
                                            className={styles.relatedImage}
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className={styles.relatedTitle}>
                                        {relatedPost.title.rendered}
                                    </h3>
                                    <p className="mt-3 flex items-center gap-2 text-gray-500">
                                        <FaCalendar className={styles.metaIcon} />
                                        {new Date(relatedPost.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPost;
