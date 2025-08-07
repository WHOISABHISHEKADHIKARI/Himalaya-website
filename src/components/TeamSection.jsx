import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import founderImage from '../assets/faces/founder.jpg';
import ownerImage from '../assets/faces/owner.jpg';
import managerImage from '../assets/faces/manager.jpeg';

const TeamSection = () => {
  return (
    <>
      <Helmet>
        <title>हाम्रो टीम | Our Team - Himalaya Krishi</title>
        <meta name="description" content="हिमालय कृषि तथा पशुपालन फार्मको विशेषज्ञ टीमसँग भेट्नुहोस्। Meet our expert team at Himalaya Krishi, leading Nepal's organic farming revolution." />
        <meta name="keywords" content="कृषि विशेषज्ञ नेपाल, agriculture experts nepal, organic farming specialists, जैविक खेती विशेषज्ञ" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Himalaya Krishi Team",
            "member": [
              {
                "@type": "Person",
                "name": "Thapa Prasad Adhikari",
                "jobTitle": "Co-Founder",
                "description": "Experienced agricultural pioneer with 50+ years in organic farming"
              },
              {
                "@type": "Person",
                "name": "Kedar Prasad Adhikari",
                "jobTitle": "Owner",
                "telephone": "+977-9845162511"
              },
              {
                "@type": "Person",
                "name": "Abhishek Adhikari",
                "jobTitle": "Manager",
                "telephone": "+977-9865412482",
                "email": "abhishekadhikari1254@gmail.com",
                "sameAs": ["https://www.linkedin.com/in/adheekariabhishek/"]
              }
            ]
          })}
        </script>
      </Helmet>

      <section className="py-16 md:py-24 bg-gray-100" itemScope itemType="https://schema.org/Organization">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-6" itemProp="name">
              हाम्रो टीम | Our Team
            </h1>
            <div className="w-24 h-1 bg-green-700 mx-auto mb-8"></div>
            <p className="text-lg text-stone-600" lang="ne">
              जैविक कृषि र पशुपालनमा हाम्रो विशेषज्ञ टीमको अनुभव र प्रतिबद्धता
            </p>
            <p className="text-lg text-stone-600">
              Meet the visionaries behind our journey of organic excellence
            </p>
          </div>

          {/* Rest of your team member cards remain the same, but add itemProp attributes */}
          <div className="max-w-3xl mx-auto mb-16 bg-white rounded-lg shadow-lg overflow-hidden" itemScope itemProp="member" itemType="https://schema.org/Person">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={founderImage}
                  alt="Thapa Prasad Adhikari - Co-Founder of Himalaya Krishi" 
                  className="w-full h-64 object-cover"
                  itemProp="image"
                  loading="lazy"
                />
              </div>
              {/* Continue with existing structure but add itemProp attributes */}
            </div>
          </div>

          {/* Similar updates for other team member cards */}
        </div>
      </section>
    </>
  );
};

export default TeamSection;