import React from "react";

function ProfilePortrait({ className = "" }) {
  return (
    <div className={`portrait-shell ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 180 180" className="portrait-svg">
        <defs>
          <linearGradient id="portraitBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff4d7" />
            <stop offset="100%" stopColor="#ffe0cc" />
          </linearGradient>
          <linearGradient id="portraitHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#23324a" />
            <stop offset="100%" stopColor="#4258a8" />
          </linearGradient>
        </defs>

        <rect x="10" y="10" width="160" height="160" rx="36" fill="url(#portraitBg)" />
        <circle cx="90" cy="72" r="34" fill="#f8caa9" />
        <path
          d="M51 74c0-25 16-43 39-43 24 0 40 18 40 41 0 8-1 14-4 20-9-8-18-13-36-13-16 0-28 4-35 14-3-5-4-12-4-19Z"
          fill="url(#portraitHair)"
        />
        <path
          d="M56 141c8-23 24-35 46-35 23 0 39 12 47 35"
          fill="none"
          stroke="#ffffff"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M58 142c9-22 23-34 44-34s36 12 45 34"
          fill="none"
          stroke="#d9af37"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <circle cx="77" cy="73" r="3.8" fill="#24324a" />
        <circle cx="103" cy="73" r="3.8" fill="#24324a" />
        <path
          d="M80 91c5 6 15 6 20 0"
          fill="none"
          stroke="#b96b5a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="portrait-badge">Artist</div>
    </div>
  );
}

export default ProfilePortrait;
