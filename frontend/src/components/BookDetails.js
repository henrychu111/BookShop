import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { detailsBook } from '../actions/bookActions';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography,CircularProgress, Grid, Box, Select, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function BookDetails(props) {
    const [qty, setQty] = useState(1)
    const bookDetails = useSelector(state => state.bookDetails);
    const { book, loading, error }= bookDetails;
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(detailsBook(props.match.params.id));
    }, []);

    const handleAddToCart = () =>{
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return (
        <div style={{margin: "20px"}}>
            <Link to="/"><Typography>&lt; Back to result</Typography></Link>
            {loading ? <CircularProgress className="loading"/> :
              error ? <Typography className='error'>Loading Error</Typography> :
              <Grid className={classes.grid} container spacing={1}>
                  <Grid item xs={12} sm={6} md={6} lg={4} spacing={1}><img style={{width: "80%"}} src="/images/d1.jpg" alt="book"></img></Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} spacing={1}>
                      <Typography variant="h4" className={classes.title}>{book.name}</Typography>
                      <Typography color="textSecondary" className={classes.author}>
                            {book.author}
                        </Typography>
                        <Typography color="textSecondary" className={classes.type}>
                            {book.type}
                        </Typography>
                        <Typography variant="h5" className={classes.type}>
                            $ {book.price}
                        </Typography>
                        <Tooltip className="tooltip" title={book.rating + " stars"}>
                            <span><Rating size="small" name="half-rating-read" defaultValue={book.rating} precision={0.1} readOnly /></span></Tooltip> 
                        <span style={{fontFamily:"Manrope", fontSize:"9pt", position:"relative", 
                                    bottom: "3.5px", left: "5px"}}>({book.reviews} reviews)</span>
                        <br/><br/>
                        <Typography className={classes.type}>
                           Description: {book.description}
                        </Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={6} lg={4} spacing={1}>
                      <Box className={classes.box}>
                          <Typography className={classes.addToCart}>Price: ${book.price}</Typography>
                          <Typography className={classes.addToCart}>Status: {book.countInStock > 0? "In Stock": "Unavailable"}</Typography>
                          <Typography className={classes.addToCart}>Quantity: <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={qty} onChange={(e) => {setQty(e.target.value)}}
                                >
                                    {[...Array(book.countInStock).keys()].map(x => 
                                    <MenuItem value = {x+1}>{x+1}</MenuItem>)}
                                </Select></Typography> 
                            <Button disabled={book.countInStock == 0} 
                                className={classes.addToCartBtn} variant="contained" 
                                color="primary"
                                onClick={handleAddToCart}>Add To Cart</Button>
                      </Box>
                  </Grid>
              </Grid>
              }
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#00897b'
    },
    grid: {
        margin: "10px",
    },
    author: {
        fontSize: ".8rem"
    },
    type: {
        marginBottom: "5px"
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
    },
    addToCart: {
        margin: "10px"
    },
    addToCartBtn: {
        marginTop: "20px"
    }
  }));

export default BookDetails;
