import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING, USER_EMPTYCART } from "../actiontypes/cart";

function cartReducer(state= {cartItems:[], shipping:{}, payment:{}}, action) {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x=> x.book === item.book);
            if(product){
                return {...state, cartItems: state.cartItems.map(x => x.book === product.book?item: x)};
            }
            return {...state, cartItems: [...state.cartItems, item] };
        case CART_REMOVE_ITEM:
            return{ cartItems: state.cartItems.filter(x => x.book!== action.payload)}
        case CART_SAVE_SHIPPING:
            return {...state, shipping: action.payload};
        case CART_SAVE_PAYMENT:
            return {...state, payment: action.payload};
        case USER_EMPTYCART:
            return {cartItems: []};
        default:
            return state
            
    }
}

export {cartReducer}