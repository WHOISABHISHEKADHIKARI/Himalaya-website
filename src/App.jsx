import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Maintenance from './pages/Maintenance';
import Vision from './pages/Vision';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" />
        <meta name="description" content="Discover premium organic farming solutions with Himalaya Krishi. Leading Nepal's agricultural transformation with sustainable practices, quality products, and expert guidance." />
        <meta name="keywords" content="organic farming, Nepal agriculture, Himalaya Krishi, sustainable farming" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Manahari-5" />
        <link rel="alternate" href="https://himalayakrishi.com" hreflang="en-NP" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
      </Helmet>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
