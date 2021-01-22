import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { register } from '../actions/userActions';
import { Box, Typography, TextField, Button,CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Register(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const userSignin = useSelector(state => state.userSignin);
    const userRegister = useSelector(state => state.userRegister);
    const {loading, error} = userRegister;
    const {userInfo} =  userSignin.userInfo ? userSignin : userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split('=')[1]: '/';
    const classes = useStyles();
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [userInfo]);

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(register(name, email, password));
    }

    return (
        <>
            <Link to="/"><Typography variant="h6" className={classes.logo}>
                BookShop
            </Typography></Link>
            <Box className={classes.box} m={1}>
                <Typography variant="h6" className = {classes.signInHeader}>
                    Register
                </Typography>
                {loading && <CircularProgress className="loading"/>}
                     {error && <Typography className='error'>Register unsuccessfully</Typography>}
                <form className={classes.root} onSubmit={submitHandler}>
                    <TextField id="name" label="Name" variant="outlined" required 
                            onChange = {(e) => setName(e.target.value)} fullWidth/>        
                    <TextField id="email" type="email" label="Email" variant="outlined" required 
                            onChange = {(e) => setEmail(e.target.value)} fullWidth/>
                    <TextField id="password" type="password" label="Password" variant="outlined" fullWidth
                            onChange ={(e) => setPassword(e.target.value)} required/>
                    <TextField id="rePassword" type="password" label="Re-enter Password" variant="outlined" fullWidth
                            onChange ={(e) => setRePassword(e.target.value)} required/>
                    <Button type ="submit" variant="contained" color="primary" fullWidth>Register</Button>
                    <hr/><Typography className = {classes.newTo}>
                    Already have an account?
                    </Typography>
                    <Link to={redirect === '/'? 'signin': 'signin?redirect=' + redirect}>
                        <Button className= {classes.register} variant="contained" fullWidth>Sign in
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

export default Register;

