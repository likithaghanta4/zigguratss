import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Award } from 'lucide-react'

// Editorial luxury art-gallery animation variants
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export default function ArtistCardMini({ name = 'Pradip Sarkar', image = '', location = 'Mumbai, India' }) {
  const params = new URLSearchParams({ name, image, location })
  
  return (
    <motion.div 
      variants={cardContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4, transition: { duration: 0.35, ease: "easeOut" } }}
      onClick={() => { window.location.href = `/artist?${params.toString()}` }}
      className="group relative bg-white hover:bg-[#fcfaf5] p-6 sm:p-8 rounded-2xl border border-slate-200/80 hover:border-[#c9a96e]/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.09)] transition-all duration-400 ease-out w-full max-w-3xl cursor-pointer overflow-hidden"
    >
      {/* Subtle gold top accent line that reveals on card hover */}
      <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#c9a96e]/60 to-transparent opacity-0 group-hover:opacity-100 scale-x-75 group-hover:scale-x-100 transition-all duration-500 ease-out rounded-full pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        {/* Artist Image Frame */}
        <motion.div 
          variants={itemFadeUp}
          className="relative flex-shrink-0"
        >
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border border-slate-200/90 group-hover:border-[#c9a96e]/50 shadow-sm group-hover:shadow-[0_6px_20px_rgba(201,169,110,0.20)] bg-slate-100 transition-all duration-400 ease-out">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover select-none transition-transform duration-400 ease-out group-hover:scale-[1.04]" 
            />
          </div>
        </motion.div>
        
        {/* Artist Info */}
        <div className="flex-1 min-w-0 text-center sm:text-left w-full">
          <motion.h4 
            variants={itemFadeUp}
            className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 group-hover:text-black tracking-tight mb-2 transition-all duration-300"
          >
            {name}
          </motion.h4>
          
          <motion.div 
            variants={itemFadeUp}
            className="flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm text-slate-500 group-hover:text-slate-700 font-light mb-3 transition-colors duration-300"
          >
            <MapPin size={14} className="text-[#c9a96e] group-hover:text-[#b8935f] transition-colors duration-300 flex-shrink-0" />
            <span>{location}</span>
          </motion.div>
          
          <motion.div
            variants={itemFadeUp}
            className="inline-flex items-center gap-2 py-1 px-3 bg-slate-100/80 group-hover:bg-[#fbf7ee] rounded-full border border-slate-200/80 group-hover:border-[#c9a96e]/40 text-xs text-slate-700 group-hover:text-slate-800 font-medium mb-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xs"
          >
            <Award size={13} className="text-[#c9a96e] flex-shrink-0" />
            <span>70+ International Exhibitions</span>
          </motion.div>
          
          <motion.p 
            variants={itemFadeUp}
            className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-700 font-light leading-relaxed mb-5 transition-colors duration-300"
          >
            Contemporary artist specializing in geometric abstraction
          </motion.p>
          
          {/* Action CTA Button */}
          <motion.div variants={itemFadeUp}>
            <button 
              type="button"
              onClick={(e) => { 
                e.stopPropagation()
                window.location.href = `/artist?${params.toString()}` 
              }} 
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-900 group-hover:bg-black text-white rounded-lg text-xs sm:text-[13px] font-medium tracking-wide shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <span>Explore Profile</span>
              <ArrowRight size={14} className="text-[#c9a96e] group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
