import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import { bookDeleteReducer, bookDetailsReducer, bookListReducer, bookSaveReducer } from './reducers/bookReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {cartReducer} from './reducers/cartReducers'
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON("cartItems")  || [];
const userInfo = Cookie.getJSON("userInfo")  || null;

const initialState= {cart: {cartItems, shipping: {}, payment: {}}, userSignin:{userInfo}};
const reducer = combineReducers({
    booksList: bookListReducer,    
    bookDetails: bookDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    bookSave: bookSaveReducer,
    bookDelete: bookDeleteReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;