import React, { useState } from 'react';
import { faqs } from '../data/faqs';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Faqs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="pt-4 pb-12 bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-light text-navy mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-700">
            Find answers to common questions about our private jet services, membership plans, and booking process.
          </p>
        </div>
        
        <div className="mx-auto w-full md:max-w-6xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={faq.id}
                className="border border-gold/10 rounded-sm overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left bg-navy-dark hover:bg-navy-light transition-colors duration-300"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="font-display text-base font-light text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gold" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gold" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-4 text-silver bg-navy mt-2 font-light text-sm font-poppins">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-navy mb-4">Can't find what you're looking for?</p>
          <Link to="/contact" className="bg-gold text-black px-6 py-2 rounded font-semibold shadow hover:bg-gold/90 transition-colors duration-300">
            Contact our support team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Faqs;