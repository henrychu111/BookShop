import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Checkout from '../shippingComponents/Checkout';

function PlaceOrder(props){

    const cart = useSelector(state => state.cart);

    const {cartItems, shipping, payment} = cart;
    if(!shipping.address){
        props.history.push('/shipping');
    }else if(!payment){
        props.history.push('/payment');
    }
    
    const itemsPrice = cartItems.reduce((a,c) => a + c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0: 10;
    const taxPrice = 0.12 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = () => {

    }

    useEffect(() => {
    }, []);

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }

    return <div>
        <Checkout step1 step2 step3 step4></Checkout>
        <div className="placeorder">
        <div className="placeorder-info">
            <div>
                <h3>
                    Shipping
                </h3>
            
                <div>
                    {shipping.address}, {shipping.city},
                    {shipping.postalCode}, {shipping.country}
                </div>
                <div>
                    <h3>Payment</h3>
                </div>
                <div>
                    Payment Method: {cart.payment.payment}
                </div>
            </div>
            <div>
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
                                    Quantity: {item.qty}
                                </div>
                            </div>
                            <div className="cart-price">
                                ${item.price}
                            </div></li>
                        )
                }
            </ul>
        </div>

        </div>
        <div className='placeorder-action'>
            <ul>
                <li>
                    <button className='button-primary' onClick={placeOrderHandler} > Place Order</button>
                </li>
                <li>
                    <h3>Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                </li>
                <li>
                    <div>Total </div>
                    <div>${totalPrice}</div>
                </li>
            </ul>
        </div>
    </div>
    </div>
}

export default PlaceOrder;