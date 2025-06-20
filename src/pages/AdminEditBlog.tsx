import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditBlog: React.FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('adminBlogs');
    const blogs = stored ? JSON.parse(stored) : [];
    const blog = blogs.find((b: any) => b.id === id);
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('adminBlogs');
    let blogs = stored ? JSON.parse(stored) : [];
    blogs = blogs.map((b: any) =>
      b.id === id ? { ...b, title, content } : b
    );
    localStorage.setItem('adminBlogs', JSON.stringify(blogs));
    navigate('/admin/blogs');
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Content</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={8}
            required
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Update</button>
      </form>
    </div>
  );
};

export default AdminEditBlog; 