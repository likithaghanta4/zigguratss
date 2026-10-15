import React, { useState, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, CheckCircle2, Shield, RefreshCw, Truck, Award, 
  ZoomIn, ZoomOut, Lock, CreditCard, 
  Clock, AlertTriangle, ArrowRight, Play, Pause, RotateCcw,
  Sparkles, FileText, Check, ChevronRight, Eye, Info,
  Package, MapPin, Plane, Navigation, ShieldCheck, 
  DollarSign, Undo2, Rotate3d, Layers, Landmark, Radio,
  Compass, Search, ArrowLeftRight, CheckCheck, Box
} from 'lucide-react'

// Authentic asset references from repository
import screenshotImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 14-57-58.png'
import flowersImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 15-14-55.png'

/* ==========================================================================
   1. CERTIFICATE OF AUTHENTICITY (COA) MODAL
   - Interactive 3D Certificate Folio that rotates and opens in 3D space
   - Reveals genuine archival document for Divine Tunes-11 by Pradip Sarkar
   - Authentic details: Acrylic on Canvas, 32 × 30 in, 2023, ZG-COA-8849-PS
   - 3D Holographic iridescent security seal, wet-ink artist signature, wax seal
   - Mouse tilt & 360-degree orbit controls
   ========================================================================== */
