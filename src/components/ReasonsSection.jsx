import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Music, Coffee } from 'lucide-react'

const reasons = [
    {
        color: "bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400",
        iconcolor: "text-yellow-100",
        title: "Tumhari Muskurahat",
        description: "Jab tum hasti ho, waqt tham sa jata hai. It's not just a smile, it's my whole world."
    },
    {
        color: "bg-gradient-to-bl from-purple-400 via-indigo-500 to-blue-600",
        iconcolor: "text-purple-100",
        title: "Tumhari Awaz",
        description: "Tumhari awaz sukoon hai dil ka. I could listen to you forever."
    },
    {
        color: "bg-gradient-to-tr from-pink-400 via-rose-500 to-red-600",
        iconcolor: "text-rose-100",
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
                    className="text-5xl md:text-7xl font-cursive mb-16 text-center text-white drop-shadow-lg"
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
                            className="group relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm"
                        >
                            {/* Abstract Art Background */}
                            <div className={`absolute inset-0 ${reason.color} opacity-80 transition-transform duration-700 group-hover:scale-110`}>
                                {/* Abstract Shapes */}
                                <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <h3 className={`text-4xl font-cursive font-bold mb-4 text-white drop-shadow-md`}>{reason.title}</h3>
                                <p className="text-gray-100 leading-relaxed font-sans text-lg opacity-90">
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
