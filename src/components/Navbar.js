import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import { useState } from 'react'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'

export default function Navbar() {

    const [cartView, setCartView] = useState(false);

    // to keep the total count of number of items in MyCart => dynamic
    let data = useCart();

    const navigate = useNavigate();

    const handleLogout = () => {
        // remove the token from local storage
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        // class should not be used as it is a reserved keyword in JS
        // instead use className

        // anchor tag doesnot work in react

        // # in href returns to the same page
        // instead use / to go to the home page

        // here when you click on any thing in the navbar => the page will reload => it will not be a single page application anymore
        // main aim of react is to avoid reloading of the page
        // to avoid this use react-router-dom

        // router dom => Link tag in place of anchor tag and to in place of href => stop page reloading
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>

                            {/* agar mein logged in hu to my orders dikhe */}
                            {(localStorage.getItem('authToken')) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                                : ""}
                        </ul>

                        {/* jab authToken na ho to login aur signup button dikhe */}
                        {(!localStorage.getItem('authToken')) ?
                            <div className='d-flex'>

                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-success mx-2' onClick={()=>setCartView(true)}>
                                    My Cart {" "}
                                    <Badge pill bg="danger">{data.length}</Badge>
                                </div>
                                {cartView ? <Modal onClose= {()=>setCartView(false)}><Cart/></Modal> : null } 
                                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
