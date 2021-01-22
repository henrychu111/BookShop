import { Box, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { signin } from '../actions/userActions';
import { makeStyles } from '@material-ui/core/styles';

function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin);
    const userRegister = useSelector(state => state.userRegister);
    const {userInfo} =  userSignin.userInfo ? userSignin : userRegister;
    const {loading, error} = userSignin;const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split('=')[1]: '/';
    const classes = useStyles();

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [userInfo]);

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return (
        <>
            <Link to="/"><Typography variant="h6" className={classes.logo}>
                BookShop
            </Typography></Link>
            <Box className={classes.box} m={1}>
                <Typography variant="h6" className = {classes.signInHeader}>
                    Sign-In 
                </Typography>
                {loading && <CircularProgress className="loading"/>}
                     {error && <Typography className='error'>Invalid Username or Password</Typography>}
                <form className={classes.root} onSubmit={submitHandler}>
                    <TextField id="email" label="Email" type="email" variant="outlined" required 
                            onChange = {(e) => setEmail(e.target.value)} fullWidth/>
                    <TextField id="password" label="Password" variant="outlined" fullWidth type="password"
                            onChange ={(e) => setPassword(e.target.value)} required/>
                    <Button type ="submit" variant="contained" color="primary" fullWidth>Sign in</Button>
                    <hr/><Typography className = {classes.newTo}>
                    New to BookShop?
                    </Typography>
                    <Link to={redirect === '/'? 'register': 'register?redirect=' + redirect}>
                            <Button className= {classes.register} variant="contained" fullWidth>Register
                            </Button>
                    </Link>    
                </form>
            </Box>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1)
        },
    },
    logo: {
        fontFamily: "Pacifico",
        fontSize: "2.5rem",
        textAlign: "center",
        marginTop: "20px",
        color: "rgb(34, 26, 26)"
    },
    signInHeader: {
        fontSize: "2rem",
        paddingLeft: "5px"
    },
    box: {
        border: "1px solid grey",
        minWidth: "360px",
        width: "30%",
        margin: "auto",
        borderRadius: "5px",
        padding: "20px 35px 20px 20px",
        marginTop: "30px"
    },
    newTo: {
        fontSize: ".80rem",
        textAlign: "center",
        marginBottom: "10px"
    }
}));

export default Signin;

