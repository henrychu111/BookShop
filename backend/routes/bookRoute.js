import express from 'express';
import Book from '../models/bookModel'
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
    const books = await Book.find({});
    res.send(books);
});
router.post('/', isAuth, isAdmin, async (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        image: req.body.image,
        type: req.body.type,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
    });
        const newBook = await book.save();
    if(newBook){
        return res.status(201).send({ message: 'New Book Created', data: newBook });
    }
    return res.status(500).send({message: 'Error in Creating Book'});
    });

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById({_id: bookId});
    if (book) {
        book.name = req.body.name;
        book.author = req.body.author;
        book.image = req.body.image;
        book.type = req.body.type;
        book.price = req.body.price;
        book.category = req.body.category;
        book.countInStock = req.body.countInStock;
        book.description = req.body.description;

        const updatedBook = await book.save();
    if(updatedBook){
        return res.status(200).send({ message: 'Book Updated', data: updatedBook });
    }
    return res.status(500).send({message: 'Error in Updating Book'});
    }});

router.delete("/:id", isAuth, isAdmin, async(req, res) =>{

        const deletedBook = await Book.findById(req. params.id);
        if (deletedBook) {
            await deletedBook.remove();
            res.send({message: "Book Deleted"})
        }
        res.send ("Error When Deleting")
    }
)    
    
export default router;