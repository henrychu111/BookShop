import React from 'react';
import data from '../data';

function HomeScreen (props) {
    return <div><ul className="products">
    {
        data.books.map(book =>   
    <li>
        <div className="product">
            <img className="product-image" src={book.image} alt="product"/>
            <div className="product-name"> 
                <a href="product.html">{book.name}</a>
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