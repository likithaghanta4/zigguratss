import React, { useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import ProductDetail from '../components/ProductDetail'
import TrustBar from '../components/TrustBar'
import CosmosGalleryBackground from '../components/CosmosGalleryBackground'
import ArtworkEntranceHero from '../components/ArtworkEntranceHero'
import '../components/ArtistSaga.css'

export default function ProductPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div 
      className="product-page-root min-h-screen w-full bg-[#0a0a0d] text-neutral-100 selection:bg-[#dfb76c]/30 selection:text-[#f3e3ba] relative"
    >
      {/* Editorial Top Golden Reading Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#c9a96e] via-[#f7d794] to-[#c9a96e] origin-left z-50 shadow-[0_1px_12px_rgba(223,183,108,0.5)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Dynamic 3D Cosmos & Nebula Canvas */}
      <CosmosGalleryBackground />

      {/* Main Content Container */}
      <div 
        className="product-detail-container relative z-10 w-full max-w-[1720px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-16 xs:pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-28 lg:pb-36"
      >
        <ProductDetail />
        
        {/* Cinematic Masterpiece Reveal Section at the Bottom */}
        <section 
          id="masterpiece-reveal-section"
          data-showcase-section
          data-showcase-title="Cinematic Masterpiece Reveal"
          className="mt-14 sm:mt-20 pt-8 sm:pt-12 scroll-mt-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold block">
              Grand Finale Showcase
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight">
              Cinematic Masterpiece Reveal
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Experience the 3D spatial convergence of satellite archival layers unveiling the cornerstone canvas Divine Tunes-11.
            </p>
          </div>

          <ArtworkEntranceHero isInline={true} />
        </section>

        {/* Curved Reveal Divider */}
        <div className="curved-section-divider -my-4 opacity-50">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 Z" className="shape-fill" />
          </svg>
        </div>

        {/* Editorial Trust & Collector Confidence Bar */}
        <div 
          data-showcase-section
          data-showcase-title="Collector Confidence & Trust Guarantees"
          className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-neutral-800/80"
        >
          <div className="product-page-trustbar rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <TrustBar />
          </div>
        </div>
      </div>
    </div>
  )
}
