import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Rotate3d, Sparkles, Eye, Maximize2, Minimize2, 
  Layers, Sun, Compass, Play, Pause, Sliders, Check,
  Camera, Move
} from 'lucide-react'

// Authentic Room Interior Photographs
import livingRoomImg from '../assets/rooms/living_room.jpg'
import bedroomImg from '../assets/rooms/master_bedroom.jpg'
import gallerySalonImg from '../assets/rooms/gallery_salon.jpg'
import executiveLoungeImg from '../assets/rooms/executive_lounge.jpg'

// Authentic 6 Zigguratss Master Artwork Assets
import screenshotImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 14-57-58.png'
import flowersImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 15-14-55.png'
import image9 from '../assets/User-images/image 9.jpg'
import testImage from '../assets/ProductPage-images/aasbshjdbas.webp'
import testImage2 from '../assets/ProductPage-images/testImage.jpg'
import hansImage from '../assets/ProductPage-images/hans.jpg'

export const ROOM_PRESETS = [
  {
    id: 'living-room',
    name: 'Luxury Living Room',
    subtitle: 'Curved Cream Bouclé & Marble Setting',
    bg: livingRoomImg,
    icon: '🛋️',
    wall: {
      left: 50.0,
      top: 42.5,
      scaleFactor: 1.0,
      maxHeightPct: 32.0,
      spotlightIntensity: 0.28,
      spotlightColor: 'rgba(255, 235, 195, 0.35)',
      wallColorTone: 'neutral-warm'
    }
  },
  {
    id: 'master-bedroom',
    name: 'Master Suite Retreat',
    subtitle: 'Recessed Architectural Headboard Alcove',
    bg: bedroomImg,
    icon: '🛏️',
    wall: {
      left: 50.0,
      top: 29.0,
      scaleFactor: 0.65,
      maxHeightPct: 22.0,
      spotlightIntensity: 0.30,
      spotlightColor: 'rgba(255, 240, 215, 0.35)',
      wallColorTone: 'neutral-cool'
    }
  },
  {
    id: 'gallery-salon',
    name: 'Curated Gallery Salon',
    subtitle: 'Museum Track Spotlights & Hardwood Hall',
    bg: gallerySalonImg,
    icon: '🏛️',
    wall: {
      left: 50.0,
      top: 40.5,
      scaleFactor: 1.0,
      maxHeightPct: 32.0,
      spotlightIntensity: 0.35,
      spotlightColor: 'rgba(255, 255, 255, 0.38)',
      wallColorTone: 'museum-white'
    }
  },
  {
    id: 'executive-lounge',
    name: 'Penthouse Lounge',
    subtitle: 'Fluted Walnut & Travertine Wall Paneling',
    bg: executiveLoungeImg,
    icon: '🍷',
    wall: {
      left: 45.0,
      top: 39.5,
      scaleFactor: 1.0,
      maxHeightPct: 32.0,
      spotlightIntensity: 0.38,
      spotlightColor: 'rgba(255, 225, 175, 0.40)',
      wallColorTone: 'dark-walnut'
    }
  }
]

