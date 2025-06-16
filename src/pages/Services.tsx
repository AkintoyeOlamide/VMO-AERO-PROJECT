import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Plane, Settings, Wrench, DollarSign, Shield, ChevronRight, ShoppingCart, Lightbulb } from 'lucide-react';

const Services: React.FC = () => {
  const [titleText, setTitleText] = useState('');
  const title = 'Our Services';
  const [titleIndex, setTitleIndex] = useState(0);
  const [typingSpeed] = useState(100);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
          setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  const services = [
    {
      id: 'flight-ops',
      icon: <Settings className="w-8 h-8" />,
      title: "Flight Operations Management",
      description: "We manage every aspect of flight operations to ensure smooth, safe, and efficient travel...",
      features: [
        "Flight planning and monitoring",
        "Fuel release services",
        "Ground support service",
        "Aircraft slot and parking arrangements",
        "Permit and clearance processing",
        "Protocol services",
        "Aircraft, crew and passenger handling",
        "Catering arrangements",
        "Aircraft Charter Service"
      ]
    },
    {
      id: 'maintenance',
      icon: <Wrench className="w-8 h-8" />,
      title: "Maintenance Oversight",
      description: "Keep your aircraft performing at its peak. With proactive management, we handle all maintenance actions from scheduled and non scheduled inspections, ensuring the highest standards of safety and performance."
    },
    {
      id: 'commercial',
      icon: <DollarSign className="w-8 h-8" />,
      title: "Commercial Management",
      description: "Unlock the full financial potential of your aircraft. By identifying profitable charter opportunities, optimizing usage, and enhancing overall efficiency, we ensure your aircraft works as a valuable asset."
    },
    {
      id: 'compliance',
      icon: <Shield className="w-8 h-8" />,
      title: "Regulatory Compliance",
      description: "We ensure your aircraft remains fully compliant with all industry regulations, managing every legal requirement to guarantee safety and adherence to aviation laws."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-navy">
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
            Comprehensive aircraft management solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Total Aircraft Management Section */}
      <section className="py-20 bg-gray-50 group">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Total Aircraft Management Header */}
          <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center justify-center mb-8 bg-white p-4 rounded-full shadow-lg">
              <Plane className="w-12 h-12 text-gold" style={{ animation: 'breathing 3s ease-in-out infinite' }} />
            </div>
            <h2 className="text-4xl font-light text-navy mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Total Aircraft Management
            </h2>
            <p className="text-navy/80 max-w-3xl mx-auto font-light leading-relaxed">
              Managing an aircraft can be overwhelming, that is where we come in. We handle all aspects of your aircraft's operation, ensuring efficiency, safety, and compliance, allowing you to focus on other priorities.
            </p>
          </div>

          {/* Services Grid - hidden until hover */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 h-0 pointer-events-none group-hover:opacity-100 group-hover:h-auto group-hover:pointer-events-auto transition-all duration-500">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`group relative bg-navy rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-8 relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-white rounded-lg mr-4 group-hover:bg-gold/20 transition-colors duration-300">
                        <div className="text-gold group-hover:text-white transition-colors duration-300" style={{ animation: 'breathing 3s ease-in-out infinite' }}>
                    {service.icon}
                  </div>
                      </div>
                      <h3 className="text-2xl font-light text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    {service.title}
                  </h3>
                </div>
                    <ChevronRight className={`w-6 h-6 text-gold transform transition-transform duration-300 ${activeService === service.id ? 'translate-x-2' : ''}`} />
                  </div>
                  <p className="text-silver font-light leading-relaxed mb-6">
                  {service.description}
                </p>
                {service.features && (
                    <div className={`space-y-3 transition-all duration-300 ${activeService === service.id ? 'opacity-100' : 'opacity-0 h-0'}`}> 
                    {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-silver-light transform hover:translate-x-2 transition-transform duration-300">
                        <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                        {feature}
                        </div>
                    ))}
                    </div>
                )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aircraft Acquisition Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="inline-flex items-center justify-center mb-8 bg-white p-4 rounded-full shadow-lg">
              <Plane className="w-12 h-12 text-gold" style={{ animation: 'breathing 3s ease-in-out infinite' }} />
            </div>
            <h2 className="text-4xl font-light text-navy mb-6 transition-all duration-300 group-hover:text-gold group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Aircraft Acquisition and Sales Support
            </h2>
            <p className="text-navy/80 max-w-3xl mx-auto font-light leading-relaxed">
              We streamline the complexities of aircraft acquisition and sales, providing expert guidance every step of the way. Our team helps you make well-informed decisions, ensuring the best possible outcomes for your investment.
            </p>
          </div>
        </div>
      </section>

      {/* Consultancy Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1200ms' }}>
            <div className="inline-flex items-center justify-center mb-8 bg-white p-4 rounded-full shadow-lg">
              <Lightbulb className="w-12 h-12 text-gold" style={{ animation: 'breathing 3s ease-in-out infinite' }} />
            </div>
            <h2 className="text-4xl font-light text-navy mb-6 transition-all duration-300 group-hover:text-gold group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Consultancy and Advisory Services
          </h2>
            <p className="text-navy/80 max-w-3xl mx-auto font-light leading-relaxed">
              Our consultancy services provide tailored solutions and strategic guidance, empowering you to navigate the aviation industry with confidence and well-informed decisions.
          </p>
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes breathing {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Services; 