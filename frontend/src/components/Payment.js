import { Box, Typography, makeStyles, Button, Radio, FormControlLabel } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { savePayment } from '../actions/cartActions';
import Checkout from '../shippingComponents/Checkout';

function Payment(props) {
    const [payment, setPayment] = useState('');
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(2)
    const classes = useStyles();

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(savePayment(payment));
        props.history.push('/placeorder');
    }

    return <div>
        <Checkout activeStep={activeStep}></Checkout>
        <Box className={classes.box} m={1}>
          <Typography variant="h5" align="center">
                Payment
                </Typography>
              <form className={classes.root} onSubmit={submitHandler}>
                    <FormControlLabel value="female" control={<Radio value='Paypal' color = "primary" onChange ={(e) => setPayment(e.target.value)}/>} label="Paypal" />
                    <Button type ="submit" variant="contained" color="primary" fullWidth>Continue</Button>
          </form></Box>
    </div>
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


export default Payment;