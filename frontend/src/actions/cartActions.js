import axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actiontypes/cart";

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
export {addToCart, removeFromCart}