import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBlog, FaEnvelope, FaTachometerAlt } from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-white to-blue-200">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a2236] text-white flex flex-col py-8 px-4 shadow-lg">
        <h1 className="text-2xl font-extrabold tracking-wide text-center mb-10">VMO AERO ADMIN</h1>
        <nav className="flex flex-col gap-4 flex-1">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            <FaTachometerAlt className="text-xl" /> Dashboard
          </Link>
          <Link
            to="/admin/blogs"
            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            <FaBlog className="text-xl" /> Manage Blogs
          </Link>
          <Link
            to="/admin/newsletters"
            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
          >
            <FaEnvelope className="text-xl" /> See Newsletter List
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors duration-200 w-full"
        >
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg px-8 py-12 w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-2 text-blue-800 text-center tracking-tight">Welcome to VMO AERO Admin Panel</h2>
          <p className="text-gray-600 mb-8 text-center max-w-lg mx-auto">
            This is your admin dashboard. You can manage your website content from here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 