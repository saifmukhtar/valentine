import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Stars } from 'lucide-react'
import confetti from 'canvas-confetti'

const Conclusion = ({ unlocked }) => {

    useEffect(() => {
        if (unlocked) {
            const duration = 3000
            const end = Date.now() + duration

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff0080', '#7928ca']
                })
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff0080', '#00dfd8']
                })

                if (Date.now() < end) {
                    requestAnimationFrame(frame)
                }
            }
            frame()
        }
    }, [unlocked])

    const [noBtnPosition, setNoBtnPosition] = React.useState({ x: 0, y: 0 })

    const runAway = () => {
        const x = Math.random() * 200 - 100
        const y = Math.random() * 200 - 100
        setNoBtnPosition({ x, y })
    }

    if (!unlocked) {
        return (
            <section id="conclusion-section" className="min-h-[50vh] flex items-center justify-center relative z-10 opacity-50 grayscale transition-all duration-1000">
                <div className="text-center">
                    <p className="text-gray-600 mb-2">LOCKED</p>
                    <p className="text-2xl font-bold text-gray-700">Complete the Challenge First</p>
                </div>
            </section>
        )
    }

    return (
        <section id="conclusion-section" className="min-h-screen flex flex-col items-center justify-center relative z-10 py-20 pb-40">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative max-w-3xl w-full mx-4"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-modern-primary to-modern-secondary rounded-2xl blur opacity-30 animate-pulse"></div>
                <div className="relative bg-black/80 backdrop-blur-xl p-10 md:p-16 rounded-2xl border border-white/10 text-center">

                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <Heart size={80} className="text-modern-primary fill-modern-primary animate-pulse" />
                            <Stars className="absolute -top-4 -right-4 text-modern-accent animate-spin-slow" size={40} />
                        </div>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-cursive font-bold mb-6 text-white tracking-tight drop-shadow-lg">
                        Meri Humsafar Banogi?
                    </h2>

                    <p className="text-xl text-gray-300/90 mb-10 leading-relaxed font-light">
                        "Zindagi ke har safar mein, mujhe bas tumhara saath chahiye.<br />
                        Haa kaho, aur meri duniya mukammal kar do."
                        <br />
                        <span className="text-modern-primary font-medium">Let's make it official.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative">
                        <button
                            className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-modern-primary to-modern-secondary text-white font-bold rounded-full text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,128,0.5)] transition-all z-20"
                            onClick={() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })}
                        >
                            Qabool Hai! 💖
                        </button>
                        <motion.button
                            animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                            onHoverStart={runAway}
                            onTouchStart={runAway} // For mobile
                            className="w-full sm:w-auto px-12 py-5 bg-white/5 text-white font-medium rounded-full hover:bg-white/10 transition-colors z-10"
                        >
                            Sochna Padega...
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Conclusion
