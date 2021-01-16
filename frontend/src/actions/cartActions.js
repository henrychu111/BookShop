import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch) =>{

    try{
        const {data} = await axios.get("/api/books/" + productId);
        dispatch({type: CART_ADD_ITEM, payload: {
            book : data._id,
            name: data.name,
            author: data.author,
            image: data.image,
            price:data.price,
            countInStock: data.countInStock,
            qty
        }})
    }
    catch (error){

    }
}
const removeFromCart = (productId) => dispatch =>{
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
}
export {addToCart, removeFromCart}