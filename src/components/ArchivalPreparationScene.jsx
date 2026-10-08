import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Sparkles, ShieldCheck, Box, Layers, Lock } from 'lucide-react'
import screenshotImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 14-57-58.png'

export default function ArchivalPreparationScene({
  isReducedMotion = false,
  artworkSrc = screenshotImage,
  artworkTitle = 'Divine Tunes-11'
}) {
  // Animation cycle sequence (0 -> 1 -> 2 -> 3 -> 4 -> loop)
  // Phase 0: Artwork on conservation table, Art Handler approaches
  // Phase 1: Handler gently inspects canvas surface & edges
  // Phase 2: Protective archival glassine layers wrap around artwork
  // Phase 3: Wrapped artwork is placed into archival protective case & sealed
  // Phase 4: Final secured state with golden confirmation aura
  const [prepPhase, setPrepPhase] = useState(0)

  useEffect(() => {
    if (isReducedMotion) return

    const timers = []

    const runCycle = () => {
      setPrepPhase(0) // Art handler approaches conservation area
      timers.push(setTimeout(() => setPrepPhase(1), 2200)) // Gentle inspection of canvas
      timers.push(setTimeout(() => setPrepPhase(2), 4200)) // Protective archival wrap
      timers.push(setTimeout(() => setPrepPhase(3), 6400)) // Placed in case & sealed
      timers.push(setTimeout(() => setPrepPhase(4), 8200)) // Final gold confirmation aura
      timers.push(setTimeout(() => setPrepPhase(5), 9400)) // Fade reset
      timers.push(setTimeout(() => runCycle(), 10000))     // Loop restart
    }

    runCycle()

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [isReducedMotion])

  // Reduced motion static completed state
  if (isReducedMotion) {
    return (
      <div className="relative w-full h-full min-h-[280px] xs:min-h-[310px] sm:min-h-[340px] md:min-h-[360px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#101018] via-[#0c0c12] to-[#07070b] border border-neutral-800 p-4 flex flex-col items-center justify-center">
        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#dfb76c]/20 border border-[#dfb76c] flex items-center justify-center text-[#dfb76c] shadow-[0_0_25px_rgba(223,183,108,0.4)]">
            <ShieldCheck size={30} />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#dfb76c] bg-[#dfb76c]/10 border border-[#dfb76c]/30 px-3 py-1 rounded-full">
            Archival Preparation Complete
          </span>
          <h5 className="font-serif text-lg font-medium text-white">Protected for Transportation</h5>
          <p className="text-xs text-neutral-300 max-w-sm">
            The artwork has been wrapped in acid-free archival protective layers and encased in a shock-damped case.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full min-h-[280px] xs:min-h-[310px] sm:min-h-[340px] md:min-h-[360px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#12121c] via-[#0d0d14] to-[#08080c] border border-neutral-800 flex flex-col justify-between select-none shadow-2xl">
      {/* ── AMBIENT STUDIO LIGHTING & PARTICLES ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Overhead Workbench Spotlight Halo */}
        <div className="absolute top-0 left-1/3 w-80 sm:w-96 h-full bg-[radial-gradient(ellipse_at_top,rgba(223,183,108,0.2),transparent_70%)]" />
        {/* Ambient Floor Glow */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#dfb76c]/06 via-transparent to-transparent" />

        {/* Floating golden micro-motes */}
        <motion.div
          animate={{ opacity: [0.2, 0.7, 0.2], y: [-4, 6, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-1/4 w-1.5 h-1.5 rounded-full bg-[#dfb76c]/40 blur-[0.5px]"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3], y: [6, -4, 6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-14 right-1/4 w-1 h-1 rounded-full bg-[#f7d794]/50 blur-[0.5px]"
        />
      </div>

      {/* ── TOP HUD STATUS OVERLAY ── */}
      <div className="relative z-20 flex items-center justify-between px-3.5 pt-3 sm:px-5 sm:pt-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfb76c] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dfb76c]" />
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#f7d794] font-semibold">
            Stage 02 // Archival Preparation
          </span>
        </div>

        {/* Dynamic Phase Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={prepPhase}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#dfb76c]/30 text-[9px] sm:text-[10px] text-[#dfb76c] font-medium"
          >
            {prepPhase === 0 && <span>Art Handler Approaching...</span>}
            {prepPhase === 1 && <span>Surface & Edge Inspection</span>}
            {prepPhase === 2 && <span>Archival Glassine Wrapping</span>}
            {prepPhase === 3 && <span>Encasing in Archival Case</span>}
            {(prepPhase === 4 || prepPhase === 5) && (
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 size={11} className="text-emerald-400" />
                <span>Protected & Sealed ✓</span>
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── MAIN CINEMATIC VECTOR STAGE (SVG CHOREOGRAPHY) ── */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center px-1 sm:px-4 overflow-hidden">
        <svg
          viewBox="0 0 800 360"
          className="w-full h-full max-h-[300px] sm:max-h-[340px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Museum Overhead Spotlight Gradient */}
            <radialGradient id="studioSpotlight" cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor="#dfb76c" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#c9a96e" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#dfb76c" stopOpacity="0" />
            </radialGradient>

            {/* Workbench Table Felt Surface Gradient */}
            <linearGradient id="tableGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#222230" />
              <stop offset="40%" stopColor="#181824" />
              <stop offset="100%" stopColor="#0f0f18" />
            </linearGradient>

            {/* Archival Protective Wrap Translucent Layer */}
            <linearGradient id="glassineWrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdfbf7" stopOpacity="0.88" />
              <stop offset="50%" stopColor="#f4ede2" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#e8dec8" stopOpacity="0.85" />
            </linearGradient>

            {/* Golden Case Aura Ripple */}
            <radialGradient id="caseAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fcedc2" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#dfb76c" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#c9a96e" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#dfb76c" stopOpacity="0" />
            </radialGradient>

            {/* Shadow beneath elements */}
            <radialGradient id="prepShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Floor Granite Gradient */}
            <linearGradient id="studioFloor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#181822" />
              <stop offset="40%" stopColor="#101018" />
              <stop offset="100%" stopColor="#08080c" />
            </linearGradient>
          </defs>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 1. STUDIO ENVIRONMENT & CONSERVATION WORKBENCH        */}
          {/* ═══════════════════════════════════════════════════════ */}
          
          {/* Granite Floor */}
          <rect x="0" y="270" width="800" height="90" fill="url(#studioFloor)" />
          <line x1="0" y1="270" x2="800" y2="270" stroke="#2a2a3c" strokeWidth="1.5" />
          
          {/* Studio Floor Perspective Guide Lines */}
          <line x1="140" y1="270" x2="100" y2="360" stroke="#1f1f2e" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="320" y1="270" x2="280" y2="360" stroke="#1f1f2e" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="500" y1="270" x2="460" y2="360" stroke="#1f1f2e" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="680" y1="270" x2="640" y2="360" stroke="#1f1f2e" strokeWidth="1" strokeDasharray="3 3" />

          {/* Back Conservation Wall with Studio Measurement Grid & Shelves */}
          <rect x="0" y="30" width="800" height="240" fill="#0d0d14" />
          {/* Architectural Slats on Back Wall */}
          {[60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720].map((x) => (
            <line key={x} x1={x} y1="30" x2={x} y2="270" stroke="#171724" strokeWidth="1" />
          ))}

          {/* Archival Cylinder Storage Rack on the Left (x: 40 to 140) */}
          <g transform="translate(45, 100)">
            <rect x="0" y="0" width="80" height="170" rx="3" fill="#13131d" stroke="#2a2a3c" strokeWidth="1" />
            <line x1="0" y1="50" x2="80" y2="50" stroke="#2a2a3c" strokeWidth="1" />
            <line x1="0" y1="100" x2="80" y2="100" stroke="#2a2a3c" strokeWidth="1" />
            {/* Storage Tubes */}
            <rect x="10" y="15" width="60" height="12" rx="3" fill="#20202e" stroke="#dfb76c" strokeWidth="0.6" />
            <rect x="10" y="30" width="60" height="12" rx="3" fill="#1b1b26" stroke="#c9a96e" strokeWidth="0.6" />
            <rect x="10" y="65" width="60" height="12" rx="3" fill="#20202e" stroke="#dfb76c" strokeWidth="0.6" />
            <rect x="10" y="80" width="60" height="12" rx="3" fill="#1b1b26" stroke="#c9a96e" strokeWidth="0.6" />
            <rect x="10" y="115" width="60" height="12" rx="3" fill="#20202e" stroke="#dfb76c" strokeWidth="0.6" />
            <rect x="10" y="130" width="60" height="12" rx="3" fill="#1b1b26" stroke="#c9a96e" strokeWidth="0.6" />
            <text x="40" y="160" fill="#dfb76c" fontSize="7" fontFamily="monospace" textAnchor="middle">ARCHIVE RACK</text>
          </g>

          {/* Overhead Museum Downlight Fixtures */}
          <g transform="translate(280, 25)">
            <rect x="0" y="0" width="180" height="12" rx="2" fill="#1c1c28" stroke="#dfb76c" strokeWidth="0.8" />
            <circle cx="45" cy="12" r="5" fill="#ffe6aa" />
            <circle cx="135" cy="12" r="5" fill="#ffe6aa" />
            {/* Spotlight Cones */}
            <polygon points="45,12 0,270 240,270" fill="url(#studioSpotlight)" opacity="0.8" />
            <polygon points="135,12 80,270 340,270" fill="url(#studioSpotlight)" opacity="0.8" />
          </g>

          {/* Studio Wall Certification / Protocol Board */}
          <g transform="translate(640, 70)">
            <rect x="0" y="0" width="90" height="60" rx="3" fill="#101018" stroke="#dfb76c" strokeWidth="0.8" />
            <text x="45" y="16" fill="#dfb76c" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              PREPARATION AREA
            </text>
            <line x1="10" y1="22" x2="80" y2="22" stroke="#252538" strokeWidth="1" />
            <text x="12" y="34" fill="#a0a0b8" fontSize="6.5" fontFamily="sans-serif">1. Edge Padding</text>
            <text x="12" y="44" fill="#a0a0b8" fontSize="6.5" fontFamily="sans-serif">2. Acid-Free Wrap</text>
            <text x="12" y="54" fill="#a0a0b8" fontSize="6.5" fontFamily="sans-serif">3. Archival Casing</text>
          </g>

          {/* Conservation Workbench Table (x: 160 to 520) */}
          <g transform="translate(170, 205)">
            {/* Table Shadow */}
            <ellipse cx="170" cy="72" rx="190" ry="12" fill="url(#prepShadow)" />
            
            {/* Table Legs */}
            <rect x="20" y="32" width="12" height="40" rx="2" fill="#161622" stroke="#2a2a3a" strokeWidth="1" />
            <rect x="310" y="32" width="12" height="40" rx="2" fill="#161622" stroke="#2a2a3a" strokeWidth="1" />
            <rect x="60" y="32" width="10" height="40" rx="2" fill="#11111a" />
            <rect x="270" y="32" width="10" height="40" rx="2" fill="#11111a" />
            {/* Support Crossbar */}
            <line x1="20" y1="52" x2="320" y2="52" stroke="#222230" strokeWidth="2" />

            {/* Table Surface / Anti-Static Felt Pad */}
            <polygon points="0,32 340,32 325,12 15,12" fill="url(#tableGrad)" stroke="#dfb76c" strokeWidth="1" />
            {/* Soft Felt Work Mat in Center */}
            <polygon points="25,30 315,30 305,15 35,15" fill="#14141e" stroke="#333346" strokeWidth="0.8" />
            {/* Alignment Reference Grid on Mat */}
            <line x1="50" y1="16" x2="40" y2="29" stroke="#222230" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="170" y1="15" x2="170" y2="30" stroke="#dfb76c" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
            <line x1="290" y1="16" x2="300" y2="29" stroke="#222230" strokeWidth="1" strokeDasharray="2 2" />
          </g>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 2. THE ARTWORK & ARCHIVAL PROTECTION WRAPPING         */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.g
            animate={{
              // When Phase 3 arrives, the wrapped artwork is lifted and placed into the case
              x: prepPhase < 3 ? 245 : 405,
              y: prepPhase < 3 ? 120 : prepPhase === 3 ? [120, 100, 160] : 160,
              scale: prepPhase >= 3 ? 0.78 : 1.0,
              opacity: prepPhase >= 4 ? 0 : 1
            }}
            transition={{
              duration: prepPhase === 3 ? 1.0 : 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {/* Artwork Easel Stand (Behind Canvas) */}
            <polygon points="40,2 45,-12 50,2" fill="#252538" />
            <line x1="45" y1="-12" x2="45" y2="85" stroke="#333346" strokeWidth="3" />

            {/* Framed Canvas Base */}
            <g>
              {/* Gold Outer Frame */}
              <rect x="0" y="0" width="90" height="110" rx="3" fill="#09090e" stroke="#dfb76c" strokeWidth="2.2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.8))" />
              {/* Inner Archival Mat */}
              <rect x="4" y="4" width="82" height="102" rx="2" fill="#14141e" stroke="#c9a96e" strokeWidth="0.8" />
              
              {/* Genuine Master Canvas Artwork Image */}
              <clipPath id="prepCanvasClip">
                <rect x="7" y="7" width="76" height="96" rx="1.5" />
              </clipPath>

              <image
                href={artworkSrc || screenshotImage}
                x="7"
                y="7"
                width="76"
                height="96"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#prepCanvasClip)"
              />

              {/* Title Plate */}
              <rect x="20" y="93" width="50" height="10" rx="1.5" fill="#000000" opacity="0.85" />
              <text x="45" y="100.5" fill="#dfb76c" fontSize="5.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {artworkTitle}
              </text>
            </g>

            {/* ── PHASE 2: ARCHIVAL PROTECTIVE WRAP OVERLAYS ── */}
            <AnimatePresence>
              {prepPhase >= 2 && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1.0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  {/* Frosted Glassine Acid-Free Protective Wrap */}
                  <rect
                    x="2"
                    y="2"
                    width="86"
                    height="106"
                    rx="3"
                    fill="url(#glassineWrapGrad)"
                    stroke="#dfb76c"
                    strokeWidth="1.2"
                    opacity="0.88"
                  />

                  {/* Corner High-Density Protective Foam Bumpers */}
                  <polygon points="2,2 18,2 2,18" fill="#dfb76c" opacity="0.9" />
                  <polygon points="88,2 72,2 88,18" fill="#dfb76c" opacity="0.9" />
                  <polygon points="2,108 18,108 2,92" fill="#dfb76c" opacity="0.9" />
                  <polygon points="88,108 72,108 88,92" fill="#dfb76c" opacity="0.9" />

                  {/* Archival Sealing Security Ribbon */}
                  <line x1="45" y1="2" x2="45" y2="108" stroke="#b38f47" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="2" y1="55" x2="88" y2="55" stroke="#b38f47" strokeWidth="2" strokeDasharray="4 2" />
                  
                  {/* Central Archival Tamper Seal Stamp */}
                  <circle cx="45" cy="55" r="9" fill="#dfb76c" stroke="#ffffff" strokeWidth="1" />
                  <text x="45" y="58" fill="#000000" fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    SEALED
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
          </motion.g>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 3. ARCHIVAL REINFORCED CASE / CYLINDER CONTAINER      */}
          {/* ═══════════════════════════════════════════════════════ */}
          <g transform="translate(415, 145)">
            {/* Golden Case Aura Ripple on Verification (Phase 4) */}
            {prepPhase >= 4 && (
              <motion.circle
                cx="50"
                cy="60"
                r="65"
                fill="url(#caseAura)"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.8, 1.35, 1.1], opacity: [0, 0.9, 0.6] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse' }}
              />
            )}

            {/* Case Body (High-Density Heavy-Duty Protective Case) */}
            <rect
              x="0"
              y="25"
              width="100"
              height="80"
              rx="4"
              fill="#181824"
              stroke="#dfb76c"
              strokeWidth="1.8"
              filter="drop-shadow(0 10px 25px rgba(0,0,0,0.85))"
            />
            
            {/* Inner Shock-Absorption Foam Bed */}
            <rect x="6" y="30" width="88" height="70" rx="3" fill="#0f0f18" stroke="#333346" strokeWidth="0.8" />
            {/* Foam Grip Ridges */}
            <line x1="12" y1="45" x2="88" y2="45" stroke="#1d1d2b" strokeWidth="2" strokeDasharray="4 3" />
            <line x1="12" y1="65" x2="88" y2="65" stroke="#1d1d2b" strokeWidth="2" strokeDasharray="4 3" />
            <line x1="12" y1="85" x2="88" y2="85" stroke="#1d1d2b" strokeWidth="2" strokeDasharray="4 3" />

            {/* Reinforced Corner Armor Brackets */}
            <rect x="0" y="25" width="12" height="12" fill="#2d2d3f" stroke="#dfb76c" strokeWidth="0.8" />
            <rect x="88" y="25" width="12" height="12" fill="#2d2d3f" stroke="#dfb76c" strokeWidth="0.8" />
            <rect x="0" y="93" width="12" height="12" fill="#2d2d3f" stroke="#dfb76c" strokeWidth="0.8" />
            <rect x="88" y="93" width="12" height="12" fill="#2d2d3f" stroke="#dfb76c" strokeWidth="0.8" />

            {/* Heavy-Duty Carry Handle */}
            <path d="M35,105 Q50,116 65,105" stroke="#dfb76c" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Case Hinged Protective Lid (Animated: Open -> Smooth Close on Phase 3 & 4) */}
            <motion.g
              animate={{
                rotate: prepPhase >= 3 ? 0 : -65,
                y: prepPhase >= 3 ? 0 : -8
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: '0px 25px' }}
            >
              {/* Lid Shell */}
              <rect x="0" y="0" width="100" height="26" rx="3" fill="#222230" stroke="#dfb76c" strokeWidth="1.8" />
              {/* Gold Case Plate */}
              <rect x="25" y="6" width="50" height="14" rx="2" fill="#0d0d14" stroke="#dfb76c" strokeWidth="0.8" />
              <text x="50" y="15.5" fill="#dfb76c" fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ZIGGURATSS VAULT
              </text>
              {/* Dual Gold Clasp Latches */}
              <rect x="18" y="20" width="8" height="10" rx="1.5" fill="#dfb76c" />
              <rect x="74" y="20" width="8" height="10" rx="1.5" fill="#dfb76c" />
            </motion.g>

            {/* Lock Confirmation Pin on Phase >= 3 */}
            {prepPhase >= 3 && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <circle cx="50" cy="55" r="8" fill="#101018" stroke="#dfb76c" strokeWidth="1" />
                <Lock size={9} className="text-[#dfb76c]" x="45.5" y="50.5" />
              </motion.g>
            )}
          </g>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 4. CHARACTER: PROFESSIONAL ART CONSERVATOR / HANDLER   */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.g
            animate={{
              // Art handler approaches from right ($X: 600) to workbench ($X: 350)
              x:
                prepPhase === 0
                  ? [580, 480, 360]
                  : prepPhase <= 2
                  ? 360
                  : prepPhase === 3
                  ? 440 // Handler shifts right to place artwork in case
                  : 420,
              opacity: prepPhase === 5 ? [1, 0] : 1
            }}
            transition={{
              duration: prepPhase === 0 ? 2.2 : 0.6,
              ease: prepPhase === 0 ? 'easeInOut' : 'easeOut'
            }}
          >
            {/* Handler Shadow */}
            <ellipse cx="40" cy="272" rx="26" ry="7" fill="url(#prepShadow)" />

            {/* Handler Figure Group */}
            <g transform="translate(25, 125)">
              {/* Head & Hair */}
              <circle cx="15" cy="18" r="9" fill="#dfbe9f" />
              {/* Smart Professional Bun / Coiffure */}
              <path d="M5,16 Q15,8 25,14 Q26,20 22,22 L6,18 Z" fill="#2b231c" />
              <circle cx="24" cy="12" r="4" fill="#2b231c" />

              {/* Conservator Dark Navy Lab Smock / Tailored Apron */}
              <path d="M6,28 Q15,26 24,28 L28,95 Q15,98 2,95 Z" fill="#1c202d" stroke="#dfb76c" strokeWidth="0.8" />
              {/* Golden Studio Badge */}
              <rect x="18" y="36" width="6" height="4" rx="1" fill="#dfb76c" />

              {/* Legs (Subtle walk kinematics on entrance) */}
              <motion.g
                animate={
                  prepPhase === 0
                    ? {
                        rotate: [-6, 6, -6],
                        transition: { duration: 0.5, repeat: 4, ease: 'easeInOut' }
                      }
                    : { rotate: 0 }
                }
                style={{ transformOrigin: '15px 95px' }}
              >
                <rect x="6" y="95" width="7" height="48" rx="2" fill="#12151e" />
                <rect x="16" y="95" width="7" height="48" rx="2" fill="#0f1118" />
                {/* Clean Studio Shoes */}
                <ellipse cx="9" cy="144" rx="7" ry="3.5" fill="#06060a" />
                <ellipse cx="19" cy="144" rx="7" ry="3.5" fill="#06060a" />
              </motion.g>

              {/* Handler Arms & White Cotton Gloves (Kinematics for Inspection, Wrapping & Lifting) */}
              <motion.g
                animate={{
                  // Phase 0: Arms at side
                  // Phase 1: Left hand reaches forward to inspect canvas
                  // Phase 2: Both hands wrap protective material
                  // Phase 3: Arms lift and lower artwork into case
                  // Phase 4: Hands step back in approval
                  rotate:
                    prepPhase === 1
                      ? [-12, -24, -18]
                      : prepPhase === 2
                      ? [-28, -35, -28]
                      : prepPhase === 3
                      ? [-15, -5, -15]
                      : 0,
                  x: prepPhase === 1 ? -15 : prepPhase === 2 ? -22 : prepPhase === 3 ? 10 : 0,
                  y: prepPhase === 1 ? 4 : prepPhase === 2 ? 8 : prepPhase === 3 ? 12 : 0
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transformOrigin: '10px 32px' }}
              >
                {/* Navy Sleeve */}
                <path d="M10,32 Q-4,52 -18,52" stroke="#1c202d" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                {/* White Conservation Cotton Glove */}
                <circle cx="-20" cy="52" r="5" fill="#ffffff" stroke="#d5d5d5" strokeWidth="0.8" />
                {/* Extended Finger Silhouette */}
                <path d="M-22,50 Q-28,48 -32,50" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </motion.g>
            </g>
          </motion.g>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 5. VERIFICATION STAMP & LIVE FLOATING BADGE           */}
          {/* ═══════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {prepPhase >= 4 && (
              <motion.g
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', damping: 20 }}
                transform="translate(420, 65)"
              >
                {/* Floating Capsule */}
                <rect x="0" y="0" width="180" height="34" rx="8" fill="#0d0d14" stroke="#dfb76c" strokeWidth="1.2" filter="drop-shadow(0 10px 25px rgba(223,183,108,0.35))" />
                <circle cx="18" cy="17" r="9" fill="#dfb76c" />
                <path d="M14,17 L17,20 L23,13" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="34" y="16" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                  PREPARATION COMPLETE
                </text>
                <text x="34" y="27" fill="#dfb76c" fontSize="7.5" fontFamily="monospace">
                  Cased & Ready For Transit ✓
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* ── BOTTOM FEATURE TICKER / ARCHIVAL PROTOCOLS ── */}
      <div className="relative z-20 px-3 py-2.5 sm:px-5 sm:py-3 bg-black/60 backdrop-blur-md border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs">
        <div className="flex items-center gap-2 sm:gap-3 text-neutral-300">
          <span className="flex items-center gap-1 text-[#dfb76c] font-medium">
            <Layers size={12} />
            <span>Multi-Layer Archival Cushioning</span>
          </span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400 hidden xs:inline">Reinforced Protective Casing</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#f7d794] font-mono text-[9px] sm:text-[10px]">
          <Sparkles size={11} className="text-[#dfb76c]" />
          <span>Curatorial Handling Protocol</span>
        </div>
      </div>
    </div>
  )
}
