import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
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
import ArtistSaga, { ArtistMarqueesSection, CollectorReviewsSection, ALL_CURATED_ARTWORKS } from './ArtistSaga'
import WallHangedImageGenerator from './WallHangedImageGenerator'
import FlightRadarMap from './FlightRadarMap'
import ArchivalPreparationScene from './ArchivalPreparationScene'
import WhiteGloveDoorstepScene from './WhiteGloveDoorstepScene'
import ProductGuidelineOverlayManager from './ProductGuidelineModals'
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
import collectorStudyImg from '../assets/rooms/collector_study.jpg'
import diningPavilionImg from '../assets/rooms/dining_pavilion.jpg'

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
  const [searchParams] = useSearchParams()
  const artworkParam = searchParams.get('id') || searchParams.get('title')

  const selectedArtwork = ALL_CURATED_ARTWORKS?.find(
    (item) => item.id === artworkParam || item.title?.toLowerCase() === artworkParam?.toLowerCase()
  ) || ALL_CURATED_ARTWORKS?.find((item) => item.id === 'dt-11') || ALL_CURATED_ARTWORKS?.[0]

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
  const [activeSpecIdx, setActiveSpecIdx] = useState(0)
  const [isSpecHovered, setIsSpecHovered] = useState(false)
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(0)
  const [isMilestoneHovered, setIsMilestoneHovered] = useState(false)
  const [activeArtistSuiteIdx, setActiveArtistSuiteIdx] = useState(0)
  const [isArtistSuiteHovered, setIsArtistSuiteHovered] = useState(false)
  const [activeDimBoxIdx, setActiveDimBoxIdx] = useState(0)
  const [activeAccreditationIdx, setActiveAccreditationIdx] = useState(0)
  const [activeGuideline, setActiveGuideline] = useState(null)
  const [isGuidelinePinned, setIsGuidelinePinned] = useState(false)
  const hoverGuidelineTimeoutRef = useRef(null)
  const hoverIntentTimeoutRef = useRef(null)

  // Floating horizontal product details bar accompanying Act 5 (Artworks), Act 6 (Shipping), and Act 7 (Reviews)
  const lowerSectionsRef = useRef(null)
  const [showHorizontalProductBar, setShowHorizontalProductBar] = useState(false)

  useEffect(() => {
    let ticking = false
    const checkVisibility = () => {
      if (!lowerSectionsRef.current) return
      const rect = lowerSectionsRef.current.getBoundingClientRect()
      // Visible when Act 5 enters viewport and until Act 7 scrolls out of view
      const inView = rect.top <= window.innerHeight * 0.88 && rect.bottom >= 140
      setShowHorizontalProductBar(inView)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkVisibility)
        ticking = true
      }
    }

    let observer = null
    if (typeof IntersectionObserver !== 'undefined' && lowerSectionsRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              checkVisibility()
            } else {
              setShowHorizontalProductBar(false)
            }
          })
        },
        { root: null, rootMargin: '0px 0px -40px 0px', threshold: [0, 0.05, 0.1, 0.5, 1.0] }
      )
      observer.observe(lowerSectionsRef.current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    checkVisibility()

    return () => {
      if (observer) observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleGuidelineMouseEnter = (id) => {
    // Clear any pending auto-dismiss timer
    if (hoverGuidelineTimeoutRef.current) {
      clearTimeout(hoverGuidelineTimeoutRef.current)
    }
    if (hoverIntentTimeoutRef.current) {
      clearTimeout(hoverIntentTimeoutRef.current)
    }

    if (isGuidelinePinned) {
      return
    }

    // Immediately open the guideline modal on hover as requested
    setActiveGuideline(id)
    setIsGuidelinePinned(false)

    // Keep preview active for 8 seconds unless pinned or dismissed
    hoverGuidelineTimeoutRef.current = setTimeout(() => {
      setActiveGuideline(null)
    }, 8000)
  }

  const handleGuidelineMouseLeave = () => {
    // Keep guideline open on mouse leave so user can comfortably inspect
  }

  const handleGuidelineClick = (id) => {
    if (hoverIntentTimeoutRef.current) {
      clearTimeout(hoverIntentTimeoutRef.current)
    }
    if (hoverGuidelineTimeoutRef.current) {
      clearTimeout(hoverGuidelineTimeoutRef.current)
    }
    if (activeGuideline === id && isGuidelinePinned) {
      setActiveGuideline(null)
      setIsGuidelinePinned(false)
    } else {
      setActiveGuideline(id)
      setIsGuidelinePinned(true)
    }
  }

  const handleGuidelineKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleGuidelineClick(id)
    }
  }

  const handleCloseGuideline = () => {
    if (hoverIntentTimeoutRef.current) {
      clearTimeout(hoverIntentTimeoutRef.current)
    }
    if (hoverGuidelineTimeoutRef.current) {
      clearTimeout(hoverGuidelineTimeoutRef.current)
    }
    setActiveGuideline(null)
    setIsGuidelinePinned(false)
  }

  const handleMouseEnterModal = () => {
    // Cursor is inside modal panel: keep 7-second countdown active
  }

  const handleMouseLeaveModal = () => {
    // Keep 7-second countdown running unless pinned
  }

  const handlePinGuideline = () => {
    if (hoverGuidelineTimeoutRef.current) {
      clearTimeout(hoverGuidelineTimeoutRef.current)
    }
    setIsGuidelinePinned(true)
  }

  // Sequential cycling of the 4 features: 1 -> 2 -> 3 -> 4 -> 1 (Expands/Grows big then shrinks back)
  useEffect(() => {
    if (isTrustHovered || activeGuideline) return
    const interval = setInterval(() => {
      setActiveTrustIndex((prev) => (prev + 1) % TRUST_GUARANTEE_ITEMS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [isTrustHovered, activeGuideline])

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


  // Sequential cycling of Provenance Accreditations
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAccreditationIdx((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Floating Acquisition Dock when scrolled past primary stage
  const [showFloatingDock, setShowFloatingDock] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 980) {
        setShowFloatingDock(true)
      } else {
        setShowFloatingDock(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Mobile Touch Swipe Coordinates (using ref to avoid state re-renders on touchmove)
  const touchCoordsRef = useRef({ startX: 0, startY: 0, endX: 0, endY: 0 })

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

  // Authentic Zigguratss Master Gallery Dataset (Multiple Artworks in Distinct Room Settings)
  const [galleryThumbs, setGalleryThumbs] = useState([
    {
      id: 'divine-tunes',
      title: 'Divine Tunes-11',
      src: screenshotImage,
      label: 'Master Canvas',
      roomName: 'Living Room',
      alt: 'Divine Tunes-11 in Luxury Living Room',
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
      roomName: 'Master Suite',
      alt: 'The Butterfly Sonata in Master Suite Retreat',
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
      roomName: 'Gallery Salon',
      alt: 'Geometric Symmetry in Curated Gallery Salon',
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
      label: 'Curatorial Mount',
      roomName: 'Penthouse Lounge',
      alt: 'Curatorial Wall Mount in Penthouse Lounge',
      defaultRoom: 'executive-lounge',
      aspectRatio: 1200 / 1022, // 1.174 (Square)
      orientation: 'square',
      dimensions: '36 × 31 in (91.4 × 78.7 cm)',
      wallWidthPct: 21.0,
      maxHeightPct: 31.0
    },
    {
      id: 'framed-canvas',
      title: 'Studio Framed Canvas',
      src: testImage2,
      label: 'Framed Canvas',
      roomName: "Collector's Library",
      alt: "Studio Framed Canvas in Collector's Library",
      defaultRoom: 'collector-study',
      aspectRatio: 1080 / 1350, // 0.800 (Portrait)
      orientation: 'portrait',
      dimensions: '30 × 37.5 in (76.2 × 95.3 cm)',
      wallWidthPct: 17.5,
      maxHeightPct: 34.0
    },
    {
      id: 'museum-setting',
      title: 'Archival Museum Setting',
      src: hansImage,
      label: 'Museum Setting',
      roomName: 'Zen Dining Pavilion',
      alt: 'Archival Museum Setting in Zen Dining Pavilion',
      defaultRoom: 'dining-pavilion',
      aspectRatio: 736 / 736, // 1.000 (Square)
      orientation: 'square',
      dimensions: '34 × 34 in (86.4 × 86.4 cm)',
      wallWidthPct: 20.0,
      maxHeightPct: 32.0
    },
    {
      id: 'birds-flight',
      title: 'Birds in Flight',
      src: birdsImage,
      label: 'Birds in Flight',
      roomName: 'Master Suite',
      alt: 'Birds in Flight in Master Suite Retreat',
      defaultRoom: 'master-bedroom',
      aspectRatio: 800 / 1000, // 0.800 (Portrait)
      orientation: 'portrait',
      dimensions: '28 × 36 in (71.1 × 91.4 cm)',
      wallWidthPct: 17.0,
      maxHeightPct: 33.0
    },
    {
      id: 'heritage-chronology',
      title: 'Heritage Chronology',
      src: historyImage,
      label: 'Heritage Chronology',
      roomName: 'Penthouse Lounge',
      alt: 'Heritage Chronology in Penthouse Lounge',
      defaultRoom: 'executive-lounge',
      aspectRatio: 900 / 900, // 1.000 (Square)
      orientation: 'square',
      dimensions: '36 × 36 in (91.4 × 91.4 cm)',
      wallWidthPct: 20.0,
      maxHeightPct: 32.0
    }
  ])

  // Sync primary gallery image with selected artwork from registry / URL
  useEffect(() => {
    if (!artworkParam || !selectedArtwork) return
    setGalleryThumbs((prev) => {
      const updated = [...prev]
      if (updated[0]) {
        updated[0] = {
          ...updated[0],
          title: selectedArtwork.title,
          src: selectedArtwork.image || updated[0].src,
          alt: `${selectedArtwork.title} in Luxury Living Room`,
          dimensions: `${selectedArtwork.sizeInch} (${selectedArtwork.sizeCm})`,
        }
      }
      return updated
    })
  }, [artworkParam, selectedArtwork])

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
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)

  const totalArtworks = galleryThumbs.length || 1
  const totalRooms = ROOM_PRESETS.length || 4
  const totalSteps = totalArtworks

  const roomIndex = currentRoomIndex % totalRooms
  const active = stepIndex % totalArtworks

  const currentRoom = ROOM_PRESETS[roomIndex] || ROOM_PRESETS[0]
  const activeRoomId = currentRoom.id

  // Convenience state setters for backwards compatibility
  const setActive = (target) => {
    if (typeof target === 'function') {
      setStepIndex((prev) => {
        const curActive = prev % totalArtworks
        const nextActive = target(curActive)
        return (nextActive + totalArtworks) % totalArtworks
      })
    } else {
      setStepIndex((target + totalArtworks) % totalArtworks)
    }
  }

  const setActiveRoomId = (targetRoom) => {
    const nextIdx = ROOM_PRESETS.findIndex((r) => r.id === targetRoom)
    if (nextIdx >= 0) setCurrentRoomIndex(nextIdx)
  }

  // Verified Artwork Technical Specifications Ledger (Zigguratss Curatorial Archives)
  const artworkSpecs = [
    {
      id: 'category',
      label: 'Category',
      value: selectedArtwork?.category || 'Portrait / Abstract',
      heading: 'Category Classification',
      shortDesc: selectedArtwork?.shortDesc || 'Contemporary figurative portraiture fused with meditative geometric abstraction and nature symbolism.',
      detail: 'Contemporary fine art merging expressive figurative portraiture with meditative abstraction, exploring internal tranquility, harmonic balance, and spiritual resonance.',
      highlight: 'Contemporary Indian Fine Art',
      curatorialNote: 'A benchmark piece bridging traditional aesthetic sensibility and international modern abstraction.',
      provenanceSource: 'Zigguratss Curatorial Registry',
      icon: Palette
    },
    {
      id: 'style',
      label: 'Style',
      value: selectedArtwork?.style || 'Geometric Abstraction',
      heading: 'Artistic Style & Movement',
      shortDesc: 'Harmonic cubic matrices and architectural planes creating structured visual cadences on canvas.',
      detail: `Architectural planes, rhythmic cubic grids, and structured geometric matrices inspired by Indian modernism. Partitioned into harmonious tonal blocks that guide the viewer's eye through dimensional visual cadences.`,
      highlight: 'Signature Modernism',
      curatorialNote: 'Distinguished by precise linear discipline paired with emotional warmth and contemplative stillness.',
      provenanceSource: 'Zigguratss Style Archive',
      icon: Layers
    },
    {
      id: 'techniques',
      label: 'Techniques',
      value: 'Layered Impasto',
      heading: 'Execution Technique',
      shortDesc: 'Multi-pass palette knife application and thick pigment relief catching natural ambient lighting.',
      detail: 'Executed through meticulous multi-pass palette knife application and dense impasto layering. The raised physical ridges catch ambient gallery lighting, yielding an ever-shifting surface luminosity that flat reproduction cannot convey.',
      highlight: 'Master Palette Knife Relief',
      curatorialNote: 'Rich textural relief built through successive glaze cycles and sculptural paint application.',
      provenanceSource: 'Zigguratss Studio Records',
      icon: Feather
    },
    {
      id: 'medium',
      label: 'Medium Used',
      value: selectedArtwork?.medium || 'Acrylic on Canvas',
      heading: 'Medium & Substrate',
      shortDesc: `Artist-grade lightfast emulsions on heavyweight Belgian primed cotton-linen canvas.`,
      detail: 'Premium artist-grade, lightfast acrylic emulsions formulated for permanent color saturation and archival stability. The pigment is bonded to heavyweight Belgian cotton-linen canvas primed with museum-grade acid-free titanium gesso.',
      highlight: '100% Archival Grade Materials',
      curatorialNote: 'Lightfastness rated ASTM I (100+ year gallery preservation index without pigment degradation).',
      provenanceSource: 'Zigguratss Materials Ledger',
      icon: Box
    },
    {
      id: 'size',
      label: 'Size (Inches)',
      value: unit === 'cm' ? (selectedArtwork?.sizeCm || '81.28 × 76.20 cm') : (selectedArtwork?.sizeInch || '32.00 × 30.00 in'),
      heading: 'Physical Dimensions & Scale',
      shortDesc: unit === 'cm' ? `${selectedArtwork?.sizeCm || '81.28 × 76.20 cm'} (${selectedArtwork?.sizeInch || '32 × 30 in'}) calibrated for salon & residential spaces.` : `${selectedArtwork?.sizeInch || '32.00 × 30.00 in'} (${selectedArtwork?.sizeCm || '81.28 × 76.20 cm'}) calibrated for salon & residential spaces.`,
      detail: `Museum-proportioned scale measuring exactly ${selectedArtwork?.sizeInch || '32.00 × 30.00 inches'} (${selectedArtwork?.sizeCm || '81.28 × 76.20 cm'}). Perfectly calibrated for prominent salon placement, collector living suites, and high-ceiling architectural environments without visual crowding.`,
      highlight: 'Curated Architectural Scale',
      curatorialNote: 'Includes an additional 2.5-inch perimeter margin of unpainted archival canvas for customized gallery stretching or floating frame mounting.',
      provenanceSource: 'Zigguratss Dimension Registry',
      icon: Move
    },
    {
      id: 'valuation',
      label: 'Valuation',
      value: selectedArtwork?.price ? `${selectedArtwork.price} ($${Math.round((parseInt(selectedArtwork.price.replace(/[^\d]/g, ''), 10) || 118300) / 75).toLocaleString()})` : '₹1,18,300 ($1,577)',
      heading: 'Acquisition Valuation',
      shortDesc: 'Studio-direct pricing indexed against artist auction records and verified gallery registry.',
      detail: `Primary market acquisition valuation indexed directly from ${selectedArtwork?.artist || "Pradip Sarkar"}'s registered studio catalog and verified gallery sales history. Fully inclusive of all museum packaging, provenance verification, and comprehensive air transit insurance.`,
      highlight: 'Registered Studio Provenance',
      curatorialNote: 'Accompanied by an official commercial gallery bill of sale and registered appraisal certification.',
      provenanceSource: 'Zigguratss Pricing Index',
      icon: CreditCard
    },
    {
      id: 'year',
      label: 'Year Created',
      value: `${selectedArtwork?.year || '2023'} (Archival)`,
      heading: 'Creation Chronology',
      shortDesc: `Executed in studio as a cornerstone masterwork of the ${selectedArtwork?.title || 'Divine Tunes'} suite.`,
      detail: `Completed in ${selectedArtwork?.year || '2023'} within ${selectedArtwork?.artist || "Pradip Sarkar"}'s registered studio. Formally cataloged as a vital pillar work representing the peak maturity of the artist's contemporary period.`,
      highlight: `Master Period (${selectedArtwork?.year || '2023'})`,
      curatorialNote: 'Personally titled, dated, and signed by the artist in pigment on the lower canvas face and in archival ink on reverse.',
      provenanceSource: 'Zigguratss Catalog Raisonné',
      icon: Clock
    },
    {
      id: 'delivery',
      label: 'Delivery Format',
      value: 'Rolled in Archival Tube',
      heading: 'Packaging & Transit Spec',
      shortDesc: 'Protected with acid-free glassine sheets and sealed inside heavy-duty rigid cylinder.',
      detail: 'Carefully dismounted from studio stretcher bars, insulated with acid-free glassine sheets and cellular shock wrap, and sealed within a rigid heavy-duty archival cylinder with waterproof end caps for optimal preservation during transport.',
      highlight: 'Global White-Glove Transit',
      curatorialNote: 'Ready for custom local framing upon arrival; detailed professional stretching instructions included.',
      provenanceSource: 'Zigguratss Logistics Protocol',
      icon: Package
    }
  ]

  // Four Verified Artist Milestone Pillars (Placed in Artist Section)
  const artistMilestones = [
    {
      id: 'origin',
      origin: 'Origin',
      title: 'Dhanbad, Jharkhand',
      desc: 'Commerce Graduate, Ranchi University • Cultural roots in Eastern India heritage',
      extended: 'Born with a deep aesthetic curiosity, Sarkar completed his Commerce degree at Ranchi University before dedicating his life fully to fine arts, drawing early inspiration from classical Indian musical traditions and spatial geometry.',
      icon: MapPin,
      badge: 'Heritage & Roots',
      source: 'Ranchi University Registry'
    },
    {
      id: 'academic',
      origin: 'Academic',
      title: 'Diploma in Fine Art',
      desc: 'British Institute, Mumbai • Rigorous classical fine art & modern cubism training',
      extended: 'Mastered classical draughtsmanship, colour chemistry, and modernist spatial geometry at the prestigious British Institute in Mumbai, pioneering his signature cubic impasto language.',
      icon: Award,
      badge: 'Academic Pedigree',
      source: 'British Institute Mumbai'
    },
    {
      id: 'exhibitions',
      origin: 'Exhibitions',
      title: '70+ Curated Shows',
      desc: 'Active Indian contemporary master since 1995 across premier art galleries',
      extended: 'Over three decades of solo and curated group exhibitions in premier cultural capitals including Mumbai, New Delhi, Kolkata, Dubai, London, and Singapore.',
      icon: Palette,
      badge: 'Global Retrospective',
      source: 'Curatorial Archive (1995–2024)'
    },
    {
      id: 'presence',
      origin: 'Presence',
      title: 'Lalit Kala Akademi',
      desc: 'Featured across prestigious national institutions & distinguished global collections',
      extended: 'Regular participation and permanent cataloging at the Lalit Kala Akademi, Jehangir Art Gallery Mumbai, and prestigious private and corporate collections worldwide.',
      icon: Shield,
      badge: 'Institutional Provenance',
      source: 'National Art Institutions'
    }
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
      shippingStep === 3 ? 32000 : 4800

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

  // Room Auto-Tour: smoothly cycle across artworks and room interior environments
  // Room Auto-Tour: smoothly cycle across room interior environments
  useEffect(() => {
    if (!isAutoPlay || isRoomHovered) return

    const timer = setInterval(() => {
      setCurrentRoomIndex((rPrev) => (rPrev + 1) % totalRooms)
    }, 4800)

    return () => clearInterval(timer)
  }, [isAutoPlay, isRoomHovered, totalRooms])

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
  const activeArtwork = galleryThumbs[0]
  const currentInspectedArt = galleryThumbs[inspectedArtworkIdx] || galleryThumbs[0]
  const currentPackagedArt = galleryThumbs[packagedArtworkIdx] || galleryThumbs[0]

  const finalRotateY = currentAnglePreset.rotateY + mouseOffset.x + manualRotation.rotateY
  const finalRotateX = currentAnglePreset.rotateX + mouseOffset.y + manualRotation.rotateX
  const finalScale = currentAnglePreset.scale || 1.0

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
    // Only drag with primary mouse button on desktop/pointer devices
    if (e.button !== 0) return
    if (typeof window !== 'undefined' && 'ontouchstart' in window && window.innerWidth < 1024) return
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

  // Gallery Navigation (Moves forward / backward through the artwork & room tour)
  const nextSlide = () => {
    setStepIndex((prev) => {
      const nextStep = (prev + 1) % totalSteps
      const nextArt = galleryThumbs[nextStep]
      if (nextArt && nextArt.defaultRoom) {
        const rIdx = ROOM_PRESETS.findIndex((r) => r.id === nextArt.defaultRoom)
        if (rIdx >= 0) setCurrentRoomIndex(rIdx)
      }
      return nextStep
    })
  }

  const prevSlide = () => {
    setStepIndex((prev) => {
      const prevStep = (prev - 1 + totalSteps) % totalSteps
      const prevArt = galleryThumbs[prevStep]
      if (prevArt && prevArt.defaultRoom) {
        const rIdx = ROOM_PRESETS.findIndex((r) => r.id === prevArt.defaultRoom)
        if (rIdx >= 0) setCurrentRoomIndex(rIdx)
      }
      return prevStep
    })
  }

  // Touch Swipe Handlers for Mobile Gallery (zero re-render, allows free vertical scrolling)
  const handleTouchStart = (e) => {
    if (!e.touches || !e.touches[0]) return
    touchCoordsRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      endX: e.touches[0].clientX,
      endY: e.touches[0].clientY
    }
  }

  const handleTouchMove = (e) => {
    if (!e.touches || !e.touches[0]) return
    touchCoordsRef.current.endX = e.touches[0].clientX
    touchCoordsRef.current.endY = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    const { startX, startY, endX, endY } = touchCoordsRef.current
    const diffX = startX - endX
    const diffY = startY - endY
    
    // Only trigger horizontal artwork slide change if it is a deliberate horizontal swipe
    // (horizontal distance must be at least 2.2x greater than vertical movement and over 75px)
    if (Math.abs(diffX) > Math.abs(diffY) * 2.2 && Math.abs(diffX) > 75) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
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

  // Reusable Product Purchase Dossier Box (rendered on right side of Acts 1-4)
  const renderProductDossierBox = (keySuffix = 'main', isSecondary = false) => (
    <div className="bg-[#121217]/95 backdrop-blur-2xl p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-[0_18px_55px_rgba(0,0,0,0.55)] space-y-3 sm:space-y-3.5 w-full">
      {/* Header: Title, Artist & Series */}
      <div className="pb-3 border-b border-neutral-800/80">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block">
            Archival Masterpiece • Series 11
          </span>
          <span className="font-mono text-[9px] text-neutral-400 bg-neutral-900 px-2.5 py-0.5 rounded border border-neutral-800">
            0{roomIndex + 1} / 0{ROOM_PRESETS.length} Viewports
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-[28px] font-normal text-white tracking-tight leading-tight">
          {selectedArtwork?.title || 'Divine Tunes-11'}
        </h1>
        <div className="flex items-center gap-2 pt-1 text-xs">
          <span className="text-neutral-400 font-light">By</span>
          <a
            href="#artist-section"
            className="font-medium text-white hover:text-[#dfb76c] transition-colors underline underline-offset-4 decoration-[#dfb76c]/50"
          >
            {selectedArtwork?.artist || 'Pradip Sarkar'}
          </a>
          <CheckCircle2 size={14} className="text-[#dfb76c]" />
          <span className="text-neutral-500 font-mono text-[10px]">• Mumbai Atelier</span>
        </div>
      </div>

      {/* Artwork Acquisition Value & Valuation */}
      <div className="pb-3 border-b border-neutral-800/80 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[9.5px] uppercase tracking-[0.18em] text-neutral-400 font-medium block">
              Archival Acquisition Value
            </span>
            <div className="flex items-baseline gap-2.5 mt-0.5">
              <span className="font-serif text-2xl xs:text-3xl font-semibold text-[#dfb76c] tracking-tight">
                {selectedArtwork?.price || '₹1,18,300'}
              </span>
              {selectedArtwork?.originalPrice && (
                <span className="text-sm text-neutral-500 line-through font-serif">
                  {selectedArtwork.originalPrice}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-md bg-[#8a1c14] text-white text-[9.5px] font-bold font-mono tracking-wider shadow-sm">
                -20%
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-emerald-400 flex items-center justify-end gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              In Vault • Available
            </span>
            <span className="text-[10.5px] text-neutral-500 font-light">($1,577.33 USD)</span>
          </div>
        </div>
        <div className="text-[10px] text-neutral-400 font-light pt-0.5 flex items-center gap-3">
          <span>✓ All GST & export duties included</span>
          <span>✓ Insured air freight</span>
        </div>
      </div>

      {/* Dimensions & Medium */}
      <div className="pb-3 border-b border-neutral-800/80 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9.5px] uppercase tracking-[0.18em] text-neutral-400 font-medium">
            Dimensions & Medium Ledger
          </span>
          <div className="product-unit-toggle bg-neutral-900 p-0.5 rounded-lg border border-neutral-700/80 inline-flex items-center">
            <button
              onClick={() => setUnit('inch')}
              className={`px-2.5 py-0.5 rounded text-[9.5px] uppercase tracking-wider font-semibold cursor-pointer ${
                unit === 'inch' ? 'bg-[#dfb76c] text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-0.5 rounded text-[9.5px] uppercase tracking-wider font-semibold cursor-pointer ${
                unit === 'cm' ? 'bg-[#dfb76c] text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 block mb-0.5">Canvas Scale</span>
            <span className="font-medium text-xs sm:text-sm text-white">
              {unit === 'inch' ? (selectedArtwork?.sizeInch || '32 × 30 in') : (selectedArtwork?.sizeCm || '81.28 × 76.2 cm')}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 block mb-0.5">Medium & Substrate</span>
            <span className="font-medium text-xs sm:text-sm text-white truncate block">
              {selectedArtwork?.medium || 'Acrylic on Canvas'}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-0.5 w-full">
        <motion.button
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full h-11 px-4 bg-gradient-to-r from-[#dfb76c] via-[#f7d794] to-[#dfb76c] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 rounded-xl text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-[0_4px_18px_rgba(223,183,108,0.25)] hover:shadow-[0_6px_24px_rgba(223,183,108,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <CreditCard size={14} className="shrink-0" />
          <span className="whitespace-nowrap">Acquire Artwork</span>
        </motion.button>

        <motion.button
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          onClick={() => setShowOfferModal(true)}
          className="w-full h-11 px-4 rounded-xl border border-[#dfb76c]/80 text-[#dfb76c] hover:bg-[#dfb76c]/15 text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer bg-neutral-900/80 hover:border-[#f7d794]"
        >
          <MessageCircle size={14} className="shrink-0" />
          <span className="whitespace-nowrap">Make Offer</span>
        </motion.button>
      </div>

      {/* All 4 Interactive Product Guidelines Fully Visible */}
      <div 
        onMouseEnter={() => setIsTrustHovered(true)}
        onMouseLeave={() => {
          setIsTrustHovered(false)
          handleGuidelineMouseLeave()
        }}
        className="pt-2.5 sm:pt-3 border-t border-neutral-800/80 space-y-2 relative"
        aria-label="Interactive Product Guidelines"
      >
        <div className="flex items-center justify-between pb-0.5">
          <span className="text-[9.5px] uppercase tracking-[0.2em] text-[#dfb76c] font-semibold block">
            Collector Protection Guarantees (4)
          </span>
          <span className="text-[9px] text-neutral-500 font-mono">Tap or Hover to Inspect</span>
        </div>
        {TRUST_GUARANTEE_ITEMS.map((item, idx) => {
          const IconComp = item.icon
          const isCurrentModal = activeGuideline === item.id
          const isHighlighted = isCurrentModal || (activeTrustIndex === idx && !activeGuideline)

          return (
            <motion.div
              key={`${item.id}-${keySuffix}`}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-expanded={isCurrentModal}
              aria-label={`${item.text} - Tap or hover to view details`}
              onMouseEnter={() => handleGuidelineMouseEnter(item.id)}
              onMouseLeave={handleGuidelineMouseLeave}
              onClick={() => handleGuidelineClick(item.id)}
              onKeyDown={(e) => handleGuidelineKeyDown(e, item.id)}
              animate={{
                scale: isHighlighted ? 1.016 : 1.0,
                x: isHighlighted ? 2.5 : 0,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 24, mass: 0.8 }}
              className={`group flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-300 cursor-pointer select-none ${
                isHighlighted
                  ? 'bg-gradient-to-r from-[#dfb76c]/20 via-[#dfb76c]/10 to-neutral-900/60 border border-[#dfb76c]/70 shadow-[0_4px_16px_rgba(223,183,108,0.2)]'
                  : 'hover:bg-neutral-900/60 border border-neutral-800/60 opacity-85 hover:opacity-100 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div 
                  className={`w-7 h-7 rounded-lg transition-all flex-shrink-0 flex items-center justify-center ${
                    isHighlighted
                      ? 'bg-[#dfb76c] text-neutral-950 shadow-[0_0_12px_rgba(223,183,108,0.65)]'
                      : 'bg-neutral-800/90 text-[#dfb76c] group-hover:bg-[#dfb76c]/20'
                  }`}
                >
                  <IconComp size={14} className="stroke-[2.2]" />
                </div>
                <span 
                  className={`text-xs sm:text-[13px] leading-tight font-medium truncate block ${
                    isHighlighted ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                  }`}
                >
                  {item.text}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8.5px] uppercase tracking-wider font-semibold ${
                  isHighlighted
                    ? 'bg-[#dfb76c]/25 text-[#f7d794] border border-[#dfb76c]/50'
                    : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800'
                }`}>
                  <span className={`w-1 h-1 rounded-full ${isHighlighted ? 'bg-[#dfb76c] animate-pulse' : 'bg-neutral-600'}`} />
                  <span>{item.tag}</span>
                  <ChevronRight size={10} className={isHighlighted ? 'text-[#dfb76c]' : 'text-neutral-500'} />
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Curatorial Provenance Registry Bar */}
      <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[9.5px] text-neutral-400 font-mono">
        <span className="flex items-center gap-1.5 text-neutral-300">
          <Award size={11} className="text-[#dfb76c] shrink-0" />
          <span>Catalog: <strong className="text-white">ZG-2024-PS-DT11</strong></span>
        </span>
        <span className="text-[#dfb76c] uppercase tracking-wider text-[8.5px] bg-[#dfb76c]/15 px-2 py-0.5 rounded border border-[#dfb76c]/30 font-semibold">
          Direct Atelier Provenance
        </span>
      </div>
    </div>
  )

  return (
    <div className="product-detail-root space-y-16 sm:space-y-24 lg:space-y-32 w-full">

      {/* ========================================================= */}
      {/* ACT 1: MASTER CANVAS HERO & DIRECT ACQUISITION PANEL */}
      {/* ========================================================= */}
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

      {/* Master Two-Column Responsive Layout: Left 7 Columns for Acts 1-4, Right 5 Columns for Single Sticky Product Details Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 w-full relative">
        {/* LEFT COLUMN: 7 Columns Containing Acts 1 through 4 */}
        <div className="order-1 lg:order-none lg:col-span-7 xl:col-span-7 space-y-12 sm:space-y-16 lg:space-y-20 w-full min-w-0">
          {/* ACT 1: MASTER CANVAS HERO & GALLERY STAGE */}
          <div 
            id="product-acquisition-stage" 
            data-showcase-section
            data-showcase-title="Masterpiece Gallery"
            className="scroll-mt-24 space-y-3.5 sm:space-y-5 w-full min-w-0"
          >
            {/* Main Cinematic Real-Room 3D Artwork Stage */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0c0c12] border border-neutral-800 hover:border-[#dfb76c]/40 shadow-[0_16px_50px_rgba(0,0,0,0.6)] group flex flex-col w-full"
              style={{ touchAction: 'pan-y' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={() => setIsDragging(false)}
              ref={imageFrameRef}
            >
              {/* Dynamic Auto-Advance Live Progress Line */}
              <div className="w-full h-1 bg-neutral-800/80 overflow-hidden relative z-30">
                <motion.div
                  key={`gallery-prog-room-${roomIndex}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4.8, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-[#c9a96e] via-[#f7d794] to-[#dfb76c] shadow-[0_0_8px_#dfb76c]"
                />
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
                {/* Floating Action Controls (Spotlight & Fullscreen) */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setIsSpotlightOn(!isSpotlightOn)}
                    className={`p-1.5 sm:p-2 rounded-lg border backdrop-blur-md transition-all cursor-pointer shadow-md ${
                      isSpotlightOn
                        ? 'bg-[#dfb76c]/25 border-[#dfb76c]/70 text-[#dfb76c]'
                        : 'bg-black/70 border-neutral-700 text-neutral-300 hover:text-white'
                    }`}
                    title="Toggle Ambient Gallery Spotlight"
                  >
                    <Sun size={12} className="sm:w-3.5 sm:h-3.5" />
                  </button>

                  <button
                    onClick={() => setOpenFullscreen(true)}
                    className="p-1.5 sm:p-2 bg-black/70 hover:bg-[#dfb76c] hover:text-neutral-950 rounded-lg border border-neutral-700 hover:border-[#dfb76c] text-neutral-200 transition-all cursor-pointer shadow-md backdrop-blur-md"
                    title="Fullscreen Ultra Zoom"
                  >
                    <Maximize2 size={12} className="sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
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
                      width: `${(activeArtwork.wallWidthPct || 18.0) * (currentRoom.wall.scaleFactor || 1.0)}%`,
                      maxWidth: activeArtwork.orientation === 'landscape' ? '380px' : activeArtwork.orientation === 'portrait' ? '280px' : '310px',
                      maxHeight: `${currentRoom.wall.maxHeightPct || 32.0}%`,
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

              </div>
            </motion.div>




            {/* ── ROOM INTERIORS RAIL: PURE ROOM IMAGES WITHOUT TEXT OR SPELLINGS ── */}
            <div
              ref={thumbnailContainerRef}
              className="product-thumbnail-rail flex flex-row items-center gap-2 sm:gap-3 overflow-x-auto py-2 px-1 snap-x snap-mandatory flex-nowrap w-full"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {ROOM_PRESETS.map((room, i) => {
                const isCurrent = i === roomIndex
                return (
                  <button
                    key={room.id}
                    onClick={() => {
                      setCurrentRoomIndex(i)
                      setIsAutoPlay(false)
                    }}
                    className={`group relative shrink-0 flex-shrink-0 w-24 h-16 xs:w-28 xs:h-18 sm:w-32 sm:h-20 md:w-36 md:h-22 rounded-xl sm:rounded-2xl cursor-pointer overflow-hidden snap-center bg-[#14141a] transition-all duration-300 ${
                      isCurrent
                        ? 'border-2 border-[#dfb76c] shadow-[0_4px_22px_rgba(223,183,108,0.4)] ring-2 sm:ring-4 ring-[#dfb76c]/30 opacity-100 scale-100'
                        : 'border border-neutral-800 hover:border-[#dfb76c]/60 opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`Room setting ${i + 1}`}
                  >
                    <img
                      src={room.bg}
                      alt=""
                      className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                    />
                    {isCurrent && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-[#dfb76c] shadow-[0_0_8px_#dfb76c]" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile Only: Product Details Box Rendered Directly Below Gallery */}
          <div className="lg:hidden w-full pt-2">
            {renderProductDossierBox('mobile')}
          </div>

          {/* Curved Reveal Divider */}
          <div className="curved-section-divider -my-4 opacity-50">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 Z" className="shape-fill" />
            </svg>
          </div>

          {/* ========================================================= */}
          {/* ACT 2: PRECISION TECHNICAL DOSSIER & SPECIFICATIONS (ARTWORK DETAILS) */}
          {/* ========================================================= */}
          <motion.section 
        data-showcase-section
        data-showcase-title="Technical Ledger & Specs"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -30px 0px', amount: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="bg-[#121217]/90 backdrop-blur-xl p-3.5 xs:p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-xl space-y-4 sm:space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1">
              Specifications
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight">
              Artwork Details & Technical Ledger
            </h3>
            <p className="text-xs text-neutral-400 mt-1.5 font-light">
              Select or hover any specification box below to inspect its verified archival parameters.
            </p>
          </div>

          {/* 8 Specification Boxes with Heading, Value & Relevant Descriptive Content */}
          <div 
            onMouseEnter={() => setIsSpecHovered(true)}
            onMouseLeave={() => setIsSpecHovered(false)}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 pt-2 text-xs"
          >
            {artworkSpecs.map((spec, i) => {
              const isActive = activeSpecIdx === i
              const SpecIcon = spec.icon
              return (
                <motion.div
                  key={spec.id}
                  onClick={() => setActiveSpecIdx(i)}
                  onMouseEnter={() => setActiveSpecIdx(i)}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{
                    scale: isActive ? 1.03 : 1.0,
                    y: isActive ? -3 : 0,
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 350, 
                    damping: 24, 
                    mass: 0.8 
                  }}
                  className={`p-2.5 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between gap-1.5 sm:gap-2.5 ${
                    isActive
                      ? 'bg-gradient-to-b from-[#252538] via-[#1a1a27] to-[#12121b] border-[#dfb76c] ring-2 ring-[#dfb76c]/50 shadow-[0_8px_30px_rgba(223,183,108,0.32)] z-10'
                      : 'bg-gradient-to-b from-[#1d1d2b] via-[#14141e] to-[#101017] border-neutral-800 hover:border-[#dfb76c]/40 opacity-80 hover:opacity-100 shadow-md'
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                    isActive ? 'bg-[#dfb76c] opacity-100 shadow-[0_0_10px_#dfb76c]' : 'bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent opacity-30 group-hover:opacity-70'
                  }`} />

                  {/* Header Row: Label & Active Ping Indicator */}
                  <div>
                    <div className="flex items-center justify-between gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <SpecIcon size={12} className={`sm:w-[13px] sm:h-[13px] shrink-0 transition-colors ${
                          isActive ? 'text-[#f7d794]' : 'text-[#dfb76c]'
                        }`} />
                        <span className={`uppercase tracking-wider text-[9.5px] xs:text-[10px] sm:text-[11px] font-semibold truncate transition-colors ${
                          isActive ? 'text-[#f7d794]' : 'text-[#dfb76c]'
                        }`}>
                          {spec.label}
                        </span>
                      </div>
                      {isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-ping shrink-0" />
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-neutral-600 shrink-0" />
                      )}
                    </div>

                    {/* Value */}
                    <span className={`font-serif text-[11px] xs:text-xs sm:text-[13px] font-medium block transition-colors leading-snug break-words ${
                      isActive ? 'text-white font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]' : 'text-neutral-200'
                    }`}>
                      {spec.value}
                    </span>
                  </div>

                  {/* Relevant Descriptive Content inside each box */}
                  <p className={`text-[9.5px] xs:text-[10px] sm:text-[11px] font-light leading-relaxed transition-colors border-t border-neutral-800/80 pt-1.5 sm:pt-2 ${
                    isActive ? 'text-neutral-200' : 'text-neutral-400'
                  }`}>
                    {spec.shortDesc}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Deep-Dive Specification Inspector Panel (Smooth Transition on Selection) */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              {artworkSpecs[activeSpecIdx] && (
                <motion.div
                  key={artworkSpecs[activeSpecIdx].id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#171722] via-[#13131c] to-[#0f0f15] border border-[#dfb76c]/40 shadow-xl space-y-3.5 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent shadow-[0_0_12px_#dfb76c]" />

                  {/* Inspector Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-neutral-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#dfb76c]/20 border border-[#dfb76c]/40 flex items-center justify-center text-[#dfb76c]">
                        {React.createElement(artworkSpecs[activeSpecIdx].icon, { size: 16 })}
                      </div>
                      <div>
                        <span className="text-[9.5px] uppercase tracking-widest text-[#dfb76c] font-mono block">
                          Archival Specification • {artworkSpecs[activeSpecIdx].label}
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-medium text-white">
                          {artworkSpecs[activeSpecIdx].heading}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-serif font-bold text-[#dfb76c]">
                        {artworkSpecs[activeSpecIdx].value}
                      </span>
                      {artworkSpecs[activeSpecIdx].id === 'size' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setUnit(unit === 'inch' ? 'cm' : 'inch')
                          }}
                          className="px-2.5 py-1 rounded-full bg-[#dfb76c]/20 hover:bg-[#dfb76c] text-[#f7d794] hover:text-neutral-950 border border-[#dfb76c]/40 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Switch to {unit === 'inch' ? 'cm' : 'inches'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Inspector Detailed Description */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
                    <div className="md:col-span-8 space-y-2">
                      <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                        {artworkSpecs[activeSpecIdx].detail}
                      </p>
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-400">
                        <Sparkles size={12} className="text-[#dfb76c] shrink-0" />
                        <span className="italic text-neutral-300">{artworkSpecs[activeSpecIdx].curatorialNote}</span>
                      </div>
                    </div>

                    <div className="md:col-span-4 p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono text-[#dfb76c]">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span>Verified Registry</span>
                      </div>
                      <span className="text-[11px] text-white font-medium block">
                        {artworkSpecs[activeSpecIdx].highlight}
                      </span>
                      <span className="text-[10px] text-neutral-400 block font-light">
                        Source: {artworkSpecs[activeSpecIdx].provenanceSource}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 3: DEDICATED ARTWORK DESCRIPTION & CURATORIAL ESSENCE */}
      {/* ========================================================= */}
      <motion.section 
            data-showcase-section
            data-showcase-title="Artwork Description"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
        <div className="bg-[#121217]/90 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-xl space-y-6 sm:space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-neutral-800/80">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1">
                Zigguratss Maison d'Art • Curatorial Monograph
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight">
                Artwork Description
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#dfb76c] bg-[#dfb76c]/10 px-3 py-1.5 rounded-full border border-[#dfb76c]/30 self-start md:self-auto">
              <Sparkles size={13} />
              <span>Divine Tunes-11 by Pradip Sarkar</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Narrative Pillar */}
            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              <p className="first-letter:font-serif first-letter:text-3xl first-letter:text-[#dfb76c] first-letter:font-normal first-letter:mr-1 first-letter:float-left">
                <strong className="text-white font-medium">Divine Tunes-11</strong> represents the pinnacle of contemporary master Pradip Sarkar's acclaimed spiritual abstraction series. Grounded in decades of classical draughtsmanship and modernist spatial geometry developed at the British Institute in Mumbai, this masterwork captures an evocative metaphysical dialogue between sound, stillness, and human consciousness.
              </p>
              <p>
                The composition is anchored by a contemplative, serene muse adorned with delicate flutterings of vibrant butterflies—a timeless allegorical motif evoking spiritual transmutation, transient earthly beauty, and the elevation of the soul. Sarkar partitions the canvas into architectural rhythmic planes, using warm ochres, burnished golds, soft rose madder, and meditative earthen umbers to echo the visual architecture of classical Indian ragas.
              </p>
              <p>
                Every brushstroke is rendered with master-grade archival heavy-body acrylics upon museum-grade primed Belgian canvas, sealed with invisible UV-absorptive protective isolation coats. The luminous surface dynamically interacts with shifting ambient light, revealing subtle chromatic undertones and geometric depth that reward intimate observation.
              </p>
            </div>

            {/* Right Highlights & Registry Pillars */}
            <div className="lg:col-span-5 space-y-3.5 bg-neutral-900/60 p-4 sm:p-5 rounded-2xl border border-neutral-800/80">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#dfb76c] font-semibold block">
                Archival Ledger Highlights
              </span>
              
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60 flex items-start gap-2.5">
                  <Palette size={15} className="text-[#dfb76c] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Curatorial Genre</span>
                    <span className="text-neutral-400 text-[11px]">Meditative Figurative & Geometric Abstraction</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60 flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-[#dfb76c] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Provenance & Signature</span>
                    <span className="text-neutral-400 text-[11px]">Signed recto and inscribed verso by Pradip Sarkar • ZG-ART-2024-DT11</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60 flex items-start gap-2.5">
                  <Shield size={15} className="text-[#dfb76c] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Preservation Protocol</span>
                    <span className="text-neutral-400 text-[11px]">UV Isolation Glaze • Non-Yellowing • 100+ Years Archival Stability</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60 flex items-start gap-2.5">
                  <Home size={15} className="text-[#dfb76c] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Architectural Setting</span>
                    <span className="text-neutral-400 text-[11px]">Focal placement for salon, penthouse, or executive residence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 4: ARTIST SPOTLIGHT & CURATORIAL PROVENANCE DOSSIER */}
      {/* ========================================================= */}
      <motion.section 
        id="artist-section" 
        data-showcase-section
        data-showcase-title="Artist Spotlight & Provenance"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-4 sm:pt-6 scroll-mt-24"
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
            Artist Spotlight & Curatorial Provenance
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-2 max-w-lg mx-auto leading-relaxed">
            Discover the legacy, academic pedigree, and philosophical vision of Pradip Sarkar — Indian contemporary master of spiritual cubism.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 sm:gap-8 items-stretch mb-10 sm:mb-14">
          {/* Top: Featured Artist Profile Card */}
          <div 
            onClick={() => setActiveArtistSuiteIdx(0)}
            className="w-full flex"
          >
            <ArtistCardMini 
              name="Pradip Sarkar" 
              location="Mumbai, India" 
              isHighlighted={activeArtistSuiteIdx === 0}
            />
          </div>

          {/* 4 Artist-Information Boxes (Moved into Artist Section) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#dfb76c] animate-pulse" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono text-[#dfb76c] font-semibold">
                  Curatorial Pillars & Career Milestones
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 font-light">
                Select or hover any box for verified curatorial dossier
              </span>
            </div>

            {/* 4 Specification / Milestone Boxes Grid - 2 per row like artwork details */}
            <div 
              onMouseEnter={() => setIsMilestoneHovered(true)}
              onMouseLeave={() => setIsMilestoneHovered(false)}
              className="grid grid-cols-2 gap-2.5 sm:gap-3.5"
            >
              {artistMilestones.map((m, idx) => {
                const MIcon = m.icon
                const isActive = activeMilestoneIdx === idx
                return (
                  <motion.div
                    key={m.id || m.title}
                    id={`artist-milestone-${m.origin.toLowerCase()}`}
                    onClick={() => setActiveMilestoneIdx(idx)}
                    onMouseEnter={() => setActiveMilestoneIdx(idx)}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    animate={{
                      scale: isActive ? 1.02 : 1.0,
                      y: isActive ? -3 : 0,
                    }}
                    whileHover={shouldReduceMotion ? {} : { y: -2, transition: { duration: 0.2 } }}
                    className={`p-2.5 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between gap-1.5 sm:gap-2.5 text-left group ${
                      isActive
                        ? 'bg-gradient-to-br from-[#222234] via-[#181824] to-[#101018] border-[#dfb76c] ring-2 ring-[#dfb76c]/50 shadow-[0_10px_32px_rgba(223,183,108,0.28)] z-10'
                        : 'bg-[#121217]/90 border-neutral-800 hover:border-[#dfb76c]/40 hover:bg-[#16161f] shadow-md'
                    }`}
                  >
                    {/* Active Top Highlight Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-[2.5px] transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#dfb76c] opacity-100 shadow-[0_0_12px_#dfb76c]' 
                        : 'bg-transparent opacity-0 group-hover:bg-[#dfb76c]/30 group-hover:opacity-100'
                    }`} />

                    {/* Header with Origin & Category Icon */}
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1">
                        <span className={`text-[8.5px] xs:text-[9.5px] sm:text-[10px] uppercase tracking-wider font-mono font-bold transition-colors ${
                          isActive ? 'text-[#f7d794]' : 'text-[#dfb76c]'
                        }`}>
                          {m.origin}
                        </span>
                      </div>
                      <div className={`p-1 xs:p-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-[#dfb76c]/20 text-[#f7d794]' : 'bg-neutral-800/60 text-neutral-400 group-hover:text-[#dfb76c]'
                      }`}>
                        <MIcon size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
                      </div>
                    </div>

                    {/* Milestone Title */}
                    <div>
                      <h4 className={`font-serif text-xs xs:text-[13px] sm:text-base font-medium leading-snug transition-colors ${
                        isActive ? 'text-white font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]' : 'text-neutral-200'
                      }`}>
                        {m.title}
                      </h4>
                    </div>

                    {/* Relevant Descriptive Content inside each box */}
                    <p className={`text-[9.5px] xs:text-[10px] sm:text-[11px] font-light leading-relaxed transition-colors border-t border-neutral-800/80 pt-1.5 sm:pt-2 ${
                      isActive ? 'text-neutral-200' : 'text-neutral-400'
                    }`}>
                      {m.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            {/* Interactive Milestone Deep-Dive Inspector Panel (Smooth Transition on Highlight/Selection) */}
            <div className="pt-2">
              <AnimatePresence mode="wait">
                {artistMilestones[activeMilestoneIdx] && (
                  <motion.div
                    key={artistMilestones[activeMilestoneIdx].id || activeMilestoneIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#171722] via-[#13131c] to-[#0f0f15] border border-[#dfb76c]/40 shadow-xl space-y-3.5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent shadow-[0_0_12px_#dfb76c]" />

                    {/* Inspector Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#dfb76c]/20 border border-[#dfb76c]/40 flex items-center justify-center text-[#dfb76c]">
                          {React.createElement(artistMilestones[activeMilestoneIdx].icon, { size: 18 })}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#dfb76c] font-mono block">
                            Curatorial Dossier • {artistMilestones[activeMilestoneIdx].origin}
                          </span>
                          <h4 className="font-serif text-base sm:text-xl font-medium text-white">
                            {artistMilestones[activeMilestoneIdx].title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-neutral-900 border border-[#dfb76c]/30 text-xs font-mono font-medium text-[#dfb76c]">
                          {artistMilestones[activeMilestoneIdx].badge}
                        </span>
                      </div>
                    </div>

                    {/* Inspector Details */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-8 space-y-2">
                        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                          {artistMilestones[activeMilestoneIdx].extended}
                        </p>
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-400">
                          <Sparkles size={12} className="text-[#dfb76c] shrink-0" />
                          <span className="italic text-neutral-300">{artistMilestones[activeMilestoneIdx].desc}</span>
                        </div>
                      </div>

                      <div className="md:col-span-4 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono text-[#dfb76c]">
                          <CheckCircle2 size={12} className="text-emerald-400" />
                          <span>Curatorial Registry</span>
                        </div>
                        <span className="text-xs text-white font-medium block">
                          Verified Artist Milestone
                        </span>
                        <span className="text-[11px] text-neutral-400 block font-light">
                          Archive: {artistMilestones[activeMilestoneIdx].source}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Curatorial Provenance, Studio Dossier & More Information */}
          <motion.div 
            onClick={() => setActiveArtistSuiteIdx(1)}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col justify-between gap-5 p-5 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl transition-all duration-500 w-full relative overflow-hidden ${
              activeArtistSuiteIdx === 1
                ? 'bg-gradient-to-br from-[#1b1b28] via-[#13131c] to-[#0e0e14] border-2 border-[#dfb76c] ring-2 ring-[#dfb76c]/40 shadow-[0_0_40px_rgba(223,183,108,0.28)]'
                : 'bg-[#121217]/90 border border-neutral-800 hover:border-[#dfb76c]/40 shadow-xl'
            }`}
          >
            {activeArtistSuiteIdx === 1 && (
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent shadow-[0_0_10px_#dfb76c]" />
            )}

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#dfb76c] animate-pulse" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#dfb76c] font-mono font-semibold">
                    Studio Provenance & Archival Catalog
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider font-bold bg-[#dfb76c]/20 text-[#dfb76c] px-2.5 py-0.5 rounded-full border border-[#dfb76c]/30">
                  Direct Atelier Access
                </span>
              </div>

              <h4 className="font-serif text-lg sm:text-2xl font-medium text-white mb-2.5">
                The Synthesis of Sound and Geometry
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                Pradip Sarkar’s artworks are cataloged and acquired by Zigguratss directly from the master's atelier in Mumbai. Each acquisition is certified with a physical serialized Certificate of Authenticity (COA) personally hand-signed by Pradip Sarkar and entered into the immutable gallery registry.
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-5">
                In his acclaimed <em className="text-[#f7d794] not-italic font-normal">Divine Tunes</em> series, Sarkar explores the sublime relationship between music, consciousness, and architectural structure. Through meticulous square partitions, impasto acrylic textures, and fluttering butterfly motifs, his canvases embody meditative stillness—translating classical Indian ragas into vibrant chromatic symphonies.
              </p>

              {/* 3 Key Curatorial Accreditations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-neutral-800/80">
                {[
                  {
                    icon: Award,
                    title: 'British Institute Mumbai Alumnus',
                    sub: 'Diploma in Fine Art with honors in spatial geometry and color theory'
                  },
                  {
                    icon: CheckCircle2,
                    title: '70+ Significant Curated Shows',
                    sub: 'Exhibited across Mumbai, New Delhi, Kolkata, Dubai, London & Singapore since 1995'
                  },
                  {
                    icon: Shield,
                    title: 'Museum-Grade Archival Standard',
                    sub: 'Lightfast pigments on heavy linen canvas with serialized COA guarantee'
                  }
                ].map((acc, idx) => {
                  const AccIcon = acc.icon
                  const isActive = activeAccreditationIdx === idx
                  return (
                    <motion.div 
                      key={acc.title}
                      onClick={() => setActiveAccreditationIdx(idx)}
                      animate={{
                        scale: isActive ? 1.02 : 1.0,
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                      className={`flex items-start gap-2.5 p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? 'bg-[#dfb76c]/15 border border-[#dfb76c]/40 shadow-sm' 
                          : 'bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-[#dfb76c]/30'
                      }`}
                    >
                      <AccIcon size={16} className={`shrink-0 mt-0.5 transition-colors ${
                        isActive ? 'text-[#f7d794]' : 'text-[#dfb76c]'
                      }`} />
                      <div>
                        <strong className={`block font-medium text-xs sm:text-sm transition-colors ${
                          isActive ? 'text-white font-semibold' : 'text-neutral-200'
                        }`}>{acc.title}</strong>
                        <span className={`text-[11px] transition-colors leading-relaxed block mt-0.5 ${
                          isActive ? 'text-[#f7d794]' : 'text-neutral-400'
                        }`}>{acc.sub}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Direct Curator Access CTA */}
            <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-serif text-white font-medium block">Private Atelier Acquisition Inquiries</span>
                <span className="text-[11px] text-neutral-400 font-light">Direct liaison with the artist's studio representatives</span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowOfferModal(true)
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-md shrink-0"
              >
                <MessageCircle size={14} />
                <span>Private Viewing & Acquisition</span>
              </button>
            </div>
          </motion.div>

          {/* Philosophical Artist Quote Block (Moved to Artist Section) */}
          <blockquote className="p-5 sm:p-7 md:p-8 bg-gradient-to-r from-[#181824] via-[#14141e] to-[#101018] rounded-2xl border-l-4 border-[#dfb76c] text-[#f7d794] font-serif italic text-base sm:text-lg md:text-xl leading-relaxed flex items-center justify-between gap-4 shadow-xl">
            <div>
              "Art is the expression of my own life story... art is divine."
              <span className="block text-xs font-sans text-neutral-400 not-italic mt-2.5 tracking-widest uppercase font-mono">
                — Pradip Sarkar, Mumbai Atelier
              </span>
            </div>
            <Sparkles size={24} className="text-[#dfb76c] flex-shrink-0 hidden sm:block opacity-80" />
          </blockquote>
        </div>
      </motion.section>
        </div>

        {/* RIGHT COLUMN: 5 Columns with Single Sticky Product Details Box Accompanying Acts 1 through 4 */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-5 w-full min-w-0 h-full relative">
          <div 
            className="sticky top-20 sm:top-24 space-y-4 sm:space-y-6 w-full"
          >
            {renderProductDossierBox('desktop')}
          </div>
        </div>
      </div>

      {/* Curved Reveal Divider between Act 4 and Act 5 */}
      <div className="curved-section-divider -my-4 opacity-50 transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* FULL-WIDTH LUXURY SECTIONS (ACT 5: ARTWORKS, ACT 6: SHIPPING, ACT 7: REVIEWS) */}
      {/* ========================================================= */}
      <div 
        ref={lowerSectionsRef}
        id="artworks-shipping-reviews-zone"
        className="w-full space-y-16 sm:space-y-20 lg:space-y-28 relative"
      >

      {/* ========================================================= */}
      {/* ACT 5: RELATED MASTERWORKS MARQUEE STREAMS */}
      {/* (DUAL AUTO-SCROLL & MANUAL SWIPE/DRAG ARTWORK CAROUSEL) */}
      {/* ========================================================= */}
      <div className="w-full relative space-y-6 sm:space-y-8">
        <ArtistMarqueesSection />
      </div>

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 6: WHITE-GLOVE LOGISTICS PIPELINE */}
      {/* ========================================================= */}
          <motion.section 
            data-showcase-section
            data-showcase-title="White-Glove Logistics Journey"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                className="relative z-10 flex flex-col gap-6 sm:gap-8 items-stretch"
              >
                {/* Visual Graphic */}
                <div className={`w-full rounded-xl sm:rounded-2xl overflow-hidden relative flex items-center justify-center ${
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
                        onUserInteraction={() => setIsShippingAutoPlay(false)}
                      />
                    </div>
                  )}
                </div>

                {/* Details & Controls (Hidden for Stage 04 per user requirement: "no neede of all these words in the house and down also") */}
                {shippingStep !== 3 && (
                  <div className="w-full space-y-3 sm:space-y-4">
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
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 4 Guarantees Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
      {/* ACT 7: VERIFIED COLLECTOR LETTERHEAD REVIEWS */}
      {/* ========================================================= */}
      <CollectorReviewsSection />

      {/* Floating Compact Product Bar with Artist Name, Price & Acquire Artwork */}
      {/* Elegantly proportioned width, accompanying user through Artworks, Shipping, and Reviews */}
      <AnimatePresence>
        {showHorizontalProductBar && (
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-2.5 xs:bottom-3 sm:bottom-4 left-0 right-0 z-40 w-full max-w-xl md:max-w-3xl mx-auto px-2 xs:px-3 sm:px-4 pointer-events-none"
          >
            <div className="pointer-events-auto bg-[#121217]/95 backdrop-blur-2xl border border-[#dfb76c]/60 rounded-full py-2 sm:py-2.5 px-3 xs:px-4 sm:px-6 shadow-[0_16px_45px_rgba(0,0,0,0.85)] ring-1 ring-[#dfb76c]/30">
              <div className="flex items-center justify-between gap-2 xs:gap-3 sm:gap-6 w-full">
                {/* Artwork Title & Valuation */}
                <div className="min-w-0 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#dfb76c] font-mono shrink-0 hidden sm:inline">
                      {selectedArtwork?.artist || 'Pradip Sarkar'} •
                    </span>
                    <h4 className="font-serif text-[11px] xs:text-xs sm:text-sm md:text-base font-normal text-white truncate leading-tight">
                      {selectedArtwork?.title || 'Divine Tunes-11'}
                    </h4>
                  </div>

                  {/* Pricing Details */}
                  <div className="flex items-center gap-1 xs:gap-1.5 leading-none mt-0.5">
                    <span className="font-serif text-xs xs:text-sm sm:text-base md:text-lg font-bold text-[#dfb76c] shrink-0">
                      {selectedArtwork?.price || '₹1,18,300'}
                    </span>
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-neutral-500 line-through font-serif shrink-0">
                      {selectedArtwork?.originalPrice || '₹1,47,800'}
                    </span>
                    <span className="px-1 py-0.2 rounded bg-[#8a1c14] text-white text-[7px] xs:text-[7.5px] sm:text-[8px] font-bold font-mono shrink-0">
                      -20%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 shrink-0">
                  <button
                    onClick={handleAddToCart}
                    className="px-3 xs:px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#dfb76c] via-[#f7d794] to-[#dfb76c] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 font-bold text-[10px] xs:text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(223,183,108,0.3)] hover:shadow-[0_6px_22px_rgba(223,183,108,0.5)] flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    <span>Acquire Artwork</span>
                    <ArrowRight size={12} className="hidden xs:inline" />
                  </button>

                  <button
                    onClick={() => setShowOfferModal(true)}
                    className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full border border-[#dfb76c]/40 hover:border-[#dfb76c] bg-neutral-900/90 hover:bg-[#dfb76c]/15 text-[#dfb76c] flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0 active:scale-95"
                    title="Make an Offer or Inquire"
                    aria-label="Make an Offer or Inquire"
                  >
                    <MessageCircle size={13} className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

      {/* Interactive Product Guidelines Overlay Manager (Global Single Portal) */}
      <ProductGuidelineOverlayManager 
        activeGuideline={activeGuideline} 
        isPinned={isGuidelinePinned}
        onClose={handleCloseGuideline} 
        onPin={handlePinGuideline}
        onMouseEnter={handleMouseEnterModal}
        onMouseLeave={handleMouseLeaveModal}
      />
    </div>
  )
}
