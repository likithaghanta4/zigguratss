import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CTAButtons from './CTAButtons'

export default function ProductCard({ title, artist, image, price, href = '#', verified = false, variant = 'tall', hidden = false }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
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
        className="relative glass-card rounded-lg overflow-hidden shadow-sm product-card"
        whileHover={!hidden ? { y: -6 } : {}}
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
  <button onClick={() => setOpen(true)} className={`block w-full ${sizeClasses} overflow-hidden relative p-2 sm:p-4 md:p-6 bg-transparent`}> 
          <div className="product-image-frame w-full h-full rounded-md relative flex items-center justify-center" style={{ border: '4px solid #000000' }}>
            <img loading="lazy" src={image} alt={title} className="w-full h-full object-cover product-image" />
            <div className="image-veil" />
          </div>

          {price && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 product-price-badge">{price}</div>
          )}
        </button>

        <div className="p-2 sm:p-3 md:p-4">
          <h4 className="font-serif text-sm text-slate-900 line-clamp-2">{title}</h4>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs muted-text">{artist}</p>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button onClick={() => window.location.href = '/'} className="text-xs px-3 py-2 bg-[#065F46] text-white rounded-md">Quick View</button>
            <button className="text-xs px-3 py-2 border border-white/10 rounded-md text-white/90 bg-white/6">Add</button>
          </div>
        </div>
      </motion.article>

      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="quickview-modal relative max-w-6xl w-full bg-white rounded-lg" initial={{ scale: 0.98 }} animate={{ scale: 1 }} exit={{ scale: 0.98 }}>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 z-50 p-2 rounded bg-white/90 border border-slate-200"></button>

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
    </>
  )
}

// body-lock handled inline via useEffect above
