import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import akhImage from '../assets/ProductPage-images/akh.webp'
import sssImage from '../assets/ProductPage-images/sss.png'

const ARTWORKS = [
  {
    id: 1,
    title: "Gallery Exhibition",
    image: akhImage,
    artist: "Featured Artwork"
  },
  {
    id: 2,
    title: "Abstract Harmony",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop&q=80",
    artist: "Contemporary Collection"
  },
  {
    id: 3,
    title: "Marble Sculpture",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=600&fit=crop&q=80",
    artist: "Classical Sculpture"
  },
  {
    id: 4,
    title: "Colorful Canvas",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop&q=80",
    artist: "Modern Art"
  },
  {
    id: 5,
    title: "Featured Collection",
    image: sssImage,
    artist: "Special Artwork"
  },
  {
    id: 6,
    title: "Abstract Expression",
    image: "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=800&h=600&fit=crop&q=80",
    artist: "Abstract Collection"
  },
  {
    id: 7,
    title: "Modern Sculpture",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=600&fit=crop&q=80",
    artist: "Modern Sculpture"
  },
  {
    id: 8,
    title: "Vibrant Art",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=600&fit=crop&q=80",
    artist: "Contemporary Art"
  },
  {
    id: 9,
    title: "Ancient Sculpture",
    image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&h=600&fit=crop&q=80",
    artist: "Classical Art"
  }
]

export default function ArtworkSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % ARTWORKS.length)
    }, 3500) // Auto-slide every 3.5 seconds

    return () => clearInterval(timer)
  }, [])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      const next = prev + newDirection
      if (next < 0) return ARTWORKS.length - 1
      if (next >= ARTWORKS.length) return 0
      return next
    })
  }

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[350px] md:min-h-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
      {/* Slider Container - Takes full height */}
      <div className="relative flex-1 min-h-[250px] sm:min-h-[300px] md:min-h-0 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {/* Image */}
            <div className="relative w-full h-full group">
              <img
                src={ARTWORKS[currentIndex].image}
                alt={ARTWORKS[currentIndex].title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <motion.h4 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold mb-1 drop-shadow-lg"
                >
                  {ARTWORKS[currentIndex].title}
                </motion.h4>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-slate-200 drop-shadow-md"
                >
                  {ARTWORKS[currentIndex].artist}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 py-2.5 bg-gradient-to-r from-slate-50 to-slate-100 flex-shrink-0">
        {ARTWORKS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-6 h-1.5 bg-gradient-to-r from-[#c9a96e] to-[#d4af7a] shadow-md'
                : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
