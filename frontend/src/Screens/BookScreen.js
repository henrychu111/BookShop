import React from 'react';
import {Link} from 'react-router-dom'
import data from '../data';

function BookScreen(props) {
    console.log(props.match.params.id)
    const book = data.books.find(x => x._id === props.match.params.id);
    return (
        <div >
            <div>
                <Link to="/">Back to result</Link>
            </div>
            <div className="details"></div>
                <div className="details-image">
                    <img src={book.image} alt="product"></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{book.name}</h4>
                            {book.author}
                        </li>
                        <li>
                            {book.rating} Stars({book.reviews} Reviews)
                        </li>
                        <li>
                            <b>${book.price}</b>
                        </li>
                        <li>
                            Description:
                            <div>
                                {book.description}
                            </div>
                        </li>
                    </ul>
                </div>
            
        </div>
    )
}

export default BookScreen;
