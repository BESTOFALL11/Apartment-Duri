import React from 'react';
import { ChevronDown } from 'lucide-react';

const Marquee: React.FC = () => {
  const items = [
    "MODERN LIVING", "✦", "SEA VIEW", "✦", "FREE WIFI", "✦", "PRIME LOCATION", "✦",
    "SOUNDPROOF", "✦", "HALKIDIKI", "✦", "APARTMENT DURI", "✦"
  ];

  const scrollToAmenities = () => {
    const element = document.getElementById('amenities');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-brand-primary/10 border-y-2 border-brand-primary/30 overflow-hidden relative z-20">
      {/* Scrolling amenities text */}
      <div className="py-4 md:py-5">
        <div className="flex w-[200%] animate-scroll whitespace-nowrap">
          <div className="flex items-center space-x-8 md:space-x-12 px-6">
            {items.map((text, i) => (
              <span key={i} className="text-brand-primary font-bold tracking-[0.15em] text-base md:text-lg">
                {text}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-8 md:space-x-12 px-6">
            {items.map((text, i) => (
              <span key={`dup-${i}`} className="text-brand-primary font-bold tracking-[0.15em] text-base md:text-lg">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* View Amenities button - below the scrolling text */}
      <button
        onClick={scrollToAmenities}
        className="w-full flex items-center justify-center gap-2 py-3 bg-brand-primary text-white font-bold text-sm md:text-base uppercase tracking-wide hover:bg-brand-primary/90 transition-colors cursor-pointer"
        aria-label="View all amenities"
      >
        <span>View All Amenities</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </div>
  );
};

export default Marquee;