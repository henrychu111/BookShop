import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { signin } from '../actions/userActions';

function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin);
    const {loading, userInfo, error} = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split('=')[1]: '/';

    useEffect(() => {
        if(userInfo){
            props.history.push('/' + redirect)
        }
        return () => {
          //
        }
    }, [userInfo]);

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return <div className = "form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                    <h3>Sign-In</h3>
                </li>
                <li>
                    {loading && <div className='loading'>Loading...</div>}
                    {error && <div className='error'>Wrong Username or Password</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type ="email" name ="email" id ="email" onChange ={(e) => setEmail(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor ="password">Password</label>
                    <input type ="password" id ="password" name="password" onChange ={(e) => setPassword(e.target.value)}>
                    </input>
                </li>
                <li>
                    <button type ="submit" className="button primary">Sign In</button>
                </li>
                <li style={{textAlign: "center"}}>
                    New to BookShop?
                </li>
                <li>
                    <Link to={redirect === '/'? 'register': 'register?redirect=' + redirect} className ="button secondary">Create your BookShop account</Link>
                </li>

            </ul>
        </form>
    </div>
}

export default Signin;

