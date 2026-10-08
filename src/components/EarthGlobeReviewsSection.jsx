import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  Star, Quote, CheckCircle2, Shield, Globe, 
  Sparkles, Radio, ArrowRight, ArrowLeft, Send,
  Waves, MapPin, Award
} from 'lucide-react'

// ── 100% AUTHENTIC ORIGINAL ZIGGURATSS COLLECTOR REVIEWS ──
export const AUTHENTIC_REVIEWS = [
  {
    id: 'vipin-nautiyal',
    collector: 'Vipin Nautiyal',
    title: 'Business Analyst — Accenture',
    location: 'New Delhi, India',
    coordinates: { x: 280, y: 190 },
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
    coordinates: { x: 275, y: 265 },
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
    coordinates: { x: 278, y: 194 },
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
    coordinates: { x: 310, y: 210 },
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
    coordinates: { x: 260, y: 225 },
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
    coordinates: { x: 195, y: 130 },
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
    coordinates: { x: 280, y: 190 },
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
          {/* LEFT SIDE: FREELY FLOATING 3D EARTH GLOBE (NO SEPARATE BOX) */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* Freely Floating Globe Canvas Container (No Box Frame, Pure Screen Presence) */}
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              
              {/* ── 3D VECTOR EARTH GLOBE WITH RADIATING WAVES ── */}
              <svg viewBox="0 0 460 460" className="w-full h-full object-contain overflow-visible filter drop-shadow-[0_0_35px_rgba(223,183,108,0.25)]">
                <defs>
                  {/* Earth Sphere Radial Depth Gradient (Luxury Gold & Navy) */}
                  <radialGradient id="freeGlobeGrad" cx="45%" cy="38%" r="62%">
                    <stop offset="0%" stopColor="#1e325c" />
                    <stop offset="45%" stopColor="#121f3a" />
                    <stop offset="80%" stopColor="#0a1224" />
                    <stop offset="100%" stopColor="#040812" />
                  </radialGradient>

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

                  <filter id="cyanArcFilter" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ── FREELY FLOATING ATMOSPHERE & ORBIT RINGS ── */}
                <circle cx="230" cy="230" r="195" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.25" />
                <circle cx="230" cy="230" r="215" fill="none" stroke="#dfb76c" strokeWidth="0.9" strokeDasharray="8 10" opacity="0.3" />

                {/* ── MAIN 3D EARTH SPHERE BODY ── */}
                <circle cx="230" cy="230" r="165" fill="url(#freeGlobeGrad)" stroke="#38bdf8" strokeWidth="2.5" filter="drop-shadow(0 0 25px rgba(56,189,248,0.35))" />

                {/* Latitude / Longitude Elliptical Grid Lines */}
                <g stroke="#2a426e" strokeWidth="1" opacity="0.65" fill="none">
                  <ellipse cx="230" cy="230" rx="165" ry="165" />
                  <ellipse cx="230" cy="230" rx="165" ry="110" />
                  <ellipse cx="230" cy="230" rx="165" ry="55" />
                  <line x1="65" y1="230" x2="395" y2="230" stroke="#38bdf8" strokeWidth="1.2" opacity="0.5" />
                  <ellipse cx="230" cy="230" rx="110" ry="165" />
                  <ellipse cx="230" cy="230" rx="55" ry="165" />
                </g>

                {/* Stylized Continents on Earth Sphere */}
                <g fill="#1f3660" stroke="#38bdf8" strokeWidth="1.4" opacity="0.9">
                  {/* Eurasia & India */}
                  <path d="M 260 160 Q 320 150 350 190 Q 340 240 310 270 Q 290 300 275 260 Q 260 210 260 160 Z" />
                  {/* Africa */}
                  <path d="M 200 210 Q 250 210 260 260 Q 240 310 220 320 Q 190 270 200 210 Z" />
                  {/* Americas */}
                  <path d="M 120 150 Q 170 160 160 210 Q 135 260 110 245 Q 100 190 120 150 Z" />
                  {/* South America */}
                  <path d="M 140 260 Q 180 270 175 320 Q 155 360 135 330 Q 130 280 140 260 Z" />
                </g>

                {/* ── ALL COLLECTOR LOCATION NODES ON GLOBE ── */}
                {AUTHENTIC_REVIEWS.map((rev, idx) => {
                  const isSelected = idx === activeIdx
                  return (
                    <g 
                      key={rev.id} 
                      transform={`translate(${rev.coordinates.x}, ${rev.coordinates.y})`}
                      className="cursor-pointer"
                      onClick={() => triggerReview(idx)}
                    >
                      {isSelected ? (
                        /* Active Pin Beacon & Radar Rings */
                        <g>
                          <circle cx="0" cy="0" r="18" fill="#dfb76c" fillOpacity="0.3">
                            <animate attributeName="r" values="8;26;8" dur="2.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.9;0;0.9" dur="2.2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="0" cy="0" r="7" fill="#dfb76c" stroke="#ffffff" strokeWidth="2.5" filter="url(#goldArcFilter)" />
                        </g>
                      ) : (
                        /* Inactive Pin Node */
                        <circle cx="0" cy="0" r="4" fill="#38bdf8" stroke="#0a1224" strokeWidth="1.2" opacity="0.8" />
                      )}
                    </g>
                  )
                })}

                {/* ── DYNAMIC RADIATING WAVES (Throwing Waves from Active Pin) ── */}
                <g key={`waves-${waveKey}`} transform={`translate(${currentReview.coordinates.x}, ${currentReview.coordinates.y})`}>
                  <circle cx="0" cy="0" r="12" fill="none" stroke="#dfb76c" strokeWidth="2.8" opacity="0.95">
                    <animate attributeName="r" from="12" to="100" dur="2.0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="1" to="0" dur="2.0s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="24" fill="none" stroke="#f7d794" strokeWidth="2.2" opacity="0.85">
                    <animate attributeName="r" from="24" to="140" dur="2.0s" begin="0.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="2.0s" begin="0.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="36" fill="none" stroke="#38bdf8" strokeWidth="1.8" opacity="0.75">
                    <animate attributeName="r" from="36" to="180" dur="2.0s" begin="0.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="2.0s" begin="0.8s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* ── SHOOTING ENERGY WAVE THROW RAY (Connecting Open Globe -> Right Reviews) ── */}
                <path
                  d={`M ${currentReview.coordinates.x} ${currentReview.coordinates.y} Q 420 ${currentReview.coordinates.y - 40} 470 230`}
                  fill="none"
                  stroke="url(#waveThrowBeamGrad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  filter="url(#goldArcFilter)"
                />
                
                {/* Animated Wave Particle Traveling across the Ray */}
                <circle r="5" fill="#ffffff" filter="url(#goldArcFilter)">
                  <animateMotion
                    key={`particle-${waveKey}`}
                    path={`M ${currentReview.coordinates.x} ${currentReview.coordinates.y} Q 420 ${currentReview.coordinates.y - 40} 470 230`}
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* Floating Active Collector City Label on Screen */}
              <div className="absolute bottom-2 left-2 sm:left-4 z-20 flex items-center gap-2 bg-[#080e1c]/90 backdrop-blur-md border border-[#dfb76c]/40 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl shadow-xl pointer-events-none max-w-[calc(100%-1rem)] sm:max-w-none">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#dfb76c] animate-ping shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs text-neutral-200 truncate">
                  Origin: <strong className="text-[#f7d794]">{currentReview.location}</strong>
                </span>
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: THROWN REVIEWS CARD DISPLAY (RECEIVING WAVE) */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 relative">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id + '-' + waveKey}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 40, scale: 0.95, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -30, scale: 0.96, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl bg-gradient-to-br from-[#121626] via-[#0d1220] to-[#0a0e1a] border-2 border-[#dfb76c]/60 p-6 sm:p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden"
              >
                {/* Incoming Wave Radiance Top Border */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#38bdf8] via-[#dfb76c] to-[#f7d794] animate-pulse" />

                {/* Top Badge Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-5 border-b border-neutral-800/80">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={12} />
                      <span>{currentReview.seal}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#dfb76c] bg-[#dfb76c]/10 px-2 py-0.5 rounded border border-[#dfb76c]/30">
                      {currentReview.tag}
                    </span>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 text-[#dfb76c]">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#dfb76c] text-[#dfb76c] filter drop-shadow-[0_0_4px_#dfb76c]" />
                    ))}
                  </div>
                </div>

                {/* Main Serif Quote Content */}
                <div className="my-6 sm:my-8 relative">
                  <Quote size={48} className="absolute -top-5 -left-3 text-[#dfb76c]/15 pointer-events-none" />
                  <p className="font-serif italic text-base sm:text-lg md:text-xl text-neutral-100 leading-relaxed sm:leading-loose relative z-10">
                    "{currentReview.quote}"
                  </p>
                </div>

                {/* Collector Credential Footer */}
                <div className="pt-5 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-lg sm:text-xl font-normal text-white flex items-center gap-2">
                      <span>{currentReview.collector}</span>
                      <Award size={16} className="text-[#dfb76c]" />
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5">
                      {currentReview.title}
                    </p>
                    <p className="text-[11px] font-mono text-[#f7d794] mt-1 flex items-center gap-1">
                      <MapPin size={11} className="text-[#dfb76c]" />
                      <span>{currentReview.location}</span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-neutral-300">{currentReview.artwork}</span>
                    </p>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handlePrev}
                      className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-md"
                      aria-label="Previous review"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2.5 rounded-xl bg-[#dfb76c] hover:bg-[#f7d794] text-neutral-950 font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(223,183,108,0.5)]"
                      aria-label="Next review"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Auto-play Timer Progress Bar */}
                <div className="mt-5 w-full bg-neutral-800/80 h-1 rounded-full overflow-hidden">
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
