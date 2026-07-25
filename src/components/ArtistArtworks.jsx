import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const ARTISTS = [
  {
    id: 1,
    name: "Priyanka Bardhan",
    specialty: "Acrylic · Contemporary",
    bio: "I am a professional Artist with the belief that art is the connection to humanity and a way to channelize the divinity within. My artworks are based on Indian contemporary painting styles and themes.",
    photo: "https://zigguratss.com/assets/upload/artist/zigguratss_6ca65eccfa604a95f3bff20f64e5fbd8.jpg",
    artworks: [
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_0d4a1d9a230be862ac6bc5cddabf846d.jpeg", title: "The Silence of Rhythms",  price: "₹81,250", category: "Painting"   },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_1cbea8efe2d01ec986c8aefe006d60cb.jpeg", title: "Muralidhar",   price: "₹93,750", category: "Painting"   },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_c50b394035956346a26a1ec4717443e0.jpeg", title: "The Reflection",   price: "₹93,750", category: "Scenery"    },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_40ab5c59106bbfaa3de56dc5194fcfc0.jpeg", title: "Eternal Grace",     price: "₹68,750", category: "Drawing"    },
    ],
  },
  {
    id: 2,
    name: "Madhushree Pawar",
    specialty: "Watercolor · Spirituality",
    bio: "I am a self-taught artist inspired by elements of nature and spirituality. My work is mainly in watercolor, acrylic and pen sketch mediums, creating meaningful connections through colors.",
    photo: "https://zigguratss.com/assets/upload/artist/zigguratss_7cb4901b38fa7a380ae9dbafc8eb2b42.jpg",
    artworks: [
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_55e28592c1ccdb68912562fb15baf794.webp", title: "The River Bank",    price: "₹26,000", category: "Scenery"    },
      { src: "https://zigguratss.com/assets/upload/artist/zigguratss_7836e3602b0de33e770bfcc37e04f1d1.jpg", title: "Peaceful Mosey",  price: "₹41,600", category: "Painting"   },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_15bfefd88663f5175bcdbb86e191e77b.jpg", title: "Sprinkles",    price: "₹26,000", category: "Drawing"    },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_ba03a04558fd04c881a1682344ecc4c6.webp", title: "Smiling Buddha",    price: "₹48,100", category: "Painting"   },
    ],
  },
  {
    id: 3,
    name: "Yashowar Verma",
    specialty: "Oil · Realism",
    bio: "Practicing art for twenty-five years with a passion for Marwari horses and their beauty. My work captures the distinctive elegance of horses, a royal breed suitable for Rajput warriors, through detailed oil paintings.",
    photo: "https://zigguratss.com/assets/upload/artist/zigguratss_2fb67bc2b1b227621eadc7d29d6bfebe.jpeg",
    artworks: [
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_b88c72715685d76c85e9abecec4cffae.jpg", title: "Stallion Rajkumar",     price: "₹250,000", category: "Painting"   },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_d420aac58e0479d7d1f952c3248f8f6b.jpg", title: "Waves of Freedom",  price: "₹62,500", category: "Scenery"    },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_197308bd8f2000ea6e355511a57e7e97.jpg", title: "Stallion Tarzan",    price: "₹387,500", category: "Sculpture"  },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_0d4a1d9a230be862ac6bc5cddabf846d.jpeg", title: "Stallion Devraj",     price: "₹292,500", category: "Painting"   },
    ],
  },
  {
    id: 4,
    name: "Sanjana Patel",
    specialty: "Acrylic · Folk Art",
    bio: "A self-taught artist from Mumbai inspired by culture, tradition, religion, mythology, and nature. I paint with acrylics on canvas, blending traditional influences with bold, fresh contemporary techniques.",
    photo: "https://zigguratss.com/assets/upload/artist-871.jpg",
    artworks: [
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_15bfefd88663f5175bcdbb86e191e77b.jpg", title: "Bunaai aur Baatein",    price: "₹3,125", category: "Drawing"    },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_1cbea8efe2d01ec986c8aefe006d60cb.jpeg", title: "Kathaputli",   price: "₹25,000", category: "Painting"   },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_c50b394035956346a26a1ec4717443e0.jpeg", title: "Festival of Tooth",   price: "₹31,250", category: "Scenery"    },
      { src: "https://zigguratss.com/assets/upload/art/zigguratss_0d4a1d9a230be862ac6bc5cddabf846d.jpeg", title: "Saraswati",   price: "₹25,000", category: "Sculpture"  },
    ],
  },
];

