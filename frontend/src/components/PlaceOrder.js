import { Container, Grid, Table, TableBody, TableCell, Paper, Box, makeStyles, Button,
    TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Checkout from '../shippingComponents/Checkout';

function PlaceOrder(props){

    const cart = useSelector(state => state.cart);
    const [activeStep, setActiveStep] = useState(3)
    const classes = useStyles();

    const {cartItems, shipping, payment} = cart;
    if(!shipping.address){
        props.history.push('/shipping');
    }else if(!payment){
        props.history.push('/payment');
    }
    
    const itemsPrice = cartItems.reduce((a,c) => a + c.price*c.qty, 0);
    const shippingPrice = (itemsPrice > 100 ? 0: 10);
    const taxPrice = (0.12 * itemsPrice);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = () => {

    }

    useEffect(() => {
    }, []);

    return <>
        <Checkout activeStep={activeStep}></Checkout>
        <Container>
                <Grid container spacing={2}>
                    <Grid item sm={8}>
                    <Typography style={{margin: "20px 0px 20px"}} variant="h4">Shipping</Typography>
                    <Typography> {shipping.address}, {shipping.city},
                        {shipping.postalCode}, {shipping.country}</Typography>
                    <Typography style={{margin: "20px 0px 20px"}} variant="h4">Shopping Cart</Typography>
                        {cartItems.length === 0 ? <Typography>Cart is Empty</Typography> : 
                            <TableContainer className={classes.table} component={Paper}>
                                <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item) => (
                                    <TableRow key={item.book}>
                                        <TableCell className={classes.cell} component="th" scope="row">
                                            <img style={{width: "50px"}} src={"/images/" + item.image}></img>
                                        </TableCell>
                                        <TableCell className={classes.cell}><Link to={'/book/' + item.book}>{item.name}</Link></TableCell>
                                        <TableCell className={classes.cell}>
                                        <Typography className={classes.addToCart}>Quantity: {item.qty}</Typography> 
                                        </TableCell>
                                        <TableCell className={classes.cell} align="right">
                                            <Typography>$ {item.price}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>}
                    </Grid>
                    <Grid item sm={4}>
                    <Typography style={{margin: "20px 50px 20px"}} variant="h4">Payment</Typography>
                    <Typography style={{margin: "20px 50px 20px"}}>{cart.payment}</Typography>
                    <Box className={classes.box}>
                        <Typography variant="h5">
                            Order Summary 
                        </Typography>
                        <Typography variant="h6">
                            Items <span style={{float: "right"}}>${itemsPrice.toFixed(2)}</span>
                        </Typography>
                        <Typography variant="h6">
                            Shipping <span style={{float: "right"}}>${shippingPrice.toFixed(2)}</span>
                        </Typography>
                        <Typography variant="h6">
                            Tax <span style={{float: "right"}}>${taxPrice.toFixed(2)}</span>
                        </Typography>
                        <Typography variant="h6">
                            Total <span style={{float: "right"}}>${totalPrice.toFixed(2)}</span>
                        </Typography>
                    <Button style={{marginTop: "20px"}} onClick={placeOrderHandler} variant="contained" color="primary" disabled= {cartItems.length === 0}>
                        Place Order
                    </Button>
                      </Box>
                    </Grid>
                </Grid>
            </Container>
    </>
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },table: {
      marginTop: "20px",
    },
  },
  table: {
    marginTop: "20px",
  },
  cell: {
      background: "white"
  },
    box: {
        border: "1px solid grey",
        minWidth: "350px",
        width: "30%",
        margin: "50px",
        borderRadius: "5px",
        padding: "20px 35px 20px 20px",
        marginTop: "30px",
        backgroundColor: "#F5F5F5"
    }
  }));

export default PlaceOrder;