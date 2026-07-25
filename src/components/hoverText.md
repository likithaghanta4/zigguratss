import React, { use } from 'react'
import '../styles/HoverText.css'

const HoverText = () => {

    var elems = document.querySelectorAll('.elem')

    var page2 = document.querySelector('.page2')

    elems.forEach(function (ele) {
        ele.addEventListener('mouseenter', function () {
            var bgimg = ele.getAttribute('data-img')
            page2.style.backgroundImage = `url(${bgimg})`
        })
    })

    return (
        <div className="page2 w-full h-[100vh] text-white  flex flex-col justify-center items-center text-center bg-cover bg-center">
            <div className='elem  w-full relative  ' data-img="https://plus.unsplash.com/premium_photo-1676496046182-356a6a0ed002?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                <h2 className=''>Our Artist</h2>
                <div className="moving">
                    <div className='blur'></div>
                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>

                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>

                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>
                </div>
            </div>

            <div className='elem  w-full relative  ' data-img="https://images.unsplash.com/photo-1773332589460-5a5d43c80f5b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                <h2 className=''>Best Sellers</h2>
                <div className="moving">
                    <div className='blur'></div>
                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>

                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>

                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>
                </div>
            </div>

            <div className='elem  w-full relative  ' data-img="https://images.unsplash.com/photo-1770215962799-5ac2ce5a2813?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                <h2 className=''>Featured Artworks</h2>
                <div className="moving">
                    <div className='blur'></div>
                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>

                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>

                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>
                </div>
            </div>

            <div className='elem  w-full relative  ' data-img="https://plus.unsplash.com/premium_photo-1722018576626-dc10f32a86f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                <h2 className=''>Artwork collection</h2>
                <div className="moving">
                    <div className='blur'></div>
                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>

                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>

                    <div className="moving-in">
                        <h5> Creative Direction</h5>
                        <h5> Digital Design</h5>
                        <h5> Art Direction</h5>
                        <h5> Best Sellers</h5>
                        <h5> Featured Artworks</h5>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HoverText

<!-- css -->

.elem {
width: 100%;
position: relative;
line-height: 5vw;

}

.elem .moving .blur {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 40%;
height: 100%;
background: linear-gradient(to right, rgba(255, 255, 0, 0.95), yellow, rgba(255, 255, 0, 0.858));
box-shadow: 10px 0px 20px 20px yellow, -10px 0px 20px 100px yellow;
z-index: 8;
}

.elem h2 {
font-size: 6.8vw;
text-transform: uppercase;
position: relative;
font-weight: 400;
z-index: 9;
line-height: 5vw;
cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

}

.elem .moving {
background-color: yellow;
width: 100%;
white-space: nowrap;
position: absolute;
top: 50%;
transform: translate(0, -45%) scaleY(0);
transition: all ease 0.3s;
overflow: hidden;

}

.elem .moving .moving-in {

    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    display: inline-block;
    animation-name: moving;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

}

.elem .moving .moving-in h5 {
color: black;
display: inline-block;
text-transform: uppercase;
font-size: 15px;
transition: all ease 0.3s;
transition-delay: 0.2s;
opacity: 0;
font-family: 'lato';
margin-right: 30px;
font-weight: 400;
}

@keyframes moving {
from {
transform: translateX(0)
}

    to {
        transform: translateX(-100%)
    }

}

.elem:hover .moving {
transform: translate(0, -45%) scaleY(1);
}

.elem:hover .moving h5 {
opacity: 1;

}

.elem:hover h2 {
font-style: italic;
}
