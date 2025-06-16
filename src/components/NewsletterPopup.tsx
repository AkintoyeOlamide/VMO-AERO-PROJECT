import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface NewsletterPopupProps {
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email,
        subscribedAt: new Date().toISOString()
      });

      setSubscribed(true);
      setTimeout(onClose, 1500);
    } catch (err) {
      setError('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-navy text-2xl font-bold"
          onClick={onClose}
          aria-label="Close newsletter popup"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-navy mb-2 text-center">Stay in the Loop!</h2>
        <p className="text-gray-700 mb-6 text-center">Subscribe to our newsletter for exclusive updates, offers, and aviation insights.</p>
        {subscribed ? (
          <div className="text-center text-gold font-semibold py-6">Thank you for subscribing!</div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="border border-navy/20 rounded px-4 py-2 focus:outline-none focus:border-gold text-navy"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="btn-primary w-full"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup; 