import React from 'react';
import { motion } from 'framer-motion';
import { AMENITIES } from '../constants';

const Amenities: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="amenities" className="py-32 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-3 block">Premium Comfort</span>
              <h2 className="text-4xl md:text-6xl font-serif text-brand-dark">
                Amenities
              </h2>
            </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {AMENITIES.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-8 rounded-[2rem] bg-white border border-slate-100/50 shadow-card hover:shadow-glow transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-slate-50 group-hover:bg-white flex items-center justify-center text-brand-primary mb-6 transition-colors duration-500 border border-slate-100 shadow-sm group-hover:shadow-md group-hover:text-brand-secondary">
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-dark tracking-wide group-hover:text-brand-primary transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light group-hover:text-slate-600 transition-colors">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;