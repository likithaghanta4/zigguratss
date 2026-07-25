import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShoppingBag, Compass, Filter, X } from "lucide-react";
import { Stage, Layer, Image as KonvaImage, Rect, Group } from 'react-konva';
import useImage from 'use-image';

// --- AUTHENTIC CURATED ARTWORKS ---
const BASE_ARTWORKS = [
  { id: "A01", type: "Portrait", category: "Painting", title: "Mona Lisa", artist: "Leonardo da Vinci", price: "$1,000,000", desc: "The most famous portrait in the world, defined by sfumato and her enigmatic smile.", img: "https://images.unsplash.com/photo-1578301978693-85fa9c03fa75?q=80&w=800&auto=format&fit=crop" },
  { id: "A02", type: "Landscape", category: "Painting", title: "The Starry Night", artist: "Vincent van Gogh", price: "$1,000,000", desc: "A masterful post-impressionist vision of the night sky over Saint-Rémy-de-Provence.", img: "https://images.unsplash.com/photo-1580136608260-4ebcefac8abc?q=80&w=1200&auto=format&fit=crop" },
  { id: "A03", type: "Portrait", category: "Photography", title: "Girl with a Pearl Earring", artist: "Johannes Vermeer", price: "$85,000,000", desc: "A tronie representing a stylized facial expression, famous for its luminous pearl.", img: "https://images.unsplash.com/photo-1605721200677-49f96b34af2a?q=80&w=800&auto=format&fit=crop" },
  { id: "A04", type: "Landscape", category: "Drawing", title: "The Great Wave", artist: "Katsushika Hokusai", price: "$1,500,000", desc: "An iconic woodblock print depicting a rogue wave threatening boats off Kanagawa.", img: "https://images.unsplash.com/photo-1582561424760-01ee0ca72dfc?q=80&w=1200&auto=format&fit=crop" },
  { id: "A05", type: "Portrait", category: "Painting", title: "The Kiss", artist: "Gustav Klimt", price: "$135,000,000", desc: "An opulent, Byzantine-inspired depiction of lovers enveloped in gold leaf.", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop" },
  { id: "A06", type: "Landscape", category: "Photography", title: "Wanderer above the Sea of Fog", artist: "Caspar David Friedrich", price: "$1,000,000", desc: "The quintessential masterpiece of Romanticism, evoking awe and reflection.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" },
  { id: "A07", type: "Portrait", category: "Digital Art", title: "The Scream", artist: "Edvard Munch", price: "$119,900,000", desc: "A radical expressionist piece capturing the existential dread of modern life.", img: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&auto=format&fit=crop" },
  { id: "A08", type: "Landscape", category: "Painting", title: "The Night Watch", artist: "Rembrandt", price: "$1,000,000", desc: "Famous for its colossal scale and brilliant use of light and shadow.", img: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80&w=1200&auto=format&fit=crop" },
  { id: "A09", type: "Portrait", category: "Painting", title: "The Birth of Venus", artist: "Sandro Botticelli", price: "$1,000,000", desc: "Depicts the goddess Venus arriving at the shore after her birth, fully grown.", img: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop" },
  { id: "A10", type: "Landscape", category: "Photography", title: "Impression, Sunrise", artist: "Claude Monet", price: "$35,000,000", desc: "The painting that gave its name to the entire Impressionist movement.", img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1200&auto=format&fit=crop" },
  { id: "A11", type: "Portrait", category: "Sculpture", title: "David (Detail)", artist: "Michelangelo", price: "$1,000,000", desc: "A masterpiece of Renaissance sculpture, symbolizing strength and youthful beauty.", img: "https://images.unsplash.com/photo-1542013892-2628ddfdbd1f?q=80&w=800&auto=format&fit=crop" },
  { id: "A12", type: "Landscape", category: "Digital Art", title: "Cafe Terrace at Night", artist: "Vincent van Gogh", price: "$1,000,000", desc: "The first painting where Van Gogh used his iconic starry background.", img: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200&auto=format&fit=crop" },
  { id: "A13", type: "Portrait", category: "Drawing", title: "The Swing", artist: "Jean-Honoré Fragonard", price: "$22,000,000", desc: "The masterpiece of the Rococo era, full of delicate colors and playful intent.", img: "https://images.unsplash.com/photo-1580136579302-fa187123c8e4?q=80&w=800&auto=format&fit=crop" },
  { id: "A14", type: "Landscape", category: "Painting", title: "Liberty Leading the People", artist: "Eugène Delacroix", price: "$1,000,000", desc: "Commemorating the July Revolution of 1830, blending history with allegory.", img: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=1200&auto=format&fit=crop" },
  { id: "A15", type: "Portrait", category: "Painting", title: "The Milkmaid", artist: "Johannes Vermeer", price: "$1,000,000", desc: "A masterful depiction of everyday domestic life, renowned for its luminous, rich colors.", img: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?q=80&w=800&auto=format&fit=crop" }
];

// Double the array to 30 items for a massive, deep gallery
const ARTWORKS = [...BASE_ARTWORKS, ...BASE_ARTWORKS.map(art => ({ ...art, id: `${art.id}-V2` }))];

export default function ArtCollection() {
  const containerRef = useRef(null);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. Maintain STRICTLY 5 distinct columns for all screens
  const col1 = ARTWORKS.filter((_, i) => i % 5 === 0);
  const col2 = ARTWORKS.filter((_, i) => i % 5 === 1);
  const col3 = ARTWORKS.filter((_, i) => i % 5 === 2);
  const col4 = ARTWORKS.filter((_, i) => i % 5 === 3);
  const col5 = ARTWORKS.filter((_, i) => i % 5 === 4);

  // 2. Track scroll progress
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // 3. REFINED 5-Column Parallax Math
  const rawY1 = useTransform(scrollYProgress, [0, 1], [0, -150]); 
  const rawY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);  
  const rawY3 = useTransform(scrollYProgress, [0, 1], [0, -50]);  
  const rawY4 = useTransform(scrollYProgress, [0, 1], [0, 150]);  
  const rawY5 = useTransform(scrollYProgress, [0, 1], [0, -200]); 

  const springConfig = { damping: 20, stiffness: 50, mass: 0.5 };
  const y1 = useSpring(rawY1, springConfig);
  const y2 = useSpring(rawY2, springConfig);
  const y3 = useSpring(rawY3, springConfig);
  const y4 = useSpring(rawY4, springConfig);
  const y5 = useSpring(rawY5, springConfig);

  return (
    // THE COMPASS WRAPPER
    <div className="relative w-screen h-screen bg-gradient-to-br from-[#e0be6a] via-[#8e7915] to-black text-white font-sans selection:bg-amber-400/30 overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .compass-canvas::-webkit-scrollbar { display: none; }
        .compass-canvas { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- FLOATING UI (Header) --- */}
      <nav className="absolute top-15 right-0 w-full lg:w-[calc(100vw-14rem)] p-6 md:p-8 z-40 flex justify-end items-center pointer-events-none">
        
        <div className="flex gap-6 md:gap-8 text-[9px] md:text-[11px] tracking-[3px] uppercase font-medium pointer-events-auto items-center drop-shadow-md">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 hover:text-amber-400 transition-colors"
          >
            <Filter size={14} /> Filters
          </button>
          <span className="cursor-pointer hover:text-amber-400 transition-colors">Cart (0)</span>
        </div>
      </nav>

      {/* --- SCROLLABLE, TOGGLEABLE LEFT SIDEBAR --- */}
      <div 
        className={`fixed top-0 left-0 h-full w-[55vw] sm:w-[35vw] md:w-56 bg-black/80 backdrop-blur-2xl border-r border-white/10 z-50 transform transition-transform duration-500 ease-[0.25,0.46,0.45,0.94] overflow-y-auto [&::-webkit-scrollbar]:hidden drop-shadow-[20px_0_50px_rgba(0,0,0,0.8)] lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 md:p-6 flex flex-col gap-6 mt-8 pb-24">
          
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden absolute top-5 right-5 text-white/50 hover:text-amber-400 transition-colors"
          >
            <X size={18} />
          </button>

          {/* I. Category */}
          <div className="group">
             <h4 className="text-white text-[10px] md:text-xs tracking-[3px] uppercase font-bold mb-2.5 flex items-center gap-2 border-b border-white/10 pb-2">
               <span className="w-2.5 h-[1px] bg-amber-400"></span> Category
             </h4>
            <div className="flex flex-col gap-3 text-[9px] md:text-[10px] tracking-[1.5px] pl-4 border-l border-white/10 ml-1 uppercase">
              
              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" defaultChecked />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">All Art</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Painting</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Prints</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Photography</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Sculpture</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Drawing</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Collage</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Inspiration</span>
              </label>
            </div>
          </div>

          {/* II. Orientation */}
          <div className="group">
            <h4 className="text-white text-[10px] md:text-xs tracking-[3px] uppercase font-bold mb-2.5 flex items-center gap-2 border-b border-white/10 pb-2">
             <span className="w-2.5 h-[1px] bg-amber-400"></span> Orientation
            </h4>
            <div className="flex flex-col gap-3 text-[9px] md:text-[10px] tracking-[1.5px] pl-4 border-l border-white/10 ml-1 uppercase">
              
              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" defaultChecked />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Square</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Portrait</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Landscape</span>
              </label>

            </div>
          </div>

          {/* III. Price */}
          <div className="group">
            <h4 className="text-white text-[10px] md:text-xs tracking-[3px] uppercase font-bold mb-2.5 flex items-center gap-2 border-b border-white/10 pb-2">
             <span className="w-2.5 h-[1px] bg-amber-400"></span> Price
            </h4>
            <div className="flex flex-col gap-3 text-[9px] md:text-[10px] tracking-[1.5px] pl-4 border-l border-white/10 ml-1 uppercase">
              
              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Under $1M</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">$1M - $50M</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Museum Grade</span>
              </label>

            </div>
          </div>

          {/* IV. Size */}
          <div className="group">
             <h4 className="text-white text-[10px] md:text-xs tracking-[3px] uppercase font-bold mb-2.5 flex items-center gap-2 border-b border-white/10 pb-2">
             <span className="w-2.5 h-[1px] bg-amber-400"></span> Size
            </h4>
            <div className="flex flex-col gap-3 text-[9px] md:text-[10px] tracking-[1.5px] pl-4 border-l border-white/10 ml-1 uppercase">
              
              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Standard</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer group/box">
                <input type="checkbox" className="hidden peer" />
                <div className="w-2.5 h-2.5 border border-white/30 peer-checked:border-amber-400 flex items-center justify-center shrink-0 transition-colors">
                  <div className="w-1.5 h-1.5 bg-amber-400 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/50 peer-checked:text-amber-400 group-hover/box:text-white transition-colors">Oversized</span>
              </label>

            </div>
          </div>

        </div>
      </div>

      {/* --- THE COMPASS CANVAS --- */}
      {/* MATH FIX: Changed 18rem to 16rem to perfectly snap flush against the sidebar */}
      <div 
        ref={containerRef} 
        data-lenis-prevent="true"
        className="compass-canvas absolute top-0 right-0 w-full lg:w-[calc(100vw-14rem)] h-full overflow-auto cursor-grab active:cursor-grabbing"
      >
        <div className="w-[250vw] sm:w-[150vw] lg:w-[100vw] h-fit px-[2vw] pt-[15vh] pb-[5vh] lg:pb-[10vh] flex justify-center">
          
          {/* STRICT 5-COLUMN GRID */}
          <div className="grid grid-cols-5 gap-3 sm:gap-3 lg:gap-3 items-start w-full max-w-[3000px]">
            
            {/* COLUMN 1 */}
            <motion.div style={{ y: y1 }} className="flex flex-col gap-3 sm:gap-3 lg:gap-3 mt-[10%] lg:mt-[5%]">
              {col1.map((art) => <ArtCard key={art.id} art={art} />)}
            </motion.div>

            {/* COLUMN 2 */}
            <motion.div style={{ y: y2 }} className="flex flex-col gap-3 sm:gap-3 lg:gap-3 -mt-[15%] lg:-mt-[5%]">
              {col2.map((art) => <ArtCard key={art.id} art={art} />)}
            </motion.div>

            {/* COLUMN 3: Title + Images */}
            <motion.div style={{ y: y3 }} className="flex flex-col gap-3 sm:gap-3 lg:gap-3">
              <div className="text-center mb-16 lg:mb-32 pt-[5%] lg:pt-[10%] shrink-0 drop-shadow-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif italic font-light tracking-tight text-white mb-2 sm:mb-4 px-2 break-words">
                  The Collection
                </h1>
                <p className="text-[10px] sm:text-[7px] lg:text-[9px] tracking-[3px] uppercase text-black font-medium">
                  Scroll To Explore
                </p>
              </div>
              {col3.map((art) => <ArtCard key={art.id} art={art} />)}
            </motion.div>

            {/* COLUMN 4 */}
            <motion.div style={{ y: y4 }} className="flex flex-col gap-3 sm:gap-3 lg:gap-3 -mt-[10%] lg:-mt-[2%]">
              {col4.map((art) => <ArtCard key={art.id} art={art} />)}
            </motion.div>

            {/* COLUMN 5 */}
            <motion.div style={{ y: y5 }} className="flex flex-col gap-3 sm:gap-3 lg:gap-3 mt-[15%] lg:mt-[8%]">
              {col5.map((art) => <ArtCard key={art.id} art={art} />)}
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );}

// --- ARTWORK CARD COMPONENT ---

// --- SUB-COMPONENT: The Canvas Wall Preview ---
// --- SEPARATED WALL SCENES ---
const PORTRAIT_WALL_SCENES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1597218868981-1b68e15f0065?q=80&w=687&auto=format&fit=crop",
    anchorX: 0.5, anchorY: 0.25 
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1569350080887-dd38c27caad0?q=80&w=735&auto=format&fit=crop",
    anchorX: 0.35, anchorY: 0.25 
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=500&auto=format&fit=crop&q=60",
    anchorX: 0.65, anchorY: 0.25
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1626095889160-c06e827e3cf3?w=500&auto=format&fit=crop&q=60",
    anchorX: 0.5, anchorY: 0.35 
  }
];

const LANDSCAPE_WALL_SCENES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1638962502979-05d81dcaa096?w=500&auto=format&fit=crop&q=60",
    anchorX: 0.5, anchorY: 0.22 
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=500&auto=format&fit=crop&q=60",
    anchorX: 0.65, anchorY: 0.25 
  },
  {
    id: 3,
    url: "https://plus.unsplash.com/premium_photo-1681449856688-2abd99ab5a73?w=500&auto=format&fit=crop&q=60",
    anchorX: 0.65, anchorY: 0.25 
  }
];

// --- SUB-COMPONENT: The Canvas Wall Preview ---
const WallPreviewCanvas = ({ artUrl, artType, parentWidth, parentHeight, selectedWalls }) => {
  const [sceneIndex, setSceneIndex] = useState(0);

  const [bg1] = useImage(selectedWalls[0].url);
  const [bg2] = useImage(selectedWalls[1].url);
  const [artwork] = useImage(artUrl);

  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeBgImage = sceneIndex === 0 ? bg1 : bg2;
  const activeWallData = selectedWalls[sceneIndex];

  // --- 1. CROP CALCULATION FIRST ---
  // We must calculate the crop before positioning, so we know what part of the image is visible
  const getCrop = (image, width, height) => {
    if (!image) return { x: 0, y: 0, width: 0, height: 0 };
    const imageRatio = image.width / image.height;
    const containerRatio = width / height;
    
    let newWidth = image.width;
    let newHeight = image.height;
    let x = 0;
    let y = 0;

    // We use a standard center crop here, because our new anchor math handles the rest!
    if (containerRatio > imageRatio) {
      newHeight = image.width / containerRatio;
      y = (image.height - newHeight) / 2; 
    } else {
      newWidth = image.height * containerRatio;
      x = (image.width - newWidth) / 2;
    }
    return { x, y, width: newWidth, height: newHeight };
  };

  const currentCrop = getCrop(activeBgImage, parentWidth, parentHeight);

  // --- 2. RESPONSIVE SIZING ---
  const strictRatio = artType === "Landscape" ? 0.75 : 1.25;

  // Base width at 35% of container
  let frameWidth = parentWidth * 0.35; 
  let frameHeight = frameWidth * strictRatio;

  // Safeguards to prevent massive frames on weird screen ratios
  const maxHeight = parentHeight * 0.65;
  if (frameHeight > maxHeight) {
      frameHeight = maxHeight;
      frameWidth = frameHeight / strictRatio; 
  }
  const maxWidth = parentWidth * 0.85;
  if (frameWidth > maxWidth) {
      frameWidth = maxWidth;
      frameHeight = frameWidth * strictRatio;
  }

  const scaleFactor = parentWidth / 500; 
  const frameThickness = 6 * scaleFactor;
  const matteThickness = 12 * scaleFactor;

  // --- 3. TRUE IMAGE ANCHORING MATH ---
  let xPos = 0;
  let yPos = 0;

  if (activeBgImage && currentCrop.width > 0) {
    const imgAnchorX = activeWallData.anchorX || 0.5;
    const imgAnchorY = activeWallData.anchorY || 0.35;

    // Translate the anchor point on the original photo to its exact pixel on the screen
    const screenCenterPixelX = ((imgAnchorX * activeBgImage.width) - currentCrop.x) / currentCrop.width * parentWidth;
    const screenCenterPixelY = ((imgAnchorY * activeBgImage.height) - currentCrop.y) / currentCrop.height * parentHeight;

    // Shift by half the frame's size so the *center* of the artwork sits on the anchor point
    xPos = screenCenterPixelX - (frameWidth / 2) - frameThickness;
    yPos = screenCenterPixelY - (frameHeight / 2) - frameThickness;
  }

  return (
    <div className="absolute inset-0 z-20 animate-in fade-in duration-700 bg-[#e8e6e1]">
      <Stage width={parentWidth} height={parentHeight}>
        <Layer>
          {activeBgImage && (
            <KonvaImage
              image={activeBgImage}
              width={parentWidth}
              height={parentHeight}
              crop={currentCrop}
            />
          )}

          {artwork && activeBgImage && (
            <Group x={xPos} y={yPos}>
              <Rect
                width={frameWidth + (frameThickness * 2)}
                height={frameHeight + (frameThickness * 2)}
                fill="#1a1a1a"
                shadowColor="rgba(0,0,0,0.8)"
                shadowBlur={15 * scaleFactor}
                shadowOffsetX={10 * scaleFactor}
                shadowOffsetY={15 * scaleFactor}
                shadowOpacity={0.6}
                cornerRadius={2}
              />
              <Rect
                x={frameThickness}
                y={frameThickness}
                width={frameWidth}
                height={frameHeight}
                fill="#f8f8f8"
              />
              <KonvaImage
                image={artwork}
                x={frameThickness + matteThickness}
                y={frameThickness + matteThickness}
                width={frameWidth - (matteThickness * 2)}
                height={frameHeight - (matteThickness * 2)}
              />
            </Group>
          )}
        </Layer>
      </Stage>

      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none mix-blend-overlay" />
      
      <div className="absolute bottom-3 left-0 w-full flex justify-center gap-1.5 z-30">
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${sceneIndex === 0 ? 'bg-white' : 'bg-white/40'}`} />
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${sceneIndex === 1 ? 'bg-white' : 'bg-white/40'}`} />
      </div>
    </div>
  );
};


// --- MAIN COMPONENT: The Art Card ---
const ArtCard = ({ art }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedWalls, setSelectedWalls] = useState([]);
  const containerRef = useRef(null);
  
  const formattedDimensions = art.type === "Landscape" ? "40 × 30 IN" : "24 × 36 IN";

  // When hovered, measure the container and pick 2 random walls based on art type
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
    
    // Check orientation and pick the right array
    const wallsToUse = art.type === "Landscape" ? LANDSCAPE_WALL_SCENES : PORTRAIT_WALL_SCENES;
    
    // Randomize and pick 2 distinct scenes for the slideshow
    const shuffledWalls = [...wallsToUse].sort(() => 0.5 - Math.random());
    setSelectedWalls(shuffledWalls.slice(0, 2));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="w-full flex flex-col shrink-0 group cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,1)] shadow-[0_15px_40px_rgba(0,0,0,0.8)] bg-[#0a0a0a] border border-white/5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D FRAME & MATTE SECTION */}
      <div className="w-full bg-[#beb2b2] p-1.5 md:p-2.5 border-b border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
        
        <div ref={containerRef} className="relative overflow-hidden border border-black shadow-[0_5px_15px_rgba(0,0,0,0.5)] bg-black">
          
          {/* ORIGINAL ARTWORK */}
          <img 
            src={art.img} 
            alt={art.title} 
            className={`w-full h-auto object-cover transform transition-transform duration-[2s] ease-[0.25,0.46,0.45,0.94] group-hover:scale-105 ${
              art.type === "Landscape" ? "aspect-[4/3] lg:aspect-[3/2]" : "aspect-[4/5] lg:aspect-[2/3]"
            }`}
            loading="lazy"
          />

          {/* CANVAS OVERLAY: Renders only when hovered */}
          {isHovered && dimensions.width > 0 && selectedWalls.length === 2 && (
            <WallPreviewCanvas 
              artUrl={art.img} 
              artType={art.type} 
              parentWidth={dimensions.width} 
              parentHeight={dimensions.height} 
              selectedWalls={selectedWalls}
            />
          )}

        </div>
      </div>
      
      {/* PERMANENT INFO SECTION (ULTRA-COMPACT & SIDE-BY-SIDE) */}
      <div className="flex flex-col p-2 md:p-2.5 flex-grow justify-between bg-[#0a0a0a]">
        
        {/* Top Section: Identity & Value */}
        <div className="flex flex-col gap-1.5 mb-1.5">
          
          {/* Title (Now has 100% width for longer names) */}
          <h3 className="text-xs md:text-sm lg:text-base font-serif italic text-white/90 drop-shadow-sm font-light tracking-wide break-words leading-none w-full">
            {art.title}
          </h3>

          {/* Artist & Price Row */}
          <div className="flex justify-between items-end gap-2">
            <p className="text-amber-400/80 text-[5px] md:text-[6px] tracking-[0.15em] uppercase font-medium truncate flex-1">
              {art.artist}
            </p>
            <span className="text-[10px] md:text-xs font-serif tracking-widest text-white/90 leading-none shrink-0 text-right">
              {art.price}
            </span>
          </div>
          
        </div>

        {/* Bottom Row: Specs & Action */}
        <div className="flex items-center justify-between pt-1.5 border-t border-white/5 mt-auto gap-2">
          
          {/* Technical Specs (Left, fluid width) */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[4.5px] md:text-[5.5px] tracking-[0.15em] uppercase text-white/40 font-light flex-1 min-w-0">
             <span className="text-white/70 font-medium truncate">{art.category}</span>
             <span className="w-[1.5px] h-[1.5px] rounded-full bg-white/20 shrink-0"></span>
             <span className="truncate">{art.type}</span>
             <span className="w-[1.5px] h-[1.5px] rounded-full bg-white/20 shrink-0"></span>
             <span className="truncate">{formattedDimensions}</span>
          </div>
          
          {/* Premium Animated Acquire Button (Right, thinner padding) */}
          <button className="group/btn relative overflow-hidden bg-transparent text-white border border-white/20 py-1 px-2 md:py-1.5 md:px-3 text-[5px] md:text-[6px] tracking-[0.2em] uppercase font-medium flex items-center gap-1 hover:border-amber-400 hover:text-black transition-all duration-500 shrink-0">
            <div className="absolute inset-0 w-full h-full bg-amber-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.25,0.46,0.45,0.94] -z-10"></div>
            <ShoppingBag size={8} className="w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] transition-transform group-hover/btn:scale-110"/> 
            <span>Acquire</span>
          </button>

        </div>
      </div>
    </div>
  );
};