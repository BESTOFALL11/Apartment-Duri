import React from 'react';
import { ChevronRight } from 'lucide-react';

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
    <button
      onClick={scrollToAmenities}
      className="w-full bg-brand-primary/10 hover:bg-brand-primary/20 border-y-2 border-brand-primary/30 py-5 md:py-6 overflow-hidden relative z-20 cursor-pointer transition-colors duration-300 group"
      aria-label="View all amenities"
    >
      {/* "View Amenities" hint on mobile */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-brand-primary font-bold text-xs md:text-sm uppercase tracking-wide z-10 bg-white/80 px-3 py-1.5 rounded-full shadow-sm md:hidden">
        <span>View All</span>
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>

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

      {/* Desktop hint */}
      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 items-center gap-2 text-brand-primary font-bold text-sm uppercase tracking-wide bg-white/90 px-4 py-2 rounded-full shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
        <span>View Amenities</span>
        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
};

export default Marquee;