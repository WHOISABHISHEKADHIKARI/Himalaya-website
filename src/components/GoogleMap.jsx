import React from 'react';
import { Helmet } from 'react-helmet-async';

const GoogleMap = () => (
  <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "हिमालय कृषि तथा पशुपालन फार्म | Himalaya Krishi Tatha Pasupalan Farm",
          "image": "https://krishihimalaya.com/assets/images/farm-aerial.jpg",
          "description": "नेपालको अग्रणी जैविक कृषि केन्द्र, मनहरी-५ मा अवस्थित | Leading organic agriculture center located in Manahari-5, Nepal",
          "@id": "https://krishihimalaya.com",
          "url": "https://krishihimalaya.com",
          "telephone": "+977-9823405140",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "मनहरी-५ | Manahari-5",
            "addressLocality": "मनहरी | Manahari",
            "addressRegion": "मकवानपुर | Makwanpur",
            "postalCode": "44200",
            "addressCountry": "NP"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "27.479941",
            "longitude": "84.838129"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
          }
        })}
      </script>
    </Helmet>

    <div 
      className="map-container relative overflow-hidden rounded-lg shadow-lg"
      role="region"
      aria-label="हिमालय कृषि फार्मको स्थान | Himalaya Krishi Farm Location"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14158.627288958289!2d84.83812968304882!3d27.47994137693333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994c90007a70f09%3A0x370a576d09ff0ad0!2sHimalaya%20Krishi%20Tatha%20Pasupalan%20Farm!5e0!3m2!1sne!2snp!4v1741707048886!5m2!1sne!2snp"
        className="w-full h-40 md:h-60 lg:h-80"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="हिमालय कृषि फार्म नक्सा | Himalaya Krishi Farm Map"
        aria-label="हिमालय कृषि फार्मको गुगल नक्सा | Google Maps showing Himalaya Krishi Farm location"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
        <p className="text-white text-sm">
          <span lang="ne">ठेगाना: मनहरी-५, मकवानपुर, नेपाल</span>
          <span className="mx-2">|</span>
          <span lang="en">Address: Manahari-5, Makwanpur, Nepal</span>
        </p>
      </div>
    </div>
  </>
);

export default GoogleMap;