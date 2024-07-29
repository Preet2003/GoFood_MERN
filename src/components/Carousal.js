//=========================================== no need delete it ===========================================// 

import React from 'react'
import img1 from '../images/burger.jpg'
import img2 from '../images/momos.jpg'
import img3 from '../images/muffins.jpg'
import img4 from '../images/donut.jpg'
import img5 from '../images/hotdog.jpg'
import img6 from '../images/milkshake.jpg'
import img7 from '../images/sandwich.jpg'
import img8 from '../images/tacos.jpg'

export default function Carousal() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:'contain'}}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="img-box carousel-item active">
                        <img src={img1} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
                    </div>
                    <div className="img-box carousel-item">
                        <img src={img2} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                    <div className="img-box carousel-item">
                        <img src={img3} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                    <div className="img-box carousel-item">
                        <img src={img4} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                    <div className="img-box carousel-item">
                        <img src={img5} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                    <div className="img-box carousel-item">
                        <img src={img6} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                    <div className="img-box carousel-item">
                        <img src={img7} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                    <div className="img-box carousel-item">
                        <img src={img8} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}


//=========================================== no need delete it ===========================================// 