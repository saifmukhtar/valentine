import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart, Trophy, RefreshCw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

// Game Constants
const GRID_SIZE = 20
const CELL_SIZE = 20
const WIN_SCORE = 10
// Start with a longer snake so it "emerges" visibly
const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
]

const GameSection = ({ onWin }) => {
    const [snake, setSnake] = useState(INITIAL_SNAKE)
    const [food, setFood] = useState({ x: 15, y: 5 })
    const [direction, setDirection] = useState('UP')
    const [nextDirection, setNextDirection] = useState('UP') // Prevent conflicting moves in one frame
    const [isGameOver, setIsGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const [isGameRunning, setIsGameRunning] = useState(false)
    const [hasWon, setHasWon] = useState(false)

    // Touch handling
    const touchStart = useRef(null)
    const touchEnd = useRef(null)

    // Generate random food
    const generateFood = useCallback(() => {
        let newFood
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            }
            // Ensure food doesn't spawn on snake
            // eslint-disable-next-line
            const isOnSnake = snake.some(s => s.x === newFood.x && s.y === newFood.y)
            if (!isOnSnake) break
        }
        return newFood
    }, [snake])

    // Game Loop
    useEffect(() => {
        if (!isGameRunning || isGameOver || hasWon) return

        const moveSnake = setInterval(() => {
            setDirection(nextDirection)

            setSnake(prevSnake => {
                const newHead = { ...prevSnake[0] }

                switch (nextDirection) {
                    case 'UP': newHead.y -= 1; break
                    case 'DOWN': newHead.y += 1; break
                    case 'LEFT': newHead.x -= 1; break
                    case 'RIGHT': newHead.x += 1; break
                    default: break
                }

                // Check collisions (walls)
                if (
                    newHead.x < 0 || newHead.x >= GRID_SIZE ||
                    newHead.y < 0 || newHead.y >= GRID_SIZE
                ) {
                    setIsGameOver(true)
                    return prevSnake
                }

                // Check self collision
                if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setIsGameOver(true)
                    return prevSnake
                }

                const newSnake = [newHead, ...prevSnake]

                // Check food collision
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore(prev => {
                        const newScore = prev + 1
                        if (newScore >= WIN_SCORE) {
                            setHasWon(true)
                            onWin()
                        }
                        return newScore
                    })
                    setFood(generateFood())
                } else {
                    newSnake.pop()
                }

                return newSnake
            })
        }, 150)

        return () => clearInterval(moveSnake)
    }, [nextDirection, isGameRunning, isGameOver, hasWon, food, generateFood, onWin])

    // Key controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!isGameRunning) return

            const { key } = e
            // Prevent scrolling
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }

            switch (key) {
                case 'ArrowUp': if (direction !== 'DOWN') setNextDirection('UP'); break
                case 'ArrowDown': if (direction !== 'UP') setNextDirection('DOWN'); break
                case 'ArrowLeft': if (direction !== 'RIGHT') setNextDirection('LEFT'); break
                case 'ArrowRight': if (direction !== 'LEFT') setNextDirection('RIGHT'); break
                default: break
            }
        }
        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [direction, isGameRunning])

    // Touch handlers
    const onTouchStart = (e) => {
        touchStart.current = e.targetTouches[0].clientX
        touchEnd.current = e.targetTouches[0].clientY // We need X and Y? No just swipe logic

        // Actually simplicity:
        touchStart.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY }
    }

    const onTouchMove = (e) => {
        touchEnd.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY }
    }

    const onTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return

        const distanceX = touchStart.current.x - touchEnd.current.x
        const distanceY = touchStart.current.y - touchEnd.current.y
        const isHorizontal = Math.abs(distanceX) > Math.abs(distanceY)

        if (Math.abs(distanceX) < 10 && Math.abs(distanceY) < 10) return // Tap, not swipe

        if (isHorizontal) {
            if (distanceX > 0 && direction !== 'RIGHT') setNextDirection('LEFT')
            if (distanceX < 0 && direction !== 'LEFT') setNextDirection('RIGHT')
        } else {
            if (distanceY > 0 && direction !== 'DOWN') setNextDirection('UP')
            if (distanceY < 0 && direction !== 'UP') setNextDirection('DOWN')
        }

        // Reset
        touchStart.current = null
        touchEnd.current = null
    }

    // D-Pad for easier mobile play (Requested feature: "keyboard and touch compatible")
    const handleDPad = (dir) => {
        if (dir === 'UP' && direction !== 'DOWN') setNextDirection('UP')
        if (dir === 'DOWN' && direction !== 'UP') setNextDirection('DOWN')
        if (dir === 'LEFT' && direction !== 'RIGHT') setNextDirection('LEFT')
        if (dir === 'RIGHT' && direction !== 'LEFT') setNextDirection('RIGHT')
    }

    const restartGame = () => {
        setSnake(INITIAL_SNAKE)
        setFood({ x: 15, y: 5 }) // Reset food to safe spot
        setScore(0)
        setIsGameOver(false)
        setHasWon(false)
        setDirection('UP')
        setNextDirection('UP')
        setIsGameRunning(true)
    }

    return (
        <section id="game-section" className="min-h-screen py-20 flex flex-col items-center justify-center relative z-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-modern-secondary/20 text-modern-secondary text-sm font-bold mb-4 border border-modern-secondary/30">
                    <Trophy size={14} /> CHALLENGE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Collect <span className="text-modern-primary">10 Hearts</span></h2>
                <p className="text-gray-400">Prove your dedication. Swipe or use buttons.</p>
            </motion.div>

            {/* Game Container */}
            <div
                className="relative p-2 bg-gradient-to-br from-modern-primary/30 to-modern-secondary/30 rounded-2xl backdrop-blur-sm border border-white/10"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="bg-black/90 rounded-xl relative overflow-hidden shadow-2xl">

                    {/* Game Board - Removed grid lines for cleaner look */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
                        }}
                        className="relative z-0"
                    >
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                            const x = i % GRID_SIZE
                            const y = Math.floor(i / GRID_SIZE)

                            const isSnakeHead = snake[0].x === x && snake[0].y === y
                            const isSnakeBody = snake.slice(1).some(s => s.x === x && s.y === y)
                            const isFood = food.x === x && food.y === y

                            let cellClass = "bg-transparent transition-all duration-100 placeholder-cell" // cleaner look
                            if (isSnakeHead) cellClass = "bg-modern-primary rounded-sm shadow-[0_0_15px_#ff0080] z-10 scale-110"
                            if (isSnakeBody) cellClass = "bg-modern-secondary/80 rounded-sm"

                            return (
                                <div
                                    key={i}
                                    style={{ width: CELL_SIZE, height: CELL_SIZE }}
                                    className={`${cellClass} flex items-center justify-center`}
                                >
                                    {isFood && <Heart size={16} className="text-red-500 fill-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />}
                                </div>
                            )
                        })}
                    </div>

                    {/* Overlays */}
                    {(!isGameRunning && !isGameOver && !hasWon) && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                            <button
                                onClick={restartGame}
                                className="px-8 py-3 bg-modern-primary text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg cursor-pointer z-50 pointer-events-auto"
                            >
                                START GAME
                            </button>
                        </div>
                    )}

                    {isGameOver && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-red-500 mb-4">GAME OVER</h3>
                            <p className="mb-6 text-gray-300">Score: {score}</p>
                            <button
                                onClick={restartGame}
                                className="px-6 py-2 border border-white/20 hover:bg-white/10 rounded-full flex items-center gap-2 transition-colors cursor-pointer z-50 pointer-events-auto"
                            >
                                <RefreshCw size={16} /> TRY AGAIN
                            </button>
                        </div>
                    )}

                    {hasWon && (
                        <div className="absolute inset-0 bg-modern-secondary/90 flex flex-col items-center justify-center z-20 backdrop-blur-md">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-center"
                            >
                                <Heart size={60} className="text-white fill-white mx-auto mb-4 animate-bounce" />
                                <h3 className="text-3xl font-bold text-white mb-2">UNLOCKED!</h3>
                                <p className="text-white/80">Scroll down for your prize...</p>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Controls (D-Pad) for guaranteed usability */}
            <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
                <div></div>
                <button onClick={() => handleDPad('UP')} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-modern-primary/50"><ArrowUp size={24} /></button>
                <div></div>
                <button onClick={() => handleDPad('LEFT')} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-modern-primary/50"><ArrowLeft size={24} /></button>
                <button onClick={() => handleDPad('DOWN')} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-modern-primary/50"><ArrowDown size={24} /></button>
                <button onClick={() => handleDPad('RIGHT')} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-modern-primary/50"><ArrowRight size={24} /></button>
            </div>

            <div className="mt-6 flex gap-8 text-sm font-mono text-gray-400">
                <span className="flex items-center gap-2"><Trophy size={14} className="text-yellow-500" /> SCORE: <span className="text-white">{score}</span></span>
                <span className="flex items-center gap-2"><Heart size={14} className="text-red-500" /> GOAL: <span className="text-white">{WIN_SCORE}</span></span>
            </div>
        </section>
    )
}

export default GameSection

