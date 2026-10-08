import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Plane, Compass, Shield, Clock, 
  Globe, Sparkles, Radio, Send, Wind, Gauge, CheckCircle2
} from 'lucide-react'

// Math helper for smooth closed-loop Bézier keyframes around the world
function generateWorldFlightTrajectory() {
  const segments = [
    // 1. Depart Zigguratss Native Base (India) -> Middle East (Dubai)
    { p0: { x: 570, y: 260 }, p1: { x: 530, y: 220 }, p2: { x: 485, y: 215 }, name: 'Middle East Gateway' },
    // 2. Dubai -> European Art Hub (London / Paris)
    { p0: { x: 485, y: 215 }, p1: { x: 450, y: 160 }, p2: { x: 405, y: 130 }, name: 'Europe Corridor' },
    // 3. London / Europe -> Americas Art Port (New York) - Transatlantic Crossing
    { p0: { x: 405, y: 130 }, p1: { x: 300, y: 95 },  p2: { x: 210, y: 145 }, name: 'Transatlantic Flight' },
    // 4. New York -> West Coast Gateway (California / LA)
    { p0: { x: 210, y: 145 }, p1: { x: 165, y: 165 }, p2: { x: 125, y: 185 }, name: 'North Americas Coast' },
    // 5. West Coast -> South America Art Hub (São Paulo)
    { p0: { x: 125, y: 185 }, p1: { x: 185, y: 270 }, p2: { x: 255, y: 350 }, name: 'South Americas Hub' },
    // 6. South America -> Africa Hub (Cairo / South Africa)
    { p0: { x: 255, y: 350 }, p1: { x: 355, y: 385 }, p2: { x: 455, y: 310 }, name: 'Trans-African Route' },
    // 7. Africa -> Asia-Pacific Gateway (Singapore & Tokyo)
    { p0: { x: 455, y: 310 }, p1: { x: 580, y: 360 }, p2: { x: 690, y: 280 }, name: 'Asia-Pacific Link' },
    // 8. Asia-Pacific -> Homecoming return to Zigguratss Native Vault (India)
    { p0: { x: 690, y: 280 }, p1: { x: 630, y: 245 }, p2: { x: 570, y: 260 }, name: 'Returning to Base' }
  ]

  let pathD = `M ${segments[0].p0.x} ${segments[0].p0.y}`
  const xs = []
  const ys = []
  const rotates = []

  segments.forEach(seg => {
    pathD += ` Q ${seg.p1.x} ${seg.p1.y} ${seg.p2.x} ${seg.p2.y}`
    const steps = 11
    for (let i = 0; i < steps; i++) {
      const t = i / steps
      const mt = 1 - t
      const x = mt * mt * seg.p0.x + 2 * mt * t * seg.p1.x + t * t * seg.p2.x
      const y = mt * mt * seg.p0.y + 2 * mt * t * seg.p1.y + t * t * seg.p2.y
      const dx = 2 * mt * (seg.p1.x - seg.p0.x) + 2 * t * (seg.p2.x - seg.p1.x)
      const dy = 2 * mt * (seg.p1.y - seg.p0.y) + 2 * t * (seg.p2.y - seg.p1.y)
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI
      xs.push(parseFloat(x.toFixed(1)))
      ys.push(parseFloat(y.toFixed(1)))
      rotates.push(parseFloat(angle.toFixed(1)))
    }
  })

  // Close loop back precisely at starting origin
  xs.push(segments[0].p0.x)
  ys.push(segments[0].p0.y)
  rotates.push(rotates[0])

  return { pathD, keyframes: { x: xs, y: ys, rotate: rotates } }
}

