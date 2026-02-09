import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useMusic } from '../context/MusicContext'

const Footer = () => {
    const [ref, isInView] = useInView({ threshold: 0.3 })
    const { changeSection } = useMusic()

    // Change music when this section is in view
    useEffect(() => {
        if (isInView) {
            changeSection('footer')
        }
    }, [isInView, changeSection])

    // Generate random positions for "Stay" text (static positions to avoid re-render flicker)
    const stayPositions = [
        { top: '10%', left: '5%', delay: 0 },
        { top: '20%', right: '10%', delay: 2 },
        { top: '60%', left: '15%', delay: 4 },
        { top: '80%', right: '20%', delay: 1 },
        { top: '40%', left: '80%', delay: 3 },
        { top: '15%', left: '50%', delay: 5 },
    ]

    return (
        <footer ref={ref} className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">

            {/* AMBIENT "STAY" BACKGROUND */}
            <div className="absolute inset-0 pointer-events-none">
                {stayPositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-6xl sm:text-8xl md:text-9xl font-handwriting text-rose-200/20 font-bold select-none"
                        style={{ top: pos.top, left: pos.left, right: pos.right }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            scale: [0.8, 1, 1.2],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            delay: pos.delay,
                            ease: "easeInOut"
                        }}
                    >
                        Stay
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-16 shadow-2xl border-white/50 backdrop-blur-xl relative overflow-hidden"
                >
                    {/* Decorative Corner Flourish */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100/50 to-transparent rounded-bl-full pointer-events-none" />

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-8 sm:mb-10 text-center relative">
                        A Letter for You
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-rose-300 rounded-full opacity-50" />
                    </h3>

                    <div className="prose prose-base sm:prose-lg md:prose-xl max-w-none font-serif text-gray-700 leading-relaxed">
                        <p className="mb-6">
                            Dear Mini,
                        </p>

                        <p className="mb-6">
                            As Valentine's Week begins, I wanted to create something special just for you. Every day with you feels like a celebration, and I am so grateful to have you by my side.
                        </p>

                        <p className="mb-6">
                            You bring so much joy and warmth into my life. Thank you for being the amazing person you are. I'm looking forward to all the beautiful moments we'll share this week and beyond.
                        </p>

                        <p className="mb-6">
                            I love you more than words can express. Happy Valentine's Week!
                        </p>

                        <p className="font-semibold mt-10">
                            Yours Forever,<br />
                            Utkarsh 💕
                        </p>
                    </div>
                </motion.div>

                {/* Copyright with "Stay" Theme */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mt-12 sm:mt-16"
                >
                    <p className="text-gray-500 text-sm tracking-widest uppercase mb-2">
                        Defined by Love • Bound by Promise
                    </p>
                    <p className="text-rose-400 font-bold text-lg">
                        Just Stay.
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer
