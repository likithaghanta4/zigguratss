import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Plane, Compass, Shield, Clock, 
  Globe, Sparkles, Radio, Send, Wind, Gauge, CheckCircle2,
  Navigation, MapPin, ShieldCheck, Activity, Eye, Layers, Map
} from 'lucide-react'

// Authentic High-Visibility World Maps directly calibrated from User Reference Images
import worldMapSatellite from '../assets/delivery/world_map_satellite_vibrant.webp'
import worldMapPolitical from '../assets/delivery/world_map_political_vibrant.webp'

// Precise Geodesic Flight Route Generator calibrated to 1024 x 510 World Map
function generateRealisticFlightTelemetry() {
  const segments = [
    // 1. Mumbai Vault Base (BOM) -> Dubai Hub (DXB)
    { p0: { x: 705, y: 282 }, p1: { x: 679, y: 245 }, p2: { x: 654, y: 256 } },
    // 2. Dubai Hub (DXB) -> Frankfurt Art Port (FRA)
    { p0: { x: 654, y: 256 }, p1: { x: 590, y: 175 }, p2: { x: 527, y: 166 } },
    // 3. Frankfurt Art Port (FRA) -> London Heathrow (LHR)
    { p0: { x: 527, y: 166 }, p1: { x: 514, y: 155 }, p2: { x: 502, y: 161 } },
    // 4. London Heathrow (LHR) -> New York JFK (Transatlantic Great Circle Arc)
    { p0: { x: 502, y: 161 }, p1: { x: 401, y: 128 }, p2: { x: 300, y: 197 } },
    // 5. New York JFK -> Los Angeles Hub (LAX)
    { p0: { x: 300, y: 197 }, p1: { x: 252, y: 185 }, p2: { x: 205, y: 216 } },
    // 6. Return leg: LAX -> JFK
    { p0: { x: 205, y: 216 }, p1: { x: 252, y: 225 }, p2: { x: 300, y: 197 } },
    // 7. JFK -> LHR (Transatlantic return)
    { p0: { x: 300, y: 197 }, p1: { x: 401, y: 142 }, p2: { x: 502, y: 161 } },
    // 8. LHR -> DXB
    { p0: { x: 502, y: 161 }, p1: { x: 578, y: 195 }, p2: { x: 654, y: 256 } },
    // 9. DXB -> Mumbai Vault Base (BOM)
    { p0: { x: 654, y: 256 }, p1: { x: 679, y: 260 }, p2: { x: 705, y: 282 } }
  ]

  let pathD = `M ${segments[0].p0.x} ${segments[0].p0.y}`
  const xs = []
  const ys = []
  const rotates = []

  segments.forEach(seg => {
    pathD += ` Q ${seg.p1.x} ${seg.p1.y} ${seg.p2.x} ${seg.p2.y}`
    const steps = 16
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

  xs.push(segments[0].p0.x)
  ys.push(segments[0].p0.y)
  rotates.push(rotates[0])

  return { pathD, keyframes: { x: xs, y: ys, rotate: rotates } }
}

// Global Art Delivery Airports with exact real coordinates on 1024 x 510 map
const GLOBAL_AIR_HUBS = [
  { id: 'bom', name: 'Zigguratss Native Vault Base', code: 'BOM', city: 'Mumbai', x: 705, y: 282, isOrigin: true },
  { id: 'dxb', name: 'Dubai Cargo City', code: 'DXB', city: 'Dubai', x: 654, y: 256 },
  { id: 'fra', name: 'Frankfurt Art Port', code: 'FRA', city: 'Frankfurt', x: 527, y: 166 },
  { id: 'lhr', name: 'London Heathrow Gateway', code: 'LHR', city: 'London', x: 502, y: 161 },
  { id: 'jfk', name: 'New York JFK Port', code: 'JFK', city: 'New York', x: 300, y: 197 },
  { id: 'lax', name: 'Los Angeles Terminal', code: 'LAX', city: 'Los Angeles', x: 205, y: 216 },
  { id: 'hnd', name: 'Tokyo Haneda Hub', code: 'HND', city: 'Tokyo', x: 878, y: 210 },
  { id: 'sin', name: 'Singapore Changi Gateway', code: 'SIN', city: 'Singapore', x: 770, y: 362 }
]

// Prominent Geographic Country Labels matching User Reference Image 1
const MAJOR_REGIONS = [
  { name: 'UNITED STATES', x: 235, y: 195 },
  { name: 'CANADA', x: 220, y: 115 },
  { name: 'BRAZIL', x: 345, y: 345 },
  { name: 'UNITED KINGDOM', x: 480, y: 142 },
  { name: 'EUROPE', x: 540, y: 148 },
  { name: 'MIDDLE EAST', x: 635, y: 238 },
  { name: 'INDIA', x: 722, y: 265, isHighlight: true },
  { name: 'CHINA', x: 785, y: 205 },
  { name: 'JAPAN', x: 890, y: 190 },
  { name: 'AUSTRALIA', x: 865, y: 395 },
  { name: 'RUSSIA', x: 730, y: 105 }
]

export default function FlightRadarMap({ className = '' }) {
  const { pathD, keyframes } = useMemo(() => generateRealisticFlightTelemetry(), [])

  return (
    <div className={`relative w-full h-full min-h-[340px] xs:min-h-[380px] sm:min-h-[420px] md:min-h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a1e36] border-2 border-[#dfb76c]/70 flex items-center justify-center select-none shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-white font-sans ${className}`}>
      
      {/* ── HIGH-DEFINITION VIBRANT WORLD MAP & FLIGHT CANVAS ── */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-[#0a1e36]">
        
        {/* Radar Concentric Distance Range Rings centered at Mumbai Base (x: 705 / 1024 = 68.8%, y: 282 / 510 = 55.3%) */}
        <div 
          className="absolute pointer-events-none z-10 flex items-center justify-center opacity-60"
          style={{
            left: '68.8%',
            top: '55.3%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* 1,000 NM Distance Ring */}
          <div className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] rounded-full border border-dashed border-[#dfb76c]/60 flex items-start justify-center pt-1 text-[8px] sm:text-[8.5px] font-mono text-[#fef08a] font-bold shadow-[0_0_12px_rgba(223,183,108,0.35)]">
            1,000 NM
          </div>
          {/* 2,500 NM Distance Ring */}
          <div className="absolute w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] rounded-full border border-[#38bdf8]/45 flex items-start justify-center pt-1 text-[8px] sm:text-[8.5px] font-mono text-[#7dd3fc] font-semibold">
            2,500 NM
          </div>
          {/* 5,000 NM Global Corridor Ring */}
          <div className="absolute w-[460px] h-[460px] sm:w-[530px] sm:h-[530px] rounded-full border border-[#38bdf8]/35 flex items-start justify-center pt-1 text-[8px] sm:text-[8.5px] font-mono text-[#bae6fd]">
            5,000 NM
          </div>

          {/* 360-Degree Continuous Rotating Radar Beam Sweep with Phosphor Cone */}
          <div 
            className="absolute w-[480px] h-[480px] sm:w-[560px] sm:h-[560px] rounded-full pointer-events-none animate-spin"
            style={{
              animationDuration: '6.0s',
              background: 'conic-gradient(from 0deg, rgba(223, 183, 108, 0.40) 0deg, rgba(56, 189, 248, 0.20) 45deg, transparent 90deg, transparent 360deg)'
            }}
          />
        </div>

        {/* ── MAIN REALISTIC SVG SATELLITE WORLD MAP & FLIGHT CORRIDOR ── */}
        <svg 
          viewBox="0 0 1024 510" 
          className="w-full h-full max-h-[300px] xs:max-h-[340px] sm:max-h-[390px] md:max-h-[440px] object-contain"
        >
          <defs>
            {/* World Map Gradients & Glow Filters */}
            <linearGradient id="geodesicFlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dfb76c" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            <filter id="radarGoldGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="radarCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── 1. AUTHENTIC BRIGHT & CLEAR WORLD MAP (100% VISIBLE, NO DARK OVERLAYS) ── */}
          <image 
            href={worldMapSatellite} 
            x="0" 
            y="0" 
            width="1024" 
            height="510" 
            preserveAspectRatio="none"
            className="w-full h-full select-none pointer-events-none transition-all duration-300"
            style={{ opacity: 1 }}
          />

          {/* Oceanic Coordinate Graticule Grid Lines */}
          <g stroke="rgba(255, 255, 255, 0.22)" strokeWidth="0.6" strokeDasharray="4 6">
            <line x1="0" y1="128" x2="1024" y2="128" />
            <line x1="0" y1="256" x2="1024" y2="256" />
            <line x1="0" y1="384" x2="1024" y2="384" />
            <line x1="170" y1="0" x2="170" y2="510" />
            <line x1="341" y1="0" x2="341" y2="510" />
            <line x1="512" y1="0" x2="512" y2="510" />
            <line x1="682" y1="0" x2="682" y2="510" />
            <line x1="853" y1="0" x2="853" y2="510" />
          </g>

          {/* Major Ocean Identification Typography */}
          <g className="text-[9px] font-mono font-bold fill-white select-none tracking-[0.25em] opacity-80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            <text x="350" y="240">NORTH ATLANTIC OCEAN</text>
            <text x="360" y="415">SOUTH ATLANTIC OCEAN</text>
            <text x="640" y="405">INDIAN OCEAN</text>
            <text x="80" y="300">NORTH PACIFIC</text>
            <text x="880" y="300">NORTH PACIFIC</text>
          </g>

          {/* Major Country & Continent Labels (Matching Reference Image 1) */}
          <g className="font-sans select-none pointer-events-none">
            {MAJOR_REGIONS.map(reg => (
              <text
                key={reg.name}
                x={reg.x}
                y={reg.y}
                textAnchor="middle"
                className={`text-[8.5px] sm:text-[9.5px] font-bold tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] ${
                  reg.isHighlight
                    ? 'fill-[#fef08a] font-extrabold text-[11px] sm:text-[12px]'
                    : 'fill-white/85'
                }`}
              >
                {reg.name}
              </text>
            ))}
          </g>

          {/* ── HIGHLIGHTED INDIA NATIVE VAULT BASE TERRITORY ── */}
          <g id="india-vault-highlight">
            <circle cx="705" cy="282" r="32" fill="#dfb76c" fillOpacity="0.22" />
            <circle cx="705" cy="282" r="18" fill="none" stroke="#dfb76c" strokeWidth="1.8" strokeDasharray="3 3">
              <animate attributeName="r" values="14;28;14" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* ── GEODESIC GREAT-CIRCLE FLIGHT TRAJECTORY (Bright Golden Arc) ── */}
          <g id="geodesic-flight-arcs">
            {/* Outer Wide Glowing Flight Corridor */}
            <path
              d={pathD}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="8"
              strokeOpacity="0.40"
              filter="url(#radarGoldGlow)"
            />

            {/* Solid Geodesic Line */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#geodesicFlightGrad)"
              strokeWidth="3.4"
              strokeLinecap="round"
            />

            {/* Marching Bright White Radar Telemetry Pulses */}
            <path
              d={pathD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeDasharray="8 8"
              strokeOpacity="1"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="240"
                to="0"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* ── AIRWAY HUBS & WAYPOINTS (Accurate Real-World Global Positions) ── */}
          {GLOBAL_AIR_HUBS.map(hub => (
            <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
              {hub.isOrigin ? (
                /* Zigguratss Native Vault Base Origin Radar Ping */
                <g>
                  <circle cx="0" cy="0" r="28" fill="#dfb76c" fillOpacity="0.3">
                    <animate attributeName="r" values="8;36;8" dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="8" fill="#0d1424" stroke="#dfb76c" strokeWidth="2.8" filter="url(#radarGoldGlow)" />
                  <circle cx="0" cy="0" r="4" fill="#fef08a" />
                  
                  {/* Origin Badge */}
                  <g transform="translate(-95, -34)">
                    <rect width="190" height="26" rx="6" fill="#070c18" stroke="#dfb76c" strokeWidth="1.6" filter="drop-shadow(0 2px 10px rgba(0,0,0,0.95))" />
                    <text x="8" y="17" className="text-[10px] font-mono font-extrabold fill-[#fef08a]">
                      🛫 ZIGGURATSS VAULT (BOM)
                    </text>
                  </g>
                </g>
              ) : (
                /* International Art Port Waypoint Node */
                <g>
                  <circle cx="0" cy="0" r="5" fill="#0f172a" stroke="#ffffff" strokeWidth="1.8" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.9))" />
                  <circle cx="0" cy="2.2" fill="#38bdf8" />
                  <text 
                    x="8" 
                    y="4" 
                    className="text-[9.5px] font-mono font-extrabold fill-white select-none pointer-events-none drop-shadow-[0_1px_4px_black]"
                  >
                    {hub.code}
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* ── BOEING 777F CARGO JET FLYING ALONG THE GEODESIC ROUTE ── */}
          <g>
            <motion.g
              animate={{
                x: keyframes.x,
                y: keyframes.y,
                rotate: keyframes.rotate
              }}
              transition={{
                duration: 18.0,
                repeat: Infinity,
                ease: "linear"
              }}
              className="cursor-pointer pointer-events-none"
            >
              {/* Twin Glowing Contrail Vapor Streams */}
              <line x1="-15" y1="-5" x2="-45" y2="-7" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" strokeDasharray="4 3" />
              <line x1="-15" y1="5" x2="-45" y2="7" stroke="#38bdf8" strokeWidth="2.5" opacity="0.9" strokeDasharray="4 3" />

              {/* Aircraft Radar Disc Base */}
              <circle cx="0" cy="0" r="16" fill="#0b1326" stroke="#dfb76c" strokeWidth="2.6" filter="url(#radarGoldGlow)" />

              {/* Realistic Boeing 777F Cargo Airplane Silhouette */}
              <g transform="translate(-16, -16)">
                {/* Airplane Body & Swept Wings */}
                <path
                  d="
                    M 16 3
                    C 17.5 5, 18.5 9, 18.5 13
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
                    C 13.5 9, 14.5 5, 16 3
                    Z
                  "
                  fill="#ffffff"
                  stroke="#dfb76c"
                  strokeWidth="1.4"
                  filter="drop-shadow(0 0 8px #dfb76c)"
                />

                {/* Jet Engines */}
                <rect x="9" y="17" width="2.5" height="4.5" rx="1" fill="#dfb76c" />
                <rect x="20.5" y="17" width="2.5" height="4.5" rx="1" fill="#dfb76c" />

                {/* Wingtip Navigation Strobes: Red (Port/Left), Green (Starboard/Right) */}
                <circle cx="2" cy="21" r="1.5" fill="#ef4444" className="animate-ping" />
                <circle cx="30" cy="21" r="1.5" fill="#10b981" className="animate-ping" />
              </g>
            </motion.g>
          </g>

        </svg>

      </div>
    </div>
  )
}


