import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  ZoomIn, Maximize2, ShoppingCart, CreditCard, Truck, CheckCircle2, 
  X, Share2, MessageCircle, Package, Clock, MapPin, Shield, RefreshCw, 
  Globe, Upload, AlertCircle, ChevronLeft, ChevronRight, Check, Sparkles,
  Palette, Award, FileText, ArrowUpRight, ArrowRight, Eye, Heart, Layers,
  Compass, Feather, BookOpen, Play, Pause, Navigation, Home, Box,
  Rotate3d, Move, Camera, Sliders, Sun, Plane
} from 'lucide-react'
import { analyzeImageOrientation, validateImage } from '../services/imageService'
import ArtistCardMini from './ArtistCardMini'
import ArtistSaga, { ArtistMarqueesSection, CollectorReviewsSection } from './ArtistSaga'
import WallHangedImageGenerator from './WallHangedImageGenerator'
import FlightRadarMap from './FlightRadarMap'
import ArchivalPreparationScene from './ArchivalPreparationScene'
import WhiteGloveDoorstepScene from './WhiteGloveDoorstepScene'
import RealRoom3DVisualizer, { 
  ROOM_PRESETS, 
  ARTWORK_PRESETS, 
  FRAME_STYLES, 
  CAMERA_ANGLES 
} from './RealRoom3DVisualizer'

// Authentic Room Interior Photographs
import livingRoomImg from '../assets/rooms/living_room.jpg'
import bedroomImg from '../assets/rooms/master_bedroom.jpg'
import gallerySalonImg from '../assets/rooms/gallery_salon.jpg'
import executiveLoungeImg from '../assets/rooms/executive_lounge.jpg'

// Authentic Zigguratss Assets from repository
import wallImage1 from '../assets/ProductPage-images/image 1.png'
import wallImage2 from '../assets/ProductPage-images/image2.png'
import wallImage3 from '../assets/ProductPage-images/image3.png'
import image4 from '../assets/ProductPage-images/image4.png'
import akhImage from '../assets/ProductPage-images/akh.webp'
import screenshotImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 14-57-58.png'
import testImage from '../assets/ProductPage-images/aasbshjdbas.webp'
import testImage2 from '../assets/ProductPage-images/testImage.jpg'
import hansImage from '../assets/ProductPage-images/hans.jpg'
import flowersImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 15-14-55.png'

// Genuine Zigguratss website artworks for animations
import historyImage from '../assets/User-images/history.jpg'
import birdsImage from '../assets/User-images/birds.jpg'
import image9 from '../assets/User-images/image 9.jpg'
import image12 from '../assets/User-images/image 12.jpg'
import image2 from '../assets/User-images/image2.jpg'
import image3 from '../assets/User-images/image3.jpg'
import image5 from '../assets/User-images/image5.jpg'
import diff1 from '../assets/User-images/diif1.jpg'
import diff2 from '../assets/User-images/diff2.jpg'
import diff3 from '../assets/User-images/diff3.jpg'
import diff5 from '../assets/User-images/diff5.jpg'
import sky1 from '../assets/User-images/sky1.jpg'

// 4 Key Trust Rules & Guarantees with Dynamic Cycling Highlights
const TRUST_GUARANTEE_ITEMS = [
  {
    id: 'authenticity',
    icon: CheckCircle2,
    text: 'Certificate of Authenticity signed by Pradip Sarkar',
    tag: 'Authentic Provenance',
  },
  {
    id: 'escrow',
    icon: Shield,
    text: '100% Secured payment and escrow protection',
    tag: 'Escrow Protected',
  },
  {
    id: 'guarantee',
    icon: RefreshCw,
    text: '14-Days Money Back Guarantee',
    tag: 'Risk-Free Return',
  },
  {
    id: 'shipping',
    icon: Truck,
    text: 'Free worldwide insured air shipping',
    tag: 'Insured Global Air',
  }
]

