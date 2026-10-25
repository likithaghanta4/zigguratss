import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, X, CheckCircle2, Shield, Eye, ArrowUpRight, Palette, Layers, 
  ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Star, Quote, Award, Heart, Check, Compass, Feather, BookOpen
} from 'lucide-react'

// Authentic Zigguratss Artworks from repository
import screenshotImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 14-57-58.png'
import flowersImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 15-14-55.png'
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
import './ArtistSaga.css'
import EarthGlobeReviewsSection from './EarthGlobeReviewsSection'

// The Maison Pillars of Expression
export const pillars = [
  { 
    number: 'N° 01', 
    title: 'Geometric Harmony', 
    subtitle: 'Mathematical Structure & Soul',
    body: 'Compositions that reconcile mathematical structure with organic canvas textures, creating harmonious chromatic scales and luminous balance across the canvas.',
    image: image9,
    tag: 'Structured Abstraction',
    symbol: '✧'
  },
  { 
    number: 'N° 02', 
    title: 'Vedic Meditation', 
    subtitle: 'Rhythmic Spiritual Balance',
    body: 'A contemplative spiritual practice informing rhythm, inner stillness, and meditative balance across each deliberate, multi-layered acrylic brushstroke.',
    image: image2,
    tag: 'Spiritual Sonata',
    symbol: '❖'
  },
  { 
    number: 'N° 03', 
    title: 'Tactile Materiality', 
    subtitle: 'Layered Impasto & Palette Work',
    body: 'Rich impasto layers and delicate palette knife work reveal authentic texture, physical depth, and the luminous character of the medium under museum lighting.',
    image: image12,
    tag: 'Master Impasto',
    symbol: '✦'
  },
]

// Authentic Collector Testimonials (Inspired by Maison des élites "Reviews That Stole Our Hearts")
export const collectorReviews = [
  {
    id: 1,
    quote: "The geometric harmony and delicate butterfly motif in 'Divine Tunes-11' create a breathtaking stillness in our gallery salon. Pradip Sarkar's impasto technique catches natural morning light in a way photographs simply cannot capture.",
    collector: "Dr. Ananya Sen",
    title: "Senior Art Historian & Private Collector",
    location: "Kolkata, India",
    artwork: "Divine Tunes-11",
    rating: 5,
    seal: "Verified Master Collector",
    signature: "A. Sen",
    rotation: -1.5
  },
  {
    id: 2,
    quote: "Zigguratss delivered this masterwork in flawless museum-grade packaging. The certificate of provenance personally signed by Pradip Sarkar and the tamper-evident serial seal provide absolute assurance.",
    collector: "Vikramaditya Singhania",
    title: "Heritage Collection Patron",
    location: "Mumbai, India",
    artwork: "Divine Tunes-11",
    rating: 5,
    seal: "Curatorial Provenance Verified",
    signature: "V. Singhania",
    rotation: 1.5
  },
  {
    id: 3,
    quote: "Acquiring 'Divine Tunes-11' was a transcendent experience. The Vedic meditative rhythm of the squares and the serene feminine aura harmonize our London residence effortlessly.",
    collector: "Elena Rostova",
    title: "Contemporary Fine Art Collector",
    location: "London, United Kingdom",
    artwork: "Divine Tunes-11",
    rating: 5,
    seal: "International Vault Shipment",
    signature: "E. Rostova",
    rotation: -1.0
  },
  {
    id: 4,
    quote: "The interplay of architectural symmetry and delicate nature symbolism represents modern Indian abstraction at its pinnacle. A timeless centerpiece in our architectural studio.",
    collector: "Rohan & Priya Mehra",
    title: "Principal Architects & Curators",
    location: "New Delhi, India",
    artwork: "Divine Tunes-11",
    rating: 5,
    seal: "Private Atelier Acquisition",
    signature: "R. & P. Mehra",
    rotation: 2.0
  }
]

