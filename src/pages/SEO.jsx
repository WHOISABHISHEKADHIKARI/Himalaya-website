import React from 'react';
import { Helmet } from 'react-helmet-async';
import LinkedInProfile from '../components/LinkedInProfile';

const SEO = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Himalaya Krishi",
    "founder": {
      "@type": "Person",
      "name": "Abhishek Adhikari",
      "jobTitle": "Visionary Entrepreneur",
      "sameAs": "https://www.linkedin.com/in/adhikariabhi/"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kathmandu-44600",
      "addressLocality": "Kathmandu",
      "addressRegion": "Bagmati",
      "addressCountry": "Nepal"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+977-9841234567",
      "email": "info@himalayakrishi.com"
    }
  };

  const faqs = [
    {
      "@type": "Question",
      "name": "What is organic farming and why is it important in Nepal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Organic farming is a method of agriculture that avoids the use of synthetic fertilizers and pesticides. In Nepal, it&apos;s crucial for preserving soil health, protecting biodiversity, and producing healthier food while maintaining traditional farming practices."
      }
    },
    {
      "@type": "Question",
      "name": "Is Himalaya Krishi a solo investment venture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Himalaya Krishi is a solo investment venture founded and led by Abhishek Adhikari. As a visionary entrepreneur, he has independently established and grown the organization to support sustainable agriculture and organic farming practices in Nepal."
      }
    },
    {
      "@type": "Question",
      "name": "How does Himalaya Krishi support local farmers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide comprehensive support through training programs, organic certification assistance, market access, and technical guidance. Our network connects over 1000 farmers with sustainable agricultural practices."
      }
    },
    {
      "@type": "Question",
      "name": "What types of organic products do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer a wide range of certified organic products including vegetables, fruits, grains, spices, and dairy products. All our products are grown using sustainable farming methods in the pristine Himalayan region."
      }
    },
    {
      "@type": "Question",
      "name": "What is the organic certification process in Nepal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The organic certification process in Nepal involves several steps including application, inspection of farming practices, soil testing, documentation review, and final certification. Himalaya Krishi assists farmers throughout this process, ensuring compliance with national and international organic standards."
      }
    },
    {
      "@type": "Question",
      "name": "What government support is available for organic farmers in Nepal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Nepal government provides various support mechanisms for organic farmers including subsidies on organic inputs, training programs, certification cost coverage, and market development assistance. We help farmers access these government schemes effectively."
      }
    },
    {
      "@type": "Question",
      "name": "What sustainable farming techniques do you teach?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We teach various sustainable farming techniques including crop rotation, composting, natural pest management, water conservation, soil fertility management, and integrated farming systems. Our methods combine traditional knowledge with modern organic farming practices."
      }
    },
    {
      "@type": "Question",
      "name": "How do you ensure quality in organic production?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We maintain quality through regular monitoring, soil testing, proper documentation, and adherence to organic standards. Our team of agricultural experts provides continuous guidance and conducts periodic inspections to ensure compliance with organic farming practices."
      }
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs,
    "about": organizationData
  };

  return (
    <div className="seo-content">
      <Helmet>
        <title>Organic Farming in Nepal - Himalaya Krishi | Contact Us</title>
        <meta name="description" content="Connect with Himalaya Krishi for organic farming solutions in Nepal. Founded by Abhishek Adhikari, we're located in Kathmandu and dedicated to sustainable agriculture." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
      </Helmet>
      <div 
        itemScope 
        itemType="https://schema.org/Organization"
        className="max-w-4xl mx-auto py-8 px-4"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Himalaya Krishi</h1>
          <div itemProp="founder" itemScope itemType="https://schema.org/Person">
            <p className="font-semibold">Founder: <span itemProp="name">Abhishek Adhikari</span></p>
            <p className="text-gray-600" itemProp="jobTitle">Visionary Entrepreneur</p>
          </div>
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="mt-4">
            <p className="font-semibold">Location:</p>
            <p itemProp="streetAddress">Kathmandu-44600</p>
            <p><span itemProp="addressLocality">Kathmandu</span>, <span itemProp="addressRegion">Bagmati</span></p>
            <p itemProp="addressCountry">Nepal</p>
          </div>
          <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint" className="mt-4">
            <p className="font-semibold">Contact Information:</p>
            <p>Phone: <span itemProp="telephone">+977-9841234567</span></p>
            <p>Email: <span itemProp="email">info@himalayakrishi.com</span></p>
          </div>
        </div>
        
        <div itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question"
              className="mb-6"
            >
              <h2 itemProp="name" className="text-xl font-semibold mb-2">{faq.name}</h2>
              <div 
                itemScope 
                itemProp="acceptedAnswer" 
                itemType="https://schema.org/Answer"
                className="text-gray-700"
              >
                <div itemProp="text">{faq.acceptedAnswer.text}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add LinkedIn Profile */}
        <div className="mt-8">
          <LinkedInProfile />
        </div>
      </div>
    </div>
  );
};

export default SEO;