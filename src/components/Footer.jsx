import React, { useState, useEffect } from "react";
import { 
  FaFacebook, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaGlobe 
} from "react-icons/fa";

const Footer = () => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  const content = {
    title: "Himalaya Krishi",
    description: "Leading sustainable and organic farming in Nepal. We're pioneering modern agricultural techniques with traditional wisdom to create one of Nepal's best integrated farming systems. Our murra farm and organic dairy practices set new standards in sustainable agriculture.",
    address: "Manahari-5, Makwanpur",
    quickLinks: "Quick Links",
    connectWithUs: "Connect With Us",
    copyright: "All rights reserved.",
    links: [
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about" },
      { name: "Vision", url: "/vision" },
      { name: "Contact", url: "/contact" },
      { name: "FAQ", url: "/faq" },
      { name: "Terms & Conditions", url: "/terms" },
      { name: "Careers", url: "/careers" },
      { name: "News About Us", url: "/NewsAboutUs" }
    ]
  };

  useEffect(() => {
    const translateContent = async () => {
      if (language === 'np') {
        try {
          // Here you would integrate with Google Translate API
          // Example structure for API call:
          const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: Object.values(content).flat().map(item => 
                typeof item === 'object' ? item.name : item
              ),
              targetLanguage: 'ne' // ISO code for Nepali
            })
          });
          
          const translatedTexts = await response.json();
          // Process and set translations
          setTranslations(translatedTexts);
        } catch (error) {
          console.error('Translation failed:', error);
        }
      }
    };

    translateContent();
  }, [language]);

  const getTranslatedText = (key) => {
    if (language === 'en') return key;
    return translations[key] || key;
  };

  const handleLanguageSwitch = () => {
    setLanguage(prev => prev === 'en' ? 'np' : 'en');
  };

  return (
    <footer className="bg-gradient-to-r from-[#1C4E37] to-[#173E2C] text-white py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D8A51D]">
              {getTranslatedText(content.title)}
            </h3>
            <p className="text-gray-300 mb-4">
              {getTranslatedText(content.description)}
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center group hover:text-[#D8A51D] transition-colors duration-300">
                <FaMapMarkerAlt className="text-[#D8A51D] mr-2" />
                <span>Manahari-5, Makwanpur</span>
              </div>
              <div className="flex items-center group hover:text-[#D8A51D] transition-colors duration-300">
                <FaPhone className="text-[#D8A51D] mr-2" />
                <span>+977 9823405140</span>
              </div>
              <div className="flex items-center group hover:text-[#D8A51D] transition-colors duration-300">
                <FaEnvelope className="text-[#D8A51D] mr-2" />
                <a href="mailto:info@krishihimalaya.com" className="hover:text-[#D8A51D] transition-colors duration-300">
                  info@krishihimalaya.com
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D8A51D]">{getTranslatedText(content.quickLinks)}</h3>
            <ul className="space-y-2">
              {content.links.slice(0, 4).map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {getTranslatedText(link.name)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D8A51D]">{getTranslatedText(content.connectWithUs)}</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://wa.me/9779823405140"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-500 transition-colors duration-300 text-2xl transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61572480220650"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-2xl transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="mailto:info@krishihimalaya.com"
                className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 text-2xl transform hover:scale-110"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
            
            {/* Added Links */}
            <ul className="space-y-2">
              <li>
                <a 
                  href="/faq"
                  className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                >
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">FAQ</span>
                </a>
              </li>
              <li>
                <a 
                  href="/terms"
                  className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                >
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">Terms & Conditions</span>
                </a>
              </li>
              <li>
                <a 
                  href="/careers"
                  className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                >
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">Careers</span>
                </a>
              </li>
              <li>
                <a 
                  href="/NewsAboutUs"
                  className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                >
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">News About Us</span>
                </a>
              </li>
              <li className="mt-4">
                <button
                  onClick={handleLanguageSwitch}
                  className="w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#D8A51D] via-[#E3B543] to-[#B88A17] 
                    text-white font-semibold transform hover:scale-105 active:scale-95 transition-all duration-300 
                    shadow-lg hover:shadow-[#D8A51D]/30 flex items-center justify-center space-x-4 
                    relative overflow-hidden border border-[#D8A51D]/10 hover:brightness-110"
                  aria-label={language === 'en' ? 'Switch to Nepali' : 'Switch to English'}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <FaGlobe className="text-white text-xl transition-transform duration-500 ease-out group-hover:rotate-180" />
                    <span className="tracking-wider text-lg font-medium">
                      {language === 'en' ? 'नेपाली' : 'English'}
                    </span>
                  </div>
                </button>
              </li>
            </ul>
            {/* Removed the Google Map component and its Suspense wrapper */}
          </div>
        </div>

        <div className="text-center text-gray-400 mt-8 pt-8 border-t border-gray-700 flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span>© {new Date().getFullYear()} {getTranslatedText(content.title)}.</span>
            <span>{getTranslatedText(content.copyright)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;