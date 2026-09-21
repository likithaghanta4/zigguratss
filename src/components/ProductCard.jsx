import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import CTAButtons from './CTAButtons'

export default function ProductCard({ title, artist, image, price, href = '#', verified = false, variant = 'tall', hidden = false }) {
  const [open, setOpen] = useState(false)

  // Scroll lock and Escape key listener
  useEffect(() => {
    if (!open) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  // variant: 'tall' or 'short' -> controls image frame height for masonry-like look
  const sizeClasses = 'h-56 sm:h-64 md:h-80'

  const [selectedVariant, setSelectedVariant] = useState('simple')

  // Different contextual views for the artwork
  const contextualViews = [
    { id: 'simple', label: 'Simple', className: 'room-mockup-simple' },
    { id: 'bedroom', label: 'Bedroom', className: 'room-mockup-bedroom' },
    { id: 'teal', label: 'Teal Wall', className: 'room-mockup-teal' },
    { id: 'green', label: 'Green Wall', className: 'room-mockup-green' },
    { id: 'plants', label: 'With Plants', className: 'room-mockup-plants' },
    { id: 'minimal', label: 'Minimal', className: 'room-mockup-minimal' },
  ]
  // carousel for related/other images shown in the quickview aside
  const [carouselIndex, setCarouselIndex] = useState(0)
  const relatedImages = [image, image, image]

  // auto-advance carousel in quickview aside (start when quickview is open)
  useEffect(() => {
    if (!open) return
    const id = setInterval(() => {
      setCarouselIndex((s) => (s + 1) % relatedImages.length)
    }, 3000)
    return () => clearInterval(id)
  }, [open, relatedImages.length])

  return (
    <>
      <motion.article
        className="group relative bg-white rounded-xl overflow-hidden border border-slate-200/80 hover:border-[#c9a96e]/45 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(201,169,110,0.10)] transition-all duration-350 ease-out product-card"
        whileHover={!hidden ? { y: -3, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } } : {}}
        whileTap={!hidden ? { scale: 0.985 } : {}}
        animate={{ 
          opacity: hidden ? 0 : 1,
          y: hidden ? 20 : 0
        }}
        transition={{ 
          opacity: { duration: 0.4 },
          y: { type: 'spring', stiffness: 250, damping: 22 }
        }}
        style={{ 
          pointerEvents: hidden ? 'none' : 'auto',
          display: hidden ? 'none' : 'block'
        }}
      >
        {/* Card Gold Bottom Accent (Option A) */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#c9a96e] via-[#d4af7a] to-[#c9a96e] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-350 ease-out pointer-events-none z-10" />

        <div className={`block w-full ${sizeClasses} overflow-hidden relative p-2.5 sm:p-3.5 bg-slate-50/50 select-none`}> 
          <div className="product-image-frame w-full h-full rounded-lg relative flex items-center justify-center overflow-hidden border border-slate-200/70 bg-slate-100 shadow-2xs">
            <img 
              loading="lazy" 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transform group-hover:scale-[1.025] transition-transform duration-350 ease-out product-image cursor-pointer" 
              onClick={() => setOpen(true)}
            />
            <div className="image-veil" />
          </div>

          {price && (
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-slate-800 border border-slate-200/80 rounded-md font-serif text-xs font-semibold shadow-2xs group-hover:border-[#c9a96e]/40 transition-colors">
              {price}
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4">
          <h4 className="font-serif text-sm font-medium text-slate-900 group-hover:text-black transition-colors duration-250 line-clamp-1 tracking-tight">{title}</h4>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors duration-250 font-light">{artist}</p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button 
              onClick={() => setOpen(true)} 
              className="text-xs px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-md font-medium tracking-wide shadow-2xs hover:shadow-xs transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              Quick View
            </button>
            <button 
              onClick={() => window.location.href = '/'} 
              className="text-xs px-3 py-1.5 border border-slate-200 hover:border-[#c9a96e]/50 text-slate-700 hover:text-slate-900 rounded-md font-medium bg-white hover:bg-[#fcfaf5] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              View Details
            </button>
          </div>
        </div>
      </motion.article>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div 
              key="quickview-backdrop"
              className="fixed inset-0 z-[90000] flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-6" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            >
              <motion.div 
                className="quickview-modal relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto" 
                initial={{ scale: 0.97, opacity: 0, y: 10 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.97, opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Prominent High-Contrast Close Button */}
                <button 
                  onClick={() => setOpen(false)} 
                  className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-900 hover:bg-black text-white hover:text-[#c9a96e] border border-slate-700 shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer flex items-center justify-center group"
                  aria-label="Close Quick View"
                  title="Close Quick View (Esc)"
                >
                  <X size={18} className="transition-transform group-hover:rotate-90 duration-200" />
                </button>

            <div className="quickview-layout p-6">
              <div className="quickview-top grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  {/* Main preview showing artwork in different contextual settings */}
                  <div className={`${contextualViews.find(v => v.id === selectedVariant)?.className || 'room-mockup-simple'} rounded-lg overflow-hidden`}>
                    <img src={image} alt={title} />
                  </div>
                  
                  {/* Thumbnails showing different contextual views */}
                  <div className="mt-4 thumbnails thumbnail-container flex items-center gap-3 overflow-x-auto">
                    {contextualViews.map((view) => (
                      <button 
                        key={view.id} 
                        className={`thumb-btn contextual-thumb thumb-${view.id} rounded flex-shrink-0 transition-all ${
                          selectedVariant === view.id ? 'ring-2 ring-[#b88f3a]' : 'hover:opacity-80'
                        }`}
                        onClick={() => setSelectedVariant(view.id)}
                        title={view.label}
                      >
                        <img src={image} alt={`${view.label} view`} />
                      </button>
                    ))}
                  </div>
                </div>

                <aside className="lg:col-span-4 bg-white p-6 rounded-lg shadow-deep flex flex-col justify-between h-[560px]">
                  <h3 className="font-serif text-2xl font-bold text-slate-900">{title}</h3>
                  <div className="text-sm muted-text mt-1">by <strong>{artist}</strong></div>
                  {price && <div className="mt-4 text-2xl font-semibold text-slate-900">{price}</div>}

                  <div className="mt-6">
                    <CTAButtons />
                  </div>

                  <div className="mt-6 benefits text-sm muted-text space-y-2">
                    <div>14-Days Money Back Guarantee</div>
                    <div>100% Secured Payment</div>
                    <div>Certificate of Authenticity</div>
                    <div>Free shipping world wide</div>
                  </div>
                </aside>
              </div>

              <div className="quickview-details mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  <div className="glass-card p-6 rounded-lg">
                    <h4 className="font-bold text-xl mb-4">Artwork Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm muted-text">
                      <div>
                        <div>Category: Abstraction</div>
                        <div>Technique: Acrylic</div>
                        <div>Size (WxH): 91 x 91 cm</div>
                        <div>Selling Options: Original</div>
                      </div>
                      <div>
                        <div>Style: Geometric</div>
                        <div>Material: Acrylic paints on Canvas</div>
                        <div>Year of art work: 2023</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 glass-card p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">About The Artwork</h4>
                    <p className="muted-text mt-2">This painting depicts the world meets divine power in every human being. Replace with actual artwork description from your API.</p>
                  </div>

                  <div className="mt-6 glass-card p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">About The Artist</h4>
                    <div className="mt-3 flex gap-4">
                      <div className="w-28 h-28 overflow-hidden rounded-full border-4 border-white shadow-sm">
                        <img src={image} alt={artist} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xl">{artist}</h5>
                        <p className="muted-text">{artist} was born in... Replace with biography.</p>
                        <button onClick={() => { const params = new URLSearchParams({ name: artist, image, location: 'Mumbai, India' }); window.location.href = `/artist?${params.toString()}` }} className="mt-2 px-3 py-2 border rounded text-[#065F46]">View Profile</button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 glass-card p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Shipping & Returns</h4>
                    <p className="muted-text mt-2">Delivery time: 5-10 working days domestic, 10-20 international. Returns within 24 hours if damaged.</p>
                  </div>

                  {/* removed static thumbnails from main column - moved slider to the purchase aside */}
                </div>

                <aside className="lg:col-span-4 flex flex-col gap-6">
                  <div className="glass-card p-6 rounded-lg flex flex-col justify-between h-64 md:h-72">
                    <h4 className="font-bold text-lg mb-2">Purchase Info</h4>
                    <div className="muted-text mt-2">Price includes shipping and taxes. Contact us for framing options.</div>
                    <div className="mt-4">
                      <button className="w-full bg-[#065F46] text-white px-4 py-3 rounded">Buy Now</button>
                    </div>
                  </div>

                  {/* Auto-advancing slider placed under Buy Now to fill the empty side space */}
                  <div className="mt-0 glass-card p-4 rounded-lg flex-shrink-0 h-64 md:h-72">
                    <h4 className="font-semibold text-sm mb-3">Other artworks from {artist}</h4>
                    <div className="relative overflow-hidden rounded h-56 md:h-64">
                      <div
                        className="flex transition-transform duration-700 will-change-transform h-full"
                        style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                      >
                        {relatedImages.map((src, idx) => (
                          <img key={idx} src={src} alt={`related-${idx}`} className="w-full flex-shrink-0 h-56 md:h-64 object-cover rounded" />
                        ))}
                      </div>

                      <div className="flex justify-center gap-2 mt-3">
                        {relatedImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCarouselIndex(idx)}
                            className={`w-2 h-2 rounded-full ${carouselIndex === idx ? 'bg-slate-800' : 'bg-slate-300'}`}
                            aria-label={`go-to-${idx}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
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

// body-lock handled inline via useEffect above
