import { Button, Container, Typography, IconButton, TextField, CircularProgress, Box, TextareaAutosize,
  Table, TableBody, TableCell, TableContainer,  TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, listBooks, saveBook } from '../actions/bookActions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
    const classes = useStyles();
    const categories = ["Fantasy", "Action", "Sci-Fi"]

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
      <>
        <Container style={{paddingBottom: "20px"}}>
          {modalVisible ? <Box className={classes.box} m={1}>
          <Typography variant="h5" align="center">
                  {id? "Update Book" :" Create Book"}
                </Typography>
                {loading && <CircularProgress className="loading"/>}
                     {error && <Typography className='error'>Save Unsuccessfully</Typography>}
              <form className={classes.root} onSubmit={submitHandler}>
                    <TextField id="name" label="Name" value= {name} variant="outlined" required 
                            onChange = {(e) => setName(e.target.value)} fullWidth/>
                    <TextField id="author" label="Author" value= {author} variant="outlined" required 
                            onChange = {(e) => setAuthor(e.target.value)} fullWidth/>
                    <TextField id="price" type="number" value= {price} label="Price" variant="outlined" required 
                            onChange = {(e) => setPrice(e.target.value)} fullWidth/>
                    <TextField id="image" label="Image" value= {image} variant="outlined" required 
                            onChange = {(e) => setImage(e.target.value)} fullWidth/>
                    <TextField id="type" label="Type" value= {type} variant="outlined" required 
                            onChange = {(e) => setType(e.target.value)} fullWidth/>
                    <FormControl className={classes.formControl} variant="outlined">
                          <InputLabel id="demo-simple-select-label">Category</InputLabel>
                          <Select required style={{width: "369px"}} 
                                labelId="demo-simple-select-label"
                                id="demo-simple-select" onChange={(e) => {setCategory(e.target.value)}}
                                className={classes.selectEmpty} value={category} label="Category"
                                >
                                    {categories.map(category => 
                                    <MenuItem key={category} value = {category}>{category}</MenuItem>)}
                                </Select></FormControl>
                    {/* <TextField id="category" value= {category} label="Category" variant="outlined" required 
                            onChange = {(e) => setCategory(e.target.value)} fullWidth/> */}
                    <TextField id="In Stock" value= {countInStock} type="number" label="In Stock" variant="outlined" required 
                            onChange = {(e) => setCountInStock(e.target.value)} fullWidth/>
                    <TextareaAutosize style={{width: "364px"}} value= {description} aria-label="minimum height" rowsMin={3} placeholder="Description" 
                    onChange = {(e) => setDescription(e.target.value)}/>
                    <Button type ="submit" variant="contained" color="primary" fullWidth>{id? "Update" :" Create"}</Button>
                    <Button variant="contained" fullWidth onClick={() => setModalVisible(false)}>Back
                            </Button>
          </form></Box> :
          <div><Typography style={{margin: "20px 0px 20px"}} variant="h4">Books</Typography>
          <Button variant="contained" color="primary" onClick={() => openModal({})}>Create Book</Button>
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <StyledTableRow key={book._id}>
                    <StyledTableCell component="th" scope="row">
                      {book._id}
                    </StyledTableCell>
                    <StyledTableCell>{book.name}</StyledTableCell>
                    <StyledTableCell>{book.category}</StyledTableCell>
                    <StyledTableCell>{book.type}</StyledTableCell>
                    <StyledTableCell>$ {book.price}</StyledTableCell>
                    <StyledTableCell align="center">
                    <IconButton style={{marginRight: "20px"}} onClick ={() => openModal(book)}><EditIcon /></IconButton>
                    <IconButton onClick = {() => deleteHandler(book)}><DeleteIcon /></IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer></div> }
        </Container>
      </>
    );  
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },table: {
    marginTop: "20px",
formControl: {
  margin: theme.spacing(1),
  minWidth: 120,
},
selectEmpty: {
  marginTop: theme.spacing(2),
},
  },
},box: {
  border: "1px solid grey",
  minWidth: "360px",
  width: "30%",
  margin: "auto",
  borderRadius: "5px",
  padding: "20px 35px 20px 20px",
  marginTop: "30px"
},
table: {
  marginTop: "20px",

},
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#263238",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }
}))(TableRow);

export default BooksManagement;
