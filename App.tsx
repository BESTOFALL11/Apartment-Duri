import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Marquee from './components/Marquee';
import Amenities from './components/Amenities';
import Location from './components/Location';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Weather from './components/Weather';
import Reviews from './components/Reviews';

const App: React.FC = () => {
  const scrollToBook = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Showcase />
        <Amenities />
        <Reviews />
        <Location />
        <Booking />
      </main>
      <Footer />
      <Weather />

      {/* Floating Action Button for Mobile */}
      <a
        href="#book"
        onClick={scrollToBook}
        className="fixed bottom-6 right-6 md:hidden z-40 bg-brand-primary text-white p-4 rounded-full shadow-glow-lg active:scale-95 transition-transform cursor-pointer border border-white/20"
        aria-label="Book Now"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
      </a>
    </div>
  );
};

export default App;