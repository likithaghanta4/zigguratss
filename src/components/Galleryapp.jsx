import { useState, useEffect, useRef } from "react";

const ARTWORKS = [
  { id: 1, title: "Solitude", artist: "Mira Voss", color: "#1a0a2e", accent: "#7c3aed" },
  { id: 2, title: "Golden Hour", artist: "Theo Nakamura", color: "#1a0e00", accent: "#d97706" },
  { id: 3, title: "Abyss", artist: "Lena Richter", color: "#001a1a", accent: "#0d9488" },
  { id: 4, title: "Bloom", artist: "Sasha Petrov", color: "#1a0010", accent: "#db2777" },
  { id: 5, title: "Fracture", artist: "Omar Diallo", color: "#0a0a0a", accent: "#6b7280" },
];

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80",
  "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400&q=80",
  "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80",
  "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&q=80",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
];

const NAV_ITEMS = [
  { id: "featured-artist", label: "FEATURED ARTIST", position: "top-right" },
  { id: "most-visited-artist", label: "MOST VISITED ARTIST", position: "top-far-right" },
  { id: "most-visited-artwork-tl", label: "MOST VISITED ARTWORK", position: "top-left" },
  { id: "most-visited-artwork-tc", label: "MOST VISITED ARTWORK", position: "top-center" },
  { id: "most-visited-artwork-ml", label: "MOST VISITED ARTWORK", position: "mid-left" },
  { id: "most-visited-artwork-bl", label: "MOST VISITED ARTWORK", position: "bot-left" },
  { id: "most-visited-artwork-bc", label: "MOST VISITED ARTWORK", position: "bot-center" },
  { id: "top-selling", label: "TOP SELLING", position: "bot-right" },
];

function NavLink({ label, onClick, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const isActive = label.includes("FEATURED") || label === "TOP SELLING";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px 0",
        fontFamily: "'Courier Prime', 'Courier New', monospace",
        fontSize: "clamp(9px, 1vw, 12px)",
        letterSpacing: "0.15em",
        fontWeight: "700",
        color: hovered ? "#ffffff" : isActive ? "#e8e8e8" : "#9ca3af",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, color 0.3s ease",
        textDecoration: "none",
        position: "relative",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      {isActive && (
        <span style={{
          display: "block",
          position: "absolute",
          bottom: "-3px",
          left: "50%",
          transform: hovered ? "translateX(-50%) scaleX(1.2)" : "translateX(-50%) scaleX(1)",
          width: "100%",
          height: "1px",
          background: hovered ? "#ffffff" : "#e8e8e8",
          transition: "transform 0.3s ease, background 0.3s ease",
        }} />
      )}
      {!isActive && hovered && (
        <span style={{
          display: "block",
          position: "absolute",
          bottom: "-3px",
          left: "0",
          width: "100%",
          height: "1px",
          background: "#ffffff",
          animation: "slideIn 0.25s ease forwards",
        }} />
      )}
    </button>
  );
}

function ArtCard({ artwork, index, active }) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      borderRadius: "20px",
      overflow: "hidden",
      opacity: active ? 1 : 0,
      transform: active ? "scale(1) translateY(0)" : "scale(0.96) translateY(10px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      background: artwork.color,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <img
        src={PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]}
        alt={artwork.title}
        style={{
          width: "100%",
          height: "75%",
          objectFit: "cover",
          opacity: 0.85,
          filter: "contrast(1.1) saturate(0.9)",
        }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "20px 24px",
        background: `linear-gradient(transparent, ${artwork.color}ee)`,
      }}>
        <p style={{
          fontFamily: "'Courier Prime', monospace",
          fontSize: "16px",
          fontWeight: "700",
          color: "#ffffff",
          margin: "0 0 4px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>{artwork.title}</p>
        <p style={{
          fontFamily: "'Courier Prime', monospace",
          fontSize: "11px",
          color: artwork.accent,
          margin: 0,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}>{artwork.artist}</p>
      </div>
      <div style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: artwork.accent,
        boxShadow: `0 0 12px ${artwork.accent}`,
      }} />
    </div>
  );
}

