import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['News', 'Tips', 'Announcements', 'Events', 'Updates'];

const AdminCreateBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog = {
      id: Date.now().toString(),
      title,
      content,
      category,
      image,
    };
    const stored = localStorage.getItem('adminBlogs');
    const blogs = stored ? JSON.parse(stored) : [];
    blogs.push(newBlog);
    localStorage.setItem('adminBlogs', JSON.stringify(blogs));
    navigate('/admin/blogs');
  };

  return (
    <div className="p-8 min-h-screen bg-navy flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#1a2236] rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">Create Blog</h2>
        <div className="mb-4">
          <label className="block mb-2 text-white font-semibold">Title</label>
          <input
            className="w-full border px-3 py-2 rounded text-black"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white font-semibold">Content</label>
          <textarea
            className="w-full border px-3 py-2 rounded text-black"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={8}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white font-semibold">Category</label>
          <select
            className="w-full border px-3 py-2 rounded text-black"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-white font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-white"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-4 rounded shadow max-h-48 mx-auto" />
          )}
        </div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded font-bold w-full hover:bg-blue-600 transition-colors duration-200" type="submit">Create</button>
      </form>
    </div>
  );
};

export default AdminCreateBlog; 