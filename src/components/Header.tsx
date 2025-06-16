import React, { useState, useEffect } from 'react';
import { Menu, X, Plane, ShoppingCart, Lightbulb } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, User } from 'firebase/auth';

// Placeholder modal components
const SignInModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-10 rounded-lg shadow-xl min-w-[480px] max-w-[540px] w-full mx-4 relative">
        <button 
          className="absolute top-4 right-4 text-navy hover:text-gold transition-colors duration-300" 
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-light text-navy mb-6" style={{ letterSpacing: '0.1em' }}>SIGN IN</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 font-light">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-all" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-light">Password</label>
            <input 
              type="password" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-all" 
              required 
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button 
            type="submit" 
            className="btn-primary w-full py-3 text-base" 
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

const SignUpModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!form.fullName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.fullName });
      // Optionally, save phone/company to Firestore here
      onClose();
    } catch (err: any) {
      setError(err.message || 'Sign up failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-10 rounded-lg shadow-xl min-w-[480px] max-w-[540px] w-full mx-4 relative">
        <button 
          className="absolute top-4 right-4 text-navy hover:text-gold transition-colors duration-300" 
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-light text-navy mb-6" style={{ letterSpacing: '0.1em' }}>SIGN UP</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 mb-2 font-light">Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={form.fullName} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-all" 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-light">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-all" 
                required 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 mb-2 font-light">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-all" 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-light">Company Name <span className="text-gray-400">(Optional)</span></label>
              <input 
                type="text" 
                name="company" 
                value={form.company} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-all" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 mb-2 font-light">Create Password</label>
              <input 
                type="password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-all" 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-light">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={form.confirmPassword} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-all" 
                required 
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button 
            type="submit" 
            className="btn-primary w-full py-3 text-base" 
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div className="text-center mt-5">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  // Trigger sign in modal
                  const signInButton = document.querySelector('[data-sign-in-button]');
                  if (signInButton instanceof HTMLElement) {
                    signInButton.click();
                  }
                }}
                className="text-navy hover:text-gold font-medium transition-colors duration-300"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [teamDropdown, setTeamDropdown] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const hideServicesModalTimer = React.useRef<NodeJS.Timeout | null>(null);
  const [showFleetModal, setShowFleetModal] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const servicesHoverTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const [fleetHover, setFleetHover] = useState(false);
  const fleetHoverTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'Team', path: '/team' },
    { name: 'Blog', path: '/blog' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' },
    ...(user ? [{ name: 'Bookings', path: '/bookings' }] : [])
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center px-2">
            <img 
              src="/VMOAEROlogo.png" 
              alt="VMO AERO Logo" 
              className="h-6 w-auto px-2"
            />
          </Link>
          {/* Hamburger Menu Button */}
          <button 
            className="text-navy p-2 transition-all duration-300 focus:outline-none -mr-6"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-7 w-7 transition-all duration-300" />
            ) : (
              <span className="flex flex-col gap-2">
                <span className="block w-6 h-0.5 rounded bg-navy" style={{width: '1.5rem'}}></span>
                <span className="block w-10 h-0.5 rounded bg-navy" style={{width: '2.5rem'}}></span>
                <span className="block w-8 h-0.5 rounded bg-navy" style={{width: '2rem'}}></span>
              </span>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay and Sidebar */}
      {/* Overlay removed */}
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-2/5 bg-white/70 backdrop-blur-2xl opacity-100 z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button 
            onClick={toggleMenu}
            className="text-navy hover:text-gold p-2 transition-colors duration-300"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="container mx-auto px-2 py-8">
          <nav className="flex flex-col items-start space-y-8 pl-3">
            {menuItems.map((item, idx) => (
              item.name === 'Team' ? (
                <div
                  key={item.name}
                  className="relative w-full"
                  onMouseEnter={() => {
                    setTeamDropdown(true);
                    setShowServicesModal(false);
                    setShowFleetModal(false);
                  }}
                  onMouseLeave={() => setTeamDropdown(false)}
                >
                  <Link 
                    to={item.path}
                    className={`text-navy hover:text-gold text-sm font-light uppercase transition-all duration-300 transform hover:translate-x-2 ${
                      location.pathname === item.path ? 'text-gold' : ''
                    } ${isMenuOpen ? 'animate-slide-in-right' : ''}`}
                    style={isMenuOpen ? { animationDelay: `${idx * 80 + 100}ms`, wordSpacing: '0.3em', letterSpacing: '0.3em' } : { wordSpacing: '0.3em', letterSpacing: '0.3em' }}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                  {teamDropdown && (
                    <div className="absolute left-full top-0 h-full bg-white/90 shadow-lg rounded-r-lg px-8 py-8 min-w-[220px] flex flex-col justify-center z-50 border-l border-gold/20">
                      <Link to="/team/leadership" className="text-navy hover:text-gold py-2 px-2 text-base font-light uppercase transition-all duration-300">Leadership</Link>
                      <Link to="/team/operations" className="text-navy hover:text-gold py-2 px-2 text-base font-light uppercase transition-all duration-300">Operations</Link>
                      <Link to="/team/cabin-crew" className="text-navy hover:text-gold py-2 px-2 text-base font-light uppercase transition-all duration-300">Cabin Crew</Link>
                      <Link to="/team/administration" className="text-navy hover:text-gold py-2 px-2 text-base font-light uppercase transition-all duration-300">Administration</Link>
                    </div>
                  )}
                </div>
              ) : item.name === 'Services' ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-navy hover:text-gold text-sm font-light uppercase transition-all duration-300 transform hover:translate-x-2 ${
                    location.pathname === item.path ? 'text-gold' : ''
                  } ${isMenuOpen ? 'animate-slide-in-right' : ''}`}
                  style={isMenuOpen ? { animationDelay: `${idx * 80 + 100}ms`, wordSpacing: '0.3em', letterSpacing: '0.3em' } : { wordSpacing: '0.3em', letterSpacing: '0.3em' }}
                  onClick={toggleMenu}
                  onMouseEnter={() => {
                    if (servicesHoverTimeout.current) clearTimeout(servicesHoverTimeout.current);
                    setShowServicesModal(true);
                    setServicesHover(true);
                  }}
                  onMouseLeave={() => {
                    if (servicesHoverTimeout.current) clearTimeout(servicesHoverTimeout.current);
                    servicesHoverTimeout.current = setTimeout(() => {
                      setServicesHover(false);
                      setShowServicesModal(false);
                    }, 100);
                  }}
                >
                  {item.name}
                </Link>
              ) : item.name === 'Fleet' ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-navy hover:text-gold text-sm font-light uppercase transition-all duration-300 transform hover:translate-x-2 ${
                    location.pathname === item.path ? 'text-gold' : ''
                  } ${isMenuOpen ? 'animate-slide-in-right' : ''}`}
                  style={isMenuOpen ? { animationDelay: `${idx * 80 + 100}ms`, wordSpacing: '0.3em', letterSpacing: '0.3em' } : { wordSpacing: '0.3em', letterSpacing: '0.3em' }}
                  onClick={toggleMenu}
                  onMouseEnter={() => {
                    if (fleetHoverTimeout.current) clearTimeout(fleetHoverTimeout.current);
                    setShowFleetModal(true);
                    setFleetHover(true);
                  }}
                  onMouseLeave={() => {
                    if (fleetHoverTimeout.current) clearTimeout(fleetHoverTimeout.current);
                    fleetHoverTimeout.current = setTimeout(() => {
                      setFleetHover(false);
                      setShowFleetModal(false);
                    }, 100);
                  }}
                >
                  {item.name}
                </Link>
              ) : (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className={`text-navy hover:text-gold text-sm font-light uppercase transition-all duration-300 transform hover:translate-x-2 ${
                    location.pathname === item.path ? 'text-gold' : ''
                  } ${isMenuOpen ? 'animate-slide-in-right' : ''}`}
                  style={isMenuOpen ? { animationDelay: `${idx * 80 + 100}ms`, wordSpacing: '0.3em', letterSpacing: '0.3em' } : { wordSpacing: '0.3em', letterSpacing: '0.3em' }}
                  onClick={toggleMenu}
                  onMouseEnter={() => {
                    setShowServicesModal(false);
                    setShowFleetModal(false);
                  }}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link 
              to="/booking"
              className="btn-primary mt-8 text-base px-8 py-3 transform transition-all duration-300 hover:scale-105"
              onClick={toggleMenu}
            >
              Book Now
            </Link>
            <div className="flex flex-col space-y-2 mt-4 w-full">
              {user ? (
                <button
                  className="text-navy text-base px-4 py-3 rounded transform transition-all duration-300 hover:underline hover:text-gold bg-transparent border-none shadow-none"
                  style={{minWidth: '100px'}}
                  onClick={() => {
                    auth.signOut();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    className="text-navy text-base px-4 py-3 rounded transform transition-all duration-300 hover:underline hover:text-gold bg-transparent border-none shadow-none"
                    style={{minWidth: '100px'}}
                    onClick={() => { setShowSignIn(true); setIsMenuOpen(false); }}
                    data-sign-in-button
                  >
                    Sign In
                  </button>
                  <button
                    className="text-navy text-base px-4 py-3 rounded transform transition-all duration-300 hover:underline hover:text-gold bg-transparent border-none shadow-none"
                    style={{minWidth: '100px'}}
                    onClick={() => { setShowSignUp(true); setIsMenuOpen(false); }}
                    data-sign-up-button
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
      <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} />
      <SignUpModal open={showSignUp} onClose={() => setShowSignUp(false)} />
      {showServicesModal && isMenuOpen && (
        <div
          className="hidden sm:flex fixed top-0 right-[40vw] h-full w-1/4 bg-white/70 z-[70] shadow-lg items-center justify-start border-r-4 border-gold/20 backdrop-blur-xl transition-transform duration-300 animate-slide-in-right"
          onMouseEnter={() => {
            if (servicesHoverTimeout.current) clearTimeout(servicesHoverTimeout.current);
            setShowServicesModal(true);
            setServicesHover(true);
          }}
          onMouseLeave={() => {
            if (servicesHoverTimeout.current) clearTimeout(servicesHoverTimeout.current);
            servicesHoverTimeout.current = setTimeout(() => {
              setServicesHover(false);
              setShowServicesModal(false);
            }, 100);
          }}
        >
          <div className="pr-2 pt-6 pb-6 rounded flex flex-col items-start pl-4">
            <ul className="w-full space-y-6 text-navy text-base font-light animate-slide-in-right delay-300 text-left pl-0 ml-0 !pl-0 !ml-0">
              <li>
                <Link to="/services" className="flex items-center gap-1 hover:text-gold transition-colors duration-200" onClick={() => setShowServicesModal(false)}>
                  <Plane className="w-5 h-5 text-gold" />Total Aircraft Management
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-1 hover:text-gold transition-colors duration-200" onClick={() => setShowServicesModal(false)}>
                  <ShoppingCart className="w-5 h-5 text-gold" />Aircraft Acquisition and Sales Support
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-1 hover:text-gold transition-colors duration-200" onClick={() => setShowServicesModal(false)}>
                  <Lightbulb className="w-5 h-5 text-gold" />Consultancy and Advisory Services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {showFleetModal && isMenuOpen && (
        <div
          className="hidden sm:flex fixed top-0 right-[40vw] h-full w-1/4 bg-white/70 z-[70] shadow-lg items-center justify-start border-r-4 border-gold/20 backdrop-blur-xl transition-transform duration-300 animate-slide-in-right"
          onMouseEnter={() => {
            if (fleetHoverTimeout.current) clearTimeout(fleetHoverTimeout.current);
            setShowFleetModal(true);
            setFleetHover(true);
          }}
          onMouseLeave={() => {
            if (fleetHoverTimeout.current) clearTimeout(fleetHoverTimeout.current);
            fleetHoverTimeout.current = setTimeout(() => {
              setFleetHover(false);
              setShowFleetModal(false);
            }, 100);
          }}
        >
          <div className="pr-2 pt-6 pb-6 rounded flex flex-col items-start pl-4">
            <ul className="w-full space-y-6 text-navy text-base font-light animate-slide-in-right delay-300 text-left pl-0 ml-0 !pl-0 !ml-0">
              <li>
                <Link to="/fleet" className="flex items-center gap-1 hover:text-gold transition-colors duration-200" onClick={() => setShowFleetModal(false)}>
                  <Plane className="w-5 h-5 text-gold" />Hawker 800XP
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="flex items-center gap-1 hover:text-gold transition-colors duration-200" onClick={() => setShowFleetModal(false)}>
                  <Plane className="w-5 h-5 text-gold" />Challenger 604
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="flex items-center gap-1 hover:text-gold transition-colors duration-200" onClick={() => setShowFleetModal(false)}>
                  <Plane className="w-5 h-5 text-gold" />Legacy 600
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="flex items-center gap-1 hover:text-gold transition-colors duration-200" onClick={() => setShowFleetModal(false)}>
                  <Plane className="w-5 h-5 text-gold" />Gulfstream G400
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="flex items-center gap-1 hover:text-gold transition-colors duration-200" onClick={() => setShowFleetModal(false)}>
                  <Plane className="w-5 h-5 text-gold" />Gulfstream 550
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="flex items-center gap-1 hover:text-gold transition-colors duration-200" onClick={() => setShowFleetModal(false)}>
                  <Plane className="w-5 h-5 text-gold" />AW109
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="flex items-center gap-1 hover:text-gold transition-colors duration-200" onClick={() => setShowFleetModal(false)}>
                  <Plane className="w-5 h-5 text-gold" />AW139
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;