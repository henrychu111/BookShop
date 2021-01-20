import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, listBooks, saveBook } from '../actions/bookActions';

function BooksManagement(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const booksList = useSelector(state => state.booksList);
    const {loading, books, error} = booksList;

    const bookSave = useSelector(state => state.bookSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = bookSave;

    const bookDelete = useSelector(state => state.bookDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = bookDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave){
           setModalVisible(false)
        }
        dispatch(listBooks());
    }, [successSave, successDelete]);

    const openModal = (book) =>{
        setModalVisible(true);
        setId(book._id);
        setName(book.name);
        setAuthor(book.author);
        setPrice(book.price);
        setImage(book.image);
        setDescription(book.description);
        setCategory(book.category);
        setType(book.type);
        setCountInStock(book.countInStock);
    }

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(saveBook({
            _id: id,
            name, price, image, author, type, 
            category, countInStock, description
        }));
    }

    const deleteHandler = (book) => {
        dispatch( deleteBook(book._id))
    }

    return (
        <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      
      {modalVisible && (
    <div className = "form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                    <h3>{id? "Update Book" :" Create Book"}</h3>
                </li>
                <li>
                    {loadingSave && <div className='loading'>Loading...</div>}
                    {errorSave && <div className='error'>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type ="text" name ="name" value= {name} id ="name" onChange ={(e) => setName(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                       Author
                    </label>
                    <input type ="text" name ="author" value= {author} id ="author" onChange ={(e) => setAuthor(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                       Price
                    </label>
                    <input type ="text" name ="price" value= {price} id ="price" onChange ={(e) => setPrice(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                        Image
                    </label>
                    <input type ="text" name ="image" value= {image} id ="image" onChange ={(e) => setImage(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                        Type
                    </label>
                    <input type ="text" name ="type" value= {type} id ="type" onChange ={(e) => setType(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                       Category
                    </label>
                    <input type ="text" name ="category" value= {category} id ="category" onChange ={(e) => setCategory(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                       Number In Stock
                    </label>
                    <input type ="text" name ="countInStock" value= {countInStock} id ="countInStock" onChange ={(e) => setCountInStock(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                        Description
                    </label>
                    <textarea type ="text" name ="description" value= {description} id ="description" onChange ={(e) => setDescription(e.target.value)}> 
                    </textarea>
                </li>
                <li>
                    <button type ="submit" className="button primary">{id? "Update" :" Create"}</button>
                </li>
                <li>
                    <button type ="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
                </li>
            </ul>
        </form>
        </div>)}
        <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.type}</td>
                <td>
                  <button className="button" onClick ={() => openModal(product)}>
                    Edit
                  </button>
                  {"   "}
                  <button className="button" onClick = {() => deleteHandler(product)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );  
}

export default BooksManagement;
