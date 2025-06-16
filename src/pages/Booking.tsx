import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Calendar, Clock, Users, Plane, Baby } from 'lucide-react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

// Sign In Prompt Modal Component
const SignInPromptModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white pl-1 pr-3 py-2 rounded-lg shadow-xl w-64">
        <h2 className="text-lg font-semibold text-navy mb-1">Sign In Required</h2>
        <p className="text-gray-600 mb-2 text-sm">
          To ensure a secure and personalized booking experience, please sign in to continue with your flight booking.
        </p>
        <div className="space-y-2">
          <button
            onClick={() => {
              onClose();
              // Trigger sign in modal from Header
              const signInButton = document.querySelector('[data-sign-in-button]');
              if (signInButton instanceof HTMLElement) {
                signInButton.click();
              }
            }}
            className="btn-primary w-full max-w-full"
          >
            Sign In to Continue
          </button>
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  onClose();
                  // Trigger sign up modal from Header
                  const signUpButton = document.querySelector('[data-sign-up-button]');
                  if (signUpButton instanceof HTMLElement) {
                    signUpButton.click();
                  }
                }}
                className="text-navy hover:text-gold font-medium transition-colors duration-300"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const majorAirports = [
  "London Heathrow (LHR)",
  "John F. Kennedy International (JFK)",
  "Los Angeles International (LAX)",
  "Dubai International (DXB)",
  "Tokyo Haneda (HND)",
  "Paris Charles de Gaulle (CDG)",
  "Frankfurt (FRA)",
  "Singapore Changi (SIN)",
  "Amsterdam Schiphol (AMS)",
  "Istanbul (IST)",
  "Lagos Murtala Muhammed (LOS)",
  "Cape Town International (CPT)",
  "Abuja Nnamdi Azikiwe (ABV)",
  "Other..."
];

