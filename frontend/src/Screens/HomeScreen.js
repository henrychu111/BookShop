import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

function HomeScreen (props) {
    const [books, setBook] = useState([]);
    useEffect(() => {
        const fecthData = async () =>{
            const {data} = await axios.get("/api/books");
            setBook(data);
        }
        fecthData();
        return () => {
        };  
    }, [])

    return <div><ul className="products">
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
            <div className="product-rating">{book.rating} Stars({book.reviews} reviews)</div>
        </div>
    </li>)
    }
</ul></div>
}

export default HomeScreen;