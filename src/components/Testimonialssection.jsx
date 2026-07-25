

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Testimonial data ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 0,
    initials: "VN",
    bg: "bg-[#fde8dc]",
    text: "text-[#8b3010]",
    quote:
      "I have bought artwork from Zigguratss when they were not available online, the artwork they have supplied to me was great and at a cost which I didn't found anywhere else. I too create painting as a passion and I love the collection Zigguratss offers. Best of luck to the team of the Zigguratss.",
    name: "Vipin Nautiyal",
    role: "Business Analyst — Accenture",
  },
  {
    id: 1,
    initials: "NN",
    bg: "bg-[#dcedf8]",
    text: "text-[#1a5a82]",
    quote:
      "I was looking for a painting for my newly constructed home at Kerala. I contacted one of my friends who suggested me the name of Vijay Bhatt, owner of Zigguratss Artwork LLP — we finally met at Delhi and he suggested me artwork for my home. I suggest and recommend Zigguratss for all your artwork related needs. Thanks for your prompt service and best of luck for your future business as you are online now.",
    name: "Nishi Nair",
    role: "Architect",
  },
  {
    id: 2,
    initials: "VA",
    bg: "bg-[#e0f0e3]",
    text: "text-[#1a6b35]",
    quote:
      "I recently purchased a piece of artwork by Somnath Bothe through the Zigguratss online gallery, and I couldn't be more pleased with my decision. The entire process was smooth — from browsing the collection to receiving the artwork at my home in Gurugram. Somnath's work is truly exceptional; his creativity and attention to detail are evident in every brushstroke. I highly recommend both Somnath Bothe's art and Zigguratss.",
    name: "Vasudha",
    role: "Entrepreneur",
  },
];

const TOTAL = TESTIMONIALS.length;
const AUTO_DELAY = 5500;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(2, "0");

// ─── Animation variants ───────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

