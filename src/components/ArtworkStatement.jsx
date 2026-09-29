import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// Variants for editorial statement content
const statementContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05
    }
  }
}

export default function ArtworkStatement({ title = 'Lady and Butterflies', children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-neutral-800/80">
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-4">
        <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-normal text-white tracking-tight">
          {title}
        </h4>
        <button 
          onClick={() => setOpen((s) => !s)} 
          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs tracking-wider uppercase font-semibold text-[#dfb76c] hover:text-[#f7d794] transition-colors duration-200 cursor-pointer group select-none py-1.5 px-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#dfb76c]/40 w-fit flex-shrink-0"
          aria-expanded={open}
        >
          <span>{open ? 'Collapse' : 'Read Full Statement'}</span>
          <ChevronDown 
            size={13} 
            className={`transition-transform duration-300 text-[#dfb76c] ${open ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="statement-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <motion.div 
              variants={statementContentVariants}
              initial="hidden"
              animate="visible"
              className="text-neutral-300 leading-relaxed font-light text-xs sm:text-sm md:text-[15px] space-y-4 pt-2"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
