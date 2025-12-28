import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    // Small delay to allow the menu to close first
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${scrolled
    ? 'glass-nav py-4 shadow-sm'
    : 'bg-white/80 backdrop-blur-sm py-6 border-b border-white/30'
    }`;

  const linkClasses = `text-sm font-bold tracking-wide transition-colors duration-200 text-slate-800 hover:text-brand-primary hover:drop-shadow-sm cursor-pointer relative group`;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={navClasses}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`text-2xl font-serif font-bold tracking-tight text-brand-dark drop-shadow-sm cursor-pointer`}
            >
              {APP_NAME}
            </a>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            {['Showcase', 'Amenities', 'Reviews', 'Location'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.toLowerCase()); }}
                className={linkClasses}
              >
                {item.toUpperCase()}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            <motion.a
              href="#book"
              onClick={(e) => { e.preventDefault(); scrollToSection('book'); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full font-bold transition-all duration-300 bg-brand-primary text-white hover:bg-brand-secondary shadow-glow-sm hover:shadow-glow cursor-pointer"
            >
              Book Now
            </motion.a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-800 hover:text-brand-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute w-full border-t border-white/40 overflow-hidden z-[60] bg-white shadow-lg"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {['Showcase', 'Amenities', 'Reviews', 'Location'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-3 text-base font-bold text-slate-800 hover:bg-brand-primary/10 hover:text-brand-primary rounded-lg cursor-pointer transition-colors"
                >
                  {item}
                </button>
              ))}
              <button type="button" onClick={() => scrollToSection('book')} className="block w-full text-center px-5 py-3 mt-4 bg-brand-primary text-white font-bold rounded-lg shadow-glow-sm cursor-pointer hover:bg-brand-secondary transition-all">
                Book Your Stay
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;