function CenterCard({ navigate }) {
  const [hovered, setHovered] = useState(false);
  const [activeArt, setActiveArt] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setCardVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (hovered) {
      intervalRef.current = setInterval(() => {
        setActiveArt(prev => (prev + 1) % ARTWORKS.length);
      }, 1200);
    } else {
      clearInterval(intervalRef.current);
      setActiveArt(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate("most-visited-artwork-tl")}
      style={{
        width: "clamp(280px, 36vw, 480px)",
        height: "clamp(280px, 36vw, 480px)",
        borderRadius: "24px",
        border: hovered
          ? "1px solid rgba(255,255,255,0.6)"
          : "1px solid rgba(255,255,255,0.15)",
        background: hovered
          ? "rgba(10,5,20,0.95)"
          : "rgba(8,4,16,0.9)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? "scale(1)" : "scale(0.92)",
        transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, background 0.4s ease",
        boxShadow: hovered
          ? "0 0 60px rgba(124,58,237,0.25), 0 0 120px rgba(124,58,237,0.1), inset 0 0 60px rgba(124,58,237,0.05)"
          : "0 0 40px rgba(0,0,0,0.8)",
      }}
    >
      {/* Scrollbar accent */}
      <div style={{
        position: "absolute",
        right: "8px",
        top: "20%",
        bottom: "20%",
        width: "2px",
        borderRadius: "2px",
        background: "rgba(255,255,255,0.08)",
        zIndex: 10,
      }}>
        <div style={{
          width: "100%",
          height: `${(activeArt + 1) / ARTWORKS.length * 100}%`,
          background: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
          borderRadius: "2px",
          transition: "height 0.5s ease, background 0.3s ease",
        }} />
      </div>

      {/* Artwork cards */}
      {ARTWORKS.map((art, i) => (
        <ArtCard key={art.id} artwork={art} index={i} active={hovered && i === activeArt} />
      ))}

      {/* Default state */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: hovered ? 0 : 1,
        transition: "opacity 0.3s ease",
        padding: "32px",
      }}>
        <p style={{
          fontFamily: "'Courier Prime', monospace",
          fontSize: "clamp(14px, 1.8vw, 20px)",
          fontWeight: "700",
          color: "rgba(255,255,255,0.7)",
          letterSpacing: "0.2em",
          textAlign: "center",
          textTransform: "uppercase",
          margin: "0 0 20px",
        }}>IMAGES ON HOVER</p>
        <p style={{
          fontFamily: "'Courier Prime', monospace",
          fontSize: "clamp(8px, 0.9vw, 11px)",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.12em",
          textAlign: "center",
          textTransform: "uppercase",
          lineHeight: 1.7,
          margin: 0,
        }}>
          ENTER IMAGES MOVE OR SCROLL<br />DOWN (SLIDER EFFECT, 3D EFFECT)
        </p>
      </div>

      {/* Corner glow */}
      <div style={{
        position: "absolute",
        top: "-20px",
        left: "-20px",
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />
    </div>
  );
}

function PageView({ route, onBack }) {
  const routeConfig = {
    "featured-artist": { title: "Featured Artist", subtitle: "Curated masters of the contemporary", accent: "#7c3aed" },
    "most-visited-artist": { title: "Most Visited Artist", subtitle: "The voices shaping the gallery", accent: "#0d9488" },
    "most-visited-artwork-tl": { title: "Most Visited Artwork", subtitle: "Works that captivate the world", accent: "#d97706" },
    "most-visited-artwork-tc": { title: "Most Visited Artwork", subtitle: "Works that captivate the world", accent: "#d97706" },
    "most-visited-artwork-ml": { title: "Most Visited Artwork", subtitle: "Works that captivate the world", accent: "#d97706" },
    "most-visited-artwork-bl": { title: "Most Visited Artwork", subtitle: "Works that captivate the world", accent: "#d97706" },
    "most-visited-artwork-bc": { title: "Most Visited Artwork", subtitle: "Works that captivate the world", accent: "#d97706" },
    "top-selling": { title: "Top Selling", subtitle: "The most coveted works in circulation", accent: "#db2777" },
  };

  const config = routeConfig[route] || routeConfig["featured-artist"];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const items = ARTWORKS.map((a, i) => ({ ...a, img: PLACEHOLDER_IMAGES[i] }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050308",
      color: "#ffffff",
      fontFamily: "'Courier Prime', monospace",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
      overflow: "auto",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 32px" }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            padding: "8px 20px",
            borderRadius: "4px",
            fontFamily: "'Courier Prime', monospace",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "48px",
            transition: "border-color 0.3s, color 0.3s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.4)"; e.target.style.color = "#ffffff"; }}
          onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "rgba(255,255,255,0.6)"; }}
        >
          ← BACK TO GALLERY
        </button>

        <div style={{ marginBottom: "60px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.3em", color: config.accent, margin: "0 0 12px", textTransform: "uppercase" }}>
            ÆTHER GALLERY
          </p>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 56px)",
            fontWeight: "700",
            margin: "0 0 12px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#ffffff",
          }}>
            {config.title}
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", margin: 0 }}>
            {config.subtitle}
          </p>
          <div style={{ width: "60px", height: "1px", background: config.accent, marginTop: "24px" }} />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "24px",
        }}>
          {items.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} accent={config.accent} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryCard({ item, index, accent }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 100 + 200);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        border: hovered ? `1px solid ${accent}60` : "1px solid rgba(255,255,255,0.08)",
        background: item.color,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered ? `0 0 30px ${accent}30` : "none",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", paddingBottom: "100%", overflow: "hidden" }}>
        <img
          src={item.img}
          alt={item.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
            filter: "contrast(1.05) saturate(0.85)",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: hovered ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.4)",
          transition: "background 0.3s ease",
        }} />
      </div>
      <div style={{ padding: "16px" }}>
        <p style={{
          fontFamily: "'Courier Prime', monospace",
          fontSize: "13px",
          fontWeight: "700",
          color: "#ffffff",
          margin: "0 0 4px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>{item.title}</p>
        <p style={{
          fontFamily: "'Courier Prime', monospace",
          fontSize: "10px",
          color: accent,
          margin: 0,
          letterSpacing: "0.15em",
        }}>{item.artist}</p>
      </div>
    </div>
  );
}

