import React, { useState } from 'react'
import FluidBackground from './components/FluidBackground'
import Hero from './components/Hero'
import ReasonsSection from './components/ReasonsSection'
import GameSection from './components/GameSection'
import Conclusion from './components/Conclusion'
import LoveTimeline from './components/LoveTimeline'
import InteractiveLove from './components/InteractiveLove'
import RomanticDance from './components/RomanticDance'

function App() {
    const [unlocked, setUnlocked] = useState(false)

    const handleGameWin = () => {
        setUnlocked(true)
        setTimeout(() => {
            document.getElementById('conclusion-section').scrollIntoView({ behavior: 'smooth' })
        }, 1000)
    }

    return (
        <div className="relative min-h-screen bg-modern-dark text-white font-sans overflow-x-hidden selection:bg-modern-primary selection:text-white">
            <FluidBackground />

            <div className="relative z-10 container mx-auto px-4">
                <Hero />
                <RomanticDance />
                <ReasonsSection />
                <LoveTimeline />
                <InteractiveLove />
                <GameSection onWin={handleGameWin} />
                <Conclusion unlocked={unlocked} />
            </div>

            <footer className="relative z-10 py-8 text-center text-gray-500 text-sm font-light">
                <p>Made for You &bull; 2024</p>
            </footer>
        </div>
    )
}

export default App
