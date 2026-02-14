import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import { Heart, Flower, CloudRain } from 'lucide-react'

// --- RIGGING COMPONENTS ---

const Limb = ({ x, y, lengths, angles, color }) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const x1 = x + lengths[0] * Math.sin(toRad(angles[0]));
    const y1 = y + lengths[0] * Math.cos(toRad(angles[0]));
    const x2 = x1 + lengths[1] * Math.sin(toRad(angles[0] + angles[1]));
    const y2 = y1 + lengths[1] * Math.cos(toRad(angles[0] + angles[1]));

    return (
        <g>
            <motion.line initial={false} animate={{ x1: x, y1: y, x2: x1, y2: y1 }} transition={{ duration: 0.8, ease: "easeInOut" }} stroke={color} strokeWidth="4" strokeLinecap="round" />
            <motion.circle initial={false} animate={{ cx: x1, cy: y1 }} transition={{ duration: 0.8 }} r="2" fill={color} />
            <motion.line initial={false} animate={{ x1: x1, y1: y1, x2: x2, y2: y2 }} transition={{ duration: 0.8, ease: "easeInOut" }} stroke={color} strokeWidth="4" strokeLinecap="round" />

            {/* Hand/Foot Marker for debugging or visual polish */}
            <motion.circle initial={false} animate={{ cx: x2, cy: y2 }} transition={{ duration: 0.8 }} r="2" fill={color} />
        </g>
    )
}

const StickFigure = ({ color, pose, x, isWoman, holdingFlower }) => {
    const defaultPose = { bodyX: 0, bodyY: 0, bodyRot: 0, lArm: [20, 10], rArm: [-20, 10], lLeg: [10, 0], rLeg: [-10, 0] }
    const current = { ...defaultPose, ...pose }

    // Hand position calculation for flower
    const toRad = (deg) => (deg * Math.PI) / 180;
    // Right arm end point (assuming rArm is the holding arm)
    const upperLen = 35, lowerLen = 30
    const shoulderX = 0, shoulderY = -50
    const elbowX = shoulderX + upperLen * Math.sin(toRad(current.rArm[0]))
    const elbowY = shoulderY + upperLen * Math.cos(toRad(current.rArm[0]))
    const handX = elbowX + lowerLen * Math.sin(toRad(current.rArm[0] + current.rArm[1]))
    const handY = elbowY + lowerLen * Math.cos(toRad(current.rArm[0] + current.rArm[1]))

    return (
        <motion.g
            animate={{ x: x + current.bodyX, y: current.bodyY, rotate: current.bodyRot }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
        >
            <line x1="0" y1="-60" x2="0" y2="0" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <circle cx="0" cy="-75" r="15" stroke={color} strokeWidth="4" fill="black" />
            {isWoman && <path d="M 0 -20 L -25 45 L 25 45 Z" fill={color} opacity="0.6" />}

            <Limb x={0} y={-50} lengths={[35, 30]} angles={current.lArm} color={color} />
            <Limb x={0} y={-50} lengths={[35, 30]} angles={current.rArm} color={color} />
            <Limb x={0} y={0} lengths={[40, 40]} angles={current.lLeg} color={color} />
            <Limb x={0} y={0} lengths={[40, 40]} angles={current.rLeg} color={color} />

            {holdingFlower && (
                <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, x: handX, y: handY, rotate: -45 }}
                    transition={{ duration: 0.5 }}
                >
                    <Flower size={24} className="text-red-500 fill-red-500 -mt-6 -ml-3" />
                </motion.g>
            )}
        </motion.g>
    )
}

