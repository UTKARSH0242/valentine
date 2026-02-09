import { useState } from 'react'
import { MusicProvider } from './context/MusicContext'
import WelcomePage from './components/WelcomePage'
import LockScreen from './components/LockScreen'
import MainSite from './components/MainSite'
import MusicToggle from './components/MusicToggle'

function App() {
    const [showWelcome, setShowWelcome] = useState(true)
    const [isUnlocked, setIsUnlocked] = useState(false)

    const handleWelcomeContinue = () => {
        setShowWelcome(false)
    }

    const handleUnlock = () => {
        setIsUnlocked(true)
    }

    return (
        <MusicProvider>
            <div className="min-h-screen">
                {showWelcome ? (
                    <WelcomePage onContinue={handleWelcomeContinue} />
                ) : !isUnlocked ? (
                    <LockScreen onUnlock={handleUnlock} />
                ) : (
                    <MainSite />
                )}

                {/* Music toggle is always rendered so audio elements are available */}
                <MusicToggle />
            </div>
        </MusicProvider>
    )
}

export default App
