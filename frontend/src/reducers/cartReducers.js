import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

function cartReducer(state= {cartItems:[]}, action) {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x=> x.product === item.product);
            if(product){
                return {...state, cartItems: state.cartItems.map(x => x.prouduct === product.product?product: x)
            };
        }
            return {...state, cartItems: [...state.cartItems, item] };
        case CART_REMOVE_ITEM:
            return{ cartItems: state.cartItems.filter(x => x.book!== action.payload)}
        default:
            return state
            
    }
}

export {cartReducer}