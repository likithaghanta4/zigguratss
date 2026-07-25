import { useEffect } from 'react'
import { gsap, ScrollTrigger } from './gsap'
import Lenis from 'lenis'

const useLenis = () => {

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05,
            duration: 5,
        })

        // Sync Lenis with ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        // Store function reference
        const raf = (time) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(raf) // now works correctly
            lenis.destroy()
        }
    }, [])

}

export default useLenis