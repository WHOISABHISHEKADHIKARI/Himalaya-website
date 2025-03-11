import React from 'react';

const TeamSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-6">Our Faces</h2>
          <div className="w-24 h-1 bg-green-700 mx-auto mb-8"></div>
          <p className="text-lg text-stone-600">
            Meet the visionaries behind our journey of organic excellence.
          </p>
        </div>
        
        {/* Co-Founder */}
        <div className="max-w-3xl mx-auto mb-16 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src="/assets/faces/founder.jpg" 
                alt="Thapa Prasad Adhikari" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-bold mb-2">Thapa Prasad Adhikari</h3>
              <p className="text-sm text-gray-600 mb-4">Co-Founder</p>
              <hr className="mb-4" />
              <p className="text-sm text-gray-600 italic mb-4">
                "I have no other option. As long as my interest and available resources allow, I find joy in working with soil and cow dung. Even now, at the age of 70, my mother herself is tending to the cattle. That is why one must keep working wherever life takes them."
              </p>
            </div>
          </div>
        </div>
        
        {/* Owner */}
        <div className="max-w-3xl mx-auto mb-16 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src="/assets/faces/owner.jpg" 
                alt="Kedar Prasad Adhikari" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-bold mb-2">Kedar Prasad Adhikari</h3>
              <p className="text-sm text-gray-600 mb-4">Owner</p>
              <hr className="mb-4" />
              <p className="text-sm text-gray-600 italic mb-4">
                "I have completed my degree in education, and even though various opportunities came my way, I chose to reflect on what society had given me at that time. I feel a responsibility to repay that debt, so I have immersed myself in the available resources and circumstances."
              </p>
              <div className="mt-4 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-700 font-medium">9845162511</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Manager */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src="/assets/faces/manager.jpg" 
                alt="Abhishek Adhikari" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-bold mb-2">Abhishek Adhikari</h3>
              <p className="text-sm text-gray-600 mb-4">Manager</p>
              <hr className="mb-4" />
              <p className="text-sm text-gray-600 italic mb-4">
                "With decades of experience in agriculture and farming, my journey has evolved beyond primary production into scaling, exporting, and branding our traditional business on a larger platform. From organic dairy to sustainable fertilizers, our focus is on quality, authenticity, and sustainability."
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700 font-medium">9865412482</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a3 3 0 004.24 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">abhishekadhikari1254@gmail.com</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <a href="https://www.linkedin.com/in/adheekariabhishek/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;