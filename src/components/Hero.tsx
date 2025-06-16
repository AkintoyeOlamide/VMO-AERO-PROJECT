import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const videoSources = ['/main-video.mp4', '/Hero-video-4.mp4', '/Hero-video-1.mp4', '/Hero-video-3.mp4'];

const Hero: React.FC = () => {
  const [mainHeadingText, setMainHeadingText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const mainHeading = 'Driving Innovation and Excellence in Aircraft Management';
  const [mainHeadingIndex, setMainHeadingIndex] = useState(0);
  const [typingSpeed] = useState(50);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isHeadingVisible, setIsHeadingVisible] = useState(true);
  const [typingDone, setTypingDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    // Remove any hash from the URL
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!isHeadingVisible) {
      setMainHeadingText('');
      setMainHeadingIndex(0);
      return;
    }
    if (isHeadingVisible) {
      setMainHeadingText('');
      setMainHeadingIndex(0);
    }
  }, [isHeadingVisible]);

  useEffect(() => {
    if (!isHeadingVisible) return;
    const timeout = setTimeout(() => {
      // Typing effect for main heading
      if (mainHeadingIndex < mainHeading.length) {
        setMainHeadingText(mainHeading.substring(0, mainHeadingIndex + 1));
        setMainHeadingIndex(mainHeadingIndex + 1);
      } else {
        setTypingDone(true);
        setShowPopup(true);
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [mainHeadingIndex, mainHeading, typingSpeed, isHeadingVisible]);

  // Loop heading visibility after typing is done
  useEffect(() => {
    if (!typingDone) return;
    setIsHeadingVisible(true);
    let timeout: number;
    function toggleVisibility(currentlyVisible: boolean) {
      timeout = window.setTimeout(() => {
        setIsHeadingVisible(!currentlyVisible);
        toggleVisibility(!currentlyVisible);
      }, currentlyVisible ? 4000 : 10000);
    }
    toggleVisibility(true);
    return () => clearTimeout(timeout);
  }, [typingDone]);

  const handleVideoLoaded = (videoEl: HTMLVideoElement) => {
    if (videoIndex === 0) {
      videoEl.playbackRate = 2.0;
      videoEl.currentTime = 0;
    } else {
      videoEl.playbackRate = 1.0;
      videoEl.currentTime = 0;
    }
  };

  const handleVideoEnd = () => {
    setVideoIndex((prev) => (prev + 1) % videoSources.length);
  };

  const handleScrollDown = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden">
      {/* Airplane Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          key={videoIndex}
          src={videoSources[videoIndex]}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          onLoadedMetadata={e => handleVideoLoaded(e.currentTarget)}
          onEnded={handleVideoEnd}
        />
      </div>
      {/* Move content to bottom */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center absolute bottom-0 left-0 right-0 z-20 pb-16">
        <div className="max-w-6xl mx-auto">
          {isHeadingVisible && (
            <h1 className="font-['Helvetica'] text-2xl md:text-3xl lg:text-4xl font-light text-silver-light mb-4 min-h-[4rem] tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300">
              {mainHeadingText}
            </h1>
          )}
          <div className={`transform transition-all duration-500 ease-out ${showPopup ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="text-silver text-base md:text-lg max-w-4xl mx-auto">
              Ready to elevate your aviation experience?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link to="/about" className="btn-primary">
                Learn More
              </Link>
              <Link to="/services" className="btn-secondary bg-gold text-black hover:bg-gold/90 font-bold">
                Discover the VMO Experience
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy to-transparent z-10"></div>
    </section>
  );
};

export default Hero;