import React, { useState, useEffect } from 'react';
import { Plane, Award, Users, Globe, Shield, Clock, Star, Target, Leaf, CheckCircle, ChevronRight, Lightbulb } from 'lucide-react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [titleText, setTitleText] = useState('');
  const title = 'About Us';
  const [titleIndex, setTitleIndex] = useState(0);
  const [typingSpeed] = useState(100);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: <Plane className="w-8 h-8 text-gold" />,
      value: "100%",
      label: "Safety Record"
    },
    {
      icon: <Award className="w-8 h-8 text-gold" />,
      value: "24/7",
      label: "Expert Support"
    },
    {
      icon: <Users className="w-8 h-8 text-gold" />,
      value: "Global",
      label: "Client Network"
    },
    {
      icon: <Globe className="w-8 h-8 text-gold" />,
      value: "100+",
      label: "Aircraft Managed"
    }
  ];

  const values = [
    {
      icon: <Star className="w-6 h-6 text-gold" />,
      title: "Innovation & Global Mindset",
      description: "We embrace innovation and maintain a global perspective to offer cutting edge solutions tailored to the evolving needs of our clients."
    },
    {
      icon: <Shield className="w-6 h-6 text-gold" />,
      title: "Safety",
      description: "Safety is at the heart of everything we do. We uphold the highest standards to ensure the well being of our clients and their aircraft."
    },
    {
      icon: <Leaf className="w-6 h-6 text-gold" />,
      title: "Operational Excellence & Sustainability",
      description: "We strive for operational excellence while prioritizing sustainability in every aspect of our service delivery."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-gold" />,
      title: "Accountability",
      description: "We take full responsibility for the services we provide, ensuring transparency and trust in every interaction."
    },
    {
      icon: <Clock className="w-6 h-6 text-gold" />,
      title: "Reliability",
      description: "Our clients trust us for consistent, dependable service that exceeds expectations and delivers results."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-navy">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
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
        </div>
      </section>

      {/* Vmo Aero Introduction Section */}
      <section className={`py-12 bg-gray-50 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-navy font-light leading-relaxed mb-6">
                At VMO Aero, we redefine the world of aircraft management with innovative solutions tailored to meet the unique needs of each client. From expert aircraft management to a luxurious, seamless flying experience, our dedicated team ensures that excellence is delivered at every step.
              </p>
              <p className="text-lg text-navy font-light leading-relaxed mb-6">
                We understand that no two clients are alike, which is why we utilize a bespoke approach to fulfill your specific requirements. From ensuring the highest standards of safety and efficiency to creating a comfortable and exceptional travel experience, VMO Aero is committed to making every journey seamless and memorable.
              </p>
              <p className="text-lg text-navy font-light leading-relaxed">
                Our experienced team handles every detail of your aircraft's operation, so you can trust that your aircraft is in capable hands. We guarantee a service driven by precision, personalization, and a relentless passion for excellence.
              </p>
            </div>
            <div className="relative h-[400px] rounded-sm overflow-hidden">
              <img 
                src="/airplaine3.jpg" 
                alt="VMO Aero Aircraft" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 animate-breathing"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards Section */}
      <section className={`py-20 bg-white transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div 
              className="group relative bg-navy rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-lg mr-4 group-hover:bg-gold/20 transition-colors duration-300">
                      <div className="text-gold group-hover:text-white transition-colors duration-300" style={{ animation: 'breathing 3s ease-in-out infinite' }}>
                        <Target className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      Vision
                    </h3>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gold transform transition-transform duration-300 group-hover:translate-x-2" />
                </div>
                <p className="text-gray-700 font-light text-base mb-8">
                  To become a leading global platform in the aviation industry that fosters connections, creates value and meets safety standards.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>

            <div 
              className="group relative bg-navy rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-lg mr-4 group-hover:bg-gold/20 transition-colors duration-300">
                      <div className="text-gold group-hover:text-white transition-colors duration-300" style={{ animation: 'breathing 3s ease-in-out infinite' }}>
                        <Star className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      Mission
                    </h3>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gold transform transition-transform duration-300 group-hover:translate-x-2" />
                </div>
                <p className="text-silver font-light leading-relaxed">
                  To provide an innovative, reliable, and easy to use platform that delivers exceptional services, setting standards on aircraft aviation management, commercial and operation solutions.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={`py-20 bg-white transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-light text-navy text-center mb-16 animate-fade-in" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Core Values <span className="text-gold">-</span> I-SOAR
          </h2>
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            <div 
              className="group relative bg-navy rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-lg mr-4 group-hover:bg-gold/20 transition-colors duration-300">
                      <div className="text-gold group-hover:text-white transition-colors duration-300" style={{ animation: 'breathing 3s ease-in-out infinite' }}>
                        <Lightbulb className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      I - Innovation & Global Mindset
                    </h3>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gold transform transition-transform duration-300 group-hover:translate-x-2" />
                </div>
                <p className="text-silver font-light leading-relaxed">
                  We embrace innovation and maintain a global perspective to offer cutting edge solutions tailored to the evolving needs of our clients.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>

            <div 
              className="group relative bg-navy rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-lg mr-4 group-hover:bg-gold/20 transition-colors duration-300">
                      <div className="text-gold group-hover:text-white transition-colors duration-300" style={{ animation: 'breathing 3s ease-in-out infinite' }}>
                        <Shield className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      S - Safety
                    </h3>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gold transform transition-transform duration-300 group-hover:translate-x-2" />
                </div>
                <p className="text-silver font-light leading-relaxed">
                  Safety is at the heart of everything we do. We uphold the highest standards to ensure the well being of our clients and their aircraft.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>

            <div 
              className="group relative bg-navy rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-lg mr-4 group-hover:bg-gold/20 transition-colors duration-300">
                      <div className="text-gold group-hover:text-white transition-colors duration-300" style={{ animation: 'breathing 3s ease-in-out infinite' }}>
                        <Leaf className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      O - Operational Excellence & Sustainability
                    </h3>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gold transform transition-transform duration-300 group-hover:translate-x-2" />
                </div>
                <p className="text-silver font-light leading-relaxed">
                  We strive for operational excellence while prioritizing sustainability in every aspect of our service delivery.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>

            <div 
              className="group relative bg-navy rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-lg mr-4 group-hover:bg-gold/20 transition-colors duration-300">
                      <div className="text-gold group-hover:text-white transition-colors duration-300" style={{ animation: 'breathing 3s ease-in-out infinite' }}>
                        <CheckCircle className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      A - Accountability
                    </h3>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gold transform transition-transform duration-300 group-hover:translate-x-2" />
                </div>
                <p className="text-silver font-light leading-relaxed">
                  We take full responsibility for the services we provide, ensuring transparency and trust in every interaction.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>

            <div 
              className="group relative bg-navy rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-lg mr-4 group-hover:bg-gold/20 transition-colors duration-300">
                      <div className="text-gold group-hover:text-white transition-colors duration-300" style={{ animation: 'breathing 3s ease-in-out infinite' }}>
                        <Clock className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      R - Reliability
                    </h3>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gold transform transition-transform duration-300 group-hover:translate-x-2" />
                </div>
                <p className="text-silver font-light leading-relaxed">
                  Our clients trust us for consistent, dependable service that exceeds expectations and delivers results.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 bg-white transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-light text-navy mb-6 animate-fade-in" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Ready to Experience Excellence?
          </h2>
          <p className="text-navy mb-8 max-w-2xl mx-auto font-light animate-fade-in" style={{ animationDelay: '200ms' }}>
            Let us handle your aircraft management needs with precision and expertise.
          </p>
          <Link to="/services" className="btn-primary transform hover:scale-105 transition-transform duration-300 animate-fade-in inline-block" style={{ animationDelay: '400ms' }}>
            Discover the VMO Experience
          </Link>
        </div>
      </section>

      <style>
        {`
          @keyframes breathing {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }

          .animate-breathing {
            animation: breathing 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default About; 