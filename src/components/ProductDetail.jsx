import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  ZoomIn, Maximize2, ShoppingCart, CreditCard, Truck, CheckCircle2, 
  X, Share2, MessageCircle, Package, Clock, MapPin, Shield, RefreshCw, 
  Globe, Upload, AlertCircle, ChevronLeft, ChevronRight, Check, Sparkles,
  Palette, Award, FileText, ArrowUpRight, ArrowRight, Eye, Heart, Layers,
  Compass, Feather, BookOpen, Play, Pause, Navigation, Home, Box
} from 'lucide-react'
import ArtworkStatement from './ArtworkStatement'
import ProductServices from '../services/productService'
import { analyzeImageOrientation, validateImage, getOrientationClasses } from '../services/imageService'
import ArtistCardMini from './ArtistCardMini'
import ArtistSaga from './ArtistSaga'
import WallHangedImageGenerator from './WallHangedImageGenerator'

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
import diff4 from '../assets/User-images/diff4.jpg'
import diff5 from '../assets/User-images/diff5.jpg'
import diff6 from '../assets/User-images/diff6.jpg'
import sky1 from '../assets/User-images/sky1.jpg'
import pradipPortrait from '../assets/User-images/Pradip Sarkar.jpeg'

export default function ProductDetail() {
  const shouldReduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [tab, setTab] = useState('artwork')
  const [openFullscreen, setOpenFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [unit, setUnit] = useState('inch') // 'inch' | 'cm'
  const [cartToast, setCartToast] = useState(false)
  const [shareToast, setShareToast] = useState(false)
  const [wishlistActive, setWishlistActive] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showFloatingBar, setShowFloatingBar] = useState(false)
  const [activeMotif, setActiveMotif] = useState(0)
  
  // Shipping Interactive Journey State
  const [shippingStep, setShippingStep] = useState(0)
  const [isShippingAutoPlay, setIsShippingAutoPlay] = useState(true)

  // Image 3D Tilt State
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const imageFrameRef = useRef(null)
  const thumbnailContainerRef = useRef(null)

  // Upload States
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [imageOrientationData, setImageOrientationData] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])

  // Gallery Dataset (Preserving all authentic Zigguratss gallery angles and renders)
  const [galleryThumbs, setGalleryThumbs] = useState([
    { src: screenshotImage, label: 'Master Canvas', alt: 'Divine Tunes-11 - main artwork' },
    { src: wallImage1, label: 'Living Room View', alt: 'Divine Tunes-11 - in room setting 1' },
    { src: wallImage2, label: 'Gallery Wall', alt: 'Divine Tunes-11 - in room setting 2' },
    { src: wallImage3, label: 'Modern Interior', alt: 'Divine Tunes-11 - in room setting 3' },
    { src: image4, label: 'Exhibition View', alt: 'Gallery exhibition view' },
    { src: testImage, label: 'Wall Mount 1', alt: 'Test wall hung', isWallHung: true },
    { src: testImage2, label: 'Framed Canvas', alt: 'Test image 2', isWallHung: true },
    { src: hansImage, label: 'Museum Setting', alt: 'Test image 3', isWallHung: true }
  ])

  // Curatorial Motif Cards (Interactive Storyboard using real Zigguratss artworks)
  const curatorialMotifs = [
    {
      id: 0,
      title: 'The Butterfly Sonata',
      subtitle: 'Symbolism of Ethereal Life',
      image: flowersImage,
      badge: 'Flora & Fauna',
      desc: 'Three butterflies fluttering gracefully around the serene face symbolize the delicate interconnectedness and sacred harmony between all living beings.'
    },
    {
      id: 1,
      title: 'Geometric Symmetry',
      subtitle: 'Pursuit of Balance & Form',
      image: image9,
      badge: 'Abstraction',
      desc: 'Deliberate checks, squares, and rhythmic rectangles encapsulate humanity’s inner aspirations and spiritual equilibrium striving for fulfillment.'
    },
    {
      id: 2,
      title: 'Vedic Rhythm & Nature',
      subtitle: 'In Harmony with the Universe',
      image: birdsImage,
      badge: 'Ecosystem',
      desc: 'Warm soothing hues and meditative brushwork awaken deep empathy and reverence for the natural world as caretakers of our shared earth.'
    }
  ]

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
      title: 'Insured Air & Road Express Transit',
      subtitle: 'Climate-Controlled Active Telemetry',
      description: 'Dispatched via premium air courier with priority customs clearance and real-time waypoint tracking. Every mile of transit is 100% insured against loss or damage.',
      highlights: ['Full Declared Value Insurance', 'Domestic: 5–7 Working Days', 'Global Air: 10–20 Working Days'],
      status: 'Vehicle In Transit'
    },
    {
      id: 3,
      phase: 'Stage 04',
      title: 'White-Glove Doorstep Handover',
      subtitle: 'Direct Collector Receipt & 14-Day Privilege',
      description: 'The courier delivers directly to your address with white-glove unboxing support. Enjoy a 24-hour initial inspection window and our full 14-day collector satisfaction guarantee.',
      highlights: ['Scheduled Handover Appointment', 'Certificate of Provenance Included', '14-Day Money Back Guarantee'],
      status: 'Ready For Handover'
    }
  ]

  // Shipping Auto-Play Timer
  useEffect(() => {
    if (!isShippingAutoPlay || tab !== 'shipping') return
    const timer = setInterval(() => {
      setShippingStep((prev) => (prev + 1) % shippingStages.length)
    }, 4600)
    return () => clearInterval(timer)
  }, [isShippingAutoPlay, tab, shippingStages.length])

  // Offer Form State
  const [offerFormData, setOfferFormData] = useState({
    name: '',
    mobile: '',
    country: '',
    email: '',
    offerPrice: ''
  })
  const [offerSubmitted, setOfferSubmitted] = useState(false)

  // Handle scroll for floating bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 950) {
        setShowFloatingBar(true)
      } else {
        setShowFloatingBar(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 3D Tilt interaction
  const handleMouseMoveStage = (e) => {
    if (shouldReduceMotion || !imageFrameRef.current) return
    const rect = imageFrameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -3.5
    const rotateY = ((x - centerX) / centerX) * 3.5
    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeaveStage = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  // Fullscreen Pan & Zoom
  const handleFullscreenMouseMove = (e) => {
    const elem = e.currentTarget
    const { top, left, width, height } = elem.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setMousePosition({ x, y })
  }

  // Gallery Navigation (Keyboard & Buttons)
  const nextSlide = () => setActive((prev) => (prev + 1) % galleryThumbs.length)
  const prevSlide = () => setActive((prev) => (prev - 1 + galleryThumbs.length) % galleryThumbs.length)

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
        id: `uploaded-${Date.now()}`,
        originalUrl: previewImage,
        detectedOrientation: imageOrientationData.orientation,
        originalDimensions: {
          width: imageOrientationData.width,
          height: imageOrientationData.height,
          aspectRatio: imageOrientationData.aspectRatio
        },
        uploadedAt: new Date().toLocaleString()
      }

      setUploadedImages([...uploadedImages, newUploadedImage])
      const newThumbnail = {
        src: previewImage,
        label: 'Your Room View',
        alt: `Uploaded artwork - ${new Date().toLocaleString()}`
      }
      setGalleryThumbs([...galleryThumbs, newThumbnail])
      setActive(galleryThumbs.length)
      setUploadSuccess(true)
      setPreviewImage(null)
      setImageOrientationData(null)

      setTimeout(() => {
        setUploadSuccess(false)
        setShowUploadModal(false)
      }, 1800)
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
      setOfferSubmitted(false)
      setShowOfferModal(false)
      setOfferFormData({ name: '', mobile: '', country: '', email: '', offerPrice: '' })
    }, 1800)
  }

  return (
    <div className="relative w-full text-neutral-100 font-sans space-y-12 sm:space-y-16 lg:space-y-24">
      {/* ========================================================= */}
      {/* 1. FLOATING EDITORIAL SUB-HEADER (Reveals on Scroll - Desktop & Tablet) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showFloatingBar && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex fixed top-4 left-6 right-6 lg:left-16 lg:right-16 z-40 bg-[#121217]/95 backdrop-blur-2xl border border-neutral-700/80 shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-2xl py-2.5 sm:py-3 px-4 sm:px-6 md:px-8 items-center justify-between gap-3 max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 shrink-0">
                <img src={screenshotImage} alt="Divine Tunes-11" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-xs sm:text-base font-medium text-white truncate">
                  Divine Tunes-11
                </h3>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-neutral-400 font-light">
                  <span className="truncate max-w-[80px] xs:max-w-none">Pradip Sarkar</span>
                  <span className="text-neutral-600">•</span>
                  <span className="font-medium text-[#dfb76c]">₹1,18,300</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                onClick={() => setShowOfferModal(true)}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#dfb76c] text-[#dfb76c] hover:bg-[#dfb76c]/10 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                <MessageCircle size={13} />
                <span>Make Offer</span>
              </motion.button>
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                onClick={handleAddToCart}
                className="px-3.5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingCart size={13} />
                <span>Acquire</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 2. HERO SECTION: 2 BALANCED COLUMNS (Gallery + Purchase Panel) */}
      {/* ========================================================= */}
      <div>
        {/* Breadcrumb Navigation & Top Actions */}
        <div className="product-header-bar flex flex-row items-center justify-between gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-neutral-800/80 w-full flex-nowrap">
          <nav className="product-breadcrumbs flex flex-row items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-medium min-w-0 overflow-hidden flex-nowrap">
            <a href="/" className="hover:text-[#dfb76c] transition-colors shrink-0">Collections</a>
            <span className="text-neutral-600 shrink-0">/</span>
            <a href="#artist-section" className="hover:text-[#dfb76c] transition-colors shrink-0 truncate max-w-[70px] xs:max-w-none">Pradip Sarkar</a>
            <span className="text-neutral-600 shrink-0">/</span>
            <span className="text-[#dfb76c] font-semibold truncate shrink-0 max-w-[95px] xs:max-w-none">Divine Tunes-11</span>
          </nav>

          <div className="flex flex-row items-center gap-1.5 sm:gap-2 shrink-0 flex-nowrap">
            <button
              onClick={() => setWishlistActive(!wishlistActive)}
              className={`inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border transition-all text-[10px] sm:text-xs font-medium cursor-pointer shrink-0 ${
                wishlistActive 
                  ? 'border-red-500/60 bg-red-500/10 text-red-400' 
                  : 'border-neutral-800 hover:border-[#dfb76c]/60 bg-[#121217] text-neutral-300 hover:text-white'
              }`}
            >
              <Heart size={11} className={wishlistActive ? 'fill-red-400 text-red-400' : ''} />
              <span className="hidden xs:inline">{wishlistActive ? 'Saved' : 'Wishlist'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-neutral-800 hover:border-[#dfb76c]/60 bg-[#121217] text-neutral-300 hover:text-[#dfb76c] text-[10px] sm:text-xs font-medium transition-all cursor-pointer shrink-0"
            >
              <Share2 size={11} />
              <span className="hidden xs:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Hero Grid: Clean Non-Overlapping Two-Column Gallery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* LEFT: MASTER ARTWORK GALLERY (7 Columns) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4 sm:space-y-5">
            {/* Main Cinematic Museum Artwork Stage */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#14141a] via-[#101015] to-[#0c0c10] border border-neutral-800 hover:border-[#dfb76c]/40 shadow-[0_16px_50px_rgba(0,0,0,0.6)] group"
              onMouseMove={handleMouseMoveStage}
              onMouseLeave={handleMouseLeaveStage}
              ref={imageFrameRef}
              style={{ perspective: 1000 }}
            >
              {/* Dynamic Museum Ambient Spotlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(223,183,108,0.16),transparent_65%)] pointer-events-none" />

              {/* Top Curatorial Badges */}
              <div className="product-row-flex absolute top-2.5 left-2.5 sm:top-5 sm:left-5 z-20 flex flex-row items-center gap-1.5 sm:gap-2 max-w-[55%] xs:max-w-none flex-nowrap">
                <span className="text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold bg-[#0c0c10]/90 backdrop-blur-md px-2 sm:px-3.5 py-0.5 sm:py-1.5 rounded-full border border-neutral-700 text-neutral-200 shadow-md whitespace-nowrap">
                  ✦ Archival Original
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] sm:text-xs uppercase tracking-wider bg-[#dfb76c]/15 text-[#dfb76c] border border-[#dfb76c]/40 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md font-semibold whitespace-nowrap">
                  <Sparkles size={11} /> 1 of 1 Unique Piece
                </span>
              </div>

              {/* Top-Right Gallery Interaction Tools (Always in a single horizontal row) */}
              <div className="product-row-flex absolute top-2.5 right-2.5 sm:top-5 sm:right-5 z-20 flex flex-row items-center gap-1.5 sm:gap-2 flex-nowrap shrink-0">
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  onClick={() => setShowUploadModal(true)}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#121217]/90 hover:bg-[#16161d] backdrop-blur-md rounded-lg sm:rounded-xl shadow-md border border-neutral-700 hover:border-[#dfb76c] text-neutral-200 hover:text-[#dfb76c] transition-all cursor-pointer text-[10px] sm:text-xs uppercase tracking-wider font-semibold whitespace-nowrap shrink-0 flex items-center justify-center"
                >
                  <span>Test On Wall</span>
                </motion.button>
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  onClick={() => setOpenFullscreen(true)}
                  className="p-1.5 sm:p-2.5 bg-[#121217]/90 hover:bg-[#dfb76c] hover:text-neutral-950 backdrop-blur-md rounded-lg sm:rounded-xl shadow-md border border-neutral-700 hover:border-[#dfb76c] text-neutral-200 transition-all cursor-pointer shrink-0"
                  title="Fullscreen Ultra Zoom"
                >
                  <Maximize2 size={13} className="sm:w-4 sm:h-4" />
                </motion.button>
              </div>

              {/* Main Artwork Stage (Generous clearance so painting never touches badges or controls) */}
              <div
                className="w-full h-[290px] xs:h-[340px] sm:h-[460px] md:h-[500px] xl:h-[560px] flex items-center justify-center pt-16 pb-12 px-6 sm:pt-20 sm:pb-16 sm:px-14 cursor-zoom-in relative select-none"
                onClick={() => setOpenFullscreen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      rotateX: tilt.rotateX,
                      rotateY: tilt.rotateY
                    }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                    transition={{ 
                      opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      rotateX: { duration: 0.15, ease: "easeOut" },
                      rotateY: { duration: 0.15, ease: "easeOut" }
                    }}
                    className="w-full h-full flex items-center justify-center relative max-h-[72%] sm:max-h-[82%]"
                  >
                    {galleryThumbs[active]?.isWallHung ? (
                      <WallHangedImageGenerator
                        src={galleryThumbs[active].src}
                        alt={galleryThumbs[active].alt}
                        width={860}
                        height={520}
                      />
                    ) : (
                      <img
                        src={galleryThumbs[active].src}
                        alt={galleryThumbs[active].alt}
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
                        loading="eager"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Left / Right Carousel Controls */}
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); prevSlide() }}
                  aria-label="Previous image"
                  className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#121217]/85 hover:bg-[#dfb76c] hover:text-neutral-950 text-neutral-200 backdrop-blur-md border border-neutral-700 shadow-lg flex items-center justify-center transition-all cursor-pointer z-20"
                >
                  <ChevronLeft size={14} className="sm:w-[18px] sm:h-[18px]" />
                </motion.button>
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); nextSlide() }}
                  aria-label="Next image"
                  className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#121217]/85 hover:bg-[#dfb76c] hover:text-neutral-950 text-neutral-200 backdrop-blur-md border border-neutral-700 shadow-lg flex items-center justify-center transition-all cursor-pointer z-20"
                >
                  <ChevronRight size={14} className="sm:w-[18px] sm:h-[18px]" />
                </motion.button>

                {/* Bottom Caption Pill */}
                <div className="absolute bottom-2 sm:bottom-3.5 left-1/2 -translate-x-1/2 bg-[#0c0c10]/90 backdrop-blur-md border border-neutral-700/80 text-white px-2.5 sm:px-4 py-0.5 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-light tracking-wide shadow-lg z-20 whitespace-nowrap">
                  {galleryThumbs[active]?.label} ({active + 1} of {galleryThumbs.length})
                </div>
              </div>
            </motion.div>

            {/* In-Room Quick Preset Selectors (Smooth Horizontal Ribbon) */}
            <div className="product-preset-ribbon flex flex-row items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-xs flex-nowrap w-full" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              <span className="text-neutral-400 font-medium uppercase tracking-wider text-[10px] sm:text-[11px] pr-1 flex items-center gap-1 shrink-0 flex-shrink-0">
                <Layers size={12} className="text-[#dfb76c]" /> Views:
              </span>
              {[
                { index: 0, label: 'Master Canvas' },
                { index: 1, label: 'Living Room' },
                { index: 2, label: 'Gallery Wall' },
                { index: 3, label: 'Modern Interior' },
                { index: 7, label: 'Museum Setting' }
              ].map((view) => (
                <button
                  key={view.label}
                  onClick={() => setActive(view.index)}
                  className={`product-preset-pill px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all whitespace-nowrap cursor-pointer text-[10px] sm:text-xs shrink-0 flex-shrink-0 ${
                    active === view.index
                      ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#f7d794] font-medium'
                      : 'bg-[#121217] border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>

            {/* Thumbnail Carousel (Smooth Horizontal Swipeable Strip) */}
            <div
              ref={thumbnailContainerRef}
              className="product-thumbnail-rail flex flex-row items-center gap-2 sm:gap-3 overflow-x-auto py-2 px-1 snap-x snap-mandatory flex-nowrap w-full"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {galleryThumbs.map((t, i) => (
                <button
                  key={`${t.src}-${i}`}
                  onClick={() => setActive(i)}
                  className={`group relative shrink-0 flex-shrink-0 w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-xl sm:rounded-2xl cursor-pointer overflow-hidden snap-center bg-[#14141a] transition-all duration-300 ${
                    i === active
                      ? 'border-2 border-[#dfb76c] shadow-[0_4px_20px_rgba(223,183,108,0.35)] ring-2 sm:ring-4 ring-[#dfb76c]/20 opacity-100 scale-100'
                      : 'border border-neutral-800 hover:border-[#dfb76c]/50 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Thumbnail ${i + 1}: ${t.label}`}
                >
                  {t.isWallHung ? (
                    <WallHangedImageGenerator
                      src={t.src}
                      alt={t.alt}
                      width={280}
                      height={180}
                    />
                  ) : (
                    <img
                      src={t.src}
                      alt={t.alt}
                      className="w-full h-full object-contain p-1 pointer-events-none select-none"
                    />
                  )}
                  {i === active && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#dfb76c]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: ELEGANT PURCHASE DOSSIER (5 Columns) */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-5 sm:space-y-6">
            <div className="bg-[#121217]/95 backdrop-blur-2xl p-5 sm:p-7 lg:p-8 xl:p-9 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-[0_16px_50px_rgba(0,0,0,0.5)] space-y-5 sm:space-y-6">
              {/* Header: Title & Artist */}
              <div className="space-y-1.5 sm:space-y-2 pb-5 sm:pb-6 border-b border-neutral-800/80">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block">
                  Original Masterpiece
                </span>
                <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] font-normal text-white tracking-tight leading-tight">
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
              <div className="pb-5 sm:pb-6 border-b border-neutral-800/80 space-y-1.5 sm:space-y-2">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium block">
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
                <p className="text-[11px] sm:text-xs text-neutral-400 font-light pt-0.5 sm:pt-1">
                  Includes all taxes • Insured white-glove global air transit • Authenticity certificate
                </p>
              </div>

              {/* Dimensions & Unit Switcher */}
              <div className="pb-5 sm:pb-6 border-b border-neutral-800/80 space-y-3">
                <div className="flex flex-row items-center justify-between gap-2 flex-nowrap">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] text-neutral-400 font-medium">
                    Dimensions & Medium
                  </span>
                  {/* Unit Toggle Pill */}
                  <div className="product-unit-toggle bg-neutral-900 p-0.5 rounded-lg border border-neutral-700/80 inline-flex flex-row items-center shrink-0 flex-nowrap">
                    <button
                      onClick={() => setUnit('inch')}
                      className={`px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0 ${
                        unit === 'inch' ? 'bg-[#dfb76c] text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Inches
                    </button>
                    <button
                      onClick={() => setUnit('cm')}
                      className={`px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0 ${
                        unit === 'cm' ? 'bg-[#dfb76c] text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Centimeters
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                  <div className="p-2.5 sm:p-3.5 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                    <span className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider block mb-0.5 sm:mb-1">Canvas Size</span>
                    <span className="font-medium text-white text-xs sm:text-sm break-words">
                      {unit === 'inch' ? '32.00 × 30.00 in' : '81.28 × 76.20 cm'}
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3.5 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                    <span className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider block mb-0.5 sm:mb-1">Medium</span>
                    <span className="font-medium text-white text-xs sm:text-sm break-words">
                      Acrylic on Canvas
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2.5 sm:space-y-3 pt-1">
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full py-3.5 sm:py-4 px-3 sm:px-6 bg-gradient-to-r from-[#dfb76c] via-[#f7d794] to-[#dfb76c] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] font-bold transition-all duration-300 shadow-[0_8px_30px_rgba(223,183,108,0.3)] hover:shadow-[0_12px_40px_rgba(223,183,108,0.45)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard size={15} />
                  <span>Acquire Artwork • ₹1,18,300</span>
                </motion.button>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    onClick={() => setShowOfferModal(true)}
                    className="py-3 sm:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl border border-[#dfb76c] text-[#dfb76c] hover:bg-[#dfb76c]/10 text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer bg-neutral-900/60"
                  >
                    <MessageCircle size={13} />
                    <span>Make Offer</span>
                  </motion.button>

                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="py-3 sm:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl border border-neutral-700 hover:border-neutral-500 text-neutral-200 hover:bg-neutral-800 text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer bg-neutral-900/60"
                  >
                    <ShoppingCart size={13} />
                    <span>Add to Cart</span>
                  </motion.button>
                </div>
              </div>

              {/* Guarantees List */}
              <div className="pt-3.5 sm:pt-4 border-t border-neutral-800/80 space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs text-neutral-300 font-light">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <CheckCircle2 size={14} className="text-[#dfb76c] flex-shrink-0" />
                  <span>Certificate of Authenticity signed by Pradip Sarkar</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Shield size={14} className="text-[#dfb76c] flex-shrink-0" />
                  <span>100% Secured payment and escrow protection</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <RefreshCw size={14} className="text-[#dfb76c] flex-shrink-0" />
                  <span>14-Days Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Truck size={14} className="text-[#dfb76c] flex-shrink-0" />
                  <span>Free worldwide insured air shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. FULL-WIDTH EDITORIAL CURATORIAL TABS (With Art Animations) */}
      {/* ========================================================= */}
      <section className="w-full pt-6 sm:pt-8 border-t border-neutral-800/80">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-4 mb-6 sm:mb-10 max-w-2xl mx-auto w-full">
          <button
            onClick={() => setTab('artwork')}
            className={`py-2 sm:py-3.5 px-1.5 sm:px-6 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 text-center ${
              tab === 'artwork'
                ? 'bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] text-neutral-950 shadow-lg'
                : 'bg-[#121217] text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <Palette size={13} className="sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">About The Artwork</span>
            <span className="sm:hidden">Artwork</span>
          </button>

          <button
            onClick={() => setTab('artist')}
            className={`py-2 sm:py-3.5 px-1.5 sm:px-6 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 text-center ${
              tab === 'artist'
                ? 'bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] text-neutral-950 shadow-lg'
                : 'bg-[#121217] text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <FileText size={13} className="sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">Artist Biography</span>
            <span className="sm:hidden">Biography</span>
          </button>

          <button
            onClick={() => setTab('shipping')}
            className={`py-2 sm:py-3.5 px-1.5 sm:px-6 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 text-center ${
              tab === 'shipping'
                ? 'bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] text-neutral-950 shadow-lg'
                : 'bg-[#121217] text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <Truck size={13} className="sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">Shipping & Logistics</span>
            <span className="sm:hidden">Shipping</span>
          </button>
        </div>

        {/* TAB 1: ABOUT THE ARTWORK */}
        {tab === 'artwork' && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 sm:space-y-12 max-w-5xl mx-auto"
          >
            {/* Curatorial Specifications Grid */}
            <div className="bg-[#121217]/90 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-xl space-y-5 sm:space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1">
                  Specifications
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight">
                  Artwork Details & Technical Ledger
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-2 sm:pt-4 text-xs">
                <div className="p-3 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px] sm:text-[11px] block mb-0.5 sm:mb-1">Category</span>
                  <span className="font-medium text-white text-xs sm:text-sm">Portrait / Abstract</span>
                </div>
                <div className="p-3 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px] sm:text-[11px] block mb-0.5 sm:mb-1">Style</span>
                  <span className="font-medium text-white text-xs sm:text-sm">Geometric Abstraction</span>
                </div>
                <div className="p-3 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px] sm:text-[11px] block mb-0.5 sm:mb-1">Techniques</span>
                  <span className="font-medium text-white text-xs sm:text-sm">Layered Impasto</span>
                </div>
                <div className="p-3 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px] sm:text-[11px] block mb-0.5 sm:mb-1">Medium Used</span>
                  <span className="font-medium text-white text-xs sm:text-sm">Acrylic on Canvas</span>
                </div>

                <div className="p-3 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px] sm:text-[11px] block mb-0.5 sm:mb-1">Size (Inches)</span>
                  <span className="font-medium text-white text-xs sm:text-sm">32.00 × 30.00 in</span>
                </div>
                <div className="p-3 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px] sm:text-[11px] block mb-0.5 sm:mb-1">Size (Metric)</span>
                  <span className="font-medium text-white text-xs sm:text-sm">81.28 × 76.20 cm</span>
                </div>
                <div className="p-3 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px] sm:text-[11px] block mb-0.5 sm:mb-1">Year Created</span>
                  <span className="font-medium text-white text-xs sm:text-sm">2023 / 2018</span>
                </div>
                <div className="p-3 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px] sm:text-[11px] block mb-0.5 sm:mb-1">Delivery Format</span>
                  <span className="font-medium text-white text-xs sm:text-sm">Stretched / Rolled</span>
                </div>
              </div>
            </div>

            {/* Curatorial Sonata & Interactive Storyboard Reel */}
            <div className="bg-[#121217]/90 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-xl space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 border-b border-neutral-800/80 pb-4 sm:pb-6">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1">
                    Curatorial Sonata
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white">
                    The Harmonic Motifs of 'Divine Tunes'
                  </h4>
                </div>
                <span className="text-[11px] sm:text-xs text-neutral-400 font-light">
                  Interactive Curatorial Storyboard
                </span>
              </div>

              {/* 3 Interactive Animated Motif Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {curatorialMotifs.map((motif, idx) => (
                  <motion.div
                    key={motif.id}
                    whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.3 } }}
                    onClick={() => setActiveMotif(idx)}
                    className={`group relative rounded-xl sm:rounded-2xl overflow-hidden border p-4 sm:p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      activeMotif === idx 
                        ? 'bg-[#181824] border-[#dfb76c] shadow-[0_8px_30px_rgba(223,183,108,0.2)]' 
                        : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="relative h-32 sm:h-36 w-full rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-black">
                        <img 
                          src={motif.image} 
                          alt={motif.title} 
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 select-none" 
                        />
                        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[#dfb76c] text-[10px] font-bold uppercase tracking-wider border border-neutral-700">
                          {motif.badge}
                        </div>
                      </div>

                      <span className="text-[10px] uppercase tracking-widest text-[#dfb76c] font-semibold block mb-1">
                        {motif.subtitle}
                      </span>
                      <h5 className="font-serif text-base sm:text-lg font-medium text-white mb-1.5 sm:mb-2 group-hover:text-[#f7d794] transition-colors">
                        {motif.title}
                      </h5>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed">
                        {motif.desc}
                      </p>
                    </div>

                    <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-[#dfb76c]">
                      <span>{activeMotif === idx ? '✦ Active Motif' : 'Click to Focus'}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Complete Curatorial Statement Accordion */}
              <ArtworkStatement title="Lady and Butterflies — Full Curatorial Statement" defaultOpen={false}>
                <div className="text-neutral-300 space-y-4 font-light text-xs sm:text-sm">
                  <p>To further enhance the connection with nature, I have included three butterflies in the painting. Resplendent in darker shades of purple and pink, they flutter gracefully around the woman's face. These ethereal creatures symbolize the delicate balance of life and the interconnectedness between all living beings.</p>

                  <p>"Lady and Butterflies" belongs to the series "In Harmony with Nature." This collection explores the profound connection and interdependence between humans and the natural world. Through my art, I strive to inspire viewers to embrace compassion, appreciate the beauty of nature, and live in harmony with our surroundings.</p>

                  <h5 className="font-serif text-base sm:text-lg font-medium text-white pt-2 text-left">Capturing the Awe-Inspiring Connection</h5>
                  <p>With "Lady and Butterflies", I aimed to capture the profound and awe-inspiring connection between humans and nature. The woman's gentle smile and loving gaze reflect her appreciation for the beauty that surrounds her. It is a reminder that we, too, can experience this sense of wonder and unity by embracing our role as caretakers of the earth.</p>

                  <h5 className="font-serif text-base sm:text-lg font-medium text-white pt-2 text-left">Living in Harmony with Nature</h5>
                  <p>Through this artwork, I hope to convey the importance of living in harmony with nature. Our actions, both individually and collectively, reverberate through the delicate balance of ecosystems. By fostering empathy for all creatures, we can mitigate the negative impacts of human activities and strive towards a more sustainable coexistence.</p>

                  <p>In this series, I use symmetrical forms—squares, rectangles, checks, and butterflies—to cover the human figures. These geometric shapes represent the pursuit of perfection and balance, encapsulating the aspirations and struggles we all face as individuals striving for fulfillment.</p>
                </div>
              </ArtworkStatement>
            </div>
          </motion.div>
        )}

        {/* TAB 2: ARTIST MONOGRAPH (With Animated Filmstrip) */}
        {tab === 'artist' && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#121217]/90 backdrop-blur-xl p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-xl space-y-8 sm:space-y-10 max-w-5xl mx-auto"
          >
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
                {artistFilmstrip.map((item, idx) => (
                  <motion.div
                    key={`${item.title}-${idx}`}
                    whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                    className="flex-shrink-0 w-36 xs:w-44 sm:w-52 bg-neutral-900 rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-800 group cursor-pointer"
                  >
                    <div className="h-28 xs:h-36 sm:h-40 w-full overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-2 text-[9px] sm:text-[10px] text-[#dfb76c] font-mono bg-black/60 px-1.5 py-0.5 rounded">
                        {item.year}
                      </span>
                    </div>
                    <div className="p-2.5 sm:p-3">
                      <h6 className="font-serif text-[11px] sm:text-xs font-medium text-white truncate group-hover:text-[#dfb76c] transition-colors">
                        {item.title}
                      </h6>
                      <span className="text-[10px] text-neutral-400">Pradip Sarkar</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 4 Concise Milestone Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                <span className="text-[10px] uppercase tracking-widest text-[#dfb76c] font-bold block mb-1">Origin</span>
                <h5 className="font-serif text-xs sm:text-sm font-medium text-white">Dhanbad, Jharkhand</h5>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-1">Commerce Graduate, Ranchi University</p>
              </div>
              <div className="p-3.5 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                <span className="text-[10px] uppercase tracking-widest text-[#dfb76c] font-bold block mb-1">Academic</span>
                <h5 className="font-serif text-xs sm:text-sm font-medium text-white">Diploma in Fine Art</h5>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-1">British Institute, Mumbai</p>
              </div>
              <div className="p-3.5 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                <span className="text-[10px] uppercase tracking-widest text-[#dfb76c] font-bold block mb-1">Exhibitions</span>
                <h5 className="font-serif text-xs sm:text-sm font-medium text-white">70+ Curated Shows</h5>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-1">Active Indian contemporary artist since 1995</p>
              </div>
              <div className="p-3.5 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                <span className="text-[10px] uppercase tracking-widest text-[#dfb76c] font-bold block mb-1">Presence</span>
                <h5 className="font-serif text-xs sm:text-sm font-medium text-white">Lalit Kala Akademi</h5>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-1">Featured across prestigious institutions</p>
              </div>
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
          </motion.div>
        )}

        {/* TAB 3: SHIPPING & LOGISTICS (Interactive 4-Stage Animated Delivery Journey) */}
        {tab === 'shipping' && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#121217]/90 backdrop-blur-xl p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-xl space-y-8 sm:space-y-10 max-w-5xl mx-auto"
          >
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
              
              {/* Play / Pause Interactive Simulation */}
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

            {/* Interactive Timeline Step Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {shippingStages.map((stage, idx) => (
                <button
                  key={stage.phase}
                  onClick={() => {
                    setShippingStep(idx)
                    setIsShippingAutoPlay(false)
                  }}
                  className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    shippingStep === idx
                      ? 'bg-gradient-to-br from-[#1c1c28] to-[#14141e] border-[#dfb76c] shadow-[0_4px_20px_rgba(223,183,108,0.25)]'
                      : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  {shippingStep === idx && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#dfb76c]" />
                  )}
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#dfb76c] uppercase tracking-wider block mb-0.5">
                    0{idx + 1} // {stage.phase}
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-medium text-white block truncate">
                    {stage.title.split(' ')[0]} {stage.title.split(' ')[1]}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Stage Simulation Theater */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#161622] to-[#0f0f15] border border-neutral-800 p-4 sm:p-7 md:p-10 shadow-2xl">
              {/* Dynamic Ambient Glow */}
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
                  {/* Left: Dynamic Visual Graphic (7 Cols) */}
                  <div className="lg:col-span-7 h-56 xs:h-64 sm:h-72 w-full rounded-xl sm:rounded-2xl bg-black/60 border border-neutral-800 overflow-hidden relative flex items-center justify-center p-3 sm:p-6">
                    {/* STAGE 0: ARTWORK INSPECTION */}
                    {shippingStep === 0 && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="w-36 xs:w-44 sm:w-48 h-full rounded-lg sm:rounded-xl overflow-hidden border border-neutral-700 shadow-2xl relative">
                          <img src={screenshotImage} alt="Divine Tunes-11" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/20" />
                          
                          {/* Animated Inspection Loupe Ring */}
                          <motion.div
                            animate={{
                              x: [-15, 15, -8, 0],
                              y: [-15, 8, -15, 0],
                              scale: [1, 1.08, 1]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-3 sm:inset-4 rounded-full border-2 border-[#dfb76c] shadow-[0_0_20px_rgba(223,183,108,0.6)] pointer-events-none flex items-center justify-center"
                          >
                            <span className="text-[9px] sm:text-[10px] text-[#dfb76c] font-mono font-bold bg-black/80 px-1.5 sm:px-2 py-0.5 rounded">
                              INSPECTED ✓
                            </span>
                          </motion.div>
                        </div>
                        
                        {/* Serial Hologram Seal Badge */}
                        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-4 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#121217]/90 border border-[#dfb76c]/40 text-[10px] sm:text-xs text-[#dfb76c] flex items-center gap-1.5">
                          <CheckCircle2 size={13} />
                          <span>Hologram #ZG-7819</span>
                        </div>
                      </div>
                    )}

                    {/* STAGE 1: ARCHIVAL PACKAGING */}
                    {shippingStep === 1 && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 sm:gap-4">
                        <div className="w-52 xs:w-64 sm:w-72 h-16 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border-2 border-[#dfb76c]/60 shadow-[0_10px_30px_rgba(223,183,108,0.2)] flex items-center justify-between px-4 sm:px-6 relative overflow-hidden">
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <Box size={20} className="text-[#dfb76c] sm:w-6 sm:h-6" />
                            <div>
                              <span className="text-[11px] sm:text-xs font-serif text-white font-medium block">Archival Heavy Tube</span>
                              <span className="text-[9px] sm:text-[10px] text-neutral-400">Moisture-Proof Casing</span>
                            </div>
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-mono text-[#dfb76c] border border-[#dfb76c]/40 px-1.5 sm:px-2 py-0.5 rounded">
                            SEALED
                          </span>
                        </div>

                        {/* Packaging Layers Representation */}
                        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-neutral-400">
                          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-neutral-900 rounded-lg border border-neutral-800">1. Acid-Free Wrap</span>
                          <span>→</span>
                          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-neutral-900 rounded-lg border border-neutral-800">2. Foam Cushion</span>
                          <span>→</span>
                          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#dfb76c]/20 text-[#f7d794] rounded-lg border border-[#dfb76c]/40">3. Polymer Tube</span>
                        </div>
                      </div>
                    )}

                    {/* STAGE 2: IN TRANSIT (MOVING VEHICLE ANIMATION) */}
                    {shippingStep === 2 && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center px-2 sm:px-4">
                        {/* Route Line Track */}
                        <div className="w-full relative py-5 sm:py-6">
                          <div className="h-1 w-full bg-neutral-800 rounded-full relative overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#dfb76c] to-[#f7d794]"
                              animate={{ width: ['0%', '100%'] }}
                              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                            />
                          </div>

                          {/* Animated Delivery Van Vehicle in Motion */}
                          <motion.div
                            className="absolute top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#dfb76c] text-neutral-950 shadow-[0_0_20px_rgba(223,183,108,0.8)]"
                            animate={{ left: ['0%', '82%'] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                          >
                            <Truck size={17} className="sm:w-5 sm:h-5" />
                          </motion.div>
                        </div>

                        {/* Telemetry Route Markers */}
                        <div className="w-full flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 xs:gap-2 text-[10px] sm:text-xs pt-1 sm:pt-2">
                          <div className="flex items-center gap-1.5 text-neutral-400">
                            <MapPin size={12} className="text-[#dfb76c] flex-shrink-0" />
                            <span>Vault (Mumbai)</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#dfb76c] font-semibold">
                            <Compass size={12} className="animate-spin flex-shrink-0" />
                            <span>GPS Waypoint Active</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-400">
                            <Home size={12} className="text-[#dfb76c] flex-shrink-0" />
                            <span>Your Sanctuary</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STAGE 3: WHITE-GLOVE HANDOVER */}
                    {shippingStep === 3 && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-3 sm:p-4 space-y-2 sm:space-y-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#dfb76c]/20 text-[#dfb76c] border border-[#dfb76c] flex items-center justify-center shadow-[0_0_25px_rgba(223,183,108,0.4)]">
                          <CheckCircle2 size={26} className="sm:w-[30px] sm:h-[30px]" />
                        </div>
                        <h5 className="font-serif text-base sm:text-lg font-medium text-white">
                          Delivered & Authenticated
                        </h5>
                        <p className="text-[11px] sm:text-xs text-neutral-300 max-w-sm">
                          Artwork delivered safely into your hands with signed Certificate of Provenance and full collector care support.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right: Step Details & Highlights (5 Cols) */}
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

                    {/* Highlights List */}
                    <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                      {shippingStages[shippingStep].highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-300">
                          <Check size={13} className="text-[#dfb76c] flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Next / Prev Step Controls */}
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
              <div className="p-3.5 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#dfb76c] font-semibold text-xs mb-1">
                  <Clock size={13} />
                  <span>5–7 Days Domestic</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light">Direct express delivery across India with priority freight routing.</p>
              </div>

              <div className="p-3.5 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#dfb76c] font-semibold text-xs mb-1">
                  <Globe size={13} />
                  <span>10–20 Days Global</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light">Worldwide insured air courier delivery with customs handling.</p>
              </div>

              <div className="p-3.5 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#dfb76c] font-semibold text-xs mb-1">
                  <Shield size={13} />
                  <span>100% Value Insured</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light">Artwork fully protected from the moment it leaves our vault.</p>
              </div>

              <div className="p-3.5 sm:p-4 bg-neutral-900/90 rounded-xl sm:rounded-2xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#dfb76c] font-semibold text-xs mb-1">
                  <RefreshCw size={13} />
                  <span>14-Day Return</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light">24-hour damage inspection window & 14-day collector return privilege.</p>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 4. FULL-WIDTH ARTIST SPOTLIGHT */}
      {/* ========================================================= */}
      <section id="artist-section" className="w-full pt-4 sm:pt-6">
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
            Artist Spotlight
          </h2>
        </motion.div>
        <div className="flex justify-center">
          <ArtistCardMini name="Pradip Sarkar" location="Mumbai, India" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FULL-WIDTH ARTIST SAGA & CONTINUOUS MARQUEES */}
      {/* ========================================================= */}
      <section className="w-full pt-4 sm:pt-6">
        <ArtistSaga />
      </section>

      {/* ========================================================= */}
      {/* 6. HIGH-RESOLUTION FULLSCREEN ZOOM MODAL */}
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
                  src={galleryThumbs[active].src}
                  alt="High-resolution artwork view"
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
      {/* 7. MAKE AN OFFER MODAL */}
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
      {/* 8. ARTWORK UPLOAD & WALL VISUALIZER MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4"
            onClick={() => setShowUploadModal(false)}
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
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 p-2 sm:p-2.5 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer"
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>

              <div className="bg-gradient-to-r from-neutral-900 to-black px-5 py-5 sm:px-8 sm:py-8 text-white border-b border-neutral-800">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1">
                  Wall Visualizer
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal tracking-tight">
                  Upload Room Setting
                </h2>
                <p className="text-neutral-400 text-[11px] sm:text-xs mt-1 sm:mt-1.5 font-light">
                  Images are automatically analyzed for orientation and wall proportions.
                </p>
              </div>

              <div className="p-5 sm:p-8 max-h-[calc(92vh-130px)] overflow-y-auto">
                {uploadError && (
                  <div className="p-3 sm:p-4 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl mb-4 flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>{uploadError}</span>
                  </div>
                )}

                {uploadSuccess ? (
                  <div className="p-6 sm:p-8 text-center space-y-2 bg-emerald-950/60 border border-emerald-700 rounded-2xl text-emerald-300">
                    <Check size={24} className="mx-auto" />
                    <p className="text-xs sm:text-sm font-semibold">Image Added to Gallery Views!</p>
                  </div>
                ) : !imageOrientationData ? (
                  <label className="block border-2 border-dashed border-[#dfb76c]/60 hover:border-[#dfb76c] rounded-2xl p-6 sm:p-8 text-center cursor-pointer hover:bg-[#161620] transition-all">
                    <Upload size={32} className="mx-auto text-[#dfb76c] mb-2.5 sm:mb-3" />
                    <p className="font-serif text-base sm:text-lg font-medium text-white mb-1">Upload Your Wall Image</p>
                    <p className="text-[11px] sm:text-xs text-neutral-400">Supports JPEG, PNG, WebP (Max 50MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-3.5 sm:space-y-4">
                    <div className="w-full h-40 sm:h-48 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                      <img src={previewImage} alt="Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="p-2.5 sm:p-3 bg-neutral-900 rounded-xl text-[11px] sm:text-xs text-neutral-300 flex justify-between font-mono border border-neutral-800">
                      <span>Orientation: {imageOrientationData.orientation}</span>
                      <span>{imageOrientationData.width} × {imageOrientationData.height}px</span>
                    </div>
                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      onClick={handleUploadImage}
                      disabled={uploadingImage}
                      className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] text-neutral-950 rounded-xl text-xs uppercase tracking-wider font-bold cursor-pointer"
                    >
                      {uploadingImage ? 'Processing...' : 'Apply to Gallery'}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 9. TOAST NOTIFICATIONS */}
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