export function CertificateModal({ onClose }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isRotating, setIsRotating] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const stageRef = useRef(null)

  // Interactive 3D tilt tracking on mouse move
  const handleMouseMove = (e) => {
    if (!stageRef.current || isRotating) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -(y * 18), y: x * 22 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div className="space-y-4 sm:space-y-5 text-neutral-200">
      {/* Header Controls */}
      <div className="flex items-start justify-between gap-3 border-b border-[#dfb76c]/30 pb-3">
        <div>
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.2em] text-[#dfb76c] font-bold block mb-1">
            Archival Provenance Dossier // Protocol 01
          </span>
          <h3 className="font-serif text-lg sm:text-2xl text-white font-normal tracking-tight">
            Certificate of Authenticity
          </h3>
          <p className="text-[11px] sm:text-xs text-neutral-300 font-light mt-0.5">
            Verified origin document signed by master artist <span className="text-[#f7d794] font-medium">Pradip Sarkar</span> for <span className="text-[#f7d794] font-medium">Divine Tunes-11</span>.
          </p>
        </div>

        {/* 3D Interactive Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-2.5 py-1.5 rounded-lg border border-[#dfb76c]/50 bg-[#dfb76c]/15 hover:bg-[#dfb76c]/25 text-[#f7d794] text-[10px] sm:text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            title={isOpen ? "Fold Folio Closed" : "Open Certificate"}
          >
            <Layers size={13} className="text-[#dfb76c]" />
            <span>{isOpen ? 'Fold Cover' : 'Open Certificate'}</span>
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-[10px] sm:text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              isRotating 
                ? 'border-[#dfb76c] bg-[#dfb76c]/25 text-[#f7d794]' 
                : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700'
            }`}
            title="Auto-Rotate 360° in 3D"
          >
            <Rotate3d size={13} className={isRotating ? 'animate-spin text-[#dfb76c]' : ''} />
            <span className="hidden xs:inline">{isRotating ? 'Spinning' : '3D Orbit'}</span>
          </button>
        </div>
      </div>

      {/* ── 3D INTERACTIVE CERTIFICATE STAGE ── */}
      <div 
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full min-h-[360px] xs:min-h-[400px] sm:min-h-[460px] rounded-2xl bg-gradient-to-b from-[#101322] via-[#0b0c16] to-[#06070c] border-2 border-[#dfb76c]/60 shadow-[0_15px_50px_rgba(0,0,0,0.95)] p-3 sm:p-6 flex items-center justify-center overflow-hidden cursor-grab select-none"
        style={{ perspective: '1400px' }}
      >
        {/* Ambient Warm Golden Gallery Spotlight Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#dfb76c]/20 via-[#f7d794]/10 to-transparent blur-3xl pointer-events-none" />
        </div>

        {/* 3D Tilt & Rotational Wrapper */}
        <motion.div
          animate={
            isRotating
              ? { rotateY: [0, 360], rotateX: 6 }
              : { rotateX: tilt.x + 4, rotateY: tilt.y }
          }
          transition={
            isRotating
              ? { duration: 7, repeat: Infinity, ease: 'linear' } // 7-second 3D orbit
              : { type: 'spring', stiffness: 240, damping: 20 }
          }
          className="relative w-full max-w-[560px] transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 3D Certificate Folio Card */}
          <div 
            className="relative rounded-2xl bg-gradient-to-br from-[#1a1b28] via-[#12131d] to-[#090a10] border-2 border-[#dfb76c] shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-500"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Guilloche Gold Corner Brackets */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#dfb76c] pointer-events-none z-20" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#dfb76c] pointer-events-none z-20" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#dfb76c] pointer-events-none z-20" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#dfb76c] pointer-events-none z-20" />

            {/* Inner Parchment Certificate Sheet (Revealed Inside) */}
            <div className="relative p-4 xs:p-5 sm:p-7 bg-[#141520]/95 text-neutral-100 z-10 space-y-4">
              {/* Masthead */}
              <div className="text-center pb-3 border-b border-[#dfb76c]/30 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-[1px] w-6 sm:w-14 bg-gradient-to-r from-transparent to-[#dfb76c]" />
                  <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.26em] text-[#dfb76c] font-bold">
                    ZIGGURATSS MAISON D'ART • STUDIO PROVENANCE
                  </span>
                  <span className="h-[1px] w-6 sm:w-14 bg-gradient-to-l from-transparent to-[#dfb76c]" />
                </div>
                <h4 className="font-serif text-lg xs:text-xl sm:text-2xl tracking-[0.08em] uppercase text-white font-bold">
                  CERTIFICATE OF AUTHENTICITY
                </h4>
                <p className="text-[9px] sm:text-[10.5px] text-neutral-300 font-serif italic max-w-md mx-auto">
                  This document certifies that the work of art recorded herein is an authentic, original creation executed by the undersigned artist.
                </p>
              </div>

              {/* Artwork Plate + Ledger Details */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-5 items-center">
                {/* Framed Canvas Plate */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative p-1.5 rounded-xl bg-black/80 border-2 border-[#dfb76c]/80 shadow-[0_8px_25px_rgba(223,183,108,0.25)]">
                    <img 
                      src={screenshotImage} 
                      alt="Divine Tunes-11 certified masterwork plate" 
                      className="w-28 h-32 xs:w-32 xs:h-36 sm:w-36 sm:h-40 object-contain rounded-lg bg-[#08080c]"
                    />
                    <div className="absolute bottom-2 inset-x-2 bg-black/90 backdrop-blur-md py-0.5 px-1 text-center rounded border border-[#dfb76c]/40">
                      <span className="text-[7.5px] sm:text-[8.5px] font-mono text-[#f7d794] font-semibold tracking-wider">
                        MASTER CANVAS 01
                      </span>
                    </div>
                  </div>
                  <span className="text-[8.5px] font-mono text-neutral-400 mt-1.5">
                    Catalog Ref: ZG-2023-DT11
                  </span>
                </div>

                {/* Ledger Specifications */}
                <div className="sm:col-span-7 space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2 bg-black/50 p-2.5 rounded-lg border border-[#dfb76c]/30">
                    <div>
                      <span className="text-[8px] font-mono uppercase text-neutral-400 block">Title of Work</span>
                      <span className="font-serif font-bold text-white text-[11px] sm:text-xs">Divine Tunes-11</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase text-neutral-400 block">Master Artist</span>
                      <span className="font-semibold text-[#f7d794] text-[11px] sm:text-xs">Pradip Sarkar</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase text-neutral-400 block">Medium</span>
                      <span className="text-neutral-200 text-[10px] sm:text-[11px]">Acrylic on Canvas</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase text-neutral-400 block">Dimensions</span>
                      <span className="text-neutral-200 text-[10px] sm:text-[11px]">32 × 30 in (81.3 × 76.2 cm)</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase text-neutral-400 block">Year Created</span>
                      <span className="text-neutral-200 text-[10px] sm:text-[11px]">2023 (Studio Archival)</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase text-neutral-400 block">Registry Status</span>
                      <span className="text-emerald-400 font-semibold text-[10px] sm:text-[11px] flex items-center gap-1">
                        <CheckCircle2 size={10} /> Verified Original
                      </span>
                    </div>
                  </div>

                  {/* Signatures & 3D Iridescent Holographic Security Stamp */}
                  <div className="flex items-center justify-between pt-1 border-t border-neutral-800 gap-2">
                    {/* Hand Signature Calligraphy */}
                    <div>
                      <span className="font-serif italic text-base sm:text-lg text-[#f7d794] tracking-wide block drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                        Pradip Sarkar
                      </span>
                      <span className="text-[8px] font-mono uppercase text-neutral-400 block -mt-0.5">
                        Artist Hand Signature
                      </span>
                    </div>

                    {/* 3D Iridescent Holographic Seal */}
                    <div 
                      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#dfb76c] bg-gradient-to-tr from-[#dfb76c] via-[#fef08a] to-[#d97706] p-0.5 shadow-[0_0_18px_rgba(223,183,108,0.7)] flex items-center justify-center shrink-0 cursor-pointer group"
                      title="Serialized Tamper-Evident Security Seal"
                    >
                      <div className="w-full h-full rounded-full bg-[#12121c] flex flex-col items-center justify-center text-center p-1 border border-[#dfb76c]/60">
                        <Award size={14} className="text-[#f7d794] animate-pulse" />
                        <span className="text-[6.5px] font-mono font-bold text-[#dfb76c] uppercase tracking-tighter">
                          ZIGGURATSS
                        </span>
                        <span className="text-[5.5px] font-mono text-emerald-400 font-bold">
                          SEALED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Protocol Disclosures */}
              <div className="pt-2 border-t border-[#dfb76c]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[9px] text-neutral-400 font-mono">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <ShieldCheck size={12} className="text-[#dfb76c] shrink-0" />
                  <span>Serialized Code: <strong className="text-[#f7d794]">ZG-COA-8849-PS</strong></span>
                </div>
                <span>Archival Cotton Rag 310 GSM • Wet Ink Counter-Signed</span>
              </div>
            </div>

            {/* ── 3D HINGED LEATHER COVER FOLD ── */}
            <motion.div
              animate={{
                rotateY: isOpen ? -165 : 0,
                opacity: isOpen ? 0.05 : 1,
              }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-br from-[#1c1c28] via-[#12121b] to-[#0a0a10] border-2 border-[#dfb76c] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-[0_15px_50px_rgba(0,0,0,0.95)] z-30 pointer-events-none"
              style={{
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="w-20 h-20 rounded-full border-2 border-[#dfb76c] bg-[#dfb76c]/15 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(223,183,108,0.4)]">
                <Award size={36} className="text-[#dfb76c]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#dfb76c] font-bold block mb-1">
                OFFICIAL PROVENANCE FOLIO
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-tight mb-2">
                ZIGGURATSS MAISON D'ART
              </h3>
              <p className="text-xs text-neutral-300 max-w-xs font-light">
                Registered Fine Art Archival Portfolio. Tap 'Open Certificate' above to review verified origin documents.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Verified Protocol Citation */}
      <div className="p-3 rounded-xl bg-black/60 border border-neutral-800 text-[10.5px] sm:text-xs text-neutral-300 flex items-start gap-2.5">
        <Info size={14} className="text-[#dfb76c] shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#f7d794]">Gallery Protocol:</strong> Every masterwork from Pradip Sarkar on Zigguratss is accompanied by this physical serialized Certificate of Authenticity bearing the tamper-evident holographic stamp and registered catalog index upon dispatch.
        </p>
      </div>
    </div>
  )
}

/* ==========================================================================
   2. SECURED PAYMENT & ESCROW PROTECTION MODAL
   - Clear 3D Payment Animation showing the payment process step by step:
     Step 1: 3D Metallic Gold & Obsidian Card with 256-Bit SSL tokenization
     Step 2: 3D Heavy Escrow Safe / Vault with rotating combination dial & locking pins
     Step 3: 3D Verified Checkmark Medallion with verified settlement handover
   - Explains verified 21-day escrow remittance protocol under Terms Section CH 08
   - Supported payment methods: Visa, Mastercard, RuPay, Net Banking, Escrow
   ========================================================================== */
export function PaymentEscrowModal({ onClose }) {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const steps = [
    {
      id: 0,
      number: '01',
      title: 'Encrypted Checkout',
      subtitle: '256-Bit Bank-Grade Tokenization',
      badge: 'Zero Credential Storage',
      desc: 'Collector initiates payment via high-security payment gateways. Zigguratss never stores sensitive CVV or card PIN credentials on internal servers. Instant encrypted invoice generated with unique transaction ledger.',
      detail: 'Supported: Visa, Mastercard, RuPay, American Express, Net Banking & Wire.'
    },
    {
      id: 1,
      number: '02',
      title: '21-Day Escrow Vault',
      subtitle: 'Official Terms Remittance Protocol',
      badge: 'Protected Gallery Custody',
      desc: 'In accordance with Zigguratss Terms of Use (Section CH 08), 100% of the collector purchase funds are securely locked in the gallery escrow vault. Funds are withheld for 21 days following delivery receipt to ensure total buyer satisfaction.',
      detail: 'If any artwork availability conflict occurs, 100% refund is processed within 24–48 hours (Terms CH 02).'
    },
    {
      id: 2,
      number: '03',
      title: 'Verified Handover & Release',
      subtitle: 'Title Formalization & Settlement',
      badge: 'Satisfaction Inspection Cleared',
      desc: 'Only after the collector receives the artwork and completes their inspection window, the gallery formalizes the title transfer and remits the purchase amount directly to master artist Pradip Sarkar.',
      detail: 'Title transfers with tamper-evident certificate registry and legal provenance bill of sale.'
    }
  ]

  // Auto-play through 3D payment steps (7 seconds full cycle)
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 2333) // 3 steps * 2.33s = 7s full cycle
    return () => clearInterval(timer)
  }, [isPlaying, steps.length])

  return (
    <div className="space-y-4 sm:space-y-5 text-neutral-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-[#dfb76c]/30 pb-3">
        <div>
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.2em] text-[#dfb76c] font-bold block mb-1">
            Collector Protection // Protocol 02
          </span>
          <h3 className="font-serif text-lg sm:text-2xl text-white font-normal tracking-tight">
            Secured Payment & Escrow Protection
          </h3>
          <p className="text-[11px] sm:text-xs text-neutral-300 font-light mt-0.5">
            Step-by-step 3D payment lifecycle and Zigguratss 21-day escrow remittance protocol.
          </p>
        </div>

        {/* Play / Pause Toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-[#dfb76c]/40 bg-[#dfb76c]/10 hover:bg-[#dfb76c]/20 text-[#dfb76c] text-[10px] sm:text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            title={isPlaying ? "Pause Step Animation" : "Resume Auto Steps"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span className="hidden xs:inline">{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
        </div>
      </div>

      {/* 3-Step Interactive Bar */}
      <div className="grid grid-cols-3 gap-2">
        {steps.map((st, i) => {
          const isCurrent = activeStep === i
          return (
            <button
              key={st.id}
              onClick={() => {
                setActiveStep(i)
                setIsPlaying(false)
              }}
              className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isCurrent
                  ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794] shadow-[0_4px_20px_rgba(223,183,108,0.25)]'
                  : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#dfb76c] shadow-[0_0_8px_#dfb76c]" />
              )}
              <span className={`text-[8px] sm:text-[9px] font-mono block mb-0.5 ${isCurrent ? 'text-[#dfb76c] font-bold' : 'text-neutral-500'}`}>
                STEP {st.number}
              </span>
              <span className="font-semibold text-[10px] sm:text-xs truncate block text-white">
                {st.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── 3D VISUAL ANIMATION STAGE PER STEP ── */}
      <div 
        className="relative w-full h-[220px] xs:h-[240px] sm:h-[260px] rounded-2xl bg-gradient-to-b from-[#101426] via-[#0b0e1b] to-[#06070e] border-2 border-[#dfb76c]/60 shadow-[0_12px_45px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden p-3"
        style={{ perspective: '1100px' }}
      >
        {/* Radiant Warm Ambient Light */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-[#dfb76c]/15 via-[#f7d794]/10 to-transparent blur-3xl pointer-events-none" />
        </div>

        {/* STEP 1: 3D METALLIC GOLD CREDIT CARD WITH SSL PARTICLES */}
        {activeStep === 0 && (
          <motion.div
            key="step-card"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative w-64 xs:w-72 sm:w-80 h-36 xs:h-40 sm:h-44 rounded-2xl bg-gradient-to-tr from-[#1a1b2b] via-[#282a3e] to-[#12131b] border-2 border-[#dfb76c] p-4 text-white shadow-[0_15px_45px_rgba(223,183,108,0.4)] flex flex-col justify-between transform-gpu z-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* EMV Microchip & Contactless Wave */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#dfb76c] via-[#fef08a] to-[#ca8a04] border border-[#fef08a] shadow-inner p-1 flex items-center justify-center">
                <div className="w-full h-full border border-black/40 rounded-sm" />
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#dfb76c]/20 border border-[#dfb76c]/50 text-[#f7d794]">
                <Radio size={13} className="animate-pulse" />
                <span className="text-[9px] font-mono font-bold tracking-wider">256-BIT SSL ENCRYPTED</span>
              </div>
            </div>

            {/* Card Number Mask */}
            <div className="my-auto">
              <span className="font-mono text-sm sm:text-base tracking-[0.25em] text-neutral-100 font-semibold drop-shadow">
                4912 •••• •••• 8849
              </span>
              <span className="text-[8.5px] font-mono text-[#f7d794] block mt-0.5">
                ZIGGURATSS COLLECTOR ESCROW TOKEN // SECURE ROUTE
              </span>
            </div>

            {/* Cardholder & Branding */}
            <div className="flex items-center justify-between text-[9px] font-mono uppercase text-neutral-300">
              <span>PRADIP SARKAR • DIVINE TUNES-11</span>
              <span className="text-[#dfb76c] font-bold">VERIFIED GATEWAY</span>
            </div>
          </motion.div>
        )}

        {/* STEP 2: 3D HEAVY GOLD ESCROW VAULT / SAFE */}
        {activeStep === 1 && (
          <motion.div
            key="step-vault"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative flex flex-col items-center justify-center z-10"
          >
            {/* Vault Door Circular Body with Heavy Gold Rings */}
            <div className="relative w-36 h-36 xs:w-40 xs:h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-[#24273c] via-[#141624] to-[#0c0d15] border-4 border-[#dfb76c] shadow-[0_0_55px_rgba(223,183,108,0.55)] flex items-center justify-center">
              {/* Rotating Combination Dial */}
              <motion.div
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-[#dfb76c] bg-neutral-900/90 flex items-center justify-center shadow-inner"
              >
                <Lock size={26} className="text-[#f7d794] animate-pulse" />
              </motion.div>

              {/* 4 Heavy Vault Locking Bolts */}
              <div className="absolute -top-2.5 w-4 h-5 bg-gradient-to-b from-[#dfb76c] to-[#ca8a04] rounded-t border border-[#fef08a]" />
              <div className="absolute -bottom-2.5 w-4 h-5 bg-gradient-to-t from-[#dfb76c] to-[#ca8a04] rounded-b border border-[#fef08a]" />
              <div className="absolute -left-2.5 h-4 w-5 bg-gradient-to-r from-[#dfb76c] to-[#ca8a04] rounded-l border border-[#fef08a]" />
              <div className="absolute -right-2.5 h-4 w-5 bg-gradient-to-l from-[#dfb76c] to-[#ca8a04] rounded-r border border-[#fef08a]" />
            </div>

            {/* Status Badge */}
            <div className="mt-3 px-3 py-1 rounded-full bg-[#dfb76c]/25 border border-[#dfb76c] text-[#f7d794] text-[10px] font-mono font-semibold flex items-center gap-1.5 shadow-lg">
              <Clock size={12} className="text-[#dfb76c]" />
              <span>21-Day Remittance Hold Active (Terms CH 08)</span>
            </div>
          </motion.div>
        )}

        {/* STEP 3: 3D VERIFIED SETTLEMENT MEDALLION */}
        {activeStep === 2 && (
          <motion.div
            key="step-release"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative flex flex-col items-center justify-center text-center z-10"
          >
            {/* Golden Settlement Medallion */}
            <div 
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-[#dfb76c] via-[#fef08a] to-[#ca8a04] p-1 shadow-[0_0_45px_rgba(223,183,108,0.6)] flex items-center justify-center transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-full h-full rounded-xl bg-[#10121d] border border-[#dfb76c] flex flex-col items-center justify-center p-2">
                <CheckCircle2 size={34} className="text-emerald-400 mb-1 drop-shadow" />
                <span className="font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                  FUNDS RELEASED
                </span>
                <span className="font-mono text-[8px] text-[#f7d794]">
                  TO PRADIP SARKAR
                </span>
              </div>
            </div>

            <div className="mt-3 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/60 text-emerald-300 text-[10px] font-mono font-semibold flex items-center gap-1.5 shadow-lg">
              <ShieldCheck size={12} />
              <span>Title Formalized & Collector Inspection Approved</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Dynamic Detail Ledger */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-[#141624] to-[#0e0f18] border border-[#dfb76c]/50 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">
            {steps[activeStep].title}
          </h4>
          <span className="text-[10px] font-mono text-[#f7d794] px-2 py-0.5 rounded-full bg-[#dfb76c]/15 border border-[#dfb76c]/30">
            {steps[activeStep].badge}
          </span>
        </div>
        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          {steps[activeStep].desc}
        </p>
        <div className="p-2 rounded-lg bg-black/60 border border-neutral-800 text-[10px] text-neutral-300 flex items-center gap-2">
          <CheckCircle2 size={12} className="text-[#dfb76c] shrink-0" />
          <span>{steps[activeStep].detail}</span>
        </div>
      </div>

      {/* Supported Payment Channels */}
      <div className="space-y-1.5 pt-0.5">
        <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
          Accepted Payment Methods
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 flex items-center justify-center gap-1.5">
            <CreditCard size={13} className="text-[#dfb76c]" />
            <span className="font-medium text-[11px]">Visa / Mastercard</span>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 flex items-center justify-center gap-1.5">
            <Shield size={13} className="text-[#dfb76c]" />
            <span className="font-medium text-[11px]">RuPay / Amex</span>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 flex items-center justify-center gap-1.5">
            <Lock size={13} className="text-[#dfb76c]" />
            <span className="font-medium text-[11px]">Direct Net Banking</span>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 flex items-center justify-center gap-1.5">
            <Award size={13} className="text-[#dfb76c]" />
            <span className="font-medium text-[11px]">Escrow Settlement</span>
          </div>
        </div>
      </div>

      {/* Verified Zigguratss Terms Legal Citation */}
      <div className="p-3 rounded-lg bg-black/60 border border-neutral-800 text-[10px] text-neutral-400 flex items-start gap-2">
        <FileText size={13} className="text-[#dfb76c] shrink-0 mt-0.5" />
        <p>
          <strong className="text-neutral-200">Legal Citation:</strong> Under Zigguratss Terms of Use (Section CH 03 & CH 08), title transfer is formalized upon verified payment. Artist remittance occurs precisely 21 days following delivery handover to safeguard collector satisfaction.
        </p>
      </div>
    </div>
  )
}

/* ==========================================================================
   3. 14-DAY MONEY BACK GUARANTEE & REFUND POLICY MODAL
   - 3D Rotating Golden Warranty Seal & Return Process Animation
   - Stage-by-stage interactive visualization:
     Stage 1: Day 0–14 In-Home Curatorial Inspection
     Stage 2: 1-Click Reverse Pickup Authorization (Prepaid)
     Stage 3: Insured Reverse Courier Pickup in Archival Tube
     Stage 4: 100% Direct Account Refund in 24–48 Hours
   - Genuine policy from TermsAndConditions.jsx CH 04 & CH 05
   ========================================================================== */
export function GuaranteeModal({ onClose }) {
  const [activeStage, setActiveStage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const stages = [
    {
      id: 0,
      title: 'In-Home Inspection',
      time: 'Day 0 to 14',
      badge: 'Unbox & Review Canvas',
      desc: 'Collector receives Divine Tunes-11 in archival packaging. Take up to 14 days to examine the artwork, canvas texture, and certificate of authenticity under your home lighting.',
      action: 'Curatorial guidance available via private art advisory.',
      icon: Search
    },
    {
      id: 1,
      title: 'Hassle-Free Return Notice',
      time: 'Within 14 Days',
      badge: 'Zero Question Hassle',
      desc: 'If not completely delighted with your acquisition, notify our curatorial concierge team online or via email. A dedicated return authorization is instantly created.',
      action: 'For transit damage, report within 24h of delivery as per Terms CH 04.',
      icon: ArrowLeftRight
    },
    {
      id: 2,
      title: 'Free White-Glove Pickup',
      time: 'Insured Reverse Transit',
      badge: 'Zero Return Shipping Fee',
      desc: 'Our insured logistics courier conducts white-glove reverse pickup directly from your doorstep. Artwork is repacked into its reinforced, shock-absorbent archival tube.',
      action: 'All transit insurance covered 100% by Zigguratss.',
      icon: Box
    },
    {
      id: 3,
      title: '100% Direct Refund',
      time: '24 to 48 Hours',
      badge: 'Zero Restocking Deduction',
      desc: 'Upon verification of the returned canvas at our fulfillment studio, 100% of your acquisition payment (₹1,18,300) is credited back directly to your original payment method.',
      action: 'Immediate electronic credit confirmation sent.',
      icon: CheckCheck
    }
  ]

  // Auto-play through guarantee lifecycle stages (7 seconds full cycle)
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length)
    }, 1750) // 4 stages * 1.75s = 7s full cycle
    return () => clearInterval(timer)
  }, [isPlaying, stages.length])

  return (
    <div className="space-y-4 sm:space-y-5 text-neutral-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-[#dfb76c]/30 pb-3">
        <div>
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.2em] text-[#dfb76c] font-bold block mb-1">
            Collector Confidence // Protocol 03
          </span>
          <h3 className="font-serif text-lg sm:text-2xl text-white font-normal tracking-tight">
            14-Day Money Back Guarantee
          </h3>
          <p className="text-[11px] sm:text-xs text-neutral-300 font-light mt-0.5">
            Transparent 3D return and refund lifecycle for certified original masterworks.
          </p>
        </div>

        {/* Play / Pause Toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-[#dfb76c]/40 bg-[#dfb76c]/10 hover:bg-[#dfb76c]/20 text-[#dfb76c] text-[10px] sm:text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            title={isPlaying ? "Pause Stage Cycle" : "Resume Stage Cycle"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span className="hidden xs:inline">{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
        </div>
      </div>

      {/* ── 3D RETURN & REFUND LIFECYCLE STAGE ── */}
      <div 
        className="relative w-full h-[220px] xs:h-[240px] sm:h-[260px] rounded-2xl bg-gradient-to-b from-[#101426] via-[#0b0e1b] to-[#06070e] border-2 border-[#dfb76c]/60 shadow-[0_12px_45px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden p-3"
        style={{ perspective: '1100px' }}
      >
        {/* Warm Ambient Spotlight */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-[#dfb76c]/15 via-[#f7d794]/10 to-transparent blur-3xl pointer-events-none" />
        </div>

        {/* 3D Visual Scene per Selected Stage */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 z-10 w-full max-w-lg px-2">
          {/* 3D Guarantee Medallion (Always Visible & Rotating) */}
          <motion.div
            animate={{
              rotateY: [-16, 16, -16],
              rotateX: [6, -6, 6]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex flex-col items-center justify-center transform-gpu shrink-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#dfb76c] via-[#fef08a] to-[#ca8a04] p-1 shadow-[0_0_40px_rgba(223,183,108,0.55)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#10121d] border border-[#dfb76c] flex flex-col items-center justify-center text-center p-2">
                <Award size={22} className="text-[#f7d794] mb-0.5" />
                <span className="font-serif text-xs sm:text-sm font-bold text-white tracking-wider">
                  14-DAY
                </span>
                <span className="font-mono text-[7.5px] uppercase tracking-widest text-[#dfb76c] font-semibold">
                  MONEY BACK
                </span>
                <span className="text-[7px] font-mono text-emerald-400 font-bold mt-0.5">
                  100% REFUND
                </span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Stage Visual Feature Box */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1.5 flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfb76c]/20 border border-[#dfb76c]/60 text-[#f7d794] text-[10px] font-mono font-semibold shadow-md">
              <RefreshCw size={11} className="text-[#dfb76c] animate-spin" />
              <span>Step 0{activeStage + 1}: {stages[activeStage].time}</span>
            </div>

            <h4 className="font-serif text-base sm:text-lg text-white font-medium">
              {stages[activeStage].title}
            </h4>

            <p className="text-[11px] text-neutral-300 line-clamp-2 max-w-sm">
              {stages[activeStage].desc}
            </p>

            <div className="flex items-center gap-2 pt-1 text-[9.5px] font-mono text-emerald-400">
              <CheckCircle2 size={13} className="shrink-0" />
              <span>{stages[activeStage].badge}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Stage Interactive Process Timeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stages.map((st, i) => {
          const isCurrent = activeStage === i
          const Icon = st.icon
          return (
            <button
              key={st.id}
              onClick={() => {
                setActiveStage(i)
                setIsPlaying(false)
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isCurrent
                  ? 'bg-[#dfb76c]/25 border-[#dfb76c] text-[#f7d794] shadow-[0_4px_20px_rgba(223,183,108,0.25)]'
                  : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#dfb76c] shadow-[0_0_8px_#dfb76c]" />
              )}
              <div className="flex items-center justify-between text-[8px] font-mono text-[#dfb76c] font-bold mb-1">
                <span>0{i + 1}</span>
                <span>{st.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon size={12} className={isCurrent ? 'text-[#f7d794]' : 'text-neutral-500'} />
                <span className="font-semibold text-[11px] truncate block text-white">
                  {st.title}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Stage Detailed Card */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-[#141624] to-[#0e0f18] border border-[#dfb76c]/50 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">
            {stages[activeStage].title}
          </h4>
          <span className="text-[10px] font-mono text-[#f7d794] px-2 py-0.5 rounded-full bg-[#dfb76c]/15 border border-[#dfb76c]/30">
            {stages[activeStage].badge}
          </span>
        </div>
        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          {stages[activeStage].desc}
        </p>
        <div className="p-2 rounded-lg bg-black/60 border border-neutral-800 text-[10px] text-neutral-300 flex items-center gap-2">
          <CheckCircle2 size={12} className="text-[#dfb76c] shrink-0" />
          <span>{stages[activeStage].action}</span>
        </div>
      </div>

      {/* Verified Legal Terms Citation */}
      <div className="p-3 rounded-lg bg-black/60 border border-neutral-800 text-[10px] text-neutral-400 flex items-start gap-2">
        <FileText size={13} className="text-[#dfb76c] shrink-0 mt-0.5" />
        <p>
          <strong className="text-neutral-200">Legal Citation (Terms CH 04 & CH 05):</strong> All artwork acquisitions are protected by our satisfaction review protocol. In the event of transit damage, notification is required within 24 hours of receipt with unboxing photos for immediate zero-deduction refund.
        </p>
      </div>
    </div>
  )
}

/* ==========================================================================
   4. FREE WORLDWIDE INSURED AIR SHIPPING SCENE (ANIMATED ROAD TRANSIT TRUCK)
   - High-fidelity animated delivery truck driving along a scenic highway road
   - Zigguratss Maison d'Art luxury art-transit vehicle in obsidian black & gold
   - High-beam LED headlights illuminating the road, spinning wheels, road markings
   - Cutaway view showcasing Divine Tunes-11 secured in climate-controlled suspension
   - Roadside mileposts, streetlamps, passing skyline, and live telemetry HUD
   ========================================================================== */
export function GlobalShippingJourneyScene({ onClose }) {
  const [progress, setProgress] = useState(0) // 0 to 100%
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeSegmentIdx, setActiveSegmentIdx] = useState(0)
  const [transitMode, setTransitMode] = useState('expressway') // 'expressway' | 'doorstep'
  const requestRef = useRef(null)
  const lastTimeRef = useRef(null)

  // 4 Road Transit Milestones from Vault to Collector's Doorstep
  const TRANSIT_MILESTONES = useMemo(() => [
    { id: 0, code: 'VAULT-01', name: 'Zigguratss Native Vault', role: 'Archivally Sealed & Loaded', pct: 0, speed: '45 KM/H' },
    { id: 1, code: 'CORRIDOR-02', name: 'Airport Express Highway', role: 'Priority Fine-Art Transit', pct: 30, speed: '82 KM/H' },
    { id: 2, code: 'DIST-03', name: 'Regional Collector Hub', role: 'Customs & Escort Handover', pct: 70, speed: '65 KM/H' },
    { id: 3, code: 'ESTATE-04', name: 'Collector Private Residence', role: 'White-Glove Doorstep Handover', pct: 100, speed: '25 KM/H' }
  ], [])

  // 7-second smooth journey loop
  useEffect(() => {
    const animate = (time) => {
      if (lastTimeRef.current !== null && isPlaying) {
        const delta = (time - lastTimeRef.current) / 1000
        setProgress((prev) => {
          const next = prev + delta * (100 / 7)
          return next > 100 ? 0 : next
        })
      }
      lastTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isPlaying])

  // Update active milestone based on progress
  useEffect(() => {
    const currentIdx = TRANSIT_MILESTONES.findIndex((m, i) => {
      const nextM = TRANSIT_MILESTONES[i + 1]
      return !nextM || progress < nextM.pct
    })
    if (currentIdx !== -1) {
      setActiveSegmentIdx(currentIdx)
    }
  }, [progress, TRANSIT_MILESTONES])

  const currentMilestone = TRANSIT_MILESTONES[activeSegmentIdx] || TRANSIT_MILESTONES[0]

  return (
    <div className="space-y-3 sm:space-y-4 text-neutral-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-[#dfb76c]/30 pb-2.5">
        <div>
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.2em] text-[#dfb76c] font-bold block mb-0.5">
            White-Glove Road Transit // Protocol 04
          </span>
          <h3 className="font-serif text-lg sm:text-2xl text-white font-normal tracking-tight">
            Climate-Controlled Art Road Transit
          </h3>
          <p className="text-[11px] sm:text-xs text-[#f7d794] font-light mt-0.5">
            Custom Mercedes-Benz fine-art transport van traveling on express road to collector's residence.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-0.5 flex items-center mr-1">
            <button
              onClick={() => { setTransitMode('expressway'); setProgress(0) }}
              className={`px-2 py-1 rounded text-[9.5px] font-mono font-medium transition-all cursor-pointer ${
                transitMode === 'expressway' ? 'bg-[#dfb76c] text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Expressway
            </button>
            <button
              onClick={() => { setTransitMode('doorstep'); setProgress(0) }}
              className={`px-2 py-1 rounded text-[9.5px] font-mono font-medium transition-all cursor-pointer ${
                transitMode === 'doorstep' ? 'bg-[#dfb76c] text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Doorstep
            </button>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-[#dfb76c]/40 bg-[#dfb76c]/10 hover:bg-[#dfb76c]/20 text-[#dfb76c] text-[10px] sm:text-xs font-mono font-medium flex items-center gap-1 transition-all cursor-pointer"
            title={isPlaying ? "Pause Transit" : "Resume Transit"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span className="hidden xs:inline">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => setProgress(0)}
            className="p-1.5 sm:p-2 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-all cursor-pointer"
            title="Restart Transit"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

{/* ── CINEMATIC HIGHWAY ROADWAY & ANIMATED DELIVERY TRUCK CANVAS ── */}
      <div 
        className="relative w-full h-[260px] xs:h-[300px] sm:h-[340px] md:h-[370px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#070b16] via-[#091024] to-[#04060d] border-2 border-[#dfb76c]/70 shadow-[0_12px_45px_rgba(0,0,0,0.95)] select-none flex flex-col justify-between"
      >
        {/* Top Telemetry Overlay */}
        <div className="relative z-20 flex items-center justify-between px-3 pt-2.5 sm:px-4 sm:pt-3">
          <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#dfb76c]/60 shadow-lg text-[9.5px] font-mono text-[#f7d794]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">ZIGGURATSS ART EXPRESS VAN</span>
            <span className="text-neutral-500">•</span>
            <span className="text-white">{currentMilestone.speed}</span>
            <span className="text-neutral-500">•</span>
            <span className="text-emerald-400">CLIMATE: 21°C / 48% RH</span>
          </div>

          <div className="bg-black/85 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/50 shadow-lg text-[9.5px] font-mono text-emerald-400 font-semibold hidden xs:flex items-center gap-1.5">
            <ShieldCheck size={11} />
            <span>PNEUMATIC ACTIVE AIR SUSPENSION (0.01G)</span>
          </div>
        </div>

        {/* ── ANIMATED VECTOR ROADWAY & DELIVERY TRUCK SCENE ── */}
        <div className="relative w-full flex-1 overflow-hidden">
          <svg viewBox="0 0 900 360" className="w-full h-full object-cover">
            <defs>
              {/* Sky Background Gradient */}
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#080e1e" />
                <stop offset="60%" stopColor="#101a35" />
                <stop offset="100%" stopColor="#1a274a" />
              </linearGradient>

              {/* Road Asphalt Gradient */}
              <linearGradient id="asphaltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e2433" />
                <stop offset="35%" stopColor="#141824" />
                <stop offset="100%" stopColor="#0a0d14" />
              </linearGradient>

              {/* Headlight Golden Beam Gradient */}
              <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dfb76c" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#fef08a" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#dfb76c" stopOpacity="0" />
              </linearGradient>

              {/* Truck Container Gold Metallic Gradient */}
              <linearGradient id="truckBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1c202d" />
                <stop offset="50%" stopColor="#12151e" />
                <stop offset="100%" stopColor="#0a0c12" />
              </linearGradient>

              <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dfb76c" />
                <stop offset="50%" stopColor="#fffbeb" />
                <stop offset="100%" stopColor="#dfb76c" />
              </linearGradient>

              {/* Wheel Rim Gradient */}
              <radialGradient id="wheelRim">
                <stop offset="0%" stopColor="#f7d794" />
                <stop offset="60%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </radialGradient>

              {/* Golden Glow Filter */}
              <filter id="goldGlowTruck" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Night Sky with Distant Stars */}
            <rect x="0" y="0" width="900" height="210" fill="url(#skyGrad)" />
            <g opacity="0.6">
              <circle cx="80" cy="35" r="1.5" fill="#fff" />
              <circle cx="160" cy="65" r="1" fill="#fff" />
              <circle cx="280" cy="40" r="1.8" fill="#fef08a" />
              <circle cx="390" cy="80" r="1.2" fill="#fff" />
              <circle cx="510" cy="30" r="1" fill="#fff" />
              <circle cx="650" cy="55" r="1.6" fill="#fff" />
              <circle cx="780" cy="45" r="1" fill="#fef08a" />
              <circle cx="860" cy="70" r="1.4" fill="#fff" />
            </g>

            {/* Distant Mountains / Hills Silhouette */}
            <path
              d="M 0 175 Q 120 145 220 165 T 460 150 T 680 160 T 900 155 L 900 210 L 0 210 Z"
              fill="#0e172a"
              opacity="0.85"
            />

            {/* Distant Illuminated City Skyline Silhouettes */}
            <g fill="#0b1220" opacity="0.9">
              <rect x="70" y="130" width="30" height="80" />
              <rect x="115" y="115" width="22" height="95" />
              <rect x="150" y="140" width="35" height="70" />
              <rect x="340" y="125" width="26" height="85" />
              <rect x="380" y="105" width="38" height="105" />
              <rect x="435" y="135" width="28" height="75" />
              <rect x="620" y="120" width="32" height="90" />
              <rect x="670" y="110" width="40" height="100" />
              <rect x="730" y="135" width="30" height="75" />
            </g>

            {/* City Window Glimmers */}
            <g fill="#fef08a" opacity="0.4">
              <circle cx="126" cy="125" r="1" />
              <circle cx="126" cy="135" r="1" />
              <circle cx="398" cy="120" r="1.2" />
              <circle cx="406" cy="132" r="1.2" />
              <circle cx="685" cy="125" r="1" />
              <circle cx="695" cy="135" r="1" />
            </g>

            {/* ── THE ROAD BED (Asphalt, Kerbs & Markings) ── */}
            <rect x="0" y="210" width="900" height="150" fill="url(#asphaltGrad)" />

            {/* Road Shoulder / Guardrail with Reflective Studs */}
            <line x1="0" y1="210" x2="900" y2="210" stroke="#334155" strokeWidth="4" />
            <line 
              x1="0" 
              y1="213" 
              x2="900" 
              y2="213" 
              stroke="#dfb76c" 
              strokeWidth="1.8" 
              strokeDasharray="8 24" 
              strokeOpacity="0.8"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="320"
                dur={isPlaying ? "1.6s" : "0s"}
                repeatCount="indefinite"
              />
            </line>
            <line x1="0" y1="356" x2="900" y2="356" stroke="#475569" strokeWidth="4" />

            {/* Road Guardrail Posts */}
            <g stroke="#64748b" strokeWidth="2.5" opacity="0.7">
              <line x1="60" y1="200" x2="60" y2="210" />
              <line x1="180" y1="200" x2="180" y2="210" />
              <line x1="300" y1="200" x2="300" y2="210" />
              <line x1="420" y1="200" x2="420" y2="210" />
              <line x1="540" y1="200" x2="540" y2="210" />
              <line x1="660" y1="200" x2="660" y2="210" />
              <line x1="780" y1="200" x2="780" y2="210" />
            </g>

            {/* Animated Highway Center Lane Dashes (Moving Right to Left = Forward Vehicle Travel) */}
            <g stroke="#fef08a" strokeWidth="4" strokeLinecap="round" opacity="0.95">
              <line
                x1="0"
                y1="285"
                x2="900"
                y2="285"
                strokeDasharray="45 35"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="800"
                  dur={isPlaying ? "1.6s" : "0s"}
                  repeatCount="indefinite"
                />
              </line>
            </g>

            {/* Overhead Streetlamps Sweeping Light Cones on the Road (Passing from Front to Rear) */}
            <g opacity="0.35">
              <animateTransform
                attributeName="transform"
                type="translate"
                from="450 0"
                to="-450 0"
                dur={isPlaying ? "3.2s" : "0s"}
                repeatCount="indefinite"
              />
              <polygon points="120,160 80,260 200,260" fill="url(#headlightBeam)" />
              <polygon points="570,160 530,260 650,260" fill="url(#headlightBeam)" />
              <polygon points="1020,160 980,260 1100,260" fill="url(#headlightBeam)" />
            </g>

            {/* Roadside Destination Milestone Signs (Passing from Ahead to Behind) */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                from="950 165"
                to="-200 165"
                dur={isPlaying ? "6.2s" : "0s"}
                repeatCount="indefinite"
              />
              <rect x="0" y="0" width="135" height="40" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1.8" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.8))" />
              <text x="10" y="16" fill="#fff" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                ESTATE ACCESS ➔ 12 KM
              </text>
              <text x="10" y="29" fill="#fef08a" fontSize="7.5" fontFamily="monospace">
                WHITE-GLOVE DIRECT
              </text>
            </g>

            {/* ── LUXURY ZIGGURATSS ART TRANSIT TRUCK (Center Stage) ── */}
            <g transform="translate(240, 160)">
              {/* Headlight Forward Cone of Illuminating Beam */}
              <polygon
                points="340,75 780,15 840,140 340,105"
                fill="url(#headlightBeam)"
                opacity="0.85"
                filter="url(#goldGlowTruck)"
              />

              {/* Truck Ground Shadow */}
              <ellipse cx="170" cy="120" rx="195" ry="14" fill="#000" opacity="0.75" />

              {/* Gentle Vertical Suspension Bounce Animation Group */}
              <g className={isPlaying ? "animate-pulse" : ""}>
                {/* ── 1. MAIN CARGO BOX ── */}
                <rect
                  x="20"
                  y="12"
                  width="220"
                  height="96"
                  rx="6"
                  fill="url(#truckBodyGrad)"
                  stroke="#dfb76c"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 6px 20px rgba(0,0,0,0.9))"
                />

                {/* Golden Architectural Trim on Cargo Box */}
                <line x1="20" y1="20" x2="240" y2="20" stroke="url(#goldTrim)" strokeWidth="2.5" />
                <line x1="20" y1="100" x2="240" y2="100" stroke="url(#goldTrim)" strokeWidth="2.5" />

                {/* Zigguratss Maison d'Art Branding on Truck Side */}
                <text x="130" y="44" textAnchor="middle" fill="#f7d794" fontSize="13" fontFamily="serif" fontWeight="bold" letterSpacing="2">
                  ZIGGURATSS
                </text>
                <text x="130" y="56" textAnchor="middle" fill="#dfb76c" fontSize="8" fontFamily="sans-serif" letterSpacing="3">
                  MAISON D'ART
                </text>
                <text x="130" y="70" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">
                  WHITE-GLOVE FINE ART LOGISTICS
                </text>

                {/* Glass Cutaway Window revealing the Secured Archival Crate of Divine Tunes-11 */}
                <rect
                  x="75"
                  y="76"
                  width="110"
                  height="22"
                  rx="3"
                  fill="#080c14"
                  stroke="#dfb76c"
                  strokeWidth="1.2"
                />
                <circle cx="85" cy="87" r="3" fill="#10b981" className="animate-ping" />
                <circle cx="85" cy="87" r="2.5" fill="#10b981" />
                <text x="96" y="90" fill="#fef08a" fontSize="7" fontFamily="monospace" fontWeight="bold">
                  DIVINE TUNES-11 // SECURED
                </text>

                {/* ── 2. TRUCK DRIVER CABIN (AERODYNAMIC MERCEDES / MAN STYLE) ── */}
                <path
                  d="
                    M 240 38
                    L 285 38
                    L 315 65
                    L 340 75
                    L 340 108
                    L 240 108
                    Z
                  "
                  fill="url(#truckBodyGrad)"
                  stroke="#dfb76c"
                  strokeWidth="2.5"
                />

                {/* Windshield & Cabin Side Window */}
                <polygon
                  points="250,45 282,45 305,68 250,68"
                  fill="#1e293b"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                {/* Driver Silhouette */}
                <circle cx="268" cy="56" r="5" fill="#0f172a" />
                <path d="M 260 68 Q 268 62 276 68 Z" fill="#0f172a" />

                {/* Aerodynamic Air Deflector on Cab Roof */}
                <path d="M 238 20 Q 275 22 285 38 L 240 38 Z" fill="#1e293b" stroke="#dfb76c" strokeWidth="1.5" />

                {/* Front Chrome Bumper & Honeycomb Grille */}
                <rect x="330" y="85" width="12" height="22" rx="2" fill="#334155" stroke="#94a3b8" strokeWidth="1.2" />

                {/* High-Beam LED Headlight Housing */}
                <polygon points="334,76 342,78 342,88 334,86" fill="#fef08a" stroke="#dfb76c" strokeWidth="1.5" filter="url(#goldGlowTruck)" />
                <circle cx="338" cy="82" r="3.5" fill="#fff" />

                {/* Rear Tail Light (Red LED) */}
                <rect x="18" y="85" width="4" height="15" rx="1" fill="#ef4444" filter="url(#goldGlowTruck)" />

                {/* ── 3. CHASSIS UNDERCARRIAGE & SIDE SKIRTS ── */}
                <rect x="25" y="104" width="295" height="8" rx="2" fill="#0f172a" />
                {/* Chrome Fuel / Battery Pack Tank */}
                <rect x="135" y="98" width="55" height="12" rx="3" fill="#334155" stroke="#64748b" strokeWidth="1" />

                {/* ── 4. WHEELS WITH ROTATING CHROME RIMS & RUBBER TIRES ── */}
                {/* Front Steering Wheel */}
                <g transform="translate(290, 114)">
                  <circle cx="0" cy="0" r="19" fill="#0a0a0c" stroke="#334155" strokeWidth="3" />
                  <circle cx="0" cy="0" r="14" fill="url(#wheelRim)" stroke="#dfb76c" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="4.5" fill="#dfb76c" />
                  {/* Rotating Spokes (Clockwise Forward Roll) */}
                  <g stroke="#f7d794" strokeWidth="1.5">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 0 0"
                      to="360 0 0"
                      dur={isPlaying ? "0.6s" : "0s"}
                      repeatCount="indefinite"
                    />
                    <line x1="0" y1="-12" x2="0" y2="12" />
                    <line x1="-12" y1="0" x2="12" y2="0" />
                    <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
                    <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" />
                  </g>
                </g>

                {/* Dual Rear Drive Wheels */}
                <g transform="translate(80, 114)">
                  <circle cx="0" cy="0" r="19" fill="#0a0a0c" stroke="#334155" strokeWidth="3" />
                  <circle cx="0" cy="0" r="14" fill="url(#wheelRim)" stroke="#dfb76c" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="4.5" fill="#dfb76c" />
                  <g stroke="#f7d794" strokeWidth="1.5">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 0 0"
                      to="360 0 0"
                      dur={isPlaying ? "0.6s" : "0s"}
                      repeatCount="indefinite"
                    />
                    <line x1="0" y1="-12" x2="0" y2="12" />
                    <line x1="-12" y1="0" x2="12" y2="0" />
                    <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
                    <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" />
                  </g>
                </g>

                <g transform="translate(122, 114)">
                  <circle cx="0" cy="0" r="19" fill="#0a0a0c" stroke="#334155" strokeWidth="3" />
                  <circle cx="0" cy="0" r="14" fill="url(#wheelRim)" stroke="#dfb76c" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="4.5" fill="#dfb76c" />
                  <g stroke="#f7d794" strokeWidth="1.5">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 0 0"
                      to="360 0 0"
                      dur={isPlaying ? "0.6s" : "0s"}
                      repeatCount="indefinite"
                    />
                    <line x1="0" y1="-12" x2="0" y2="12" />
                    <line x1="-12" y1="0" x2="12" y2="0" />
                    <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
                    <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" />
                  </g>
                </g>
              </g>
            </g>
          </svg>

        </div>

        {/* Live Bottom Telemetry & Milestone Scrubber */}
        <div className="relative z-20 mx-2.5 mb-2.5 flex items-center justify-between text-[9.5px] font-mono text-neutral-200 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#dfb76c]/50 shadow-lg">
          <div className="flex items-center gap-2">
            <Truck size={13} className="text-[#dfb76c]" />
            <span>Active Milestone: <strong className="text-white">{currentMilestone.name}</strong> ({currentMilestone.role})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden hidden xs:block">
              <span className="h-full bg-[#dfb76c] block transition-all duration-200" style={{ width: `${progress}%` }} />
            </span>
            <span className="text-[#f7d794] font-bold">{Math.round(progress)}% Journey Complete</span>
          </div>
        </div>
      </div>

            {/* 3 Pillars of Zigguratss Global Shipping */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
        <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center gap-1.5 text-[#dfb76c]">
            <Package size={14} />
            <span className="font-semibold text-white">Archival Art Tube</span>
          </div>
          <p className="text-[10px] text-neutral-300 leading-snug">
            Acid-free protective wrapping encased in shock-absorbent reinforced cylinder.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center gap-1.5 text-[#dfb76c]">
            <ShieldCheck size={14} />
            <span className="font-semibold text-white">100% Transit Insurance</span>
          </div>
          <p className="text-[10px] text-neutral-300 leading-snug">
            Full valuation (₹1,18,300) covered across global air freight and domestic legs.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center gap-1.5 text-[#dfb76c]">
            <CheckCircle2 size={14} />
            <span className="font-semibold text-white">White-Glove Handover</span>
          </div>
          <p className="text-[10px] text-neutral-300 leading-snug">
            Delivered directly to your residence with physical serialized COA inspection.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   5. OVERLAY MANAGER MODAL (PORTAL)
   ========================================================================== */
export default function ProductGuidelineOverlayManager({
  activeGuideline,
  isPinned,
  onClose,
  onPin,
  onMouseEnter,
  onMouseLeave
}) {
  const modalRef = useRef(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (activeGuideline) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeGuideline, onClose])

  if (!activeGuideline || typeof document === 'undefined') return null

  const modalElement = (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="dialog"
        aria-modal="true"
        aria-label="Guideline Information Modal"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.93, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 18 }}
          transition={{ type: 'spring', damping: 28, stiffness: 360 }}
          onClick={() => {
            if (onPin && !isPinned) {
              onPin()
            }
          }}
          className="relative w-full max-w-2xl sm:max-w-3xl bg-[#0b0c14] border-2 border-[#dfb76c]/60 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-4 sm:p-6 md:p-7 max-h-[92vh] overflow-y-auto my-auto ring-1 ring-[#dfb76c]/30"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#dfb76c #1a1a24' }}
        >
          {/* 7-Second Animated Countdown Progress Bar in Preview Mode */}
          {!isPinned && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-800/80 overflow-hidden rounded-t-2xl z-40">
              <motion.div
                key={activeGuideline}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 7, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-[#dfb76c] via-[#f7d794] to-[#dfb76c]"
              />
            </div>
          )}

          {/* Header Controls: Preview Status Indicator & Close Button */}
          <div className="absolute top-3.5 right-3.5 sm:top-4.5 sm:right-4.5 flex items-center gap-2 z-30">
            {!isPinned ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (onPin) onPin()
                }}
                className="hidden xs:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 hover:bg-[#dfb76c]/20 border border-[#dfb76c]/40 text-[#dfb76c] text-[10px] sm:text-[11px] font-mono tracking-wider shadow-md transition-all cursor-pointer"
                title="Click to Keep Open / Pin Modal"
              >
                <Clock size={11} className="text-[#dfb76c]" />
                <span>Preview Mode • 7s (Click to Pin)</span>
              </button>
            ) : (
              <span className="hidden xs:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] sm:text-[11px] font-mono tracking-wider shadow-md">
                <Check size={11} />
                <span>Pinned Active</span>
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 border border-neutral-700 hover:border-[#dfb76c] text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:rotate-90 duration-200"
              aria-label="Close panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Render Active Guideline Content */}
          {activeGuideline === 'authenticity' && (
            <CertificateModal onClose={onClose} />
          )}

          {activeGuideline === 'escrow' && (
            <PaymentEscrowModal onClose={onClose} />
          )}

          {activeGuideline === 'guarantee' && (
            <GuaranteeModal onClose={onClose} />
          )}

          {activeGuideline === 'shipping' && (
            <GlobalShippingJourneyScene onClose={onClose} />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )

  return createPortal(modalElement, document.body)
}
