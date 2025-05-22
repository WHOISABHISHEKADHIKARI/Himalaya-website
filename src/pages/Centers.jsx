import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Centers = () => {
  const { centerName } = useParams();
  
  useEffect(() => {
    // Reset scroll position to top when component mounts
    window.scrollTo(0, 0);
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