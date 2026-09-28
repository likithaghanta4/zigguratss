import React, { useEffect, useRef } from 'react'

/**
 * CosmosGalleryBackground
 * High-performance HTML5 Canvas background inspired by instinctor.com
 * Features:
 * - Multi-harmonic organic fluid nebula waves in Zigguratss Champagne Gold & Obsidian palette
 * - Interactive mouse spotlight and particle physics (auras, constellation links, fluid drift)
 * - 3D depth stardust field with twinkling alphas
 * - Subtle architectural blueprint perspective depth matrix
 * - 60 FPS requestAnimationFrame with visibility/performance safeguards
 */
export default function CosmosGalleryBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false })
  const animFrameIdRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
      if (!mouseRef.current.active) {
        mouseRef.current.x = e.clientX
        mouseRef.current.y = e.clientY
        mouseRef.current.active = true
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    // Stardust Particle system
    const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 18000) + 40, 90)
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2, // Depth factor
      baseRadius: Math.random() * 1.8 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.45 + 0.15), // Slow upward drift
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? '#dfb76c' : Math.random() > 0.5 ? '#f7d794' : '#ffffff'
    }))

    // Fluid Nebula Wave parameters
    const waveCount = 4
    let time = 0
    let isVisible = true

    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const render = () => {
      if (!isVisible) {
        animFrameIdRef.current = requestAnimationFrame(render)
        return
      }

      time += 0.012

      // Smooth mouse lerp
      const mouse = mouseRef.current
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.07
        mouse.y += (mouse.targetY - mouse.y) * 0.07
      }

      ctx.clearRect(0, 0, width, height)

      // 1. Deep Atmospheric Dark Base
      ctx.fillStyle = '#0a0a0d'
      ctx.fillRect(0, 0, width, height)

      // 2. Multi-layered Organic Nebula Wave Flows (Instinctor Wave & Lava Shader effect)
      for (let w = 0; w < waveCount; w++) {
        const offset = w * 1.6
        const waveYBase = height * (0.25 + w * 0.22)
        const waveAmp = 55 + w * 25
        const waveFreq = 0.0018 - w * 0.0003

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(0, height)

        for (let x = 0; x <= width; x += 16) {
          // Harmonic wave equation
          const wave1 = Math.sin(x * waveFreq + time * 0.8 + offset) * waveAmp
          const wave2 = Math.cos(x * (waveFreq * 1.8) - time * 0.5 + offset * 1.3) * (waveAmp * 0.45)
          const mouseDistX = mouse.active ? (x - mouse.x) : 9999
          const mouseInteract = mouse.active && Math.abs(mouseDistX) < 300 
            ? Math.sin((mouseDistX / 300) * Math.PI * 0.5) * 35 
            : 0

          const y = waveYBase + wave1 + wave2 + mouseInteract
          if (x === 0) {
            ctx.lineTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.lineTo(width, height)
        ctx.closePath()

        // Luminous Gold & Violet-Amber Gradient Fill
        const grad = ctx.createLinearGradient(0, waveYBase - waveAmp, width, waveYBase + waveAmp * 2)
        if (w === 0) {
          grad.addColorStop(0, 'rgba(223, 183, 108, 0.06)')
          grad.addColorStop(0.5, 'rgba(247, 215, 148, 0.03)')
          grad.addColorStop(1, 'transparent')
        } else if (w === 1) {
          grad.addColorStop(0, 'rgba(180, 130, 50, 0.07)')
          grad.addColorStop(0.5, 'rgba(201, 169, 110, 0.035)')
          grad.addColorStop(1, 'transparent')
        } else if (w === 2) {
          grad.addColorStop(0, 'rgba(95, 30, 85, 0.05)')
          grad.addColorStop(0.5, 'rgba(223, 183, 108, 0.04)')
          grad.addColorStop(1, 'transparent')
        } else {
          grad.addColorStop(0, 'rgba(223, 183, 108, 0.05)')
          grad.addColorStop(0.7, 'rgba(160, 110, 30, 0.02)')
          grad.addColorStop(1, 'transparent')
        }

        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()
      }

      // 3. Volumetric Glowing Radial Aura Orbs
      // Top Center Golden Core
      const orb1X = width * 0.5 + Math.sin(time * 0.4) * 80
      const orb1Y = height * 0.15 + Math.cos(time * 0.3) * 50
      const orb1Grad = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, width * 0.45)
      orb1Grad.addColorStop(0, 'rgba(223, 183, 108, 0.12)')
      orb1Grad.addColorStop(0.4, 'rgba(180, 130, 45, 0.04)')
      orb1Grad.addColorStop(1, 'transparent')
      ctx.fillStyle = orb1Grad
      ctx.fillRect(0, 0, width, height)

      // Flank Violet / Rose Core
      const orb2X = width * 0.85 + Math.cos(time * 0.35) * 60
      const orb2Y = height * 0.65 + Math.sin(time * 0.4) * 60
      const orb2Grad = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, width * 0.35)
      orb2Grad.addColorStop(0, 'rgba(140, 50, 110, 0.07)')
      orb2Grad.addColorStop(0.5, 'rgba(223, 183, 108, 0.03)')
      orb2Grad.addColorStop(1, 'transparent')
      ctx.fillStyle = orb2Grad
      ctx.fillRect(0, 0, width, height)

      // 4. Interactive Mouse Dynamic Spotlight & Radiant Gold Ripple
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 380)
        mouseGlow.addColorStop(0, 'rgba(247, 215, 148, 0.15)')
        mouseGlow.addColorStop(0.3, 'rgba(223, 183, 108, 0.08)')
        mouseGlow.addColorStop(0.7, 'rgba(160, 110, 30, 0.02)')
        mouseGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = mouseGlow
        ctx.fillRect(0, 0, width, height)
      }

      // 5. 3D Architectural Horizon Matrix (Perspective lines fading into distance)
      ctx.save()
      ctx.strokeStyle = 'rgba(223, 183, 108, 0.025)'
      ctx.lineWidth = 1
      const vanishingY = height * 0.38
      const vanishingX = width * 0.5 + (mouse.active ? (mouse.x - width * 0.5) * 0.08 : 0)

      // Perspective Rays
      for (let rx = -width * 0.5; rx <= width * 1.5; rx += width * 0.12) {
        ctx.beginPath()
        ctx.moveTo(vanishingX, vanishingY)
        ctx.lineTo(rx, height)
        ctx.stroke()
      }

      // Horizontal Depth Rings
      for (let h = 0; h < 6; h++) {
        const ringY = vanishingY + Math.pow(h / 5, 2.2) * (height - vanishingY)
        ctx.beginPath()
        ctx.moveTo(0, ringY)
        ctx.lineTo(width, ringY)
        ctx.stroke()
      }
      ctx.restore()

      // 6. Floating Cosmic Stardust & Constellation Physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particle
        p.x += p.vx * p.z
        p.y += p.vy * p.z

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        // Mouse interaction: gentle repulsion & constellation lines
        let mouseInfluence = 0
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            mouseInfluence = (1 - dist / 180)
            p.x -= (dx / dist) * mouseInfluence * 1.2
            p.y -= (dy / dist) * mouseInfluence * 1.2

            // Constellation line to mouse
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(223, 183, 108, ${mouseInfluence * 0.22})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // Particle twinkle calculation
        const twinkle = Math.sin(time * 3 * p.twinkleSpeed + p.twinklePhase) * 0.35 + 0.65
        const currentAlpha = Math.min(Math.max((0.15 + p.z * 0.55 + mouseInfluence * 0.4) * twinkle, 0.05), 1)
        const currentRadius = p.baseRadius * (0.8 + p.z * 0.5)

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = currentAlpha
        ctx.fill()

        // Soft halo on brighter foreground particles
        if (p.z > 0.6) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, currentRadius * 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(223, 183, 108, 0.18)'
          ctx.fill()
        }
        ctx.globalAlpha = 1.0

        // Inter-particle constellation connections for nearby stars
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pdx = p.x - p2.x
          const pdy = p.y - p2.y
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy)
          if (pdist < 85) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(223, 183, 108, ${(1 - pdist / 85) * 0.12 * p.z})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render)
    }

    animFrameIdRef.current = requestAnimationFrame(render)

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
