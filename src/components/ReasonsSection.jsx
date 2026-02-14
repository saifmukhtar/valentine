import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Music, Coffee } from 'lucide-react'

const reasons = [
    {
        image: "https://images.unsplash.com/photo-1517457210348-18e385f025e1?auto=format&fit=crop&q=80",
        title: "Tumhari Muskurahat",
        description: "Jab tum hasti ho, waqt tham sa jata hai. It's not just a smile, it's my whole world."
    },
    {
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80",
        title: "Tumhari Awaz",
        description: "Tumhari awaz sukoon hai dil ka. I could listen to you forever."
    },
    {
        image: "https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&q=80",
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
                    className="text-4xl md:text-7xl font-cursive mb-16 text-center text-white drop-shadow-lg"
                >
                    Why You're <span className="text-modern-primary">Special</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={reason.image}
                                    alt={reason.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-3xl font-cursive font-bold mb-3 text-white drop-shadow-md">{reason.title}</h3>
                                <p className="text-gray-200 leading-relaxed font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    {reason.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ReasonsSection
