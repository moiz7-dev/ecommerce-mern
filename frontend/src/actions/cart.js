import axios from 'axios';
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cart";

// add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    
    const {data} = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

// remove from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}