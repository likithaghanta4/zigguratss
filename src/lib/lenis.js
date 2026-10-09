import { useEffect } from 'react'

/**
 * Global smooth scroll is unified and managed at the root by SmoothScroll in App.jsx.
 * useLenis is kept as a safe pass-through hook to prevent redundant competing instances.
 */
const useLenis = () => {
    useEffect(() => {
        // No-op: global instance in SmoothScroll handles window smooth scrolling
    }, [])
}

export default useLenis