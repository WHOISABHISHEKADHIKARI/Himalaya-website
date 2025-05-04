import React from 'react';

const FAQ = () => {
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
      question: "How can farmers join your organic farming program?",
      answer: "Farmers can join our program by contacting our local representatives or visiting our office. We provide initial assessment, training, and ongoing support throughout the organic transition process."
    },
    {
      question: "What is the certification process for organic products?",
      answer: "Our certification process involves thorough inspection of farming practices, soil testing, and documentation review. We follow international organic standards while considering local agricultural conditions."
    },
    {
      question: "How do you ensure the quality of organic products?",
      answer: "We maintain strict quality control through regular farm inspections, product testing, and adherence to organic certification standards. Our traceability system ensures transparency from farm to market."
    },
    {
      question: "What are the benefits of choosing Himalaya Krishi organic products?",
      answer: "Our products are 100% organic, support local farmers, promote sustainable agriculture, and contribute to environmental conservation. They're also fresher and maintain higher nutritional value."
    },
    {
      question: "Do you provide training for organic farming techniques?",
      answer: "Yes, we offer comprehensive training programs covering organic farming methods, pest management, soil health, water conservation, and post-harvest handling techniques."
    },
    {
      question: "How does organic farming contribute to environmental conservation?",
      answer: "Organic farming helps preserve biodiversity, improves soil health, reduces water pollution, and promotes sustainable resource use. It also helps in carbon sequestration and climate change mitigation."
    },
    {
      question: "What makes Himalayan organic products unique?",
      answer: "Himalayan organic products are grown in pristine environments with pure mountain water, rich soil, and traditional farming wisdom. The unique geographical conditions contribute to their superior quality and taste."
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;