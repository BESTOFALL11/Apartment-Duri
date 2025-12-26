import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 300], [0, 100]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("images/Pefkochori_Panorama.png")',
          y
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-slate-100/90 via-slate-100/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-slate-900/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-100/90" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-card p-8 md:p-16 rounded-[3rem] w-full relative overflow-hidden shadow-soft text-center"
        >
          {/* Subtle inner glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent"></div>

          <motion.div variants={itemVariants}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-brand-primary/5 border border-brand-primary/20 text-xs font-bold tracking-[0.2em] mb-6 uppercase text-brand-primary">
              Halkidiki, Greece
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-brand-dark mb-6 leading-[0.9]">
            Apartment <span className="italic text-brand-primary text-glow">Duri</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="max-w-xl mx-auto text-slate-600 text-lg md:text-xl font-light mb-10 leading-relaxed">
            Your beachfront sanctuary with stunning sea views, soundproof comfort, and modern amenities in the heart of Halkidiki.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#book"
              onClick={(e) => scrollToSection(e, 'book')}
              className="px-8 py-4 bg-brand-primary text-white rounded-full font-bold text-lg transition-all hover:bg-sky-600 hover:scale-105 shadow-glow hover:shadow-glow-sm cursor-pointer"
            >
              Book Your Stay
            </a>
            <a
              href="#showcase"
              onClick={(e) => scrollToSection(e, 'showcase')}
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-semibold text-lg transition-all hover:bg-slate-50 hover:text-brand-primary hover:border-brand-primary/30 shadow-sm hover:shadow-md cursor-pointer"
            >
              View Apartment
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-brand-primary transition-colors z-20"
      >
        <a href="#showcase" onClick={(e) => scrollToSection(e, 'showcase')} aria-label="Scroll down" className="cursor-pointer p-4">
          <ChevronDown size={32} />
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;