import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const STAIR_COUNT = 5

const PageTransition = ({ children }) => {
    const { pathname } = useLocation()

    const overlayRef = useRef(null)
    const fadeRef = useRef(null)   // ← simple opacity fade, no scale/transform
    const stairsRef = useRef([])

    const setStairRef = useCallback((el, i) => {
        stairsRef.current[i] = el
    }, [])

    useGSAP(() => {
        const stairs = stairsRef.current
        const overlay = overlayRef.current
        const fade = fadeRef.current

        // reset fade to visible before animation starts
        gsap.set(fade, { opacity: 1 })

        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            onStart: () => {
                document.body.style.overflow = 'hidden'
                gsap.set(overlay, { display: 'flex' })
            },
            onComplete: () => {
                document.body.style.overflow = ''
                gsap.set(overlay, { display: 'none' })
                gsap.set(stairs, { y: '0%', scaleY: 1 })
                ScrollTrigger.refresh()   // ← recalculate all trigger positions
            },
        })

        // stairs enter
        tl.from(stairs, {
            scaleY: 0,
            transformOrigin: 'top center',
            duration: 0.5,
            stagger: { amount: 0.25, from: 'end' },
        })

        // stairs exit
        tl.to(stairs, {
            y: '100%',
            duration: 0.5,
            stagger: { amount: 0.25, from: 'end' },
        })

        // fade away the white overlay (no scale/transform on page)
        gsap.to(fade, {
            opacity: 0,
            duration: 0.5,
            delay: 0.45,
            ease: 'power2.out',
        })

        return () => {
            tl.kill()
            gsap.killTweensOf(fade)
            document.body.style.overflow = ''
        }
    }, [pathname])

    return (
        <>
            {/* stair overlay */}
            <div
                ref={overlayRef}
                style={{ display: 'none' }}
                className="fixed inset-0 z-50 flex pointer-events-none"
            >
                {Array.from({ length: STAIR_COUNT }, (_, i) => (
                    <div
                        key={i}
                        ref={(el) => setStairRef(el, i)}
                        className="h-full bg-black"
                        style={{ width: `${100 / STAIR_COUNT}%` }}
                    />
                ))}
            </div>

            {/* fade overlay — opacity only, never transforms page content */}
            <div
                ref={fadeRef}
                className="fixed inset-0 z-40 bg-white pointer-events-none"
                style={{ opacity: 1 }}
            />

            {/* page content — never wrapped in any transform */}
            {children}
        </>
    )
}

export default PageTransition