export const ARTWORK_PRESETS = [
  {
    id: 'divine-tunes',
    title: 'Divine Tunes-11',
    label: 'Master Canvas',
    src: screenshotImage,
    aspectRatio: 281 / 313, // 0.898 (Portrait)
    orientation: 'portrait',
    dimensions: '32 × 30 in (81.3 × 76.2 cm)',
    wallWidthPct: 18.0,
    maxHeightPct: 33.0,
    defaultRoom: 'living-room',
    tag: 'Original Masterpiece'
  },
  {
    id: 'butterfly-sonata',
    title: 'The Butterfly Sonata',
    label: 'Butterfly Sonata',
    src: flowersImage,
    aspectRatio: 549 / 710, // 0.773 (Portrait)
    orientation: 'portrait',
    dimensions: '30 × 38 in (76.2 × 96.5 cm)',
    wallWidthPct: 17.5,
    maxHeightPct: 34.0,
    defaultRoom: 'master-bedroom',
    tag: 'Floral & Life Motif'
  },
  {
    id: 'geometric-symmetry',
    title: 'Geometric Symmetry',
    label: 'Geometric Symmetry',
    src: image9,
    aspectRatio: 735 / 913, // 0.805 (Portrait)
    orientation: 'portrait',
    dimensions: '32 × 40 in (81.3 × 101.6 cm)',
    wallWidthPct: 17.5,
    maxHeightPct: 34.0,
    defaultRoom: 'gallery-salon',
    tag: 'Form & Balance Motif'
  },
  {
    id: 'wall-mount-1',
    title: 'Curatorial Wall Mount',
    label: 'Wall Mount 1',
    src: testImage,
    aspectRatio: 1200 / 1022, // 1.174 (Near Square)
    orientation: 'square',
    dimensions: '36 × 31 in (91.4 × 78.7 cm)',
    wallWidthPct: 21.0,
    maxHeightPct: 31.0,
    defaultRoom: 'gallery-salon',
    tag: 'Curatorial Plate'
  },
  {
    id: 'framed-canvas',
    title: 'Studio Framed Canvas',
    label: 'Framed Canvas',
    src: testImage2,
    aspectRatio: 1080 / 1350, // 0.800 (Portrait)
    orientation: 'portrait',
    dimensions: '30 × 37.5 in (76.2 × 95.3 cm)',
    wallWidthPct: 17.5,
    maxHeightPct: 34.0,
    defaultRoom: 'living-room',
    tag: 'Studio Master Plate'
  },
  {
    id: 'museum-setting',
    title: 'Archival Museum Setting',
    label: 'Museum Setting',
    src: hansImage,
    aspectRatio: 736 / 736, // 1.000 (Square)
    orientation: 'square',
    dimensions: '34 × 34 in (86.4 × 86.4 cm)',
    wallWidthPct: 20.0,
    maxHeightPct: 32.0,
    defaultRoom: 'executive-lounge',
    tag: 'Archival Plate'
  }
]

export const FRAME_STYLES = [
  {
    id: 'gold-leaf',
    name: 'Museum Gold Leaf',
    borderStyle: 'border-[3px] sm:border-[4px] border-[#c9a96e]',
    outerShadow: 'shadow-[0_2px_6px_rgba(0,0,0,0.4),0_10px_24px_rgba(0,0,0,0.38)]',
    innerMat: 'p-1 sm:p-1.5 bg-[#faf8f5]',
    matBorder: 'border border-neutral-300/80',
    description: 'Hand-gilded brushed gold finish'
  },
  {
    id: 'matte-obsidian',
    name: 'Matte Obsidian Black',
    borderStyle: 'border-[3px] sm:border-[4px] border-[#181818]',
    outerShadow: 'shadow-[0_2px_6px_rgba(0,0,0,0.5),0_12px_26px_rgba(0,0,0,0.45)]',
    innerMat: 'p-1 sm:p-1.5 bg-[#f4f4f4]',
    matBorder: 'border border-neutral-400/80',
    description: 'Contemporary minimalist aluminum'
  },
  {
    id: 'natural-oak',
    name: 'Natural Scandinavian Oak',
    borderStyle: 'border-[3px] sm:border-[4px] border-[#a5845c]',
    outerShadow: 'shadow-[0_2px_6px_rgba(0,0,0,0.35),0_10px_22px_rgba(0,0,0,0.35)]',
    innerMat: 'p-0.5 sm:p-1 bg-[#fbf9f4]',
    matBorder: 'border border-[#e0d6c5]',
    description: 'Solid natural architectural oak'
  },
  {
    id: 'frameless-canvas',
    name: 'Gallery Wrapped (Frameless)',
    borderStyle: 'border-0',
    outerShadow: 'shadow-[0_2px_6px_rgba(0,0,0,0.4),0_12px_28px_rgba(0,0,0,0.45)]',
    innerMat: 'p-0',
    matBorder: 'border-0',
    description: 'Museum grade deep edge canvas'
  }
]

export const CAMERA_ANGLES = [
  { id: 'center', label: 'Frontal (0°)', rotateY: 0, rotateX: 0, scale: 1.0 },
  { id: 'left', label: 'Left Orbit (-6°)', rotateY: -6, rotateX: 0.8, scale: 1.0 },
  { id: 'right', label: 'Right Orbit (+6°)', rotateY: 6, rotateX: 0.8, scale: 1.0 },
  { id: 'closeup', label: 'Focus View (1.2x)', rotateY: 0, rotateX: 0, scale: 1.2 }
]

