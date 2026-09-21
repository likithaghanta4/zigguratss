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

const statementItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export default function ArtworkStatement({ title = 'Lady and Butterflies', children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mt-8 pt-6 border-t border-slate-200/80">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h4 className="font-serif text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
          {title}
        </h4>
        <button 
          onClick={() => setOpen((s) => !s)} 
          className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-medium text-slate-500 hover:text-[#c9a96e] transition-colors duration-200 cursor-pointer group select-none py-1 px-2 rounded-md hover:bg-slate-50"
          aria-expanded={open}
        >
          <span>{open ? 'Collapse' : 'Read Full Statement'}</span>
          <ChevronDown 
            size={14} 
            className={`transition-transform duration-300 text-slate-400 group-hover:text-[#c9a96e] ${open ? 'rotate-180' : ''}`} 
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
              className="text-slate-600 leading-relaxed font-light text-[15px] space-y-4 pt-1"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
