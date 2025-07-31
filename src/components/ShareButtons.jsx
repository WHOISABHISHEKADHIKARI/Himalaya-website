import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShare, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaCopy, FaCheck, FaReddit, FaTelegram } from 'react-icons/fa';

const ShareButtons = ({ url, title, description, image }) => {
    const [copied, setCopied] = useState(false);
    
    // Helper function to clean and encode URLs properly
    const getCleanUrl = (inputUrl) => {
        try {
            // Parse the URL to handle it properly
            const urlObj = new URL(inputUrl);
            // Remove any fragments
            urlObj.hash = '';
            // Return the clean URL
            return encodeURIComponent(urlObj.toString());
        } catch (e) {
            console.error('Invalid URL:', e);
            return encodeURIComponent(inputUrl);
        }
    };

    // Get the raw clean URL (without encoding) for clipboard
    const getRawCleanUrl = (inputUrl) => {
        try {
            // Parse the URL to handle it properly
            const urlObj = new URL(inputUrl);
            // Remove any fragments
            urlObj.hash = '';
            // Return the clean URL without encoding
            return urlObj.toString();
        } catch (e) {
            console.error('Invalid URL:', e);
            return inputUrl;
        }
    };

    const cleanUrl = getCleanUrl(url);
    const rawCleanUrl = getRawCleanUrl(url);
    
    const shareData = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${cleanUrl}&quote=${encodeURIComponent(title)}`,
        twitter: `https://twitter.com/intent/tweet?url=${cleanUrl}&text=${encodeURIComponent(title)}&via=himalayakrishi`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${cleanUrl}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || title)}&source=Himalaya%20Krishi`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${description || 'Read more on Himalaya Krishi'}\n\n${rawCleanUrl}`)}`,
        reddit: `https://reddit.com/submit?url=${cleanUrl}&title=${encodeURIComponent(title)}`,
        telegram: `https://t.me/share/url?url=${cleanUrl}&text=${encodeURIComponent(title)}`
    };

    const handleShare = (platform) => {
        window.open(shareData[platform], '_blank', 'width=600,height=400');
    };

    const copyToClipboard = async () => {
        try {
            // Create rich content for better link previews
            const richContent = `${title}\n\n${description || 'Read more on Himalaya Krishi - Nepal\'s leading organic farming platform'}\n\n${rawCleanUrl}`;
            
            // Create a rich text blob with HTML for better link preview
            const richText = new Blob(
                [`<div><h3>${title}</h3><p>${description || 'Read more on Himalaya Krishi'}</p><a href="${rawCleanUrl}">${rawCleanUrl}</a></div>`], 
                { type: 'text/html' }
            );
            
            // Create a plain text blob with rich content
            const plainText = new Blob(
                [richContent], 
                { type: 'text/plain' }
            );
            
            // Try to use the modern clipboard API with rich content
            if (navigator.clipboard && navigator.clipboard.write) {
                try {
                    const clipboardItem = new ClipboardItem({
                        'text/html': richText,
                        'text/plain': plainText
                    });
                    
                    await navigator.clipboard.write([clipboardItem]);
                } catch (richError) {
                    // Fallback to rich text content
                    await navigator.clipboard.writeText(richContent);
                }
            } else {
                // Fallback to the basic clipboard API with rich content
                await navigator.clipboard.writeText(richContent);
            }
            
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            // Ultimate fallback - just the URL
            try {
                await navigator.clipboard.writeText(rawCleanUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (fallbackErr) {
                console.error('Fallback copy also failed:', fallbackErr);
            }
        }
    };

    // Native sharing API for mobile devices
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description || 'Read more on Himalaya Krishi',
                    url: rawCleanUrl
                });
            } catch (err) {
                console.error('Native sharing failed:', err);
            }
        }
    };

    const buttonVariants = {
        hover: { scale: 1.1 },
        tap: { scale: 0.95 }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex items-center gap-2 text-gray-700">
                <FaShare className="text-[#1C4E37]" />
                <span className="font-medium">Share this article</span>
            </div>
            {copied && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-green-600 font-medium"
                >
                    Link copied to clipboard!
                </motion.div>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Native Share Button (Mobile) */}
                {navigator.share && (
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="w-10 h-10 rounded-full bg-[#1C4E37] text-white flex items-center justify-center hover:bg-[#D8A51D] transition-colors"
                        onClick={handleNativeShare}
                        aria-label="Share via device"
                    >
                        <FaShare size={16} />
                    </motion.button>
                )}

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                    onClick={() => handleShare('facebook')}
                    aria-label="Share on Facebook"
                    title="Share on Facebook"
                >
                    <FaFacebook size={18} />
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-sky-400 text-white flex items-center justify-center hover:bg-sky-500 transition-colors shadow-lg"
                    onClick={() => handleShare('twitter')}
                    aria-label="Share on Twitter"
                    title="Share on Twitter"
                >
                    <FaTwitter size={18} />
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors shadow-lg"
                    onClick={() => handleShare('linkedin')}
                    aria-label="Share on LinkedIn"
                    title="Share on LinkedIn"
                >
                    <FaLinkedin size={18} />
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg"
                    onClick={() => handleShare('whatsapp')}
                    aria-label="Share on WhatsApp"
                    title="Share on WhatsApp"
                >
                    <FaWhatsapp size={18} />
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition-colors shadow-lg"
                    onClick={() => handleShare('reddit')}
                    aria-label="Share on Reddit"
                    title="Share on Reddit"
                >
                    <FaReddit size={18} />
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
                    onClick={() => handleShare('telegram')}
                    aria-label="Share on Telegram"
                    title="Share on Telegram"
                >
                    <FaTelegram size={18} />
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`w-10 h-10 rounded-full text-white flex items-center justify-center transition-colors shadow-lg ${
                        copied ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={copyToClipboard}
                    aria-label="Copy link"
                    title={copied ? 'Link copied!' : 'Copy link'}
                >
                    {copied ? <FaCheck size={18} /> : <FaCopy size={18} />}
                </motion.button>
            </div>
        </div>
    );
};

export default ShareButtons;