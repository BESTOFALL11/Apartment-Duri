import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, RefreshCw } from 'lucide-react';

// Types
interface Booking {
    id: string;
    startDate: string;
    endDate: string;
    source: 'booking.com' | 'manual';
}

interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isBooked: boolean;
    isPast: boolean;
}

// Helper functions
const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
};

const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const isDateInRange = (date: Date, startDate: string, endDate: string): boolean => {
    const d = formatDate(date);
    return d >= startDate && d <= endDate;
};

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// iCal parser for Booking.com
const parseICalData = (icalData: string): Booking[] => {
    const bookings: Booking[] = [];
    const events = icalData.split('BEGIN:VEVENT');

    events.forEach((event, index) => {
        if (index === 0) return; // Skip header

        const startMatch = event.match(/DTSTART(?:;VALUE=DATE)?:(\d{8})/);
        const endMatch = event.match(/DTEND(?:;VALUE=DATE)?:(\d{8})/);

        if (startMatch && endMatch) {
            const startDate = `${startMatch[1].slice(0, 4)}-${startMatch[1].slice(4, 6)}-${startMatch[1].slice(6, 8)}`;
            // iCal end dates are exclusive, so subtract one day
            const endDateRaw = new Date(
                parseInt(endMatch[1].slice(0, 4)),
                parseInt(endMatch[1].slice(4, 6)) - 1,
                parseInt(endMatch[1].slice(6, 8)) - 1
            );
            const endDate = formatDate(endDateRaw);

            bookings.push({
                id: `ical-${index}`,
                startDate,
                endDate,
                source: 'booking.com'
            });
        }
    });

    return bookings;
};

const AvailabilityCalendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastSync, setLastSync] = useState<Date | null>(null);
    const [syncing, setSyncing] = useState(false);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const today = new Date();

    // Fetch bookings from Booking.com iCal
    const fetchBookings = async () => {
        setSyncing(true);
        try {
            const ICAL_URL = 'https://ical.booking.com/v1/export?t=ca8fbb03-b908-40b9-bcf9-37121756164d';

            // Try multiple CORS proxies in order of reliability
            const proxies = [
                `https://corsproxy.io/?${encodeURIComponent(ICAL_URL)}`,
                `https://api.allorigins.win/raw?url=${encodeURIComponent(ICAL_URL)}`,
                `https://cors-anywhere.herokuapp.com/${ICAL_URL}`
            ];

            let icalData = '';

            for (const proxyUrl of proxies) {
                try {
                    const response = await fetch(proxyUrl, {
                        headers: { 'Accept': 'text/calendar' }
                    });
                    if (response.ok) {
                        icalData = await response.text();
                        if (icalData.includes('VCALENDAR')) {
                            break; // Valid iCal data received
                        }
                    }
                } catch (e) {
                    console.log('Proxy failed, trying next...');
                    continue;
                }
            }

            if (icalData && icalData.includes('VCALENDAR')) {
                const parsedBookings = parseICalData(icalData);
                setBookings(parsedBookings);
                setLastSync(new Date());
            }
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            setLoading(false);
        }
        setSyncing(false);
    };

    useEffect(() => {
        // Load manual bookings from localStorage (set by admin panel)
        const loadManualBookings = () => {
            try {
                const stored = localStorage.getItem('apartment_duri_bookings');
                if (stored) {
                    const manualBookings = JSON.parse(stored) as Booking[];
                    setBookings(prev => {
                        // Keep only Booking.com bookings from API, add manual ones from storage
                        const apiBookings = prev.filter(b => b.source === 'booking.com' && b.id.startsWith('ical-'));
                        return [...apiBookings, ...manualBookings];
                    });
                }
            } catch (e) {
                console.error('Failed to load manual bookings:', e);
            }
        };

        // Initial fetch
        fetchBookings().then(loadManualBookings);

        // Listen for storage changes (when admin adds/removes bookings)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'apartment_duri_bookings') {
                loadManualBookings();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        // Refresh every 30 minutes
        const interval = setInterval(fetchBookings, 30 * 60 * 1000);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Generate calendar days
    const generateCalendarDays = (): CalendarDay[] => {
        const days: CalendarDay[] = [];
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
        const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            const date = new Date(currentYear, currentMonth - 1, daysInPrevMonth - i);
            days.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                isBooked: bookings.some(b => isDateInRange(date, b.startDate, b.endDate)),
                isPast: date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const isToday = date.toDateString() === today.toDateString();
            days.push({
                date,
                isCurrentMonth: true,
                isToday,
                isBooked: bookings.some(b => isDateInRange(date, b.startDate, b.endDate)),
                isPast: date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
            });
        }

        // Next month days (fill to complete 6 rows)
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(currentYear, currentMonth + 1, i);
            days.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                isBooked: bookings.some(b => isDateInRange(date, b.startDate, b.endDate)),
                isPast: false
            });
        }

        return days;
    };

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const days = generateCalendarDays();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
        >
            {/* Calendar Container */}
            <div
                className="rounded-3xl overflow-hidden border border-white/40 shadow-xl"
                style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)'
                }}
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-primary to-sky-400 flex items-center justify-center text-white shadow-md">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-brand-dark">Availability</h3>
                                <p className="text-xs text-slate-500">Check open dates</p>
                            </div>
                        </div>

                        <button
                            onClick={fetchBookings}
                            disabled={syncing}
                            className={`p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all ${syncing ? 'animate-spin' : ''}`}
                            title="Refresh availability"
                        >
                            <RefreshCw size={18} />
                        </button>
                    </div>

                    {/* Month Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={goToPrevMonth}
                            className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            onClick={goToToday}
                            className="text-lg font-semibold text-brand-dark hover:text-brand-primary transition-colors"
                        >
                            {MONTH_NAMES[currentMonth]} {currentYear}
                        </button>

                        <button
                            onClick={goToNextMonth}
                            className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="p-4 md:p-6">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAY_NAMES.map(day => (
                            <div
                                key={day}
                                className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wide py-2"
                            >
                                {day.slice(0, 1)}
                                <span className="hidden sm:inline">{day.slice(1)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Date Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${currentMonth}-${currentYear}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-7 gap-1"
                        >
                            {days.map((day, index) => (
                                <div
                                    key={index}
                                    className={`
                    relative aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all
                    ${!day.isCurrentMonth ? 'text-slate-300' : ''}
                    ${day.isCurrentMonth && !day.isBooked && !day.isPast ? 'text-slate-700 hover:bg-emerald-50' : ''}
                    ${day.isPast && day.isCurrentMonth ? 'text-slate-400' : ''}
                    ${day.isToday ? 'ring-2 ring-brand-primary ring-offset-2' : ''}
                    ${day.isBooked && day.isCurrentMonth ? 'bg-rose-100 text-rose-600' : ''}
                    ${day.isBooked && !day.isCurrentMonth ? 'bg-rose-50 text-rose-300' : ''}
                    ${!day.isBooked && day.isCurrentMonth && !day.isPast ? 'bg-emerald-50/50' : ''}
                  `}
                                >
                                    {day.date.getDate()}
                                    {day.isBooked && day.isCurrentMonth && (
                                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-400" />
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100/50">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-200" />
                            <span className="text-xs text-slate-500">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-rose-100 border border-rose-200" />
                            <span className="text-xs text-slate-500">Booked</span>
                        </div>
                    </div>

                    {/* Last Sync */}
                    {lastSync && (
                        <p className="text-center text-[10px] text-slate-400 mt-3">
                            Synced with Booking.com • {lastSync.toLocaleTimeString()}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default AvailabilityCalendar;
