import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { RefreshCw, CheckCircle2, Truck, ShieldCheck, Sparkles } from 'lucide-react'

const TRUST_PILLARS = [
  {
    id: 'money-back',
    title: '14-Day Money Back',
    desc: 'Hassle-free museum return guarantee',
    icon: RefreshCw,
    tag: '100% Risk Free'
  },
  {
    id: 'authenticity',
    title: 'Certificate of Authenticity',
    desc: 'Signed & numbered by the master artist',
    icon: CheckCircle2,
    tag: 'Verified Provenance'
  },
  {
    id: 'shipping',
    title: 'Free Worldwide Shipping',
    desc: 'Insured and tracked priority air freight',
    icon: Truck,
    tag: 'Safe Air Transit'
  }
]

export default function TrustBar() {
  const shouldReduceMotion = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Sequential cycling of the trust pillar boxes (0 -> 1 -> 2 -> 0)
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TRUST_PILLARS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
    >
      {TRUST_PILLARS.map((pillar, idx) => {
        const IconComp = pillar.icon
        const isActive = activeIdx === idx

        return (
          <motion.div
            key={pillar.id}
            onClick={() => setActiveIdx(idx)}
            animate={{
              scale: isActive ? 1.04 : 1.0,
              y: isActive ? -4 : 0
            }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 24,
              mass: 0.8
            }}
            className={`group relative p-4 sm:p-6 rounded-2xl transition-all duration-400 cursor-pointer flex items-start space-x-4 border overflow-hidden ${
              isActive
                ? 'bg-gradient-to-br from-[#1c1c28] via-[#14141e] to-[#0e0e14] border-[#dfb76c] ring-1 ring-[#dfb76c]/40 shadow-[0_10px_30px_rgba(223,183,108,0.22)]'
                : 'bg-neutral-900/60 hover:bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 opacity-75 hover:opacity-100'
            }`}
          >
            {/* Top gold active highlight accent line */}
            {isActive && (
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent shadow-[0_0_10px_#dfb76c]" />
            )}

            {/* Icon Box */}
            <div 
              className={`p-2.5 sm:p-3 rounded-xl transition-all duration-300 flex-shrink-0 ${
                isActive
                  ? 'bg-[#dfb76c] text-neutral-950 shadow-[0_0_15px_rgba(223,183,108,0.6)] scale-110'
                  : 'bg-neutral-800 text-[#dfb76c]'
              }`}
            >
              <IconComp size={20} className="stroke-[2.2]" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className={`text-sm sm:text-base font-semibold transition-colors truncate ${
                  isActive ? 'text-white' : 'text-neutral-200'
                }`}>
                  {pillar.title}
                </h4>
                {isActive && (
                  <span className="hidden sm:inline-flex text-[9px] uppercase tracking-wider font-bold bg-[#dfb76c]/20 text-[#dfb76c] px-2 py-0.5 rounded-full border border-[#dfb76c]/30 flex-shrink-0">
                    {pillar.tag}
                  </span>
                )}
              </div>
              <p className={`text-xs sm:text-sm font-light transition-colors ${
                isActive ? 'text-neutral-200' : 'text-neutral-400'
              }`}>
                {pillar.desc}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
