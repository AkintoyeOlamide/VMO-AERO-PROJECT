import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Blog from '../components/Blog';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../data/blog';

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === Number(id));
  if (!post) return <div className="text-center py-20 text-silver">Blog post not found.</div>;
  return (
    <div className="min-h-screen bg-navy text-silver">
      <Header />
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/headerimg.jpg" 
            alt="Header cover" 
            className="w-full h-full object-cover opacity-40 animate-fade-in"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 animate-slide-up" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            {post.title}
          </h1>
          <p className="text-xl text-silver max-w-3xl mx-auto font-light animate-slide-up" style={{ animationDelay: '200ms' }}>
            {post.date} &mdash; {post.category}
          </p>
        </div>
      </section>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div className="text-silver text-lg font-light whitespace-pre-line">
          {post.content}
        </div>
      </main>
    </div>
  );
};

const BlogPage: React.FC = () => {
  const [titleText, setTitleText] = useState('');
  const title = 'Our Blog';
  const [titleIndex, setTitleIndex] = useState(0);
  const [typingSpeed] = useState(100);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
      if (titleIndex < title.length) {
        setTitleText(title.substring(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
        } else {
          // Start deleting after a pause
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      } else {
        if (titleIndex > 0) {
          setTitleText(title.substring(0, titleIndex - 1));
          setTitleIndex(titleIndex - 1);
        } else {
          // Start typing again after a pause
          setIsDeleting(false);
          setTimeout(() => {
            setTitleIndex(0);
          }, 500);
        }
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [titleIndex, title, typingSpeed, isDeleting]);

  return (
    <div className="min-h-screen bg-navy text-silver">
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/headerimg.jpg" 
            alt="Header cover" 
            className="w-full h-full object-cover opacity-40 animate-fade-in"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 min-h-[4rem] tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            {titleText}
          </h1>
          <p className="text-xl text-silver max-w-3xl mx-auto font-light animate-slide-up" style={{ animationDelay: '200ms' }}>
            Insights, news, and stories from the world of private aviation and luxury travel
          </p>
        </div>
      </section>
      <main>
        <Blog />
      </main>
    </div>
  );
};

export { BlogPage, BlogDetails }; 