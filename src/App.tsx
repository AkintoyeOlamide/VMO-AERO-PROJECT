import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminBlogList from './pages/AdminBlogList';
import AdminCreateBlog from './pages/AdminCreateBlog';
import AdminEditBlog from './pages/AdminEditBlog';
import AdminNewsletterList from './pages/AdminNewsletterList';

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

  const adminPaths = [
    '/admin/login',
    '/admin/dashboard',
    '/admin/blogs',
    '/admin/blogs/create',
  ];
  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-navy text-silver">
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <AdminProtectedRoute>
              <AdminBlogList />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs/create"
          element={
            <AdminProtectedRoute>
              <AdminCreateBlog />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs/edit/:id"
          element={
            <AdminProtectedRoute>
              <AdminEditBlog />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/newsletters"
          element={
            <AdminProtectedRoute>
              <AdminNewsletterList />
            </AdminProtectedRoute>
          }
        />
        {/* Main Site Routes */}
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
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/" element={<Navigate to="/admin/login" replace />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;