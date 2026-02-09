import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusic } from '../context/MusicContext'

const loadingMessages = [
    "Searching for the perfect rose... 🌹",
    "Counting heartbeats... ❤️",
    "Wrapping your Valentine's surprise... 🎁",
    "Tuning the love melodies... 🎵",
    "Almost time for magic... ⏰",
    "Thinking of you, Mini... 💕",
    "Calibrating the cuteness... 🧸",
    "Preparing the heart confetti... 💖"
]

const LockScreen = ({ onUnlock }) => {
    const targetDate = new Date('2026-02-14T00:00:00+05:30').getTime()
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    const [canUnlock, setCanUnlock] = useState(false)
    const { changeSection, togglePlay, isPlaying } = useMusic()

    function calculateTimeLeft() {
        const now = new Date().getTime()
        const difference = targetDate - now

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft()
            setTimeLeft(newTimeLeft)

            // Check if we've reached the target date
            if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 &&
                newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
                setCanUnlock(true)
                // Switch to Valentine music when unlock button appears
                changeSection('unlock')
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [changeSection])

    // Start countdown music when component mounts
    useEffect(() => {
        changeSection('lockscreen')
        const musicTimer = setTimeout(() => {
            if (!isPlaying) {
                togglePlay()
            }
        }, 1000)

        return () => clearTimeout(musicTimer)
    }, [])

    const handleUnlockClick = () => {
        // Play Valentine music for a moment before transitioning
        changeSection('unlock')
        setTimeout(() => {
            onUnlock()
        }, 500)
    }

    // --- Dynamic Messages ---
    const [messageIndex, setMessageIndex] = useState(0)

    // --- Valentine's Week Logic ---
    const valentineWeek = [
        { day: 7, name: "Rose Day", icon: "🌹", msg: "Starting with a rose, for the most beautiful flower in my life." },
        { day: 8, name: "Propose Day", icon: "💍", msg: "Every day I choose you, over and over again." },
        { day: 9, name: "Chocolate Day", icon: "🍫", msg: "Something sweet for my sweetest person." },
        { day: 10, name: "Teddy Day", icon: "🧸", msg: "A warm hug in the form of a teddy, just for you." },
        { day: 11, name: "Promise Day", icon: "🤝", msg: "I promise to be yours, today and always." },
        { day: 12, name: "Hug Day", icon: "🫂", msg: "Miles apart, but holding you close in my heart." },
        { day: 13, name: "Kiss Day", icon: "💋", msg: "Sending you all my love and a million kisses." },
        { day: 14, name: "Valentine's Day", icon: "❤️", msg: "My forever Valentine. I love you, Mini." }
    ]

    const getCurrentValentineDay = () => {
        const now = new Date()
        const date = now.getDate()
        const month = now.getMonth() // 0-indexed, so 1 is Feb
        if (month === 1 && date >= 7 && date <= 14) {
            return valentineWeek.find(d => d.day === date)
        }
        return null
    }

    const currentValentineDay = getCurrentValentineDay()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-baby-blue via-soft-pink-light to-soft-pink relative overflow-hidden">
            {/* Background Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: Math.random() * 0.5 + 0.3
                        }}
                        animate={{
                            y: -100,
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            rotate: Math.random() * 360
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 20
                        }}
                        className="absolute text-pink-200/40 text-4xl"
                    >
                        {Math.random() > 0.5 ? '❤️' : '✨'}
                    </motion.div>
                ))}
            </div>

            <div className="text-center px-4 sm:px-6 w-full max-w-4xl mx-auto relative z-10 py-12">
                {!canUnlock ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Valentine's Week Progress Indicator */}
                        {currentValentineDay && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-8 inline-flex flex-col items-center"
                            >
                                <div className="px-6 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-inner flex items-center gap-3 mb-3">
                                    <span className="text-2xl">{currentValentineDay.icon}</span>
                                    <span className="text-gray-800 font-bold tracking-wider uppercase text-sm md:text-base">
                                        It's {currentValentineDay.name}!
                                    </span>
                                </div>
                                <p className="text-soft-pink font-medium italic text-sm md:text-base max-w-xs mx-auto">
                                    "{currentValentineDay.msg}"
                                </p>
                            </motion.div>
                        )}

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-800 mb-6 px-2 drop-shadow-sm"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Counting down to our magic...
                        </motion.h1>

                        <div className="h-8 mb-10 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={messageIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-lg sm:text-xl md:text-2xl text-soft-pink font-medium px-2"
                                >
                                    {loadingMessages[messageIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-2xl mx-auto mb-12">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Minutes', value: timeLeft.minutes },
                                { label: 'Seconds', value: timeLeft.seconds }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-md bg-white/40 border border-white/60 shadow-lg"
                                >
                                    <motion.div
                                        key={item.value}
                                        initial={{ scale: 0.8, opacity: 0.5 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-gray-800 tabular-nums"
                                    >
                                        {String(item.value).padStart(2, '0')}
                                    </motion.div>
                                    <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 font-medium uppercase tracking-widest">
                                        {item.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Valentine's Week Calendar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-4xl mx-auto"
                        >
                            <h3 className="text-gray-600 font-serif italic mb-6">Valentine's Week ❤️</h3>
                            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                                {valentineWeek.map((day) => {
                                    const isCurrent = currentValentineDay && currentValentineDay.day === day.day;
                                    const isPast = new Date().getDate() > day.day;

                                    return (
                                        <div
                                            key={day.day}
                                            className={`relative flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-300 ${isCurrent
                                                    ? 'bg-white shadow-lg scale-110 ring-2 ring-soft-pink z-10'
                                                    : isPast
                                                        ? 'bg-white/20 opacity-50'
                                                        : 'bg-white/40'
                                                }`}
                                        >
                                            <span className="text-2xl mb-1">{day.icon}</span>
                                            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-tighter ${isCurrent ? 'text-soft-pink' : 'text-gray-500'}`}>
                                                {day.name.split(' ')[0]}
                                            </span>
                                            {isCurrent && (
                                                <motion.div
                                                    layoutId="outline"
                                                    className="absolute -inset-1 rounded-2xl border-2 border-soft-pink/30"
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-50 py-12"
                    >
                        {/* Confetti should technically be handled by a library, but using CSS particles for speed if no lib */}

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <span className="inline-block py-2 px-6 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-sm md:text-base font-bold tracking-[0.2em] text-gray-800 uppercase animate-pulse">
                                The wait is over
                            </span>
                        </motion.div>

                        {/* Staggered "Happy Valentine" Text */}
                        <div className="flex flex-col items-center justify-center gap-2 mb-10">
                            <div className="flex justify-center gap-2 md:gap-4 overflow-hidden">
                                {Array.from("Happy").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ y: 100, rotate: 10 }}
                                        animate={{ y: 0, rotate: 0 }}
                                        transition={{ duration: 0.8, delay: i * 0.05, type: "spring" }}
                                        className="text-5xl sm:text-7xl md:text-8xl font-serif font-black text-gray-900 leading-none inline-block drop-shadow-xl"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                            <div className="flex justify-center gap-1 md:gap-3 overflow-hidden">
                                {Array.from("Valentine").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ y: 100, rotate: -10 }}
                                        animate={{ y: 0, rotate: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 + (i * 0.05), type: "spring" }}
                                        className="text-5xl sm:text-7xl md:text-8xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 leading-none inline-block drop-shadow-lg"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* "MINI" - GOLD FOIL TEXT (Reusing the premium style) */}
                        <motion.h1
                            initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: 1 }}
                            className="text-6xl sm:text-8xl md:text-[8rem] leading-none font-serif font-black tracking-tight mb-16 relative"
                        >
                            <span className="relative inline-block text-transparent bg-clip-text bg-[url('https://www.transparenttextures.com/patterns/gold-scale.png')] bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] filter brightness-110">
                                MINI
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full skew-x-12"
                                    animate={{ x: ['-200%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                />
                            </span>
                        </motion.h1>

                        {/* Interactive Unlock Button */}
                        <motion.button
                            onClick={handleUnlockClick}
                            className="group relative px-8 sm:px-12 py-5 sm:py-6 bg-gray-900 text-white text-lg sm:text-2xl font-bold rounded-full overflow-hidden shadow-2xl hover:scale-105 active:scale-95 transition-transform"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.5, type: "spring" }}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Enter Our World 🎁
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse" />
                        </motion.button>

                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default LockScreen