const sectionEntrance = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay },
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavButton({ label, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      whileHover={{
        backgroundColor: "#c1440e",
        color: "#ffffff",
        borderColor: "#c1440e",
      }}
      whileTap={{ scale: 0.91 }}
      transition={{ duration: 0.18 }}
      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-[1.5px]
                 border-[#dcc9b8] flex items-center justify-center
                 text-sm text-[#8b5e3c] bg-transparent cursor-pointer
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c1440e]"
    >
      {children}
    </motion.button>
  );
}

function Avatar({ initials, bg, text }) {
  return (
    <div
      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0 flex items-center
                  justify-content-center justify-center font-medium text-sm
                  font-[family-name:var(--font-dm,_'DM_Sans',_sans-serif)]
                  ${bg} ${text}`}
    >
      {initials}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const [[current, direction], setCurrent] = useState([0, 0]);
//   const [paused, setPaused] = useState(false);

  // Section enter-on-scroll
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const paginate = useCallback((dir) => {
    setCurrent(([prev]) => [(prev + dir + TOTAL) % TOTAL, dir]);
  }, []);

  const goTo = useCallback((index) => {
    setCurrent(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  // Auto-play
  useEffect(() => {
    // if (paused) return;
    const id = setInterval(() => paginate(1), AUTO_DELAY);
    return () => clearInterval(id);
  }, [paginate]);

  const t = TESTIMONIALS[current];

  return (
    <section
      ref={sectionRef}
    //   onMouseEnter={() => setPaused(true)}
    //   onMouseLeave={() => setPaused(false)}
      className="relative bg-[#fef9f4] overflow-hidden
                 px-5 py-16
                 sm:px-8 sm:py-20
                 md:px-12 md:py-24
                 lg:px-20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Decorative background circles ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-80px] bottom-[-80px]
                   w-[260px] h-[260px] rounded-full border-[48px] border-[#f2e8df] opacity-50
                   sm:w-[300px] sm:h-[300px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[60px] bottom-[-24px]
                   w-[110px] h-[110px] rounded-full border-[22px] border-[#eddcc9] opacity-40
                   hidden sm:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-40px] top-[-40px]
                   w-[160px] h-[160px] rounded-full border-[32px] border-[#f5ede4] opacity-30
                   hidden md:block"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">

        {/* ── Top row: badge + counter ── */}
        <motion.div
          variants={sectionEntrance}
          custom={0}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-12 md:mb-14"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#f2e8df] rounded-full px-4 py-2">
            <span className="w-[6px] h-[6px] rounded-full bg-[#c1440e] shrink-0" />
            <span
              className="text-lg sm:text-xl tracking-[0.18em]
                         uppercase text-[#8b5e3c] font-medium"
            >
              What our customers say
            </span>
          </div>

          {/* Slide counter */}
          <p
            className="text-[13px] tracking-wide text-[#c2a98e]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={current}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="inline-block text-2xl sm:text-3xl font-bold text-[#2d1f14] mr-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {pad(current + 1)}
              </motion.span>
            </AnimatePresence>
            / {pad(TOTAL)}
          </p>
        </motion.div>

        {/* ── Body: number column + content column ── */}
        <div
          className="grid gap-6 sm:gap-8 md:gap-10"
          style={{ gridTemplateColumns: "auto 1fr" }}
        >
          {/* Left: big decorative number + vertical line */}
          <motion.div
            variants={sectionEntrance}
            custom={0.15}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col items-center gap-3 pt-1 w-12 sm:w-16 md:w-24"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-bold leading-none select-none text-[#eddcc9]
                           text-5xl sm:text-6xl md:text-[80px]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {pad(current + 1)}
              </motion.div>
            </AnimatePresence>

            {/* Vertical divider line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
              style={{ transformOrigin: "top" }}
              className="w-px flex-1 min-h-[80px] max-h-[160px]
                         bg-gradient-to-b from-[#e0c9b4] to-transparent"
            />
          </motion.div>

          {/* Right: sliding testimonial content */}
          <div className="relative min-h-[240px] sm:min-h-[220px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col"
                >
                  {/* Opening quote mark */}
                  <motion.span
                    variants={itemFadeUp}
                    aria-hidden
                    className="block leading-none mb-1 text-[#c1440e]
                               text-4xl sm:text-5xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    "
                  </motion.span>

                  {/* Quote text */}
                  <motion.p
                    variants={itemFadeUp}
                    className="font-light leading-[1.88] text-[#4a3728] mb-7 sm:mb-8
                               text-[14.5px] sm:text-[15.5px] md:text-[16px]
                               max-w-xs sm:max-w-md md:max-w-xl"
                  >
                    {t.quote}
                  </motion.p>

                  {/* Person */}
                  <motion.div variants={itemFadeUp} className="flex items-center gap-3 sm:gap-4">
                    <Avatar initials={t.initials} bg={t.bg} text={t.text} />
                    <div>
                      <p className="text-[14.5px] sm:text-[15px] font-medium text-[#2d1f14] leading-snug">
                        {t.name}
                      </p>
                      <p className="text-[11.5px] sm:text-[12.5px] text-[#9e7d67] mt-0.5">
                        {t.role}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom: progress bar + nav ── */}
        <motion.div
          variants={sectionEntrance}
          custom={0.55}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex items-center gap-5 sm:gap-6 mt-12 sm:mt-14 md:mt-16"
        >
          {/* Animated progress bar */}
          <div
            className="flex-1 h-[2px] bg-[#eddcc9] rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={current + 1}
            aria-valuemin={1}
            aria-valuemax={TOTAL}
          >
            <motion.div
              className="h-full bg-[#c1440e] rounded-full"
              initial={false}
              animate={{ width: `${((current + 1) / TOTAL) * 100}%` }}
              transition={{ duration: 0.62, ease: [0.77, 0, 0.18, 1] }}
            />
          </div>

          {/* Dot indicators (mobile-friendly) */}
          <div className="flex items-center gap-2 sm:hidden">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer focus:outline-none
                  ${i === current
                    ? "w-5 h-[6px] bg-[#c1440e]"
                    : "w-[6px] h-[6px] bg-[#dcc9b8]"
                  }`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-2 shrink-0">
            <NavButton label="Previous testimonial" onClick={() => paginate(-1)}>
              ←
            </NavButton>
            <NavButton label="Next testimonial" onClick={() => paginate(1)}>
              →
            </NavButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
}