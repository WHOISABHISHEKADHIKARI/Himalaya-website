import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  
  return (
    <div>
      <Helmet>
        <title>{centerName} Center - Himalaya Krishi</title>
        <meta name="description" content="Empowering farmers with sustainable practices and support at our centers." />
      </Helmet>
      {/* Add your component content here */}
    </div>
  );
};

export default Centers;