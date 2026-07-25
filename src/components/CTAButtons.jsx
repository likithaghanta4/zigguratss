import React from 'react'
import { motion } from 'framer-motion'

export default function CTAButtons() {
  return (
    <div className="flex items-center space-x-4">
      <motion.button whileHover={{ scale: 1.02 }} className="px-5 py-3 bg-[#c9a96e] text-slate-950 font-semibold rounded-lg shadow-md">
        Secure Purchase
      </motion.button>

      <motion.button whileHover={{ scale: 1.02 }} className="px-4 py-2 border border-slate-200 text-slate-900 rounded-lg bg-white/40">
        Make an Offer
      </motion.button>
    </div>
  )
}
