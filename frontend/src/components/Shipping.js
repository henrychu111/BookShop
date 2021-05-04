import { TextField, Box, Typography, makeStyles, Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { saveShipping } from '../actions/cartActions';
import Checkout from '../shippingComponents/Checkout';

function Shipping(props) {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const [activeStep, setActiveStep] = useState(1)
    const dispatch = useDispatch();
    const classes = useStyles();

    const submitHandler =(e) => {
        e.preventDefault();
        dispatch(saveShipping({address, city, postalCode, country}));
        props.history.push('/payment');
    }

    return <>
        <Checkout activeStep={activeStep}></Checkout>
        <Box className={classes.box} m={1}>
          <Typography variant="h5" align="center">
                Shipping
                </Typography>
              <form className={classes.root} onSubmit={submitHandler}>
                    <TextField id="address" label="Address" variant="outlined" required 
                            onChange = {(e) => setAddress(e.target.value)} fullWidth/>
                    <TextField id="city" label="City" variant="outlined" required 
                            onChange = {(e) => setCity(e.target.value)} fullWidth/>
                    <TextField id="postalcode" label="Postal Code" variant="outlined" required 
                            onChange = {(e) => setPostalCode(e.target.value)} fullWidth/>
                    <TextField id="country" label="Country" variant="outlined" required 
                            onChange = {(e) => setCountry(e.target.value)} fullWidth/>
                    <Button type ="submit" variant="contained" color="primary" fullWidth>Continue</Button>
          </form></Box>
    </>
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },table: {
      marginTop: "20px",
    },
  },box: {
    border: "1px solid grey",
    minWidth: "360px",
    width: "30%",
    margin: "auto",
    borderRadius: "5px",
    padding: "20px 35px 20px 20px",
    marginTop: "30px"
  },
  }));

export default Shipping;