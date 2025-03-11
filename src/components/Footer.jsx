import React from "react";
import { 
  FaFacebook, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope 
} from "react-icons/fa";

const Footer = () => {
  // Quick links for navigation
  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "Our Plan", url: "/our-plan" },  // Updated link
    { name: "Products", url: "/products" },
    { name: "Blog", url: "/blog" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Himalaya Krishi</h3>
            <p className="text-gray-300 mb-4">
              Empowering farmers with sustainable practices and modern techniques.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-emerald-400 mr-2" />
                <span className="text-gray-300">Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-emerald-400 mr-2" />
                <span className="text-gray-300">+977 9823405140</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-emerald-400 mr-2" />
                <a href="mailto:info@krishihimalaya.com" className="text-gray-300 hover:text-emerald-400 transition duration-300">
                  info@krishihimalaya.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    className="text-gray-300 hover:text-emerald-400 transition duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Social Media and Map */}
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://wa.me/9779823405140"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition duration-300 text-2xl"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61572480220650"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition duration-300 text-2xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="mailto:info@krishihimalaya.com"
                className="text-gray-400 hover:text-emerald-400 transition duration-300 text-2xl"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
            <div className="center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14158.627288958289!2d84.83812968304882!3d27.47994137693333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994c90007a70f09%3A0x370a576d09ff0ad0!2sHimalaya%20Krishi%20Tatha%20Pasupalan%20Farm!5e0!3m2!1sne!2snp!4v1741707048886!5m2!1sne!2snp"
                width="150"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center text-gray-500 mt-8">
          © 2023 Himalaya Krishi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;