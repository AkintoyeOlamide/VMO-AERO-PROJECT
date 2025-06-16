import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import Faqs from './components/Faqs';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Fleet from './pages/Fleet';
import { BlogPage, BlogDetails } from './pages/Blog';
import Team from './pages/Team';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NewsletterPopup from './components/NewsletterPopup';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings';

const App: React.FC = () => {
  const location = useLocation();
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => setShowNewsletter(true), 10000);
      return () => clearTimeout(timer);
    } else {
      setShowNewsletter(false);
    }
  }, [location.pathname]);

  const handleCloseNewsletter = () => {
    setShowNewsletter(false);
  };

  return (
    <div className="min-h-screen bg-navy text-silver">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <div className="bg-white">
                <Stats />
                <Blog />
                <Testimonials />
                <Faqs />
              </div>
              {showNewsletter && <NewsletterPopup onClose={handleCloseNewsletter} />}
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;