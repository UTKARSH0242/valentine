import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Mail, X, Heart } from 'lucide-react'

const OpenWhen = () => {
    const [ref, isInView] = useInView({ threshold: 0.1 })
    const [selectedLetter, setSelectedLetter] = useState(null)

    const letters = [
        {
            id: 1,
            title: "When you miss me 🥺",
            icon: "🫂",
            color: "bg-blue-100 text-blue-500",
            content: "Close your eyes and take a deep breath. Can you feel that? That's me sending you the biggest, warmest hug across the miles. Remember our walks, our laughs, and know that I'm just a call away. I miss you too, more than words can say. ❤️"
        },
        {
            id: 2,
            title: "When you're happy 😄",
            icon: "🎉",
            color: "bg-yellow-100 text-yellow-500",
            content: "YAY! hearing you're happy makes my entire day brighter! I wish I was there to high-five you and celebrate properly. Keep that beautiful smile on your face, it suits you perfectly. Tell me everything! 🥂"
        },
        {
            id: 3,
            title: "When you need motivation 💪",
            icon: "🔥",
            color: "bg-red-100 text-red-500",
            content: "You are capable, you are strong, and you are brilliant. Don't let doubt creep in. Think about how far you've come. I believe in you 100%, even on the days you don't believe in yourself. You've got this! 🚀"
        },
        {
            id: 4,
            title: "When you're mad at me 😤",
            icon: "🏳️",
            color: "bg-gray-100 text-gray-500",
            content: "I'm sorry. I never want to be the reason for your frown. Let's take a breath. I love you, and we can fix anything together. Please forgive me? 🥺"
        }
    ]

    return (
        <section ref={ref} className="py-32 px-4 bg-white relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-gray-900">Open When... 💌</h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                {letters.map((letter, index) => (
                    <motion.div
                        key={letter.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10, rotate: [-1, 1, -1, 0] }}
                        onClick={() => setSelectedLetter(letter)}
                        className="cursor-pointer group"
                    >
                        <div className={`relative bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-50 aspect-[4/5] flex flex-col items-center justify-center transition-all group-hover:shadow-2xl group-hover:border-rose-100`}>
                            {/* Envelope Flap Look */}
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-gray-50/50 rounded-t-2xl [clip-path:polygon(0%_0%,50%_100%,100%_0%)]" />

                            <div className={`w-20 h-20 ${letter.color} rounded-full flex items-center justify-center text-4xl mb-6 shadow-md relative z-10`}>
                                {letter.icon}
                            </div>

                            <h3 className="font-bold text-xl text-center text-gray-800 mb-2 relative z-10">{letter.title}</h3>
                            <p className="text-xs text-center text-gray-400 uppercase tracking-widest font-bold mt-auto relative z-10">Tap to Open</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal for Letter Content */}
            <AnimatePresence>
                {selectedLetter && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedLetter(null)}
                    >
                        <div className="relative w-full max-w-2xl perspective-1000" onClick={(e) => e.stopPropagation()}>

                            {/* 3D Envelope Animation Container */}
                            <motion.div
                                initial={{ rotateX: 90, opacity: 0 }}
                                animate={{ rotateX: 0, opacity: 1 }}
                                exit={{ rotateX: -90, opacity: 0 }}
                                transition={{ type: "spring", damping: 15 }}
                                className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative"
                            >
                                {/* Decorative Envelope Flap Effect */}
                                <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-gray-100 to-transparent" />

                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                                            {/* Since the letters use emoji icons in the object, just render them directly or map them if using Lucide */}
                                            <span className="text-2xl">{selectedLetter.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-serif font-bold text-gray-900">{selectedLetter.title}</h3>
                                            <p className="text-sm text-gray-400">Read this when...</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedLetter(null)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X size={24} className="text-gray-400" />
                                    </button>
                                </div>

                                {/* Letter Content sliding out */}
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="prose prose-rose max-w-none"
                                >
                                    <p className="text-lg leading-relaxed text-gray-600 font-medium whitespace-pre-wrap font-sans">
                                        {selectedLetter.content}
                                    </p>
                                </motion.div>

                                {/* Bottom decorative stamp */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                    className="mt-8 flex justify-end opacity-50"
                                >
                                    <Heart size={40} className="text-rose-300 fill-rose-100" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default OpenWhen
