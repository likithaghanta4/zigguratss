import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

// Import all 7 photorealistic live-action cinematic film plates (pristine hands & Divine Tunes-11 framing)
import scene01 from '../assets/delivery/scene-01-arrival.webp'
import scene02 from '../assets/delivery/scene-02-debark.webp'
import scene03 from '../assets/delivery/scene-03-walk.webp'
import scene04 from '../assets/delivery/scene-04-doorbell.webp'
import scene05 from '../assets/delivery/scene-05-dooropen.webp'
import scene06 from '../assets/delivery/scene-06-handover.webp'
import scene07 from '../assets/delivery/scene-07-finale.webp'

const STEPS = [
  {
    id: 1,
    src: scene01,
    motion: {
      initial: { scale: 1.0, x: '0%', y: '0%' },
      animate: { scale: 1.05, x: '-1.2%', y: '-0.6%' }
    }
  },
  {
    id: 2,
    src: scene02,
    motion: {
      initial: { scale: 1.01, x: '-0.8%', y: '0%' },
      animate: { scale: 1.06, x: '1.0%', y: '-0.5%' }
    }
  },
  {
    id: 3,
    src: scene03,
    motion: {
      initial: { scale: 1.0, x: '1.2%', y: '0%' },
      animate: { scale: 1.05, x: '-1.2%', y: '0%' }
    }
  },
  {
    id: 4, // Step 4: Doorbell interaction at the entrance
    src: scene04,
    motion: {
      initial: { scale: 1.0, x: '0%', y: '0%' },
      animate: { scale: 1.055, x: '-0.8%', y: '-0.4%' }
    }
  },
  {
    id: 5,
    src: scene05,
    motion: {
      initial: { scale: 1.03, x: '0.4%', y: '0%' },
      animate: { scale: 1.0, x: '-0.6%', y: '0%' }
    }
  },
  {
    id: 6,
    src: scene06,
    motion: {
      initial: { scale: 1.0, x: '-0.4%', y: '0%' },
      animate: { scale: 1.05, x: '0.6%', y: '-0.4%' }
    }
  },
  {
    id: 7,
    src: scene07,
    motion: {
      initial: { scale: 1.04, x: '0%', y: '-0.4%' },
      animate: { scale: 1.0, x: '0%', y: '0.4%' }
    }
  }
]

const STEP_DURATION = 3200 // 3.2 seconds per step

export default function WhiteGloveDoorstepScene({ isReducedMotion = false }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Preload all 7 images on mount for zero-latency transitions
  useEffect(() => {
    STEPS.forEach((step) => {
      const img = new Image()
      img.src = step.src
    })
  }, [])

  // Automatic Step-by-Step Transition Engine
  useEffect(() => {
    if (!isPlaying || isReducedMotion) return

    const timer = setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % STEPS.length)
    }, STEP_DURATION)

    return () => clearTimeout(timer)
  }, [currentIdx, isPlaying, isReducedMotion])

  const activeStep = STEPS[currentIdx]

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a0c10] border border-neutral-800 shadow-2xl flex flex-col justify-between select-none">
      
      {/* ── 1. UNCLUTTERED FULL-SCALE PHOTOREALISTIC HOUSE VIEW ── */}
      <div className="relative w-full aspect-video min-h-[300px] xs:min-h-[340px] sm:min-h-[380px] md:min-h-[440px] overflow-hidden bg-black flex items-center justify-center">
        
        {/* Photorealistic Live-Action Film Layer with Smooth Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <motion.img
              src={activeStep.src}
              alt={`Delivery step ${activeStep.id}`}
              initial={isReducedMotion ? false : activeStep.motion.initial}
              animate={isReducedMotion ? false : activeStep.motion.animate}
              transition={isReducedMotion ? undefined : { duration: STEP_DURATION / 1000, ease: 'linear' }}
              className="w-full h-full object-cover object-center select-none pointer-events-none transform-gpu"
              style={{ filter: 'contrast(1.02) saturate(1.02)' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle Cinematic Vignette (Edge Falloff Only, completely unobstructed center) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_70%,rgba(0,0,0,0.45)_100%)] pointer-events-none z-10" />

      </div>

      {/* ── 2. MINIMAL CLEAN PROGRESS STRIP (NO TEXT CLUTTER) ── */}
      <div className="relative z-20 px-4 py-3 bg-[#0d0f14] border-t border-neutral-800/80 flex items-center justify-between gap-3">
        
        {/* Clean Segmented Progress Pills */}
        <div className="flex-1 grid grid-cols-7 gap-1.5 sm:gap-2 items-center">
          {STEPS.map((step, idx) => {
            const isActive = idx === currentIdx
            const isCompleted = idx < currentIdx

            return (
              <button
                key={step.id}
                onClick={() => setCurrentIdx(idx)}
                className="group h-1.5 sm:h-2 rounded-full overflow-hidden relative bg-neutral-800 transition-all cursor-pointer focus:outline-none"
                title={`Step ${idx + 1}`}
              >
                {/* Active Step Dynamic Fill or Completed Static Fill */}
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#dfb76c] to-[#f5d88f] shadow-[0_0_8px_#dfb76c]'
                      : isCompleted
                      ? 'bg-[#dfb76c]/60'
                      : 'bg-neutral-800 group-hover:bg-neutral-700'
                  }`}
                  style={{
                    width: isActive ? '100%' : isCompleted ? '100%' : '0%'
                  }}
                />
              </button>
            )
          })}
        </div>

        {/* Minimal Subtle Controls (Play/Pause & Reset) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#dfb76c]/50 text-neutral-400 hover:text-[#dfb76c] transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
          </button>

          <button
            onClick={() => {
              setCurrentIdx(0)
              setIsPlaying(true)
            }}
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#dfb76c]/50 text-neutral-400 hover:text-[#dfb76c] transition-colors"
            title="Restart from beginning"
          >
            <RotateCcw size={13} />
          </button>
        </div>

      </div>

    </div>
  )
}
