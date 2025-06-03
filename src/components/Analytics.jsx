import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Track page views
        if (typeof gtag !== 'undefined') {
            gtag('config', 'AW-10889142294', {
                page_path: location.pathname + location.search,
                page_title: document.title,
            });
        }
    }, [location]);

    return null;
};

export default Analytics;
