import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  Sparkles, ArrowDown, ArrowRight, Eye, Shield, CheckCircle2, 
  Layers, Compass, Award, FileText, ChevronRight, Info, Plus, X, Lock, Unlock
} from 'lucide-react'

// Authentic Zigguratss Assets
import screenshotImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 14-57-58.png'
import flowersImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 15-14-55.png'
import wallImage1 from '../assets/ProductPage-images/image 1.png'
import wallImage2 from '../assets/ProductPage-images/image2.png'
import pradipPortrait from '../assets/User-images/Pradip Sarkar.jpeg'
import image9 from '../assets/User-images/image 9.jpg'
import diff1 from '../assets/User-images/diif1.jpg'

export default function HeroEditorialSplit({ onExploreDetails, isDossierUnfolded = false }) {
  const shouldReduceMotion = useReducedMotion()
  const [selectedHotspot, setSelectedHotspot] = useState(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [activeHeroCardIdx, setActiveHeroCardIdx] = useState(0)
  const imageFrameRef = useRef(null)

  // Auto-cycle quick specs & artist card (0 -> 1 -> 2 -> 3 -> 0)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroCardIdx((prev) => (prev + 1) % 4)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  // Hotspots on the Masterpiece Canvas
  const hotspots = [
    {
      id: 1,
      top: '28%',
      left: '32%',
      title: 'The Butterfly Sonata',
      tag: 'Symbolic Motif',
      detail: 'Intricate yellow and ochre butterflies symbolizing metamorphosis, delicate life, and spiritual transcendence.',
      img: flowersImage
    },
    {
      id: 2,
      top: '52%',
      left: '68%',
      title: 'Geometric Grid Architecture',
      tag: 'Santiniketan Structure',
      detail: 'Rhythmic checkerboard planes and chromatic geometry embodying human aspiration in balanced equilibrium.',
      img: image9
    },
    {
      id: 3,
      top: '76%',
      left: '40%',
      title: 'Impasto & Pure Pigments',
      tag: 'Archival Acrylic',
      detail: 'Multiple translucent acrylic glazes layered over primed canvas, signed and dated by Pradip Sarkar (2023).',
      img: diff1
    }
  ]

  // 3D Canvas Tilt
  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !imageFrameRef.current) return
    const rect = imageFrameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5
    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  const handleTriggerExplore = () => {
    if (onExploreDetails) {
      onExploreDetails()
    } else {
      const target = document.getElementById('product-acquisition-stage')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <section 
      data-showcase-section
      data-showcase-title="Editorial Masterpiece & Heritage"
      className="relative w-full min-h-[90vh] flex flex-col justify-center items-center py-6 sm:py-10 lg:py-14 overflow-hidden"
    >
      {/* Dynamic Background Radial Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(223,183,108,0.12),transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(197,160,89,0.08),transparent_70%)] blur-3xl pointer-events-none" />

      {/* ── FLOATING AMBIENT SATELLITE ART CARDS (Parallax bobbing from reference sites) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden xl:block z-0">
        {/* Top-Right Floating Satellite */}
        <motion.div
          animate={{
            y: [-14, 14, -14],
            rotate: [4, -4, 4]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 right-10 w-44 rounded-2xl bg-[#13131c]/90 border border-neutral-700/80 p-2.5 shadow-2xl backdrop-blur-xl"
        >
          <div className="h-24 rounded-lg overflow-hidden relative">
            <img src={wallImage1} alt="Living Room Scale" className="w-full h-full object-cover" />
            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[#dfb76c] text-[8px] font-mono uppercase tracking-wider border border-neutral-700">
              In-Room View
            </div>
          </div>
          <div className="pt-2">
            <h6 className="font-serif text-[11px] text-white">Scale Visualization</h6>
            <span className="text-[9px] text-neutral-400">Living Room Setting</span>
          </div>
        </motion.div>

        {/* Bottom-Left Floating Satellite */}
        <motion.div
          animate={{
            y: [16, -16, 16],
            rotate: [-5, 5, -5]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-16 left-8 w-44 rounded-2xl bg-[#13131c]/90 border border-neutral-700/80 p-2.5 shadow-2xl backdrop-blur-xl"
        >
          <div className="h-24 rounded-lg overflow-hidden relative">
            <img src={flowersImage} alt="Butterfly Motif" className="w-full h-full object-cover" />
            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[#dfb76c] text-[8px] font-mono uppercase tracking-wider border border-neutral-700">
              Macro Detail
            </div>
          </div>
          <div className="pt-2">
            <h6 className="font-serif text-[11px] text-white">The Butterfly Sonata</h6>
            <span className="text-[9px] text-neutral-400">Impasto Brushwork</span>
          </div>
        </motion.div>
      </div>

      {/* ── MAIN 2-COLUMN EDITORIAL HERO GRID ── */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: THE MATTER & HERITAGE OF ZIGGURATSS */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7"
        >
          {/* Maison & Collection Tag */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#dfb76c]/15 text-[#f7d794] border border-[#dfb76c]/40 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
              <Sparkles size={12} className="text-[#dfb76c]" />
              Zigguratss Curated Masterpiece
            </span>
            <span className="px-2.5 py-1 rounded-full bg-neutral-900/90 text-neutral-300 border border-neutral-800 text-[10px] sm:text-xs font-mono">
              Series: Divine Tunes #11
            </span>
          </div>

          {/* Masterpiece Title & Artist */}
          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl xl:text-6xl text-white font-normal tracking-tight leading-[1.1]">
              Divine Tunes-11
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-neutral-300 font-light">
              <span>By Master Artist</span>
              <span className="font-medium text-[#dfb76c] tracking-wide">Pradip Sarkar</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400 text-xs sm:text-sm">Kala Bhavana, Santiniketan</span>
            </div>
          </div>

          {/* Curatorial Story Matter & Editorial Narrative */}
          <div className="relative pl-4 border-l-2 border-[#dfb76c]/60 bg-gradient-to-r from-[#dfb76c]/5 to-transparent py-2 rounded-r-xl">
            <p className="text-xs sm:text-sm lg:text-[15px] text-neutral-300 leading-relaxed font-light">
              An extraordinary visual symphony capturing the serene communion between human consciousness, vibrant nature, and celestial geometry. Painted with archival acrylic glazes, three ethereal butterflies flutter around a tranquil meditative countenance.
            </p>
          </div>

          {/* Quick Specs Ledger Bar — Sequential Auto-Highlighting (0 -> 1 -> 2 -> 3) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3 border-y border-neutral-800/90">
            <motion.div 
              onClick={() => setActiveHeroCardIdx(0)}
              animate={{
                scale: activeHeroCardIdx === 0 ? 1.05 : 1.0,
                y: activeHeroCardIdx === 0 ? -3 : 0,
                boxShadow: activeHeroCardIdx === 0
                  ? '0 0 25px rgba(223,183,108,0.38)'
                  : '0 0 10px rgba(223,183,108,0.1)'
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
              className={`p-2 sm:p-3 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                activeHeroCardIdx === 0
                  ? 'bg-gradient-to-b from-[#252538] via-[#1a1a26] to-[#12121a] border-[#dfb76c] ring-1 ring-[#dfb76c]/50 z-10'
                  : 'bg-gradient-to-b from-[#1e1e2c] via-[#14141e] to-[#101017] border-neutral-800 opacity-80'
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-300 ${
                activeHeroCardIdx === 0 ? 'bg-[#dfb76c] opacity-100 shadow-[0_0_8px_#dfb76c]' : 'bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent opacity-40'
              }`} />
              <span className={`text-[9px] sm:text-[10px] uppercase font-mono font-semibold block mb-0.5 transition-colors ${
                activeHeroCardIdx === 0 ? 'text-[#f7d794]' : 'text-[#dfb76c]'
              }`}>Dimensions</span>
              <span className={`font-serif text-xs sm:text-sm font-medium block transition-colors ${
                activeHeroCardIdx === 0 ? 'text-white font-semibold' : 'text-neutral-200'
              }`}>32 × 30 in</span>
              <span className="text-[9px] text-[#f7d794]/90 block font-mono">81 × 76 cm</span>
            </motion.div>

            <motion.div 
              onClick={() => setActiveHeroCardIdx(1)}
              animate={{
                scale: activeHeroCardIdx === 1 ? 1.05 : 1.0,
                y: activeHeroCardIdx === 1 ? -3 : 0,
                boxShadow: activeHeroCardIdx === 1
                  ? '0 0 25px rgba(223,183,108,0.38)'
                  : '0 0 10px rgba(223,183,108,0.1)'
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
              className={`p-2 sm:p-3 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                activeHeroCardIdx === 1
                  ? 'bg-gradient-to-b from-[#252538] via-[#1a1a26] to-[#12121a] border-[#dfb76c] ring-1 ring-[#dfb76c]/50 z-10'
                  : 'bg-gradient-to-b from-[#1e1e2c] via-[#14141e] to-[#101017] border-neutral-800 opacity-80'
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-300 ${
                activeHeroCardIdx === 1 ? 'bg-[#dfb76c] opacity-100 shadow-[0_0_8px_#dfb76c]' : 'bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent opacity-40'
              }`} />
              <span className={`text-[9px] sm:text-[10px] uppercase font-mono font-semibold block mb-0.5 transition-colors ${
                activeHeroCardIdx === 1 ? 'text-[#f7d794]' : 'text-[#dfb76c]'
              }`}>Medium</span>
              <span className={`font-serif text-xs sm:text-sm font-medium block transition-colors ${
                activeHeroCardIdx === 1 ? 'text-white font-semibold' : 'text-neutral-200'
              }`}>Acrylic on Canvas</span>
              <span className="text-[9px] text-[#dfb76c] block font-mono font-bold">100% Original</span>
            </motion.div>

            <motion.div 
              onClick={() => setActiveHeroCardIdx(2)}
              animate={{
                scale: activeHeroCardIdx === 2 ? 1.05 : 1.0,
                y: activeHeroCardIdx === 2 ? -3 : 0,
                boxShadow: activeHeroCardIdx === 2
                  ? '0 0 25px rgba(223,183,108,0.38)'
                  : '0 0 10px rgba(223,183,108,0.1)'
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
              className={`p-2 sm:p-3 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                activeHeroCardIdx === 2
                  ? 'bg-gradient-to-b from-[#252538] via-[#1a1a26] to-[#12121a] border-[#dfb76c] ring-1 ring-[#dfb76c]/50 z-10'
                  : 'bg-gradient-to-b from-[#1e1e2c] via-[#14141e] to-[#101017] border-neutral-800 opacity-80'
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-300 ${
                activeHeroCardIdx === 2 ? 'bg-[#dfb76c] opacity-100 shadow-[0_0_8px_#dfb76c]' : 'bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent opacity-40'
              }`} />
              <span className={`text-[9px] sm:text-[10px] uppercase font-mono font-semibold block mb-0.5 transition-colors ${
                activeHeroCardIdx === 2 ? 'text-[#f7d794]' : 'text-[#dfb76c]'
              }`}>Valuation</span>
              <span className={`font-serif text-xs sm:text-sm font-bold block transition-colors ${
                activeHeroCardIdx === 2 ? 'text-white' : 'text-[#dfb76c]'
              }`}>₹1,18,300</span>
              <span className="text-[9px] text-neutral-300 block font-mono">$1,577 USD</span>
            </motion.div>
          </div>

          {/* Authentic Artist Monograph Snapshot (Card 3 in cycle) */}
          <motion.div 
            onClick={() => setActiveHeroCardIdx(3)}
            animate={{
              scale: activeHeroCardIdx === 3 ? 1.025 : 1.0,
              boxShadow: activeHeroCardIdx === 3
                ? '0 0 25px rgba(223,183,108,0.28)'
                : '0 4px 15px rgba(0,0,0,0.4)'
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
              activeHeroCardIdx === 3
                ? 'bg-[#181826] border-[#dfb76c] ring-1 ring-[#dfb76c]/40'
                : 'bg-[#14141e]/90 border-neutral-800/90'
            }`}
          >
            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border shrink-0 bg-neutral-900 transition-colors ${
              activeHeroCardIdx === 3 ? 'border-[#dfb76c] ring-2 ring-[#dfb76c]/40' : 'border-[#dfb76c]/40'
            }`}>
              <img src={pradipPortrait} alt="Pradip Sarkar" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className={`font-serif text-xs sm:text-sm font-medium transition-colors ${
                  activeHeroCardIdx === 3 ? 'text-[#f7d794]' : 'text-white'
                }`}>Pradip Sarkar</h4>
                <CheckCircle2 size={12} className="text-[#dfb76c]" />
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-400 truncate">
                B.F.A. & M.F.A. Kala Bhavana, Santiniketan • National Scholar Awardee
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-[9px] font-mono text-[#dfb76c]">1 of 1 Certified</span>
              <span className="text-[9px] text-neutral-400">Physical COA</span>
            </div>
          </motion.div>

          {/* Interactive CTA & Click-To-Reveal Trigger */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTriggerExplore}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#dfb76c] via-[#f7d794] to-[#c9a96e] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_10px_35px_rgba(223,183,108,0.35)] transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Sparkles size={16} className="text-neutral-950 animate-spin" />
              <span>{isDossierUnfolded ? 'In-Room Suite Unfolded Below ↓' : 'Click Artwork to Unfold In-Room Gallery & Details'}</span>
              <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
            </motion.button>

            <button
              onClick={() => setSelectedHotspot(hotspots[0])}
              className="px-4 py-3.5 rounded-xl sm:rounded-2xl bg-[#151520] hover:bg-[#1f1f2e] text-neutral-300 hover:text-white border border-neutral-700 text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Eye size={14} className="text-[#dfb76c]" />
              <span>Inspect Hotspots</span>
            </button>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: HERO CANVAS WITH CONTINUOUS FLOATING & LEVITATION */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-center justify-center relative"
          style={{ perspective: 1200 }}
        >
          {/* Luminous Museum Halo Breathing Animation */}
          <motion.div 
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.55, 0.85, 0.55]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-6 sm:-inset-10 rounded-[40px] bg-gradient-to-tr from-[#dfb76c]/30 via-[#f7d794]/20 to-transparent blur-3xl pointer-events-none" 
          />

          {/* Continuous Luxury Floating & Levitation Wrapper */}
          <motion.div
            animate={shouldReduceMotion ? {} : {
              y: [-14, 14, -14],
              rotateZ: [-0.8, 0.8, -0.8]
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full flex items-center justify-center relative"
          >
            {/* Interactive 3D Canvas Stage */}
            <motion.div
              ref={imageFrameRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleTriggerExplore}
              animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-[460px] sm:max-w-[500px] rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#1a1a26] via-[#12121a] to-[#0c0c12] border-2 border-[#dfb76c]/75 shadow-[0_25px_70px_rgba(0,0,0,0.9)] cursor-pointer group select-none hover:border-[#dfb76c] ring-1 ring-[#dfb76c]/30"
            >
            {/* Click-to-Explore Floating Overlay Cue on Hover */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#dfb76c]/50 text-[#dfb76c] text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-xl group-hover:scale-105 transition-transform">
              <Sparkles size={12} className="animate-pulse" />
              <span>{isDossierUnfolded ? 'Gallery Unfolded Below ↓' : 'Click to Unfold In-Room Views & Details'}</span>
            </div>

            {/* Framed Canvas Surface */}
            <div className="w-full aspect-[1/1] rounded-xl sm:rounded-2xl overflow-hidden bg-black relative flex items-center justify-center border border-neutral-700/80 shadow-inner">
              <motion.img
                src={screenshotImage}
                alt="Divine Tunes-11 by Pradip Sarkar"
                className="w-full h-full object-contain filter drop-shadow-[0_16px_40px_rgba(0,0,0,0.95)] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Pulsating Interactive Hotspot Markers (UNIMATIC & Borek inspired) */}
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  style={{ top: spot.top, left: spot.left }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedHotspot(spot)
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/spot cursor-pointer"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsating Rings */}
                    <span className="absolute w-8 h-8 rounded-full bg-[#dfb76c]/30 animate-ping" />
                    <span className="absolute w-6 h-6 rounded-full bg-[#dfb76c]/50 animate-pulse" />
                    <div className="w-5 h-5 rounded-full bg-neutral-950 border-2 border-[#f7d794] flex items-center justify-center shadow-[0_0_12px_#dfb76c] text-[#f7d794] text-[9px] font-bold">
                      +
                    </div>
                  </div>

                  {/* Hotspot Floating Tooltip on Hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-7 hidden group-hover/spot:flex flex-col items-center pointer-events-none z-40 w-44">
                    <div className="px-2.5 py-1.5 rounded-lg bg-neutral-950/95 border border-[#dfb76c]/60 text-center shadow-xl backdrop-blur-md">
                      <span className="text-[8px] font-mono text-[#dfb76c] uppercase block">{spot.tag}</span>
                      <span className="text-[10px] font-serif text-white font-medium block">{spot.title}</span>
                    </div>
                    <div className="w-2 h-2 bg-neutral-950 border-r border-b border-[#dfb76c]/60 transform rotate-45 -mt-1" />
                  </div>
                </div>
              ))}

              {/* Signed Hologram Stamp */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/85 border border-[#dfb76c]/40 text-[#dfb76c] text-[9px] font-mono flex items-center gap-1.5 backdrop-blur-md">
                <CheckCircle2 size={11} />
                <span>SIGNED ARCHIVAL ORIGINAL</span>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="mt-3 flex items-center justify-between px-1">
              <div>
                <span className="text-xs font-serif text-white block">Divine Tunes-11</span>
                <span className="text-[10px] text-neutral-400">Pradip Sarkar • 2023</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#dfb76c] font-mono font-semibold">
                <span>{isDossierUnfolded ? 'Explore Renders Below' : 'Click to Unfold Renders'}</span>
                <ArrowRight size={11} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>

      {/* ── MODAL: HOTSPOT TEXTURE & MOTIF INSPECTION ── */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHotspot(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl bg-[#14141e] border border-[#dfb76c]/50 p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative"
            >
              <button
                onClick={() => setSelectedHotspot(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded bg-[#dfb76c]/20 text-[#f7d794] text-[10px] font-mono uppercase font-semibold">
                  {selectedHotspot.tag}
                </span>
                <span className="text-xs text-neutral-400 font-mono">Archival Inspection</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-3">
                {selectedHotspot.title}
              </h3>

              <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-black relative border border-neutral-700 mb-4">
                <img src={selectedHotspot.img} alt={selectedHotspot.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-[#dfb76c] text-[9px] font-mono border border-neutral-700">
                  Macro 1:1 Resolution
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                {selectedHotspot.detail}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                <span className="text-[11px] font-mono text-neutral-400">Authentic Curatorial Feature</span>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="px-4 py-2 rounded-xl bg-[#dfb76c] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-[#f7d794] transition-all"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SMOOTH SCROLL DOWN ARROW INDICATOR ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={handleTriggerExplore}
        className="mt-8 sm:mt-12 flex flex-col items-center gap-1 text-neutral-400 hover:text-[#dfb76c] transition-colors cursor-pointer"
      >
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em]">
          {isDossierUnfolded ? 'Scroll to In-Room Views & Acquisition Below' : 'Click Artwork or Here to Unfold Details'}
        </span>
        <ArrowDown size={14} className="text-[#dfb76c]" />
      </motion.div>
    </section>
  )
}
