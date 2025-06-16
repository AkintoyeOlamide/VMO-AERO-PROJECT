import React from 'react';
import { 
  Plane, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin
} from 'lucide-react';

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-gray-50 pt-8 pb-4">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="font-display text-xl font-light text-navy-dark mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Address
            </h3>
            <ul className="space-y-3 text-gray-600 font-light text-sm">
              <li>Nigeria</li>
              <li className="flex items-start"><MapPin className="w-5 h-5 text-navy-dark mr-2 mt-1" />47 Oduduwa Crescent, Ikeja GRA, Lagos State, Nigeria.</li>
              <li className="flex items-start"><MapPin className="w-5 h-5 text-navy-dark mr-2 mt-1" />Dominion Hanger, Murtala Mohammed International Airport, Ikeja, Lagos State, Nigeria.</li>
              <li>United Kingdom</li>
              <li className="flex items-start"><MapPin className="w-5 h-5 text-navy-dark mr-2 mt-1" />201 Albert Bridge Road Belfast BT5 4PU Northern Ireland, United Kingdom.</li>
            </ul>
          </div>
          <div className="lg:mx-auto">
            <h3 className="font-display text-xl font-light text-navy-dark mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Contact Information
            </h3>
            <ul className="space-y-3 text-gray-600 font-light text-sm">
              <li className="flex items-center"><Phone className="w-5 h-5 text-navy-dark mr-2" />Tel: +2349064698508, 070-00-VMOAERO</li>
              <li className="flex items-center"><Mail className="w-5 h-5 text-navy-dark mr-2" />info@vmoaeros.com</li>
              <li className="flex items-center"><Mail className="w-5 h-5 text-navy-dark mr-2" />vmoaeronigltd@gmail.com</li>
            </ul>
          </div>
          <div className="lg:ml-auto">
            <h3 className="font-display text-xl font-light text-navy-dark mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Social Media
            </h3>
            <div className="flex flex-col items-center">
              <div className="flex space-x-4 text-sm mb-4">
                <a href="https://www.instagram.com/vmo_aero?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-navy-dark transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/share/15kKjRPk7Q/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-navy-dark transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/vmoaero/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-navy-dark transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://x.com/vmoaero?s=21&t=-q_eaKyPy_y1-aWecw_NZw" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-navy-dark transition-colors duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@vmoaero?_t=ZM-8wjMDpWTZET&_r=1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-navy-dark transition-colors duration-300">
                  <TikTokIcon className="w-5 h-5" />
                </a>
              </div>
              <div className="flex flex-row items-center justify-center mt-2">
                <img src="/certification-3.png" alt="Certification 3" className="h-32 w-auto" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} VMO AERO. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
              <li>
                <a href="/privacy-policy" className="text-gray-600 hover:text-navy-dark transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-navy-dark transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-navy-dark transition-colors duration-300">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;