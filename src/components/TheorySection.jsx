import React from 'react'
import { motion } from 'framer-motion'
import { Atom, Activity, Database, Heart } from 'lucide-react'

const theories = [
    {
        icon: <Atom size={40} />,
        title: "Quantum Entanglement",
        description: "In a chaotic universe, our states are perfectly correlated. No matter the distance, a change in my heart is instantly felt in yours.",
        delay: 0.2
    },
    {
        icon: <Activity size={40} />,
        title: "The Doppler Effect",
        description: "The frequency of my heartbeat shifts exponentially higher the closer you get. It's simple physics.",
        delay: 0.4
    },
    {
        icon: <Database size={40} />,
        title: "Big O Notation",
        description: "My love for you doesn't scale linearly. It grows at O(e^n) — exponential complexity that no algorithm can optimize.",
        delay: 0.6
    }
]

const TheorySection = () => {
    return (
        <section id="theory-section" className="min-h-screen py-20 flex flex-col items-center justify-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
            >
                <span className="text-science-pink text-sm tracking-widest uppercase mb-2 block">Experimental Data</span>
                <h2 className="text-3xl md:text-5xl font-bold">Scientific Proof</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4">
                {theories.map((theory, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: theory.delay, duration: 0.5 }}
                        className="bg-science-dark/80 border border-science-blue/20 p-8 rounded-xl backdrop-blur-md hover:border-science-pink/50 transition-colors group"
                    >
                        <div className="text-science-blue mb-6 group-hover:text-science-pink transition-colors duration-300">
                            {theory.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{theory.title}</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {theory.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default TheorySection
