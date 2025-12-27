import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Review {
    name: string;
    country: string;
    rating: number;
    text: string;
    date: string;
}

const REVIEWS: Review[] = [
    {
        name: "Kalina",
        country: "Bulgaria",
        rating: 9.0,
        text: "Superb studio apartment. Super close to the beach and a supermarket. It has a big balcony to chill at for a lazy evening. A kitchen with everything you need, iron, hair dryer and a washing machine. We had a lovely time with my friend. The hosts are a lovely family. They were amazing, they made us feel safe and at home. Fully recommend!",
        date: "August 2024"
    },
    {
        name: "Bojan",
        country: "United States",
        rating: 10,
        text: "Very good location. Minute to the beach, just what we were looking for. We will go again.",
        date: "July 2025"
    },
    {
        name: "Pantelija",
        country: "Serbia",
        rating: 10,
        text: "The owners are very kind. Everything is clean and tidy. Recommendation for the facility.",
        date: "September 2024"
    },
    {
        name: "Dalibor",
        country: "Serbia",
        rating: 10,
        text: "Lovely spot, close to beautiful beach, not far from the center. Very kind hosts, wonderful people! Clean, almost brand new apartment!",
        date: "July 2023"
    },
    {
        name: "Milos",
        country: "Serbia",
        rating: 10,
        text: "Clean, comfortable, hosts always available. Apartment in excellent location - 100m from the beach, 50m from the supermarket. Excellent for vacation with small children. Highly recommend!",
        date: "June 2025"
    },
    {
        name: "Ilic",
        country: "Germany",
        rating: 9.0,
        text: "The accommodation was really good and comfortable, close to the beach, there was always parking in front of the building, the sound insulation is super. In any case, everything was super!",
        date: "June 2024"
    }
];

const Reviews: React.FC = () => {
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
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const averageRating = (REVIEWS.reduce((acc, r) => acc + r.rating, 0) / REVIEWS.length).toFixed(1);

    return (
        <section id="reviews" className="py-16 md:py-32 relative overflow-hidden z-10 bg-gradient-to-b from-transparent via-sky-50/30 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-3 block">Guest Experiences</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mb-6">
                            Reviews
                        </h2>

                        {/* Overall Rating Badge */}
                        <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-slate-100">
                            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-brand-primary text-white font-bold text-2xl">
                                {averageRating}
                            </div>
                            <div className="text-left">
                                <div className="flex gap-0.5 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-sm text-slate-500">Based on <span className="font-semibold text-brand-dark">Booking.com</span> reviews</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Reviews Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {REVIEWS.map((review, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group p-6 md:p-8 rounded-xl md:rounded-[2rem] bg-white border border-slate-100/50 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Quote Icon */}
                            <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 group-hover:text-sky-100 transition-colors" />

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary font-bold text-sm">
                                    {review.rating}
                                </span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                            </div>

                            {/* Review Text */}
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                                "{review.text}"
                            </p>

                            {/* Reviewer Info */}
                            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                <div>
                                    <p className="font-semibold text-brand-dark">{review.name}</p>
                                    <p className="text-xs text-slate-400">{review.country}</p>
                                </div>
                                <span className="text-xs text-slate-400">{review.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Booking.com Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://www.booking.com/hotel/gr/apartment-duri.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:text-brand-primary hover:border-brand-primary/30 hover:shadow-md transition-all"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
                        </svg>
                        See all reviews on Booking.com
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Reviews;
