import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

function Cart(props){

    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;
    // console.log(cartItems);

    const bookId = props.match.params.id;
    const qty = props.location.search?  Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (bookId) => {
        dispatch(removeFromCart(bookId))
    }

    useEffect(() => {
        if(bookId) {
            dispatch(addToCart(bookId, qty));
        }
    }, []);

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }

    return <div className="cart">
        <div className="cart-list">
            <ul className='cart-list-container'>
                <li>
                    <h3>
                        Shopping Cart
                    </h3>
                    <div>
                        Price
                    </div>
                </li>
                {
                    cartItems.length ===0 ?
                    <div>
                        Cart is empty
                    </div>
                    :
                    cartItems.map( item =>
                        <li><div className="cart-image">
                            <img src={item.image} alt='book' /></div>
                            <div className='cart-name'>
                                <div>
                                    <Link to={'/book/' + item.book}>
                                    {item.name}
                                    </Link>
                                </div>
                                <div style={{marginTop: "10px"}}>
                                    Quantity:
                                    <select value ={item.qty} onChange={(e) => dispatch(addToCart(item.book, e.target.value))} className='cart-screen-selector'>
                                    {[...Array(item.countInStock).keys()].map(x => 
                                    <option value = {x+1}>{x+1}</option>)}
                                    </select>
                                    <button type='button' className='button' onClick={() => removeFromCartHandler(item.book)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="cart-price">
                                ${item.price}
                            </div></li>
                        )
                }
            </ul>
        </div>
        <div className='cart-action'>
            <h3 className="subtotal">
                Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                :
                <br></br>
                $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
           <button onClick={checkoutHandler} className='button-primary' disabled= {cartItems.length === 0}>
               Proceed to Checkout
           </button>
        </div>
    </div>
}

export default Cart