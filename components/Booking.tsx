import React from 'react';
import { SOCIAL_LINKS, PHONE_NUMBER, EMAIL_ADDRESS } from '../constants';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Booking: React.FC = () => {
  return (
    <section id="book" className="py-32 md:py-48 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-[3rem] overflow-hidden shadow-soft relative"
        >
          {/* Animated decorative gradient */}
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(2,132,199,0.03)_0%,transparent_50%)] animate-spin-slow pointer-events-none"></div>

          <div className="flex flex-col md:flex-row relative z-10">

            {/* Left Side: Call to Action */}
            <div className="md:w-1/2 p-10 md:p-20 flex flex-col justify-center relative">
              <span className="text-brand-primary font-bold tracking-widest text-sm uppercase mb-4">
                Availability
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">
                Reserve Your Sanctuary
              </h2>
              <p className="text-slate-600 mb-10 text-lg font-light leading-relaxed">
                We believe in personal connection. Contact us directly to secure the best rates and customize your stay.
              </p>

              <div className="space-y-4">
                {SOCIAL_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center w-full px-6 py-5 rounded-2xl text-white font-bold shadow-md transition-all border border-white/20 ${link.color} hover:opacity-90 hover:shadow-lg relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                    <link.icon className="mr-3" size={20} />
                    Chat on {link.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Side: Contact Details */}
            <div className="md:w-1/2 bg-slate-50/80 p-10 md:p-20 flex flex-col justify-center relative border-l border-slate-100 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/20 rounded-full filter blur-[80px] -mr-20 -mt-20 animate-pulse"></div>

              <h3 className="text-2xl font-serif font-bold text-brand-dark mb-10 relative z-10">Contact Details</h3>

              <div className="space-y-8 relative z-10">
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                  className="flex items-center group transition-transform active:scale-95"
                >
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:shadow-md">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-lg text-brand-text font-medium group-hover:text-brand-primary transition-colors">{PHONE_NUMBER}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center group transition-transform active:scale-95"
                >
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:shadow-md">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Email</p>
                    <p className="text-lg text-brand-text font-medium group-hover:text-brand-primary transition-colors">{EMAIL_ADDRESS}</p>
                  </div>
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Apartment+Duri+Halkidiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group transition-transform active:scale-95"
                >
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:shadow-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Address</p>
                    <p className="text-lg text-brand-text font-medium group-hover:text-brand-primary transition-colors">Pefkochori, Halkidiki, Greece</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;