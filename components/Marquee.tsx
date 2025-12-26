import React from 'react';

const Marquee: React.FC = () => {
  const items = [
    "MODERN LIVING", "✦", "SEA VIEW", "✦", "FREE WIFI", "✦", "PRIME LOCATION", "✦", 
    "SOUNDPROOF", "✦", "HALKIDIKI", "✦", "APARTMENT DURI", "✦"
  ];

  return (
    <div className="w-full glass border-y border-white/50 py-6 overflow-hidden relative z-20 bg-white/20">
      <div className="flex w-[200%] animate-scroll whitespace-nowrap">
        <div className="flex items-center space-x-12 px-6">
          {items.map((text, i) => (
            <span key={i} className="text-slate-500/80 font-bold tracking-[0.2em] text-sm md:text-lg">
              {text}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-12 px-6">
          {items.map((text, i) => (
            <span key={`dup-${i}`} className="text-slate-500/80 font-bold tracking-[0.2em] text-sm md:text-lg">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;