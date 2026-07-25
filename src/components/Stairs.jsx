import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'

const Stairs = (props) => {

    const currentPath = useLocation()
    // console.log(currentPath);


    const stairParent = useRef(null)
    const pageRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline()

        tl.to(stairParent.current, {
            display: 'block'
        })

        tl.from('.stair', {
            height: 0,
            stagger: {
                amount: -0.25
            }
        })

        tl.to('.stair', {
            y: '100%',
            stagger: {
                amount: -0.25
            }
        })

        tl.to(stairParent.current, {
            display: 'none'
        })

        tl.to('.stair', {
            y: '0%',
        })

        // page ref
        gsap.from(pageRef.current, {
            opacity: 0,
            delay: 1.3,
            scale:1.2
        })


    }, [currentPath])


    return (
        <div>
            <div ref={stairParent} className='h-screen w-full fixed z-10 top-0'>
                <div className='h-screen w-full flex '>
                    <div className=' stair h-full w-1/5 bg-black '></div>
                    <div className=' stair h-full w-1/5 bg-black '></div>
                    <div className=' stair h-full w-1/5 bg-black '></div>
                    <div className=' stair h-full w-1/5 bg-black '></div>
                    <div className=' stair h-full w-1/5 bg-black '></div>
                </div>
            </div>

            <div ref={pageRef}>
                {props.children}
            </div>


        </div>
    )
}

export default Stairs