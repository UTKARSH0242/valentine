import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

const ValentineRequest = () => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 })
    const [isAccepted, setIsAccepted] = useState(false)
    const containerRef = useRef(null)
    const noBtnRef = useRef(null)

    // PROXIMITY RUNAWAY LOGIC
    // This makes it virtually impossible to catch, even slowly
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isAccepted || !noBtnRef.current) return

            const btnRect = noBtnRef.current.getBoundingClientRect()
            const btnCenterX = btnRect.left + btnRect.width / 2
            const btnCenterY = btnRect.top + btnRect.height / 2

            const distanceX = e.clientX - btnCenterX
            const distanceY = e.clientY - btnCenterY
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

            // DANGER ZONE: 150px radius
            if (distance < 150) {
                // Teleport away!
                const angle = Math.random() * Math.PI * 2
                const moveDistance = 200 // Jump 200px away

                const newX = noBtnPosition.x + Math.cos(angle) * moveDistance
                const newY = noBtnPosition.y + Math.sin(angle) * moveDistance

                // Boundary check (keep within reasonable bounds roughly)
                const boundedX = Math.max(-300, Math.min(300, newX))
                const boundedY = Math.max(-200, Math.min(200, newY))

                setNoBtnPosition({ x: boundedX, y: boundedY })
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [noBtnPosition, isAccepted])

    // Celebration
    const handleYesClick = () => {
        setIsAccepted(true)
    }

    return (
        <section ref={containerRef} className="py-24 px-4 min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-t from-pink-50 to-white relative overflow-hidden">

            {/* Background Hearts */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-200"
                        initial={{
                            top: "100%",
                            left: `${Math.random() * 100}%`,
                            opacity: 0.5,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            top: "-10%",
                            opacity: 0
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <Heart size={Math.random() * 40 + 20} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {!isAccepted ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center z-10 w-full max-w-4xl px-4"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="inline-block mb-8"
                        >
                            <span className="text-6xl md:text-8xl">💌</span>
                        </motion.div>

                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4 px-2">
                            One Last Question...
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 mb-12 px-2">
                            Will you be my Valentine (and everything else) Forever?
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 relative min-h-[200px] sm:min-h-[150px]">
                            {/* YES BUTTON */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleYesClick}
                                className="px-10 py-4 bg-rose-500 text-white text-xl font-bold rounded-full shadow-xl hover:bg-rose-600 hover:shadow-2xl transition-all z-20"
                            >
                                YES! 💖
                            </motion.button>

                            {/* NO BUTTON (Runaway) */}
                            <motion.button
                                ref={noBtnRef}
                                animate={noBtnPosition}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                className="px-10 py-4 bg-gray-200 text-gray-500 text-xl font-bold rounded-full cursor-not-allowed absolute sm:static"
                            >
                                No 🙈
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="accepted"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center z-10 w-full px-4"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="text-8xl sm:text-9xl mb-6"
                        >
                            🥳
                        </motion.div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-rose-500 mb-6 drop-shadow-sm leading-tight">
                            I KNEW IT! <br className="sm:hidden" /> SHE SAID YES!
                        </h2>
                        <p className="text-lg sm:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-4">
                            Get ready for a lifetime of annoying jokes, long drives, and endless love.
                            You're stuck with me now! 😉❤️
                        </p>

                        {/* Floating Hearts Explosion visual */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                                animate={{
                                    x: (Math.random() - 0.5) * 500,
                                    y: (Math.random() - 0.5) * 500,
                                    opacity: 0,
                                    scale: Math.random() * 2 + 1
                                }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute top-1/2 left-1/2 text-rose-400 pointer-events-none"
                            >
                                <Heart fill="currentColor" size={40} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    )
}

export default ValentineRequest
