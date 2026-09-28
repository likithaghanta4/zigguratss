import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, Award, CheckCircle2, Sparkles } from 'lucide-react'
import defaultPradipImage from '../assets/User-images/Pradip Sarkar.jpeg'

export default function ArtistCardMini({ 
  name = 'Pradip Sarkar', 
  image = defaultPradipImage, 
  location = 'Mumbai, India' 
}) {
  const shouldReduceMotion = useReducedMotion()
  const params = new URLSearchParams({ name, location })
  
  return (
    <motion.div 
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.3 } }}
      onClick={() => { window.location.href = `/artist?${params.toString()}` }}
      className="group relative bg-[#121217]/90 hover:bg-[#16161f] p-8 sm:p-10 rounded-3xl border border-neutral-800 hover:border-[#dfb76c]/60 shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(223,183,108,0.18)] backdrop-blur-xl transition-all duration-400 w-full max-w-4xl cursor-pointer overflow-hidden"
    >
      {/* Top subtle golden light accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-400" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-7 sm:gap-10">
        {/* Artist Image Frame */}
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-neutral-700 group-hover:border-[#dfb76c] shadow-xl bg-neutral-900 transition-all duration-400">
            <img 
              src={image || defaultPradipImage} 
              alt={name} 
              className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-[#c9a96e] to-[#f7d794] text-neutral-950 p-1.5 rounded-full shadow-md border-2 border-[#121217]">
            <Sparkles size={13} className="text-neutral-950" />
          </div>
        </div>
        
        {/* Artist Details */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-[0.22em] text-[#dfb76c] font-semibold mb-1.5">
            <span>Featured Artist Profile</span>
          </div>

          <h4 className="font-serif text-3xl sm:text-4xl font-normal text-white group-hover:text-[#f7d794] tracking-tight mb-2.5 flex items-center justify-center sm:justify-start gap-2">
            <span>{name}</span>
            <CheckCircle2 size={20} className="text-[#dfb76c]" />
          </h4>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-400 mb-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <MapPin size={14} className="text-[#dfb76c]" />
              {location}
            </span>
            <span className="text-neutral-600">•</span>
            <span>Diploma in Fine Art, British Institute Mumbai</span>
          </div>
          
          <div className="inline-flex items-center gap-2 py-1.5 px-3.5 bg-neutral-900/90 group-hover:bg-[#dfb76c]/15 rounded-full border border-neutral-700 group-hover:border-[#dfb76c]/40 text-xs text-neutral-300 font-medium mb-4 transition-colors">
            <Award size={14} className="text-[#dfb76c]" />
            <span>70+ Significant International & National Exhibitions</span>
          </div>
          
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
            Eminent Indian contemporary artist renowned for geometric abstraction, rhythmic colour harmonies, and spiritual symbolism representing music and nature.
          </p>
          
          {/* Action CTA Button */}
          <motion.button 
            type="button"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            onClick={(e) => { 
              e.stopPropagation()
              window.location.href = `/artist?${params.toString()}` 
            }} 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#dfb76c] to-[#c9a96e] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 rounded-xl text-xs uppercase tracking-[0.16em] font-bold shadow-md transition-all duration-300 cursor-pointer"
          >
            <span>Explore Complete Artist Profile</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
