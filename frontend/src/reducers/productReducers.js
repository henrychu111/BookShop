import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from "../constants/productConstants"; 

function productListReducer(state= {books: [] }, action) {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return{loading: true};
        case PRODUCT_LIST_SUCCESS:
            return{loading:false, books: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function productDetailsReducer(state= {book: {} }, action) {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return{loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return{loading:false, book: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {productListReducer, productDetailsReducer}