import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from '../hooks/useWindowSize'
import HeroSection from './HeroSection'
import OpenWhen from './OpenWhen'
import FunZone from './FunZone'
import Footer from './Footer'
import ValentineRequest from './ValentineRequest'
import CustomCursor from './CustomCursor'

const MainSite = () => {
    const [showConfetti, setShowConfetti] = useState(true)
    const { width, height } = useWindowSize()

    useEffect(() => {
        // Stop confetti after 10 seconds
        const timer = setTimeout(() => {
            setShowConfetti(false)
        }, 10000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="gradient-mesh min-h-screen relative">
            <div className="noise-overlay" />

            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={500}
                    recycle={false}
                    gravity={0.3}
                />
            )}

            <CustomCursor />
            <div className="py-20 md:py-32">
                <HeroSection />
            </div>
            <div className="py-20 md:py-32">
                <OpenWhen />
            </div>
            <div className="py-20 md:py-32">
                <FunZone />
            </div>
            <div className="py-20 md:py-32">
                <ValentineRequest />
            </div>
            <Footer />
        </div>
    )
}

export default MainSite
