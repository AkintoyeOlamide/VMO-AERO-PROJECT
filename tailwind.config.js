/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
          dark: '#020617',
        },
        gold: {
          DEFAULT: '#e6c992',
          light: '#f0deb6',
          dark: '#c9a76c',
        },
        silver: {
          DEFAULT: '#e2e8f0',
          light: '#f8fafc',
          dark: '#94a3b8',
        },
        success: {
          DEFAULT: '#10b981',
          light: '#a7f3d0',
          dark: '#065f46',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fde68a',
          dark: '#92400e',
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#fecaca',
          dark: '#991b1b',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7)), url('https://images.pexels.com/photos/15055385/pexels-photo-15055385/free-photo-of-a-private-jet.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        'stats-pattern': "linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.8)), url('/airplaine6.jpg')",
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
    },
  },
  plugins: [],
};