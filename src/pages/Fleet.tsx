import React, { useState, useEffect, useRef } from 'react';
import { Plane, Users, Gauge, Route, Clock, Wifi, Coffee, Tv, Bath } from 'lucide-react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const randomImages = [
  '/airplaine2.jpg',
  '/airplaine3.jpg',
  '/airplaine4.jpg',
  '/airplaine5.jpg',
  '/airplaine7.jpg',
  '/airplaine8.jpg',
  '/airplaine9.jpg',
  '/airplaine10.jpg',
  '/airplane.jpg'
];

const Fleet: React.FC = () => {
  const airplaneImages = [
    '/airplaine2.jpg',
    '/airplaine3.jpg',
    '/airplaine4.jpg',
    '/airplaine5.jpg',
    '/airplaine7.jpg',
    '/airplaine8.jpg',
    '/airplaine9.jpg',
    '/airplaine10.jpg',
    '/airplane.jpg'
  ];

  const aircraftCategories = [
    {
      title: "Fixed Wings",
      description: "Our fleet of fixed wing aircraft offers a range of options for luxury, performance, and efficiency.",
      aircraft: [
        {
          name: "Hawker 800XP",
          image: "/Hawker-800xp1.jpg",
          carouselImages: [
            "/Hawker-800xp1.jpg",
            "/hawker-800xp2.webp",
            "/Hawker 800XP3.jpg"
          ],
          description: "The Hawker 800XP is known for being a reliable, versatile, and cost-effective mid-sized business jet. It offers a good balance between performance, comfort, and efficiency, making it a popular choice for corporate and private travelers.",
          general: {
            engineCount: 2,
            typicalPassengers: 8,
            modelClass: "Jet- Super Mid Size",
            upToPassengers: 8
          },
          performance: {
            range: 2539,
            maxCruisingSpeed: 449,
            ceiling: 41000,
            takeOffDistance: 5200,
            landingDistance: 2282
          },
          cabin: {
            height: 5.80,
            width: 6.00,
            length: 21.30,
            zones: 2
          }
        },
        {
          name: "Challenger 604",
          image: "/Challenger604-1.jpg",
          carouselImages: [
            "/Challenger604-1.jpg",
            "/Challenger604-2.jpg",
            "/Challenger604-3.jpg"
          ],
          description: "With advanced avionics, luxurious interiors, and a reputation for reliability, the Challenger 604 sets a new standard for in-flight sophistication, ensuring a superior travel experience for those seeking a perfect balance of style and efficiency.",
          general: {
            engineCount: 2,
            typicalPassengers: 10,
            modelClass: "Jet- Super Mid Size",
            upToPassengers: 12
          },
          performance: {
            range: 3751,
            maxCruisingSpeed: 490,
            ceiling: 41000,
            takeOffDistance: 5950,
            landingDistance: 2430
          },
          cabin: {
            height: 6.10,
            width: 8.20,
            length: 28.50,
            zones: 2
          }
        },
        {
          name: "Legacy 600",
          image: "/legacy600-1.jpg",
          carouselImages: [
            "/legacy600-1.jpg",
            "/legacy600-2.webp",
            "/legacy600-3.jpg"
          ],
          description: "Known for its spacious cabin, exceptional performance, and reliability, the Legacy 600 stands out in offering unparalleled comfort on both short and long-range flights, it seamlessly blends luxury with efficiency, making it the perfect choice for business and private travelers looking for a premium flying experience.",
          general: {
            engineCount: 2,
            typicalPassengers: 12,
            modelClass: "Jet- Long Range",
            upToPassengers: 12
          },
          performance: {
            range: 3429,
            maxCruisingSpeed: 400,
            ceiling: 41000,
            takeOffDistance: 5749,
            landingDistance: 2310
          },
          cabin: {
            height: 6.00,
            width: 6.90,
            length: 49.80,
            zones: 3
          }
        },
        {
          name: "Gulfstream G400",
          image: "/gulfstream-g400-1.jpg",
          carouselImages: [
            "/gulfstream-g400-1.jpg",
            "/gulfstream-g400-2.jpg",
            "/gulfstream-g400-3.jpg"
          ],
          description: "The Gulfstream G400 distinguishes itself with exceptional performance, luxurious comfort, and remarkable long-range capabilities, making it a premier choice in the world of private aviation.",
          general: {
            engineCount: 2,
            typicalPassengers: 10,
            modelClass: "Jet- Long Range",
            upToPassengers: 14
          },
          performance: {
            range: 4200,
            maxCruisingSpeed: 516,
            ceiling: 51000,
            takeOffDistance: 5000,
            landingDistance: 0
          },
          cabin: {
            height: 6.20,
            width: 7.60,
            length: 36.30,
            zones: 2
          }
        },
        {
          name: "Gulfstream 550",
          image: "/gulfstream-550-1.jpg",
          carouselImages: [
            "/gulfstream-550-1.jpg",
            "/gulfstream-550-2.jpg",
            "/gulfstream-550-3.jpg"
          ],
          description: "The Gulfstream G550 is a long range business jet known for its speed, range, and comfort. Its spacious cabin and advanced technology make it a top choice for business and private travel.",
          general: {
            engineCount: 2,
            typicalPassengers: 15,
            modelClass: "Jet - Ultra Long Range",
            upToPassengers: 19
          },
          performance: {
            range: 6750,
            maxCruisingSpeed: 450,
            ceiling: 51000,
            takeOffDistance: 5910,
            landingDistance: 2770
          },
          cabin: {
            height: 6.20,
            width: 7.40,
            length: 50.10,
            zones: 3
          }
        }
      ]
    },
    {
      title: "Rotary Wings",
      description: "Our rotary wing fleet provides exceptional maneuverability and access to challenging locations.",
      aircraft: [
        {
          name: "AW109",
          image: "/AW109.JPG",
          carouselImages: [
            "/Aw109-1.JPG",
            "/Aw109-2.JPG",
            "/Aw109-3.JPG"
          ],
          description: "The AW109 is a highly versatile light twin-engine helicopter renowned for its agility, reliability and advanced features. It serves various sectors including corporate transport, emergency medical services, law enforcement and military applications, offering exceptional performance and comfort in a compact design.",
          general: {
            engineCount: 2,
            typicalPassengers: 4,
            modelClass: "light twin-engine helicopter",
            upToPassengers: 5
          },
          performance: {
            range: 503,
            maxCruisingSpeed: 193,
            ceiling: 16076
          },
          cabin: {
            height: 1.35,
            width: 1.4,
            length: 3.1,
            zones: 1
          }
        },
        {
          name: "AW139",
          image: "/AW130.jpg",
          description: "The AW139 is a medium-sized twin-engine helicopter renowned for its versatility, speed, and cutting-edge technology. Designed to perform in the most demanding conditions, it supports a wide range of missions including Search and Rescue (SAR), Emergency Medical Services (EMS), offshore transport, VIP and corporate travel, and military operations.",
          general: {
            engineCount: 2,
            typicalPassengers: 12,
            modelClass: "Medium twin-engine helicopter",
            upToPassengers: 12
          },
          performance: {
            range: 573,
            maxCruisingSpeed: 165,
            ceiling: 20000
          },
          cabin: {
            height: 5.3,
            width: 7.5,
            length: 11.5,
            zones: 1
          }
        }
      ]
    }
  ];

  const [titleText, setTitleText] = useState('');
  const title = 'Our Fleets';
  const [titleIndex, setTitleIndex] = useState(0);
  const [typingSpeed] = useState(100);
  const [isDeleting, setIsDeleting] = useState(false);
  const [carouselIndexes, setCarouselIndexes] = useState<{ [key: string]: number }>({});
  const [fadeStates, setFadeStates] = useState<{ [key: string]: boolean }>({});
  const fadeTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const aircraftImagesRef = useRef<{ [key: string]: string[] }>({});

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
    // Set all fade states to true on mount
    const initial: { [key: string]: boolean } = {};
    const imagesMap: { [key: string]: string[] } = {};
    aircraftCategories.forEach(category => {
      category.aircraft.forEach(aircraft => {
        initial[`${category.title}-${aircraft.name}`] = true;
        // Generate images for each aircraft only once
        const others = randomImages.filter(img => img !== aircraft.image);
        const shuffled = others.sort(() => 0.5 - Math.random());
        imagesMap[`${category.title}-${aircraft.name}`] = [aircraft.image, ...shuffled.slice(0, 2)];
      });
    });
    setFadeStates(initial);
    aircraftImagesRef.current = imagesMap;
  }, []);

  const getAircraftImages = (aircraft: any, categoryTitle: string) => {
    if (aircraft.carouselImages) return aircraft.carouselImages;
    return aircraftImagesRef.current[`${categoryTitle}-${aircraft.name}`] || [aircraft.image];
  };

  const handlePrev = (aircraftKey: string, images: string[]) => {
    setFadeStates(prev => ({ ...prev, [aircraftKey]: false }));
    if (fadeTimeouts.current[aircraftKey]) clearTimeout(fadeTimeouts.current[aircraftKey]);
    fadeTimeouts.current[aircraftKey] = setTimeout(() => {
      setCarouselIndexes(prev => ({
        ...prev,
        [aircraftKey]: (prev[aircraftKey] || 0) === 0 ? images.length - 1 : (prev[aircraftKey] || 0) - 1
      }));
      setFadeStates(prev => ({ ...prev, [aircraftKey]: true }));
    }, 250);
  };

  const handleNext = (aircraftKey: string, images: string[]) => {
    setFadeStates(prev => ({ ...prev, [aircraftKey]: false }));
    if (fadeTimeouts.current[aircraftKey]) clearTimeout(fadeTimeouts.current[aircraftKey]);
    fadeTimeouts.current[aircraftKey] = setTimeout(() => {
      setCarouselIndexes(prev => ({
        ...prev,
        [aircraftKey]: (prev[aircraftKey] || 0) === images.length - 1 ? 0 : (prev[aircraftKey] || 0) + 1
      }));
      setFadeStates(prev => ({ ...prev, [aircraftKey]: true }));
    }, 250);
  };

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
          <p className="text-xl text-white max-w-3xl mx-auto font-light animate-slide-up" style={{ animationDelay: '200ms' }}>
            Experience luxury and performance with our comprehensive flight coordination services
          </p>
        </div>
      </section>

      {/* Fleet Categories */}
      {aircraftCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              {/* Category Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-full shadow-lg inline-flex items-center justify-center">
                  <Plane className="w-12 h-12 text-gold animate-breathing" />
                </div>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-navy mb-6 animate-fade-in" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                {category.title}
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {category.aircraft.map((aircraft, aircraftIndex) => (
                <div 
                  key={aircraftIndex}
                  className={`bg-gray-50 p-8 rounded-sm hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in`}
                  style={{ animationDelay: `${(aircraftIndex + 1) * 200}ms` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={`relative ${aircraft.name === 'AW109' ? 'h-[36rem]' : 'h-64'} overflow-hidden rounded-sm flex flex-col items-start justify-start`}>
                      {(() => {
                        const images = getAircraftImages(aircraft, category.title);
                        const idx = carouselIndexes[`${category.title}-${aircraft.name}`] || 0;
                        return (
                          <>
                            <button
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-gold/80 transition z-10"
                              onClick={() => handlePrev(`${category.title}-${aircraft.name}`, images)}
                              aria-label="Previous image"
                            >
                              &#8592;
                            </button>
                            <img
                              src={images[idx]}
                              alt={aircraft.name}
                              className={`object-cover w-full ${aircraft.name === 'AW109' ? 'h-[36rem]' : 'h-64'} rounded-sm transition-opacity duration-500 ease-in-out ${fadeStates[`${category.title}-${aircraft.name}`] ? 'opacity-100' : 'opacity-0'}`}
                              style={{ animationDelay: `${(aircraftIndex + 1) * 300}ms` }}
                            />
                            <button
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-gold/80 transition z-10"
                              onClick={() => handleNext(`${category.title}-${aircraft.name}`, images)}
                              aria-label="Next image"
                            >
                              &#8594;
                            </button>
                          </>
                        );
                      })()}
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-2xl font-light text-navy mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                          {aircraft.name}
                        </h3>
                        <p className="text-gray-700 font-light leading-relaxed mb-6">
                          {aircraft.description}
                        </p>
                        <div className="mb-4">
                          <h4 className="font-display text-lg font-semibold text-gold mb-2">General Information</h4>
                          <ul className="text-gray-700 font-light grid grid-cols-2 gap-x-6 gap-y-1">
                            <li>Engine Count: {aircraft.general.engineCount}</li>
                            <li>Model Class: {aircraft.general.modelClass}</li>
                            <li>Up to Passengers: {aircraft.general.upToPassengers}</li>
                          </ul>
                        </div>
                        <div className="mb-4">
                          <h4 className="font-display text-lg font-semibold text-gold mb-2">Performance</h4>
                          <ul className="text-gray-700 font-light grid grid-cols-2 gap-x-6 gap-y-1">
                            <li>Range: {aircraft.performance.range}</li>
                            <li>Max Cruising Speed: {aircraft.performance.maxCruisingSpeed}</li>
                            <li>Ceiling (Feet): {aircraft.performance.ceiling}</li>
                            {'takeOffDistance' in aircraft.performance && <li>Take Off Distance (Feet): {aircraft.performance.takeOffDistance}</li>}
                            {'landingDistance' in aircraft.performance && <li>Landing Distance (Feet): {aircraft.performance.landingDistance}</li>}
                          </ul>
                        </div>
                        <div className="mb-4">
                          <h4 className="font-display text-lg font-semibold text-gold mb-2">Cabin Dimension</h4>
                          <ul className="text-gray-700 font-light grid grid-cols-2 gap-x-6 gap-y-1">
                            <li>Height (Feet): {aircraft.cabin.height}</li>
                            <li>Width (Feet): {aircraft.cabin.width}</li>
                            <li>Length (Feet): {aircraft.cabin.length}</li>
                            <li>Cabin Zones: {aircraft.cabin.zones}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-light text-navy mb-6 animate-fade-in" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Ready to Experience Our Fleets?
          </h2>
          <p className="text-navy mb-8 max-w-2xl mx-auto font-light animate-fade-in" style={{ animationDelay: '200ms' }}>
            Contact us to learn more about our aircraft and find the perfect match for your travel needs.
          </p>
          <Link to="/contact" className="btn-primary transform hover:scale-105 transition-transform duration-300 animate-fade-in inline-block" style={{ animationDelay: '400ms' }}>
            Contact Us Today
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
              transform: scale(1.08);
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

export default Fleet; 