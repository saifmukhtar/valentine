import React from 'react'
import { motion } from 'framer-motion'

const memories = [
    {
        date: "Pehli Mulaqat",
        title: "The Beginning",
        text: "Us din na sirf hum mile, balki meri zindagi mil gayi. It was the moment everything changed.",
        glitchIntensity: "high" // kept for visual style only
    },
    {
        date: "Izhaar-e-Mohabbat",
        title: "Falling Deep",
        text: "Dil ne kaha, bas tum hi ho. Even in the chaos, you were the only thing that made sense.",
        glitchIntensity: "medium"
    },
    {
        date: "Aaj Aur Hamesha",
        title: "The Clarity",
        text: "Ab har pal tumhare naam. You aren't just a part of my life. You are my whole life.",
        glitchIntensity: "low"
    }
]

const LoveTimeline = () => {
    return (
        <section className="min-h-screen py-20 flex flex-col items-center justify-center relative z-10 px-4">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-modern-primary to-modern-secondary">
                            HAMARI DASTAAN
                        </span>
                    </h2>
                    <p className="text-gray-400 font-mono text-sm">Every moment matters.</p>
                </motion.div>

                <div className="space-y-24 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                    {memories.map((mem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${index % 2 === 0 ? 'md:flex-row' : ''}`}
                        >
                            {/* Dot on line */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-modern-dark shadow-[0_0_15px_rgba(255,255,255,0.2)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors group-hover:bg-modern-primary group-hover:border-modern-primary">
                                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                            </div>

                            {/* Content Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 md:p-8 rounded-xl bg-modern-card border border-white/5 backdrop-blur-sm group-hover:border-modern-primary/50 transition-colors duration-500">
                                <span className="block text-modern-accent font-mono text-xs mb-2 tracking-widest">{mem.date}</span>

                                <h3
                                    className="text-2xl font-bold mb-4 text-white group-hover:text-modern-primary transition-colors glitch-text"
                                    data-text={mem.title}
                                >
                                    {mem.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                                    {mem.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LoveTimeline
