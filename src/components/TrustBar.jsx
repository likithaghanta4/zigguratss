import React from 'react'

function Item({ title, desc, icon }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="text-gold-500">{icon}</div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-slate-700">{desc}</div>
      </div>
    </div>
  )
}

export default function TrustBar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Item title="14-Day Money Back" desc="Hassle-free returns" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
      <Item title="Certificate of Authenticity" desc="Signed & numbered" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8 12 2z" fill="currentColor"/></svg>} />
      <Item title="Free Worldwide Shipping" desc="Insured and tracked" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h13l4 6v5a2 2 0 0 1-2 2h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
    </div>
  )
}
