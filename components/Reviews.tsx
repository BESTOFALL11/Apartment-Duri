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
        name: "Maria S.",
        country: "Germany",
        rating: 10,
        text: "Absolutely stunning apartment with breathtaking sea views! The location is perfect - just steps from the beach. Everything was spotlessly clean and the host was incredibly helpful. Will definitely return!",
        date: "October 2024"
    },
    {
        name: "John D.",
        country: "United Kingdom",
        rating: 10,
        text: "Best holiday accommodation we've ever stayed in. The soundproofing is amazing - we slept so well every night. The balcony view at sunset is unforgettable. Highly recommend!",
        date: "September 2024"
    },
    {
        name: "Sophie L.",
        country: "France",
        rating: 9.5,
        text: "Beautiful modern apartment in the heart of Pefkochori. Walking distance to restaurants, shops, and the beach. The AC was a lifesaver in summer. Perfect for couples or small families.",
        date: "August 2024"
    },
    {
        name: "Marco R.",
        country: "Italy",
        rating: 10,
        text: "Exceeded all expectations! The apartment is exactly as shown in photos - actually even better in person. The kitchen had everything we needed. The host provided great local tips.",
        date: "July 2024"
    },
    {
        name: "Anna K.",
        country: "Poland",
        rating: 9.8,
        text: "We stayed for two weeks and didn't want to leave. The apartment is super comfortable with all modern amenities. The sea view from the balcony is spectacular. A hidden gem!",
        date: "August 2024"
    },
    {
        name: "Thomas B.",
        country: "Netherlands",
        rating: 10,
        text: "Outstanding property! Clean, modern, and perfectly located. The beach is literally a 2-minute walk. We loved watching the sunrise from the balcony every morning. Can't wait to come back!",
        date: "September 2024"
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
