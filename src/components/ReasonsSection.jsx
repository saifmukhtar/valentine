import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Music, Coffee } from 'lucide-react'

const reasons = [
    {
        icon: <Sparkles size={32} />,
        title: "Tumhari Muskurahat",
        description: "Jab tum hasti ho, waqt tham sa jata hai. It's not just a smile, it's my whole world."
    },
    {
        icon: <Music size={32} />,
        title: "Tumhari Awaz",
        description: "Tumhari awaz sukoon hai dil ka. I could listen to you forever."
    },
    {
        icon: <Coffee size={32} />,
        title: "Hamari Yaadein",
        description: "Har lamha tumhare saath ek kahani hai. Every memory is a treasure I keep safe."
    }
]

const ReasonsSection = () => {
    return (
        <section className="min-h-screen py-20 flex flex-col items-center justify-center relative z-10">
            <div className="max-w-6xl w-full px-4">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-left"
                >
                    Why You're <span className="text-transparent bg-clip-text bg-gradient-to-r from-modern-primary to-modern-accent">Special</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group p-8 rounded-2xl bg-modern-card border border-white/5 hover:bg-white/5 transition-all hover:-translate-y-2 duration-300"
                        >
                            <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-modern-primary/20 to-modern-secondary/20 w-fit text-white group-hover:scale-110 transition-transform">
                                {reason.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">{reason.title}</h3>
                            <p className="text-gray-400 leading-relaxed font-light">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ReasonsSection