// Comprehensive authentic artwork registry for Zigguratss curated works
export const ALL_CURATED_ARTWORKS = [
  {
    id: 'dt-11',
    title: 'Divine Tunes-11',
    artist: 'Pradip Sarkar',
    image: screenshotImage,
    price: '₹1,18,300',
    originalPrice: '₹1,47,800',
    medium: 'Acrylic on Canvas',
    sizeInch: '32 × 30 in',
    sizeCm: '81.28 × 76.2 cm',
    year: '2024',
    category: 'Portrait / Abstract',
    style: 'Geometric Abstraction',
    shortDesc: 'Contemporary figurative portraiture fused with meditative geometric abstraction and nature symbolism.',
    verified: true
  },
  {
    id: 'dt-09',
    title: 'Divine Tunes-09',
    artist: 'Pradip Sarkar',
    image: flowersImage,
    price: '₹98,000',
    originalPrice: '₹1,22,500',
    medium: 'Acrylic on Canvas',
    sizeInch: '30 × 30 in',
    sizeCm: '76.2 × 76.2 cm',
    year: '2023',
    category: 'Contemporary Portrait',
    style: 'Color Field Geometry',
    shortDesc: 'Exploration of meditative consciousness through deep ultramarine blues and vibrant gold highlights.',
    verified: true
  },
  {
    id: 'dt-05',
    title: 'Divine Tunes-05',
    artist: 'Pradip Sarkar',
    image: image9,
    price: '₹75,000',
    originalPrice: '₹93,750',
    medium: 'Acrylic on Canvas',
    sizeInch: '28 × 24 in',
    sizeCm: '71.1 × 60.9 cm',
    year: '2023',
    category: 'Figurative Flora',
    style: 'Atmospheric Symbolism',
    shortDesc: 'A delicate dialogue between nature, golden flora, and avian symbols celebrating the sanctity of living beauty.',
    verified: true
  },
  {
    id: 'dt-02',
    title: 'Divine Tunes-02',
    artist: 'Pradip Sarkar',
    image: image12,
    price: '₹62,500',
    originalPrice: '₹78,000',
    medium: 'Oil & Acrylic on Canvas',
    sizeInch: '26 × 22 in',
    sizeCm: '66.0 × 55.8 cm',
    year: '2022',
    category: 'Solitude Silhouette',
    style: 'Dusk Luminism',
    shortDesc: 'A lone figure bathed in amber forest sunset, invoking the peace of wandering in the heart of nature.',
    verified: true
  },
  {
    id: 'dt-07',
    title: 'Divine Tunes-07',
    artist: 'Pradip Sarkar',
    image: diff3,
    price: '₹84,000',
    originalPrice: '₹1,05,000',
    medium: 'Acrylic & Gold Leaf on Linen',
    sizeInch: '30 × 26 in',
    sizeCm: '76.2 × 66.0 cm',
    year: '2023',
    category: 'Wildlife Iconography',
    style: 'Woodland Mysticism',
    shortDesc: 'Gentle fawn surrounded by sacred forest botanicals rendered in rich textural brushwork and leaf gilding.',
    verified: true
  },
  {
    id: 'o1',
    title: 'Tune Of Bengal — 4',
    artist: 'Sekhar Roy',
    image: image2,
    price: '₹45,000',
    originalPrice: '₹56,000',
    medium: 'Mixed Media on Canvas',
    sizeInch: '24 × 24 in',
    sizeCm: '60.9 × 60.9 cm',
    year: '2023',
    category: 'Heritage Folklore',
    style: 'Neo-Folk Expressionism',
    shortDesc: 'Vibrant cultural narratives woven from rural Bengal heritage with bold earthen pigments and sacred motifs.',
    verified: false
  },
  {
    id: 'o2',
    title: 'Ocean Of Dreams',
    artist: 'Uttam Bhattacharya',
    image: diff1,
    price: '₹38,000',
    originalPrice: '₹47,500',
    medium: 'Acrylic on Textured Canvas',
    sizeInch: '24 × 20 in',
    sizeCm: '60.9 × 50.8 cm',
    year: '2022',
    category: 'Maritime Abstraction',
    style: 'Fluid Modernism',
    shortDesc: 'Atmospheric azure waves surging into foam and light, capturing the timeless infinity of the ocean.',
    verified: false
  },
  {
    id: 'o3',
    title: 'Eternal Grace',
    artist: 'Priyanka Bardhan',
    image: image3,
    price: '₹55,000',
    originalPrice: '₹68,750',
    medium: 'Oil & 24K Leaf on Linen',
    sizeInch: '28 × 24 in',
    sizeCm: '71.1 × 60.9 cm',
    year: '2024',
    category: 'Mythological Splendor',
    style: 'Royal Renaissance',
    shortDesc: 'Regal peacock perched amid palace courtyards, crowned with 24-karat gold leaf illumination.',
    verified: false
  },
  {
    id: 'o4',
    title: 'Inner Peace 6',
    artist: 'Monalisa Sarkar Mitra',
    image: diff5,
    price: '₹29,500',
    originalPrice: '₹37,000',
    medium: 'Acrylic on Canvas',
    sizeInch: '20 × 20 in',
    sizeCm: '50.8 × 50.8 cm',
    year: '2023',
    category: 'Zen Abstraction',
    style: 'Meditative Serenity',
    shortDesc: 'Minimalist spiritual balance through quiet crimson and ivory tonal fields invoking tranquil awakening.',
    verified: false
  },
  {
    id: 'o5',
    title: 'Sky Dream 1',
    artist: 'L. Joss',
    image: sky1,
    price: '₹65,000',
    originalPrice: '₹81,250',
    medium: 'Acrylic on Belgian Canvas',
    sizeInch: '30 × 24 in',
    sizeCm: '76.2 × 60.9 cm',
    year: '2024',
    category: 'Ethereal Cloudscapes',
    style: 'Chromatic Lyrical',
    shortDesc: 'A panoramic study of celestial cloud movement painted in radiant ultramarine and dawn blush.',
    verified: false
  },
  {
    id: 'o6',
    title: 'April Ensemble',
    artist: 'Mila Weis',
    image: image5,
    price: '₹72,000',
    originalPrice: '₹90,000',
    medium: 'Oil & Tempera on Canvas',
    sizeInch: '32 × 28 in',
    sizeCm: '81.2 × 71.1 cm',
    year: '2023',
    category: 'Vernal Harmony',
    style: 'Botanical Abstract',
    shortDesc: 'Bursting springtime botanical colors arranged in rhythmic symphony across dense textured canvas.',
    verified: false
  }
]

