import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, X, CheckCircle2, Shield, Eye, ArrowUpRight, Palette, Layers, 
  ArrowRight, ArrowLeft, Star, Quote, Award, Heart, Check, Compass, Feather, BookOpen
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

// Luxury Gallery Artwork Card for Marquees
export function LuxuryGalleryCard({ artwork, verified = false }) {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (!openModal) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpenModal(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openModal])

  return (
    <>
      <div className="group relative bg-[#13131a] hover:bg-[#181824] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800/90 hover:border-[#dfb76c]/60 transition-all duration-400 shadow-[0_6px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(223,183,108,0.2)] flex flex-col justify-between h-[400px] sm:h-[425px]">
        {/* Top Gold Edge Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 z-10" />

        {/* Decorative Art-Nouveau Corner Accents */}
        <div className="absolute top-2 left-2 text-[#dfb76c]/30 text-[10px] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity">⌜</div>
        <div className="absolute top-2 right-2 text-[#dfb76c]/30 text-[10px] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity">⌝</div>

        {/* Image Frame */}
        <div 
          onClick={() => setOpenModal(true)}
          className="relative h-[235px] sm:h-[260px] w-full overflow-hidden bg-neutral-950 cursor-pointer"
        >
          <img 
            src={artwork.image} 
            alt={artwork.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 filter brightness-95 group-hover:brightness-105 select-none" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-transparent to-black/30 opacity-75 group-hover:opacity-40 transition-opacity" />

          {/* Price Badge */}
          {artwork.price && (
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 px-2.5 sm:px-3 py-1 rounded-xl bg-black/85 backdrop-blur-md border border-[#dfb76c]/40 text-[#f7d794] text-[11px] sm:text-xs font-serif font-medium tracking-wide shadow-lg">
              {artwork.price}
            </div>
          )}

          {/* Hover Zoom Prompt */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
            <span className="px-3.5 py-1.5 rounded-full bg-[#121217]/90 text-[#dfb76c] border border-[#dfb76c]/50 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
              <Eye size={13} />
              <span>Inspect Masterpiece</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#dfb76c]">
                {artwork.artist}
              </span>
              {verified && (
                <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded">
                  Studio Original
                </span>
              )}
            </div>

            <h4 
              onClick={() => setOpenModal(true)}
              className="font-serif text-base sm:text-lg font-normal text-white group-hover:text-[#f7d794] transition-colors line-clamp-1 cursor-pointer"
            >
              {artwork.title}
            </h4>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 mt-2">
            <span className="text-[10px] text-neutral-400 font-light">Acrylic on Canvas</span>
            <button
              onClick={() => setOpenModal(true)}
              className="text-xs text-[#dfb76c] hover:text-[#f7d794] font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Details</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* High-Resolution Artwork Quick View Modal */}
      {openModal && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModal(false)}
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#14141e] border border-[#dfb76c]/50 rounded-3xl p-5 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative overflow-hidden"
            >
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#dfb76c]/15 text-[#f7d794] text-[10px] font-mono uppercase font-semibold">
                  Curated Masterwork
                </span>
                <span className="text-xs text-neutral-400 font-mono">By {artwork.artist}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-4">
                {artwork.title}
              </h3>

              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-black relative border border-neutral-800 mb-5 flex items-center justify-center">
                <img src={artwork.image} alt={artwork.title} className="w-full h-full object-contain" />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                <div>
                  <span className="text-xs text-neutral-400 block font-mono">Acquisition Valuation</span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#dfb76c]">{artwork.price || 'Inquire with Curator'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setOpenModal(false)
                      window.location.href = `/product`
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] text-neutral-950 text-xs uppercase tracking-wider font-bold shadow-md hover:from-[#f7d794] transition-all"
                  >
                    View Artwork
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

// ── 1. EXPORTED COLLECTOR REVIEWS SECTION ("Reviews That Stole Our Hearts" with Earth Globe & Radiating Waves) ──
export function CollectorReviewsSection() {
  return <EarthGlobeReviewsSection />
}

// ── 2. EXPORTED ARTIST MARQUEES SECTION (Oeuvre & Other Masters Streams) ──
export function ArtistMarqueesSection() {
  const shouldReduceMotion = useReducedMotion()
  const marqueeRef1 = useRef(null)
  const marqueeRef2 = useRef(null)

  // Authentic Pradip Sarkar curated artworks
  const pradipArtworks = [
    { id: 1, title: 'Divine Tunes-11', artist: 'Pradip Sarkar', image: flowersImage, price: '₹1,18,300' },
    { id: 2, title: 'Divine Tunes-09', artist: 'Pradip Sarkar', image: screenshotImage, price: '₹98,000' },
    { id: 3, title: 'Divine Tunes-05', artist: 'Pradip Sarkar', image: image9, price: '₹75,000' },
    { id: 4, title: 'Divine Tunes-02', artist: 'Pradip Sarkar', image: image12, price: '₹62,500' },
    { id: 5, title: 'Divine Tunes-07', artist: 'Pradip Sarkar', image: diff3, price: '₹84,000' },
  ]

  // Authentic Other Masters curated artworks
  const otherMastersArtworks = [
    { id: 'o1', title: 'Tune Of Bengal — 4', artist: 'Sekhar Roy', image: image2, price: '₹45,000' },
    { id: 'o2', title: 'Ocean Of Dreams', artist: 'Uttam Bhattacharya', image: diff1, price: '₹38,000' },
    { id: 'o3', title: 'Eternal Grace', artist: 'Priyanka Bardhan', image: image3, price: '₹55,000' },
    { id: 'o4', title: 'Inner Peace 6', artist: 'Monalisa Sarkar Mitra', image: diff5, price: '₹29,500' },
    { id: 'o5', title: 'Sky Dream 1', artist: 'L. Joss', image: sky1, price: '₹65,000' },
    { id: 'o6', title: 'April Ensemble', artist: 'Mila Weis', image: image5, price: '₹72,000' },
  ]

  return (
    <motion.div 
      data-showcase-section
      data-showcase-title="Related Masterworks & Streams"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full space-y-12 sm:space-y-16"
    >
      {/* RELATED ARTWORKS MARQUEE: PRADIP SARKAR */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold">
                Curated Selection
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight">
              More Artworks by Pradip Sarkar
            </h3>
          </div>
        </div>

        {/* Continuous Marquee Stream */}
        <div ref={marqueeRef1} className="marquee-container bg-[#121217]/80 rounded-2xl sm:rounded-3xl py-4 sm:py-6 border border-neutral-800/80 backdrop-blur-md shadow-xl">
          <div className="marquee-track">
            {pradipArtworks.map((p) => (
              <div key={`original-${p.id}`} className="marquee-item">
                <LuxuryGalleryCard artwork={p} verified={true} />
              </div>
            ))}
            {pradipArtworks.map((p) => (
              <div key={`duplicate-${p.id}`} className="marquee-item">
                <LuxuryGalleryCard artwork={p} verified={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED ARTWORKS MARQUEE: OTHER MASTERS */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold">
                Gallery Recommendations
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight">
              Featured Artworks from Other Masters
            </h3>
          </div>
        </div>

        {/* Continuous Marquee Stream */}
        <div ref={marqueeRef2} className="marquee-container bg-[#121217]/80 rounded-2xl sm:rounded-3xl py-4 sm:py-6 border border-neutral-800/80 backdrop-blur-md shadow-xl">
          <div className="marquee-track">
            {otherMastersArtworks.map((p) => (
              <div key={`original-${p.id}`} className="marquee-item">
                <LuxuryGalleryCard artwork={p} />
              </div>
            ))}
            {otherMastersArtworks.map((p) => (
              <div key={`duplicate-${p.id}`} className="marquee-item">
                <LuxuryGalleryCard artwork={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
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
