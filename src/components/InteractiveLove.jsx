import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Flower, Mail, X } from 'lucide-react'

const InteractiveLove = () => {
    // Flower Logic
    const [flowers, setFlowers] = useState([])
    const addFlower = () => {
        const newFlower = {
            id: Date.now(),
            x: Math.random() * 80 - 40, // Random spread
            angle: Math.random() * 30 - 15,
        }
        setFlowers(prev => [...prev, newFlower])
    }

    // Note Logic
    const [isNoteOpen, setIsNoteOpen] = useState(false)

    // Heartbeat Logic
    const [pulsing, setPulsing] = useState(false)
    const triggerPulse = () => {
        setPulsing(true)
        setTimeout(() => setPulsing(false), 1000)
    }

    return (
        <section className="min-h-screen py-20 flex flex-col items-center justify-center relative z-10 px-4 gap-20">

            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-bold text-center mb-8"
            >
                For You
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">

                {/* 1. Virtual Flower Bouquet */}
                <div className="bg-modern-card border border-white/10 rounded-2xl p-8 flex flex-col items-center min-h-[400px]">
                    <div className="mb-4 p-3 bg-pink-500/20 rounded-full text-pink-400">
                        <Flower size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Phoolon Ki Barsaat</h3>

                    <button
                        onClick={addFlower}
                        className="px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded-full text-white font-bold transition-all active:scale-95 mb-4 z-20"
                    >
                        Add a Flower 🌸
                    </button>

                    <p className="text-gray-400 text-sm text-center mb-8">Click button above to add flowers.</p>

                    <div className="relative w-full flex-grow flex items-end justify-center">
                        <div className="w-16 h-24 border-2 border-white/30 border-t-0 rounded-b-xl relative bg-white/5 backdrop-blur-sm z-10"></div>
                        {flowers.map((flower, i) => (
                            <motion.div
                                key={flower.id}
                                initial={{ opacity: 0, y: 50, scale: 0 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute bottom-10 origin-bottom"
                                style={{
                                    marginLeft: flower.x,
                                    rotate: flower.angle,
                                    zIndex: i
                                }}
                            >
                                <Flower size={40} className="text-pink-400 fill-pink-400/50" />
                                <div className="w-1 h-20 bg-green-500/50 mx-auto"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2. Open When Note */}
                <div className="bg-modern-card border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
                    <div className="mb-4 p-3 bg-purple-500/20 rounded-full text-purple-400">
                        <Mail size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Ek Paigaam</h3>
                    <p className="text-gray-400 text-sm text-center mb-8">Tap to open.</p>

                    <AnimatePresence>
                        {!isNoteOpen ? (
                            <motion.button
                                layoutId="envelope"
                                onClick={() => setIsNoteOpen(true)}
                                className="w-48 h-32 bg-white text-modern-dark flex items-center justify-center rounded shadow-lg relative group cursor-pointer"
                                whileHover={{ scale: 1.05, rotate: 2 }}
                            >
                                <div className="w-0 h-0 border-l-[96px] border-l-transparent border-t-[64px] border-t-gray-200 border-r-[96px] border-r-transparent absolute top-0 left-0"></div>
                                <div className="w-0 h-0 border-l-[96px] border-l-transparent border-b-[64px] border-b-gray-100 border-r-[96px] border-r-transparent absolute bottom-0 left-0"></div>
                                <Heart className="text-red-500 fill-red-500 relative z-10" />
                            </motion.button>
                        ) : (
                            <motion.div
                                layoutId="envelope"
                                className="absolute inset-0 bg-white text-modern-dark p-8 flex flex-col items-center justify-center z-20 text-center"
                            >
                                <button
                                    onClick={() => setIsNoteOpen(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-black"
                                >
                                    <X size={24} />
                                </button>
                                <p className="font-handwriting text-2xl font-bold text-modern-primary mb-4">Meri Jaan,</p>
                                <p className="italic text-gray-600 mb-6">
                                    "Tum meri wo dua ho,<br />
                                    Jo har mangi hui dua qabool karti hai."
                                </p>
                                <Heart className="text-red-500 fill-red-500 animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 3. Heartbeat Sync */}
                <div className="bg-modern-card border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">

                    {/* Background Pulse */}
                    <motion.div
                        animate={pulsing ? { scale: [1, 20], opacity: [0.5, 0] } : { scale: 1, opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-red-500 rounded-full origin-center pointer-events-none"
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-4 p-3 bg-red-500/20 rounded-full text-red-500">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Heartbeat Sync</h3>
                        <p className="text-gray-400 text-sm text-center mb-8">Touch to feel it.</p>

                        <button
                            onClick={triggerPulse}
                            className="w-32 h-32 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 shadow-[0_0_30px_rgba(255,0,0,0.4)] flex items-center justify-center active:scale-90 transition-transform"
                        >
                            <Heart size={48} className="text-white fill-white animate-pulse" />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default InteractiveLove