// --- POSES ---
const p = {
    stand: { bodyY: 0, lArm: [10, 10], rArm: [-10, 10], lLeg: [5, 0], rLeg: [-5, 0] },
    bow: { bodyY: 10, bodyRot: 15, lArm: [20, 20], rArm: [-20, 20], lLeg: [30, -60], rLeg: [-10, 20] },
    curtsy: { bodyY: 15, bodyRot: 0, lArm: [60, 20], rArm: [-60, 20], lLeg: [20, -40], rLeg: [-20, -40] },
    frame: { bodyY: 0, lArm: [80, 70], rArm: [-40, 80], lLeg: [5, 0], rLeg: [-5, 0] },
    frameFollow: { bodyY: 0, lArm: [40, 80], rArm: [-80, 70], lLeg: [5, 0], rLeg: [-5, 0] },
    step1: { bodyY: -2, lLeg: [30, 20], rLeg: [-20, 10] },
    step2: { bodyY: -2, lLeg: [-20, 10], rLeg: [30, 20] },
    dipLead: { bodyY: 20, bodyRot: 20, lLeg: [60, -80], rLeg: [10, 20], lArm: [80, 70], rArm: [-20, 80] },
    dipFollow: { bodyY: 30, bodyRot: -45, lLeg: [10, 20], rLeg: [-30, 90], lArm: [150, 20], rArm: [-150, 20] },

    // Proposal Poses
    kneel: { bodyY: 35, bodyRot: 5, lLeg: [90, 90], rLeg: [20, 90], lArm: [10, 10], rArm: [-30, 90] }, // Kneeling
    offer: { bodyY: 35, bodyRot: 5, lLeg: [90, 90], rLeg: [20, 90], lArm: [10, 10], rArm: [-70, -20] }, // Arm extended
    surprise: { bodyY: 0, bodyRot: -5, lArm: [130, 10], rArm: [-130, 10], lLeg: [-10, 0], rLeg: [10, 0] }, // Hands to mouth
    kissGuy: { bodyY: 0, bodyRot: -10, lArm: [60, 80], rArm: [-60, 80], lLeg: [5, 0], rLeg: [-5, 0] },
    kissGirl: { bodyY: 0, bodyRot: 10, lArm: [60, 80], rArm: [-60, 80], lLeg: [5, 0], rLeg: [-5, 0] },
    reject: { bodyRot: -10, lArm: [20, 0], rArm: [-20, 0] } // Arms crossed or away?
}