export default function ProductDetail({ onReplayEntrance }) {
  const shouldReduceMotion = useReducedMotion()
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [openFullscreen, setOpenFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [unit, setUnit] = useState('inch') // 'inch' | 'cm'
  const [cartToast, setCartToast] = useState(false)
  const [shareToast, setShareToast] = useState(false)
  const [wishlistActive, setWishlistActive] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [activeTrustIndex, setActiveTrustIndex] = useState(0)
  const [isTrustHovered, setIsTrustHovered] = useState(false)

  // Sequential cycling states for multi-box sections
  const [activeSpecIdx, setActiveSpecIdx] = useState(0)
  const [isSpecHovered, setIsSpecHovered] = useState(false)

  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(0)
  const [isMilestoneHovered, setIsMilestoneHovered] = useState(false)

  const [activeArtistSuiteIdx, setActiveArtistSuiteIdx] = useState(0)
  const [isArtistSuiteHovered, setIsArtistSuiteHovered] = useState(false)

  const [activeDimBoxIdx, setActiveDimBoxIdx] = useState(0)
  const [activeFilmstripIdx, setActiveFilmstripIdx] = useState(0)
  const [activeAccreditationIdx, setActiveAccreditationIdx] = useState(0)

  // Sequential cycling of the 4 features: 1 -> 2 -> 3 -> 4 -> 1 (Expands/Grows big then shrinks back)
  useEffect(() => {
    if (isTrustHovered) return
    const interval = setInterval(() => {
      setActiveTrustIndex((prev) => (prev + 1) % TRUST_GUARANTEE_ITEMS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [isTrustHovered])

  // Sequential cycling of the 8 Artwork Specification cards
  useEffect(() => {
    if (isSpecHovered) return
    const interval = setInterval(() => {
      setActiveSpecIdx((prev) => (prev + 1) % 8)
    }, 2400)
    return () => clearInterval(interval)
  }, [isSpecHovered])

  // Sequential cycling of the 4 Artist Milestones
  useEffect(() => {
    if (isMilestoneHovered) return
    const interval = setInterval(() => {
      setActiveMilestoneIdx((prev) => (prev + 1) % 4)
    }, 2800)
    return () => clearInterval(interval)
  }, [isMilestoneHovered])

  // Sequential cycling of the Artist Suite (Artist Card <-> Provenance Dossier Box)
  useEffect(() => {
    if (isArtistSuiteHovered) return
    const interval = setInterval(() => {
      setActiveArtistSuiteIdx((prev) => (prev + 1) % 2)
    }, 3600)
    return () => clearInterval(interval)
  }, [isArtistSuiteHovered])

  // Sequential cycling of Dimensions boxes (Canvas Size <-> Medium)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDimBoxIdx((prev) => (prev + 1) % 2)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  // Sequential cycling of Artist Filmstrip cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFilmstripIdx((prev) => (prev + 1) % 5)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  // Sequential cycling of Provenance Accreditations
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAccreditationIdx((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])
  
  // Mobile Touch Swipe States
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)

  // Delivery Destinations Dataset (Air Freight Destinations across India and Global)
  const DELIVERY_DESTINATIONS = [
    {
      id: 'tamil-nadu',
      state: 'Tamil Nadu',
      city: 'Chennai & Coimbatore Art Hub',
      code: 'MAA',
      flightNumber: 'ZG-AIR-8821',
      distance: '1,340 km',
      duration: '2h 15m Express Flight',
      route: 'BOM ✈️ MAA',
      tag: 'Priority Air Corridor'
    },
    {
      id: 'karnataka',
      state: 'Karnataka',
      city: 'Bengaluru Tech & Art Corridor',
      code: 'BLR',
      flightNumber: 'ZG-AIR-4412',
      distance: '980 km',
      duration: '1h 45m Express Flight',
      route: 'BOM ✈️ BLR',
      tag: 'Same-Day Air Cargo'
    },
    {
      id: 'delhi-ncr',
      state: 'Delhi NCR',
      city: 'Indira Gandhi Cultural Hub',
      code: 'DEL',
      flightNumber: 'ZG-AIR-1102',
      distance: '1,420 km',
      duration: '2h 10m Express Flight',
      route: 'BOM ✈️ DEL',
      tag: 'Direct Capital Route'
    },
    {
      id: 'maharashtra',
      state: 'Maharashtra',
      city: 'Mumbai & Pune Art District',
      code: 'BOM',
      flightNumber: 'ZG-AIR-001',
      distance: '150 km',
      duration: 'Direct Express Dispatch',
      route: 'BOM ✈️ VAULT',
      tag: 'Local Vault Hub'
    },
    {
      id: 'telangana',
      state: 'Telangana',
      city: 'Hyderabad Collector Terminal',
      code: 'HYD',
      flightNumber: 'ZG-AIR-5590',
      distance: '710 km',
      duration: '1h 25m Express Flight',
      route: 'BOM ✈️ HYD',
      tag: 'Direct Air Corridor'
    },
    {
      id: 'kerala',
      state: 'Kerala',
      city: 'Kochi Biennale Air Port',
      code: 'COK',
      flightNumber: 'ZG-AIR-3388',
      distance: '1,510 km',
      duration: '2h 20m Express Flight',
      route: 'BOM ✈️ COK',
      tag: 'Coastal Air Route'
    },
    {
      id: 'west-bengal',
      state: 'West Bengal',
      city: 'Kolkata Heritage Terminal',
      code: 'CCU',
      flightNumber: 'ZG-AIR-7721',
      distance: '1,960 km',
      duration: '2h 45m Express Flight',
      route: 'BOM ✈️ CCU',
      tag: 'Eastern Air Corridor'
    },
    {
      id: 'international',
      state: 'Global / International',
      city: 'New York (JFK) • London (LHR) • Dubai (DXB)',
      code: 'GLOBAL',
      flightNumber: 'ZG-SKY-9900',
      distance: '7,800+ km',
      duration: 'Priority Transcontinental Flight',
      route: 'BOM ✈️ JFK / LHR',
      tag: 'Insured Global Air Freight'
    }
  ]

  // Shipping Interactive Journey State
  const [shippingStep, setShippingStep] = useState(0)
  const [isShippingAutoPlay, setIsShippingAutoPlay] = useState(true)
  const [inspectedArtworkIdx, setInspectedArtworkIdx] = useState(0)
  const [packagedArtworkIdx, setPackagedArtworkIdx] = useState(0)
  const [selectedDestination, setSelectedDestination] = useState(DELIVERY_DESTINATIONS[0]) // Defaults to Tamil Nadu as requested

  // Real-Room 3D Visualizer States
  const [isRoomAutoPlay, setIsRoomAutoPlay] = useState(true)
  const [isRoomHovered, setIsRoomHovered] = useState(false)
  const [activeFrameId, setActiveFrameId] = useState('gold-leaf')
  const [cameraAngleId, setCameraAngleId] = useState('center')
  const [isSpotlightOn, setIsSpotlightOn] = useState(true)
  const [manualRotation, setManualRotation] = useState({ rotateX: 0, rotateY: 0 })
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [scaleMultiplier, setScaleMultiplier] = useState(1.0)
  const [yOffset, setYOffset] = useState(0) // Fine-tune wall height offset %
  const [showAdvancedTools, setShowAdvancedTools] = useState(false)

  // Image Frame References
  const imageFrameRef = useRef(null)
  const thumbnailContainerRef = useRef(null)

  // Upload States
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [imageOrientationData, setImageOrientationData] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])

  // Authentic Zigguratss Gallery Dataset (6 Master Artworks from Repository)
  const [galleryThumbs, setGalleryThumbs] = useState([
    {
      id: 'divine-tunes',
      title: 'Divine Tunes-11',
      src: screenshotImage,
      label: 'Master Canvas',
      alt: 'Divine Tunes-11 - primary artwork',
      defaultRoom: 'living-room',
      aspectRatio: 281 / 313, // 0.898 (Portrait)
      orientation: 'portrait',
      dimensions: '32 × 30 in (81.3 × 76.2 cm)',
      wallWidthPct: 18.0,
      maxHeightPct: 33.0
    },
    {
      id: 'butterfly-sonata',
      title: 'The Butterfly Sonata',
      src: flowersImage,
      label: 'Butterfly Sonata',
      alt: 'The Butterfly Sonata - floral motif',
      defaultRoom: 'master-bedroom',
      aspectRatio: 549 / 710, // 0.773 (Portrait)
      orientation: 'portrait',
      dimensions: '30 × 38 in (76.2 × 96.5 cm)',
      wallWidthPct: 17.5,
      maxHeightPct: 34.0
    },
    {
      id: 'geometric-symmetry',
      title: 'Geometric Symmetry',
      src: image9,
      label: 'Geometric Symmetry',
      alt: 'Geometric Symmetry - form and balance',
      defaultRoom: 'gallery-salon',
      aspectRatio: 735 / 913, // 0.805 (Portrait)
      orientation: 'portrait',
      dimensions: '32 × 40 in (81.3 × 101.6 cm)',
      wallWidthPct: 17.5,
      maxHeightPct: 34.0
    },
    {
      id: 'wall-mount-1',
      title: 'Curatorial Wall Mount',
      src: testImage,
      label: 'Wall Mount 1',
      alt: 'Curatorial wall mount plate',
      defaultRoom: 'gallery-salon',
      aspectRatio: 1200 / 1022, // 1.174 (Near Square)
      orientation: 'square',
      dimensions: '36 × 31 in (91.4 × 78.7 cm)',
      wallWidthPct: 21.0,
      maxHeightPct: 31.0,
      isWallHung: true
    },
    {
      id: 'framed-canvas',
      title: 'Studio Framed Canvas',
      src: testImage2,
      label: 'Framed Canvas',
      alt: 'Studio framed canvas',
      defaultRoom: 'living-room',
      aspectRatio: 1080 / 1350, // 0.800 (Portrait)
      orientation: 'portrait',
      dimensions: '30 × 37.5 in (76.2 × 95.3 cm)',
      wallWidthPct: 17.5,
      maxHeightPct: 34.0,
      isWallHung: true
    },
    {
      id: 'museum-setting',
      title: 'Archival Museum Setting',
      src: hansImage,
      label: 'Museum Setting',
      alt: 'Archival museum setting plate',
      defaultRoom: 'executive-lounge',
      aspectRatio: 736 / 736, // 1.000 (Square)
      orientation: 'square',
      dimensions: '34 × 34 in (86.4 × 86.4 cm)',
      wallWidthPct: 20.0,
      maxHeightPct: 32.0,
      isWallHung: true
    }
  ])

  // =========================================================
  // UNIFIED 24-STEP CONTINUOUS ROOM & ARTWORK TOUR ENGINE:
  // (4 Rooms × 6 Artworks = 24 Total Sequential Steps)
  // Sequence:
  // Room 1 (Luxury Living Room)   -> Images 1 to 6
  // Room 2 (Master Suite Retreat) -> Images 1 to 6
  // Room 3 (Curated Gallery Salon)-> Images 1 to 6
  // Room 4 (Penthouse Lounge)     -> Images 1 to 6
  // Loop back to Room 1
  // =========================================================
  const [stepIndex, setStepIndex] = useState(0)

  const totalArtworks = galleryThumbs.length || 6
  const totalRooms = ROOM_PRESETS.length || 4
  const totalSteps = totalArtworks * totalRooms

  const roomIndex = Math.floor(stepIndex / totalArtworks) % totalRooms
  const active = stepIndex % totalArtworks

  const currentRoom = ROOM_PRESETS[roomIndex] || ROOM_PRESETS[0]
  const activeRoomId = currentRoom.id

  // Convenience state setters for backwards compatibility
  const setActive = (target) => {
    if (typeof target === 'function') {
      setStepIndex((prev) => {
        const curActive = prev % totalArtworks
        const nextActive = target(curActive)
        const curRoomIdx = Math.floor(prev / totalArtworks) % totalRooms
        return curRoomIdx * totalArtworks + ((nextActive + totalArtworks) % totalArtworks)
      })
    } else {
      setStepIndex(roomIndex * totalArtworks + ((target + totalArtworks) % totalArtworks))
    }
  }

  const setActiveRoomId = (targetRoom) => {
    if (typeof targetRoom === 'function') {
      setStepIndex((prev) => {
        const curRoomIdx = Math.floor(prev / totalArtworks) % totalRooms
        const curRoomObj = ROOM_PRESETS[curRoomIdx] || ROOM_PRESETS[0]
        const nextRoomId = targetRoom(curRoomObj.id)
        const nextIdx = ROOM_PRESETS.findIndex((r) => r.id === nextRoomId)
        const safeIdx = nextIdx >= 0 ? nextIdx : 0
        return safeIdx * totalArtworks + 0
      })
    } else {
      const nextIdx = ROOM_PRESETS.findIndex((r) => r.id === targetRoom)
      const safeIdx = nextIdx >= 0 ? nextIdx : 0
      setStepIndex(safeIdx * totalArtworks + 0)
    }
  }

  // Pradip Sarkar Portfolio Filmstrip
  const artistFilmstrip = [
    { title: 'Divine Tunes-11', image: flowersImage, year: '2023' },
    { title: 'Divine Tunes-09', image: screenshotImage, year: '2022' },
    { title: 'Geometric Sonata', image: diff3, year: '2021' },
    { title: 'Spiritual Symphony', image: image2, year: '2020' },
    { title: 'Exhibition Plate', image: akhImage, year: '1995-2024' },
    { title: 'Color In Space', image: diff1, year: '2019' },
    { title: 'Heritage Retrospective', image: historyImage, year: 'Archive' },
    { title: 'Natural Cadence', image: diff5, year: '2018' },
  ]

  // Shipping & Logistics 4-Stage Animated Delivery Pipeline
  const shippingStages = [
    {
      id: 0,
      phase: 'Stage 01',
      title: 'Artwork Inspection & Hologram Certification',
      subtitle: 'Curatorial Verification in Studio',
      description: 'Divine Tunes-11 is retrieved from the master gallery vault, inspected under calibrated museum lighting, and certified with a serialized certificate signed by Pradip Sarkar.',
      highlights: ['Surface Integrity Analysis', 'Signature Authentication', 'Tamper-Evident Hologram Seal'],
      status: 'Quality Verified'
    },
    {
      id: 1,
      phase: 'Stage 02',
      title: 'Archival Museum-Grade Packaging',
      subtitle: 'Multi-Layer Climate & Shock Protection',
      description: 'The master canvas is wrapped in acid-free archival film, cushioned with shock-absorptive foam padding, and encased inside a reinforced heavy-duty archival cylinder with moisture barriers.',
      highlights: ['Acid-Free Glassine Wrap', 'High-Density Edge Armor', 'Reinforced Heavy-Duty Casing'],
      status: 'Archivally Sealed'
    },
    {
      id: 2,
      phase: 'Stage 03',
      title: 'Worldwide Air Cargo & Global Flight Courier',
      subtitle: 'Continuous World Transit from Zigguratss Native Base',
      description: 'Dispatched via dedicated charter aircraft with pressurized, climate-controlled cargo hold (21°C / 45% humidity) and live satellite flight radar tracking across major global art capitals and returning to base.',
      highlights: ['Zigguratss Native Base Departure', 'Real-Time Global Satellite Radar Tracking', '100% Full-Value Lloyd\'s Air Cargo Insurance'],
      status: 'Worldwide Transit Active'
    },
    {
      id: 3,
      phase: 'Stage 04',
      title: 'White-Glove Doorstep',
      subtitle: 'Personal Doorstep Handover',
      description: 'The courier arrives directly at your residence and carefully hands the framed masterpiece to you with white-glove care and personalized unboxing support.',
      highlights: ['Personal Doorstep Handover', 'White-Glove Unboxing Support', 'Direct Collector Receipt'],
      status: 'Ready For Handover'
    }
  ]

  // Shipping Auto-Play Timer with extended duration for Step 3 (Stage 03: Priority Air Flight Transit)
  useEffect(() => {
    if (!isShippingAutoPlay) return

    // Step 1: 14,400ms, Step 2: 10,000ms (Archival Prep), Step 3: 12,000ms, Step 4: 10,000ms
    const currentStepDuration = 
      shippingStep === 0 ? 14400 : 
      shippingStep === 1 ? 10000 :
      shippingStep === 2 ? 12000 : 
      shippingStep === 3 ? 10000 : 4800

    const timer = setTimeout(() => {
      setShippingStep((prev) => (prev + 1) % shippingStages.length)
    }, currentStepDuration)

    return () => clearTimeout(timer)
  }, [shippingStep, isShippingAutoPlay, shippingStages.length])

  // Stage 01 Multi-Artwork Auto-Inspection Timer:
  // Sequentially cycles and inspects all artworks in the gallery (2.4s per artwork)
  useEffect(() => {
    if (shippingStep !== 0) return
    const interval = setInterval(() => {
      setInspectedArtworkIdx((prev) => {
        const next = (prev + 1) % galleryThumbs.length
        setPackagedArtworkIdx(next)
        return next
      })
    }, 2400)
    return () => clearInterval(interval)
  }, [shippingStep, galleryThumbs.length])

  // Combined In-Room Artwork & Room Environment Auto-Tour:
  // Shows all 6 artwork images sequentially in Room 1 (2.8s each),
  // then automatically advances to Room 2 for all 6 images,
  // then Room 3 for all 6 images,
  // then Room 4 for all 6 images,
  // then loops back to Room 1 (24 total steps).
  useEffect(() => {
    if (!isAutoPlay || isRoomHovered) return

    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % totalSteps)
    }, 2800)

    return () => clearInterval(timer)
  }, [isAutoPlay, isRoomHovered, totalSteps])

  // Preload all 4 room background images eagerly so room transitions are instant and buttery smooth
  useEffect(() => {
    ROOM_PRESETS.forEach((room) => {
      if (room.bg) {
        const img = new Image()
        img.src = room.bg
      }
    })
  }, [])

  // Preload all 8 gallery view images eagerly so transitions are instant with zero black flash
  useEffect(() => {
    galleryThumbs.forEach((item) => {
      if (item.src) {
        const img = new Image()
        img.src = item.src
      }
    })
  }, [galleryThumbs])

  // Offer Form State
  const [offerFormData, setOfferFormData] = useState({
    name: '',
    mobile: '',
    country: '',
    email: '',
    offerPrice: ''
  })
  const [offerSubmitted, setOfferSubmitted] = useState(false)

  // Current 3D Room & Frame Configurations
  const currentFrame = FRAME_STYLES.find(f => f.id === activeFrameId) || FRAME_STYLES[0]
  const currentAnglePreset = CAMERA_ANGLES.find(a => a.id === cameraAngleId) || CAMERA_ANGLES[0]
  const activeArtwork = galleryThumbs[active] || galleryThumbs[0]
  const currentInspectedArt = galleryThumbs[inspectedArtworkIdx] || galleryThumbs[0]
  const currentPackagedArt = galleryThumbs[packagedArtworkIdx] || galleryThumbs[0]

  const finalRotateY = currentAnglePreset.rotateY + mouseOffset.x + manualRotation.rotateY
  const finalRotateX = currentAnglePreset.rotateX + mouseOffset.y + manualRotation.rotateX
  const finalScale = (currentAnglePreset.scale || 1.0) * scaleMultiplier

  // 3D Parallax Tilt Handler on Artwork Stage
  const handleStageMouseMove = (e) => {
    if (shouldReduceMotion || isDragging || !imageFrameRef.current) return
    const rect = imageFrameRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMouseOffset({
      x: x * 4,
      y: -y * 2.5
    })
  }

  const handleStageMouseLeave = () => {
    if (!isDragging) {
      setMouseOffset({ x: 0, y: 0 })
    }
  }

  // Touch & Drag 3D Orbit Controls
  const handleStageMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleStageMouseMoveDrag = (e) => {
    if (!isDragging) return
    const deltaX = (e.clientX - dragStart.x) * 0.16
    const deltaY = (e.clientY - dragStart.y) * 0.12
    setManualRotation(prev => ({
      rotateY: Math.max(-18, Math.min(18, prev.rotateY + deltaX)),
      rotateX: Math.max(-10, Math.min(10, prev.rotateX - deltaY))
    }))
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleStageMouseUp = () => {
    setIsDragging(false)
  }

  // Fullscreen Pan & Zoom
  const handleFullscreenMouseMove = (e) => {
    const elem = e.currentTarget
    const { top, left, width, height } = elem.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setMousePosition({ x, y })
  }

  // Gallery Navigation (Moves forward / backward through the 24-step room & artwork tour)
  const nextSlide = () => {
    setStepIndex((prev) => (prev + 1) % totalSteps)
  }

  const prevSlide = () => {
    setStepIndex((prev) => (prev - 1 + totalSteps) % totalSteps)
  }

  // Touch Swipe Handlers for Mobile Gallery
  const handleTouchStart = (e) => {
    setTouchEndX(null)
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return
    const distance = touchStartX - touchEndX
    const minSwipeDistance = 45
    if (distance > minSwipeDistance) {
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      prevSlide()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (openFullscreen) {
        if (e.key === 'Escape') setOpenFullscreen(false)
        if (e.key === 'ArrowRight') nextSlide()
        if (e.key === 'ArrowLeft') prevSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openFullscreen, galleryThumbs.length])

  // Cart & Share Toasts
  const handleAddToCart = () => {
    setCartToast(true)
    setTimeout(() => setCartToast(false), 2400)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Divine Tunes-11 by Pradip Sarkar | Zigguratss',
          url: window.location.href
        })
      } catch (err) {
        console.log('Share dismissed')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      setShareToast(true)
      setTimeout(() => setShareToast(false), 2200)
    }
  }

  // Upload Handlers
  const handleImageSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validation = validateImage(file)
    if (!validation.isValid) {
      setUploadError(validation.errors[0])
      return
    }

    try {
      setUploadError(null)
      const reader = new FileReader()
      reader.onload = (e) => setPreviewImage(e.target?.result)
      reader.readAsDataURL(file)

      const orientationData = await analyzeImageOrientation(file)
      setImageOrientationData({ file, ...orientationData })
    } catch (err) {
      setUploadError(err.message)
    }
  }

  const handleUploadImage = async () => {
    if (!imageOrientationData || !previewImage) return

    try {
      setUploadingImage(true)
      setUploadError(null)

      const newUploadedImage = {
        id: `upload_${Date.now()}`,
        src: previewImage,
        label: `Wall Mount ${uploadedImages.length + 1}`,
        alt: `Custom wall upload ${uploadedImages.length + 1}`,
        isWallHung: true,
        orientation: imageOrientationData.orientation,
        aspectRatio: imageOrientationData.aspectRatio
      }

      setGalleryThumbs(prev => [...prev, newUploadedImage])
      setUploadedImages(prev => [...prev, newUploadedImage])
      setActive(galleryThumbs.length)
      setUploadSuccess(true)

      setTimeout(() => {
        setShowUploadModal(false)
        setUploadSuccess(false)
        setPreviewImage(null)
        setImageOrientationData(null)
      }, 1500)
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleOfferSubmit = (e) => {
    e.preventDefault()
    setOfferSubmitted(true)
    setTimeout(() => {
      setShowOfferModal(false)
      setOfferSubmitted(false)
      setOfferFormData({ name: '', mobile: '', country: '', email: '', offerPrice: '' })
    }, 2500)
  }

  return (
    <div className="product-detail-root space-y-16 sm:space-y-24 lg:space-y-32 w-full">

      {/* ========================================================= */}
      {/* ACT 1: MASTER CANVAS HERO & DIRECT ACQUISITION PANEL */}
      {/* ========================================================= */}
      <div className="space-y-16 sm:space-y-24 lg:space-y-32 w-full">
        <div 
          id="product-acquisition-stage" 
          data-showcase-section
          data-showcase-title="Masterpiece Gallery & Room Visualizer"
          className="scroll-mt-24"
        >
        {/* Breadcrumb Navigation & Top Actions */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6 pb-4 border-b border-neutral-800/80 w-full"
        >
          {/* Breadcrumb Trail */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-400 font-medium">
            <a href="/" className="hover:text-[#dfb76c] transition-colors shrink-0">Collections</a>
            <span className="text-neutral-600 shrink-0">/</span>
            <a href="#artist-section" className="hover:text-[#dfb76c] transition-colors shrink-0">Pradip Sarkar</a>
            <span className="text-neutral-600 shrink-0">/</span>
            <span className="text-[#dfb76c] font-semibold shrink-0">Divine Tunes-11</span>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {onReplayEntrance && (
              <button
                onClick={onReplayEntrance}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#dfb76c]/40 hover:border-[#dfb76c] bg-[#dfb76c]/10 hover:bg-[#dfb76c]/20 text-[#f7d794] text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-sm"
                title="Replay Cinematic 3D Entrance Reveal"
              >
                <Sparkles size={12} className="text-[#dfb76c]" />
                <span>Replay Reveal</span>
              </button>
            )}

            <button
              onClick={() => setWishlistActive(!wishlistActive)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-medium cursor-pointer shrink-0 shadow-sm ${
                wishlistActive 
                  ? 'border-red-500/60 bg-red-500/10 text-red-400' 
                  : 'border-neutral-800 hover:border-[#dfb76c]/60 bg-[#121217] text-neutral-300 hover:text-white'
              }`}
            >
              <Heart size={12} className={wishlistActive ? 'fill-red-400 text-red-400' : ''} />
              <span>{wishlistActive ? 'Saved' : 'Wishlist'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-800 hover:border-[#dfb76c]/60 bg-[#121217] text-neutral-300 hover:text-[#dfb76c] text-xs font-medium transition-all cursor-pointer shrink-0 shadow-sm"
            >
              <Share2 size={12} />
              <span>Share</span>
            </button>
          </div>
        </motion.div>

        {/* Hero Grid: Clean Two-Column Gallery & Acquisition Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start w-full">
          {/* LEFT: MASTER ARTWORK GALLERY (7 Columns) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-3.5 sm:space-y-5 w-full min-w-0">
            {/* Main Cinematic Real-Room 3D Artwork Stage */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0c0c12] border border-neutral-800 hover:border-[#dfb76c]/40 shadow-[0_16px_50px_rgba(0,0,0,0.6)] group flex flex-col w-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              ref={imageFrameRef}
            >
              {/* Dynamic Auto-Advance Live Progress Line */}
              <div className="w-full h-1 bg-neutral-800/80 overflow-hidden relative z-30">
                <motion.div
                  key={`gallery-prog-step-${stepIndex}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.8, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-[#c9a96e] via-[#f7d794] to-[#dfb76c] shadow-[0_0_8px_#dfb76c]"
                />
              </div>

              {/* Dedicated Non-Colliding Real-Room HUD Control Bar */}
              <div className="relative z-30 flex items-center justify-between gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-3 bg-[#0c0c12]/95 backdrop-blur-md border-b border-neutral-800/80 w-full">
                <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1 overflow-hidden">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#dfb76c]/15 border border-[#dfb76c]/40 flex items-center justify-center text-sm shadow-[0_0_12px_rgba(223,183,108,0.25)] shrink-0">
                    <Rotate3d size={14} className={`text-[#dfb76c] ${isAutoPlay ? 'animate-spin-slow' : ''}`} />
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#dfb76c] font-semibold truncate">
                        3D Real Room
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[8px] sm:text-[9px] font-mono tracking-wider font-semibold shrink-0">
                        LIVE
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-neutral-300 font-light flex items-center gap-1 min-w-0 truncate">
                      <span className="text-[#dfb76c] font-mono font-semibold shrink-0">0{active + 1}.</span>
                      <span className="truncate text-white font-medium">{galleryThumbs[active]?.label}</span>
                      <span className="text-neutral-500 hidden xs:inline">•</span>
                      <span className="text-neutral-400 hidden xs:inline truncate">{currentRoom.name}</span>
                    </p>
                  </div>
                </div>

                {/* Right Stage Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsAutoPlay(!isAutoPlay) }}
                    className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-[9px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                      isAutoPlay 
                        ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794]' 
                        : 'bg-[#14141d] border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                    title="Toggle 3D Rotation Auto Pan"
                  >
                    {isAutoPlay ? <Pause size={12} className="text-[#dfb76c]" /> : <Play size={12} />}
                    <span className="hidden sm:inline">{isAutoPlay ? '3D Orbiting' : 'Orbit Paused'}</span>
                  </button>

                  <button
                    onClick={() => setIsSpotlightOn(!isSpotlightOn)}
                    className={`p-1.5 sm:p-2 rounded-lg border transition-all cursor-pointer shrink-0 ${
                      isSpotlightOn
                        ? 'bg-[#dfb76c]/20 border-[#dfb76c]/60 text-[#dfb76c]'
                        : 'bg-[#14141d] border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                    title="Toggle Ambient Gallery Spotlight"
                  >
                    <Sun size={12} className="sm:w-3.5 sm:h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setManualRotation({ rotateX: 0, rotateY: 0 })
                      setCameraAngleId('center')
                      setScaleMultiplier(1.0)
                    }}
                    className="p-1.5 sm:p-2 bg-[#14141d] hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 transition-all cursor-pointer shrink-0"
                    title="Reset 3D Angle & Zoom"
                  >
                    <Compass size={12} className="sm:w-3.5 sm:h-3.5" />
                  </button>

                  <button
                    onClick={() => setOpenFullscreen(true)}
                    className="p-1.5 sm:p-2 bg-[#14141d] hover:bg-[#dfb76c] hover:text-neutral-950 rounded-lg border border-neutral-800 hover:border-[#dfb76c] text-neutral-200 transition-all cursor-pointer shrink-0"
                    title="Fullscreen Ultra Zoom"
                  >
                    <Maximize2 size={12} className="sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3D Real-Room Stage Display */}
              <div
                className="w-full h-[280px] xs:h-[340px] sm:h-[440px] md:h-[500px] xl:h-[560px] select-none overflow-hidden cursor-grab active:cursor-grabbing relative"
                style={{ perspective: '1200px', touchAction: 'pan-y' }}
                onMouseMove={handleStageMouseMove}
                onMouseLeave={handleStageMouseLeave}
                onMouseDown={handleStageMouseDown}
                onMouseMoveCapture={handleStageMouseMoveDrag}
                onMouseUp={handleStageMouseUp}
              >
                {/* 3D Rotational Room Plane */}
                <motion.div
                  animate={
                    isAutoPlay && !isDragging
                      ? {
                          rotateY: [finalRotateY - 3.5, finalRotateY + 3.5, finalRotateY - 3.5],
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
                    isAutoPlay && !isDragging
                      ? {
                          duration: 8.0,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }
                      : {
                          duration: 0.25,
                          ease: 'easeOut'
                        }
                  }
                  className="relative w-full h-full transform-gpu"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center'
                  }}
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
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                      draggable={false}
                      loading="eager"
                    />
                  </AnimatePresence>

                  {/* Museum Overhead Track Spotlight Glow */}
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
                      width: `${(activeArtwork.wallWidthPct || 18.0) * (currentRoom.wall.scaleFactor || 1.0) * scaleMultiplier}%`,
                      maxWidth: activeArtwork.orientation === 'landscape' ? '380px' : activeArtwork.orientation === 'portrait' ? '280px' : '310px',
                      maxHeight: `${(currentRoom.wall.maxHeightPct || 32.0) * scaleMultiplier}%`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Hanging Frame Container */}
                    <div
                      className={`relative rounded-sm transition-all duration-300 ${currentFrame.borderStyle} ${currentFrame.outerShadow}`}
                    >
                      {/* Inner Archival Mat */}
                      <div className={`${currentFrame.innerMat} ${currentFrame.matBorder}`}>
                        {/* Artwork Canvas Image */}
                        <div 
                          className="relative overflow-hidden bg-neutral-950 flex items-center justify-center"
                          style={{
                            aspectRatio: `${activeArtwork.aspectRatio || 1}`
                          }}
                        >
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={activeArtwork.src}
                              src={activeArtwork.src}
                              alt={activeArtwork.alt || activeArtwork.title || 'Artwork'}
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1.0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.35 }}
                              className="w-full h-full object-contain block select-none pointer-events-none filter contrast-[1.03] brightness-[1.01]"
                              draggable={false}
                              loading="eager"
                            />
                          </AnimatePresence>

                          {/* Subtle Museum Glare Sheen Reflection */}
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
                </motion.div>

                {/* Left / Right Carousel Controls */}
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); prevSlide() }}
                  aria-label="Previous view"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#121217]/85 hover:bg-[#dfb76c] hover:text-neutral-950 text-neutral-200 backdrop-blur-md border border-neutral-700 shadow-lg flex items-center justify-center transition-all cursor-pointer z-30"
                >
                  <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.button>
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); nextSlide() }}
                  aria-label="Next view"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#121217]/85 hover:bg-[#dfb76c] hover:text-neutral-950 text-neutral-200 backdrop-blur-md border border-neutral-700 shadow-lg flex items-center justify-center transition-all cursor-pointer z-30"
                >
                  <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.button>

                {/* Unified Non-Colliding Bottom Bar */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none z-30">
                  <div className="bg-[#0c0c10]/90 backdrop-blur-md border border-neutral-700/80 text-neutral-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8.5px] sm:text-[10px] flex items-center gap-1 shadow-lg">
                    <Move size={10} className="text-[#dfb76c] animate-pulse" />
                    <span className="hidden xs:inline">Drag to rotate 3D room</span>
                    <span className="xs:hidden">Drag to orbit</span>
                  </div>

                  <div className="bg-[#0c0c10]/90 backdrop-blur-md border border-neutral-700/80 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8.5px] sm:text-xs font-light tracking-wide shadow-lg whitespace-nowrap flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-pulse" />
                    <span className="text-[#dfb76c] font-medium">Room {roomIndex + 1}/4</span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-[#f7d794] font-medium">View {active + 1}/{galleryThumbs.length}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── ROW 1: REAL ROOM ENVIRONMENT SELECTOR (6 IMAGES PER ROOM AUTO-TOUR) ── */}
            <div 
              onMouseEnter={() => setIsRoomHovered(true)}
              onMouseLeave={() => setIsRoomHovered(false)}
              className="space-y-1.5 w-full"
            >
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-neutral-400 font-medium uppercase tracking-wider px-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Home size={12} className="text-[#dfb76c] shrink-0" />
                  <span className="truncate">1. Room Environment:</span>
                  <span className="text-[#dfb76c] font-semibold truncate hidden xs:inline">{currentRoom.name}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[9px] font-mono text-[#dfb76c] bg-[#dfb76c]/10 border border-[#dfb76c]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-pulse" />
                    {isAutoPlay && !isRoomHovered 
                      ? `Tour Active` 
                      : 'Paused'}
                  </span>
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="p-1 px-1.5 rounded bg-neutral-900 hover:bg-[#dfb76c]/20 hover:text-[#f7d794] border border-neutral-800 text-neutral-400 text-[9px] font-mono transition-all cursor-pointer flex items-center gap-1"
                    title={isAutoPlay ? "Pause 6-Image Room Tour" : "Resume 6-Image Room Tour"}
                  >
                    {isAutoPlay && !isRoomHovered ? <Pause size={9} /> : <Play size={9} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 w-full">
                {ROOM_PRESETS.map((room, idx) => {
                  const isRoomActive = roomIndex === idx
                  return (
                    <motion.button
                      key={room.id}
                      onClick={() => {
                        setStepIndex(idx * totalArtworks + 0)
                        setYOffset(0)
                      }}
                      animate={{
                        scale: isRoomActive ? 1.02 : 1.0,
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                      className={`px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 relative overflow-hidden ${
                        isRoomActive
                          ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794] shadow-[0_0_15px_rgba(223,183,108,0.3)] ring-1 ring-[#dfb76c]/50 z-10'
                          : 'bg-[#121217] border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {isRoomActive && (
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#dfb76c] shadow-[0_0_8px_#dfb76c]" />
                      )}
                      <span className="text-xs sm:text-sm shrink-0">{room.icon}</span>
                      <div className="min-w-0">
                        <div className={`text-[9.5px] sm:text-[11px] font-semibold truncate ${isRoomActive ? 'text-white' : ''}`}>
                          {room.name}
                        </div>
                        <div className="text-[7.5px] sm:text-[8px] text-neutral-400 truncate">{room.subtitle}</div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* ── ROW 2: FRAME STYLES & ZOOM / POSITION CONTROLS BAR ── */}
            <div className="bg-[#121217]/90 p-2 sm:p-3 rounded-xl border border-neutral-800/80 space-y-2 w-full">
              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 text-[10px] sm:text-xs">
                {/* Frame Style Pills */}
                <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full pb-0.5" style={{ scrollbarWidth: 'none' }}>
                  <span className="text-neutral-400 uppercase tracking-wider font-semibold text-[8.5px] sm:text-[10px] pr-1 flex items-center gap-1 shrink-0">
                    <Box size={10} className="text-[#dfb76c]" /> Frame:
                  </span>
                  {FRAME_STYLES.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setActiveFrameId(frame.id)}
                      className={`px-2 py-0.5 sm:py-1 rounded-lg border transition-all text-[8.5px] sm:text-[10px] font-medium whitespace-nowrap cursor-pointer shrink-0 ${
                        activeFrameId === frame.id
                          ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794] font-semibold'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {frame.name.split(' (')[0]}
                    </button>
                  ))}
                </div>

                {/* 3D Camera Zoom Controls */}
                <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full pb-0.5 shrink-0" style={{ scrollbarWidth: 'none' }}>
                  <span className="text-neutral-400 uppercase tracking-wider font-semibold text-[8.5px] sm:text-[10px] flex items-center gap-1 shrink-0">
                    <ZoomIn size={10} className="text-[#dfb76c]" /> Zoom:
                  </span>
                  <button
                    onClick={() => setScaleMultiplier(1.0)}
                    className={`px-1.5 sm:px-2 py-0.5 rounded border text-[8.5px] sm:text-[9px] font-mono cursor-pointer shrink-0 ${
                      scaleMultiplier === 1.0 ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794]' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    1.0x Room
                  </button>
                  <button
                    onClick={() => setScaleMultiplier(1.2)}
                    className={`px-1.5 sm:px-2 py-0.5 rounded border text-[8.5px] sm:text-[9px] font-mono cursor-pointer shrink-0 ${
                      scaleMultiplier === 1.2 ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794]' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    1.2x Focus
                  </button>
                  <button
                    onClick={() => setScaleMultiplier(1.45)}
                    className={`px-1.5 sm:px-2 py-0.5 rounded border text-[8.5px] sm:text-[9px] font-mono cursor-pointer shrink-0 ${
                      scaleMultiplier === 1.45 ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794]' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    1.45x Detail
                  </button>
                </div>
              </div>
            </div>

            {/* ── ROW 3: MASTER VIEWS PRESET RIBBON ── */}
            <div className="product-preset-ribbon flex flex-row items-center gap-1 sm:gap-2 overflow-x-auto pb-1 text-xs flex-nowrap w-full" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              <span className="text-neutral-400 font-medium uppercase tracking-wider text-[9px] sm:text-[11px] pr-1 flex items-center gap-1 shrink-0 flex-shrink-0">
                <Layers size={11} className="text-[#dfb76c]" /> {galleryThumbs.length} Views:
              </span>
              {galleryThumbs.map((view, idx) => (
                <button
                  key={`${view.label}-${idx}`}
                  onClick={() => setStepIndex(roomIndex * totalArtworks + idx)}
                  className={`product-preset-pill px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all whitespace-nowrap cursor-pointer text-[9px] sm:text-xs shrink-0 flex-shrink-0 flex items-center gap-1 sm:gap-1.5 ${
                    active === idx
                      ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794] font-semibold shadow-[0_0_12px_rgba(223,183,108,0.3)]'
                      : 'bg-[#121217] border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${active === idx ? 'bg-[#dfb76c] shadow-[0_0_6px_#dfb76c]' : 'bg-neutral-600'}`} />
                  <span className="font-mono text-[8px] sm:text-[9px] text-[#dfb76c]">0{idx + 1}.</span>
                  <span>{view.label}</span>
                </button>
              ))}
            </div>

            {/* ── ROW 4: 8 GALLERY THUMBNAILS RAIL ── */}
            <div
              ref={thumbnailContainerRef}
              className="product-thumbnail-rail flex flex-row items-center gap-1.5 sm:gap-3 overflow-x-auto py-1.5 px-0.5 snap-x snap-mandatory flex-nowrap w-full"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {galleryThumbs.map((t, i) => (
                <button
                  key={`${t.label}-${i}`}
                  onClick={() => setStepIndex(roomIndex * totalArtworks + i)}
                  className={`group relative shrink-0 flex-shrink-0 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-xl sm:rounded-2xl cursor-pointer overflow-hidden snap-center bg-[#14141a] transition-all duration-300 ${
                    i === active
                      ? 'border-2 border-[#dfb76c] shadow-[0_4px_20px_rgba(223,183,108,0.35)] ring-2 sm:ring-4 ring-[#dfb76c]/20 opacity-100 scale-100'
                      : 'border border-neutral-800 hover:border-[#dfb76c]/50 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Thumbnail ${i + 1}: ${t.label}`}
                >
                  <img
                    src={t.src}
                    alt={t.alt}
                    className="w-full h-full object-contain p-0.5 sm:p-1 pointer-events-none select-none"
                    loading="eager"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/85 py-0.5 text-center text-[6.5px] sm:text-[8px] text-[#f7d794] font-medium truncate px-0.5">
                    0{i + 1}. {t.label}
                  </div>
                  {i === active && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-[#dfb76c]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: ELEGANT PURCHASE DOSSIER (5 Columns) */}
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 space-y-4 sm:space-y-6 w-full min-w-0"
          >
            <div className="bg-[#121217]/95 backdrop-blur-2xl p-4 xs:p-5 sm:p-7 lg:p-8 xl:p-9 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-[0_16px_50px_rgba(0,0,0,0.5)] space-y-4 sm:space-y-6 w-full">
              {/* Header: Title & Artist */}
              <div className="space-y-1.5 sm:space-y-2 pb-4 sm:pb-6 border-b border-neutral-800/80">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block">
                    Archival Masterpiece
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                    0{active + 1} / 0{galleryThumbs.length}
                  </span>
                </div>
                <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] font-normal text-white tracking-tight leading-tight break-words">
                  Divine Tunes-11
                </h1>
                <div className="flex items-center gap-2 pt-0.5 sm:pt-1">
                  <span className="text-xs sm:text-sm text-neutral-400 font-light">By</span>
                  <a
                    href="#artist-section"
                    className="text-xs sm:text-sm font-medium text-white hover:text-[#dfb76c] transition-colors underline underline-offset-4 decoration-[#dfb76c]/50"
                  >
                    Pradip Sarkar
                  </a>
                  <CheckCircle2 size={15} className="text-[#dfb76c]" />
                </div>
              </div>

              {/* Price Section */}
              <div className="pb-4 sm:pb-6 border-b border-neutral-800/80 space-y-1 sm:space-y-2">
                <span className="text-[9.5px] sm:text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium block">
                  Acquisition Value
                </span>
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                  <span className="font-serif text-2xl xs:text-3xl sm:text-4xl font-normal text-white tracking-tight">
                    ₹1,18,300
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-400 font-light">
                    ($1,577.33 USD)
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-neutral-400 font-light pt-0.5 sm:pt-1">
                  Includes all taxes • Insured white-glove global air transit • Authenticity certificate
                </p>
              </div>

              {/* Dimensions & Unit Switcher */}
              <div className="pb-4 sm:pb-6 border-b border-neutral-800/80 space-y-2.5 sm:space-y-3">
                <div className="flex flex-row items-center justify-between gap-2">
                  <span className="text-[9.5px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] text-neutral-400 font-medium truncate">
                    Dimensions & Medium
                  </span>
                  <div className="product-unit-toggle bg-neutral-900 p-0.5 rounded-lg border border-neutral-700/80 inline-flex flex-row items-center shrink-0 flex-nowrap">
                    <button
                      onClick={() => setUnit('inch')}
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[9.5px] sm:text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0 ${
                        unit === 'inch' ? 'bg-[#dfb76c] text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Inches
                    </button>
                    <button
                      onClick={() => setUnit('cm')}
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[9.5px] sm:text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0 ${
                        unit === 'cm' ? 'bg-[#dfb76c] text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Centimeters
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs w-full">
                  <motion.div 
                    onClick={() => setActiveDimBoxIdx(0)}
                    animate={{
                      scale: activeDimBoxIdx === 0 ? 1.02 : 1.0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                    className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      activeDimBoxIdx === 0
                        ? 'bg-gradient-to-br from-[#202030] via-[#161622] to-[#101016] border-[#dfb76c] ring-1 ring-[#dfb76c]/40 shadow-[0_4px_20px_rgba(223,183,108,0.2)]'
                        : 'bg-neutral-900/90 border-neutral-800 opacity-80'
                    }`}
                  >
                    {activeDimBoxIdx === 0 && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#dfb76c]" />
                    )}
                    <span className={`text-[9.5px] sm:text-[11px] uppercase tracking-wider block mb-0.5 sm:mb-1 transition-colors ${
                      activeDimBoxIdx === 0 ? 'text-[#f7d794] font-semibold' : 'text-neutral-400'
                    }`}>Canvas Size</span>
                    <span className={`font-medium text-[11px] xs:text-xs sm:text-sm break-words transition-colors ${
                      activeDimBoxIdx === 0 ? 'text-white font-semibold' : 'text-neutral-200'
                    }`}>
                      {unit === 'inch' ? '32 × 30 in' : '81.28 × 76.2 cm'}
                    </span>
                  </motion.div>

                  <motion.div 
                    onClick={() => setActiveDimBoxIdx(1)}
                    animate={{
                      scale: activeDimBoxIdx === 1 ? 1.02 : 1.0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                    className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      activeDimBoxIdx === 1
                        ? 'bg-gradient-to-br from-[#202030] via-[#161622] to-[#101016] border-[#dfb76c] ring-1 ring-[#dfb76c]/40 shadow-[0_4px_20px_rgba(223,183,108,0.2)]'
                        : 'bg-neutral-900/90 border-neutral-800 opacity-80'
                    }`}
                  >
                    {activeDimBoxIdx === 1 && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#dfb76c]" />
                    )}
                    <span className={`text-[9.5px] sm:text-[11px] uppercase tracking-wider block mb-0.5 sm:mb-1 transition-colors ${
                      activeDimBoxIdx === 1 ? 'text-[#f7d794] font-semibold' : 'text-neutral-400'
                    }`}>Medium</span>
                    <span className={`font-medium text-[11px] xs:text-xs sm:text-sm break-words transition-colors ${
                      activeDimBoxIdx === 1 ? 'text-white font-semibold' : 'text-neutral-200'
                    }`}>
                      Acrylic on Canvas
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2 sm:space-y-3 pt-0.5">
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full py-3 sm:py-3.5 md:py-4 px-3 sm:px-6 bg-gradient-to-r from-[#dfb76c] via-[#f7d794] to-[#dfb76c] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 rounded-xl sm:rounded-2xl text-[10.5px] xs:text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] font-bold transition-all duration-300 shadow-[0_8px_30px_rgba(223,183,108,0.3)] hover:shadow-[0_12px_40px_rgba(223,183,108,0.45)] flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
                >
                  <CreditCard size={14} className="shrink-0" />
                  <span className="truncate">Acquire Artwork • ₹1,18,300</span>
                </motion.button>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    onClick={() => setShowOfferModal(true)}
                    className="py-2.5 sm:py-3 md:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl border border-[#dfb76c] text-[#dfb76c] hover:bg-[#dfb76c]/10 text-[9.5px] xs:text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer bg-neutral-900/60"
                  >
                    <MessageCircle size={12} className="shrink-0" />
                    <span>Make Offer</span>
                  </motion.button>

                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="py-2.5 sm:py-3 md:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl border border-neutral-700 hover:border-neutral-500 text-neutral-200 hover:bg-neutral-800 text-[9.5px] xs:text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer bg-neutral-900/60"
                  >
                    <ShoppingCart size={12} className="shrink-0" />
                    <span>Add to Cart</span>
                  </motion.button>
                </div>
              </div>

              {/* 4 Guarantees / Rules with Sequential Auto-Highlight Animation (Big -> Small Cycle) */}
              <div 
                onMouseEnter={() => setIsTrustHovered(true)}
                onMouseLeave={() => setIsTrustHovered(false)}
                className="pt-3 sm:pt-4 border-t border-neutral-800/80 space-y-1.5 sm:space-y-2 relative"
              >
                {TRUST_GUARANTEE_ITEMS.map((item, idx) => {
                  const IconComp = item.icon
                  const isActive = activeTrustIndex === idx

                  return (
                    <motion.div
                      key={item.id}
                      onClick={() => setActiveTrustIndex(idx)}
                      animate={{
                        scale: isActive ? 1.02 : 1.0,
                        x: isActive ? 3 : 0,
                      }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 380, 
                        damping: 24, 
                        mass: 0.8 
                      }}
                      className={`group flex flex-row items-center justify-between p-2 sm:p-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#dfb76c]/20 via-[#dfb76c]/8 to-neutral-900/40 border border-[#dfb76c]/45 shadow-[0_4px_20px_rgba(223,183,108,0.18)]'
                          : 'hover:bg-neutral-900/50 border border-transparent opacity-65 hover:opacity-90'
                      }`}
                    >
                      <div className="flex flex-row items-center gap-2.5 min-w-0 flex-1">
                        <div 
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-all duration-300 flex-shrink-0 flex items-center justify-center ${
                            isActive
                              ? 'bg-[#dfb76c] text-neutral-950 shadow-[0_0_12px_rgba(223,183,108,0.6)]'
                              : 'bg-neutral-800/80 text-[#dfb76c]'
                          }`}
                        >
                          <IconComp size={14} className="stroke-[2.2]" />
                        </div>
                        <span 
                          className={`transition-all duration-300 text-left text-[11px] sm:text-xs leading-snug line-clamp-2 ${
                            isActive
                              ? 'font-semibold text-white tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
                              : 'text-neutral-400 font-light'
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>

                      {/* Active Indicator Pulse Pill */}
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-[#dfb76c]/20 text-[#dfb76c] border border-[#dfb76c]/40 flex-shrink-0 ml-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-pulse" />
                          {item.tag}
                        </motion.span>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 3: PRECISION TECHNICAL DOSSIER & SPECIFICATIONS */}
      {/* ========================================================= */}
      <motion.section 
        data-showcase-section
        data-showcase-title="Technical Ledger & Specs"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="bg-[#121217]/90 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-xl space-y-5 sm:space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1">
              Specifications
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight">
              Artwork Details & Technical Ledger
            </h3>
          </div>

          <div 
            onMouseEnter={() => setIsSpecHovered(true)}
            onMouseLeave={() => setIsSpecHovered(false)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-2 sm:pt-4 text-xs"
          >
            {[
              { label: 'Category', value: 'Portrait / Abstract' },
              { label: 'Style', value: 'Geometric Abstraction' },
              { label: 'Techniques', value: 'Layered Impasto' },
              { label: 'Medium Used', value: 'Acrylic on Canvas' },
              { label: 'Size (Inches)', value: unit === 'cm' ? '81.28 × 76.20 cm' : '32.00 × 30.00 in' },
              { label: 'Valuation', value: '₹1,18,300 ($1,577)' },
              { label: 'Year Created', value: '2023 (Archival)' },
              { label: 'Delivery Format', value: 'Rolled in Archival Tube' }
            ].map((spec, i) => {
              const isActive = activeSpecIdx === i
              return (
                <motion.div
                  key={spec.label}
                  onClick={() => setActiveSpecIdx(i)}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{
                    scale: isActive ? 1.05 : 1.0,
                    y: isActive ? -4 : 0,
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 350, 
                    damping: 24, 
                    mass: 0.8 
                  }}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-b from-[#252538] via-[#1a1a27] to-[#12121b] border-[#dfb76c] ring-2 ring-[#dfb76c]/50 shadow-[0_8px_30px_rgba(223,183,108,0.32)] z-10'
                      : 'bg-gradient-to-b from-[#1d1d2b] via-[#14141e] to-[#101017] border-neutral-800 hover:border-[#dfb76c]/40 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                    isActive ? 'bg-[#dfb76c] opacity-100 shadow-[0_0_10px_#dfb76c]' : 'bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent opacity-40'
                  }`} />
                  <div className="flex items-center justify-between">
                    <span className={`uppercase tracking-wider text-[10px] sm:text-[11px] font-semibold block mb-0.5 sm:mb-1 transition-colors ${
                      isActive ? 'text-[#f7d794]' : 'text-[#dfb76c]'
                    }`}>
                      {spec.label}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-ping shrink-0" />
                    )}
                  </div>
                  <span className={`font-medium text-xs sm:text-sm block transition-colors ${
                    isActive ? 'text-white font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]' : 'text-neutral-200'
                  }`}>
                    {spec.value}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 4: ARTIST SPOTLIGHT & CURATORIAL PROVENANCE DOSSIER */}
      {/* ========================================================= */}
      <motion.section 
        id="artist-section" 
        data-showcase-section
        data-showcase-title="Artist Spotlight & Provenance"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-4 sm:pt-6"
      >
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1.5 sm:mb-2">
            The Master Behind The Canvas
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight">
            Artist Spotlight & Provenance
          </h2>
        </motion.div>

        {/* 2-Column Curated Artist Suite: Profile + Curatorial Provenance Dossier (Sequential Auto-Highlight) */}
        <div 
          onMouseEnter={() => setIsArtistSuiteHovered(true)}
          onMouseLeave={() => setIsArtistSuiteHovered(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10 sm:mb-14"
        >
          {/* Left: Artist Profile Card (7 cols on lg, 8 on xl) */}
          <div 
            onClick={() => setActiveArtistSuiteIdx(0)}
            className="lg:col-span-7 xl:col-span-8 flex w-full"
          >
            <ArtistCardMini 
              name="Pradip Sarkar" 
              location="Mumbai, India" 
              isHighlighted={activeArtistSuiteIdx === 0}
            />
          </div>

          {/* Right: Curatorial Provenance & Advisory Dossier (5 cols on lg, 4 on xl) */}
          <motion.div 
            onClick={() => setActiveArtistSuiteIdx(1)}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            animate={{
              scale: activeArtistSuiteIdx === 1 ? 1.025 : 1.0,
            }}
            className={`lg:col-span-5 xl:col-span-4 flex flex-col justify-between gap-4 p-5 sm:p-7 rounded-2xl sm:rounded-3xl backdrop-blur-xl transition-all duration-500 w-full cursor-pointer relative overflow-hidden ${
              activeArtistSuiteIdx === 1
                ? 'bg-gradient-to-br from-[#1b1b28] via-[#13131c] to-[#0e0e14] border-2 border-[#dfb76c] ring-2 ring-[#dfb76c]/40 shadow-[0_0_40px_rgba(223,183,108,0.28)]'
                : 'bg-[#121217]/90 border border-neutral-800 hover:border-[#dfb76c]/40 shadow-xl'
            }`}
          >
            {/* Active Top Highlight Bar */}
            {activeArtistSuiteIdx === 1 && (
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent shadow-[0_0_10px_#dfb76c]" />
            )}

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#dfb76c] animate-pulse" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#dfb76c] font-mono font-semibold">
                    Curatorial Provenance
                  </span>
                </div>
                {activeArtistSuiteIdx === 1 && (
                  <span className="text-[9px] uppercase tracking-wider font-bold bg-[#dfb76c]/20 text-[#dfb76c] px-2 py-0.5 rounded-full border border-[#dfb76c]/30">
                    Active Focus
                  </span>
                )}
              </div>

              <h4 className={`font-serif text-lg sm:text-xl font-medium mb-2 transition-colors ${
                activeArtistSuiteIdx === 1 ? 'text-[#f7d794]' : 'text-white'
              }`}>
                Santiniketan Master Pedigree
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                Pradip Sarkar’s artworks are curated by Zigguratss directly from the artist's studio. Each acquisition is certified with a serialized Certificate of Authenticity (COA) and verified provenance archive.
              </p>

              {/* 3 Key Curatorial Accreditations with Sequential Auto-Highlight */}
              <div className="space-y-2 pt-3 border-t border-neutral-800/80">
                {[
                  {
                    icon: CheckCircle2,
                    title: 'Kala Bhavana Alumni',
                    sub: 'Visva-Bharati University, Santiniketan'
                  },
                  {
                    icon: Award,
                    title: 'National Scholar Fellowship',
                    sub: 'Ministry of Culture Government Awardee'
                  },
                  {
                    icon: Shield,
                    title: 'Museum-Grade Archival',
                    sub: 'Lightfast pigments on heavy linen canvas'
                  }
                ].map((acc, idx) => {
                  const AccIcon = acc.icon
                  const isActive = activeAccreditationIdx === idx
                  return (
                    <motion.div 
                      key={acc.title}
                      onClick={() => setActiveAccreditationIdx(idx)}
                      animate={{
                        scale: isActive ? 1.03 : 1.0,
                        x: isActive ? 4 : 0
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                      className={`flex items-start gap-2.5 p-2 rounded-xl transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? 'bg-[#dfb76c]/15 border border-[#dfb76c]/40 shadow-sm' 
                          : 'hover:bg-white/[0.02] border border-transparent'
                      }`}
                    >
                      <AccIcon size={16} className={`shrink-0 mt-0.5 transition-colors ${
                        isActive ? 'text-[#f7d794]' : 'text-[#dfb76c]'
                      }`} />
                      <div>
                        <strong className={`block font-medium text-xs sm:text-sm transition-colors ${
                          isActive ? 'text-white font-semibold' : 'text-neutral-200'
                        }`}>{acc.title}</strong>
                        <span className={`text-[11px] transition-colors ${
                          isActive ? 'text-[#f7d794]' : 'text-neutral-400'
                        }`}>{acc.sub}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Direct Curator Access CTA */}
            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-neutral-400">Direct Curator Inquiry</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowOfferModal(true)
                }}
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#dfb76c]/15 hover:bg-[#dfb76c] text-[#f7d794] hover:text-neutral-950 border border-[#dfb76c]/40 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-md shrink-0"
              >
                <MessageCircle size={13} />
                <span>Private Viewing</span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50 transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 5: MASTER ARTIST MONOGRAPH & STUDIO FILMSTRIP */}
      {/* ========================================================= */}
      <motion.section 
        data-showcase-section
        data-showcase-title="Pradip Sarkar Retrospective"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="bg-[#121217]/90 backdrop-blur-xl p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-xl space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-neutral-800/80 pb-4 sm:pb-6">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1">
                Artist Monograph & Archive
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight">
                Pradip Sarkar — Master Retrospective
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 py-1.5 px-3 sm:px-3.5 bg-neutral-900 rounded-full border border-neutral-700 text-xs text-[#dfb76c] font-semibold w-fit">
              <Award size={13} />
              <span>30+ Years of Artistic Mastery</span>
            </div>
          </div>

          {/* Continuous Animated Artist Filmstrip */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="uppercase tracking-wider font-semibold text-[#dfb76c] text-[11px] sm:text-xs">
                ✦ Oeuvre & Studio Filmstrip
              </span>
              <span className="text-[11px] sm:text-xs">Continuous Exhibition Reel</span>
            </div>
            <div className="overflow-x-auto py-2 px-1 snap-x flex gap-3 sm:gap-4" style={{ scrollbarWidth: 'none' }}>
              {artistFilmstrip.map((item, idx) => {
                const isActive = activeFilmstripIdx === idx
                return (
                  <motion.div
                    key={`${item.title}-${idx}`}
                    onClick={() => setActiveFilmstripIdx(idx)}
                    animate={{
                      scale: isActive ? 1.05 : 1.0,
                      y: isActive ? -4 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                    className={`flex-shrink-0 w-36 xs:w-44 sm:w-52 rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 group cursor-pointer relative ${
                      isActive
                        ? 'bg-neutral-900 border-[#dfb76c] ring-1 ring-[#dfb76c]/50 shadow-[0_8px_25px_rgba(223,183,108,0.3)]'
                        : 'bg-neutral-900/90 border-neutral-800 opacity-75 hover:opacity-100'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#dfb76c] z-20 shadow-[0_0_8px_#dfb76c]" />
                    )}
                    <div className="h-28 xs:h-36 sm:h-40 w-full overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isActive ? 'scale-108' : 'group-hover:scale-105'
                        }`} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-2 text-[9px] sm:text-[10px] text-[#dfb76c] font-mono bg-black/60 px-1.5 py-0.5 rounded">
                        {item.year}
                      </span>
                    </div>
                    <div className="p-2.5 sm:p-3">
                      <h6 className={`font-serif text-[11px] sm:text-xs font-medium truncate transition-colors ${
                        isActive ? 'text-[#f7d794] font-semibold' : 'text-white group-hover:text-[#dfb76c]'
                      }`}>
                        {item.title}
                      </h6>
                      <span className="text-[10px] text-neutral-400">Pradip Sarkar</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* 4 Concise Milestone Cards with Sequential Auto-Highlight Animation */}
          <div 
            onMouseEnter={() => setIsMilestoneHovered(true)}
            onMouseLeave={() => setIsMilestoneHovered(false)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {[
              { origin: 'Origin', title: 'Dhanbad, Jharkhand', desc: 'Commerce Graduate, Ranchi University' },
              { origin: 'Academic', title: 'Diploma in Fine Art', desc: 'British Institute, Mumbai' },
              { origin: 'Exhibitions', title: '70+ Curated Shows', desc: 'Active Indian contemporary artist since 1995' },
              { origin: 'Presence', title: 'Lalit Kala Akademi', desc: 'Featured across prestigious institutions' }
            ].map((m, idx) => {
              const isActive = activeMilestoneIdx === idx
              return (
                <motion.div
                  key={m.title}
                  onClick={() => setActiveMilestoneIdx(idx)}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{
                    scale: isActive ? 1.05 : 1.0,
                    y: isActive ? -4 : 0,
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 350, 
                    damping: 24, 
                    mass: 0.8 
                  }}
                  className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-br from-[#222234] via-[#181824] to-[#101018] border-[#dfb76c] ring-1 ring-[#dfb76c]/50 shadow-[0_8px_30px_rgba(223,183,108,0.28)] z-10'
                      : 'bg-neutral-900/90 border-neutral-800 hover:border-[#dfb76c]/40 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                    isActive ? 'bg-[#dfb76c] opacity-100 shadow-[0_0_10px_#dfb76c]' : 'bg-transparent opacity-0'
                  }`} />
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] uppercase tracking-widest font-bold block transition-colors ${
                      isActive ? 'text-[#f7d794]' : 'text-[#dfb76c]'
                    }`}>
                      {m.origin}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-pulse" />
                    )}
                  </div>
                  <h5 className={`font-serif text-xs sm:text-sm font-medium transition-colors ${
                    isActive ? 'text-white font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]' : 'text-neutral-200'
                  }`}>
                    {m.title}
                  </h5>
                  <p className={`text-[10px] sm:text-[11px] font-light mt-1 transition-colors ${
                    isActive ? 'text-neutral-200' : 'text-neutral-400'
                  }`}>
                    {m.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Philosophical Quote Block */}
          <blockquote className="p-4 sm:p-6 md:p-8 bg-[#161622] rounded-xl sm:rounded-2xl border-l-4 border-[#dfb76c] text-[#f7d794] font-serif italic text-base sm:text-lg md:text-xl leading-relaxed flex items-center justify-between gap-4">
            <div>
              "Art is the expression of my own life story... art is divine."
              <span className="block text-xs font-sans text-neutral-400 not-italic mt-2 tracking-widest uppercase">
                — Pradip Sarkar, Mumbai
              </span>
            </div>
            <Sparkles size={24} className="text-[#dfb76c] flex-shrink-0 hidden sm:block opacity-70" />
          </blockquote>
        </div>
      </motion.section>

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 6: RELATED MASTERWORKS MARQUEE STREAMS */}
      {/* ========================================================= */}
      <ArtistMarqueesSection />

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50 transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 7: INTERACTIVE 4-STAGE WHITE-GLOVE LOGISTICS PIPELINE (KEPT DOWN) */}
      {/* ========================================================= */}
      <motion.section 
        data-showcase-section
        data-showcase-title="White-Glove Logistics Journey"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="bg-[#121217]/90 backdrop-blur-xl p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-xl space-y-8 sm:space-y-10">
          {/* Header with Live Telemetry Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-neutral-800/80 pb-4 sm:pb-6">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1">
                Logistics & Fulfillment Journey
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight">
                From Vault to Your Sanctuary
              </h3>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsShippingAutoPlay(!isShippingAutoPlay)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-[#dfb76c] text-[11px] sm:text-xs font-medium text-neutral-300 transition-all cursor-pointer"
              >
                {isShippingAutoPlay ? <Pause size={11} className="text-[#dfb76c]" /> : <Play size={11} className="text-[#dfb76c]" />}
                <span>{isShippingAutoPlay ? 'Simulating' : 'Paused'}</span>
              </button>
              <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#dfb76c]/15 text-[#dfb76c] text-[10px] sm:text-xs font-semibold rounded-full border border-[#dfb76c]/30">
                {shippingStages[shippingStep].status}
              </div>
            </div>
          </div>

          {/* Interactive Timeline Step Switcher with Sequential Auto-Highlight */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {shippingStages.map((stage, idx) => {
              const isActive = shippingStep === idx
              return (
                <motion.button
                  key={stage.phase}
                  onClick={() => {
                    setShippingStep(idx)
                    setIsShippingAutoPlay(false)
                  }}
                  animate={{
                    scale: isActive ? 1.04 : 1.0,
                    y: isActive ? -3 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                  className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-br from-[#1e1e2d] via-[#14141e] to-[#0f0f15] border-[#dfb76c] ring-1 ring-[#dfb76c]/40 shadow-[0_6px_25px_rgba(223,183,108,0.28)] z-10'
                      : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#dfb76c] shadow-[0_0_8px_#dfb76c]" />
                  )}
                  <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider block mb-0.5 transition-colors ${
                    isActive ? 'text-[#f7d794] font-bold' : 'text-[#dfb76c]'
                  }`}>
                    0{idx + 1} // {stage.phase}
                  </span>
                  <span className={`font-serif text-xs sm:text-sm font-medium block truncate transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-300'
                  }`}>
                    {stage.title.split(' ')[0]} {stage.title.split(' ')[1]}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Main Stage Simulation Theater */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#161622] to-[#0f0f15] border border-neutral-800 p-4 sm:p-7 md:p-10 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(223,183,108,0.12),transparent_70%)] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={shippingStep}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
              >
                {/* Visual Graphic */}
                <div className={`lg:col-span-7 w-full rounded-xl sm:rounded-2xl overflow-hidden relative flex items-center justify-center ${
                  shippingStep === 1 || shippingStep === 2 || shippingStep === 3
                    ? 'p-0 bg-transparent border-0 shadow-2xl' 
                    : 'h-56 xs:h-64 sm:h-72 bg-black/60 border border-neutral-800 p-3 sm:p-6'
                }`}>
                  {shippingStep === 0 && (
                    <div className="relative w-full h-full flex flex-col justify-between p-2 sm:p-3 overflow-hidden bg-black/70 rounded-xl sm:rounded-2xl border border-neutral-800 shadow-inner">
                      {/* Top Telemetry Header */}
                      <div className="w-full flex items-center justify-between px-1.5 pt-0.5 text-[9px] sm:text-[10px] z-20">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span className="font-mono text-[#dfb76c] font-semibold">
                            INSPECTING 0{inspectedArtworkIdx + 1} OF 0{galleryThumbs.length}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#dfb76c]/15 border border-[#dfb76c]/30 text-[#f7d794] font-mono text-[8px] sm:text-[9px]">
                          Calibrated 5500K Spectrum
                        </span>
                      </div>

                      {/* Center Inspection Canvas with Sweeping Hologram Reticle */}
                      <div className="relative w-36 xs:w-44 sm:w-48 h-32 xs:h-36 sm:h-40 mx-auto my-1 rounded-lg sm:rounded-xl overflow-hidden border-2 border-[#dfb76c]/60 shadow-[0_0_25px_rgba(223,183,108,0.3)] bg-neutral-950 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentInspectedArt.id || inspectedArtworkIdx}
                            src={currentInspectedArt.src}
                            alt={currentInspectedArt.alt || currentInspectedArt.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1.0 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.35 }}
                            className="w-full h-full object-contain p-1 select-none"
                          />
                        </AnimatePresence>

                        {/* Sweeping Laser Scanner Beam */}
                        <motion.div
                          animate={{ y: [-70, 70, -70] }}
                          transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent shadow-[0_0_12px_#dfb76c] pointer-events-none z-10"
                        />

                        {/* Dynamic Hologram Reticle */}
                        <motion.div
                          animate={{
                            x: [-10, 10, -6, 0],
                            y: [-10, 6, -10, 0],
                            scale: [1, 1.06, 1]
                          }}
                          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-2 sm:inset-3 rounded-full border-2 border-[#dfb76c] shadow-[0_0_20px_rgba(223,183,108,0.6)] pointer-events-none flex items-center justify-center z-10"
                        >
                          <span className="text-[8px] sm:text-[9px] text-[#dfb76c] font-mono font-bold bg-black/85 px-1.5 py-0.5 rounded border border-[#dfb76c]/40">
                            VERIFIED ✓
                          </span>
                        </motion.div>

                        {/* Active Artwork Title Badge */}
                        <div className="absolute bottom-0 inset-x-0 bg-black/90 backdrop-blur-sm py-0.5 px-1 text-center text-[8px] sm:text-[9px] text-neutral-200 font-medium truncate z-10 border-t border-neutral-800">
                          <span className="text-[#dfb76c] font-mono font-bold">0{inspectedArtworkIdx + 1}.</span> {currentInspectedArt.title || currentInspectedArt.label}
                        </div>
                      </div>

                      {/* Bottom: All 6 Artwork Mini Thumbnails & Hologram Stamp */}
                      <div className="w-full flex items-center justify-between gap-1.5 px-1 z-20">
                        {/* 6 Miniature Thumbnails */}
                        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5" style={{ scrollbarWidth: 'none' }}>
                          {galleryThumbs.map((art, idx) => (
                            <button
                              key={art.id || idx}
                              onClick={() => {
                                setInspectedArtworkIdx(idx)
                                setPackagedArtworkIdx(idx)
                              }}
                              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md overflow-hidden border transition-all cursor-pointer relative shrink-0 ${
                                inspectedArtworkIdx === idx
                                  ? 'border-[#dfb76c] ring-2 ring-[#dfb76c]/40 scale-105 opacity-100 shadow-[0_0_8px_#dfb76c]'
                                  : 'border-neutral-800 opacity-40 hover:opacity-80'
                              }`}
                              title={`Inspect ${art.title || art.label}`}
                            >
                              <img src={art.src} alt={art.label} className="w-full h-full object-cover" />
                              {inspectedArtworkIdx === idx && (
                                <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-[#dfb76c]" />
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Serialized Hologram Badge */}
                        <div className="px-2 py-0.5 sm:py-1 rounded-lg bg-[#121217]/95 border border-[#dfb76c]/40 text-[8px] sm:text-[9px] text-[#dfb76c] flex items-center gap-1 shrink-0 font-mono">
                          <CheckCircle2 size={10} />
                          <span>#ZG-7819-0{inspectedArtworkIdx + 1}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {shippingStep === 1 && (
                    <div className="relative w-full">
                      <ArchivalPreparationScene 
                        isReducedMotion={shouldReduceMotion} 
                        artworkSrc={currentPackagedArt.src}
                        artworkTitle={currentPackagedArt.title || currentPackagedArt.label || 'Divine Tunes-11'}
                      />
                    </div>
                  )}

                  {shippingStep === 2 && (
                    <div className="relative w-full">
                      <FlightRadarMap />
                    </div>
                  )}

                  {shippingStep === 3 && (
                    <div className="relative w-full">
                      <WhiteGloveDoorstepScene 
                        isReducedMotion={shouldReduceMotion} 
                        artworkSrc={currentPackagedArt.src}
                        artworkTitle={currentPackagedArt.title || currentPackagedArt.label || 'Divine Tunes-11'}
                      />
                    </div>
                  )}
                </div>

                {/* Right Details */}
                <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#dfb76c] font-semibold block">
                    {shippingStages[shippingStep].subtitle}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white leading-tight">
                    {shippingStages[shippingStep].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {shippingStages[shippingStep].description}
                  </p>

                  <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                    {shippingStages[shippingStep].highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-300">
                        <Check size={13} className="text-[#dfb76c] flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3">
                    <button
                      onClick={() => {
                        setShippingStep((prev) => (prev - 1 + shippingStages.length) % shippingStages.length)
                        setIsShippingAutoPlay(false)
                      }}
                      className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[11px] sm:text-xs font-medium text-neutral-300 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <ChevronLeft size={13} />
                      <span>Prev Step</span>
                    </button>
                    <button
                      onClick={() => {
                        setShippingStep((prev) => (prev + 1) % shippingStages.length)
                        setIsShippingAutoPlay(false)
                      }}
                      className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#dfb76c] hover:bg-[#f7d794] text-neutral-950 text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-md"
                    >
                      <span>Next Step</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 4 Guarantees Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Clock, title: '5–7 Days Domestic', desc: 'Direct express delivery across India with priority freight routing.' },
              { icon: Globe, title: '10–20 Days Global', desc: 'Worldwide insured air courier delivery with customs handling.' },
              { icon: Shield, title: '100% Value Insured', desc: 'Artwork fully protected from the moment it leaves our vault.' },
              { icon: RefreshCw, title: '14-Day Return', desc: '24-hour damage inspection window & 14-day collector return privilege.' }
            ].map((g, idx) => (
              <motion.div
                key={g.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="p-3.5 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800 hover:border-[#dfb76c]/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-[#dfb76c] font-semibold text-xs mb-1">
                  <g.icon size={13} />
                  <span>{g.title}</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 8: VERIFIED COLLECTOR LETTERHEAD REVIEWS (KEPT DOWN) */}
      {/* ========================================================= */}
      <CollectorReviewsSection />
      </div>

      {/* ========================================================= */}
      {/* HIGH-RESOLUTION FULLSCREEN ZOOM MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {openFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenFullscreen(false)}
          >
            <div
              className="relative max-w-7xl w-[96%] h-[92%] bg-black/40 rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center p-2 sm:p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenFullscreen(false)}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 z-50 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-[#dfb76c] hover:text-neutral-950 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                aria-label="Close fullscreen"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>

              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-40 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/80 backdrop-blur-md border border-neutral-700 text-white text-[10px] sm:text-xs font-light tracking-wide flex items-center gap-1.5 sm:gap-2 max-w-[70%]">
                <ZoomIn size={13} className="text-[#dfb76c] flex-shrink-0" />
                <span className="truncate">Move cursor to inspect brushwork • ESC to close</span>
              </div>

              <div
                className="w-full h-full flex items-center justify-center overflow-hidden cursor-zoom-in relative"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleFullscreenMouseMove}
              >
                <motion.img
                  src={galleryThumbs[active]?.src}
                  alt={galleryThumbs[active]?.alt || "High-resolution artwork view"}
                  className="max-w-full max-h-full object-contain"
                  animate={{ scale: isZoomed ? 2.6 : 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MAKE AN OFFER MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showOfferModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4"
            onClick={() => setShowOfferModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-[#121217] rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-hidden border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowOfferModal(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 p-2 sm:p-2.5 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer"
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>

              <div className="bg-gradient-to-r from-neutral-900 to-black px-5 py-5 sm:px-8 sm:py-8 text-white relative border-b border-neutral-800">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1">
                  Private Acquisition
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal tracking-tight">
                  Make An Offer to the Artist
                </h2>
                <p className="text-neutral-400 text-[11px] sm:text-xs mt-1 sm:mt-1.5 font-light">
                  Submit your proposal directly for Pradip Sarkar's consideration.
                </p>
              </div>

              <div className="p-5 sm:p-8 max-h-[calc(92vh-130px)] overflow-y-auto">
                {offerSubmitted ? (
                  <div className="p-6 sm:p-8 text-center space-y-3 bg-[#161620] rounded-2xl border border-[#dfb76c]/40">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check size={24} />
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl font-medium text-white">Offer Submitted</h4>
                    <p className="text-xs text-neutral-300">
                      Your offer for <strong>Divine Tunes-11</strong> has been sent to the artist. You will be contacted within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleOfferSubmit} className="space-y-3.5 sm:space-y-4">
                    <div>
                      <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1 sm:mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={offerFormData.name}
                        onChange={(e) => setOfferFormData({ ...offerFormData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-xl focus:border-[#dfb76c] focus:bg-[#161620] outline-none text-xs sm:text-sm text-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1 sm:mb-1.5">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={offerFormData.mobile}
                          onChange={(e) => setOfferFormData({ ...offerFormData, mobile: e.target.value })}
                          className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-xl focus:border-[#dfb76c] focus:bg-[#161620] outline-none text-xs sm:text-sm text-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1 sm:mb-1.5">
                          Country
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. India"
                          value={offerFormData.country}
                          onChange={(e) => setOfferFormData({ ...offerFormData, country: e.target.value })}
                          className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-xl focus:border-[#dfb76c] focus:bg-[#161620] outline-none text-xs sm:text-sm text-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1 sm:mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={offerFormData.email}
                        onChange={(e) => setOfferFormData({ ...offerFormData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-xl focus:border-[#dfb76c] focus:bg-[#161620] outline-none text-xs sm:text-sm text-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1 sm:mb-1.5">
                        Proposed Offer Price (₹ INR / $ USD)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ₹95,000"
                        value={offerFormData.offerPrice}
                        onChange={(e) => setOfferFormData({ ...offerFormData, offerPrice: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-xl focus:border-[#dfb76c] focus:bg-[#161620] outline-none text-xs sm:text-sm font-semibold text-[#f7d794] transition-all"
                      />
                    </div>

                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      type="submit"
                      className="w-full mt-2 py-3.5 sm:py-4 bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 rounded-xl text-xs uppercase tracking-[0.18em] font-bold transition-all shadow-lg cursor-pointer"
                    >
                      Submit Offer Proposal
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 3D REAL-ROOM STUDIO & WALL VISUALIZER MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-2 sm:p-4 md:p-6"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-[#0e0e14] rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[94vh] overflow-y-auto border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 z-40 p-2 sm:p-2.5 bg-neutral-900/90 hover:bg-[#dfb76c] hover:text-neutral-950 text-neutral-300 rounded-full transition-all cursor-pointer border border-neutral-700 shadow-lg"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>

              <div className="p-3 sm:p-6">
                <RealRoom3DVisualizer
                  initialRoomId="living-room"
                  selectedArtworkSrc={galleryThumbs[0]?.src || screenshotImage}
                  selectedArtworkTitle="Divine Tunes-11"
                  showControls={true}
                  autoRotateDefault={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* TOAST NOTIFICATIONS */}
      {/* ========================================================= */}
      <AnimatePresence>
        {cartToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#121217] text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-2xl border border-[#dfb76c]/40 flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs uppercase tracking-wider font-semibold"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#dfb76c] text-neutral-950 flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <span>Artwork Added to Cart</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#121217] text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-2xl border border-[#dfb76c]/40 flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs uppercase tracking-wider font-semibold"
          >
            <Share2 size={14} className="text-[#dfb76c]" />
            <span>Link Copied to Clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
