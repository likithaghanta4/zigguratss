import React, { useState, useEffect } from "react";
import '../styles/HoverText.css';
import { useNavigate } from "react-router-dom";

const data = [
    {
        num: "01",
        title: "Our Artist",
        img: "https://plus.unsplash.com/premium_photo-1676496046182-356a6a0ed002?q=80&w=1200",
        path: "/artist"

    },
    {
        num: "02",
        title: "Design Carousel",
        img: "https://images.unsplash.com/photo-1773332589460-5a5d43c80f5b?q=80&w=1200",
        path: "/carousel"
    },
    {
        num: "03",
        title: "Featured Artworks",
        img: "https://images.unsplash.com/photo-1770215962799-5ac2ce5a2813?q=80&w=1200",
        path: "/slider"
    },
    {
        num: "04",
        title: "Artwork Collection",
        img: "https://plus.unsplash.com/premium_photo-1722018576626-dc10f32a86f4?q=80&w=1200",
        path: "/collection"
    },

];

const TICKER = [
    "Creative Direction",
    "Digital Design",
    "Art Direction",
    "Best Sellers",
    "Featured Artworks",
];


const HoverText = () => {

    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(null);
    const bgIndex = activeIndex !== null ? activeIndex : 0;

    useEffect(() => {
        data.forEach(({ img }) => {
            const image = new Image();
            image.src = img;
        });
    }, []);

    return (
        <div className="ht-page">

            {/* ─── Background crossfade layers ─── */}
            <div className="ht-bg-wrap">
                {data.map((item, i) => (
                    <div
                        key={i}
                        className={`ht-bg-layer ${bgIndex === i ? "ht-bg-layer--on" : ""}`}
                        style={{ backgroundImage: `url(${item.img})` }}
                    />
                ))}
            </div>

            {/* ─── Vignette ─── */}
            <div className="ht-vignette" />

            {/* ─── Menu list ─── */}
            <nav className="ht-menu">

                {data.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <div
                            key={index}
                            className={`ht-row ${isActive ? "ht-row--active" : ""}`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            onClick={() => item.path && navigate(item.path)}
                        >
                            {/* Top border line */}
                            <div className="ht-rule" />

                            {/* ── Yellow ticker strip (BEHIND text) ── */}
                            <div className="ht-ticker" aria-hidden="true">
                                <div className="ht-ticker-shine" />
                                {/*
                                    Single animated inner wrapper.
                                    2 identical copies side-by-side → animate -50% for seamless loop.
                                */}
                                <div className="ht-ticker-inner">
                                    {[0, 1].map((copy) => (
                                        <div className="ht-ticker-track" key={copy}>
                                            {TICKER.map((word, wi) => (
                                                <React.Fragment key={wi}>
                                                    <span className="ht-ticker-word">{word}</span>
                                                    <span className="ht-ticker-dot">◆</span>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── Main clickable row (ABOVE ticker) ── */}
                            <div className="ht-row-inner">

                                {/* Left: index number */}
                                <span className="ht-num">{item.num}</span>

                                {/* Center: animated title */}
                                <h2 className="ht-title">
                                    {item.title.split("").map((char, i) => (
                                        <span
                                            key={i}
                                            className="ht-letter"
                                            style={{ "--idx": i }}
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </span>
                                    ))}
                                </h2>

                                {/* Right: arrow */}
                                <span className="ht-arrow">↗</span>
                            </div>

                        </div>
                    );
                })}

                {/* Bottom border line */}
                <div className="ht-rule" />
            </nav>
        </div>
    );
};

export default HoverText;