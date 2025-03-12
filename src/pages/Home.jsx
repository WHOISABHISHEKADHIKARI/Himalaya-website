import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const ActionButton = ({ text, link, isExternal, variant = "primary" }) => {
  const styles = {
    base: "flex items-center gap-3 px-8 py-4 rounded-full text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95 group relative overflow-hidden hover:-translate-y-1",
    primary: "bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-white hover:from-emerald-600 hover:via-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-500/30 animate-float",
    secondary: "border-2 border-white text-white hover:border-emerald-400 hover:text-emerald-400",
  };

  if (isExternal) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.base} ${styles[variant]}`}
      >
        <span className="relative z-10 font-semibold tracking-wide group-hover:tracking-wider transition-all">{text}</span>
        <FaArrowRight className="transition-all duration-300 transform group-hover:translate-x-3 group-hover:scale-110 relative z-10 animate-bounce-x" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-size-200 animate-shimmer" />
      </a>
    );
  }

  return (
    <Link
      to={link}
      className={`${styles.base} ${styles[variant]}`}
    >
      <span className="relative z-10 font-semibold tracking-wide group-hover:tracking-wider transition-all">{text}</span>
      <FaArrowRight className="transition-all duration-300 transform group-hover:translate-x-3 group-hover:scale-110 relative z-10 animate-bounce-x" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-size-200 animate-shimmer" />
    </Link>
  );
};

// Add these to your tailwind.config.js extend section:
// animation: {
//   'float': 'float 3s ease-in-out infinite',
//   'bounce-x': 'bounceX 1s infinite',
//   'shimmer': 'shimmer 2s linear infinite',
// },
// keyframes: {
//   float: {
//     '0%, 100%': { transform: 'translateY(0)' },
//     '50%': { transform: 'translateY(-5px)' }
//   },
//   bounceX: {
//     '0%, 100%': { transform: 'translateX(0)' },
//     '50%': { transform: 'translateX(3px)' }
//   },
//   shimmer: {
//     '0%': { backgroundPosition: '200% 0' },
//     '100%': { backgroundPosition: '-200% 0' }
//   }
// }

// Add this to your tailwind.config.js extend section:
// animation: {
//   'bounce-gentle': 'bounce 3s infinite',
//   'gradient': 'gradient 3s linear infinite',
//   'pulse': 'pulse 2s infinite',
// },
// keyframes: {
//   gradient: {
//     '0%, 100%': { backgroundPosition: '0% 50%' },
//     '50%': { backgroundPosition: '100% 50%' },
//   }
// },
// backgroundSize: {
//   'size-200': '200% 200%',
// }

const Home = () => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setVideoError(true));
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Media */}
      {videoError ? (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/image/imag1.jpeg')" }} />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src="/assets/video/farmvideo.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-white px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold animate-fade-in-down">Welcome to Our Farm</h1>
        <p className="text-lg md:text-xl mt-4 opacity-80 animate-fade-in-up delay-300">
          Experience the beauty and tranquility of our farm
        </p>
        <div className="mt-8 animate-fade-in delay-500">
          <Link
            to="/about"
            //kidiing
            className="flex items-center gap-3 px-8 py-4 rounded-full text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95 group relative overflow-hidden hover:-translate-y-1 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-white hover:from-emerald-600 hover:via-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-500/30 animate-float"
          >
            <span className="relative z-10 font-semibold tracking-wide group-hover:tracking-wider transition-all">Learn More</span>
            <FaArrowRight className="transition-all duration-300 transform group-hover:translate-x-3 group-hover:scale-110 relative z-10 animate-bounce-x" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-size-200 animate-shimmer" />
          </Link>
        </div>
      </div>


    </div>
  );
};

export default Home;
