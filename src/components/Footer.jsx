import React from "react";
import { 
  FaFacebook, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope 
} from "react-icons/fa";

// Removed the lazy import for GoogleMap

const Footer = () => {
  const colors = {
    primary: '#1C4E37',
    secondary: '#D8A51D',
    light: '#F4F9F1',
    accent: '#8C3E2F',
    text: {
      dark: '#1A2E1D',
      medium: '#3A5944',
      light: '#F9FCF7',
      gold: '#D8A51D'
    },
    background: {
      primary: '#F4F9F1',
      card: '#FFFFFF',
      accent: 'rgba(216, 165, 29, 0.07)'
    }
  };

  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "New About Us", url: "/new-about" },
    { name: "Our Plan", url: "/our-plan" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#1C4E37] to-[#173E2C] text-white py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D8A51D]">Himalaya Krishi</h3>
            <p className="text-gray-300 mb-4">
              Empowering farmers with sustainable practices and modern techniques.
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
            <h3 className="text-xl font-bold mb-4 text-[#D8A51D]">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D8A51D]">Connect With Us</h3>
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
            {/* Removed the Google Map component and its Suspense wrapper */}
          </div>
        </div>

        <div className="text-center text-gray-400 mt-8 pt-8 border-t border-gray-700">
          © {new Date().getFullYear()} Himalaya Krishi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;