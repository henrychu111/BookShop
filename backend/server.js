import express from 'express';
import data from './data';

const app = express();

app.get("/api/books", (req,res) => {
    res.send(data.books);
})

app.listen(5000, () => {console.log("Server started at http://localhost:5000") });

