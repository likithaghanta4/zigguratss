import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

import Canvas from "./Canvas";
import ArtworkProductsPage from "./ArtworkProductsPage";
import DesignCarousel from "./DesignCarousel";


// ─── Data ────────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300&auto=format&fit=crop",
    title: "Abstract Forms",
    year: "2024",
  },
  {
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1920&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=300&auto=format&fit=crop",
    title: "Color Fields",
    year: "2023",
  },
  {
    img: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1920&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=300&auto=format&fit=crop",
    title: "Geometric Light",
    year: "2024",
  },
  {
    img: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1920&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=300&auto=format&fit=crop",
    title: "Fluid Motion",
    year: "2023",
  },
  {
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop",
    title: "Digital Dreams",
    year: "2024",
  },
  {
    img: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1920&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=300&auto=format&fit=crop",
    title: "Neon Textures",
    year: "2024",
  },
];

const NAV_ITEMS = [
  { to: "/slider",     label: "Featured Artwork",     pos: "tl" },
  { to: "/most-visited-artwork", label: "Most Visited Artwork", pos: "tc" },
  { to: "/most",  label: "Most Visited Artist",  pos: "tr" },
  { to: "/featured-artist",      label: "Featured Artist",      pos: "ml" },
  { to: "/top-selling",          label: "Top Selling",          pos: "mr" },
  { to: "/artist",               label: "Canvas",               pos: "bl" },
  { to: "/carousel",       label: "Design Carousel",      pos: "bc" },
  { to: "/artwork",     label: "Artwork Products",     pos: "br" },
];

const posClass = {
  tl: "col-start-1 row-start-1 items-start justify-start",
  tc: "col-start-2 row-start-1 items-start justify-center",
  tr: "col-start-3 row-start-1 items-start justify-end",
  ml: "col-start-1 row-start-2 items-center justify-start",
  mr: "col-start-3 row-start-2 items-center justify-end",
  bl: "col-start-1 row-start-3 items-end justify-start",
  bc: "col-start-2 row-start-3 items-end justify-center",
  br: "col-start-3 row-start-3 items-end justify-end",
};

// ─── Nav Button ──────────────────────────────────────────────────────────────

const NavBtn = ({ to, label, index }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 + index * 0.07, duration: 0.5, ease: "easeOut" }}
  >
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.97 }}
        className="relative px-3 py-1.5 md:px-4 md:py-2 rounded-full cursor-pointer overflow-hidden group"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* hover shimmer */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <span
          className="relative text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          {label}
        </span>
      </motion.div>
    </Link>
  </motion.div>
);

// ─── Mobile Nav Strip ─────────────────────────────────────────────────────────

const MobileNavStrip = () => (
  <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
    <div className="flex gap-2 px-4 w-max">
      {NAV_ITEMS.map((item, i) => (
        <NavBtn key={item.to} to={item.to} label={item.label} index={i} />
      ))}
    </div>
  </div>
);

// ─── Background Slides ───────────────────────────────────────────────────────

