import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";

// ─── Design Tokens (via Tailwind arbitrary values) ───────────────────────────
// Ivory: #F8F4EE | Gold: #C9A84C | Charcoal: #2C2A25 | Bronze: #8B6914
// Parchment: #EDE8DE | Blush: #C4A882 | Warm Gray: #9B9189

// ─── Data ────────────────────────────────────────────────────────────────────
const FEATURED = {
  id: 0,
  category: "Exhibition",
  tag: "COVER STORY",
  title: "The Quiet Power of Mark Rothko's Color Fields: Emotion Beyond Form",
  excerpt:
    "In the hushed galleries of the Tate Modern, standing before a vast canvas of deep crimson bleeding into black, one understands why Rothko insisted his paintings were not abstract — they were deeply human. We trace the painter's obsessive pursuit of feeling without narrative.",
  author: "Isabelle Fontaine",
  date: "June 3, 2025",
  readTime: "9 min read",
  image:
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=80",
};

const BLOGS = [
  {
    id: 1,
    category: "Art Collecting",
    title: "How to Begin an Art Collection Without a Museum Budget",
    excerpt: "Seasoned collectors share the principles that guided their early acquisitions — and the mistakes they wish they'd avoided.",
    author: "Dominic Hale",
    date: "May 28, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
  },
  {
    id: 2,
    category: "Artist Profile",
    title: "Yayoi Kusama at 95: Infinity Has No Retirement",
    excerpt: "From a small studio in Tokyo, the world's most visited living artist continues to paint, every single day.",
    author: "Mei Tanaka",
    date: "May 21, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=600&q=80",
  },
  {
    id: 3,
    category: "Creative Process",
    title: "The Alchemy of Gilding: Renaissance Craft in Contemporary Hands",
    excerpt: "A new generation of artists is reviving gold leaf techniques, merging devotional tradition with contemporary vision.",
    author: "Rafael Moreno",
    date: "May 14, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80",
  },
  {
    id: 4,
    category: "Auction",
    title: "When Basquiat Broke the Room: The Most Electric Sale of the Decade",
    excerpt: "Inside Christie's New York on the night a single canvas rewrote the record books and stunned even the most seasoned bidders.",
    author: "Clara Ashworth",
    date: "May 7, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80",
  },
  {
    id: 5,
    category: "Art Stories",
    title: "The Lost Vermeer: A 300-Year Mystery Finally Resolved",
    excerpt: "A Dutch attic, a family heirloom dismissed as a copy, and one tenacious art historian who refused to let it go.",
    author: "Pieter van den Berg",
    date: "April 30, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
  },
];

const CATEGORY_COLORS = {
  Exhibition: "text-[#8B6914] bg-[#8B6914]/10 border-[#8B6914]/25",
  "Art Collecting": "text-[#6B5B3E] bg-[#C4A882]/15 border-[#C4A882]/30",
  "Artist Profile": "text-[#5C4A6E] bg-[#5C4A6E]/10 border-[#5C4A6E]/20",
  "Creative Process": "text-[#4A6741] bg-[#4A6741]/10 border-[#4A6741]/20",
  Auction: "text-[#8B3A3A] bg-[#8B3A3A]/10 border-[#8B3A3A]/20",
  "Art Stories": "text-[#2C6B8B] bg-[#2C6B8B]/10 border-[#2C6B8B]/20",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ category }) {
  const cls = CATEGORY_COLORS[category] || "text-[#8B6914] bg-[#C9A84C]/10 border-[#C9A84C]/25";
  return (
    <span className={`inline-block px-2.5 py-0.5 text-[10px] tracking-[0.18em] uppercase font-semibold border rounded-sm ${cls}`}>
      {category}
    </span>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="h-px w-6 bg-[#C9A84C]" />
      <div className="w-1 h-1 rounded-full bg-[#C9A84C] opacity-70" />
      <div className="h-px flex-1 bg-[#C9A84C]/20" />
    </div>
  );
}

