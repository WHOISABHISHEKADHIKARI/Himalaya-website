import React from 'react';
import { Link } from 'react-router-dom';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-emerald-800 mb-8">
          Under Maintenance
        </h1>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 mb-8">
          We're currently updating our systems to serve you better. Please check back soon.
        </p>
        <div className="space-y-4">
          <p className="text-gray-500">
            For urgent inquiries, please contact us:
          </p>
          <div className="space-y-2 text-emerald-700">
            <p>📞 +977-9823405140</p>
            <p>✉️ info@krishihimalaya.com</p>
            <p>📍 Manahari-5, Makwanpur, Nepal</p>
          </div>
        </div>
        <Link 
          to="/"
          className="inline-block mt-8 px-8 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all transform hover:-translate-y-1"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Maintenance;