const CATEGORY_COLOR = {
  Painting:  "bg-amber-100 text-amber-800",
  Scenery:   "bg-emerald-100 text-emerald-800",
  Drawing:   "bg-sky-100 text-sky-800",
  Sculpture: "bg-rose-100 text-rose-800",
};

/* ─────────────────────────────────────────────
   HOOK – window width
───────────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return width;
}

/* ─────────────────────────────────────────────
   ARTWORK CARD
───────────────────────────────────────────── */
function ArtworkCard({ artwork, angle, radius, cardW, cardH, onHover, isHovered }) {
  return (
    <div
      className="absolute"
      style={{
        width: cardW,
        height: cardH,
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Polaroid wrapper */}
      <div
        className={`
          relative w-full h-full bg-white flex flex-col
          transition-shadow duration-300
          ${isHovered
            ? "shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            : "shadow-[0_10px_36px_rgba(0,0,0,0.18)]"}
        `}
        style={{ padding: 6, paddingBottom: 28, boxSizing: "border-box" }}
      >
        {/* Artwork image */}
        <img
          src={artwork.src}
          alt={artwork.title}
          className="w-full flex-1 object-cover block"
        />

        {/* Hover overlay */}
        <div
          className={`
            absolute inset-0 flex flex-col justify-end
            bg-linear-to-t from-stone-900/90 via-stone-900/40 to-transparent
            transition-opacity duration-300 ease-in-out
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          style={{ bottom: 28 }}
        >
          <div className="px-3 pb-3 flex flex-col gap-1">
            {/* Category badge */}
            <span
              className={`
                self-start text-[0.55rem] font-semibold tracking-widest uppercase
                px-2 py-0.5 rounded-full
                ${CATEGORY_COLOR[artwork.category] ?? "bg-stone-200 text-stone-700"}
              `}
            >
              {artwork.category}
            </span>
            {/* Title */}
            <p
              className="text-white text-xs font-medium tracking-wide leading-tight m-0"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}
            >
              {artwork.title}
            </p>
            {/* Price */}
            <p
              className="text-amber-300 font-semibold m-0"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem", letterSpacing: "0.04em" }}
            >
              {artwork.price}
            </p>
          </div>
        </div>

        {/* Bottom label (visible when not hovered) */}
        <p
          className={`
            absolute bottom-0 left-0 right-0 text-center
            text-[#9A9287] m-0 transition-opacity duration-300
            ${isHovered ? "opacity-0" : "opacity-100"}
          `}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            paddingBottom: 7,
          }}
        >
          {artwork.title}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ArtistGallery() {
  const width    = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  /* Carousel geometry */
  const cardW  = isMobile ? Math.min(108, width * 0.27) : isTablet ? 148 : 188;
  const cardH  = Math.round(cardW * 1.42);
  const radius = isMobile ? Math.min(155, width * 0.35) : isTablet ? 205 : 265;

  const [artistIdx,  setArtistIdx]  = useState(0);
  const [animKey,    setAnimKey]    = useState(0);
  const [slideDir,   setSlideDir]   = useState(1);
  const [hoveredIdx, setHoveredIdx] = useState(null); // index of hovered card

  const artist   = ARTISTS[artistIdx];
  const artworks = artist.artworks;
  const N        = artworks.length;

  /* ── Continuous rotation via RAF + DOM ref ── */
  const spinnerRef = useRef(null);
  const angleRef   = useRef(0);
  const rafRef     = useRef(null);
  const pausedRef  = useRef(false);

  useEffect(() => {
    const loop = () => {
      if (!pausedRef.current) {
        angleRef.current += 0.24;
        if (spinnerRef.current)
          spinnerRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* Pause / resume on card hover */
  useEffect(() => {
    pausedRef.current = hoveredIdx !== null;
  }, [hoveredIdx]);

  /* ── Artist change ── */
  const lastChangeAt = useRef(0);
  const changeArtist = useCallback((delta) => {
    const now = Date.now();
    if (now - lastChangeAt.current < 900) return;
    const next = artistIdx + delta;
    if (next < 0 || next >= ARTISTS.length) return;
    lastChangeAt.current = now;
    setSlideDir(delta);
    setHoveredIdx(null);
    setArtistIdx(next);
    setAnimKey((k) => k + 1);
  }, [artistIdx]);

  const jumpTo = useCallback((i) => {
    if (i === artistIdx) return;
    setSlideDir(i > artistIdx ? 1 : -1);
    setHoveredIdx(null);
    setArtistIdx(i);
    setAnimKey((k) => k + 1);
  }, [artistIdx]);

  /* ── Wheel scroll ── */
  const wrapRef = useRef(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fn = (e) => { e.preventDefault(); changeArtist(e.deltaY > 0 ? 1 : -1); };
    el.addEventListener("wheel", fn, { passive: false });
    return () => el.removeEventListener("wheel", fn);
  }, [changeArtist]);

  /* ── Touch swipe (vertical) ── */
  const touchY = useRef(null);
  const onTouchStart = (e) => { touchY.current = e.touches[0].clientY; };
  const onTouchEnd   = (e) => {
    if (touchY.current === null) return;
    const dy = touchY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 45) changeArtist(dy > 0 ? 1 : -1);
    touchY.current = null;
  };

  const slideFrom = slideDir > 0 ? "translateY(38px)" : "translateY(-38px)";

  return (
    <div
      ref={wrapRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`
        relative overflow-hidden select-none
        ${isMobile ? "flex flex-col" : "flex flex-row"}
        w-full min-h-screen
      `}
      style={{ background: "#FFFFFF" }}
    >
      {/* ── Fonts + keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

        @keyframes artistSlide {
          from { opacity:0; transform:${slideFrom}; }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes carouselIn {
          from { opacity:0; transform:scale(.86); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes breathe {
          0%,100% { opacity:.4; } 50% { opacity:.95; }
        }
        .anim-artist-slide { animation: artistSlide .58s cubic-bezier(.22,1,.36,1) both; }
        .anim-fade-up      { animation: fadeUp .55s ease .12s both; }
        .anim-carousel-in  { animation: carouselIn .48s ease both; }
        .anim-breathe      { animation: breathe 2.8s ease-in-out infinite; }
      `}</style>

 {/* ADD HEADING HERE */}

   <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 text-center">
  

  <h1 className="text-[#a3a199] text-3xl md:text-5xl font-light tracking-tight">
    Artists Artworks
  </h1>
</div>

      {/* ══════════════════════════════════════
          LEFT — Artist portrait
      ══════════════════════════════════════ */}
      <div
        className={`
          flex flex-col items-center justify-center shrink-0 
          ${isMobile
            ? "w-full pt-10 pb-6 px-5"
            : isTablet
            ? "w-[44%] py-8 pl-10 pr-6"
            : "w-[38%] py-8 pl-16 pr-8"
          }
        `}
      >
        {/* Polaroid */}
        <div
          key={`photo-${animKey}`}
          className={`
            anim-artist-slide bg-white
            shadow-[0_8px_48px_rgba(0,0,0,0.13),0_1px_6px_rgba(0,0,0,0.06)]
            ${isMobile ? "w-[clamp(150px,50vw,200px)]" : isTablet ? "w-55" : "w-66.25"}
          `}
          style={{ padding: isMobile ? "8px 8px 30px" : "12px 12px 46px" }}
        >
          <img
            src={artist.photo}
            alt={artist.name}
            className="w-full block object-cover"
            style={{ aspectRatio: "3/4", filter: "grayscale(100%) contrast(1.07)" }}
          />
        </div>

        {/* Info */}
        <div
          key={`info-${animKey}`}
          className="anim-fade-up text-center mt-5 flex flex-col items-center gap-1 w-full"
        >
          <h2
            className={`
              font-normal tracking-wide text-[#2C2A24] m-0
              ${isMobile ? "text-[1.3rem]" : isTablet ? "text-[1.45rem]" : "text-[1.8rem]"}
            `}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {artist.name}
          </h2>

          <p
            className="italic tracking-[.12em] text-[#9A9287] m-0 text-[0.98rem]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {artist.specialty}
          </p>

          {!isMobile && (
            <p
              className="italic text-[#7A7570] max-w-80 mt-3 leading-[1.72] text-[1rem] m-0"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {artist.bio}
            </p>
          )}
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-5">
          {ARTISTS.map((a, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              aria-label={`View ${a.name}`}
              className={`
                w-1.75 h-1.75 rounded-full border-none outline-none cursor-pointer p-0
                transition-all duration-300 hover:scale-[1.6]
                ${i === artistIdx ? "bg-[#2C2A24] scale-[1.45]" : "bg-[#C5C0B8]"}
              `}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <p
          className={`
            anim-breathe mt-4 tracking-[.22em] uppercase text-[#AEA89E] text-[0.77rem] m-0
          `}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {isMobile ? "Swipe up · next artist" : "Scroll · browse artists"}
        </p>

        {/* Counter */}
        <p
          className="text-[#C5C0B8] tracking-[.18em] text-[1rem] mt-2 m-0"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {String(artistIdx + 1).padStart(2, "0")} / {String(ARTISTS.length).padStart(2, "0")}
        </p>
      </div>

      {/* ══════════════════════════════════════
          RIGHT — 3-D carousel
      ══════════════════════════════════════ */}
      <div
        className={`
          relative flex items-center justify-center flex-1
          ${isMobile ? "min-h-[52svh]" : "min-h-screen"}
        `}
      >
        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse 68% 68% at 50% 50%, transparent 36%, #FFFFFF 100%)",
          }}
        />

        {/* Hover tooltip — shown above stage when hovering */}
        {hoveredIdx !== null && (
          <div
            className="
              absolute top-[10%] left-1/2 -translate-x-1/2
              z-20 pointer-events-none
              flex flex-col items-center gap-1
            "
            style={{ animation: "fadeUp .25s ease both" }}
          >
            <span
              className={`
                text-[0.6rem] font-semibold tracking-widest uppercase
                px-3 py-1 rounded-full
                ${CATEGORY_COLOR[artworks[hoveredIdx]?.category] ?? "bg-stone-200 text-stone-700"}
              `}
            >
              {artworks[hoveredIdx]?.category}
            </span>
            <p
              className="text-[#2C2A24] text-[1rem] font-normal m-0 tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {artworks[hoveredIdx]?.title}
            </p>
            <p
              className="text-amber-700 font-semibold m-0 text-[0.9rem]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {artworks[hoveredIdx]?.price}
            </p>
          </div>
        )}

        {/* 3-D stage */}
        <div
          key={`carousel-${animKey}`}
          className="anim-carousel-in z-5"
          style={{
            perspective: isMobile ? 650 : isTablet ? 900 : 1150,
            perspectiveOrigin: "50% 50%",
            width: cardW,
            height: cardH,
          }}
        >
          {/* Spinner — mutated by RAF, never React-re-renders */}
          <div
            ref={spinnerRef}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {artworks.map((aw, i) => (
              <ArtworkCard
                key={`${artistIdx}-${i}`}
                artwork={aw}
                angle={(360 / N) * i}
                radius={radius}
                cardW={cardW}
                cardH={cardH}
                isHovered={hoveredIdx === i}
                onHover={(val) => setHoveredIdx(val ? i : null)}
              />
            ))}
          </div>
        </div>

        {/* "N works" label */}
        <div
          key={`lbl-${animKey}`}
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-15"
          style={{ animation: "fadeUp .6s ease .25s both" }}
        >
          <p
            className="text-[#AEA89E] tracking-[.2em] uppercase text-[0.68rem] m-0"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {N} works in collection
          </p>
        </div>

        {/* Vertical artist name (desktop) */}
        {!isMobile && (
          <div
            key={`vtxt-${animKey}`}
            className="absolute right-[4%] top-1/2 -translate-y-1/2 z-15 rotate-90"
            style={{ animation: "fadeUp .7s ease .3s both", transformOrigin: "center center" }}
          >
            <p
              className="italic tracking-[.25em] uppercase text-[#C5C0B8] text-[0.67rem] whitespace-nowrap m-0"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {artist.name}
            </p>
          </div>
        )}

        {/* Prev / Next (desktop) */}
        {!isMobile && artistIdx > 0 && (
          <button
            onClick={() => changeArtist(-1)}
            className="
              absolute left-6 top-1/2 -translate-y-1/2 z-20
              flex flex-col items-center gap-0.5 bg-transparent border-none
              cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200
              p-2
            "
          >
            <span className="text-[1.4rem] text-[#6E6A62] leading-none">↑</span>
            <span
              className="text-[0.88rem] tracking-[.2em] text-[#6E6A62] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Prev
            </span>
          </button>
        )}
        {!isMobile && artistIdx < ARTISTS.length - 1 && (
          <button
            onClick={() => changeArtist(1)}
            className="
              absolute left-6 bottom-[12%] z-20
              flex flex-col items-center gap-0.5 bg-transparent border-none
              cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200
              p-2
            "
          >
            <span
              className="text-[0.88rem] tracking-[.2em] text-[#6E6A62] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Next
            </span>
            <span className="text-[1.4rem] text-[#6E6A62] leading-none">↓</span>
          </button>
        )}
      </div>
    </div>
  );
}