const GLOBAL_WAYPOINTS = [
  {
    id: 'origin-india',
    name: 'Zigguratss Native Vault',
    city: 'India Base (Origin & Homecoming)',
    code: 'ZG-BASE',
    x: 570,
    y: 260,
    isOrigin: true,
    tag: 'Native Art Vault'
  },
  {
    id: 'hub-dubai',
    name: 'Middle East Gateway',
    city: 'Dubai (DXB)',
    code: 'DXB',
    x: 485,
    y: 215,
    tag: 'Transit Hub'
  },
  {
    id: 'hub-london',
    name: 'European Art Terminal',
    city: 'London & Paris (LHR/CDG)',
    code: 'LHR',
    x: 405,
    y: 130,
    tag: 'European Hub'
  },
  {
    id: 'hub-new-york',
    name: 'Americas Art Port',
    city: 'New York (JFK)',
    code: 'JFK',
    x: 210,
    y: 145,
    tag: 'Americas Hub'
  },
  {
    id: 'hub-west-coast',
    name: 'Pacific Art Terminal',
    city: 'Los Angeles (LAX)',
    code: 'LAX',
    x: 125,
    y: 185,
    tag: 'West Gateway'
  },
  {
    id: 'hub-south-america',
    name: 'Latin Art Corridor',
    city: 'São Paulo (GRU)',
    code: 'GRU',
    x: 255,
    y: 350,
    tag: 'South Americas'
  },
  {
    id: 'hub-africa',
    name: 'Pan-African Port',
    city: 'Cairo & Johannesburg (CAI)',
    code: 'CAI',
    x: 455,
    y: 310,
    tag: 'African Hub'
  },
  {
    id: 'hub-asia-pacific',
    name: 'Asia-Pacific Gateway',
    city: 'Singapore & Tokyo (SIN/HND)',
    code: 'SIN',
    x: 690,
    y: 280,
    tag: 'Asia-Pacific'
  }
]

