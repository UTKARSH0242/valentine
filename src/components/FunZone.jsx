import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Dices, Heart, Lock, Unlock, Sparkles, Music, Calendar } from 'lucide-react'

const FunZone = () => {
    const [ref, isInView] = useInView({ threshold: 0.1 })

    // --- Date Jar Logic ---
    const [dateIdea, setDateIdea] = useState(null)
    const [isSpinning, setIsSpinning] = useState(false)

    // Date Ideas (Long Distance & Next Meeting Mix)
    const dateIdeas = [
        "FaceTime Dinner Date 🕯️ (LDR Special)",
        "Watch Party on Discord/Scener 🎬",
        "Online Game Night (Ludo/UNO) 🎮",
        "Sleep on Call tonight 😴",
        "Next Meeting: 1 Hour Hug (No talking, just peace) 🫂",
        "Next Meeting: Street Food Hopping in Delhi 🥘",
        "Next Meeting: Late Night Drive to JNU 🚗",
        "Plan our Dream Home Pinterest Board 🏠",
        "Send a surprise Swiggy/Zomato meal 🍔",
        "Write a letter to each other 📝"
    ]

    const spinJar = () => {
        setIsSpinning(true)
        setDateIdea("Spinning... 🎲")

        setTimeout(() => {
            const random = dateIdeas[Math.floor(Math.random() * dateIdeas.length)]
            setDateIdea(random)
            setIsSpinning(false)
        }, 1500)
    }

    // --- Reasons Grid Data ---
    const reasons = [
        { text: "Your smile 😊", color: "bg-pink-50" },
        { text: "How you calm me 😌", color: "bg-blue-50" },
        { text: "Your support 💪", color: "bg-yellow-50" },
        { text: "Our drives 🛣️", color: "bg-purple-50" },
        { text: "The way we talk 🗣️", color: "bg-green-50" },
        { text: "Your patience 🕊️", color: "bg-orange-50" },
        { text: "Your laugh 😂", color: "bg-rose-50" },
        { text: "Handling my flaws ✨", color: "bg-indigo-50" },
        { text: "Being my home 🏠", color: "bg-teal-50" }
    ]

    // --- Promise Logic ---
    const [isLocked, setIsLocked] = useState(false)

    return (
        <section ref={ref} className="py-24 px-4 min-h-screen bg-gray-50/50">

            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                >
                    Our Little World 🌍
                </motion.h2>

                {/* BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[650px]">

                    {/* 1. DATE JAR (Large Square - Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="glass-card md:col-span-1 md:row-span-2 rounded-[2rem] p-8 !border-white/40 shadow-xl flex flex-col items-center justify-between group hover:shadow-2xl transition-all relative overflow-hidden"
                    >
                        {/* Soft gradient blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-200/30 blur-[60px] rounded-full pointer-events-none" />

                        <div className="w-full text-center relative z-10">
                            <div className="bg-orange-100/80 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-500 shadow-sm ring-1 ring-orange-200">
                                <Dices size={32} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">The Date Jar</h3>
                            <p className="text-gray-500 text-sm">LDR & Next Meeting Ideas!</p>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center w-full my-4 relative z-10">
                            <motion.div
                                className="text-8xl mb-6 cursor-pointer drop-shadow-md"
                                animate={isSpinning ? {
                                    rotate: [0, -15, 15, -15, 15, 0],
                                    scale: [1, 1.1, 1],
                                    transition: { duration: 0.5, repeat: Infinity }
                                } : {
                                    y: [0, -10, 0],
                                    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                                whileHover={{ scale: 1.1 }}
                                onClick={spinJar}
                            >
                                🏺
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {dateIdea ? (
                                    <motion.div
                                        key={dateIdea}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/50 w-full shadow-sm"
                                    >
                                        <p className="text-base font-bold text-gray-800 text-center leading-snug">{dateIdea}</p>
                                    </motion.div>
                                ) : (
                                    <p className="text-gray-400 italic font-medium">Tap the jar to spin</p>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={spinJar}
                            disabled={isSpinning}
                            className="w-full bg-gray-900/90 backdrop-blur-sm text-white py-4 rounded-xl font-bold shadow-lg hover:bg-black transition-all active:scale-95 z-10"
                        >
                            {isSpinning ? "Mixing..." : "Spin It!"}
                        </button>
                    </motion.div>

                    {/* 2. REASONS GRID (Wide landscape - Top Right) */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card md:col-span-2 rounded-[2rem] p-8 !border-white/40 shadow-xl flex flex-col relative overflow-hidden"
                    >
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/30 blur-[80px] rounded-full pointer-events-none" />

                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Heart size={150} />
                        </div>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="bg-pink-100/80 backdrop-blur-sm p-3 rounded-xl text-pink-500 shadow-sm"><Heart size={24} fill="currentColor" /></div>
                            <h3 className="text-xl font-serif font-bold text-gray-900">Why I Love You (Scroll for more!)</h3>
                        </div>

                        {/* Scrollable Container for 9 items */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10 overflow-y-auto max-h-[160px] pr-2 scrollbar-hide">
                            {reasons.map((r, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    className={`${r.color} p-3 rounded-xl flex items-center justify-center text-center font-medium text-gray-700 text-sm h-20 border border-black/5 shadow-sm`}
                                >
                                    {r.text}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 3. PROMISE CARD (Medium - Bottom Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:col-span-2 bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-[2rem] p-8 shadow-2xl text-white flex flex-col justify-between relative overflow-hidden ring-1 ring-white/10"
                    >
                        {/* Abstract background mesh */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-20 -translate-y-1/2 translate-x-1/3" />

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-purple-200">
                                <Sparkles size={24} className="text-yellow-300" /> Our Promise
                            </h3>
                            <p className="text-gray-300 mb-8 leading-relaxed max-w-md">
                                "To be your calm in the chaos, your partner in crime, and your biggest fan forever. Here's to us."
                            </p>
                        </div>

                        {/* SLIDE TO LOCK INTERACTION */}
                        <div className="relative z-10 w-full max-w-sm mx-auto sm:mx-0 mt-auto">
                            {!isLocked ? (
                                <div className="relative h-16 bg-black/40 backdrop-blur-md rounded-full border border-white/20 p-1 flex items-center overflow-hidden">
                                    <motion.p
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute w-full text-center text-sm font-bold tracking-widest text-white/50 pointer-events-none pr-12"
                                    >
                                        SLIDE TO PROMISE
                                    </motion.p>

                                    <motion.div
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 280 }}
                                        dragElastic={0}
                                        dragMomentum={false}
                                        onDragEnd={(e, info) => {
                                            if (info.offset.x > 250) {
                                                setIsLocked(true)
                                            }
                                        }}
                                        className="w-14 h-14 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center cursor-grab active:cursor-grabbing z-20"
                                    >
                                        <Unlock size={20} className="text-indigo-900" />
                                    </motion.div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center gap-3 shadow-lg shadow-green-500/30"
                                >
                                    <motion.div
                                        initial={{ rotate: -180, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    >
                                        <Lock size={24} className="text-white" />
                                    </motion.div>
                                    <span className="font-bold text-lg tracking-wide">FOREVER LOCKED</span>
                                </motion.div>
                            )}
                        </div>

                        {/* Lock Status Visual */}
                        <div className="absolute bottom-8 right-8 z-10 hidden sm:block opacity-20">
                            <Lock size={120} />
                        </div>

                        {/* Particle Explosion triggers via Confetti in MainSite */}
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default FunZone
