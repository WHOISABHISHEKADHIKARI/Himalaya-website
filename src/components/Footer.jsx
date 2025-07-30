import React from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebook, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope
} from "react-icons/fa";

const Footer = () => {
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



  return (
    <footer className="bg-gradient-to-r from-[#1C4E37] to-[#173E2C] text-white py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D8A51D]">
              {content.title}
            </h3>
            <p className="text-gray-300 mb-4">
              {content.description}
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
            <h3 className="text-xl font-bold mb-4 text-[#D8A51D]">{content.quickLinks}</h3>
            <ul className="space-y-2">
              {content.links.slice(0, 4).map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.url}
                    className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D8A51D]">{content.connectWithUs}</h3>
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
                <Link 
                  to="/faq"
                  className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                >
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">FAQ</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms"
                  className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                >
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers"
                  className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                >
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">Careers</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/NewsAboutUs"
                  className="text-gray-300 hover:text-[#D8A51D] transition-colors duration-300 flex items-center group"
                >
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">News About Us</span>
                </Link>
              </li>

            </ul>
            {/* Removed the Google Map component and its Suspense wrapper */}
          </div>
        </div>

        <div className="text-center text-gray-400 mt-8 pt-8 border-t border-gray-700 flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span>© {new Date().getFullYear()} {content.title}.</span>
            <span>{content.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;