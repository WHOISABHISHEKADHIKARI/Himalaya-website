import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShare, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaCopy, FaCheck } from 'react-icons/fa';

const ShareButtons = ({ url, title }) => {
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
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${cleanUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${cleanUrl}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${cleanUrl}&title=${encodeURIComponent(title)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${rawCleanUrl}`)}`
    };

    const handleShare = (platform) => {
        window.open(shareData[platform], '_blank', 'width=600,height=400');
    };

    const copyToClipboard = async () => {
        try {
            // Create a rich text blob with HTML for better link preview
            const richText = new Blob(
                [`<a href="${rawCleanUrl}">${title}</a>`], 
                { type: 'text/html' }
            );
            
            // Create a plain text blob as fallback
            const plainText = new Blob(
                [rawCleanUrl], 
                { type: 'text/plain' }
            );
            
            // Try to use the modern clipboard API with rich content
            if (navigator.clipboard && navigator.clipboard.write) {
                const clipboardItem = new ClipboardItem({
                    'text/html': richText,
                    'text/plain': plainText
                });
                
                await navigator.clipboard.write([clipboardItem]);
            } else {
                // Fallback to the basic clipboard API
                await navigator.clipboard.writeText(rawCleanUrl);
            }
            
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            // Ultimate fallback
            try {
                await navigator.clipboard.writeText(rawCleanUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (fallbackErr) {
                console.error('Fallback copy also failed:', fallbackErr);
            }
        }
    };

    const buttonVariants = {
        hover: { scale: 1.1 },
        tap: { scale: 0.95 }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
                <FaShare className="text-[#1C4E37]" />
                <span>Share this article</span>
            </div>
            <div className="flex items-center gap-3">
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                    onClick={() => handleShare('facebook')}
                    aria-label="Share on Facebook"
                >
                    <FaFacebook size={20} />
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-sky-400 text-white flex items-center justify-center hover:bg-sky-500 transition-colors"
                    onClick={() => handleShare('twitter')}
                    aria-label="Share on Twitter"
                >
                    <FaTwitter size={20} />
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                    onClick={() => handleShare('linkedin')}
                    aria-label="Share on LinkedIn"
                >
                    <FaLinkedin size={20} />
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                    onClick={() => handleShare('whatsapp')}
                    aria-label="Share on WhatsApp"
                >
                    <FaWhatsapp size={20} />
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
                    onClick={copyToClipboard}
                    aria-label="Copy link"
                >
                    {copied ? <FaCheck size={20} /> : <FaCopy size={20} />}
                </motion.button>
            </div>
        </div>
    );
};

export default ShareButtons;