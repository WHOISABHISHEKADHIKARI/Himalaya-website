import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

const ActionButton = ({ text, link, isExternal, variant = "primary" }) => {
  const styles = {
    base: "flex items-center gap-3 px-6 py-3 rounded-full text-lg font-medium transition-transform transform hover:scale-105",
    primary: "bg-emerald-500 text-white hover:bg-emerald-600",
    secondary: "border border-white text-white hover:border-emerald-400 hover:text-emerald-400",
  };

  return (
    <button
      onClick={() => (isExternal ? window.open(link, "_blank") : (window.location.href = link))}
      className={`${styles.base} ${styles[variant]}`}
    >
      <span>{text}</span>
      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
};

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
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Farm</h1>
        <p className="text-lg md:text-xl mt-4 opacity-80">Experience the beauty and tranquility of our farm</p>
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <ActionButton text="Chat on WhatsApp" link="https://wa.me/9779823405140" isExternal />
          <ActionButton text="Learn More" link="#about" variant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default Home;
