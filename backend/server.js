import express from 'express';
import data from './data';

const app = express();

app.get("/api/books/:id", (req,res) => {
    const productId = req.params.id;
    const book = data.books.find(x=>x._id === productId)
    if(book)
    res.send(book);
    else
        res.status(404).send({msg: "Product Not Found."})
});
app.get("/api/books", (req,res) => {
    res.send(data.books);
});

app.listen(5000, () => {console.log("Server started at http://localhost:5000") });