const BgSlides = ({ current }) => (
  <div className="absolute inset-0">
    <AnimatePresence>
      <motion.div
        key={current}
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${SLIDES[current].img})` }}
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1.05 }}
        exit={{ opacity: 0, scale: 1.0 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
    </AnimatePresence>
    {/* Multi-layer overlay for depth */}
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.72) 100%)" }} />
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />
  </div>
);

// ─── Thumbnail Strip ─────────────────────────────────────────────────────────

const ThumbStrip = ({ current, onChange }) => (
  <div className="flex gap-1.5 md:gap-2 items-center justify-center flex-wrap">
    {SLIDES.map((slide, i) => (
      <motion.div
        key={i}
        onClick={() => onChange(i)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 + i * 0.06, duration: 0.4, ease: "easeOut" }}
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer overflow-hidden flex-shrink-0"
        style={{
          width: 32,
          height: 42,
          borderRadius: 6,
          border: i === current
            ? "1.5px solid rgba(255,255,255,0.9)"
            : "1.5px solid rgba(255,255,255,0.2)",
          transition: "border-color 0.3s ease",
        }}
      >
        <img
          src={slide.thumb}
          alt={slide.title}
          className="w-full h-full object-cover"
          style={{
            filter: i === current ? "brightness(1.05)" : "brightness(0.65) saturate(0.7)",
            transition: "filter 0.3s ease",
          }}
        />
        {i === current && (
          <motion.div
            layoutId="thumb-active"
            className="absolute inset-0"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        )}
      </motion.div>
    ))}
  </div>
);

// ─── Slide Dots ───────────────────────────────────────────────────────────────

const SlideDots = ({ total, current, onChange }) => (
  <div className="flex gap-[6px] items-center justify-center">
    {Array.from({ length: total }).map((_, i) => (
      <motion.button
        key={i}
        onClick={() => onChange(i)}
        animate={{ width: i === current ? 20 : 5, opacity: i === current ? 1 : 0.35 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="h-[5px] rounded-full cursor-pointer border-none outline-none"
        style={{ background: "rgba(255,255,255,0.9)" }}
        aria-label={`Go to slide ${i + 1}`}
      />
    ))}
  </div>
);

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────

const TiltCard = ({ children }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  const scale = useSpring(1, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    scale.set(1.025);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// ─── Center Card ──────────────────────────────────────────────────────────────

const CenterCard = ({ current, onChange }) => {
  const slide = SLIDES[current];

  return (
    <TiltCard>
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,10,10,0.45)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Top eyebrow */}
        <div className="px-4 md:px-6 pt-4 md:pt-5 pb-2 md:pb-3 flex items-center justify-between">
          <span className="text-[9px] font-bold tracking-[0.28em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Interactive Portal
          </span>
          <span className="text-[9px] font-medium tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.25)" }}>
            {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Divider */}
        <div className="mx-4 md:mx-6 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

        {/* Main title */}
        <div className="px-4 md:px-6 pt-3 md:pt-4 pb-2 md:pb-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="text-[9px] font-medium tracking-[0.22em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                {slide.year} Collection
              </p>
              <h1 className="text-xl md:text-2xl font-light tracking-[0.14em] uppercase leading-tight" style={{ color: "rgba(255,255,255,0.95)" }}>
                Art<br />Archive
              </h1>
              <p className="text-[10px] tracking-[0.18em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                {slide.title}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail strip */}
        <div className="px-4 md:px-6 py-2 md:py-3">
          <ThumbStrip current={current} onChange={onChange} />
        </div>

        {/* Dots */}
        <div className="px-4 md:px-6 py-1.5 md:py-2">
          <SlideDots total={SLIDES.length} current={current} onChange={onChange} />
        </div>

        {/* Bottom CTA */}
        <div className="px-4 md:px-6 pt-2 pb-4 md:pb-5 flex items-center justify-between">
          <span className="text-[9px] tracking-[0.16em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
            Scroll · Discover
          </span>
          <motion.span
            whileHover={{ x: 3 }}
            className="text-[9px] font-semibold tracking-[0.18em] uppercase cursor-pointer flex items-center gap-1"
            style={{ color: "rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 1 }}
          >
            View Gallery →
          </motion.span>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l rounded-tl-2xl pointer-events-none" style={{ borderColor: "rgba(255,255,255,0.4)" }} />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r rounded-br-2xl pointer-events-none" style={{ borderColor: "rgba(255,255,255,0.4)" }} />
      </motion.div>
    </TiltCard>
  );
};

// ─── Frame Borders ────────────────────────────────────────────────────────────

const FrameBorders = () => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 1 }}
      className="absolute pointer-events-none z-10"
      style={{ inset: 16, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 18 }}
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 1 }}
      className="absolute pointer-events-none z-10"
      style={{ inset: 28, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}
    />
    {/* Corner markers */}
    {[
      "top-4 left-4 border-t-2 border-l-2 rounded-tl-[14px]",
      "top-4 right-4 border-t-2 border-r-2 rounded-tr-[14px]",
      "bottom-4 left-4 border-b-2 border-l-2 rounded-bl-[14px]",
      "bottom-4 right-4 border-b-2 border-r-2 rounded-br-[14px]",
    ].map((cls, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
        className={`absolute pointer-events-none z-10 w-5 h-5 md:w-6 md:h-6 ${cls}`}
        style={{ borderColor: "rgba(255,255,255,0.55)" }}
      />
    ))}
  </>
);

// ─── Slide Counter ────────────────────────────────────────────────────────────

const SlideCounter = ({ current, title }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 0.6 }}
    className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
  >
    <AnimatePresence mode="wait">
      <motion.span
        key={current}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.3 }}
        className="text-[9px] font-medium tracking-[0.25em] uppercase"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {String(current + 1).padStart(2, "0")} — {title}
      </motion.span>
    </AnimatePresence>
  </motion.div>
);

// ─── Main Gallery View ────────────────────────────────────────────────────────

const MainGalleryView = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full min-h-screen overflow-hidden select-none"
      style={{ background: "#080808" }}
    >
      {/* Background */}
      <BgSlides current={current} />

      {/* Frame */}
      <FrameBorders />

      {/* ── DESKTOP layout (md+): original 3×3 grid ── */}
      <div
        className="absolute inset-0 z-20 grid p-8 md:p-12 hidden md:grid"
        style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr" }}
      >
        {NAV_ITEMS.map((item, i) => (
          <div key={item.to} className={`flex ${posClass[item.pos]}`}>
            <NavBtn to={item.to} label={item.label} index={i} />
          </div>
        ))}

        {/* Center card */}
        <div className="col-start-2 row-start-2 flex items-center justify-center">
          <div className="w-full max-w-[720px]">
            <CenterCard current={current} onChange={setCurrent} />
          </div>
        </div>
      </div>

      {/* ── MOBILE layout (< md): stacked column ── */}
      <div className="absolute inset-0 z-20 flex flex-col md:hidden">
        {/* Scrollable nav strip at top */}
        <div className="pt-10 pb-3 flex-shrink-0">
          <MobileNavStrip />
        </div>

        {/* Center card fills remaining space */}
        <div className="flex-1 flex items-center justify-center px-4 py-4">
          <div className="w-full max-w-sm">
            <CenterCard current={current} onChange={setCurrent} />
          </div>
        </div>
      </div>

      {/* Slide label */}
      <SlideCounter current={current} title={SLIDES[current].title} />
    </motion.div>
  );
};

// ─── Placeholder Page ─────────────────────────────────────────────────────────

const PagePlaceholder = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="w-full min-h-screen flex flex-col items-center justify-center p-6"
    style={{ background: "#080808" }}
  >
    <div className="absolute top-6 left-6 md:top-8 md:left-8">
      <Link to="/">
        <motion.span
          whileHover={{ x: -3 }}
          className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          ← Back to Archive
        </motion.span>
      </Link>
    </div>
    <motion.h1
      initial={{ opacity: 0, letterSpacing: "0.5em" }}
      animate={{ opacity: 1, letterSpacing: "0.3em" }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="text-3xl md:text-4xl lg:text-6xl font-light uppercase text-center px-4"
      style={{ color: "rgba(255,255,255,0.85)" }}
    >
      {title}
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-4 text-[10px] tracking-[0.25em] uppercase"
      style={{ color: "rgba(255,255,255,0.2)" }}
    >
      Content Pending
    </motion.p>
  </motion.div>
);

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function GalleryLanding() {
  return (
    <AnimatePresence mode="wait">
      <MainGalleryView />
    </AnimatePresence>
  );
}