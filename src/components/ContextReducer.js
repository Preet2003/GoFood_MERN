// This file contains the context and reducer for the application
// The context is used to store the state of the application
// The reducer is used to update the state of the application
// The context and reducer are used to manage the state of the application

import React, { useContext, useReducer } from 'react'
import { createContext } from 'react';

// global state => can be reached from any component
const CartStateContext = createContext();

// dispatch => function to update the state
// we want to use reducer in place of useState
// useReducer => has a dispatch function
const CartDispatchContext = createContext();

// dispatch => multiple functions to update the state
const reducer = (state, action) => {
    // use switch case to check the action type
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size, img: action.img }];

        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;

        case "UPDATE":
            let arr = [...state];
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price);
                    arr[index] = { ...food, qty: food.qty + parseInt(action.qty), price: action.price + food.price };
                }
                return arr
            })
            return arr

        case "DROP":
            let emptyArray = [];
            return emptyArray;

        default:
            console.log('Error in reducer');
    }
}

// children => all the components that are wrapped inside the provider
export const CartProvider = ({ children }) => {

    // two parameters => initial value of the state and the dispatch function
    // useReducer => returns the state and the dispatch function => here initial state = [] and dispatch function = reducer
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

// export the context
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
