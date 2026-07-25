
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "../styles/ProductSlider.css";
import ProductDesc from "./ProductDesc";
import { useEffect } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import useLenis from '../lib/lenis'



const products = [
    {
        title: "Moksham gachami",
        desc: "Depicting way to peace on path of lord Buddha ",
        price: "SOLD",
        size: '36 × 36 inch (91.44 × 91.44 cm)',
        category: 'Abstract Painting',
        artist: ' Pradip Sarkar, India',
        img: "https://zigguratss.com/assets/upload/art-963.jpeg",
    },
    {
        title: "Suramyaa",
        desc: "Depicting Krishna Radha love towards cows",
        price: " 43750/-",
        size: '36 × 36 inch (91.44 × 91.44 cm)',
        category: 'Abstract Painting',
        artist: ' Pradip Sarkar, India',
        img: "https://zigguratss.com/assets/upload/art-960.jpeg",
    },
    {
        title: "Shepherd",
        desc: "I had just stepped out into a new world as my first solo traveller. So many questions in my head, i was beginning to feel overwhelmed by all the insecurities and confusions. As i was walking thtough this small tree cover through a Rajasthan. I suddnenly noticed a flock of sheeps walking past me, a shephered brushed past me and ran towards a ditch on the open field. For some reason i felt a pang of energy within me, i followed him and the sheeps, and next moment i knew, i was running behind them, taking hold of that one moment. After that euphoria, I realised all my insecurities and confusions had been replaced into a sense of wonder and love for adventure. This was the reason i left home. Realising again, I am in God's own lap forever. ",
        price: "226200/-",
        size: '36 × 36 inch (91.44 × 91.44 cm)',
        artist: ' Pradip Sarkar, India',
        category: 'Abstract Painting',
        img: "https://zigguratss.com/assets/upload/art-1087.jpg",
    },
    {
        title: "Celibration-7",
        desc: "Celibration-7",
        price: " 169000/-",
        size: '36 × 36 inch (91.44 × 91.44 cm)',
        category: 'Abstract Painting',
        artist: ' Pradip Sarkar, India',
        img: "https://zigguratss.com/assets/upload/art/zigguratss_df2895a67970247c650c120119df4d70.jpg",
    },
    {
        title: "Milano e le storie sulla Darsena",
        desc: "La Darsena, un antico bacino portuale situato nel quartiere Navigli di Milano, sia un luogo simbolico che rappresenta la storia legata all'acqua della città. Il cuore liquido di Milano, rappresenta, così, la connessione tra il passato storico e l'attualità della città, testimoniando l'importanza che l'acqua ha avuto nella sua evoluzione. La sua riqualificazione ha contribuito a valorizzare questo patrimonio e a creare uno spazio pubblico vivace e attrattivo.",
        price: "175000/-",
        size: '36 × 36 inch (91.44 × 91.44 cm)',
        category: 'Abstract Painting',
        artist: ' Pradip Sarkar, India',
        img: "https://zigguratss.com/assets/upload/art-361.jpg",
    },
    {
        title: "Eternal Grace",
        desc: "This artwork places the peacock within an opulent interior, blending natural beauty with architectural grandeur. The ornate pillars, vessels, and carved furniture symbolize heritage and cultural richness, while the peacock embodies grace, pride, and divine elegance — as though nature itself has claimed the palace. In halls carved with time, the peacock stands — not as a visitor, but as royalty returned. Its feathers spill like silk, guarding stories older than the walls.",
        price: " 68750/-",
        size: '36 × 36 inch (91.44 × 91.44 cm)',
        category: 'Abstract Painting',
        artist: ' Pradip Sarkar, India',
        img: "https://zigguratss.com/assets/upload/art/zigguratss_40ab5c59106bbfaa3de56dc5194fcfc0.jpeg",
    },
    {
        title: "Tranquil Awakening",
        desc: "Tranquil Awakening embodies the serene beauty and transformative power of meditation in today’s fast-paced, chaotic world. This soothing artwork centers on a meditative figure radiating calmness and introspection. Her closed eyes and gentle posture reflect a deep connection to her inner self, symbolized by the radiant white lotus on her forehead—a timeless emblem of purity, enlightenment, and rebirth..",
        price: " 13750/-",
        size: '36 × 36 inch (91.44 × 91.44 cm)',
        category: 'Abstract Painting',
        artist: ' Pradip Sarkar, India',
        img: "https://zigguratss.com/assets/upload/art-1259.jpg",
    },
];