export default function FlightRadarMap({
  className = ''
}) {
  const { pathD, keyframes } = useMemo(() => generateWorldFlightTrajectory(), [])
  const [activeMetricIdx, setActiveMetricIdx] = useState(0)

  // Sequential cycling of bottom metrics (0 -> 1 -> 2 -> 0)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetricIdx((prev) => (prev + 1) % 3)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative w-full h-full min-h-[280px] xs:min-h-[310px] sm:min-h-[340px] md:min-h-[360px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#080e1c] via-[#050914] to-[#04060c] border border-neutral-800 flex flex-col justify-between select-none shadow-2xl text-white font-sans ${className}`}>
      
      {/* ── TOP AVIONICS RADAR HEADER (MATCHING STAGES 01, 02, 04) ── */}
      <div className="relative z-20 flex items-center justify-between px-3.5 pt-3 sm:px-5 sm:pt-4 border-b border-neutral-800/80 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#f7d794] font-semibold">
            Stage 03 // Satellite Air Flight Tracking
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#dfb76c]/30 text-[9px] sm:text-[10px] text-[#dfb76c] font-medium font-mono">
          <Radio size={10} className="text-[#dfb76c] animate-pulse" />
          <span>ZG-AIR-9900 • LIVE ✈️</span>
        </div>
      </div>

      {/* ── HIGH-CONTRAST VISUAL GLOBAL WORLD MAP CANVAS ── */}
      <div className="relative w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden select-none bg-gradient-to-b from-[#060b18] via-[#091124] to-[#050914]">
        
        {/* Radar Concentric Sweep & Range Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-[180px] h-[180px] rounded-full border border-dashed border-[#dfb76c]/50 animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute w-[320px] h-[320px] rounded-full border border-[#38bdf8]/30" />
          <div className="absolute w-[460px] h-[460px] rounded-full border border-[#38bdf8]/20" />
        </div>

        {/* ── MAIN HIGH-VISIBILITY SVG WORLD MAP ── */}
        <svg 
          viewBox="0 0 900 480" 
          className="w-full h-full max-h-[220px] xs:max-h-[240px] sm:max-h-[260px] md:max-h-[280px] object-contain filter drop-shadow-[0_0_20px_rgba(0,0,0,0.95)]"
        >
          <defs>
            {/* World Landmass Gradient */}
            <linearGradient id="worldLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#182542" />
              <stop offset="50%" stopColor="#22345a" />
              <stop offset="100%" stopColor="#16223b" />
            </linearGradient>

            {/* India Native Base Gradient */}
            <linearGradient id="indiaBaseHighlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dfb76c" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.45" />
            </linearGradient>

            {/* Neon Golden Flight Corridor Gradient */}
            <linearGradient id="flightLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="100%" stopColor="#dfb76c" stopOpacity="1" />
            </linearGradient>

            {/* Glowing Shadow Filters */}
            <filter id="radarGoldGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Oceanic Navigation Grid */}
          <g stroke="#1b2a48" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.8">
            <line x1="20" y1="100" x2="880" y2="100" />
            <line x1="20" y1="200" x2="880" y2="200" />
            <line x1="20" y1="300" x2="880" y2="300" />
            <line x1="20" y1="400" x2="880" y2="400" />
            <line x1="150" y1="20" x2="150" y2="480" />
            <line x1="300" y1="20" x2="300" y2="480" />
            <line x1="450" y1="20" x2="450" y2="480" />
            <line x1="600" y1="20" x2="600" y2="480" />
            <line x1="750" y1="20" x2="750" y2="480" />
          </g>

          {/* Ocean Water Body Labels */}
          <g className="text-[10px] font-mono font-bold fill-[#415b8c] select-none tracking-[0.2em]">
            <text x="260" y="190">NORTH ATLANTIC</text>
            <text x="270" y="400">SOUTH ATLANTIC</text>
            <text x="560" y="420">INDIAN OCEAN</text>
            <text x="70" y="270">PACIFIC OCEAN</text>
            <text x="790" y="230">PACIFIC OCEAN</text>
          </g>

          {/* ── HIGH-CONTRAST GLOBAL CONTINENTS SILHOUETTES ── */}
          <g id="world-continents">
            {/* North America */}
            <path
              d="
                M 60 70
                L 130 55 L 210 75 L 245 105 L 215 140 L 195 165 L 155 205 L 125 185 L 95 145 L 60 115 Z
              "
              fill="url(#worldLandGradient)"
              stroke="#38bdf8"
              strokeWidth="1.8"
              filter="url(#cyanGlow)"
            />

            {/* South America */}
            <path
              d="
                M 185 235
                L 235 245 L 275 295 L 265 375 L 235 445 L 215 455 L 195 385 L 175 295 Z
              "
              fill="url(#worldLandGradient)"
              stroke="#38bdf8"
              strokeWidth="1.8"
              filter="url(#cyanGlow)"
            />

            {/* Europe */}
            <path
              d="
                M 365 100
                L 415 80 L 455 90 L 475 130 L 435 170 L 385 160 L 365 120 Z
              "
              fill="url(#worldLandGradient)"
              stroke="#38bdf8"
              strokeWidth="1.8"
              filter="url(#cyanGlow)"
            />
            {/* British Isles */}
            <path
              d="M 355 105 L 370 95 L 365 125 Z"
              fill="url(#worldLandGradient)"
              stroke="#38bdf8"
              strokeWidth="1.4"
            />

            {/* Africa */}
            <path
              d="
                M 395 195
                L 475 185 L 505 235 L 495 315 L 465 405 L 425 415 L 385 315 L 375 245 Z
              "
              fill="url(#worldLandGradient)"
              stroke="#38bdf8"
              strokeWidth="1.8"
              filter="url(#cyanGlow)"
            />
            {/* Madagascar */}
            <path
              d="M 515 335 L 525 375 L 510 370 Z"
              fill="url(#worldLandGradient)"
              stroke="#38bdf8"
              strokeWidth="1.2"
            />

            {/* Asia Main Continent */}
            <path
              d="
                M 485 115
                L 575 75 L 715 95 L 775 155 L 745 235 L 675 275 L 635 235 L 595 265 L 565 315 L 535 265 L 505 225 L 465 175 Z
              "
              fill="url(#worldLandGradient)"
              stroke="#38bdf8"
              strokeWidth="1.8"
              filter="url(#cyanGlow)"
            />

            {/* ── HIGHLIGHTED INDIA SUB-CONTINENT (Zigguratss Native Base) ── */}
            <path
              d="M 535 235 L 595 235 L 585 275 L 570 320 L 545 270 Z"
              fill="url(#indiaBaseHighlightGrad)"
              stroke="#dfb76c"
              strokeWidth="2.5"
              filter="url(#radarGoldGlow)"
            />
            <text 
              x="570" 
              y="290" 
              textAnchor="middle" 
              className="text-[9px] font-mono font-black fill-[#fef08a] select-none"
            >
              INDIA
            </text>

            {/* Japan Islands */}
            <path
              d="M 755 155 L 775 175 L 765 205 Z"
              fill="url(#worldLandGradient)"
              stroke="#38bdf8"
              strokeWidth="1.4"
            />

            {/* Australia & Oceania */}
            <path
              d="
                M 725 335
                L 815 325 L 835 375 L 795 435 L 735 415 Z
              "
              fill="url(#worldLandGradient)"
              stroke="#38bdf8"
              strokeWidth="1.8"
              filter="url(#cyanGlow)"
            />
          </g>

          {/* ── CONTINUOUS WORLDWIDE FLIGHT CORRIDOR (Golden Closed Loop) ── */}
          <g id="world-flight-path">
            {/* Outer Wide Glowing Flight Halo */}
            <path
              d={pathD}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="10"
              strokeOpacity="0.3"
              filter="url(#radarGoldGlow)"
            />

            {/* Core Solid Golden Trajectory Line */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#flightLineGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Animated Marching White Dashed Radar Telemetry Stream */}
            <path
              d={pathD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeDasharray="9 8"
              strokeOpacity="0.95"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="200"
                to="0"
                dur="3.0s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* ── GLOBAL ART WAYPOINT HUBS ON THE WORLD MAP ── */}
          {GLOBAL_WAYPOINTS.map(wp => (
            <g key={wp.id} transform={`translate(${wp.x}, ${wp.y})`}>
              {wp.isOrigin ? (
                /* Zigguratss Native Base Origin Radar Ping */
                <g>
                  <circle cx="0" cy="0" r="22" fill="#dfb76c" fillOpacity="0.25">
                    <animate attributeName="r" values="10;30;10" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="9" fill="#0d1424" stroke="#dfb76c" strokeWidth="3" filter="url(#radarGoldGlow)" />
                  <circle cx="0" cy="0" r="4.5" fill="#fef08a" />
                  
                  {/* Origin Badge */}
                  <g transform="translate(-85, -34)">
                    <rect width="170" height="26" rx="7" fill="#070c18" stroke="#dfb76c" strokeWidth="1.6" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.85))" />
                    <text x="8" y="17" className="text-[10px] font-mono font-extrabold fill-[#fef08a]">
                      🛫 ZIGGURATSS VAULT (INDIA)
                    </text>
                  </g>
                </g>
              ) : (
                /* Transit Hub Node */
                <g className="group">
                  <circle cx="0" cy="0" r="5" fill="#121c32" stroke="#6884b5" strokeWidth="1.8" />
                  <circle cx="0" cy="0" r="2.2" fill="#8ba3cf" />
                  <text 
                    x="8" 
                    y="4" 
                    className="text-[9px] font-mono font-bold fill-[#9bb0d6] select-none pointer-events-none"
                  >
                    {wp.code}
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* ── CONTINUOUS FLYING AEROPLANE TRAVELING AROUND THE WORLD ── */}
          <g>
            <motion.g
              animate={{
                x: keyframes.x,
                y: keyframes.y,
                rotate: keyframes.rotate
              }}
              transition={{
                duration: 14.0, // Smooth 14-second continuous worldwide journey
                repeat: Infinity,
                ease: "linear"
              }}
              className="cursor-pointer pointer-events-none"
            >
              {/* Jet Particle Halo Glow */}
              <circle cx="0" cy="0" r="22" fill="#dfb76c" fillOpacity="0.3" filter="url(#radarGoldGlow)" />
              
              {/* Airplane Background Disc */}
              <circle cx="0" cy="0" r="16" fill="#0b1326" stroke="#dfb76c" strokeWidth="2.5" />

              {/* High-Resolution Aeroplane Silhouette */}
              <g transform="translate(-16, -16) scale(1)">
                {/* Jet Contrail Smoke Trail */}
                <path
                  d="M 16 30 L 16 44"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeOpacity="0.8"
                />
                
                {/* Airplane Fuselage & Swept Wings */}
                <path
                  d="
                    M 16 2
                    C 17.5 4, 18.5 9, 18.5 13
                    L 31 19
                    L 31 22.5
                    L 18.5 21
                    L 18.5 26.5
                    L 22.5 29.5
                    L 22.5 32
                    L 16 30
                    L 9.5 32
                    L 9.5 29.5
                    L 13.5 26.5
                    L 13.5 21
                    L 1 22.5
                    L 1 19
                    L 13.5 13
                    C 13.5 9, 14.5 4, 16 2
                    Z
                  "
                  fill="#ffffff"
                  stroke="#dfb76c"
                  strokeWidth="1.4"
                  filter="drop-shadow(0 0 6px #dfb76c)"
                />

                {/* Jet Engine Pods */}
                <rect x="9" y="17" width="2" height="4" rx="1" fill="#dfb76c" />
                <rect x="21" y="17" width="2" height="4" rx="1" fill="#dfb76c" />

                {/* Cockpit Window */}
                <ellipse cx="16" cy="7" rx="1.8" ry="2.2" fill="#0b1326" />
              </g>
            </motion.g>
          </g>

        </svg>

        {/* ── FLOATING LIVE TELEMETRY BADGES ON MAP ── */}
        {/* Continuous Flight Route Overlay (Top-Left) */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 max-w-[calc(100%-20px)] sm:max-w-none bg-[#070e1f]/95 backdrop-blur-md border-2 border-[#dfb76c]/70 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[9px] sm:text-xs flex items-center gap-2 shadow-2xl pointer-events-none">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="font-mono text-neutral-200 truncate">
            Route: <strong className="text-[#f7d794] font-bold">INDIA BASE ──✈── Global Hubs ──✈── Native Vault</strong>
          </span>
        </div>

        {/* Active Altitude & Speed HUD (Bottom-Left) */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-[#070e1f]/95 backdrop-blur-md border border-neutral-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[8.5px] sm:text-xs shadow-2xl pointer-events-none flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-300">
            <Gauge size={11} className="text-[#dfb76c] sm:w-[13px] sm:h-[13px]" />
            <span>Alt: <strong className="text-white font-mono">38k FT</strong></span>
          </div>
          <span className="text-neutral-600">|</span>
          <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-300">
            <Wind size={11} className="text-[#dfb76c] sm:w-[13px] sm:h-[13px]" />
            <span>Speed: <strong className="text-[#f7d794] font-mono">920 KM/H</strong></span>
          </div>
        </div>

        {/* World Corridor Tag (Top-Right) */}
        <div className="absolute top-3 right-3 hidden md:flex items-center gap-1.5 bg-[#070e1f]/90 backdrop-blur-md border border-[#dfb76c]/40 px-3 py-1.5 rounded-xl text-[10px] font-mono text-[#f7d794] shadow-xl pointer-events-none">
          <Sparkles size={12} className="text-[#dfb76c]" />
          <span>Worldwide Transcontinental Circuit</span>
        </div>
      </div>

      {/* ── BOTTOM LIVE FLIGHT METRICS & GUARANTEE STRIP ── */}
      <div className="relative z-20 px-3 py-2 sm:px-5 sm:py-2.5 bg-black/60 backdrop-blur-md border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs">
        <div className="flex items-center gap-2 sm:gap-3 text-neutral-300">
          <span className="flex items-center gap-1 text-[#dfb76c] font-medium font-mono text-[9px] sm:text-[10px]">
            <Globe size={11} className="text-[#dfb76c] animate-spin" style={{ animationDuration: '20s' }} />
            <span>BOM ✈️ Global Hubs</span>
          </span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400 hidden xs:inline text-[9px] sm:text-[10px]">38,000+ km World Air Circuit</span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[9px] sm:text-[10px]">
          <Shield size={11} className="text-emerald-400" />
          <span>Pressurized Cargo (21°C / 45% RH)</span>
        </div>
      </div>

    </div>
  )
}
