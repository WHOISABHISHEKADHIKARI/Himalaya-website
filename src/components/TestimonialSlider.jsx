import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import testimonial images
import ekrajVisit2 from '../assets/image/ekraj-visit-2.webp';
import arunRajVisit from '../assets/image/Arun Raj Sumargi visit.png';
import hariHarVisit from '../assets/image/Hari Har Vist1.jpg';
import hetaudaVisit from '../assets/image/Hetauda Enterpenure viist on mudfest.jpg';

const testimonialData = [
  {
    image: ekrajVisit2,
    name: "Ekraj Upreti",
    role: "Ex. Municipality Chief, Manahari",
    position: "Counceller of Sanakisan Bank / Sankaisan Sahakari",
    quote: "When I visited the Himalaya Krishi Farm, I noticed that young and energetic individuals were actively transforming agriculture. However, I felt that there is a need to modernize and professionalize the approach while maintaining traditional methods. This could help the farm become a model that represents Manahari and promote organic farming practices. Overall, I believe that this farm has the potential to improve the local agricultural situation by incorporating modern techniques and focusing on organic farming. There are many other aspects to explore here, which you can witness by visiting."
  },
  {
    name: "Arun Raj Sumargi",
    role: "Social Activist",
    quote: "As a Social Activist, I have witnessed firsthand the transformative impact of Himalaya Krishi's sustainable farming initiatives. Their approach to organic agriculture is setting new standards for rural development.",
    image: arunRajVisit
  },
  {
    name: "Hari Har Adhikari",
    role: "Agricultural Scientists",
    quote: "From a scientific perspective, Himalaya Krishi's integration of traditional knowledge with modern agricultural techniques is remarkable. Their research-based approach to organic farming is contributing significantly to sustainable agriculture development.",
    image: hariHarVisit
  },
  {
    name: "Hetauda Entrepreneurs",
    role: "Business Leaders & Community Developers",
    quote: "The entrepreneurial spirit fostered by Himalaya Krishi during our visit to the mud festival was truly inspiring. Their innovative approach to sustainable agriculture and community engagement demonstrates exceptional leadership in rural development.",
    image: hetaudaVisit
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let testimonialInterval;
    if (isAutoPlaying && !isPaused) {
      testimonialInterval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000);
    }
    return () => clearInterval(testimonialInterval);
  }, [isAutoPlaying, isPaused]);



  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1;
    });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full"
        >
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <img
                  src={testimonialData[currentIndex].image}
                  alt={testimonialData[currentIndex].name}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 text-gray-300 mb-4 mx-auto md:mx-0"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-lg text-gray-600 italic mb-6">{testimonialData[currentIndex].quote}</p>
                  <div className="font-semibold text-xl text-gray-900 mb-1">{testimonialData[currentIndex].name}</div>
                  <div className="text-gray-600">{testimonialData[currentIndex].role}</div>
                  {testimonialData[currentIndex].position && (
                    <div className="text-gray-500 text-sm mt-1">{testimonialData[currentIndex].position}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 right-4 flex justify-between z-10">
        <button
          onClick={() => paginate(-1)}
          className="bg-white/80 backdrop-blur-sm rounded-full p-3 text-gray-800 hover:bg-white transition-all duration-200 shadow-lg"
          aria-label="Previous testimonial"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="bg-white/80 backdrop-blur-sm rounded-full p-3 text-gray-800 hover:bg-white transition-all duration-200 shadow-lg"
            aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoPlaying ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => paginate(1)}
            className="bg-white/80 backdrop-blur-sm rounded-full p-3 text-gray-800 hover:bg-white transition-all duration-200 shadow-lg"
            aria-label="Next testimonial"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {testimonialData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gray-800 scale-125' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;