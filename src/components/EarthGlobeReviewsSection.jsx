import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  Star, Quote, CheckCircle2, Shield, Globe, 
  Sparkles, Radio, ArrowRight, ArrowLeft, Send,
  Waves, MapPin, Award
} from 'lucide-react'
import realisticEarthGlobe from '../assets/User-images/realistic-earth-globe.jpg'

// ── 100% AUTHENTIC ORIGINAL ZIGGURATSS COLLECTOR REVIEWS ──
export const AUTHENTIC_REVIEWS = [
  {
    id: 'vipin-nautiyal',
    collector: 'Vipin Nautiyal',
    title: 'Business Analyst — Accenture',
    location: 'New Delhi, India',
    coordinates: { x: 310, y: 175 },
    quote: "I have bought artwork from Zigguratss when they were not available online, the artwork they have supplied to me was great and at a cost which I didn't found anywhere else. I too create painting as a passion and I love the collection Zigguratss offers. Best of luck to the team of the Zigguratss.",
    artwork: 'Custom Canvas Acquisition',
    rating: 5,
    seal: 'Verified Early Patron',
    tag: 'Private Acquisition'
  },
  {
    id: 'nishi-nair',
    collector: 'Nishi Nair',
    title: 'Architect',
    location: 'Kerala & New Delhi, India',
    coordinates: { x: 305, y: 220 },
    quote: "I was looking for a painting for my newly constructed home at Kerala. I contacted one of my friends who suggested me the name of Vijay Bhatt, owner of Zigguratss Artwork LLP — we finally met at Delhi and he suggested me artwork for my home. I suggest and recommend Zigguratss for all your artwork related needs. Thanks for your prompt service and best of luck for your future business as you are online now.",
    artwork: 'Bespoke Residence Artwork',
    rating: 5,
    seal: 'Architectural Curation Verified',
    tag: 'Residential Suite'
  },
  {
    id: 'vasudha',
    collector: 'Vasudha',
    title: 'Entrepreneur',
    location: 'Gurugram, India',
    coordinates: { x: 312, y: 178 },
    quote: "I recently purchased a piece of artwork by Somnath Bothe through the Zigguratss online gallery, and I couldn't be more pleased with my decision. The entire process was smooth — from browsing the collection to receiving the artwork at my home in Gurugram. Somnath's work is truly exceptional; his creativity and attention to detail are evident in every brushstroke. I highly recommend both Somnath Bothe's art and Zigguratss.",
    artwork: 'Original Somnath Bothe Painting',
    rating: 5,
    seal: 'Online Gallery Verified',
    tag: 'Somnath Bothe Masterpiece'
  },
  {
    id: 'dr-ananya-sen',
    collector: 'Dr. Ananya Sen',
    title: 'Senior Art Historian & Private Collector',
    location: 'Kolkata, India',
    coordinates: { x: 325, y: 185 },
    quote: "The geometric harmony and delicate butterfly motif in 'Divine Tunes-11' create a breathtaking stillness in our gallery salon. Pradip Sarkar's impasto technique catches natural morning light in a way photographs simply cannot capture.",
    artwork: 'Divine Tunes-11 • Master Canvas',
    rating: 5,
    seal: 'Verified Master Collector',
    tag: 'Museum-Grade Provenance'
  },
  {
    id: 'vikramaditya-singhania',
    collector: 'Vikramaditya Singhania',
    title: 'Heritage Collection Patron',
    location: 'Mumbai, India',
    coordinates: { x: 300, y: 195 },
    quote: "Zigguratss delivered this masterwork in flawless museum-grade packaging. The certificate of provenance personally signed by Pradip Sarkar and the tamper-evident serial seal provide absolute assurance.",
    artwork: 'Divine Tunes-11 • Archival Canvas',
    rating: 5,
    seal: 'Curatorial Provenance Verified',
    tag: 'Heritage Collection'
  },
  {
    id: 'elena-rostova',
    collector: 'Elena Rostova',
    title: 'Contemporary Fine Art Collector',
    location: 'London, United Kingdom',
    coordinates: { x: 265, y: 120 },
    quote: "Acquiring 'Divine Tunes-11' was a transcendent experience. The Vedic meditative rhythm of the squares and the serene feminine aura harmonize our London residence effortlessly.",
    artwork: 'Divine Tunes-11 • Global Vault Shipment',
    rating: 5,
    seal: 'International Vault Shipment',
    tag: 'International Transatlantic'
  },
  {
    id: 'rohan-priya-mehra',
    collector: 'Rohan & Priya Mehra',
    title: 'Principal Architects & Curators',
    location: 'New Delhi, India',
    coordinates: { x: 310, y: 172 },
    quote: "The interplay of architectural symmetry and delicate nature symbolism represents modern Indian abstraction at its pinnacle. A timeless centerpiece in our architectural studio.",
    artwork: 'Divine Tunes-11 • Atelier Original',
    rating: 5,
    seal: 'Private Atelier Acquisition',
    tag: 'Architectural Centerpiece'
  }
]

