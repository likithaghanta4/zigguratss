import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function ArtworkStatement({ title = 'Lady and Butterflies', children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  // If defaultOpen is true, don't render the toggle button and always show content
  const showToggle = !defaultOpen

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-slate-900">{title}</h4>
        {showToggle && (
          <button onClick={() => setOpen((s) => !s)} className="text-sm text-slate-600 underline">
            {open ? 'Hide' : 'Read Full'}
          </button>
        )}
      </div>

      <motion.div
        initial={{ height: defaultOpen ? 'auto' : 0, opacity: defaultOpen ? 1 : 0 }}
        animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden mt-3 text-slate-700"
        style={{ height: open ? 'auto' : undefined }}
      >
        {children}
      </motion.div>
    </div>
  )
}
