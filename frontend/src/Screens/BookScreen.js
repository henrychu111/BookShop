import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import data from '../data';

function BookScreen(props) {
    const [qty, setQty] = useState(1)
    const book = data.books.find(x => x._id === props.match.params.id);
    return (
        <div >
            <div className="back-to-result">
                <Link to="/">&lt; Back to result</Link>
            </div>
            <div className="details">
                <div className="details-image">
                    <img src={book.image} alt="product"></img>
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
                            {book.rating} Stars ({book.reviews} Reviews)
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
                        <li>
                            <b>Price:</b> ${book.price}
                        </li>
                        <li>
                            <b>Status:</b> {book.status}
                        </li>
                        <li>
                            <b>Qty:</b> &nbsp;
                            <input type="number" min="1" max="5" value={qty} 
                                onChange={(e) => setQty(e.target.value)}/>
                        </li>
                        <li>
                            <button className="button">Add to Cart</button>
                        </li>
                    </ul>
                </div>
                </div>
            
        </div>
    )
}

export default BookScreen;
