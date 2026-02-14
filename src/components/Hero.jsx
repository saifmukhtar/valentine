import React from 'react'
import { motion } from 'framer-motion'
import { Play, Heart } from 'lucide-react'

const Hero = () => {
    const scrollToGame = () => {
        const gameSection = document.getElementById('game-section')
        if (gameSection) {
            gameSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center relative z-10 px-4 overflow-hidden">
            {/* Romantic Background Overlay causing 'dark mode' feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-modern-primary/10 to-modern-dark z-0"></div>

            {/* Floating Petals Container - css animation would be ideal here but let's stick to simple jsx structure for now */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -100, x: Math.random() * 100, opacity: 0 }}
                        animate={{ y: '100vh', x: `+=${Math.random() * 50 - 25}`, opacity: [0, 1, 0] }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
                        className="absolute top-0 text-pink-500/30"
                        style={{ left: `${Math.random() * 100}%` }}
                    >
                        <Heart size={10 + Math.random() * 20} className="fill-current" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
            >
                <div className="mb-6 inline-block p-2 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                    <span className="text-sm font-medium tracking-widest text-modern-accent uppercase flex items-center gap-2 font-sans">
                        <Heart size={14} className="fill-current" />
                        Rooh-e-Ishq
                    </span>
                </div>

                <h1 className="text-6xl md:text-9xl font-cursive text-white drop-shadow-[0_0_25px_rgba(255,0,128,0.5)] mb-2">
                    Hum. <span className="text-modern-primary">Hamesha.</span>
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 relative z-10"
            >
                <p className="text-2xl md:text-4xl text-gray-200 mb-10 max-w-2xl mx-auto font-cursive leading-relaxed">
                    "Tere ishq mein gum hona chahta hoon,<br />
                    Bas ab tera hi hona chahta hoon."
                </p>

                <button
                    onClick={scrollToGame}
                    className="group relative px-10 py-4 bg-white text-modern-dark font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,0,128,0.4)]"
                >
                    <span className="relative z-10 flex items-center gap-3 font-sans tracking-wide">
                        <Play size={20} className="fill-current" />
                        PLAY TO UNLOCK
                    </span>
                </button>
            </motion.div>
        </div>
    )
}

export default Hero