function Meta({ date, readTime, light = false }) {
  const cls = light ? "text-[#EDE8DE]/60" : "text-[#9B9189]";
  return (
    <p className={`text-[11px] tracking-wide font-light ${cls}`}>
      {date} &nbsp;·&nbsp; {readTime}
    </p>
  );
}

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({ post }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-sm overflow-hidden bg-[#2C2A25] cursor-pointer group"
      style={{ minHeight: 460 }}
    >
      {/* Background image with zoom */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814]/95 via-[#1A1814]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1814]/40 to-transparent" />
      </motion.div>

      {/* Gold accent line */}
      <motion.div
        className="absolute top-0 left-0 w-1 bg-[#C9A84C]"
        initial={{ height: 0 }}
        animate={inView ? { height: "100%" } : {}}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Cover story tag */}
      <div className="absolute top-6 right-6">
        <span className="text-[9px] tracking-[0.22em] uppercase font-bold text-[#C9A84C] border border-[#C9A84C]/50 px-3 py-1.5">
          {post.tag}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
        <div className="mb-3">
          <CategoryBadge category={post.category} />
        </div>

        <h3 className="font-['Playfair_Display'] text-[#F8F4EE] text-2xl md:text-3xl lg:text-[2rem] leading-snug font-semibold mb-3 max-w-2xl">
          {post.title}
        </h3>

        <motion.p
          className="text-[#EDE8DE]/70 text-sm leading-relaxed max-w-xl mb-5 font-light"
          animate={{ opacity: hovered ? 1 : 0.75 }}
          transition={{ duration: 0.4 }}
        >
          {post.excerpt}
        </motion.p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#C9A84C] text-xs tracking-widest uppercase font-semibold mb-0.5">
              {post.author}
            </p>
            <Meta date={post.date} readTime={post.readTime} light />
          </div>

          {/* Read More arrow */}
          <motion.div
            className="flex items-center gap-2 text-[#C9A84C] text-xs tracking-widest uppercase font-semibold"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            Read Essay
            <motion.span
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Small Blog Card ──────────────────────────────────────────────────────────
function BlogCard({ post, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group cursor-pointer bg-[#FAF7F2] border border-[#EDE8DE] rounded-sm overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Category overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1A1814]/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={post.category} />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <Meta date={post.date} readTime={post.readTime} />

        <h4 className="font-['Playfair_Display'] text-[#2C2A25] text-base leading-snug font-semibold mt-2 mb-2 flex-1">
          {post.title}
        </h4>

        <p className="text-[#6B6560] text-xs leading-relaxed mb-4 line-clamp-2 font-light">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#EDE8DE]">
          <span className="text-[#8B6914] text-[11px] tracking-widest uppercase font-semibold">
            {post.author}
          </span>
          <motion.span
            className="text-[#C9A84C] text-xs font-semibold"
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="max-w-2xl">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="h-px w-10 bg-[#C9A84C]" />
        <span className="text-[#8B6914] text-[20px] tracking-[0.28em] uppercase font-bold">
          The Journal
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-['Playfair_Display'] text-[#2C2A25] text-4xl md:text-5xl font-semibold leading-tight mb-4"
      >
        Stories from the
        <span className="block italic text-[#8B6914]">Art World</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-[#6B6560] text-sm leading-relaxed font-light max-w-lg"
      >
        Essays, profiles, and dispatches from artists, collectors, and curators at the
        intersection of culture and creation. Selected with an editor's eye for what endures.
      </motion.p>
    </div>
  );
}

// ─── View All Button ──────────────────────────────────────────────────────────
function ViewAllButton() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex justify-center mt-12"
    >
      <motion.button
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative group px-10 py-3.5 border border-[#C9A84C] text-[#8B6914] text-[11px] tracking-[0.22em] uppercase font-bold overflow-hidden"
      >
        {/* Fill sweep */}
        <motion.span
          className="absolute inset-0 bg-[#C9A84C]"
          initial={{ x: "-100%" }}
          animate={{ x: hovered ? "0%" : "-100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="relative z-10 flex items-center gap-2"
          animate={{ color: hovered ? "#F8F4EE" : "#8B6914" }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          View All Journals
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.3 }}>
            →
          </motion.span>
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ArtistBlogSection() {
  return (
    <section className="bg-[#F8F4EE] py-20 px-4 sm:px-6 lg:px-12 xl:px-20 font-['Inter',sans-serif]">
      {/* Google Fonts import via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap');
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <SectionHeading />

          {/* Decorative issue label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden lg:flex flex-col items-end gap-1"
          >
            <span className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase font-semibold">
              Volume XII · 2025
            </span>
            <span className="text-[#9B9189] text-[9px] tracking-widest uppercase">
              Art · Culture · Collecting
            </span>
          </motion.div>
        </div>

        {/* Main grid: featured + small cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Featured — takes 5/12 columns on large screens */}
          <div className="lg:col-span-5">
            <FeaturedCard post={FEATURED} />
          </div>

          {/* Small cards grid — takes 7/12 columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BLOGS.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>

        {/* Gold ornamental divider */}
        <div className="flex items-center gap-4 mt-14">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0L10.8 7.2L18 9L10.8 10.8L9 18L7.2 10.8L0 9L7.2 7.2L9 0Z" fill="#C9A84C" fillOpacity="0.5" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
        </div>

        <ViewAllButton />
      </div>
    </section>
  );
}