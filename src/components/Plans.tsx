import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { plans } from '../data/plans';
import { Link } from 'react-router-dom';

const Plans: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="plans" className="section-padding bg-navy-light relative">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Premium Jet Plans
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-silver">
            Select the perfect membership plan for your private aviation needs. 
            Each plan offers exceptional service tailored to different flight requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={plan.id} className="flex flex-col items-center">
              <div 
                className={`relative bg-navy p-8 rounded-sm border border-gold/20 transition-all duration-300 flex-grow w-full text-center ${
                  hoveredIndex === index ? 'transform -translate-y-2 shadow-lg shadow-gold/10' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Jet Image */}
                <div className="relative h-64 -mx-8 -mt-8 mb-8 overflow-hidden">
                  <img 
                    src={plan.image} 
                    alt={`${plan.name} Jet`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy"></div>
                </div>

                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gold text-navy-dark px-4 py-1 text-xs font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-display text-2xl font-light text-white mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{plan.name}</h3>
                <p className="text-silver text-sm mb-4 font-light">{plan.description}</p>
                <ul className="space-y-2 flex flex-col items-center">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="text-gold flex-shrink-0 w-4 h-4 mr-2 mt-0.5" />
                      <span className="text-silver-light text-sm font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                to="/fleet"
                className={`mt-6 py-2 px-6 text-sm rounded-sm flex items-center justify-center max-w-[200px] ${
                  plan.featured 
                    ? 'bg-gold text-navy-dark font-semibold hover:bg-gold-light' 
                    : 'border border-gold/60 text-gold hover:bg-gold/10'
                } transition-colors duration-300`}
              >
                View More <ChevronRight className="ml-2 w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="font-display text-2xl font-light text-white mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Need a custom solution for your business?
          </p>
          <button className="btn-secondary">Contact our sales team</button>
        </div>
      </div>
    </section>
  );
};

export default Plans;