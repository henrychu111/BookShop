import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { detailsBook } from '../actions/bookActions';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';

function BookDetails(props) {
    const [qty, setQty] = useState(1)
    const bookDetails = useSelector(state => state.bookDetails);
    const { book, loading, error }= bookDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsBook(props.match.params.id));
    }, []);

    const handleAddToCart = () =>{
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">&lt; Back to result</Link>
            </div>
            {loading ? <div className="loading">Loading...</div>:
            error? <div>{error}</div>:
            (
            <div className="details">
                <div className="details-image">
                    <img src={book.image} alt="book"></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{book.name}</h4>
                            {book.author}
                        </li>
                        <li className="book-type">
                            {book.type}
                        </li>
                        <br></br>
                        <li>
                        <Tooltip className="tooltip" placement="top" title={book.rating}>
                        <span><Rating name="half-rating-read" defaultValue={book.rating} precision={0.1} readOnly /></span></Tooltip> 
                        <span className="book-review">({book.reviews} reviews)</span>
                        </li>
                        <li>
                            Price: <b>${book.price}</b>
                        </li>
                        <li>
                            Description:
                            <div>
                                {book.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li style={{ marginBottom: "15px" }}>
                            <b>Price:</b> ${book.price}
                        </li>
                        <li>
                            <b>Status:</b> {book.countInStock > 0? "In Stock": "Unavailable"}
                        </li>
                        <li>
                            <b>Quantity:</b> &nbsp;
                            <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                {[...Array(book.countInStock).keys()].map(x => 
                                    <option value = {x+1}>{x+1}</option>)}
                            </select>
                        </li>
                        <li>
                            {book.countInStock > 0 ? <button onClick={handleAddToCart} className="button">Add to Cart</button> :
                            <div>Out of stock.</div> }
                        </li>
                    </ul>
                </div>
                </div>
            )}
        </div>
    )
}

export default BookDetails;
