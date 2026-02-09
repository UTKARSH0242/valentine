import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PhotoSlider = ({ photos = [], captions = [], autoPlayInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [exitDirection, setExitDirection] = useState(1) // 1 for right, -1 for left

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || photos.length <= 1) return

        const interval = setInterval(() => {
            handleNext()
        }, autoPlayInterval)

        return () => clearInterval(interval)
    }, [currentIndex, isAutoPlaying, photos.length, autoPlayInterval])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') handlePrevious()
            if (e.key === 'ArrowRight') handleNext()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentIndex])

    const handleNext = useCallback(() => {
        setExitDirection(-1) // Exit to left when going to next
        setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, [photos.length])

    const handlePrevious = useCallback(() => {
        setExitDirection(1) // Exit to right when going to previous
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    }, [photos.length])

    const handleDotClick = (index) => {
        setExitDirection(index > currentIndex ? -1 : 1)
        setCurrentIndex(index)
    }

    // Swipe detection
    const swipeConfidenceThreshold = 50
    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) * velocity.x

        if (Math.abs(offset.x) > swipeConfidenceThreshold) {
            if (offset.x > 0) {
                // Swiped right - go to previous
                handlePrevious()
            } else {
                // Swiped left - go to next
                handleNext()
            }
        }
    }

    if (!photos || photos.length === 0) {
        return (
            <div className="text-center text-gray-500 py-12">
                <p className="text-lg">No photos to display</p>
                <p className="text-sm mt-2">Add photos to public/photos/ directory</p>
            </div>
        )
    }

    // Calculate which cards to show (current + next 2)
    const getVisibleCards = () => {
        const cards = []
        for (let i = 0; i < Math.min(3, photos.length); i++) {
            const index = (currentIndex + i) % photos.length
            cards.push({ index, photo: photos[index], position: i })
        }
        return cards
    }

    const visibleCards = getVisibleCards()

    return (
        <div className="relative w-full">
            <div
                className="relative w-full"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {/* Stacked cards container */}
                <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl">
                    <AnimatePresence mode="popLayout" custom={exitDirection}>
                        {visibleCards.map(({ index, photo, position }) => (
                            <motion.div
                                key={`${index}-${currentIndex}`}
                                className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-2xl cursor-grab active:cursor-grabbing"
                                custom={exitDirection}
                                initial={{
                                    scale: 0.95 - position * 0.05,
                                    y: position * 12,
                                    zIndex: 10 - position,
                                    opacity: position === 0 ? 1 : 0.7,
                                }}
                                animate={{
                                    scale: 0.95 - position * 0.05,
                                    y: position * 12,
                                    zIndex: 10 - position,
                                    opacity: position === 0 ? 1 : 0.7,
                                }}
                                exit={(direction) => ({
                                    x: direction * 400, // Dynamic direction based on swipe
                                    opacity: 0,
                                    scale: 0.8,
                                    transition: { duration: 0.3 }
                                })}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.32, 0.72, 0, 1]
                                }}
                                style={{
                                    transformOrigin: 'center center',
                                }}
                                // Only allow drag on the front card
                                drag={position === 0 ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.7}
                                onDragEnd={position === 0 ? handleDragEnd : undefined}
                            >
                                <img
                                    src={photo}
                                    alt={`Special moment ${index + 1}`}
                                    className="w-full h-full object-contain pointer-events-none bg-gradient-to-br from-pastel-yellow/20 via-soft-pink/20 to-baby-blue/20"
                                    draggable={false}
                                />

                                {/* Overlay for stacked cards */}
                                {position > 0 && (
                                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    {photos.length > 1 && (
                        <>
                            {/* Previous button */}
                            <motion.button
                                onClick={handlePrevious}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center z-20 border border-white/60 shadow-lg"
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>

                            {/* Next button */}
                            <motion.button
                                onClick={handleNext}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center z-20 border border-white/60 shadow-lg"
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        </>
                    )}

                    {/* Photo counter */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium z-20">
                        {currentIndex + 1} / {photos.length}
                    </div>
                </div>

                {/* Dot indicators */}
                {photos.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                        {photos.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-gradient-to-r from-soft-pink to-pastel-yellow'
                                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Go to photo ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Auto-play indicator - visual only, no text */}
                {isAutoPlaying && photos.length > 1 && (
                    <motion.div
                        className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-white/80 animate-pulse z-20 shadow-sm"
                        title="Auto-playing"
                    />
                )}
            </div>

            {/* Dynamic Caption */}
            {captions.length > 0 && (
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentIndex}
                        className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 font-light italic px-2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        "{captions[currentIndex] || captions[0]}"
                    </motion.p>
                </AnimatePresence>
            )}
        </div>
    )
}

export default PhotoSlider
