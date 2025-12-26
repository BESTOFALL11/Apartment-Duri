import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  // Reduced parallax intensity for better performance
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 300], [0, 50]);

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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
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
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl w-full text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span
              className="inline-block py-2 px-5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-bold tracking-[0.2em] mb-8 uppercase text-white"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              Halkidiki, Greece
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-[0.9]"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)'
            }}
          >
            Apartment <span className="text-sky-300 font-extrabold">Duri</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-white/90 text-xl md:text-2xl font-medium mb-12 leading-relaxed"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            Your beachfront sanctuary with stunning sea views, soundproof comfort, and modern amenities in the heart of Halkidiki.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="#book"
              onClick={(e) => scrollToSection(e, 'book')}
              className="px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg transition-all hover:bg-sky-400 hover:text-white hover:scale-105 shadow-xl cursor-pointer"
            >
              Book Your Stay
            </a>
            <a
              href="#showcase"
              onClick={(e) => scrollToSection(e, 'showcase')}
              className="px-10 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white rounded-full font-bold text-lg transition-all hover:bg-white hover:text-slate-900 shadow-xl cursor-pointer"
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
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors z-20"
      >
        <a href="#showcase" onClick={(e) => scrollToSection(e, 'showcase')} aria-label="Scroll down" className="cursor-pointer p-4">
          <ChevronDown size={36} />
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;