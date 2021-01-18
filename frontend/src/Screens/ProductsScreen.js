import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct } from '../actions/productActions';

function ProductsScreen(props) {


    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [reviews, setReviews] = useState('');
    const productSave = useSelector(state => state.productSave);
    const {loading, loadingSave, success: successSave, error: errorSave} = productSave;
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
          //
        }
    }, []);

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(saveProduct(name, price, image, author, type, 
            category, countInStock, description, rating, reviews));
    }

    return <div className = "form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                    <h3>Create Book</h3>
                </li>
                <li>
                    {loadingSave && <div className='loading'>Loading...</div>}
                    {errorSave && <div className='error'>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type ="text" name ="name" id ="name" onChange ={(e) => setName(e.target.value)}> 
                    </input>
                </li>
                <li>
                <li>
                    <label htmlFor="name">
                       Author
                    </label>
                    <input type ="text" name ="author" id ="author" onChange ={(e) => setAuthor(e.target.value)}> 
                    </input>
                </li>
                    <label htmlFor="name">
                       Price
                    </label>
                    <input type ="text" name ="price" id ="price" onChange ={(e) => setPrice(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                        Image
                    </label>
                    <input type ="text" name ="image" id ="image" onChange ={(e) => setImage(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                        Type
                    </label>
                    <input type ="text" name ="type" id ="type" onChange ={(e) => setType(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                       Category
                    </label>
                    <input type ="text" name ="category" id ="category" onChange ={(e) => setCategory(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                       Number In Stock
                    </label>
                    <input type ="text" name ="countInStock" id ="countInStock" onChange ={(e) => setCountInStock(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                       Rating
                    </label>
                    <input type ="text" name ="rating" id ="rating" onChange ={(e) => setRating(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                       Reviews
                    </label>
                    <input type ="text" name ="reviews" id ="reviews" onChange ={(e) => setReviews(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                        Description
                    </label>
                    <textarea type ="text" name ="description" id ="description" onChange ={(e) => setDescription(e.target.value)}> 
                    </textarea>
                </li>

                <li>
                    <button type ="submit" className="button primary">Create</button>
                </li>
            </ul>
        </form>
    </div>
}

export default ProductsScreen;