function FloatingParticle({ style }) {
  return (
    <div style={{
      position: "absolute",
      width: "1px",
      height: "1px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.3)",
      ...style,
    }} />
  );
}

export default function GalleryApp() {
  const [currentRoute, setCurrentRoute] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const navigate = (route) => setCurrentRoute(route);
  const goBack = () => setCurrentRoute(null);

  if (currentRoute) {
    return <PageView route={currentRoute} onBack={goBack} />;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
        @keyframes slideIn { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes float1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(6px,-10px); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-8px,6px); } }
        @keyframes float3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(4px,8px); } }
        @keyframes pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={{
        width: "100vw",
        height: "100vh",
        background: "#050308",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        opacity: pageLoaded ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}>

        {/* Ambient glow blobs */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "float1 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%",
          right: "25%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "float2 10s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          top: "40%",
          right: "10%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(219,39,119,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "float3 12s ease-in-out infinite",
        }} />

        {/* Subtle grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }} />

        {/* Gallery title */}
        <div style={{
          position: "absolute",
          top: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: pageLoaded ? 1 : 0,
          transition: "opacity 1s ease 0.2s",
        }}>
          <p style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "clamp(8px, 0.8vw, 10px)",
            letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.2)",
            margin: 0,
            textTransform: "uppercase",
          }}>ÆTHER GALLERY — 2024</p>
        </div>

        {/* TOP ROW NAV */}
        <div style={{
          position: "absolute",
          top: "52px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "0 clamp(20px, 5vw, 80px)",
        }}>
          <NavLink label="MOST VISITED ARTWORK" onClick={() => navigate("most-visited-artwork-tl")} delay={200} />
          <NavLink label="MOST VISITED ARTWORK" onClick={() => navigate("most-visited-artwork-tc")} delay={300} />
          <NavLink label="MOST VISITED ARTIST" onClick={() => navigate("most-visited-artist")} delay={400} />
        </div>

        {/* MID LEFT NAV */}
        <div style={{
          position: "absolute",
          left: "clamp(20px, 5vw, 80px)",
          top: "50%",
          transform: "translateY(-50%)",
        }}>
          <NavLink label="MOST VISITED ARTWORK" onClick={() => navigate("most-visited-artwork-ml")} delay={500} />
        </div>

        {/* MID RIGHT NAV */}
        <div style={{
          position: "absolute",
          right: "clamp(20px, 5vw, 80px)",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "flex-end",
        }}>
          <NavLink label="FEATURED ARTIST" onClick={() => navigate("featured-artist")} delay={600} />
        </div>

        {/* CENTER CARD */}
        <CenterCard navigate={navigate} />

        {/* BOTTOM ROW NAV */}
        <div style={{
          position: "absolute",
          bottom: "clamp(24px, 4vh, 52px)",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "0 clamp(20px, 5vw, 80px)",
        }}>
          <NavLink label="MOST VISITED ARTWORK" onClick={() => navigate("most-visited-artwork-bl")} delay={700} />
          <NavLink label="MOST VISITED ARTWORK" onClick={() => navigate("most-visited-artwork-bc")} delay={800} />
          <NavLink label="TOP SELLING" onClick={() => navigate("top-selling")} delay={900} />
        </div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <FloatingParticle key={i} style={{
            left: `${10 + (i * 7.5) % 80}%`,
            top: `${15 + (i * 11.3) % 70}%`,
            animation: `pulse ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            opacity: pageLoaded ? 1 : 0,
            transition: `opacity 1s ease ${0.5 + i * 0.05}s`,
          }} />
        ))}

        {/* Bottom center label */}
        <div style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: pageLoaded ? 0.25 : 0,
          transition: "opacity 1.2s ease 1s",
        }}>
          <p style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "9px",
            letterSpacing: "0.3em",
            color: "#ffffff",
            margin: 0,
            textTransform: "uppercase",
          }}>HOVER CENTER TO EXPLORE</p>
        </div>
      </div>
    </>
  );
}