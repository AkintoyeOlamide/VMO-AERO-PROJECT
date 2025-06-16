import React from 'react';
import { Plane, Award, Users, Globe } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    {
      icon: <Plane className="w-8 h-8 text-gold" />,
      value: "150+",
      label: "Aircraft in Fleet"
    },
    {
      icon: <Award className="w-8 h-8 text-gold" />,
      value: "25+",
      label: "Years of Excellence"
    },
    {
      icon: <Users className="w-8 h-8 text-gold" />,
      value: "10,000+",
      label: "Satisfied Clients"
    },
    {
      icon: <Globe className="w-8 h-8 text-gold" />,
      value: "120+",
      label: "Global Destinations"
    }
  ];

  return (
    <section id="about" className="section-padding bg-navy-light relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
          alt="Luxury private jet" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-silver-light">
            About VMO AERO
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-silver">
            Pioneering excellence in private aviation since 1998, we've built our reputation on 
            unmatched service, safety, and luxury.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gold mb-2">{stat.value}</h3>
              <p className="text-silver text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-navy p-8 rounded-sm border border-gold/20">
            <h3 className="font-display text-2xl font-bold text-gold mb-4">Our Mission</h3>
            <p className="text-silver">
              To provide unparalleled private aviation services that exceed expectations, 
              combining luxury with efficiency while maintaining the highest standards of safety 
              and customer satisfaction.
            </p>
          </div>
          <div className="bg-navy p-8 rounded-sm border border-gold/20">
            <h3 className="font-display text-2xl font-bold text-gold mb-4">Our Vision</h3>
            <p className="text-silver">
              To be the global leader in private aviation, setting new standards for luxury 
              travel while embracing innovation and sustainability in everything we do.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-navy p-8 rounded-sm border border-gold/20">
            <h3 className="font-display text-xl font-bold text-gold mb-4">Excellence</h3>
            <p className="text-silver text-sm">
              We strive for excellence in every aspect of our service, from aircraft maintenance 
              to customer experience.
            </p>
          </div>
          <div className="bg-navy p-8 rounded-sm border border-gold/20">
            <h3 className="font-display text-xl font-bold text-gold mb-4">Safety</h3>
            <p className="text-silver text-sm">
              Safety is our top priority. We maintain rigorous standards and continuous training 
              to ensure the highest level of safety.
            </p>
          </div>
          <div className="bg-navy p-8 rounded-sm border border-gold/20">
            <h3 className="font-display text-xl font-bold text-gold mb-4">Innovation</h3>
            <p className="text-silver text-sm">
              We embrace innovation in technology and service delivery to provide cutting-edge 
              solutions for our clients.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="font-display text-2xl font-bold text-silver-light mb-4">
            Ready to Experience Excellence?
          </h3>
          <p className="text-silver mb-8">
            Join our distinguished clientele and discover why we're the preferred choice for 
            private aviation.
          </p>
          <button className="btn-primary">Contact Us Today</button>
        </div>
      </div>
    </section>
  );
};

export default About; 