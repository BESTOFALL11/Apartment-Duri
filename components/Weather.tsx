import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer, X, MapPin } from 'lucide-react';

// Pefkochori, Halkidiki coordinates
const LATITUDE = 39.9667;
const LONGITUDE = 23.6167;
const LOCATION_NAME = "Pefkochori";

interface WeatherData {
    temperature: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
    isDay: boolean;
}

// WMO Weather interpretation codes
const getWeatherInfo = (code: number, isDay: boolean): { icon: React.ElementType; description: string; gradient: string } => {
    // Clear sky
    if (code === 0) {
        return {
            icon: Sun,
            description: 'Sunny',
            gradient: isDay ? 'from-amber-400 to-orange-500' : 'from-indigo-600 to-purple-700'
        };
    }
    // Mainly clear, partly cloudy
    if (code <= 3) {
        return {
            icon: isDay ? Sun : Cloud,
            description: code === 1 ? 'Mostly Clear' : 'Partly Cloudy',
            gradient: isDay ? 'from-sky-400 to-blue-500' : 'from-slate-600 to-slate-700'
        };
    }
    // Fog
    if (code <= 48) {
        return {
            icon: Cloud,
            description: 'Foggy',
            gradient: 'from-slate-400 to-slate-500'
        };
    }
    // Drizzle
    if (code <= 57) {
        return {
            icon: CloudRain,
            description: 'Drizzle',
            gradient: 'from-slate-500 to-slate-600'
        };
    }
    // Rain
    if (code <= 67) {
        return {
            icon: CloudRain,
            description: 'Rainy',
            gradient: 'from-blue-500 to-blue-600'
        };
    }
    // Snow
    if (code <= 77) {
        return {
            icon: CloudSnow,
            description: 'Snowy',
            gradient: 'from-slate-300 to-blue-300'
        };
    }
    // Rain showers
    if (code <= 82) {
        return {
            icon: CloudRain,
            description: 'Showers',
            gradient: 'from-blue-500 to-indigo-600'
        };
    }
    // Snow showers
    if (code <= 86) {
        return {
            icon: CloudSnow,
            description: 'Snow Showers',
            gradient: 'from-blue-200 to-slate-400'
        };
    }
    // Thunderstorm
    if (code <= 99) {
        return {
            icon: CloudLightning,
            description: 'Thunderstorm',
            gradient: 'from-purple-600 to-slate-700'
        };
    }

    return {
        icon: Sun,
        description: 'Clear',
        gradient: 'from-sky-400 to-blue-500'
    };
};

const Weather: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&timezone=Europe%2FAthens`
                );

                if (!response.ok) throw new Error('Weather fetch failed');

                const data = await response.json();

                setWeather({
                    temperature: Math.round(data.current.temperature_2m),
                    humidity: data.current.relative_humidity_2m,
                    windSpeed: Math.round(data.current.wind_speed_10m),
                    weatherCode: data.current.weather_code,
                    isDay: data.current.is_day === 1
                });
                setLoading(false);
            } catch (err) {
                console.error('Weather fetch error:', err);
                setError(true);
                setLoading(false);
            }
        };

        fetchWeather();

        // Refresh every 30 minutes
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (error || loading) return null;
    if (!weather) return null;

    const weatherInfo = getWeatherInfo(weather.weatherCode, weather.isDay);
    const WeatherIcon = weatherInfo.icon;

    return (
        <>
            {/* Floating Weather Widget - Bottom Left */}
            <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
                className="fixed bottom-6 left-6 z-40 hidden md:block"
            >
                <motion.button
                    onClick={() => setIsExpanded(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                    {/* Weather Icon with gradient background */}
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${weatherInfo.gradient} flex items-center justify-center text-white shadow-sm`}>
                        <WeatherIcon size={20} strokeWidth={2} />
                    </div>

                    {/* Temperature */}
                    <div className="text-left">
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-brand-dark">{weather.temperature}</span>
                            <span className="text-sm text-slate-500">°C</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={10} />
                            <span>{LOCATION_NAME}</span>
                        </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="h-6 w-[1px] bg-slate-200 mx-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs text-brand-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Details
                    </span>
                </motion.button>
            </motion.div>

            {/* Mobile Weather Widget - Bottom Left (above safe area) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="md:hidden fixed bottom-24 left-4 z-40"
            >
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/40 shadow-lg active:scale-95 transition-transform"
                >
                    <div className={`h-8 w-8 rounded-xl bg-gradient-to-br ${weatherInfo.gradient} flex items-center justify-center text-white shadow-sm`}>
                        <WeatherIcon size={16} strokeWidth={2} />
                    </div>
                    <div className="text-left pr-1">
                        <span className="text-lg font-bold text-brand-dark leading-none">{weather.temperature}°</span>
                        <p className="text-[10px] text-slate-500 leading-tight">{LOCATION_NAME}</p>
                    </div>
                </button>
            </motion.div>

            {/* Expanded Weather Modal */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsExpanded(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/60 overflow-hidden"
                        >
                            {/* Gradient Header */}
                            <div className={`bg-gradient-to-br ${weatherInfo.gradient} px-6 py-8 text-white relative overflow-hidden`}>
                                {/* Decorative circles */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                                >
                                    <X size={18} />
                                </button>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                                        <MapPin size={14} />
                                        <span>{LOCATION_NAME}, Halkidiki</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-start">
                                                <span className="text-6xl font-bold">{weather.temperature}</span>
                                                <span className="text-2xl mt-2">°C</span>
                                            </div>
                                            <p className="text-white/90 text-lg mt-1">{weatherInfo.description}</p>
                                        </div>
                                        <WeatherIcon size={64} strokeWidth={1.5} className="opacity-90" />
                                    </div>
                                </div>
                            </div>

                            {/* Weather Details */}
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="h-10 w-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                                            <Droplets size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Humidity</p>
                                            <p className="text-lg font-bold text-brand-dark">{weather.humidity}%</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                                            <Wind size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Wind</p>
                                            <p className="text-lg font-bold text-brand-dark">{weather.windSpeed} km/h</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-center text-xs text-slate-400 mt-6">
                                    Live weather data • Updated every 30 min
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Weather;
