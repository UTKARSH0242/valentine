import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    // Particle System State
    const [particles, setParticles] = useState([])
    const lastParticleTime = useRef(0)

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })

            // Spawn glitter particles throttling (every 20ms)
            const now = Date.now()
            if (now - lastParticleTime.current > 20) {
                const newParticle = {
                    id: now,
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 4 + 2, // Random size 2-6px
                    color: Math.random() > 0.5 ? '#f472b6' : '#fbbf24' // Pink or Gold
                }

                setParticles(prev => [...prev.slice(-20), newParticle]) // Keep last 20 trails
                lastParticleTime.current = now

                // Remove particle after 800ms
                setTimeout(() => {
                    setParticles(prev => prev.filter(p => p.id !== newParticle.id))
                }, 800)
            }
        }

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button')) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener("mousemove", mouseMove)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", mouseMove)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">

            {/* GLITTER TRAIL */}
            <AnimatePresence>
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 1, scale: 1, x: particle.x, y: particle.y }}
                        animate={{
                            opacity: 0,
                            scale: 0,
                            y: particle.y + 20, // Gravity effect (falls down)
                            x: particle.x + (Math.random() - 0.5) * 10 // Jitter
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute rounded-full"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
                            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* MAIN HEART CURSOR */}
            <motion.div
                className="absolute top-0 left-0 text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]"
                animate={{
                    x: mousePosition.x - 12,
                    y: mousePosition.y - 12,
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? [0, -10, 10, 0] : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            >
                <Heart fill="#ec4899" size={24} stroke="white" strokeWidth={2} />
            </motion.div>
        </div>
    )
}

export default CustomCursor
