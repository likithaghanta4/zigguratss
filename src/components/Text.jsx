import { useGSAP, gsap, ScrollTrigger } from '../lib/gsap'
import React, { useRef } from 'react'
import New from './New'
import { useLenis } from 'lenis/react'
import HoverText from './HoverText'
import ParellexImage from './ParallexImage'
import '../styles/ParellexImage.css'
import ProjectCard from './ProjectCard'
import { use } from 'framer-motion/m'

const Text = () => {

    const projects = [{
        image1: 'https://plus.unsplash.com/premium_photo-1677609991615-0657859f0a8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGFydHxlbnwwfHwwfHx8MA%3D%3D',
        image2: 'https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail-1280x960.jpg'
    }, {
        image1: 'https://k72.ca/uploads/caseStudies/OKA/OKA_thumbnail-1280x960.jpg',
        image2: 'https://k72.ca/uploads/caseStudies/Opto/thumbnailimage_opto-1280x960.jpg'
    }, {
        image1: 'https://k72.ca/uploads/caseStudies/LAMAJEURE_-_Son_sur_mesure/chalaxeur-thumbnail_img-1280x960.jpg',
        image2: 'https://k72.ca/uploads/caseStudies/SHELTON/thumbnailimage_shelton-1280x960.jpg'
    }]

    const HeroText1 = useRef(null)
    const HeroText2 = useRef(null)
    const boxRef = useRef(null)
    const imgRef = useRef(null)
    const movingTextRef = useRef(null)
    const movingTextParentRef = useRef(null)
    const HeyRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline()

        tl.to(HeroText1.current, {
            x: -100,
            scale: 0.8,
            scrollTrigger: {
                trigger: HeroText1.current,
                // markers: true,
                start: 'top 40%',
                end: 'top -10%',
                scrub: true,
                pin: true,

            }
        }, 'anim')

        tl.to(HeroText2.current, {

            x: 100,
            scale: 0.8,
            scrollTrigger: {
                trigger: HeroText2.current,
                // markers: true,
                start: 'top 40%',
                end: 'top -10%',
                scrub: true,
                pin: true,

            }
        }, 'anim')

        // img parent box
        tl.from(boxRef.current, {
            scale: 0,
            scrollTrigger: {
                trigger: HeroText1.current,
                // markers: true,
                start: 'top 60%',
                end: 'top 0%',
                scrub: true,
            }
        }, 'anim')

        // img animation
        tl.to(imgRef.current, {
            y: 200, // jitna zyada value utna strong parallax
            ease: "none",
            scrollTrigger: {
                trigger: boxRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        }, 'anim')

        gsap.to(movingTextRef.current, {
            transform: "translateX(-120%)",
            scrollTrigger: {
                trigger: movingTextParentRef.current,
                // markers: true,
                start: "top 0%",
                end: "top -150%",
                scrub: 2,
                pin: true,
            }
        })

        gsap.utils.toArray('.elem img').forEach((img) => {
            gsap.from(img, {
                y: 120,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: 'top 80%',
                    end: 'top -30%',
                    scrub: true,
                    markers: true
                }
            })
        })



    })




    useGSAP(function () {
        gsap.from('.hero', {
            height: '100px',
            stagger: {
                amount: 0.4
            },
            scrollTrigger: {
                trigger: '.lol',
                start: 'top 100%',
                end: 'top -150%',
                scrub: true
            }
        })
    })

    return (
        <>
            <div className='min-h-screen w-full bg-red-'>
                <div className=' text-[12vw] leading-50 flex justify-center mt-100  '>
                    <h1 className='z-1  uppercase  ' ref={HeroText1}>Origin&nbsp;</h1>
                    <h1 className='z-1  uppercase  ' ref={HeroText2}>Objects</h1>
                </div>

                <div ref={boxRef} className=' w-full h-[100vh] z-0 overflow-hidden relative '>
                    <img
                        ref={imgRef}
                        className='w-full h-full object-cover rounded-4xl'
                        src="https://plus.unsplash.com/premium_photo-1702598266938-e1b0d722fbf2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>


                <div className='bg-black h-[100vh] flex justify-center items-center z-4'>
                    <HoverText />
                </div>

                {/* Moving Text */}
                <div ref={movingTextParentRef} className='h-[100vh] w-full bg-blue-300  overflow-x-hidden'>
                    <h2 ref={movingTextRef} className='text-[30vw] font-medium uppercase font-light'>Experiences</h2>
                </div>

                {/* parallax image */}
                {/* <div className='h-[100vh] bg-pink-300  w-full '>
                    <div id="page2">
                        <div id="elem1" className="elem rounded-3xl">
                            <img src="https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                        </div>

                        <div id="elem2" className="elem rounded-3xl">
                            <img src="https://images.unsplash.com/photo-1548811579-017cf2a4268b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFydHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                        </div>

                        <div id="elem3" className="elem rounded-3xl">
                            <img src="https://plus.unsplash.com/premium_photo-1677609898243-63280b6c89a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGFydHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                        </div>
                    </div>
                </div> */}

                <div className='w-full h-[] '>
                    <div className='lg:p-4 p-2 mb-[100vh]'>
                        <div className=' pt-[45vh]'>
                            <h2 className='font-[font2] lg:text-[9.5vw] text-7xl uppercase'>art</h2>
                        </div>
                        <div className='-lg:mt-20 lol'>
                            {projects.map(function (elem, idx) {
                                return <div key={idx} className='hero w-full lg:h-[850px] mb-4 flex lg:flex-row flex-col lg:gap-4 gap-2'>
                                    <ProjectCard image1={elem.image1} image2={elem.image2} />
                                </div>
                            })}

                        </div>
                    </div>
                </div>

                <div className='h-[100vh] w-full '>

                </div>

            </div>



        </>
    )
}

export default Text