export default function ProductSlider() {

    useLenis()
    const containerRef = useRef();

    // text animation code
    const animateText = () => {
        const activeSlides = document.querySelectorAll(".swiper-slide-visible");

        activeSlides.forEach((slide) => {
            const title = slide.querySelector(".art-title");
            const metaLines = slide.querySelectorAll(".art-meta p");
            const desc = slide.querySelector(".art-description");
            const price = slide.querySelector(".price");
            const btn = slide.querySelector(".cart-explore-btn");

            gsap.killTweensOf([title, ...metaLines, desc, price, btn]);

            // Force override every possible CSS hiding
            [...metaLines].forEach(el => {
                el.style.cssText += ";opacity:0!important;visibility:visible!important;display:block!important;";
            });

            gsap.set(title, { clipPath: "inset(0 100% 0 0)", opacity: 1, visibility: "visible" });
            gsap.set(desc, { opacity: 0, y: 20, filter: "blur(4px)", visibility: "visible" });
            gsap.set(price, { opacity: 0, scale: 0.6, y: 10, visibility: "visible" });
            gsap.set(btn, { opacity: 0, y: 40, visibility: "visible" });

            // Title
            gsap.to(title, {
                clipPath: "inset(0 0% 0 0)", duration: 0.9, delay: 0.6, ease: "expo.inOut"
            });

            // Meta lines — direct style force + gsap
            [...metaLines].forEach((line, i) => {
                gsap.fromTo(line,
                    { x: -60, opacity: 0, clipPath: "inset(0 100% 0 0)" },
                    { x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", delay: 0.8 + i * 0.15, duration: 0.7, ease: "expo.out" }
                );
            });

            // Description
            gsap.to(desc, {
                opacity: 1, filter: "blur(0px)", y: 0, delay: 0.8, duration: 0.7, ease: "power3.out"
            });

            // Price
            gsap.to(price, {
                scale: 1, opacity: 1, y: 0, delay: 1.0, duration: 0.5, ease: "back.out(2)"
            });

            // Button
            gsap.to(btn, {
                y: 0, opacity: 1, delay: 1.15, duration: 0.55, ease: "expo.out"
            });
        });
    };

    // btn animation
    useEffect(() => {
        const buttons = document.querySelectorAll(".explore-btn, .buy-now");

        const handleEnter = (e) => {
            const btn = e.currentTarget;
            gsap.to(btn, { y: -4, duration: 0.3 });
            gsap.to(btn, { "--x": "0%", duration: 0.4 });
        };

        const handleLeave = (e) => {
            const btn = e.currentTarget;
            gsap.to(btn, { y: 0, duration: 0.3 });
        };

        buttons.forEach((btn) => {
            btn.addEventListener("mouseenter", handleEnter);
            btn.addEventListener("mouseleave", handleLeave);
        });

        return () => {
            buttons.forEach((btn) => {
                btn.removeEventListener("mouseenter", handleEnter);
                btn.removeEventListener("mouseleave", handleLeave);
            });
        };
    }, []);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;';
        const slider = document.querySelector('.product-slider');
        slider.style.position = 'relative';
        slider.prepend(canvas);

        const ctx = canvas.getContext('2d');
        const W = canvas.width = slider.offsetWidth;
        const H = canvas.height = slider.offsetHeight;

        const rand = (a, b) => a + Math.random() * (b - a);

        function inkBlob(x, y, r, color, alpha) {
            const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
            grad.addColorStop(0, color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
            grad.addColorStop(0.45, color + Math.round(alpha * 0.5 * 255).toString(16).padStart(2, '0'));
            grad.addColorStop(1, color + '00');
            ctx.fillStyle = grad;
            ctx.beginPath();
            const wobble = r * 0.35;
            for (let i = 0; i <= 14; i++) {
                const angle = (i / 14) * Math.PI * 2;
                const rr = r + rand(-wobble, wobble);
                const px = x + rr * Math.cos(angle);
                const py = y + rr * Math.sin(angle);
                i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
        }

        ctx.fillStyle = '#0c1918';
        ctx.fillRect(0, 0, W, H);

        inkBlob(W * 0.1, H * 0.3, H * 0.55, '#146446', 0.7);
        inkBlob(W * 0.78, H * 0.45, H * 0.5, '#640F23', 0.65);
        inkBlob(W * 0.48, H * 0.18, H * 0.45, '#0A1950', 0.6);
        inkBlob(W * 0.42, H * 0.55, H * 0.3, '#A07820', 0.25);
        inkBlob(W * 0.5, H * 0.5, H * 0.6, '#050810', 0.35);

        const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, 'rgba(0,0,0,0.65)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);

        return () => canvas.remove();
    }, []);
    return (

        <div className='product-slider'>
            <main ref={containerRef} className="main-container">

                <div className="slider-heading">
                    <h1>
                        {"Featured ArtWorks".split(" ").map((word, i) => (
                            <span key={i}>{word}&nbsp;</span>
                        ))}
                    </h1>
                </div>

                <div className="logo">
                    {/* <h1>
                        <img src="https://zigguratss.com/assets/upload/daf46078cec518ef7578288b9247f153.png" alt="" />
                     </h1> */}
                </div>

                <Swiper

                    modules={[Mousewheel]}
                    loop={true}
                    mousewheel={true}
                    slidesPerView={4}
                    speed={1500}
                    spaceBetween={4}
                    watchSlidesProgress={true}
                    onInit={(swiper) => animateText(swiper)}
                    onSlideChange={(swiper) => animateText(swiper)}
                    className="mySwiper"

                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 4,
                        }
                    }}
                >

                    {products.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="slide-content">

                                <div className="info">

                                    <h2 className="art-title" data-original={item.title}>
                                        {item.title}
                                    </h2>
                                    <div className="art-meta">
                                        <p><strong>Artist : </strong>{item.artist}</p>
                                        <p><strong>Category : </strong> {item.category} </p>
                                        <p><strong>Size : </strong>{item.size} </p>
                                    </div>

                                    {/* <div className="art-description">
                                        <p className="desc-title"><strong>Description</strong></p>
                                        <ProductDesc text={item.desc} className="product-desc" />
                                    </div> */}

                                </div>

                                <div className="price">Price:{item.price}</div>

                                <div className="cart-explore-btn">
                                    {/* <button className="explore-btn">
                                        <span>Explore more</span>
                                    </button> */}
                                    <button className="buy-now">view more</button>
                                </div>

                            </div>

                            <div className="slide-img">
                                <img src={item.img} alt="" />
                            </div>

                            <div className="slide-img-blur">
                                <img src={item.img} alt="" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </main>
        </div>
    );
}