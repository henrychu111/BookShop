import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { listBooks } from '../actions/bookActions';
import Rating from '@material-ui/lab/Rating';
import {CircularProgress, Tooltip, Typography, CardMedia, Card, 
    CardContent, Grid} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';


function Home (props) {
    const booksList = useSelector(state => state.booksList);
    const [listOfBooks, setListOfBooks] = useState([]) 
    const {books, loading, error} = booksList;
    const dispatch = useDispatch();
    const classes = useStyles();
    const bookCategory = props.match.params.category;

    useEffect(() => {
        dispatch(listBooks());
    }, [])

    useEffect(() => {
        const filteredBooks = books.filter((eachBook) => {
            return eachBook.category === bookCategory;
        });
        if (bookCategory)
            setListOfBooks(filteredBooks)
        else setListOfBooks(books)
    }, [books, bookCategory])

    return  (
        <>{loading ? <CircularProgress className="loading"/>:
                error ? <Typography className="error">Failed to load Products</Typography>:
                listOfBooks.length > 0 ? <Grid className={classes.grid} container spacing={1}>{listOfBooks.map(book => <Grid key={book._id} item xs={12} sm={6} md={4} lg={3}><Card className={classes.root}>
                    <Link to={'/book/' + book._id}><CardMedia
                    className={classes.media}
                    image={"/images/" + book.image}
                    /></Link>
                    <CardContent>
                        <Link to={'/book/' + book._id}><Typography variant="h6" className={classes.title}>
                            {book.name}
                        </Typography></Link>
                        <Typography color="textSecondary" className={classes.author}>
                            {book.author}
                        </Typography>
                        <Typography color="textSecondary" className={classes.type}>
                            {book.type}
                        </Typography>
                        <Typography variant="h5" className={classes.type}>
                            ${book.price}
                        </Typography>
                        <Tooltip className="tooltip" title={book.rating + " stars"}>
                            <span><Rating size="small" name="half-rating-read" defaultValue={book.rating} precision={0.1} readOnly /></span></Tooltip> 
                        <span style={{fontFamily:"Manrope", fontSize:"9pt", position:"relative", 
                                    bottom: "3.5px", left: "5px"}}>({book.reviews} reviews)</span>
                    </CardContent>
                </Card></Grid>)}</Grid>:!loading && <Typography style={{marginLeft: "50px"}}>No results found</Typography>
        }</>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 270,
      margin: "10px"
    },
    media: {
      height: 250,
      paddingTop: '56.25%', // 16:9
    },
    author: {
        fontSize: ".8rem"
    },
    type: {
        marginBottom: "5px"
    },
    title: {
        color: '#00897b'
    },
    grid: {
        margin: "35px",
        
    }
  }));

export default Home;