// Luxury Gallery Artwork Card for Manually Controllable Carousel
export function LuxuryGalleryCard({ artwork, verified = false, onCardClick }) {
  const navigate = useNavigate()

  const handleSelectArtwork = (e) => {
    if (onCardClick && onCardClick(e) === false) {
      return
    }
    e.preventDefault()
    // Open product page with the clicked artwork
    navigate(`/Product?id=${artwork.id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleSelectArtwork(e)
    }
  }

  return (
    <div 
      role="button"
      tabIndex={0}
      draggable={false}
      onClick={handleSelectArtwork}
      onKeyDown={handleKeyDown}
      aria-label={`View artwork ${artwork.title} by ${artwork.artist}`}
      className="group relative bg-[#13131a] hover:bg-[#181824] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800/90 hover:border-[#dfb76c]/60 transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(223,183,108,0.2)] flex flex-col justify-between h-[390px] sm:h-[420px] cursor-pointer select-none"
    >
      {/* Top Gold Edge Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-10" />

      {/* Decorative Art-Nouveau Corner Accents */}
      <div className="absolute top-2 left-2 text-[#dfb76c]/30 text-[10px] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity">⌜</div>
      <div className="absolute top-2 right-2 text-[#dfb76c]/30 text-[10px] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity">⌝</div>

      {/* Image Frame */}
      <div className="relative h-[235px] sm:h-[260px] w-full overflow-hidden bg-neutral-950 pointer-events-none select-none">
        <img 
          src={artwork.image} 
          alt={artwork.title} 
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 filter brightness-95 group-hover:brightness-105 select-none pointer-events-none" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-transparent to-black/30 opacity-75 group-hover:opacity-40 transition-opacity pointer-events-none" />

        {/* Price Badge */}
        {artwork.price && (
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 px-2.5 sm:px-3 py-1 rounded-xl bg-black/85 backdrop-blur-md border border-[#dfb76c]/40 text-[#f7d794] text-[11px] sm:text-xs font-serif font-medium tracking-wide shadow-lg">
            {artwork.price}
          </div>
        )}

        {/* Hover View Prompt */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px] pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full bg-[#121217]/90 text-[#dfb76c] border border-[#dfb76c]/50 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
            <Eye size={13} />
            <span>Open Artwork</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between select-none">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#dfb76c]">
              {artwork.artist}
            </span>
            {(verified || artwork.verified) && (
              <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded">
                Studio Original
              </span>
            )}
          </div>

          <h4 className="font-serif text-base sm:text-lg font-normal text-white group-hover:text-[#f7d794] transition-colors line-clamp-1">
            {artwork.title}
          </h4>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 mt-2">
          <span className="text-[10px] text-neutral-400 font-light truncate max-w-[150px]">
            {artwork.medium || 'Acrylic on Canvas'}
          </span>
          <span className="text-xs text-[#dfb76c] group-hover:text-[#f7d794] font-medium flex items-center gap-1 transition-colors">
            <span>Details</span>
            <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </div>
  )
}

// ── DUAL AUTOMATIC & MANUALLY CONTROLLABLE ARTWORK CAROUSEL ──
function ArtworkManualCarousel({ title, badge, artworks, verified = false }) {
  const scrollRef = useRef(null)
  const isInteractingRef = useRef(false)
  const resumeTimeoutRef = useRef(null)
  const animFrameRef = useRef(null)
  const lastTimeRef = useRef(performance.now())
  const scrollPosRef = useRef(0)

  // Pointer drag state (Desktop mouse dragging)
  const isPointerDownRef = useRef(false)
  const isProgrammaticScrollRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollLeftRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const suppressClickRef = useRef(false)
  const suppressTimeoutRef = useRef(null)

  // Quadruple artworks array (4 sets) so continuous loop is 100% seamless in both directions
  const loopedArtworks = React.useMemo(() => {
    if (!artworks || artworks.length === 0) return []
    return [
      ...artworks.map((a, i) => ({ ...a, uniqueKey: `set0-${a.id}-${i}` })),
      ...artworks.map((a, i) => ({ ...a, uniqueKey: `set1-${a.id}-${i}` })),
      ...artworks.map((a, i) => ({ ...a, uniqueKey: `set2-${a.id}-${i}` })),
      ...artworks.map((a, i) => ({ ...a, uniqueKey: `set3-${a.id}-${i}` })),
    ]
  }, [artworks])

  const pauseAutoScroll = () => {
    isInteractingRef.current = true
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
  }

  const scheduleResume = (delay = 1500) => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false
      if (scrollRef.current) {
        scrollPosRef.current = scrollRef.current.scrollLeft
      }
      lastTimeRef.current = performance.now()
    }, delay)
  }

  // Seamless infinite wrap check
  const checkWrap = () => {
    const el = scrollRef.current
    if (!el) return
    const segment = el.scrollWidth / 4
    if (segment <= 50) return

    // If moved past set 2 into set 3, invisibly wrap back by 1 set
    if (el.scrollLeft >= segment * 2.2) {
      el.scrollLeft -= segment
      scrollPosRef.current -= segment
    } 
    // If moved back before set 1 into set 0, invisibly wrap forward by 1 set
    else if (el.scrollLeft <= segment * 0.8) {
      el.scrollLeft += segment
      scrollPosRef.current += segment
    }
  }

  // Initial positioning: start in Set 1 (between 1 and 2)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const initPos = () => {
      const segment = el.scrollWidth / 4
      if (segment > 100) {
        if (el.scrollLeft < segment * 0.5 || el.scrollLeft > segment * 2.5) {
          isProgrammaticScrollRef.current = true
          el.scrollLeft = segment
          scrollPosRef.current = segment
        }
      }
    }

    initPos()
    const t = setTimeout(initPos, 150)
    return () => clearTimeout(t)
  }, [loopedArtworks])

  // Smooth continuous auto-scroll loop (60fps requestAnimationFrame with subpixel float accumulator)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    lastTimeRef.current = performance.now()
    const speed = 1.25 // Smooth continuous auto-scroll drift speed

    const tick = (now) => {
      const deltaMs = Math.min(now - lastTimeRef.current, 50)
      lastTimeRef.current = now

      if (el) {
        if (!isInteractingRef.current && !isPointerDownRef.current) {
          const step = speed * (deltaMs / 16.67)
          scrollPosRef.current += step
          isProgrammaticScrollRef.current = true
          el.scrollLeft = scrollPosRef.current
        }
        checkWrap()
      }

      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      if (suppressTimeoutRef.current) clearTimeout(suppressTimeoutRef.current)
    }
  }, [loopedArtworks])

  // Native scroll listener (fires for mouse wheel, trackpad, touch momentum)
  const handleScroll = () => {
    // Ignore programmatic scroll events from continuous auto-scroll
    if (isProgrammaticScrollRef.current) {
      isProgrammaticScrollRef.current = false
      return
    }
    if (isPointerDownRef.current) return
    pauseAutoScroll()
    if (scrollRef.current) {
      scrollPosRef.current = scrollRef.current.scrollLeft
    }
    checkWrap()
    scheduleResume(1500)
  }

  // Global window mouseup / mousemove listener during drag for unbreakable desktop dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isPointerDownRef.current || !scrollRef.current) return
      const delta = e.clientX - startXRef.current
      if (Math.abs(delta) > 4) {
        hasDraggedRef.current = true
      }
      const newLeft = startScrollLeftRef.current - delta
      scrollRef.current.scrollLeft = newLeft
      scrollPosRef.current = newLeft
      checkWrap()
    }

    const handleGlobalMouseUp = () => {
      if (isPointerDownRef.current) {
        isPointerDownRef.current = false
        if (hasDraggedRef.current) {
          suppressClickRef.current = true
          if (suppressTimeoutRef.current) clearTimeout(suppressTimeoutRef.current)
          suppressTimeoutRef.current = setTimeout(() => {
            suppressClickRef.current = false
            hasDraggedRef.current = false
          }, 250)
        }
        scheduleResume(2000)
      }
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [])

  // Mouse Dragging Handlers (Desktop)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return
    pauseAutoScroll()
    isPointerDownRef.current = true
    hasDraggedRef.current = false
    startXRef.current = e.clientX
    startScrollLeftRef.current = scrollRef.current ? scrollRef.current.scrollLeft : 0
  }

  // Touch Events (Mobile Swiping)
  const handleTouchStart = (e) => {
    pauseAutoScroll()
    isPointerDownRef.current = true
    hasDraggedRef.current = false
    startXRef.current = e.touches[0].clientX
    startScrollLeftRef.current = scrollRef.current ? scrollRef.current.scrollLeft : 0
  }

  const handleTouchMove = (e) => {
    if (!isPointerDownRef.current || !scrollRef.current) return
    const delta = e.touches[0].clientX - startXRef.current
    if (Math.abs(delta) > 4) {
      hasDraggedRef.current = true
    }
    const newLeft = startScrollLeftRef.current - delta
    scrollRef.current.scrollLeft = newLeft
    scrollPosRef.current = newLeft
    checkWrap()
  }

  const handleTouchEnd = () => {
    isPointerDownRef.current = false
    if (scrollRef.current) {
      scrollPosRef.current = scrollRef.current.scrollLeft
    }
    if (hasDraggedRef.current) {
      suppressClickRef.current = true
      if (suppressTimeoutRef.current) clearTimeout(suppressTimeoutRef.current)
      suppressTimeoutRef.current = setTimeout(() => {
        suppressClickRef.current = false
        hasDraggedRef.current = false
      }, 250)
    }
    scheduleResume(2000)
  }

  // Trackpad / Wheel scroll
  const handleWheel = () => {
    pauseAutoScroll()
    if (scrollRef.current) {
      scrollPosRef.current = scrollRef.current.scrollLeft
    }
    checkWrap()
    scheduleResume(2000)
  }

  // Manual Chevron Button Controls
  const handleChevronScroll = (direction) => {
    const el = scrollRef.current
    if (!el) return
    pauseAutoScroll()
    const cardWidth = 320
    const scrollAmount = direction === 'left' ? -cardWidth * 1.3 : cardWidth * 1.3
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    scrollPosRef.current = el.scrollLeft + scrollAmount
    scheduleResume(2500)
  }

  // Suppress card click navigation if user was dragging or swiping
  const handleCardClick = () => {
    if (hasDraggedRef.current || suppressClickRef.current) {
      return false
    }
    return true
  }

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold">
              {badge}
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight">
            {title}
          </h3>
        </div>

        {/* Manual Scroll Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleChevronScroll('left')}
            aria-label={`Scroll ${title} left`}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#dfb76c]/50 hover:border-[#dfb76c] bg-[#14141e] text-[#dfb76c] hover:bg-[#dfb76c]/15 flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => handleChevronScroll('right')}
            aria-label={`Scroll ${title} right`}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#dfb76c]/50 hover:border-[#dfb76c] bg-[#14141e] text-[#dfb76c] hover:bg-[#dfb76c]/15 flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Dual Continuous & Interactive Carousel Track */}
      <div className="relative bg-[#121217]/80 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-neutral-800/80 backdrop-blur-md shadow-xl overflow-hidden select-none">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="artwork-manual-carousel-track flex gap-4 sm:gap-6 overflow-x-auto py-2 px-1 touch-pan-x select-none cursor-grab active:cursor-grabbing"
        >
          {loopedArtworks.map((item) => (
            <div 
              key={item.uniqueKey} 
              className="shrink-0 w-[260px] xs:w-[280px] sm:w-[305px] select-none"
            >
              <LuxuryGalleryCard 
                artwork={item} 
                verified={verified || item.verified} 
                onCardClick={handleCardClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 1. EXPORTED COLLECTOR REVIEWS SECTION ("Reviews That Stole Our Hearts" with Earth Globe & Radiating Waves) ──
export function CollectorReviewsSection() {
  return <EarthGlobeReviewsSection />
}

// ── 2. EXPORTED ARTIST MARQUEES SECTION (Oeuvre & Other Masters Streams) ──
export function ArtistMarqueesSection() {
  const shouldReduceMotion = useReducedMotion()

  const pradipArtworks = ALL_CURATED_ARTWORKS.filter(a => a.artist === 'Pradip Sarkar')
  const otherMastersArtworks = ALL_CURATED_ARTWORKS.filter(a => a.artist !== 'Pradip Sarkar')

  return (
    <motion.div 
      data-showcase-section
      data-showcase-title="Related Masterworks & Streams"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px', amount: 0.05 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full space-y-10 sm:space-y-14"
    >
      {/* RELATED ARTWORKS: PRADIP SARKAR */}
      <ArtworkManualCarousel 
        title="Artworks by Pradip Sarkar"
        badge="Curated Selection"
        artworks={pradipArtworks}
        verified={true}
      />

      {/* RELATED ARTWORKS: OTHER MASTERS */}
      <ArtworkManualCarousel 
        title="Artworks by Other Artists"
        badge="Gallery Recommendations"
        artworks={otherMastersArtworks}
        verified={false}
      />
    </motion.div>
  )
}

// Default export combining them if needed
export default function ArtistSaga() {
  return (
    <div className="w-full space-y-16 sm:space-y-20 lg:space-y-28">
      <ArtistMarqueesSection />
      <CollectorReviewsSection />
    </div>
  )
}
