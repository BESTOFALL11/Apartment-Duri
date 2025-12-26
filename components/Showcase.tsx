import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ROOMS } from '../constants';
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const Showcase: React.FC = () => {
  const [fullscreenState, setFullscreenState] = useState<{ images: string[], index: number } | null>(null);

  // Lock body scroll when fullscreen is active
  useEffect(() => {
    if (fullscreenState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [fullscreenState]);

  // Keyboard navigation
  useEffect(() => {
    if (!fullscreenState) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setFullscreenState(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenState]);

  const handleNext = () => {
    if (!fullscreenState) return;
    setFullscreenState(prev => prev ? ({
      ...prev,
      index: (prev.index + 1) % prev.images.length
    }) : null);
  };

  const handlePrev = () => {
    if (!fullscreenState) return;
    setFullscreenState(prev => prev ? ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length
    }) : null);
  };

  return (
    <div id="showcase" className="relative z-10 py-16 md:py-32 lg:py-48 overflow-hidden">
      <div className="text-center px-4 mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-block"
        >
          <div className="glass px-6 py-2 rounded-full mb-6 inline-block border-brand-primary/20 bg-white/50">
            <span className="text-brand-primary font-bold tracking-widest text-xs uppercase">The Experience</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mb-6">
            Curated Spaces
          </h2>
        </motion.div>
      </div>

      {/* Interactive Floor Plan */}
      <InteractiveFloorPlan />

      <div className="space-y-16 md:space-y-32 lg:space-y-48">
        {ROOMS.map((room, index) => (
          <RoomSection
            key={room.id}
            room={room}
            index={index}
            onFullscreen={(images, idx) => setFullscreenState({ images, index: idx })}
          />
        ))}
      </div>

      {/* Fullscreen Modal - Rendered via Portal to escape z-index issues */}
      {fullscreenState && createPortal(
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            onClick={() => setFullscreenState(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setFullscreenState(null)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white transition-colors z-50 bg-black/20 rounded-full hover:bg-black/50"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons (Desktop) */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white transition-all hover:scale-110 z-50 bg-black/20 rounded-full hover:bg-black/50 hidden md:block"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white transition-all hover:scale-110 z-50 bg-black/20 rounded-full hover:bg-black/50 hidden md:block"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Container */}
            <div
              className="w-full h-full flex items-center justify-center p-4 md:p-12"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area (optional, but good for drag)
            >
              <motion.img
                key={fullscreenState.index}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.3 }}
                src={fullscreenState.images[fullscreenState.index]}
                alt="Fullscreen view"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    handleNext();
                  } else if (swipe > 10000) {
                    handlePrev();
                  }
                }}
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none">
              {fullscreenState.index + 1} / {fullscreenState.images.length}
            </div>

          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

const InteractiveFloorPlan: React.FC = () => {
  const scrollToRoom = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const RoomShape = ({ d, id, label, x, y }: { d: string, id: string, label: string, x: string, y: string }) => (
    <motion.g
      onClick={() => scrollToRoom(id)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group cursor-pointer"
    >
      <motion.path
        d={d}
        variants={pathVariants}
        className="fill-white/80 transition-colors duration-300 stroke-slate-300 stroke-[2px] group-hover:fill-sky-50 group-hover:stroke-brand-primary"
      />
      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.2 }}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xs md:text-sm font-bold fill-slate-500 pointer-events-none uppercase tracking-widest transition-colors duration-300 group-hover:fill-brand-primary font-sans select-none"
      >
        {label}
      </motion.text>
    </motion.g>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 mb-16 md:mb-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-card p-4 md:p-12 rounded-2xl md:rounded-[3rem] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="20" fill="none" />
          </svg>
        </div>

        <div className="absolute top-8 left-0 w-full text-center z-10 pointer-events-none">
          <span className="text-brand-primary text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">Interactive Layout</span>
        </div>

        <div className="aspect-[1/1] md:aspect-[2.2/1] w-full mt-4 md:mt-8">
          <motion.svg
            viewBox="0 0 600 350"
            className="w-full h-full drop-shadow-sm select-none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <RoomShape
              id="balcony"
              label="Balcony"
              d="M 20 40 H 580 A 10 10 0 0 1 590 50 V 90 A 10 10 0 0 1 580 100 H 20 A 10 10 0 0 1 10 90 V 50 A 10 10 0 0 1 20 40 Z"
              x="300" y="70"
            />
            <RoomShape
              id="living"
              label="Living Area"
              d="M 20 110 H 340 V 300 A 10 10 0 0 1 330 310 H 20 A 10 10 0 0 1 10 300 V 110 Z"
              x="175" y="210"
            />
            <RoomShape
              id="kitchen"
              label="Kitchen"
              d="M 350 110 H 580 A 10 10 0 0 1 590 120 V 190 H 350 V 110 Z"
              x="470" y="150"
            />
            <RoomShape
              id="bedroom"
              label="Bedroom"
              d="M 350 200 H 480 V 300 A 10 10 0 0 1 470 310 H 350 V 200 Z"
              x="415" y="255"
            />
            <RoomShape
              id="bath"
              label="Bath"
              d="M 490 200 H 580 A 10 10 0 0 1 590 210 V 300 A 10 10 0 0 1 580 310 H 490 V 200 Z"
              x="540" y="255"
            />

            {/* Doors/Connectors */}
            <motion.path d="M 150 100 V 110" variants={pathVariants} className="stroke-slate-300 stroke-[2px]" />
            <motion.path d="M 400 100 V 110" variants={pathVariants} className="stroke-slate-300 stroke-[2px]" />
            <motion.path d="M 340 140 H 350" variants={pathVariants} className="stroke-slate-300 stroke-[2px]" />
            <motion.path d="M 340 250 H 350" variants={pathVariants} className="stroke-slate-300 stroke-[2px]" />
          </motion.svg>
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs text-slate-500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            Select a space to view details
          </span>
        </div>
      </motion.div>
    </div>
  );
};

interface RoomSectionProps {
  room: typeof ROOMS[0];
  index: number;
  onFullscreen: (images: string[], index: number) => void;
}

const RoomSection: React.FC<RoomSectionProps> = ({ room, index, onFullscreen }) => {
  const isEven = index % 2 === 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Removed heavy parallax for better performance on older devices

  const scrollToBook = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  // Simplified slide variants for better performance
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section id={room.id} ref={containerRef} className="relative scroll-mt-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>

          {/* Image Block - Made Larger (approx 60%) */}
          <motion.div
            className="w-full lg:w-[58%] relative z-0"
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden aspect-[4/3] md:aspect-[16/10] shadow-soft border border-white/60 group">
              {/* Image Container (parallax removed for performance) */}
              <div className="w-full h-full relative">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.img
                    key={currentImageIndex}
                    src={room.images[currentImageIndex]}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "tween", duration: 0.3 },
                      opacity: { duration: 0.2 }
                    }}
                    alt={room.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent">
                <div className="flex space-x-4">
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-full bg-white/30 text-white hover:bg-white hover:text-brand-primary transition-colors shadow-lg border border-white/20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-full bg-white/30 text-white hover:bg-white hover:text-brand-primary transition-colors shadow-lg border border-white/20"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <button
                  onClick={() => onFullscreen(room.images, currentImageIndex)}
                  className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-brand-primary backdrop-blur-md transition-all shadow-lg border border-white/20 hover:scale-110"
                  aria-label="View fullscreen"
                >
                  <Maximize2 size={20} />
                </button>
              </div>

              {/* Dots */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {room.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentImageIndex ? 1 : -1);
                      setCurrentImageIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/40 w-4 hover:bg-white/80'
                      }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative background element - hidden on mobile for performance */}
            <div className={`hidden md:block absolute -bottom-10 -right-10 w-full h-full border border-brand-primary/10 rounded-[3rem] -z-10 ${isEven ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'}`}></div>
          </motion.div>

          {/* Text Block - Made Smaller (approx 40%) */}
          <div className="w-full lg:w-[38%] relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="glass-card p-5 md:p-10 rounded-2xl md:rounded-[2.5rem]"
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-serif text-brand-primary italic drop-shadow-[0_0_15px_rgba(2,132,199,0.2)]">0{index + 1}</span>
                <div className="h-[1px] bg-slate-200 flex-grow"></div>
              </div>

              <h3 className="text-2xl md:text-4xl font-serif font-medium text-brand-dark mb-4">
                {room.title}
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed font-light text-base">
                {room.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {room.features.map((feature, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-600 font-medium hover:border-brand-primary/30 transition-colors">
                    {feature}
                  </span>
                ))}
              </div>

              <motion.a
                href="#book"
                onClick={scrollToBook}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-between w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 px-6 py-3 rounded-xl font-bold tracking-wide uppercase text-xs transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
              >
                Book This Room
                <span className="ml-4 p-1.5 bg-brand-primary rounded-full text-white group-hover:bg-brand-secondary transition-colors">
                  <ArrowRight size={12} />
                </span>
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Showcase;