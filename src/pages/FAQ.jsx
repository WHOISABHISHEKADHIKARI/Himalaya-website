import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LinkedInProfile from '../components/LinkedInProfile';
import LoadingSpinner from '../components/LoadingSpinner';

const FAQ = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  const faqs = [
    {
      question: "What is organic farming and why is it important in Nepal?",
      answer: "Organic farming is a method of agriculture that avoids the use of synthetic fertilizers and pesticides. In Nepal, it's crucial for preserving soil health, protecting biodiversity, and producing healthier food while maintaining traditional farming practices."
    },
    {
      question: "How does Himalaya Krishi support local farmers?",
      answer: "We provide comprehensive support through training programs, organic certification assistance, market access, and technical guidance. Our network connects over 1000 farmers with sustainable agricultural practices."
    },
    {
      question: "What types of organic products do you offer?",
      answer: "We offer a wide range of certified organic products including vegetables, fruits, grains, spices, and dairy products. All our products are grown using sustainable farming methods in the pristine Himalayan region."
    },
    {
      question: "How can I get organic certification through Himalaya Krishi?",
      answer: "Our organic certification support service includes initial assessment, documentation guidance, compliance training, and ongoing support throughout the certification process. We help farmers meet both national and international organic standards."
    },
    {
      question: "What sustainable farming techniques do you teach?",
      answer: "We teach various sustainable farming techniques including crop rotation, composting, natural pest management, water conservation, soil fertility management, and integrated farming systems. Our methods combine traditional knowledge with modern organic farming practices."
    }
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Frequently Asked Questions - Himalaya Krishi</title>
        <meta name="description" content="Find answers to common questions about organic farming, certification, and sustainable agriculture practices at Himalaya Krishi." />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.question}
              </h2>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600">
            Contact us directly for more information about our services and how we can help you with sustainable farming.
          </p>
          <LinkedInProfile />
        </div>
      </div>
    </div>
  );
};

export default FAQ;