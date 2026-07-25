import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const CardStack = () => {
    const containerRef = useRef(null)
    const cardsRef = useRef([])

    useEffect(() => {
        const cards = cardsRef.current

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%", // 🔥 scroll distance
                scrub: true,
                pin: true,
            }
        })

        cards.forEach((card, i) => {
            if (i !== 0) {
                tl.fromTo(card,
                    {
                        y: 100,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1
                    }
                )
            }
        })

    }, [])

    return (
        <section ref={containerRef} className="h-screen flex items-center justify-center relative">
            {[1, 2, 3, 4].map((item, index) => (
                <div
                    key={index}
                    ref={el => cardsRef.current[index] = el}
                    className="card absolute w-80 h-96 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl"
                    style={{ zIndex: 4 - index }}
                >
                    Card {item}
                </div>
            ))}
        </section>
    )
}

export default CardStack