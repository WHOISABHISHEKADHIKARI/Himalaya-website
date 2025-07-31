import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import LoadingSpinner from '../components/LoadingSpinner';

const Centers = () => {
  const { centerName } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7]">
      <SEOHelmet />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#1C4E37] mb-6">{centerName} Center</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600">Content for {centerName} center will be available soon.</p>
        </div>
      </div>
    </div>
  );
};

export default Centers;