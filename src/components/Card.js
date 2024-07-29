import React, { useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { useState } from 'react';
import { useRef } from 'react';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();

    const priceRef = useRef();

    // options => key value pair => key : half/full, value : related price
    let options = props.options;
    let priceOptions = Object.keys(options);

    // frontend mein options mein by default ek option select hoga (eg . 1 aur half)
    // toh hame default value set karna padega using useState
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        let food = [];
        for(const item of data){
            if(item.id === props.foodItems._id){
                food=item;
                break;
            }
        }

        if(food !== []){
            if(food.size === size){
                await dispatch({ type: "UPDATE", id: props.foodItems._id, qty: qty, price: finalPrice });
                return ;
            }
            else if(food.size !== size){
                await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size });
                return ;
            }
            return ;
        }
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size });
    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />    {/* har ek tag ko close karna padega*/}
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItems.name}</h5>

                        {/* container gives mobile first approach */}
                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                                {/* inside curly braces it would be javascript always */}
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            // return ke ander html hain => agar js likhni hain to phir se curly braces lagane padenge
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })
                                }
                            </select>

                            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    )
                                })}
                            </select>

                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice} /-
                            </div>
                        </div>
                        <hr></hr>
                        <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
