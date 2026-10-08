import React, { useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import ProductDetail from '../components/ProductDetail'
import TrustBar from '../components/TrustBar'
import CosmosGalleryBackground from '../components/CosmosGalleryBackground'
import ArtworkEntranceHero from '../components/ArtworkEntranceHero'
import '../components/ArtistSaga.css'

export default function ProductPage() {
  const [showEntrance, setShowEntrance] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="product-page-root min-h-screen w-full bg-[#0a0a0d] text-neutral-100 selection:bg-[#dfb76c]/30 selection:text-[#f3e3ba] relative overflow-x-hidden">
      {/* 3D Cinematic Entrance Intro Hero */}
      <AnimatePresence mode="wait">
        {showEntrance && (
          <ArtworkEntranceHero
            onComplete={() => setShowEntrance(false)}
            onSkip={() => setShowEntrance(false)}
          />
        )}
      </AnimatePresence>

      {/* Editorial Top Golden Reading Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#c9a96e] via-[#f7d794] to-[#c9a96e] origin-left z-50 shadow-[0_1px_12px_rgba(223,183,108,0.5)]"
        style={{ scaleX }}
      />

      {/* Dynamic 3D Cosmos & Nebula Canvas */}
      <CosmosGalleryBackground />

      {/* Main Content Container */}
      <div className="product-detail-container relative z-10 w-full max-w-[1440px] mx-auto px-2.5 xs:px-4 sm:px-6 lg:px-10 xl:px-12 pt-16 xs:pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-28 lg:pb-36">
        <ProductDetail onReplayEntrance={() => setShowEntrance(true)} />
        
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
