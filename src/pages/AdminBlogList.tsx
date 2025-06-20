import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Blog {
  id: string;
  title: string;
  content: string;
}

const AdminBlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('adminBlogs');
    setBlogs(stored ? JSON.parse(stored) : []);
  }, []);

  const handleDelete = (id: string) => {
    const updated = blogs.filter(blog => blog.id !== id);
    setBlogs(updated);
    localStorage.setItem('adminBlogs', JSON.stringify(updated));
  };

  return (
    <div className="p-8 min-h-screen bg-navy">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-white tracking-wide">Manage Blogs</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors duration-200"
          onClick={() => navigate('/admin/blogs/create')}
        >
          + Create Blog
        </button>
      </div>
      <div className="bg-[#1a2236] rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-lg font-bold text-white border-b border-gray-700">Title</th>
              <th className="py-3 px-4 text-left text-lg font-bold text-white border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center py-8 text-white/80 text-lg">No blogs found.</td>
              </tr>
            )}
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td className="py-3 px-4 text-white border-b border-gray-700">{blog.title}</td>
                <td className="py-3 px-4 border-b border-gray-700">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-colors duration-200"
                    onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                  >Edit</button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
                    onClick={() => handleDelete(blog.id)}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogList; 