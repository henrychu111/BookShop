import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { listBooks } from '../actions/bookActions';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';

function Home (props) {
    const booksList = useSelector(state => state.booksList);
    const {books, loading, error} = booksList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listBooks());
    }, [])

    return  loading? <div className="loading">Loading...</div>:
        error? <div>{error}</div>:

            <div><ul className="products">
            {
                books.map(book =>   
            <li key ={book._id}>
                <div className="product">
                    <Link to={'/book/' + book._id}>
                        {<img className="product-image" src={book.image} alt="product"/>}
                    </Link>
                    
                    <div className="product-name"> 
                        <Link to={'/book/' + book._id}>{book.name}</Link>
                    </div>
                    <div className="product-author">{book.author}</div>
                    <div className="product-type">{book.type}</div>
                    <div className="product-price">${book.price}</div>
                    <div className="product-rating"><Tooltip className="tooltip" title={book.rating}>
                        <span><Rating name="half-rating-read" defaultValue={book.rating} precision={0.1} readOnly /></span></Tooltip> 
                        <span className="book-review">({book.reviews} reviews)</span></div>
                </div>
            </li>)
            }
        </ul></div>
}

export default Home;