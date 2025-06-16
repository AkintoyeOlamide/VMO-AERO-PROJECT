import React from 'react';
import Header from '../components/Header';

const teamMembers = [
  {
    name: 'Oluwaseun Ayodeji',
    role: 'Chief Operating Officer',
    image: '/SEUN AYODEJI COLE.jpg',
    description: `Oluwaseun Ayodeji is a seasoned aviation professional with a strong background in corporate business management, aircraft maintenance planning, and procurement. She brings a strategic blend of technical expertise and leadership, driving operational efficiency, regulatory compliance, and organizational excellence. Known for her analytical approach and meticulous attention to detail, Oluwaseun consistently leads initiatives that enhance safety, reliability, and service quality across aviation operations.`
  },
  {
    name: 'Damilola Ajina',
    role: 'Flight Operations',
    image: '/CAPT DAMI PASSPORT PHOTO.jpg5.png',
    description: "Damilola Ajina is a seasoned aviation professional with over 13 years of experience in commercial flight operations, flight safety, and airline management. He leads flight operations with a sharp focus on safety, regulatory compliance, and operational efficiency. From cockpit to command, Damilola has steadily risen through the ranks. His extensive flight experience, combined with advanced training in aviation management, enables him to drive operational excellence and uphold VMO Aero's commitment to safe and reliable flight operations."
  },
  {
    name: 'Adejoke Okeowo',
    role: 'Quality and Safety',
    image: '/ADEJOKE OKEOWO.JPG',
    description: `Adejoke Okeowo is a seasoned Quality and Safety professional in the aviation industry, boasting over a decade of experience in enhancing operational excellence and ensuring regulatory compliance. Her expertise includes conducting detailed audits, implementing safety management systems, and aligning processes with international standards like ISO 9001. Adejoke's unwavering attention to detail ensures that every aspect of aviation practices adheres strictly to the highest safety and quality standards, fostering a culture of continuous improvement within the Organization.`
  },
  {
    name: 'Abduwahab Wahab',
    role: 'Commercial',
    image: '/TUNDE ABDULWAAHAB.jpg',
    description: `Abdulwahab Wahab Babatunde is a results-driven aviation professional with a strong background in flight operations, safety management, and ground handling. His certifications in Aircraft Turnaround Coordination, Aircraft Handling and Loading, Crew Resource Management, Safety Management Systems, and Dangerous Goods Awareness support his strategic approach to optimizing service delivery and revenue-generating operations. Abdulwahab's continuous professional development reflects his commitment to driving commercial growth, enhancing customer satisfaction, and strengthening overall business performance.`
  },
  {
    name: 'Emmanuella uuijialator',
    role: 'Human Resource',
    image: '/EMMANUELLA UUIJIATALOR.jpg',
    description: `Emmanuella Uuijialator is an experienced Human Resources professional with over six years experience. She plays a crucial role in shaping the organization's culture, fostering talent development, and ensuring employees thrive. Emmanuella has created strategies, policies, and programs to attract, retain, and develop top talent in alignment with business objectives. She also facilitates a seamless onboarding process for new employees ensuring they are integrated into the company culture and understand their roles. Her dynamic leadership style and commitment to fostering a positive work culture make her an invaluable asset to our team, ensuring that our human capital remains at the heart of our strategic vision and operational excellence.`
  },
  {
    name: 'Oyindamola Benthomas',
    role: 'Administration and Facility',
    image: '/OYINDAMOLA BEN-THOMAS.JPG',
    description: `Oyindamola Benthomas is a proactive and detail-oriented administrative professional with a solid background in office and facility management. She has effectively ensured an organized and secured workplace environment, and handled various technical administrative functions. Her experience spans the banking, education, and aviation sectors, where she has consistently managed diverse administrative functions. Known for her excellent communication, time management, and problem-solving skills, Oyindamola is committed to continuous growth and ensuring smooth and efficient corporate operations.`
  },
  {
    name: 'Magdalene Eyo',
    role: 'Cabin Service',
    image: '/MAGDALENE EYO.jpg',
    description: `Magdalene Eyo is a dedicated Cabin Service Executive with a passion for delivering outstanding in-flight experiences. With a background in customer service and logistics, she excels in fast-paced environments and adapts effortlessly to changing situations. Known for her enthusiasm, professionalism, and attention to detail, Magdalene consistently ensures passenger comfort and satisfaction. Her solid interpersonal skills and commitment to excellence make her a valuable asset to the team.`
  },
  {
    name: 'Cynthia Ngwodo',
    role: 'Project and Communications',
    image: '/CYNTHIA NGWODO.JPG',
    description: `Cynthia Ngwodo is a tech-savvy professional with a background in project coordination, and digital communications. She brings a dynamic approach to managing communication workflows, organizing projects, and streamlining processes to boost team efficiency. Cynthia is known for her strong leadership, problem-solving abilities, and collaborative spirit, which she applies across diverse teams and projects. With a passion for continuous learning and growth, she remains dedicated to driving impactful results, seamless project delivery and corporate  communications.`
  },
  {
    name: 'Michael Ironbar',
    role: 'Airworthiness',
    image: '/user-icon.png', // Placeholder user icon
    description: `Michael Ironbar is a seasoned aviation engineer with over 15 years of hands-on experience in aircraft maintenance, airworthiness, and aviation safety. He ensures operational compliance and technical excellence across our wide range of aircraft. Michael has steadily advanced through the ranks, earning multiple international certifications and type ratings. His deep technical expertise, combined with a strong focus on safety and regulatory standards, drives his commitment to delivering safe, reliable, and airworthy aircraft.`
  }
];

const Team: React.FC = () => {
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
            Meet the Team
          </h1>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-center place-items-center">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="group relative bg-navy rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 transform hover:-translate-y-1 animate-fade-in border border-gold/20"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Team member image, blends with card like premium jet cards */}
                  <div className="relative h-64 w-full mb-8 overflow-hidden rounded-t-lg">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-t-lg ${member.name === 'Damilola Ajina' ? 'object-top' : ['Abduwahab Wahab', 'Emmanuella uuijialator', 'Cynthia Ngwodo'].includes(member.name) ? 'object-[center_8%]' : 'object-[center_30%]'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/20 to-navy/60"></div>
                  </div>
                  <div className="pt-4 pb-8 px-8 relative flex flex-col items-start">
                    <h2 className="font-display text-xl font-light text-white mb-2 text-left" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{member.name}</h2>
                    <h3 className="text-gold text-base font-semibold mb-4 uppercase tracking-wide text-left">{member.role}</h3>
                    <p className="text-silver font-light text-sm leading-relaxed text-left max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-96 group-hover:opacity-100 group-hover:mt-4">
                      {member.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team; 