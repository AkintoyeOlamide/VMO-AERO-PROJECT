import React from 'react';
import { blogPosts } from '../data/blog';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const extendedBlogPosts = [
    ...blogPosts,
    ...blogPosts.map((post, idx) => ({ ...post, id: blogPosts.length + idx + 1 })),
    ...blogPosts.map((post, idx) => ({ ...post, id: blogPosts.length * 2 + idx + 1 }))
  ];

  // Only show the first 3 posts on the landing page
  const postsToShow = extendedBlogPosts.slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-light text-navy mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Luxury Travel Insights
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-700">
            Explore our curated content on private aviation, luxury destinations, and exclusive travel experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {postsToShow.map((post) => (
            <article 
              key={post.id} 
              className="group bg-navy-light border border-gold/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold/5"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-gold text-navy px-3 py-1 text-xs font-semibold uppercase">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-light text-white mb-3 group-hover:text-gold transition-colors duration-300" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  {post.title}
                </h3>
                <p className="text-silver text-sm mb-4 font-light">{post.date}</p>
                <p className="text-white mb-4 line-clamp-3 font-light">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-gold hover:text-gold-light transition-colors duration-300"
                >
                  Read more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;