import React from 'react';
import data from '../data';
import {Link} from 'react-router-dom'

function HomeScreen (props) {
    return <div><ul className="products">
    {
        data.books.map(book =>   
    <li>
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
            <div className="product-rating">{book.rating} Stars({book.reviews} reviews)</div>
        </div>
    </li>)
    }
</ul></div>
}

export default HomeScreen;