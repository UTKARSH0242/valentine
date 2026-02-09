import { createContext, useContext, useState, useRef, useEffect } from 'react'

const MusicContext = createContext()

export const useMusic = () => {
    const context = useContext(MusicContext)
    if (!context) {
        throw new Error('useMusic must be used within MusicProvider')
    }
    return context
}

export const MusicProvider = ({ children }) => {
    const [currentSection, setCurrentSection] = useState('welcome')
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const audioRef = useRef(null) // Single audio element reference

    // Music mapping for each section
    // Music mapping for each section
    const musicMap = {
        welcome: `${import.meta.env.BASE_URL}music/tum-hi-ho.mp3`,       // Welcome page - Tum Hi Ho (car song)
        lockscreen: `${import.meta.env.BASE_URL}music/tum-hi-ho.mp3`,    // Countdown timer music (same as welcome)
        unlock: `${import.meta.env.BASE_URL}music/happy-birthday.mp3`,   // Valentine song at unlock
        hero: `${import.meta.env.BASE_URL}music/daylight.mp3`,           // Daylight by Taylor Swift
        anniversary: `${import.meta.env.BASE_URL}music/pehli-nazar.mp3`, // Pehli Nazar Mein (How it started section)
        footer: `${import.meta.env.BASE_URL}music/ghar.mp3`              // Ghar from Jab Harry Met Sejal
    }

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const intendedSrc = musicMap[currentSection]

        // --- SMART PLAYBACK LOGIC ---
        // 1. Check if the song actually needs to change
        // We use .getAttribute('src') because .src property resolves to absolute URL
        // causing mismatch issues. Or we can just check if expected source is included.
        const currentSrc = audio.getAttribute('src')

        const isSameSong = currentSrc === intendedSrc

        if (!isSameSong) {
            console.log(`[MusicContext] Changing song from ${currentSrc} to ${intendedSrc}`)
            audio.src = intendedSrc
            audio.load() // Ensure new source is loaded
            if (isPlaying && !isMuted) {
                audio.play().catch(e => console.error("Play failed after change:", e))
            }
        } else {
            // Song is the same, just ensure play state matches
            console.log(`[MusicContext] Same song detected (${intendedSrc}). Continuing...`)
            if (isPlaying && !isMuted && audio.paused) {
                audio.play().catch(e => console.error("Resume failed:", e))
            }
        }

    }, [currentSection, isPlaying, isMuted])

    const togglePlay = () => {
        const audio = audioRef.current
        if (isPlaying) {
            audio?.pause()
        } else {
            audio?.play().catch(e => console.error("Toggle play failed:", e))
        }
        setIsPlaying(!isPlaying)
    }

    const play = () => {
        if (!isPlaying) {
            setIsPlaying(true)
            // The effect will handle the actual .play() call
        }
    }

    const pause = () => {
        if (isPlaying) {
            setIsPlaying(false)
            audioRef.current?.pause()
        }
    }

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
        }
        setIsMuted(!isMuted)
    }

    const changeSection = (section) => {
        if (section !== currentSection) {
            setCurrentSection(section)
        }
    }

    const registerGlobalAudio = (audioElement) => {
        audioRef.current = audioElement
        // Set initial volume
        if (audioElement) {
            audioElement.volume = 0.5
        }
    }

    return (
        <MusicContext.Provider
            value={{
                currentSection,
                isPlaying,
                isMuted,
                musicMap,
                togglePlay,
                play,
                pause,
                toggleMute,
                changeSection,
                registerGlobalAudio // Updated name
            }}
        >
            {children}
        </MusicContext.Provider>
    )
}
