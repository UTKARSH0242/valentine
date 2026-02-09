import { useEffect, useState } from 'react'
import { motion, useTransform, useMotionValue } from 'framer-motion'
import { Heart, Stars, Sparkles, Music } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { useMusic } from '../context/MusicContext'
import PhotoSlider from './PhotoSlider'

// Helper component for parallax elements
const ParallaxElement = ({ children, mouseX, mouseY, depth = 0.05, className }) => {
    const x = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-depth * 50, depth * 50]);
    const y = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [-depth * 50, depth * 50]);

    return (
        <motion.div
            className={`absolute pointer-events-none ${className}`}
            style={{ x, y }}
        >
            {children}
        </motion.div>
    );
};

const HeroSection = () => {
    const [ref, isInView] = useInView({ threshold: 0.5 })
    const { changeSection } = useMusic()
    const text = "Happy Valentine's Week, Mini"

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        mouseX.set(clientX - centerX)
        mouseY.set(clientY - centerY)
    }

    // Change music when this section is in view
    useEffect(() => {
        if (isInView) {
            changeSection('hero')
        }
    }, [isInView, changeSection])

    // Photo gallery
    const photos = [
        `${import.meta.env.BASE_URL}photos/photo1.jpeg`,
        `${import.meta.env.BASE_URL}photos/photo2.jpeg`,
        `${import.meta.env.BASE_URL}photos/photo3.jpeg`,
        `${import.meta.env.BASE_URL}photos/photo4.jpeg`,
        `${import.meta.env.BASE_URL}photos/photo5.jpeg`,
    ]

    const captions = [
        "Every moment with you is a treasure, Mini ❤️",
        "You make my world brighter every single day ✨",
        "Together is my favorite place to be 💕",
        "You're the reason I smile every morning 😊",
        "Forever grateful to have you in my life 🌟",
    ]

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 perspective-1000 bg-[#fffcf5]"
        >
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,228,230,0.8),rgba(255,255,255,0))]" />
            <div className="absolute inset-0 noise-overlay opacity-30" />

            {/* Floating 3D Icons Parallax */}
            <ParallaxElement mouseX={mouseX} mouseY={mouseY} depth={0.1} className="top-20 left-10 md:left-32 text-pink-300 opacity-60">
                <Heart size={64} fill="currentColor" />
            </ParallaxElement>

            <ParallaxElement mouseX={mouseX} mouseY={mouseY} depth={0.08} className="top-40 right-10 md:right-32 text-yellow-300 opacity-60">
                <Stars size={48} fill="currentColor" />
            </ParallaxElement>

            <ParallaxElement mouseX={mouseX} mouseY={mouseY} depth={0.15} className="bottom-32 left-1/4 text-purple-300 opacity-50">
                <Sparkles size={56} />
            </ParallaxElement>

            <div className="relative z-10 text-center max-w-6xl w-full">

                {/* Brand-like Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 md:mb-16 relative inline-block"
                >
                    <span className="block text-sm md:text-base font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 animate-pulse-soft">
                        Valentine Special
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-black text-gray-900 tracking-tight leading-none">
                        Valentine's Week<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-400 to-orange-400">
                            MINI
                        </span>
                    </h1>
                    {/* Decorative underline */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
                        className="h-1 bg-gray-900 w-24 mx-auto mt-8 rounded-full"
                    />
                </motion.div>

                {/* Photo Gallery Slider wrapped in a realistic frame */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.2 }}
                    className="relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mt-20"
                >
                    {/* Realistic Shadow */}
                    <div className="absolute -inset-4 bg-gradient-to-b from-gray-200 to-gray-100 rounded-[2.5rem] blur-xl opacity-60 translate-y-8 -z-10" />

                    {/* The Frame */}
                    <div className="bg-white p-3 sm:p-4 rounded-[2rem] shadow-2xl border border-white/50 ring-1 ring-black/5">
                        <PhotoSlider photos={photos} captions={captions} />
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-px h-12 bg-gray-300"
                    />
                </motion.div>

            </div>
        </section>
    )
}

export default HeroSection