const Booking: React.FC = () => {
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const navigate = useNavigate();
  const [titleText, setTitleText] = useState('');
  const title = 'Book Your Flight';
  const [titleIndex, setTitleIndex] = useState(0);
  const [typingSpeed] = useState(100);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    // Contact Details
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    
    // Trip Information
    tripType: 'dropoff',
    departureCity: '',
    arrivalCity: '',
    departureDateTime: '',
    returnDateTime: '',
    datesFlexible: 'no',
    otherTripType: '',
    
    // Passenger Details
    numberOfPassengers: 1,
    hasChildren: 'no',
    numberOfChildren: 0,
    childrenAges: '',
    needsChildSeat: 'no',
    specialRequests: '',
    
    // Aircraft Preferences
    preferredAircraft: '',
    
    // Purpose of Flight
    purpose: 'business',
    
    // Terms
    confirmInfo: false,

    otherPurpose: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [airportSuggestions, setAirportSuggestions] = useState<string[]>([]);
  const [showAirportSuggestions, setShowAirportSuggestions] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setShowSignInPrompt(true);
      } else {
        setFormData(prev => ({
          ...prev,
          fullName: user.displayName || prev.fullName,
          email: user.email || prev.email,
          phone: user.phoneNumber || prev.phone
        }));
      }
    });
    return () => unsubscribe();
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleDepartureCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, departureCity: value }));
    if (value.length > 0) {
      const filtered = majorAirports.filter(airport =>
        airport.toLowerCase().includes(value.toLowerCase())
      );
      setAirportSuggestions(filtered);
      setShowAirportSuggestions(true);
    } else {
      setAirportSuggestions([]);
      setShowAirportSuggestions(false);
    }
  };

  const handleAirportSuggestionClick = (suggestion: string) => {
    setFormData(prev => ({ ...prev, departureCity: suggestion }));
    setShowAirportSuggestions(false);
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
          subject: `New Booking Request from ${formData.fullName}`,
          text: `
Contact Details:
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred Contact Method: ${formData.preferredContact}

Trip Information:
Type of Trip: ${formData.tripType === 'other' ? formData.otherTripType : formData.tripType}
Departure City/Airport: ${formData.departureCity}
Arrival City/Airport: ${formData.arrivalCity}
Departure Date & Time: ${formData.departureDateTime}
Return Date & Time: ${formData.returnDateTime}
Dates Flexible: ${formData.datesFlexible}

Passenger Details:
Number of Passengers: ${formData.numberOfPassengers}
Has Children: ${formData.hasChildren}
${formData.hasChildren === 'yes' ? `
Number of Children: ${formData.numberOfChildren}
Children Ages: ${formData.childrenAges}
Needs Child Seat: ${formData.needsChildSeat}
` : ''}
Special Requests: ${formData.specialRequests}

Aircraft Preferences:
${formData.preferredAircraft}

Purpose of Flight:
${formData.purpose === 'other' ? formData.otherPurpose : formData.purpose}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0a192f;">New Booking Request</h2>
              
              <h3 style="color: #0a192f; margin-top: 20px;">Contact Details</h3>
              <p><strong>Full Name:</strong> ${formData.fullName}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>Preferred Contact Method:</strong> ${formData.preferredContact}</p>

              <h3 style="color: #0a192f; margin-top: 20px;">Trip Information</h3>
              <p><strong>Type of Trip:</strong> ${formData.tripType === 'other' ? formData.otherTripType : formData.tripType}</p>
              <p><strong>Departure City/Airport:</strong> ${formData.departureCity}</p>
              <p><strong>Arrival City/Airport:</strong> ${formData.arrivalCity}</p>
              <p><strong>Departure Date & Time:</strong> ${formData.departureDateTime}</p>
              <p><strong>Return Date & Time:</strong> ${formData.returnDateTime}</p>
              <p><strong>Dates Flexible:</strong> ${formData.datesFlexible}</p>

              <h3 style="color: #0a192f; margin-top: 20px;">Passenger Details</h3>
              <p><strong>Number of Passengers:</strong> ${formData.numberOfPassengers}</p>
              <p><strong>Has Children:</strong> ${formData.hasChildren}</p>
              ${formData.hasChildren === 'yes' ? `
              <p><strong>Number of Children:</strong> ${formData.numberOfChildren}</p>
              <p><strong>Children Ages:</strong> ${formData.childrenAges}</p>
              <p><strong>Needs Child Seat:</strong> ${formData.needsChildSeat}</p>
              ` : ''}
              <p><strong>Special Requests:</strong></p>
              <p style="white-space: pre-wrap;">${formData.specialRequests}</p>

              <h3 style="color: #0a192f; margin-top: 20px;">Aircraft Preferences</h3>
              <p style="white-space: pre-wrap;">${formData.preferredAircraft}</p>

              <h3 style="color: #0a192f; margin-top: 20px;">Purpose of Flight</h3>
              <p>${formData.purpose === 'other' ? formData.otherPurpose : formData.purpose}</p>
            </div>
          `
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking request');
      }

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        tripType: 'dropoff',
        departureCity: '',
        arrivalCity: '',
        departureDateTime: '',
        returnDateTime: '',
        datesFlexible: 'no',
        numberOfPassengers: 1,
        hasChildren: 'no',
        numberOfChildren: 0,
        childrenAges: '',
        needsChildSeat: 'no',
        specialRequests: '',
        preferredAircraft: '',
        purpose: 'business',
        confirmInfo: false,
        otherTripType: '',
        otherPurpose: '',
      });
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit booking request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-navy">
      <Header />
      {showSignInPrompt && <SignInPromptModal onClose={() => setShowSignInPrompt(false)} />}
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
            Book your private jet charter with VMO AERO
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-sm shadow-lg border border-gold/20">
            <h2 className="font-display text-2xl font-light text-navy mb-6 text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Flight Booking Request
            </h2>
            {submitStatus === 'success' ? (
              <div className="text-center py-6">
                <p className="text-gold font-semibold mb-4">Thank you for your booking request!</p>
                <p className="text-gray-600">We'll review your request and get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Details Section */}
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-light text-navy" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Contact Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-gray-700 mb-2 font-light">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2 font-light">Email Address <span className="text-red-500">*</span></label>
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
                      <label htmlFor="phone" className="block text-gray-700 mb-2 font-light">Phone Number (WhatsApp Preferred)</label>
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
                      <label className="block text-gray-700 mb-2 font-light">Preferred Contact Method</label>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === 'email'}
                            onChange={handleInputChange}
                            className="form-radio text-gold"
                          />
                          <span className="ml-2">Email</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === 'phone'}
                            onChange={handleInputChange}
                            className="form-radio text-gold"
                          />
                          <span className="ml-2">Phone</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="whatsapp"
                            checked={formData.preferredContact === 'whatsapp'}
                            onChange={handleInputChange}
                            className="form-radio text-gold"
                          />
                          <span className="ml-2">WhatsApp</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip Information Section */}
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-light text-navy" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Trip Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="tripType" className="block text-gray-700 mb-2 font-light">Type of Trip <span className="text-red-500">*</span></label>
                      <select
                        id="tripType"
                        name="tripType"
                        value={formData.tripType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                      >
                        <option value="dropoff">Drop off</option>
                        <option value="dropandwait">Drop and wait</option>
                        <option value="pickup">Pick up</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {formData.tripType === 'other' && (
                      <div className="mt-2">
                        <label htmlFor="otherTripType" className="block text-gray-700 mb-2 font-light">Please specify your trip type <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="otherTripType"
                          name="otherTripType"
                          value={formData.otherTripType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                          required
                        />
                      </div>
                    )}
                    <div>
                      <label htmlFor="departureCity" className="block text-gray-700 mb-2 font-light">Departure City / Airport <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input
                          type="text"
                          id="departureCity"
                          name="departureCity"
                          autoComplete="off"
                          value={formData.departureCity}
                          onChange={handleDepartureCityChange}
                          onBlur={() => setTimeout(() => setShowAirportSuggestions(false), 100)}
                          onFocus={() => formData.departureCity && setShowAirportSuggestions(true)}
                          className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                          required
                        />
                        {showAirportSuggestions && airportSuggestions.length > 0 && (
                          <ul className="absolute z-10 left-0 right-0 bg-white border border-gold/20 rounded shadow-lg max-h-48 overflow-y-auto mt-1">
                            {airportSuggestions.map((suggestion, idx) => (
                              <li
                                key={idx}
                                className="px-4 py-2 cursor-pointer hover:bg-gold/10 text-navy"
                                onMouseDown={() => handleAirportSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="arrivalCity" className="block text-gray-700 mb-2 font-light">Arrival City / Airport <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="arrivalCity"
                        name="arrivalCity"
                        value={formData.arrivalCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="departureDateTime" className="block text-gray-700 mb-2 font-light">Preferred Departure Date & Time <span className="text-red-500">*</span></label>
                      <input
                        type="datetime-local"
                        id="departureDateTime"
                        name="departureDateTime"
                        value={formData.departureDateTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                        required
                      />
                    </div>
                    {(formData.tripType === 'dropandwait' || formData.tripType === 'other') && (
                      <div>
                        <label htmlFor="returnDateTime" className="block text-gray-700 mb-2 font-light">Return Date & Time <span className="text-red-500">*</span></label>
                        <input
                          type="datetime-local"
                          id="returnDateTime"
                          name="returnDateTime"
                          value={formData.returnDateTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                          required
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-gray-700 mb-2 font-light">Are Your Dates Flexible?</label>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="datesFlexible"
                            value="yes"
                            checked={formData.datesFlexible === 'yes'}
                            onChange={handleInputChange}
                            className="form-radio text-gold"
                          />
                          <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="datesFlexible"
                            value="no"
                            checked={formData.datesFlexible === 'no'}
                            onChange={handleInputChange}
                            className="form-radio text-gold"
                          />
                          <span className="ml-2">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Passenger Details Section */}
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-light text-navy" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Passenger Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="numberOfPassengers" className="block text-gray-700 mb-2 font-light">Number of Passengers <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        id="numberOfPassengers"
                        name="numberOfPassengers"
                        min="1"
                        value={formData.numberOfPassengers}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-light">Any Children or Infants? <span className="text-red-500">*</span></label>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="hasChildren"
                            value="yes"
                            checked={formData.hasChildren === 'yes'}
                            onChange={handleInputChange}
                            className="form-radio text-gold"
                          />
                          <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="hasChildren"
                            value="no"
                            checked={formData.hasChildren === 'no'}
                            onChange={handleInputChange}
                            className="form-radio text-gold"
                          />
                          <span className="ml-2">No</span>
                        </label>
                      </div>
                    </div>
                    {formData.hasChildren === 'yes' && (
                      <>
                        <div>
                          <label htmlFor="numberOfChildren" className="block text-gray-700 mb-2 font-light">Number of Children</label>
                          <input
                            type="number"
                            id="numberOfChildren"
                            name="numberOfChildren"
                            min="0"
                            value={formData.numberOfChildren}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="childrenAges" className="block text-gray-700 mb-2 font-light">Ages of Children</label>
                          <input
                            type="text"
                            id="childrenAges"
                            name="childrenAges"
                            value={formData.childrenAges}
                            onChange={handleInputChange}
                            placeholder="e.g., 2, 5, 7"
                            className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2 font-light">Do you require a child seat or bassinet?</label>
                          <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="needsChildSeat"
                                value="yes"
                                checked={formData.needsChildSeat === 'yes'}
                                onChange={handleInputChange}
                                className="form-radio text-gold"
                              />
                              <span className="ml-2">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="needsChildSeat"
                                value="no"
                                checked={formData.needsChildSeat === 'no'}
                                onChange={handleInputChange}
                                className="form-radio text-gold"
                              />
                              <span className="ml-2">No</span>
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="md:col-span-2">
                      <label htmlFor="specialRequests" className="block text-gray-700 mb-2 font-light">Special Requests</label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        rows={3}
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Aircraft Preferences Section */}
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-light text-navy" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Aircraft Preferences
                  </h3>
                  <div>
                    <label htmlFor="preferredAircraft" className="block text-gray-700 mb-2 font-light">Preferred Aircraft Type</label>
                    <textarea
                      id="preferredAircraft"
                      name="preferredAircraft"
                      rows={2}
                      value={formData.preferredAircraft}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                    ></textarea>
                  </div>
                </div>

                {/* Purpose of Flight Section */}
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-light text-navy" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Purpose of Flight
                  </h3>
                  <div>
                    <select
                      id="purpose"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                    >
                      <option value="business">Business</option>
                      <option value="leisure">Leisure</option>
                      <option value="medical">Medical</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {formData.purpose === 'other' && (
                    <div className="mt-2">
                      <label htmlFor="otherPurpose" className="block text-gray-700 mb-2 font-light">Please specify your purpose of flight</label>
                      <input
                        type="text"
                        id="otherPurpose"
                        name="otherPurpose"
                        value={formData.otherPurpose}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-sm bg-white border border-gold/20 text-navy focus:outline-none focus:border-gold transition-all"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Terms and Submit */}
                <div className="space-y-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="confirmInfo"
                      name="confirmInfo"
                      checked={formData.confirmInfo}
                      onChange={handleInputChange}
                      className="mt-1 form-checkbox text-gold"
                      required
                    />
                    <label htmlFor="confirmInfo" className="ml-2 text-gray-700 font-light">
                      I confirm that the information provided is accurate.
                    </label>
                  </div>

                  {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    className="btn-primary w-full mt-4"
                    disabled={isSubmitting || !formData.confirmInfo}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking; 