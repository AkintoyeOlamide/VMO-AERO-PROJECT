import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Contact: React.FC = () => {
  const [titleText, setTitleText] = useState('');
  const title = 'Contact Us';
  const [titleIndex, setTitleIndex] = useState(0);
  const [typingSpeed] = useState(100);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (titleIndex < title.length) {
          setTitleText(title.substring(0, titleIndex + 1));
          setTitleIndex(titleIndex + 1);
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      } else {
        if (titleIndex > 0) {
          setTitleText(title.substring(0, titleIndex - 1));
          setTitleIndex(titleIndex - 1);
        } else {
          setIsDeleting(false);
          setTimeout(() => {
            setTitleIndex(0);
          }, 500);
        }
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [titleIndex, title, typingSpeed, isDeleting]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://vmo-aero-admin.onrender.com/api/email/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'vmoaeronigltd@gmail.com',
          subject: `New Contact Form Submission from ${formData.name}`,
          text: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0a192f;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${formData.message}</p>
            </div>
          `
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <p className="text-xl text-white max-w-3xl mx-auto font-light animate-slide-up" style={{ animationDelay: '200ms' }}>
            Get in touch with VMO AERO for inquiries, bookings, or support
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-sm shadow-lg border border-gold/20">
            <h2 className="font-display text-2xl font-light text-navy mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Send Us a Message
            </h2>
            {submitStatus === 'success' ? (
              <div className="text-center py-6">
                <p className="text-gold font-semibold mb-4">Thank you for your message!</p>
                <p className="text-gray-600">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-light">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-light">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2 font-light">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2 font-light">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                    required
                  ></textarea>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  className="btn-primary w-full mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-2xl font-light text-navy mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Contact Information
            </h2>
            <ul className="space-y-4 text-gray-700 font-light text-base mb-8">
              <li className="flex items-start"><MapPin className="w-5 h-5 text-gold mr-2 mt-1" />47 Oduduwa Crescent, Ikeja GRA, Lagos State, Nigeria.</li>
              <li className="flex items-start"><MapPin className="w-5 h-5 text-gold mr-2 mt-1" />Dominion Hanger, Murtala Mohammed International Airport, Ikeja, Lagos State, Nigeria</li>
              <li className="flex items-start"><MapPin className="w-5 h-5 text-gold mr-2 mt-1" />201 Albert Bridge Road Belfast BT5 4PU Northern Ireland, United Kingdom</li>
              <li className="flex items-center"><Phone className="w-5 h-5 text-gold mr-2" />+2349064698508, 070-00-VMOAERO</li>
              <li className="flex items-center"><Mail className="w-5 h-5 text-gold mr-2" />info@vmoaeros.com</li>
              <li className="flex items-center"><Mail className="w-5 h-5 text-gold mr-2" />vmoaeronigltd@gmail.com</li>
            </ul>
            <div>
              <h3 className="font-display text-xl font-light text-navy mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Social Media
              </h3>
              <div className="flex space-x-4">
                <a href="https://instagram.com/vmoaero" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://facebook.com/vmoaero" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/vmoaero" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://x.com/vmoaero" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition-colors duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@vmoaero?_t=ZM-8wjMDpWTZET&_r=1" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition-colors duration-300">
                  <TikTokIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 