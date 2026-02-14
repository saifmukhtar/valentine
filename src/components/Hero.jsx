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
        <div className="h-screen flex flex-col items-center justify-center text-center relative z-10 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
            >
                <div className="mb-6 inline-block p-2 px-4 rounded-full bg-modern-card border border-white/10 backdrop-blur-md shadow-lg">
                    <span className="text-sm font-medium tracking-widest text-modern-accent uppercase flex items-center gap-2">
                        <Heart size={14} className="fill-current" />
                        Special Request
                    </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    Hum.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-modern-primary to-modern-secondary">
                        Hamesha.
                    </span>
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8"
            >
                <p className="text-xl md:text-2xl text-gray-300/80 mb-10 max-w-lg mx-auto font-light leading-relaxed italic">
                    "Tere ishq mein gum hona chahta hoon,<br />
                    Bas ab tera hi hona chahta hoon."
                </p>

                <button
                    onClick={scrollToGame}
                    className="group relative px-10 py-4 bg-white text-modern-dark font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,0,128,0.4)]"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <Play size={20} className="fill-current" />
                        PLAY TO UNLOCK
                    </span>
                </button>
            </motion.div>
        </div>
    )
}

export default Hero
