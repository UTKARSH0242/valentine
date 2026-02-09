import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useMusic } from '../context/MusicContext'

const MusicToggle = () => {
    const { isPlaying, togglePlay, registerGlobalAudio, currentSection } = useMusic()

    // Register the single audio element
    useEffect(() => {
        // No need for complex mapping anymore
    }, [])

    // Auto-play music when component mounts (after unlock)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isPlaying) {
                togglePlay()
            }
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {/* SINGLE Global Audio Element */}
            {/* The src is managed by the Context based on currentSection */}
            <audio
                ref={registerGlobalAudio}
                loop
                preload="auto"
                onError={(e) => console.error("Global Audio Error:", e)}
            />

            {/* Floating music toggle button */}
            {/* Floating music toggle button with tooltip */}
            <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center flex-row-reverse gap-4">
                <motion.button
                    onClick={togglePlay}
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-soft-pink to-pastel-yellow rounded-full shadow-2xl flex items-center justify-center relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
                >
                    {isPlaying ? (
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </motion.button>

                {/* Hover to Pause/Play Tooltip */}
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="hidden group-hover:block bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap"
                >
                    {isPlaying ? 'Pause Music' : 'Play Music'}
                </motion.div>
            </div>

            {/* Current song indicator - fixed position above button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isPlaying ? 1 : 0, y: isPlaying ? 0 : 20 }}
                className="fixed bottom-24 right-6 sm:bottom-28 sm:right-8 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg z-40 max-w-[150px] sm:max-w-xs truncate pointer-events-none"
            >
                <p className="text-[10px] sm:text-xs font-medium text-gray-700 truncate">
                    {currentSection === 'welcome' && '🎵 Tum Hi Ho'}
                    {currentSection === 'lockscreen' && '🎵 Tum Hi Ho'}
                    {currentSection === 'unlock' && '💖 Happy Valentine\'s Week!'}
                    {currentSection === 'hero' && '🎵 Daylight'}
                    {currentSection === 'anniversary' && '🎵 Pehli Nazar Mein'}
                    {currentSection === 'footer' && '🎵 Ghar'}
                </p>
            </motion.div>
        </>
    )
}

export default MusicToggle
