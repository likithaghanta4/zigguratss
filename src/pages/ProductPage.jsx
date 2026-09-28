import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import ProductDetail from '../components/ProductDetail'
import TrustBar from '../components/TrustBar'
import CosmosGalleryBackground from '../components/CosmosGalleryBackground'
import '../components/ArtistSaga.css'

export default function ProductPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="min-h-screen w-full bg-[#0a0a0d] text-neutral-100 selection:bg-[#dfb76c]/30 selection:text-[#f3e3ba] relative overflow-x-hidden">
      {/* Editorial Top Golden Reading Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#c9a96e] via-[#f7d794] to-[#c9a96e] origin-left z-50 shadow-[0_1px_12px_rgba(223,183,108,0.5)]"
        style={{ scaleX }}
      />

      {/* ========================================================= */}
      {/* INSTINCTOR-INSPIRED DYNAMIC 3D COSMOS & NEBULA CANVAS */}
      {/* ========================================================= */}
      <CosmosGalleryBackground />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-6 pb-28 sm:pt-10 sm:pb-36">
        <ProductDetail />
        
        {/* Editorial Trust & Collector Confidence Bar */}
        <div className="mt-20 pt-10 border-t border-neutral-800/80">
          <div className="product-page-trustbar rounded-3xl p-8 sm:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <TrustBar />
          </div>
        </div>
      </div>
    </div>
  )
}
