import { Container, Typography, Table, TableHead, IconButton,
    TableRow, TableCell, Paper, TableBody, TableContainer, Select, MenuItem, Grid, Box, Button, InputLabel } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'

function Cart(props){

    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;
    const classes = useStyles();

    const bookId = props.match.params.id;
    const qty = props.location.search ?  Number(props.location.search.split("=")[1]):1;
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

    return (
        <>
            <Container>
                <Typography style={{margin: "20px 0px 20px"}} variant="h4">Shopping Cart</Typography>
                <Grid container spacing={2}>
                    <Grid item sm={8} >
                        {cartItems.length === 0 ? <Typography>Cart is Empty</Typography> : 
                            <TableContainer className={classes.table} component={Paper}>
                                <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Cover</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Delete</TableCell>
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
                                        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                        <Select 
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={item.qty} onChange={(e) => dispatch(addToCart(item.book, e.target.value))}
                                                >
                                                    {[...Array(item.countInStock).keys()].map(x => 
                                                    <MenuItem key={x+1} value = {x+1}>{x+1}</MenuItem>)}
                                                </Select>
                                        </TableCell>
                                        <TableCell className={classes.cell}><IconButton onClick={() => removeFromCartHandler(item.book)}><DeleteIcon /></IconButton></TableCell>
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
                    <Box className={classes.box}>
                        <Typography variant="h5">
                        Subtotal ( {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)} items)
                        :
                        <br></br>
                        $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </Typography>
                    <Button style={{marginTop: "20px"}} onClick={checkoutHandler} variant="contained" color="primary" disabled= {cartItems.length === 0}>
                        Proceed to Checkout
                    </Button>
                      </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
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
        minWidth: "250px",
        width: "30%",
        margin: "auto",
        borderRadius: "5px",
        padding: "20px 35px 20px 20px",
        marginTop: "30px",
        backgroundColor: "#F5F5F5"
    }
  }));

export default Cart