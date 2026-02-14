import React, { useState, useRef, useEffect } from 'react'
import { Music, Volume2, VolumeX } from 'lucide-react'

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)

    // Romantic instrumental URL (Royalty Free for demo)
    // Using a reliable CDN source for piano instrumentals
    const musicUrl = "https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730e64.mp3?filename=piano-moment-119542.mp3"

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e))
            }
            setIsPlaying(!isPlaying)
        }
    }

    // Auto-play attempt on first interaction if possible
    useEffect(() => {
        const handleInteraction = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true)
                }).catch(() => {
                    // Autoplay blocked, wait for manual toggle
                })
            }
            // Remove listener after first attempt
            window.removeEventListener('click', handleInteraction)
        }

        window.addEventListener('click', handleInteraction)
        return () => window.removeEventListener('click', handleInteraction)
    }, [])

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <audio ref={audioRef} src={musicUrl} loop />

            <button
                onClick={togglePlay}
                className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all text-white/80 hover:text-white"
            >
                {isPlaying ? (
                    <>
                        <Volume2 size={20} className="animate-pulse text-modern-primary" />
                        <span className="text-xs font-medium hidden group-hover:block transition-all">Playing Love Song</span>
                    </>
                ) : (
                    <>
                        <VolumeX size={20} />
                        <span className="text-xs font-medium hidden group-hover:block transition-all">Play Music</span>
                    </>
                )}
            </button>
        </div>
    )
}

export default BackgroundMusic