const RomanticDance = () => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true })
    const [phase, setPhase] = useState('IDLE') // IDLE, DANCE, PROPOSAL, CHOICE, ACCEPTED
    const [step, setStep] = useState(0)
    const [rejectCount, setRejectCount] = useState(0)

    // Confetti / Rain state
    const [effects, setEffects] = useState([])

    // reset animation helper
    const startDance = () => {
        setPhase('DANCE')
        setStep(0)
        let t = 0
        const tick = (ms) => { t += ms; return t; }

        const schedule = [
            { s: 0, ms: 0 },         // Approach
            { s: 1, ms: tick(2000) }, // Bow
            { s: 2, ms: tick(2000) }, // Frame
            { s: 3, ms: tick(2000) }, // Waltz 1
            { s: 4, ms: tick(2000) }, // Waltz 2
            { s: 5, ms: tick(2000) }, // Waltz 3
            { s: 6, ms: tick(2000) }, // Twirl
            { s: 7, ms: tick(3000) }, // Dip
            { s: 8, ms: tick(3000) }, // Sway
            { s: 9, ms: tick(4000) }  // Break & Back up
        ]

        schedule.forEach(ev => {
            setTimeout(() => {
                if (phase !== 'ACCEPTED') setStep(ev.s)
            }, ev.ms)
        })

        // Trigger Proposal
        setTimeout(() => {
            setPhase('PROPOSAL')
        }, t + 2000)
    }

    useEffect(() => {
        if (isInView && phase === 'IDLE') {
            startDance()
        }
    }, [isInView, phase])

    const handleAccept = () => {
        setPhase('ACCEPTED')
        // Trigger effects
        const newEffects = []
        for (let i = 0; i < 30; i++) newEffects.push({ id: i, type: 'flower', x: Math.random() * 100, delay: Math.random() * 2 })
        for (let i = 0; i < 20; i++) newEffects.push({ id: i + 30, type: 'rain', x: Math.random() * 100, delay: Math.random() * 2 })
        setEffects(newEffects)
    }

    const handleReject = () => {
        setRejectCount(prev => prev + 1)
        setPhase('IDLE') // Restart
        setStep(0)
        // Force restart effects?
        setTimeout(() => startDance(), 100)
    }

    // --- RENDER LOGIC for POSES based on Step/Phase ---
    let mPose = { ...p.stand, bodyX: -100 }
    let wPose = { ...p.stand, bodyX: 100 }
    let showFlower = false

    if (phase === 'DANCE') {
        if (step === 0) { mPose = { ...p.stand, bodyX: -30 }; wPose = { ...p.stand, bodyX: 30 }; } // Approach
        else if (step === 1) { mPose = { ...p.bow, bodyX: -30 }; wPose = { ...p.curtsy, bodyX: 30 }; } // Bow
        else if (step === 2) { mPose = { ...p.frame, bodyX: -20 }; wPose = { ...p.frameFollow, bodyX: 20 }; } // Frame
        else if (step >= 3 && step <= 5) {
            const offset = step % 2 === 0 ? 5 : -5
            mPose = { ...p.frame, bodyX: -20 + offset, ...(step % 2 === 0 ? p.step1 : p.step2) }
            wPose = { ...p.frameFollow, bodyX: 20 + offset, ...(step % 2 === 0 ? p.step2 : p.step1) }
        }
        else if (step === 6) { // Twirl
            mPose = { ...p.frame, bodyX: -25 }
            wPose = { ...p.stand, bodyX: 35, bodyRot: 360, transition: { duration: 1 } } // simplified spin
        }
        else if (step === 7) { // Dip
            mPose = { ...p.frame, ...p.dipLead, bodyX: -15 }
            wPose = { ...p.dipFollow, bodyX: 25 }
        }
        else if (step === 8) { // Sway
            mPose = { ...p.frame, bodyX: -15, bodyRot: 5 }
            wPose = { ...p.frameFollow, bodyX: 15, bodyRot: 5 }
        }
        else if (step === 9) { // Back up
            mPose = { ...p.stand, bodyX: -60 }
            wPose = { ...p.stand, bodyX: 60 }
        }
    } else if (phase === 'PROPOSAL') {
        // Man kneels, Woman surprised
        mPose = { ...p.kneel, bodyX: -40, bodyRot: 0 } // Kneel
        wPose = { ...p.surprise, bodyX: 40 }

        // After a moment, he offers flower (simulated with CSS delay or just state toggle? Let's assume he offers immediately for UI flow)
        mPose = { ...p.offer, bodyX: -40 }
        showFlower = true
    } else if (phase === 'ACCEPTED') {
        // Kiss
        mPose = { ...p.kissGuy, bodyX: -12 }
        wPose = { ...p.kissGirl, bodyX: 12 }
        showFlower = false // gave it to her ideally, but let's hide for kiss
    }

    return (
        <section ref={containerRef} className="h-[70vh] flex flex-col items-center justify-end relative z-10 overflow-hidden pb-10">

            {/* UI Overlay for Choice */}
            <AnimatePresence>
                {phase === 'PROPOSAL' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-20 z-50 flex gap-8"
                    >
                        <button
                            onClick={handleAccept}
                            className="px-8 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2"
                        >
                            <Heart size={20} className="fill-white" /> YES, I WILL!
                        </button>

                        <button
                            onClick={handleReject}
                            disabled={rejectCount > 0}
                            className={`px-8 py-3 font-bold rounded-full shadow-lg transition-transform flex items-center gap-2 ${rejectCount > 0 ? 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-50' : 'bg-red-500 text-white hover:scale-110'}`}
                        >
                            <span className="text-xl">💔</span> {rejectCount > 0 ? "NO CHOICE ;)" : "NO WAY"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Accepted Message */}
            <AnimatePresence>
                {phase === 'ACCEPTED' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-10 z-50 text-center"
                    >
                        <h2 className="text-5xl font-bold text-pink-500 drop-shadow-md mb-2">SHE SAID YES!</h2>
                        <p className="text-white text-lg">Forever starts now.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Effects Layer */}
            {phase === 'ACCEPTED' && effects.map((eff) => (
                <motion.div
                    key={`${eff.type}-${eff.id}`}
                    initial={{ y: -50, x: `${eff.x}%`, opacity: 0 }}
                    animate={{ y: '100vh', opacity: 1 }}
                    transition={{ duration: 3, delay: eff.delay, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 z-0"
                >
                    {eff.type === 'flower' ? (
                        <Flower size={24} className="text-pink-400 fill-pink-200" />
                    ) : (
                        <CloudRain size={16} className="text-blue-300" />
                    )}
                </motion.div>
            ))}


            {/* Stage */}
            <div className="relative w-full max-w-[500px] h-[400px]">
                <div className="absolute bottom-10 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_20px_white]"></div>

                <svg width="100%" height="100%" viewBox="-250 -350 500 400" className="overflow-visible">
                    <StickFigure color="white" pose={mPose} x={0} isWoman={false} holdingFlower={showFlower} />
                    <StickFigure color="#ff0080" pose={wPose} x={0} isWoman={true} />
                </svg>
            </div>

            <div className="absolute bottom-4 text-white/30 font-mono text-xs">
                {phase === 'DANCE' && "Performing Waltz..."}
                {phase === 'PROPOSAL' && "Waiting for answer..."}
                {phase === 'ACCEPTED' && "PERFECT MATCH COMPILING..."}
            </div>
        </section>
    )
}

export default RomanticDance
