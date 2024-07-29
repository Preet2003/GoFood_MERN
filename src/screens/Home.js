import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousal from '../components/Carousal'
import img1 from '../images/burger.jpg'
import img2 from '../images/momos.jpg'
import img3 from '../images/muffins.jpg'
import img4 from '../images/donut.jpg'
import img5 from '../images/hotdog.jpg'
import img6 from '../images/milkshake.jpg'
import img7 from '../images/sandwich.jpg'
import img8 from '../images/tacos.jpg'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Home() {

  // useState is a hook => it is used to create a state variable
  // useState returns an array with two values
  // first value is the state variable
  // second value is the function to update the state variable

  // intially given empty array as parameter and not object => because map function can be used with array
  const [search, setSearch] = useState([])
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])

  const loadData = async () => {
    let response = await fetch(`${backendUrl}/api/foodData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // response is a promise => to get the actual data, we use await
    // await is used to wait for the promise to resolve
    response = await response.json()

    // response[0] = foodItems
    // response[1] = foodCategories

    setFoodItems(response[0]);
    setFoodCat(response[1]);

    // console.log(response[0],response[1]);
  }

  // useEffect is a hook => it is used to run a function when the component is loaded
  // useEffect takes two parameters
  // first parameter is the function to run
  // second parameter is the array of dependencies
  // if the array is empty, the function runs only once
  // if the array has some values, the function runs whenever the values in the array change

  useEffect(() => {
    loadData()
  })

  return (
    <div>
      <div><Navbar /></div>

      {/* inline css is not allowed in react*/}
      {/* give style in form of key value pair inside two pair of curly braces */}
      {/* also write the key as camelCase => example : font-family => fontFamily */}

      <div>
        {/* carousal cannot be taken as a different component => reason in notebook */}
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain' }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
              </div>
            </div>
            <div className="img-box carousel-item active">
              <img src={img1} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="img-box carousel-item">
              <img src={img2} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="img-box carousel-item">
              <img src={img3} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="img-box carousel-item">
              <img src={img4} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="img-box carousel-item">
              <img src={img5} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="img-box carousel-item">
              <img src={img6} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="img-box carousel-item">
              <img src={img7} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="img-box carousel-item">
              <img src={img8} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
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

      {/* this card div is gonna be used many times => make it a component => Card.js */}
      <div className='container'>
        {/* react mein return pehle execure hota hain phir render hota hain aur upar vali lines dekhi jaati hain */}
        {/* isliye yaha default value set karna padega => using if else or ternary operator */}
        {
          // foodCat contains three data thus populate three times
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                  <hr />
                  {foodItems !== [] ? foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleString())))
                    .map(filterItems => {
                      return (
                        // bootstrap grid system => 12 columns
                        // col-12 => for mobile => each row only one card
                        // col-md-6 => for medium devices => two cards in each row
                        // col-lg-3 => for large devices => four cards in each row
                        // col-xl-1 => for extra large devices => twelve cards in each row
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          {/* we got the count of items same as database from above code */}
                          {/* now we want the exact data of each item */}
                          {/* thus we use props => pass the data as props */}
                          {/* props are like arguments to a function */}
                          {/* props are passed as key value pairs */}
                          {/* <Card foodName={filterItems.name}
                            options={filterItems.options[0]}
                            imgSrc={filterItems.img}></Card> */}

                          {/* passing the whole object as props */}
                          <Card foodItems={filterItems}
                            options={filterItems.options[0]}></Card>
                        </div>
                      )
                    }) : <div>Not Found</div>}
                </div>
              )
            })
            : <div>Not Found</div>
        }
      </div>

      <div><Footer></Footer></div>
    </div>
  )
}
