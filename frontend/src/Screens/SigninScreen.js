import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';

function SigninScreen(props) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
          //
        }
    }, []);

    const submitHandler =(e) =>{
        e.preventDefault();
    }

    return <div className = "form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                    <h3>Sign In</h3>
                </li>
                <li>
                    <label for="email">
                        Email
                    </label>
                    <input type ="email" name ="email" id ="email" onChange ={(e) => setEmail(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label for ="password">Password</label>
                    <input type ="password" id ="password" name="password" onChange ={(e) => setPassword(e.target.value)}>
                    </input>
                </li>
                <li>
                    <button type ="submit" className="button primary">Signin</button>
                </li>
                <li>
                    New to BookShop?
                </li>
                <li>
                    <Link to="register" className ="button full-width">Create your BookShop account</Link>
                </li>

            </ul>
        </form>
    </div>
}

export default SigninScreen;

