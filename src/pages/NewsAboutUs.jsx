import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';

const NewsAboutUs = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  const newsArticles = [
    {
      id: 1,
      title: "Meet The Young Techie Behind a 400-Liter-Per-Day Organic Milk Farm",
      source: "TheHamro",
      summary: "Abhishek Adhikari, a 25-year-old youth from Manahari, Makwanpur, is redefining the future of agriculture in Nepal. His farm produces 400 liters of milk daily with 7% fat content using organic methods.",
      link: "https://thehamro.com/abhishek-adhikari-meet-the-young-techie-behind-a-400-liter-per-day-organic-milk-farm/",
      date: "2024",
      image: "/images/news/abhishek-farm.jpg"
    },
    {
      id: 2,
      title: "अभिषेक अधिकारी: प्रविधीको पृष्ठभूमिमा आधारित सफल जैविक किसान",
      source: "Nawalpur Online",
      summary: "मनहरी मकवानपुरका २५ वर्षीय युवा, हाल नेपालका उत्कृष्ट युवा कृषक मध्ये एकका रूपमा चिनिन्छन्। दैनिक ४०० लिटर दूध उत्पादन गर्ने फार्म सञ्चालन गर्दै।",
      link: "https://www.nawalpuronline.com/2025/05/26329",
      date: "2024",
      image: "/images/news/abhishek-dairy.jpg"
    },
    {
      id: 3,
      title: "Lumpy Skin Dilemma: Unmasking Nepal's Cattle Plague",
      source: "Medium",
      summary: "An in-depth analysis of the Lumpy Skin Disease affecting cattle in Nepal, its economic impact, and the challenges faced by farmers in managing this contagious crisis.",
      link: "https://medium.com/@abhishekadhikari1254/lumpy-skin-dilemma-unmasking-nepals-cattle-plague-a-contagious-crisis-of-economic-losses-f8055852714f",
      date: "July 23, 2023",
      image: "/images/news/lumpy-skin.jpg"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

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
              <a href="/" className="hover:text-[#D8A51D] transition-colors duration-300">
                <span lang="ne">मुख्य पृष्ठ</span>
                <span className="mx-1">/</span>
                <span>Home</span>
              </a>
            </li>
            <li aria-current="page" className="text-[#D8A51D]">
              <span lang="ne">समाचार</span>
              <span> / </span>
              <span>News</span>
            </li>
          </ol>
        </nav>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#1C4E37] relative">
                <span className="relative">
                  News About Us
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D8A51D] to-transparent"></div>
                </span>
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-[#3A5944] mt-8">
                Stay updated with the latest news and developments from Himalaya Krishi
              </p>
            </motion.div>
            
            {/* News Cards Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {newsArticles.map((article) => (
                <motion.a 
                  key={article.id}
                  variants={cardVariants}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group perspective-1000"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/20 via-[#D8A51D]/10 to-[#1C4E37]/20 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:blur-3xl group-hover:scale-105"></div>
                  <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/95 via-white/90 to-white/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_rgba(28,78,55,0.15)] hover:shadow-[0_32px_80px_rgba(28,78,55,0.3)] transition-all duration-700 relative h-full overflow-hidden">
                    <div className="relative aspect-w-16 aspect-h-9 mb-6 rounded-xl overflow-hidden">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="object-cover w-full h-48 transform transition-all duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/news/placeholder.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#D8A51D] text-sm font-semibold px-3 py-1 bg-[#D8A51D]/10 rounded-full">
                        {article.source}
                      </span>
                      <span className="text-[#1C4E37]/60 text-sm">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#1C4E37] group-hover:text-[#2A704F] transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[#1C4E37]/80 text-sm leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D8A51D]/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Facebook Post Embed with Premium Container */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-24 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E37]/10 via-[#D8A51D]/5 to-[#1C4E37]/10 rounded-[2.5rem] blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_rgba(28,78,55,0.15)]">
                <iframe 
                  src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fekraj.upreti.5%2Fposts%2Fpfbid02tPgVSejhjFeheEmdVSFWF8Kshb5aejYysM5bc824W8q3dvrhXrpcYRm5ndu26x6Gl&show_text=true&width=500" 
                  width="500" 
                  height="600" 
                  style={{ border: 'none', overflow: 'hidden', margin: '0 auto', display: 'block' }} 
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAboutUs;