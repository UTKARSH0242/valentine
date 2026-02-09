import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusic } from '../context/MusicContext'

const WelcomePage = ({ onContinue }) => {
    const { changeSection, togglePlay, play, isPlaying } = useMusic()
    const [hasStarted, setHasStarted] = useState(false)
    const [showButton, setShowButton] = useState(false)

    // Set section to welcome when component mounts
    useEffect(() => {
        changeSection('welcome')
    }, [changeSection])


    // Start music and show welcome content
    const handleStart = async () => {
        setHasStarted(true)

        // Explicitly start playing music
        play()

        // Show continue button after 5 seconds
        setTimeout(() => {
            setShowButton(true)
        }, 5000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-pink via-pastel-yellow-light to-baby-blue overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 top-10 sm:top-20 left-5 sm:left-10 rounded-full bg-soft-pink opacity-20 blur-3xl floating-orb" />
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bottom-10 sm:bottom-20 right-5 sm:right-10 rounded-full bg-pastel-yellow opacity-20 blur-3xl floating-orb" style={{ animationDelay: '2s' }} />

            <div className="text-center px-4 sm:px-6 relative z-10 w-full max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                    {!hasStarted ? (
                        // Click to Start Screen
                        <motion.div
                            key="start"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="text-6xl sm:text-7xl md:text-8xl mb-6 sm:mb-8"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                🎵
                            </motion.div>

                            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-4 sm:mb-6 px-2">
                                Something Special Awaits...
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 px-2">
                                Click below to begin your journey
                            </p>

                            <motion.button
                                onClick={handleStart}
                                className="px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-soft-pink to-pastel-yellow text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold rounded-full shadow-2xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    boxShadow: [
                                        '0 10px 40px rgba(244, 114, 182, 0.4)',
                                        '0 10px 60px rgba(253, 224, 71, 0.6)',
                                        '0 10px 40px rgba(244, 114, 182, 0.4)'
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Click to Start 🎶
                            </motion.button>
                        </motion.div>
                    ) : (
                        // Welcome Content (after clicking start)
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {/* Music note icon */}
                            <motion.div
                                className="text-6xl sm:text-7xl md:text-8xl mb-6 sm:mb-8"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                🎵
                            </motion.div>

                            {/* Main message */}
                            <motion.h1
                                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-4 sm:mb-6 px-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                Welcome, Mini
                            </motion.h1>

                            <motion.p
                                className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 sm:mb-4 font-light italic px-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                            >
                                I know what you love... 💕
                            </motion.p>

                            <motion.p
                                className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 px-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}
                            >
                                A beautiful melody for a beautiful soul,<br />
                                playing just for your ears...
                            </motion.p>

                            {/* Song playing indicator */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2, duration: 0.8 }}
                                className="glass-card rounded-2xl p-4 sm:p-6 max-w-md mx-auto mb-6 sm:mb-8"
                            >
                                <div className="flex items-center justify-center gap-3 sm:gap-4">
                                    <motion.div
                                        animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="text-2xl sm:text-3xl"
                                    >
                                        {isPlaying ? '🎶' : '⏸️'}
                                    </motion.div>
                                    <div className="text-left">
                                        <p className="text-base sm:text-lg font-semibold text-gray-800">
                                            {isPlaying ? 'Now Playing' : 'Paused'}
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            {isPlaying ? 'Tum Hi Ho' : 'Click play button to resume'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Continue button */}
                            {showButton && (
                                <motion.button
                                    onClick={onContinue}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-soft-pink to-pastel-yellow text-white text-base sm:text-lg md:text-xl font-semibold rounded-full shadow-2xl"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Continue to Something Special ✨
                                </motion.button>
                            )}

                            {!showButton && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.5, duration: 1 }}
                                    className="text-xs sm:text-sm text-gray-500 italic"
                                >
                                    Listen for a moment...
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default WelcomePage
