import axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../actiontypes/cart";

const addToCart = (bookId, qty) => async (dispatch, getState) =>{
    try{
        const {data} = await axios.get("/api/books/" + bookId);
        dispatch({type: CART_ADD_ITEM, payload: {
            book : data._id,
            name: data.name,
            author: data.author,
            image: data.image,
            price:data.price,
            countInStock: data.countInStock,
            qty
        }});
        const {cart: {cartItems}} =getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
    catch (error){

    }
}
const removeFromCart = (bookId) => (dispatch, getState) =>{
    dispatch({type: CART_REMOVE_ITEM, payload: bookId});

    
    const {cart: {cartItems}} =getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING, payload: data });
}

const savePayment = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT, payload: data });
}
export {addToCart, removeFromCart, saveShipping, savePayment}