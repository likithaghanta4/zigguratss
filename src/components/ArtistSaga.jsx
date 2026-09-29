import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, CheckCircle2, Shield, Eye, ArrowUpRight, Palette, Layers } from 'lucide-react'

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

const pillars = [
  { 
    number: '01', 
    title: 'Geometric Harmony', 
    subtitle: 'Mathematical Structure & Soul',
    body: 'Compositions that reconcile mathematical structure with organic canvas textures, creating harmonious chromatic scales and luminous balance.',
    image: image9,
    tag: 'Structured Abstraction'
  },
  { 
    number: '02', 
    title: 'Vedic Meditation', 
    subtitle: 'Rhythmic Spiritual Balance',
    body: 'A contemplative spiritual practice informing rhythm, inner stillness, and meditative balance across each deliberate layered brushstroke.',
    image: image2,
    tag: 'Spiritual Sonata'
  },
  { 
    number: '03', 
    title: 'Tactile Materiality', 
    subtitle: 'Layered Impasto & Palette Work',
    body: 'Rich impasto layers and delicate palette knife work reveal authentic texture, physical depth, and the luminous character of the medium.',
    image: image12,
    tag: 'Master Impasto'
  },
]

// Luxury Gallery Artwork Card for Marquees
function LuxuryGalleryCard({ artwork, verified = false }) {
  const [openModal, setOpenModal] = useState(false)
  const shouldReduceMotion = useReducedMotion()

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
      <div className="group relative bg-[#13131a] hover:bg-[#181822] rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#dfb76c]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_32px_rgba(223,183,108,0.18)] flex flex-col justify-between h-[390px] sm:h-[410px]">
        {/* Top Gold Edge Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-10" />

        {/* Image Frame */}
        <div 
          onClick={() => setOpenModal(true)}
          className="relative h-[230px] sm:h-[250px] w-full overflow-hidden bg-neutral-950 cursor-pointer"
        >
          <img 
            src={artwork.image} 
            alt={artwork.title} 
            className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-transparent to-black/25 opacity-70 group-hover:opacity-40 transition-opacity" />

          {/* Price Badge */}
          {artwork.price && (
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-black/80 backdrop-blur-md border border-[#dfb76c]/40 text-[#f7d794] text-[11px] sm:text-xs font-serif font-semibold tracking-wide shadow-md">
              {artwork.price}
            </div>
          )}

          {/* Verified Ribbon */}
          {verified && (
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 px-2 sm:px-2.5 py-0.5 rounded-full bg-[#dfb76c]/90 text-neutral-950 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <CheckCircle2 size={10} />
              <span>Certified</span>
            </div>
          )}

          {/* Center Hover Eye Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
            <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/80 border border-[#dfb76c]/60 text-[#dfb76c] text-[11px] sm:text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-xl">
              <Eye size={12} />
              <span>Inspect</span>
            </div>
          </div>
        </div>

        {/* Card Details & Action Footer */}
        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-[#13131a] border-t border-neutral-800/80">
          <div>
            <h4 
              onClick={() => setOpenModal(true)}
              className="font-serif text-sm sm:text-base font-normal text-white group-hover:text-[#f7d794] transition-colors truncate cursor-pointer tracking-tight"
            >
              {artwork.title}
            </h4>
            <div className="flex items-center justify-between mt-0.5 sm:mt-1">
              <p className="text-[11px] sm:text-xs text-neutral-400 font-light truncate">
                by <span className="text-[#dfb76c] font-medium">{artwork.artist}</span>
              </p>
              <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Original</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-2.5 sm:mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={() => setOpenModal(true)}
              className="py-1.5 sm:py-2 px-2 sm:px-3 bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-1 cursor-pointer"
            >
              <Eye size={11} />
              <span>Quick View</span>
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="py-1.5 sm:py-2 px-2 sm:px-3 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-200 hover:text-white rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Inspection Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
              onClick={() => setOpenModal(false)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-4xl w-full bg-[#121217] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-50 p-2 sm:p-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700 shadow-xl transition-all cursor-pointer flex items-center justify-center"
                >
                  <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Image Presentation */}
                  <div className="md:col-span-7 bg-neutral-950 p-4 sm:p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-800">
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl max-h-[380px] sm:max-h-[480px]">
                      <img 
                        src={artwork.image} 
                        alt={artwork.title} 
                        className="w-full h-full object-contain select-none"
                      />
                    </div>
                  </div>

                  {/* Curatorial Ledger */}
                  <div className="md:col-span-5 p-5 sm:p-8 flex flex-col justify-between space-y-5 sm:space-y-6">
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#dfb76c] font-semibold block mb-1">
                        Zigguratss Master Collection
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight">
                        {artwork.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-light mt-1">
                        Masterwork by <strong className="text-white font-medium">{artwork.artist}</strong>
                      </p>

                      <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-neutral-800">
                        <span className="font-serif text-2xl sm:text-3xl font-normal text-white">
                          {artwork.price}
                        </span>
                        <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-1">
                          Includes fine-art framing options & insured climate-controlled transit
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-5 space-y-2 text-xs text-neutral-300 font-light bg-neutral-900/70 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-neutral-800">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-[#dfb76c] flex-shrink-0" />
                          <span>Signed Certificate of Authenticity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield size={13} className="text-[#dfb76c] flex-shrink-0" />
                          <span>14-Day Global Collector Guarantee</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-2.5">
                      <button
                        onClick={() => {
                          setOpenModal(false)
                          window.location.href = '#'
                        }}
                        className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] text-neutral-950 rounded-xl text-xs uppercase tracking-[0.18em] font-bold shadow-lg cursor-pointer"
                      >
                        Inquire About Artwork
                      </button>
                      <button
                        onClick={() => setOpenModal(false)}
                        className="w-full py-2 text-xs text-neutral-400 hover:text-white uppercase tracking-wider text-center cursor-pointer transition-colors"
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default function ArtistSaga() {
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
    <div className="w-full space-y-12 sm:space-y-16 lg:space-y-24">
      {/* ========================================================= */}
      {/* 1. THREE PILLARS OF EXPRESSION (Visual Art Cards) */}
      {/* ========================================================= */}
      <section className="w-full">
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block mb-1.5 sm:mb-2">
            Artistic Philosophy & Saga
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[40px] font-normal text-white tracking-tight">
            The Three Pillars of Expression
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1.5 sm:mt-2">
            Exploring the recurring motifs, chromatic rhythms, and meditative vision in Pradip Sarkar's oeuvre
          </p>
        </motion.div>

        {/* 3 Animated Visual Art Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {pillars.map((it, index) => (
            <motion.div
              key={it.title}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: shouldReduceMotion ? 0 : index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl sm:rounded-3xl bg-[#121217]/90 hover:bg-[#161620] border border-neutral-800 hover:border-[#dfb76c]/50 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(223,183,108,0.18)] backdrop-blur-xl transition-all duration-400 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Golden Light Accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 z-10" />

              {/* Artwork Visual Header Frame */}
              <div className="relative h-44 xs:h-48 sm:h-52 w-full overflow-hidden bg-neutral-900 border-b border-neutral-800">
                <img 
                  src={it.image} 
                  alt={it.title} 
                  className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-95 group-hover:brightness-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/30" />
                
                {/* Floating Tag */}
                <div className="absolute top-3 left-3 z-10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/70 backdrop-blur-md border border-neutral-700/80 text-[#dfb76c] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
                  {it.tag}
                </div>

                {/* Number Badge */}
                <div className="absolute top-3 right-3 z-10 font-serif text-xl sm:text-2xl font-light text-white/80 group-hover:text-[#f7d794] transition-colors">
                  {it.number}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#dfb76c] font-medium block mb-1">
                    {it.subtitle}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-white mb-2 tracking-tight group-hover:text-[#f7d794] transition-colors">
                    {it.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {it.body}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span className="uppercase tracking-widest text-[9px] sm:text-[10px] flex items-center gap-1 text-neutral-400">
                    <Sparkles size={11} className="text-[#dfb76c]" /> Studio Practice
                  </span>
                  <span className="text-[#dfb76c] font-medium text-[10px] sm:text-[11px]">Zigguratss Certified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. RELATED ARTWORKS MARQUEE: PRADIP SARKAR */}
      {/* ========================================================= */}
      <section className="w-full pt-2 sm:pt-4">
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-between mb-4 sm:mb-6 px-1"
        >
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#dfb76c] font-semibold block mb-0.5 sm:mb-1">
              Curated Selection
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight">
              More Artworks by Pradip Sarkar
            </h3>
          </div>
        </motion.div>

        {/* Continuous Marquee Stream */}
        <div ref={marqueeRef1} className="marquee-container bg-[#121217]/70 rounded-2xl sm:rounded-3xl py-4 sm:py-6 border border-neutral-800/80 backdrop-blur-md">
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

      {/* ========================================================= */}
      {/* 3. RELATED ARTWORKS MARQUEE: OTHER MASTERS */}
      {/* ========================================================= */}
      <section className="w-full pt-2 sm:pt-4">
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-between mb-4 sm:mb-6 px-1"
        >
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#dfb76c] font-semibold block mb-0.5 sm:mb-1">
              Gallery Recommendations
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight">
              Featured Artworks from Other Masters
            </h3>
          </div>
        </motion.div>

        {/* Continuous Marquee Stream */}
        <div ref={marqueeRef2} className="marquee-container bg-[#121217]/70 rounded-2xl sm:rounded-3xl py-4 sm:py-6 border border-neutral-800/80 backdrop-blur-md">
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
    </div>
  )
}
