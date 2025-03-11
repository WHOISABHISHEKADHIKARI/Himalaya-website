import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import OurPlan from "./pages/Vision";  // Fixed typo in import path
import Contact from "./pages/Contact";
import { HelmetProvider } from 'react-helmet-async';
import FaviconHelmet from './components/FaviconHelmet';

// Create a wrapper component to conditionally render the footer
const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/landing';
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar isHomePage={isHomePage} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vision" element={<OurPlan />} /> {/* Updated route path */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <FaviconHelmet />
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
