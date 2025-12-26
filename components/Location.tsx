import React, { useRef } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Location: React.FC = () => {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Apartment+Duri+Halkidiki";
  const containerRef = useRef(null);

  return (
    <section id="location" ref={containerRef} className="py-32 md:py-48 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">

          {/* Map Preview - Overlapping layout on large screens */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-7/12 w-full relative z-0"
          >
            <div className="relative rounded-[3rem] overflow-hidden aspect-square md:aspect-video lg:aspect-[4/3] shadow-soft border border-white/60 group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: 'url("/images/Location.png")' }}
              >
                <div className="absolute inset-0 bg-slate-100/10 group-hover:bg-slate-100/0 transition-colors" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                  <div className="relative inline-flex rounded-full h-16 w-16 bg-white items-center justify-center text-brand-primary shadow-xl">
                    <MapPin size={32} fill="currentColor" />
                  </div>
                </div>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label="Open Map"
              ></a>
            </div>
          </motion.div>

          {/* Text Content - Negative margin to overlap on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:w-6/12 w-full lg:-ml-20 relative z-10 mt-10 lg:mt-0"
          >
            <div className="glass-card p-8 md:p-16 rounded-[2.5rem] shadow-lg">
              <span className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-4 block">
                The Neighborhood
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-text mb-6">
                In the Heart of Halkidiki
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-light">
                Apartment Duri is perfectly situated to offer you the best of the Aegean.
                Just steps away from the crystal-clear waters and a short walk to local tavernas,
                cafes, and shops.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Direct beach access within walking distance",
                  "Close to traditional Greek tavernas",
                  "Easy access to local markets and shops",
                  "Quiet, residential neighborhood"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center text-slate-700"
                  >
                    <span className="h-2 w-2 rounded-full bg-brand-primary mr-4 shadow-sm flex-shrink-0"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-brand-text text-white rounded-full font-bold text-lg transition-all hover:bg-brand-primary hover:scale-105 shadow-lg group"
              >
                <MapPin className="mr-2" size={20} />
                View on Google Maps
                <ExternalLink className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity" size={16} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Location;