import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { savePayment } from '../actions/cartActions';
import Checkout from '../shippingComponents/Checkout';

function Payment(props) {
    const [payment, setPayment] = useState('');
    const dispatch = useDispatch();

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(savePayment(payment));
        props.history.push('/placeorder');
    }

    return <div>
        <Checkout step1 step2 step3></Checkout>
        <div className = "form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                    <h3>Payment</h3>
                </li>
                <li>
                    <div>
                        <label for ='payment'>
                            <input className="radio" type ="radio" name ="payment" id ="payment" value='paypal'
                            onChange ={(e) => setPayment(e.target.value)}/> 
                            <span>Paypal</span>
                        </label>
                    </div>
                </li>
                <li>
                    <button type ="submit" className="button primary">Continue</button>
                </li>
                
            </ul>
        </form>
    </div>
    </div>
}


export default Payment;