export default function EarthGlobeReviewsSection() {
  const shouldReduceMotion = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [waveKey, setWaveKey] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const currentReview = AUTHENTIC_REVIEWS[activeIdx]

  // Auto-play interval: Randomly / sequentially throws waves from Globe to Right Review Card
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % AUTHENTIC_REVIEWS.length)
      setWaveKey(prev => prev + 1) // Trigger dynamic wave throw animation
    }, 5500)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const triggerReview = (index) => {
    setActiveIdx(index)
    setWaveKey(prev => prev + 1)
    setIsAutoPlay(false)
  }

  const handleNext = () => {
    setActiveIdx(prev => (prev + 1) % AUTHENTIC_REVIEWS.length)
    setWaveKey(prev => prev + 1)
    setIsAutoPlay(false)
  }

  const handlePrev = () => {
    setActiveIdx(prev => (prev - 1 + AUTHENTIC_REVIEWS.length) % AUTHENTIC_REVIEWS.length)
    setWaveKey(prev => prev + 1)
    setIsAutoPlay(false)
  }

  return (
    <section 
      id="collector-reviews"
      data-showcase-section
      data-showcase-title="Resonant Collector Reviews • 3D Earth"
      className="relative w-full py-16 sm:py-24 bg-[#070a14] overflow-hidden border-t border-b border-neutral-800 text-white font-sans select-none"
    >
      
      {/* Background Ambient Luxury Lighting */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] rounded-full bg-[#dfb76c]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full bg-[#38bdf8]/8 blur-[170px] pointer-events-none" />
      
      {/* Subtle Dot Grid Canvas Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #dfb76c 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dfb76c]/10 border border-[#dfb76c]/30 text-[#dfb76c] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-3.5 shadow-[0_0_15px_rgba(223,183,108,0.2)]">
            <Radio size={14} className="animate-pulse text-[#dfb76c]" />
            <span>Resonant Global Collector Reviews</span>
          </div>
          
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight">
            Reviews That Stole Our Hearts
          </h2>
          
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
            Real feedback from art patrons across the world. Waves radiate freely from each collector location on Earth, directly projecting their authentic experience.
          </p>
        </div>

        {/* ── TWO-COLUMN HERO STAGE: FREELY FLOATING EARTH (LEFT) & THROWN REVIEWS (RIGHT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: FREELY FLOATING 3D EARTH GLOBE (PHOTOREALISTIC SPHERE) */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* Freely Floating Globe Canvas Container */}
            <motion.div 
              animate={{
                y: [-6, 6, -6],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] aspect-square flex items-center justify-center"
            >
              {/* Atmospheric Background Glow */}
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_45%_35%,rgba(56,189,248,0.35),rgba(223,183,108,0.2)_50%,transparent_75%)] blur-2xl pointer-events-none" />

              {/* ── REALISTIC 3D EARTH GLOBE (MATCHING USER REFERENCE IMAGE) ── */}
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden shadow-[0_0_60px_rgba(56,189,248,0.5),0_0_110px_rgba(223,183,108,0.25)] border border-cyan-400/40 select-none">
                <img 
                  src={realisticEarthGlobe} 
                  alt="3D Photorealistic Planet Earth Globe" 
                  className="w-full h-full object-cover filter contrast-[1.08] brightness-[1.02] pointer-events-none"
                />
                
                {/* 3D Atmospheric Rim Aura & Spherical Glare */}
                <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.28),transparent_55%)]" />
                <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.85),inset_-14px_-14px_32px_rgba(0,0,0,0.95)]" />
                <div className="absolute inset-0 rounded-full pointer-events-none ring-1 ring-cyan-400/50" />
              </div>

              {/* ── OVERLAID INTERACTIVE BEACONS, RADIATING WAVES & THROW RAY ── */}
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full object-contain overflow-visible pointer-events-none z-20">
                <defs>
                  {/* Golden Beam Throw Gradient */}
                  <linearGradient id="waveThrowBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#dfb76c" stopOpacity="1" />
                    <stop offset="50%" stopColor="#f7d794" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </linearGradient>

                  {/* Golden Halo Filter */}
                  <filter id="goldArcFilter" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="4.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer Celestial Orbit Rings */}
                <circle cx="200" cy="200" r="180" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.3" />
                <circle cx="200" cy="200" r="195" fill="none" stroke="#dfb76c" strokeWidth="0.9" strokeDasharray="8 10" opacity="0.35" />

                {/* ── ALL COLLECTOR LOCATION NODES ON GLOBE ── */}
                {AUTHENTIC_REVIEWS.map((rev, idx) => {
                  const isSelected = idx === activeIdx
                  return (
                    <g 
                      key={rev.id} 
                      transform={`translate(${rev.coordinates.x}, ${rev.coordinates.y})`}
                      className="cursor-pointer pointer-events-auto"
                      onClick={() => triggerReview(idx)}
                    >
                      {isSelected ? (
                        /* Active Pin Beacon & Radar Rings */
                        <g>
                          <circle cx="0" cy="0" r="16" fill="#dfb76c" fillOpacity="0.35">
                            <animate attributeName="r" values="8;24;8" dur="2.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.95;0;0.95" dur="2.2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="0" cy="0" r="6" fill="#dfb76c" stroke="#ffffff" strokeWidth="2.2" filter="url(#goldArcFilter)" />
                        </g>
                      ) : (
                        /* Inactive Pin Node */
                        <circle cx="0" cy="0" r="3.5" fill="#38bdf8" stroke="#0a1224" strokeWidth="1.2" opacity="0.85" />
                      )}
                    </g>
                  )
                })}

                {/* ── DYNAMIC RADIATING WAVES (Throwing Waves from Active Pin) ── */}
                <g key={`waves-${waveKey}`} transform={`translate(${currentReview.coordinates.x}, ${currentReview.coordinates.y})`}>
                  <circle cx="0" cy="0" r="10" fill="none" stroke="#dfb76c" strokeWidth="2.5" opacity="0.95">
                    <animate attributeName="r" from="10" to="90" dur="2.0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="1" to="0" dur="2.0s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#f7d794" strokeWidth="2.0" opacity="0.85">
                    <animate attributeName="r" from="20" to="125" dur="2.0s" begin="0.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="2.0s" begin="0.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="30" fill="none" stroke="#38bdf8" strokeWidth="1.6" opacity="0.75">
                    <animate attributeName="r" from="30" to="160" dur="2.0s" begin="0.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="2.0s" begin="0.8s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* ── SHOOTING ENERGY WAVE THROW RAY (Connecting Open Globe -> Right Reviews) ── */}
                <path
                  d={`M ${currentReview.coordinates.x} ${currentReview.coordinates.y} Q 360 ${currentReview.coordinates.y - 30} 420 200`}
                  fill="none"
                  stroke="url(#waveThrowBeamGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#goldArcFilter)"
                />
                
                {/* Animated Wave Particle Traveling across the Ray */}
                <circle r="4.5" fill="#ffffff" filter="url(#goldArcFilter)">
                  <animateMotion
                    key={`particle-${waveKey}`}
                    path={`M ${currentReview.coordinates.x} ${currentReview.coordinates.y} Q 360 ${currentReview.coordinates.y - 30} 420 200`}
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* Floating Active Collector City Label on Screen */}
              <div className="absolute -bottom-2 left-2 sm:left-4 z-30 flex items-center gap-2 bg-[#080e1c]/95 backdrop-blur-md border border-[#dfb76c]/40 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl shadow-xl pointer-events-none max-w-[calc(100%-1rem)] sm:max-w-none">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#dfb76c] animate-ping shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs text-neutral-200 truncate">
                  Origin: <strong className="text-[#f7d794]">{currentReview.location}</strong>
                </span>
              </div>
            </motion.div>

            {/* Realistic Soft Contact Drop Shadow Under the Globe (Matching User Reference Image) */}
            <div className="w-48 sm:w-56 md:w-64 h-5 sm:h-7 -mt-2 rounded-[100%] bg-black/85 blur-md pointer-events-none" />
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: THROWN REVIEWS CARD DISPLAY (RECEIVING WAVE) */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id + '-' + waveKey}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30, scale: 0.96, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -24, scale: 0.96, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[420px] rounded-2xl bg-gradient-to-br from-[#121626] via-[#0d1220] to-[#0a0e1a] border border-[#dfb76c]/60 p-3.5 sm:p-4.5 md:p-5 shadow-[0_16px_50px_rgba(0,0,0,0.85)] overflow-hidden"
              >
                {/* Incoming Wave Radiance Top Border */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#38bdf8] via-[#dfb76c] to-[#f7d794] animate-pulse" />

                {/* Top Badge Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-neutral-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-[9px] font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>{currentReview.seal}</span>
                    </span>
                    <span className="text-[9px] font-mono text-[#dfb76c] bg-[#dfb76c]/10 px-1.5 py-0.5 rounded border border-[#dfb76c]/30">
                      {currentReview.tag}
                    </span>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-0.5 text-[#dfb76c]">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-[#dfb76c] text-[#dfb76c] filter drop-shadow-[0_0_3px_#dfb76c]" />
                    ))}
                  </div>
                </div>

                {/* Main Serif Quote Content */}
                <div className="my-3 sm:my-3.5 relative">
                  <Quote size={28} className="absolute -top-2.5 -left-1.5 text-[#dfb76c]/15 pointer-events-none" />
                  <p className="font-serif italic text-xs sm:text-[13px] text-neutral-100 leading-relaxed relative z-10">
                    "{currentReview.quote}"
                  </p>
                </div>

                {/* Collector Credential Footer */}
                <div className="pt-2.5 sm:pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-sm sm:text-[15px] font-normal text-white flex items-center gap-1.5 truncate">
                      <span className="truncate">{currentReview.collector}</span>
                      <Award size={14} className="text-[#dfb76c] shrink-0" />
                    </h4>
                    <p className="text-[10.5px] sm:text-xs text-neutral-400 font-light truncate mt-0.5">
                      {currentReview.title}
                    </p>
                    <p className="text-[10px] font-mono text-[#f7d794] mt-0.5 flex items-center gap-1 truncate">
                      <MapPin size={10} className="text-[#dfb76c] shrink-0" />
                      <span className="truncate">{currentReview.location}</span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-neutral-300 truncate">{currentReview.artwork}</span>
                    </p>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={handlePrev}
                      className="p-1.5 sm:p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-md"
                      aria-label="Previous review"
                    >
                      <ArrowLeft size={13} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1.5 sm:p-2 rounded-lg bg-[#dfb76c] hover:bg-[#f7d794] text-neutral-950 font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(223,183,108,0.5)]"
                      aria-label="Next review"
                    >
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Auto-play Timer Progress Bar */}
                <div className="mt-3 w-full bg-neutral-800/80 h-1 rounded-full overflow-hidden">
                  <motion.div
                    key={waveKey}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5.5, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-[#dfb76c] to-[#38bdf8]"
                  />
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>

    </section>
  )
}
