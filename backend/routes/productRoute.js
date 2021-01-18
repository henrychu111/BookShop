import express from 'express';
import Product from '../models/productModel'
import { getToken } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.post('/', async(req, res) => {
    const product = new Product ({
        name: req.body.name,
        author: req.body.author,
        image: req.body.image,
        type: req.body.type,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        reviews: req.body.reviews,

    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({ message: 'new Product Created', data: newProduct });
    }
    return res.status(500).send({message: 'Error in Creating Product'});
}
)

export default router;