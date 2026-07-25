import React, { useRef, useState, useEffect } from 'react'

export default function ReadMore({ children, collapsedHeight = 140, className = '' }) {
  const ref = useRef()
  const [expanded, setExpanded] = useState(false)
  const [needsToggle, setNeedsToggle] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // measure whether content exceeds collapsedHeight
    const full = el.scrollHeight
    setNeedsToggle(full > collapsedHeight + 8)
  }, [children, collapsedHeight])

  return (
    <div className={className}>
      <div
        ref={ref}
        style={{
          maxHeight: expanded ? 'none' : `${collapsedHeight}px`,
          overflow: 'hidden',
          transition: 'max-height 360ms cubic-bezier(.2,.8,.2,1)',
        }}
      >
        {children}
      </div>

      {needsToggle && (
        <button onClick={() => setExpanded((s) => !s)} className="mt-3 text-sm text-[#065F46] font-semibold">
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}
