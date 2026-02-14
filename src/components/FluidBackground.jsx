import React, { useEffect, useRef } from 'react'

const FluidBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationFrameId

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        // Particle Configuration
        const particleCount = 50
        const connectionDistance = 180
        const mouseDistance = 250

        let particles = []

        // Mouse state
        let mouse = { x: null, y: null }

        const handleMouseMove = (e) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleMouseLeave = () => {
            mouse.x = null
            mouse.y = null
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.vx = (Math.random() - 0.5) * 0.8 // Slower, more fluid
                this.vy = (Math.random() - 0.5) * 0.8
                this.size = Math.random() * 3 + 1
                // Randomize between pink and purple
                this.color = Math.random() > 0.5 ? '#ff0080' : '#7928ca'
                this.alpha = Math.random() * 0.5 + 0.2
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges with soft boundaries
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1

                // Mouse interaction - gentle push
                if (mouse.x != null) {
                    const dx = mouse.x - this.x
                    const dy = mouse.y - this.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance
                        const forceDirectionY = dy / distance
                        const force = (mouseDistance - distance) / mouseDistance

                        // Gentle push away for interaction
                        const directionX = forceDirectionX * force * 0.4
                        const directionY = forceDirectionY * force * 0.4

                        this.vx -= directionX
                        this.vy -= directionY
                    }
                }
            }

            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.globalAlpha = this.alpha
                ctx.fillStyle = this.color
                ctx.fill()
                ctx.globalAlpha = 1.0
            }
        }

        const initParticles = () => {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        initParticles()

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            particles.forEach(particle => {
                particle.update()
                particle.draw()
            })

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        // Gradient line
                        const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
                        gradient.addColorStop(0, particles[i].color)
                        gradient.addColorStop(1, particles[j].color)

                        ctx.strokeStyle = gradient
                        ctx.globalAlpha = 1 - (distance / connectionDistance)
                        ctx.lineWidth = 1
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                        ctx.globalAlpha = 1.0
                    }
                }
            }

            // Connect to mouse
            if (mouse.x != null) {
                particles.forEach(particle => {
                    const dx = mouse.x - particle.x
                    const dy = mouse.y - particle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        ctx.strokeStyle = '#00dfd8' // Teal accent for mouse
                        ctx.globalAlpha = 1 - (distance / connectionDistance)
                        ctx.lineWidth = 1.5
                        ctx.moveTo(mouse.x, mouse.y)
                        ctx.lineTo(particle.x, particle.y)
                        ctx.stroke()
                        ctx.globalAlpha = 1.0
                    }
                })
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 bg-modern-dark"
        />
    )
}

export default FluidBackground
