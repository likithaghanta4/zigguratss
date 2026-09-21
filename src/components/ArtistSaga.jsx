import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import screenshotImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 14-57-58.png'
import flowersImage from '../assets/ProductPage-images/Screenshot from 2026-05-08 15-14-55.png'
import './ArtistSaga.css'

const items = [
  { title: 'Geometric Harmony', body: 'Compositions that reconcile order with organic texture.' },
  { title: 'Vedic Meditation', body: 'A contemplative practice informing rhythm and form.' },
  { title: 'Materiality', body: 'Acrylic layers reveal brushwork and tactile presence.' },
]

// Editorial luxury art-gallery animation variants
const sagaContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const sagaItemFadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const relatedSectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

// Staggered entrance variants for narrative theme cards
const themeCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.10 + i * 0.10,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  })
}

export default function ArtistSaga() {
  const marqueeRef1 = useRef(null)
  const marqueeRef2 = useRef(null)
  const scrollTimeoutRef1 = useRef(null)
  const scrollTimeoutRef2 = useRef(null)

  const handleMarqueeScroll = (containerRef, timeoutRef) => {
    if (!containerRef.current) return
    const track = containerRef.current.querySelector('.marquee-track')
    if (!track) return

    track.classList.add('paused-scroll')
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      track.classList.remove('paused-scroll')
    }, 1500)
  }

  React.useEffect(() => {
    const container1 = marqueeRef1.current
    const container2 = marqueeRef2.current

    if (container1) {
      container1.addEventListener('scroll', () => handleMarqueeScroll(marqueeRef1, scrollTimeoutRef1), { passive: true })
      container1.addEventListener('wheel', () => handleMarqueeScroll(marqueeRef1, scrollTimeoutRef1), { passive: true })
    }

    if (container2) {
      container2.addEventListener('scroll', () => handleMarqueeScroll(marqueeRef2, scrollTimeoutRef2), { passive: true })
      container2.addEventListener('wheel', () => handleMarqueeScroll(marqueeRef2, scrollTimeoutRef2), { passive: true })
    }

    return () => {
      if (container1) {
        container1.removeEventListener('scroll', () => handleMarqueeScroll(marqueeRef1, scrollTimeoutRef1))
        container1.removeEventListener('wheel', () => handleMarqueeScroll(marqueeRef1, scrollTimeoutRef1))
      }
      if (container2) {
        container2.removeEventListener('scroll', () => handleMarqueeScroll(marqueeRef2, scrollTimeoutRef2))
        container2.removeEventListener('wheel', () => handleMarqueeScroll(marqueeRef2, scrollTimeoutRef2))
      }
      if (scrollTimeoutRef1.current) clearTimeout(scrollTimeoutRef1.current)
      if (scrollTimeoutRef2.current) clearTimeout(scrollTimeoutRef2.current)
    }
  }, [])

  return (
    <motion.section 
      variants={sagaContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      data-artist-section 
      className="mt-6 bg-gradient-to-b from-slate-50/40 via-white to-[#fcfaf7]/50 p-5 sm:p-7 md:p-9 rounded-2xl border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)]"
    >
      <div className="grid grid-cols-1 gap-6 md:gap-8 items-start">
        {/* Content Section */}
        <div className="space-y-6">
          {/* Section Header */}
          <motion.div variants={sagaItemFadeUp}>
            <div className="flex items-center gap-3.5 mb-2">
              <motion.span 
                className="h-[2px] bg-gradient-to-r from-[#c9a96e] to-[#d4af7a] rounded-full inline-block"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 40, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 tracking-tight">
                Artist Saga
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-light pl-0.5">
              A short overview of the artist's themes and practice
            </p>
          </motion.div>

          {/* Narrative Themes Grid with Staggered Entrance and Hover Accent */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
            {items.map((it, index) => (
              <motion.div
                key={it.title}
                custom={index}
                variants={themeCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
                className="group relative p-5 sm:p-6 rounded-xl border border-slate-200/80 bg-white hover:bg-[#fcfaf5] hover:border-[#c9a96e]/40 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(201,169,110,0.12)] transition-all duration-350 ease-out overflow-hidden cursor-default"
              >
                {/* Subtle gold accent line that smoothly grows on hover */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#c9a96e] via-[#d4af7a] to-[#c9a96e] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />

                <div className="relative">
                  <div className="font-serif text-base sm:text-lg font-medium text-slate-900 group-hover:text-black transition-colors mb-1.5 tracking-tight">
                    {it.title}
                  </div>
                  <div className="text-slate-600 font-light text-xs sm:text-sm leading-relaxed">
                    {it.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Shipping & Returns Section */}
      <motion.div 
        variants={sagaItemFadeUp}
        className="mt-10 pt-8 border-t border-slate-200/80 max-w-4xl"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="w-1.5 h-5 bg-gradient-to-b from-[#c9a96e] to-[#b8935f] rounded-full inline-block" />
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
            Shipping & Returns
          </h3>
        </div>

        <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="text-xs sm:text-sm text-slate-700 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 p-3 bg-slate-50/70 rounded-lg border border-slate-100">
              <span className="text-[#a88242] font-semibold min-w-[110px] text-xs uppercase tracking-wider">Delivery Time:</span>
              <span className="text-slate-600 font-light">It takes <strong className="text-slate-900 font-medium">5–7 working days</strong> for domestic shipments, <strong className="text-slate-900 font-medium">10–20 working days</strong> for international shipments depending upon the country.</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 p-3 bg-slate-50/70 rounded-lg border border-slate-100">
              <span className="text-[#a88242] font-semibold min-w-[110px] text-xs uppercase tracking-wider">Delivery Cost:</span>
              <span className="text-slate-600 font-light">Only <strong className="text-slate-900 font-medium">Shipping fee is included</strong> in the price of the Artwork. Custom Duties, Octroi and Taxes will be <strong className="text-slate-900 font-medium">borne by the Customer</strong>.</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 p-3 bg-slate-50/70 rounded-lg border border-slate-100">
              <span className="text-[#a88242] font-semibold min-w-[110px] text-xs uppercase tracking-wider">Returns:</span>
              <span className="text-slate-600 font-light">Return will be accepted within <strong className="text-slate-900 font-medium">24 hours</strong> of receipt of artwork, only if artwork is found <strong className="text-slate-900 font-medium">damaged</strong> (except order made on commission).</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Other Artworks Section - Infinite Marquee Slider */}
      <motion.div 
        variants={relatedSectionVariants} 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-10 max-w-full"
      >
        <div className="flex items-center gap-3 mb-4 px-1">
          <motion.span 
            className="h-[2px] bg-gradient-to-r from-[#c9a96e] to-[#d4af7a] rounded-full inline-block flex-shrink-0"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 40, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-slate-800">
            OTHER ARTWORKS FROM PRADIP SARKAR
          </h4>
        </div>
        
        {/* Marquee Container with edge fade mask */}
        <div ref={marqueeRef1} className="marquee-container bg-slate-50/60 rounded-xl py-3 border border-slate-200/60">
          <div 
            className="marquee-track" 
            onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused' }} 
            onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running' }}
          >
            {/* Original items */}
            {[
              { id: 1, title: 'Divine Tunes-11', artist: 'Pradip Sarkar', image: flowersImage, price: '₹1,18,300' },
              { id: 2, title: 'Divine Tunes-09', artist: 'Pradip Sarkar', image: screenshotImage, price: '₹98,000' },
              { id: 3, title: 'Divine Tunes-05', artist: 'Pradip Sarkar', image: 'https://images.unsplash.com/photo-1551913902-c92207136625?q=80&w=1200&auto=format', price: '₹75,000' },
              { id: 4, title: 'Divine Tunes-02', artist: 'Pradip Sarkar', image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?q=80&w=1200&auto=format', price: '₹62,500' },
            ].map((p) => (
              <div key={`original-${p.id}`} className="marquee-item">
                <ProductCard title={p.title} artist={p.artist} image={p.image} price={p.price} href="#" verified={true} />
              </div>
            ))}
            
            {/* Duplicate items for seamless loop */}
            {[
              { id: 1, title: 'Divine Tunes-11', artist: 'Pradip Sarkar', image: flowersImage, price: '₹1,18,300' },
              { id: 2, title: 'Divine Tunes-09', artist: 'Pradip Sarkar', image: screenshotImage, price: '₹98,000' },
              { id: 3, title: 'Divine Tunes-05', artist: 'Pradip Sarkar', image: 'https://images.unsplash.com/photo-1551913902-c92207136625?q=80&w=1200&auto=format', price: '₹75,000' },
              { id: 4, title: 'Divine Tunes-02', artist: 'Pradip Sarkar', image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?q=80&w=1200&auto=format', price: '₹62,500' },
            ].map((p) => (
              <div key={`duplicate-${p.id}`} className="marquee-item">
                <ProductCard title={p.title} artist={p.artist} image={p.image} price={p.price} href="#" verified={true} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Other Artists Section - Infinite Marquee Slider */}
      <motion.div 
        variants={relatedSectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-10 max-w-full"
      >
        <div className="flex items-center gap-3 mb-4 px-1">
          <motion.span 
            className="h-[2px] bg-gradient-to-r from-[#c9a96e] to-[#d4af7a] rounded-full inline-block flex-shrink-0"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 40, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-slate-800">
            ARTWORKS FROM OTHER ARTIST'S
          </h4>
        </div>
        
        {/* Marquee Container with edge fade mask */}
        <div ref={marqueeRef2} className="marquee-container bg-slate-50/60 rounded-xl py-3 border border-slate-200/60">
          <div 
            className="marquee-track" 
            onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused' }} 
            onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running' }}
          >
            {/* Original items */}
            {[
              { id: 'o1', title: 'Tune Of Bengal — 4', artist: 'Sekhar Roy', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200&auto=format', price: '₹45,000' },
              { id: 'o2', title: 'Ocean Of Dreams', artist: 'Uttam Bhattacharya', image: 'https://images.unsplash.com/photo-1551913902-c92207136625?q=80&w=1200&auto=format', price: '₹38,000' },
              { id: 'o3', title: 'Eternal Grace', artist: 'Priyanka Bardhan', image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?q=80&w=1200&auto=format', price: '₹55,000' },
              { id: 'o4', title: 'Inner Peace 6', artist: 'Monalisa Sarkar Mitra', image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200&auto=format', price: '₹29,500' },
            ].map((p) => (
              <div key={`original-${p.id}`} className="marquee-item">
                <ProductCard title={p.title} artist={p.artist} image={p.image} price={p.price} href="#" />
              </div>
            ))}
            
            {/* Duplicate items for seamless loop */}
            {[
              { id: 'o1', title: 'Tune Of Bengal — 4', artist: 'Sekhar Roy', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200&auto=format', price: '₹45,000' },
              { id: 'o2', title: 'Ocean Of Dreams', artist: 'Uttam Bhattacharya', image: 'https://images.unsplash.com/photo-1551913902-c92207136625?q=80&w=1200&auto=format', price: '₹38,000' },
              { id: 'o3', title: 'Eternal Grace', artist: 'Priyanka Bardhan', image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?q=80&w=1200&auto=format', price: '₹55,000' },
              { id: 'o4', title: 'Inner Peace 6', artist: 'Monalisa Sarkar Mitra', image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200&auto=format', price: '₹29,500' },
            ].map((p) => (
              <div key={`duplicate-${p.id}`} className="marquee-item">
                <ProductCard title={p.title} artist={p.artist} image={p.image} price={p.price} href="#" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
