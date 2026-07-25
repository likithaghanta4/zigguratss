import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import myImage from "../assets/10005.png";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800",
    category: "Place status",
    title: "LOWER HALL – OPERATIONAL",
    description:
      "Lower Hall has entered active operation and is now maintained on a regular cycle.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    category: "Item release",
    title: "ITEM II – IN CIRCULATION",
    description:
      "Item 02 has been released externally and is now circulating beyond its point of origin.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=800",
    category: "Formation / Process",
    title: "INTERIOR V – FORMING",
    description:
      "Work continues on Interior 05. Conditions are being refined prior to use.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800",
    category: "Admission-related",
    title: "ADMISSION CYCLE – OPEN",
    description: "A limited admission review period is currently underway.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800",
    category: "Archive",
    title: "ARCHIVE OPEN",
    description: "Historical items are now available for review.",
  },
];

function Card({ item, type, onClick, isMobile }) {
  const isCenter = type === "center";

  return (
    <motion.div
      onClick={!isCenter ? onClick : undefined}
      className={`relative rounded-xl overflow-hidden ${
        isCenter ? "" : "cursor-pointer"
      }`}
      animate={{
        width: isCenter ? (isMobile ? 380 : 460) : isMobile ? 90 : 330,
        height: isCenter ? (isMobile ? 260 : 300) : isMobile ? 220 : 230,
        opacity: isCenter ? 1 : 0.6,
      }}
      transition={{ duration: 0.4 }}
    >
      <img src={item.image} className="w-full h-full object-cover" />

      {!isCenter && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition">
          <div className="opacity-0 hover:opacity-100 transition text-white text-xl">
            →
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function UpdatesSection() {
  const [index, setIndex] = useState(2);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const total = slides.length;

  const prev = () => setIndex((index - 1 + total) % total);
  const next = () => setIndex((index + 1) % total);

  const left = (index - 1 + total) % total;
  const right = (index + 1) % total;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#f2ede4] py-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-[1400px] mx-auto mb-32">
          {/* 🔥 IMAGE ON TOP */}
          <div className="flex justify-center mb-12">
            <img
              src={myImage}
              alt="item"
              className="w-[340px] md:w-[500px] lg:w-[1450px] max-w-none rounded-md"
            />
          </div>

          {/* LEFT TEXT */}
          <div
            className="w-full max-w-none mx-auto
             bg-[url('/10002.webp')] bg-cover bg-center
             rounded-2xl px-6 py-12 md:px-14 md:py-20"
          >
            {/* LEFT TEXT */}
            <div className="max-w-[700px] md:ml-[120px] mb-10">
              <p
                className="font-['Playfair_Display'] text-[28px] md:text-[42px]
                  leading-[1.3] text-[#2d241d]"
              >
                Every artwork is shaped by imagination, emotion, and
                craftsmanship — turning creative vision into timeless
                expression.
              </p>
            </div>

            {/* RIGHT TEXT */}
            {/* RIGHT TEXT */}
            <div className="max-w-[650px] md:ml-[420px]">
              <p
                className="font-['Playfair_Display'] text-[28px] md:text-[42px]
                  leading-[1.3] text-[#2d241d]"
              >
                We showcase artists and their creations that bring depth,
                character, and meaning into modern spaces.
              </p>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}
