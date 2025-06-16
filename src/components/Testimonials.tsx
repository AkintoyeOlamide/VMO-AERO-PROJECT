import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/testimonials';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="testimonials" className="pt-4 pb-12 bg-white relative">
      <div className="absolute inset-0 bg-pattern opacity-40"></div>
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-1">
          <h2 className="font-display text-3xl md:text-4xl font-light text-navy text-center mb-1 animate-fade-in" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Client Experiences
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-navy text-center mb-12 font-light animate-fade-in" style={{ animationDelay: '200ms' }}>
            Discover what our clients say about their Charter experience
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-full">
                    <blockquote className="bg-navy-light p-8 md:p-10 rounded-sm shadow-lg border border-gold/10">
                      <div className="flex items-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-gold fill-gold' : 'text-silver'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-silver-light text-base md:text-lg italic mb-6 font-light">"{testimonial.text}"</p>
                      {testimonial.name && (
                        <div className="text-right mb-2">
                          <span className="text-gold font-semibold text-base">- {testimonial.name}</span>
                        </div>
                      )}
                      <div className="text-right">
                        <p className="text-silver">{testimonial.title}</p>
                      </div>
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevTestimonial}
              className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 bg-navy-light text-silver-light p-2 rounded-full shadow-lg hover:text-gold transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 bg-navy-light text-silver-light p-2 rounded-full shadow-lg hover:text-gold transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-gold w-6' : 'bg-silver'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;