export default function RealRoom3DVisualizer({
  initialRoomId = 'living-room',
  selectedArtworkSrc = null,
  selectedArtworkTitle = null,
  onSelectArtwork = null,
  compactMode = false,
  showControls = true,
  autoRotateDefault = true,
  className = ''
}) {
  const [activeRoomId, setActiveRoomId] = useState(initialRoomId)
  const [isRoomAutoPlay, setIsRoomAutoPlay] = useState(true)
  const [isRoomHovered, setIsRoomHovered] = useState(false)
  const [activeArtworkId, setActiveArtworkId] = useState(
    selectedArtworkSrc ? 'custom' : 'divine-tunes'
  )
  const [customArtworkSrc, setCustomArtworkSrc] = useState(selectedArtworkSrc)
  const [activeFrameId, setActiveFrameId] = useState('gold-leaf')
  const [cameraAngleId, setCameraAngleId] = useState('center')
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotateDefault)
  const [scaleMultiplier, setScaleMultiplier] = useState(1.0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [manualRotation, setManualRotation] = useState({ rotateX: 0, rotateY: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSpotlightOn, setIsSpotlightOn] = useState(true)

  const containerRef = useRef(null)

  // Dynamic Room Environment Auto-Cycle (3.8s)
  useEffect(() => {
    if (!isRoomAutoPlay || isRoomHovered) return

    const roomTimer = setInterval(() => {
      setActiveRoomId((prevId) => {
        const currentIdx = ROOM_PRESETS.findIndex((r) => r.id === prevId)
        const nextIdx = (currentIdx + 1) % ROOM_PRESETS.length
        return ROOM_PRESETS[nextIdx].id
      })
    }, 3800)

    return () => clearInterval(roomTimer)
  }, [isRoomAutoPlay, isRoomHovered])

  // Preload all 4 room background images eagerly
  useEffect(() => {
    ROOM_PRESETS.forEach((room) => {
      if (room.bg) {
        const img = new Image()
        img.src = room.bg
      }
    })
  }, [])

  // Sync external artwork changes
  useEffect(() => {
    if (selectedArtworkSrc) {
      setCustomArtworkSrc(selectedArtworkSrc)
      const matchingPreset = ARTWORK_PRESETS.find(a => a.src === selectedArtworkSrc)
      if (matchingPreset) {
        setActiveArtworkId(matchingPreset.id)
      } else {
        setActiveArtworkId('custom')
      }
    }
  }, [selectedArtworkSrc])

  const currentRoom = ROOM_PRESETS.find(r => r.id === activeRoomId) || ROOM_PRESETS[0]
  const currentFrame = FRAME_STYLES.find(f => f.id === activeFrameId) || FRAME_STYLES[0]
  const currentAnglePreset = CAMERA_ANGLES.find(a => a.id === cameraAngleId) || CAMERA_ANGLES[0]

  // Determine current image to hang on the wall
  const currentArtwork = (() => {
    if (activeArtworkId === 'custom' && customArtworkSrc) {
      return {
        id: 'custom',
        title: selectedArtworkTitle || 'Custom Uploaded Artwork',
        src: customArtworkSrc,
        dimensions: 'Custom Proportions'
      }
    }
    const found = ARTWORK_PRESETS.find(a => a.id === activeArtworkId)
    return found || ARTWORK_PRESETS[0]
  })()

  // Interactive 3D Parallax Tilt Handler
  const handleMouseMove = (e) => {
    if (!containerRef.current || isDragging) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2 // -1 to 1

    setMouseOffset({
      x: x * 8, // max 8 deg rotateY
      y: -y * 5 // max 5 deg rotateX
    })
  }

  const handleMouseLeave = () => {
    if (!isDragging) {
      setMouseOffset({ x: 0, y: 0 })
    }
  }

  // Touch & Drag 3D Orbit Controls
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMoveDrag = (e) => {
    if (!isDragging) return
    const deltaX = (e.clientX - dragStart.x) * 0.18
    const deltaY = (e.clientY - dragStart.y) * 0.12

    setManualRotation(prev => ({
      rotateY: Math.max(-25, Math.min(25, prev.rotateY + deltaX)),
      rotateX: Math.max(-15, Math.min(15, prev.rotateX - deltaY))
    }))
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Calculate final 3D angles
  const finalRotateY = currentAnglePreset.rotateY + mouseOffset.x + manualRotation.rotateY
  const finalRotateX = currentAnglePreset.rotateX + mouseOffset.y + manualRotation.rotateX
  const finalScale = currentAnglePreset.scale * (isFullscreen ? 1.0 : 1.0)

  // Switch artwork helper
  const handleArtworkChange = (art) => {
    setActiveArtworkId(art.id)
    if (onSelectArtwork) {
      onSelectArtwork(art)
    }
  }

  return (
    <div 
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a0a0e] border border-neutral-800 shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen bg-black' : ''
      } ${className}`}
    >
      {/* ── TOP HEADER / REAL ROOM HUD BAR ── */}
      <div className="relative z-30 flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-[#0c0c12]/95 backdrop-blur-md border-b border-neutral-800/80">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#dfb76c]/15 border border-[#dfb76c]/40 flex items-center justify-center text-sm shadow-[0_0_12px_rgba(223,183,108,0.25)] shrink-0">
            <Rotate3d size={15} className="text-[#dfb76c] animate-spin-slow" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.18em] text-[#dfb76c] font-semibold whitespace-nowrap">
                Real-Room 3D
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[8px] sm:text-[9px] font-mono tracking-wider font-semibold">
                LIVE
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-300 font-light flex items-center gap-1 min-w-0">
              <span className="truncate max-w-[100px] xs:max-w-[140px] sm:max-w-none text-[#f7d794] font-medium">{currentArtwork.title}</span>
              <span className="text-neutral-500 hidden xs:inline">•</span>
              <span className="text-neutral-400 hidden xs:inline truncate">{currentRoom.name}</span>
            </p>
          </div>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-auto">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border text-[10px] sm:text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              isAutoRotating
                ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794]'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
            title="Toggle Continuous 3D Pan & Cinematic Orbit"
          >
            {isAutoRotating ? <Pause size={11} className="text-[#dfb76c]" /> : <Play size={11} />}
            <span className="hidden sm:inline">{isAutoRotating ? '3D Orbiting' : 'Orbit Paused'}</span>
          </button>

          <button
            onClick={() => setIsSpotlightOn(!isSpotlightOn)}
            className={`p-1.5 sm:p-2 rounded-lg border transition-all text-[10px] sm:text-xs cursor-pointer shrink-0 ${
              isSpotlightOn 
                ? 'bg-[#dfb76c]/20 border-[#dfb76c]/60 text-[#dfb76c]' 
                : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-neutral-300'
            }`}
            title="Toggle Museum Track Spotlight"
          >
            <Sun size={13} className="sm:w-3.5 sm:h-3.5" />
          </button>

          <button
            onClick={() => {
              setManualRotation({ rotateX: 0, rotateY: 0 })
              setCameraAngleId('center')
            }}
            className="p-1.5 sm:p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer shrink-0"
            title="Reset Camera Center"
          >
            <Compass size={13} className="sm:w-3.5 sm:h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 sm:p-2 rounded-lg bg-neutral-900 hover:bg-[#dfb76c] hover:text-neutral-950 border border-neutral-800 text-neutral-300 transition-all cursor-pointer shrink-0"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Room View"}
          >
            {isFullscreen ? <Minimize2 size={13} className="sm:w-3.5 sm:h-3.5" /> : <Maximize2 size={13} className="sm:w-3.5 sm:h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── 3D ROOM STAGE CONTAINER ── */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMoveCapture={handleMouseMoveDrag}
        onMouseUp={handleMouseUp}
        className={`relative w-full select-none overflow-hidden cursor-grab active:cursor-grabbing ${
          isFullscreen ? 'h-[calc(100vh-160px)]' : compactMode ? 'h-[320px] sm:h-[380px]' : 'h-[340px] xs:h-[400px] sm:h-[480px] md:h-[540px] lg:h-[580px]'
        }`}
        style={{ perspective: '1200px' }}
      >
        {/* 3D Rotational Room Plane */}
        <motion.div
          animate={
            isAutoRotating && !isDragging
              ? {
                  rotateY: [finalRotateY - 4, finalRotateY + 4, finalRotateY - 4],
                  rotateX: [finalRotateX - 1, finalRotateX + 1.2, finalRotateX - 1],
                  scale: [finalScale, finalScale * 1.015, finalScale]
                }
              : {
                  rotateY: finalRotateY,
                  rotateX: finalRotateX,
                  scale: finalScale
                }
          }
          transition={
            isAutoRotating && !isDragging
              ? {
                  duration: 8.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              : {
                  duration: 0.25,
                  ease: 'easeOut'
                }
          }
          className="relative w-full h-full transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Room Background Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentRoom.id}
              src={currentRoom.bg}
              alt={currentRoom.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              style={{ transform: 'translateZ(0px)' }}
              draggable={false}
            />
          </AnimatePresence>

          {/* Ambient Lighting & Ceiling Spotlight Cones */}
          {isSpotlightOn && (
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at ${currentRoom.wall.left}% ${currentRoom.wall.top}%, ${currentRoom.wall.spotlightColor}, transparent 55%)`
              }}
            />
          )}

          {/* ── DYNAMICALLY MOUNTED 3D ARTWORK PHYSICALLY ON THE WALL ── */}
          <div
            className="absolute transition-all duration-500 ease-out z-10"
            style={{
              left: `${currentRoom.wall.left}%`,
              top: `${currentRoom.wall.top}%`,
              transform: 'translate(-50%, -50%) translateZ(2px)',
              width: `${(currentArtwork.wallWidthPct || 18.0) * (currentRoom.wall.scaleFactor || 1.0) * scaleMultiplier}%`,
              maxWidth: currentArtwork.orientation === 'landscape' ? '380px' : currentArtwork.orientation === 'portrait' ? '280px' : '310px',
              maxHeight: `${(currentRoom.wall.maxHeightPct || 32.0) * scaleMultiplier}%`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Hanging Frame Container */}
            <div 
              className={`relative rounded-sm transition-all duration-300 ${currentFrame.borderStyle} ${currentFrame.outerShadow}`}
            >
              {/* Inner Mat Board */}
              <div className={`${currentFrame.innerMat} ${currentFrame.matBorder}`}>
                {/* Artwork Canvas Image */}
                <div 
                  className="relative overflow-hidden bg-neutral-950 flex items-center justify-center"
                  style={{
                    aspectRatio: `${currentArtwork.aspectRatio || 1}`
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentArtwork.src}
                      src={currentArtwork.src}
                      alt={currentArtwork.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1.0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full object-contain block select-none pointer-events-none filter contrast-[1.03] brightness-[1.01]"
                      draggable={false}
                    />
                  </AnimatePresence>

                  {/* Glass Sheen / Museum Glare Reflection */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent"
                    style={{
                      transform: `translateX(${-mouseOffset.x * 2}%)`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Unified Non-Colliding Bottom Bar */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-30">
            <div className="bg-[#0c0c12]/90 backdrop-blur-md border border-neutral-700/80 text-neutral-300 px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] flex items-center gap-1.5 shadow-lg">
              <Move size={10} className="text-[#dfb76c] animate-pulse" />
              <span className="hidden xs:inline">Drag to rotate 3D room</span>
              <span className="xs:hidden">Drag to orbit</span>
            </div>

            <div className="bg-[#0c0c12]/90 backdrop-blur-md border border-neutral-700/80 text-neutral-300 px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] flex items-center gap-1.5 shadow-lg font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c]" />
              <span className="text-[#f7d794] font-medium">{currentArtwork.dimensions}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── INTERACTIVE CONTROLS CONSOLE ── */}
      {showControls && (
        <div className="relative z-30 p-3 sm:p-5 bg-gradient-to-t from-[#0a0a0e] via-[#101017] to-[#0c0c12] border-t border-neutral-800 space-y-3 sm:space-y-4">
          
          {/* Row 1: Real Rooms Selector */}
          <div 
            onMouseEnter={() => setIsRoomHovered(true)}
            onMouseLeave={() => setIsRoomHovered(false)}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-neutral-400 font-medium uppercase tracking-wider">
              <div className="flex items-center gap-1 min-w-0">
                <Layers size={11} className="text-[#dfb76c] shrink-0" />
                <span className="truncate">1. Select Realistic Room Environment:</span>
                <span className="text-[#dfb76c] font-semibold truncate">{currentRoom.name}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[9px] font-mono text-[#dfb76c] bg-[#dfb76c]/10 border border-[#dfb76c]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-pulse" />
                  {isRoomAutoPlay && !isRoomHovered ? 'Auto-Moving (3.8s)' : 'Tour Paused'}
                </span>
                <button
                  onClick={() => setIsRoomAutoPlay(!isRoomAutoPlay)}
                  className="p-1 px-1.5 rounded bg-neutral-900 hover:bg-[#dfb76c]/20 hover:text-[#f7d794] border border-neutral-800 text-neutral-400 text-[9px] font-mono transition-all cursor-pointer flex items-center gap-1"
                  title={isRoomAutoPlay ? "Pause Auto-Room Tour" : "Resume Auto-Room Tour"}
                >
                  {isRoomAutoPlay && !isRoomHovered ? <Pause size={9} /> : <Play size={9} />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {ROOM_PRESETS.map((room) => {
                const isRoomActive = activeRoomId === room.id
                return (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoomId(room.id)}
                    className={`px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 relative overflow-hidden ${
                      isRoomActive
                        ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-white shadow-[0_0_15px_rgba(223,183,108,0.25)] ring-1 ring-[#dfb76c]/50'
                        : 'bg-[#14141d] border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {isRoomActive && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#dfb76c] shadow-[0_0_8px_#dfb76c]" />
                    )}
                    <span className="text-base sm:text-lg shrink-0">{room.icon}</span>
                    <div className="min-w-0">
                      <p className={`text-[11px] sm:text-xs font-semibold truncate ${isRoomActive ? 'text-[#f7d794]' : ''}`}>
                        {room.name}
                      </p>
                      <p className="text-[9px] text-neutral-400 truncate hidden sm:block">
                        {room.subtitle}
                      </p>
                    </div>
                    {isRoomActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-ping shrink-0 ml-auto" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Row 2: Dynamic Artwork Selector (Switches artwork in ALL rooms!) */}
          <div className="space-y-1.5 pt-1 border-t border-neutral-800/80">
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-neutral-400 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Sparkles size={11} className="text-[#dfb76c]" /> 2. Mount Artwork onto Wall (All Rooms Update Dynamically):
              </span>
              <span className="text-[#f7d794] text-[10px] font-mono">{currentArtwork.dimensions}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {ARTWORK_PRESETS.map((art) => (
                <button
                  key={art.id}
                  onClick={() => handleArtworkChange(art)}
                  className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-left ${
                    activeArtworkId === art.id
                      ? 'bg-[#dfb76c]/20 border-[#dfb76c] ring-1 ring-[#dfb76c]/50 text-white shadow-[0_0_12px_rgba(223,183,108,0.25)]'
                      : 'bg-[#14141d] border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-neutral-800">
                    <img src={art.src} alt={art.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[10px] sm:text-xs font-semibold truncate ${activeArtworkId === art.id ? 'text-[#f7d794]' : ''}`}>
                      {art.title}
                    </p>
                    <p className="text-[9px] text-neutral-400 truncate">
                      {art.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: 3D Camera Angles & Custom Frame Finishes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-1 border-t border-neutral-800/80">
            
            {/* Camera Angle Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] sm:text-xs text-neutral-400 font-medium uppercase tracking-wider flex items-center gap-1">
                <Camera size={11} className="text-[#dfb76c]" /> 3D Camera Angles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CAMERA_ANGLES.map((ang) => (
                  <button
                    key={ang.id}
                    onClick={() => {
                      setCameraAngleId(ang.id)
                      setManualRotation({ rotateX: 0, rotateY: 0 })
                    }}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-[10px] sm:text-xs transition-all cursor-pointer ${
                      cameraAngleId === ang.id
                        ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794] font-medium'
                        : 'bg-[#14141d] border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {ang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Styles */}
            <div className="space-y-1.5">
              <span className="text-[10px] sm:text-xs text-neutral-400 font-medium uppercase tracking-wider flex items-center gap-1">
                <Sliders size={11} className="text-[#dfb76c]" /> Custom Frame Styles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FRAME_STYLES.map((frm) => (
                  <button
                    key={frm.id}
                    onClick={() => setActiveFrameId(frm.id)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-[10px] sm:text-xs transition-all cursor-pointer ${
                      activeFrameId === frm.id
                        ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794] font-medium'
                        : 'bg-[#14141d] border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {frm.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  )
}
