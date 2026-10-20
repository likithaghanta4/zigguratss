import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle2, Shield, Eye, Layers, RotateCcw, Play, Pause } from 'lucide-react'

// Authentic Zigguratss Assets from repository
import screenshotImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 14-57-58.png'
import flowersImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 15-14-55.png'
import wallImage1 from '../assets/ProductPage-images/image 1.png'
import wallImage2 from '../assets/ProductPage-images/image2.png'
import wallImage3 from '../assets/ProductPage-images/image3.png'
import image4 from '../assets/ProductPage-images/image4.png'
import hansImage from '../assets/ProductPage-images/hans.jpg'
import testImage from '../assets/ProductPage-images/testImage.jpg'

// Real Artwork & Heritage Assets
import historyImage from '../assets/User-images/history.jpg'
import birdsImage from '../assets/User-images/birds.jpg'
import image9 from '../assets/User-images/image 9.jpg'
import diff1 from '../assets/User-images/diif1.jpg'
import sky1 from '../assets/User-images/sky1.jpg'
import pradipPortrait from '../assets/User-images/Pradip Sarkar.jpeg'

export default function ArtworkEntranceHero({ onComplete, onSkip, isInline = false }) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.15 })
  // When inline at the bottom of the product page, remain revealed automatically (100% loaded, phase 2)
  const [progress, setProgress] = useState(isInline ? 100 : 0)
  const [phase, setPhase] = useState(isInline ? 2 : 0) // 0: Orbit & Bobbing, 1: Convergence, 2: Centerpiece & Revealed Constellation
  const [isPlaying, setIsPlaying] = useState(!isInline)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // 12 Authentic floating artwork satellite layers with continuous up-and-down oscillation
  const floatingArtworkCards = [
    // Top-Left Orbit
    { 
      id: 1, 
      title: 'Living Room Scale', 
      tag: 'In-Room Scale', 
      img: wallImage1, 
      desk: { x: -420, y: -190, rotate: -12, scale: 0.75 }, 
      mob: { x: -125, y: -210, rotate: -8, scale: 0.45 },
      floatRange: [-18, 18],
      floatDuration: 3.2,
      delay: 0
    },
    // Top-Right Orbit
    { 
      id: 2, 
      title: 'Lady & Butterflies', 
      tag: 'Symbolic Motif', 
      img: flowersImage, 
      desk: { x: 420, y: -190, rotate: 14, scale: 0.75 }, 
      mob: { x: 125, y: -210, rotate: 8, scale: 0.45 },
      floatRange: [16, -16],
      floatDuration: 3.6,
      delay: 0.2
    },
    // Mid-Left Orbit
    { 
      id: 3, 
      title: 'Gallery Wall Setting', 
      tag: 'Curatorial View', 
      img: wallImage2, 
      desk: { x: -480, y: 30, rotate: 8, scale: 0.7 }, 
      mob: { x: -140, y: 0, rotate: 6, scale: 0.42 },
      floatRange: [-14, 14],
      floatDuration: 2.8,
      delay: 0.4
    },
    // Mid-Right Orbit
    { 
      id: 4, 
      title: 'Modern Interior', 
      tag: 'Collector Space', 
      img: wallImage3, 
      desk: { x: 480, y: 30, rotate: -8, scale: 0.7 }, 
      mob: { x: 140, y: 0, rotate: -6, scale: 0.42 },
      floatRange: [15, -15],
      floatDuration: 3.4,
      delay: 0.1
    },
    // Bottom-Left Orbit
    { 
      id: 5, 
      title: 'Exhibition Hall', 
      tag: 'Perspective', 
      img: image4, 
      desk: { x: -390, y: 220, rotate: -6, scale: 0.65 }, 
      mob: { x: -120, y: 220, rotate: -5, scale: 0.42 },
      floatRange: [-16, 16],
      floatDuration: 4.0,
      delay: 0.5
    },
    // Bottom-Right Orbit
    { 
      id: 6, 
      title: 'Framed Presentation', 
      tag: 'Archival Mount', 
      img: testImage, 
      desk: { x: 390, y: 220, rotate: 7, scale: 0.65 }, 
      mob: { x: 120, y: 220, rotate: 5, scale: 0.42 },
      floatRange: [18, -18],
      floatDuration: 3.1,
      delay: 0.3
    },
    // Top-Center Orbit
    { 
      id: 7, 
      title: 'Geometric Abstraction', 
      tag: 'Technique', 
      img: image9, 
      desk: { x: -150, y: -290, rotate: -5, scale: 0.6 }, 
      mob: { x: -55, y: -270, rotate: -4, scale: 0.38 },
      floatRange: [-12, 12],
      floatDuration: 2.9,
      delay: 0.6
    },
    // Top-Center Right Orbit
    { 
      id: 8, 
      title: 'Museum Setting', 
      tag: 'Vault Edition', 
      img: hansImage, 
      desk: { x: 150, y: -290, rotate: 5, scale: 0.6 }, 
      mob: { x: 55, y: -270, rotate: 4, scale: 0.38 },
      floatRange: [14, -14],
      floatDuration: 3.5,
      delay: 0.4
    },
    // Deep Background Left
    { 
      id: 9, 
      title: 'Impasto Texture', 
      tag: 'Palette Work', 
      img: diff1, 
      desk: { x: -280, y: -100, rotate: -15, scale: 0.55 }, 
      mob: { x: -85, y: -90, rotate: -10, scale: 0.35 },
      floatRange: [-20, 20],
      floatDuration: 4.2,
      delay: 0.7
    },
    // Deep Background Right
    { 
      id: 10, 
      title: 'Atmospheric Balance', 
      tag: 'Chromatic Harmony', 
      img: sky1, 
      desk: { x: 280, y: -100, rotate: 15, scale: 0.55 }, 
      mob: { x: 85, y: -90, rotate: 10, scale: 0.35 },
      floatRange: [20, -20],
      floatDuration: 3.8,
      delay: 0.8
    },
    // Artist Signature & Heritage
    { 
      id: 11, 
      title: 'Pradip Sarkar Studio', 
      tag: 'Master Artist', 
      img: pradipPortrait, 
      desk: { x: -170, y: 280, rotate: 6, scale: 0.58 }, 
      mob: { x: -60, y: 265, rotate: 4, scale: 0.36 },
      floatRange: [-15, 15],
      floatDuration: 3.3,
      delay: 0.5
    },
    // Nature & Rhythm
    { 
      id: 12, 
      title: 'Vedic Rhythm & Song', 
      tag: 'Inspiration', 
      img: birdsImage, 
      desk: { x: 170, y: 280, rotate: -6, scale: 0.58 }, 
      mob: { x: 60, y: 265, rotate: -4, scale: 0.36 },
      floatRange: [15, -15],
      floatDuration: 3.7,
      delay: 0.3
    },
  ]

  // Restart / Replay function
  const handleReplay = () => {
    setProgress(0)
    setPhase(0)
    setIsPlaying(true)
  }

  // Progress timer for cinematic reveal sequence
  useEffect(() => {
    if (!isPlaying) return

    const duration = 6500 // 6.5s complete cinematic sequence
    const interval = 25
    const step = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          clearInterval(timer)
          setIsPlaying(false)
          if (!isInline) {
            setTimeout(() => {
              onComplete?.()
            }, 750)
          }
          return 100
        }
        
        // 0-72% floating & bobbing, 72-92% convergence, 92-100% reveal
        if (next < 72) setPhase(0)
        else if (next < 92) setPhase(1)
        else setPhase(2)

        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, isInline, onComplete])

  // Mouse parallax interaction
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x: x * 25, y: y * 25 })
  }

  // Ticker text based on progress
  const getStatusText = () => {
    if (progress < 25) return 'INITIALIZING CURATORIAL VAULT...'
    if (progress < 50) return 'ASSEMBLING IN-ROOM ANGLES & ARCHIVAL RENDERS...'
    if (progress < 72) return 'AUTHENTICATING SIGNATURE • PRADIP SARKAR STUDIO...'
    if (progress < 92) return 'SYNCHRONIZING 3D LIGHTING & COLOR HARMONY...'
    if (progress >= 100) return 'ALL 12 SATELLITE EDITIONS REVEALED • ARCHIVAL VAULT COMPLETE'
    return 'UNVEILING DIVINE TUNES-11...'
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
      className={
        isInline
          ? "relative w-full min-h-[580px] sm:min-h-[720px] bg-gradient-to-b from-[#0a0a0f] via-[#0d0d17] to-[#07070b] border border-[#dfb76c]/40 rounded-2xl sm:rounded-3xl shadow-[0_24px_75px_rgba(0,0,0,0.95)] text-neutral-100 flex flex-col justify-between items-center select-none overflow-hidden p-3 xs:p-4 sm:p-6 md:p-8 ring-1 ring-[#dfb76c]/20"
          : "fixed inset-0 z-[100] bg-[#060609] text-neutral-100 flex flex-col justify-between items-center select-none overflow-hidden"
      }
    >
      {/* Dynamic Golden Cosmos & Nebula Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(223,183,108,0.25),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(197,160,89,0.15),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(247,215,148,0.12),transparent_45%)] pointer-events-none" />

      {/* Floating Sparkles & Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#f7d794]"
            style={{
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              top: `${(i * 13) % 94}%`,
              left: `${(i * 19) % 94}%`,
              opacity: 0.3 + (i % 5) * 0.12
            }}
            animate={{
              y: [-16, 16, -16],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2.5 + (i % 4) * 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* ── TOP BAR: CURATORIAL BADGE & REPLAY REVEAL BUTTON ── */}
      <div className="w-full max-w-6xl mx-auto px-1 xs:px-2 sm:px-6 pt-1 xs:pt-2 sm:pt-4 flex flex-row items-center justify-between gap-2 z-30">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-1.5 xs:gap-2 shrink min-w-0"
        >
          <div className="w-2 h-2 rounded-full bg-[#dfb76c] animate-pulse shrink-0" />
          <span className="font-sans text-[9px] xs:text-[10.5px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] text-[#dfb76c] font-semibold truncate">
            Zigguratss Private Vault
          </span>
        </motion.div>

        {isInline ? (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 shrink-0"
          >
            <button
              onClick={handleReplay}
              className="px-2.5 xs:px-3.5 sm:px-5 py-1 xs:py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#dfb76c] via-[#f7d794] to-[#dfb76c] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-wide font-bold transition-all flex items-center gap-1 sm:gap-1.5 shadow-md hover:shadow-[0_4px_20px_rgba(223,183,108,0.4)] cursor-pointer whitespace-nowrap shrink-0"
              title="Replay 3D Masterpiece Reveal Sequence"
            >
              <RotateCcw size={11} className="text-neutral-950 stroke-[2.5]" />
              <span>Replay Reveal</span>
            </button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={onSkip || onComplete}
            className="px-2.5 xs:px-3.5 sm:px-5 py-1 xs:py-1.5 sm:py-2 rounded-full bg-neutral-900/90 hover:bg-[#dfb76c] text-neutral-300 hover:text-neutral-950 border border-neutral-700 hover:border-[#dfb76c] text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-wide font-bold transition-all flex items-center gap-1 sm:gap-1.5 shadow-lg cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Enter Gallery</span>
            <ArrowRight size={11} />
          </motion.button>
        )}
      </div>

      {/* ── CENTER STAGE: 3D FLOATING CARDS & MASTER ARTWORK REVEAL ── */}
      <div 
        className="relative flex-1 w-full flex items-center justify-center py-2 sm:py-4 overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* 12 Orbiting & Up/Down Floating Satellite Artworks (CravBurgers style layer float) */}
        {floatingArtworkCards.map((card, idx) => {
          const isFanOut = phase === 0
          const isConverging = phase === 1
          const isCenterpieceMode = phase === 2

          // Base coordinates
          let targetX = card.desk.x + mousePos.x * 0.4
          let targetY = card.desk.y + mousePos.y * 0.4
          let targetScale = card.desk.scale
          let targetRotate = card.desk.rotate
          let targetOpacity = 0.88

          if (isConverging) {
            targetX = card.desk.x * 0.32
            targetY = card.desk.y * 0.32
            targetScale = card.desk.scale * 0.8
            targetRotate = card.desk.rotate * 0.3
            targetOpacity = 0.5
          } else if (isCenterpieceMode) {
            // Keep all satellite cards permanently revealed and orbiting the centerpiece
            targetX = card.desk.x * 0.95 + mousePos.x * 0.35
            targetY = card.desk.y * 0.95 + mousePos.y * 0.35
            targetScale = card.desk.scale * 0.92
            targetRotate = card.desk.rotate * 0.85
            targetOpacity = 0.88
          }

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
              animate={{
                opacity: targetOpacity,
                scale: targetScale,
                x: targetX,
                y: targetY,
                rotateZ: targetRotate,
                rotateX: -mousePos.y * 0.3,
                rotateY: mousePos.x * 0.3,
              }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.04
              }}
              className="absolute hidden md:flex flex-col w-40 lg:w-48 rounded-2xl overflow-hidden bg-[#13131c] border border-neutral-700/80 hover:border-[#dfb76c] shadow-[0_18px_45px_rgba(0,0,0,0.85)] pointer-events-auto z-10 transition-colors cursor-pointer group"
            >
              {/* Internal Organic Up-and-Down Floating Bob */}
              <motion.div
                animate={{
                  y: card.floatRange
                }}
                transition={{
                  duration: card.floatDuration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: card.delay
                }}
                className="w-full"
              >
                <div className="h-24 lg:h-30 w-full overflow-hidden bg-black relative">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[#dfb76c] text-[8px] font-mono uppercase tracking-wider border border-neutral-700">
                    {card.tag}
                  </div>
                </div>
                <div className="p-2 bg-[#0e0e16] border-t border-neutral-800">
                  <h6 className="font-serif text-[10px] text-white truncate group-hover:text-[#dfb76c] transition-colors">{card.title}</h6>
                  <span className="text-[8px] text-neutral-400">Authentic Angle</span>
                </div>
              </motion.div>
            </motion.div>
          )
        })}

        {/* ── MASTER CENTERPIECE ARTWORK ("DIVINE TUNES-11") ── */}
        <motion.div
          animate={{
            scale: phase === 2 ? 1.05 : 0.96,
            rotateX: -mousePos.y * 0.35,
            rotateY: mousePos.x * 0.35,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 flex flex-col items-center justify-center max-w-[92vw] sm:max-w-[420px] md:max-w-[460px]"
        >
          {/* Beveled Museum Lighting Aura */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-tr from-[#dfb76c]/30 via-[#f7d794]/20 to-transparent blur-2xl opacity-70 animate-pulse pointer-events-none" />

          {/* Master Framed Canvas */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#181824] via-[#12121a] to-[#0c0c12] border-2 border-[#dfb76c]/70 shadow-[0_24px_70px_rgba(0,0,0,0.9)] p-3.5 sm:p-5"
          >
            {/* Top Curatorial Badge */}
            <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
              <span className="text-[9px] sm:text-xs uppercase tracking-widest font-bold bg-[#dfb76c]/20 text-[#f7d794] border border-[#dfb76c]/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles size={11} /> Masterpiece Reveal
              </span>
              <span className="text-[9px] sm:text-xs font-mono text-neutral-400">
                1 of 1 Archival
              </span>
            </div>

            {/* Master Painting Canvas */}
            <div className="w-44 xs:w-56 sm:w-72 md:w-80 h-44 xs:h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden bg-black relative flex items-center justify-center border border-neutral-700 shadow-2xl">
              {/* Subtle Floating Pulse on Main Artwork */}
              <motion.img
                src={screenshotImage}
                alt="Divine Tunes-11 by Pradip Sarkar"
                className="w-full h-full object-contain filter drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)]"
                animate={{
                  scale: phase === 2 ? [1, 1.03, 1] : [1, 1.015, 1],
                  y: [-3, 3, -3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Hologram Stamp */}
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 border border-[#dfb76c]/40 text-[#dfb76c] text-[8px] sm:text-[9px] font-mono flex items-center gap-1">
                <CheckCircle2 size={10} />
                <span>SIGNED BY ARTIST</span>
              </div>
            </div>

            {/* Title & Artist Signature */}
            <div className="mt-2.5 sm:mt-3 text-center">
              <h2 className="font-serif text-sm sm:text-xl font-normal text-white tracking-tight">
                Divine Tunes-11
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-neutral-400 font-light mt-0.5">
                <span>By</span>
                <span className="text-[#dfb76c] font-medium">Pradip Sarkar</span>
                <span className="text-neutral-600">•</span>
                <span>Acrylic on Canvas (32" × 30")</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── MOBILE RESPONSIVE COMPANION ARTWORKS (REVEALED DIRECTLY WITHOUT CLICKING) ── */}
      <div className="w-full md:hidden z-30 pt-2 pb-1 px-1">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-[9px] xs:text-[10px] uppercase tracking-wider text-[#dfb76c] font-semibold flex items-center gap-1.5">
            <Layers size={11} /> Revealed Satellite Archival Cards ({floatingArtworkCards.length})
          </span>
          <span className="text-[8px] text-neutral-400 font-mono">Swipe horizontally</span>
        </div>
        <div 
          className="flex flex-row items-center gap-2 overflow-x-auto pb-1.5 px-0.5 snap-x snap-mandatory flex-nowrap w-full"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {floatingArtworkCards.map((card) => (
            <div
              key={`mob-card-${card.id}`}
              className="shrink-0 flex-shrink-0 w-28 xs:w-32 rounded-xl overflow-hidden bg-[#13131c] border border-neutral-700/80 shadow-md snap-center"
            >
              <div className="h-18 xs:h-20 w-full overflow-hidden bg-black relative">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover pointer-events-none" />
                <div className="absolute top-1 left-1 px-1 py-0.5 rounded bg-black/80 text-[#dfb76c] text-[6.5px] xs:text-[7px] font-mono uppercase tracking-wider border border-neutral-700">
                  {card.tag}
                </div>
              </div>
              <div className="p-1 xs:p-1.5 bg-[#0e0e16] border-t border-neutral-800">
                <h6 className="font-serif text-[9px] text-white truncate">{card.title}</h6>
                <span className="text-[7px] text-neutral-400">Archival View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM TRAY: LIVE TELEMETRY & PROGRESS BAR ── */}
      <div className="w-full max-w-3xl mx-auto px-1 xs:px-2 sm:px-8 pb-2 sm:pb-6 z-30 space-y-1.5 sm:space-y-2 mt-2 sm:mt-0">
        {/* Ticker Status */}
        <div className="flex flex-row items-center justify-between gap-1 text-xs">
          <div className="flex items-center gap-1.5 xs:gap-2 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-pulse shrink-0" />
            <span className="font-mono text-[8px] xs:text-[9.5px] sm:text-xs text-[#dfb76c] font-semibold tracking-wider truncate">
              {getStatusText()}
            </span>
          </div>
          <span className="font-mono text-[8px] xs:text-[9.5px] sm:text-xs text-neutral-400 shrink-0">
            {Math.round(progress)}% LOADED
          </span>
        </div>

        {/* Golden Reading Progress Line */}
        <div className="w-full h-1 xs:h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#c9a96e] via-[#f7d794] to-[#c9a96e]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Quick Entrance Cue / Inline Status Cue */}
        <div className="flex items-center justify-center pt-0.5">
          {isInline ? (
            <span className="text-[8px] xs:text-[9.5px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-neutral-400 font-mono text-center px-1 leading-tight">
              {progress >= 100 
                ? "Revealed Masterpiece & 12 Archival Perspectives • Divine Tunes-11" 
                : "Interactive 3D Convergence in progress • Move cursor or tilt"}
            </span>
          ) : (
            <button
              onClick={onSkip || onComplete}
              className="text-[9px] sm:text-xs uppercase tracking-widest text-neutral-400 hover:text-[#dfb76c] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Click anywhere or wait to enter master gallery</span>
              <ArrowRight size={10} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
