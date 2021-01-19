import express from 'express';
import Product from '../models/productModel'
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});
router.post('/', isAuth, isAdmin, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        author: req.body.author,
        image: req.body.image,
        type: req.body.type,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
    });
        const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({message: 'Error in Creating Product'});
    });

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById({_id: productId});
    if (product) {
        product.name = req.body.name;
        product.author = req.body.author;
        product.image = req.body.image;
        product.type = req.body.type;
        product.price = req.body.price;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const updatedProduct = await product.save();
    if(updatedProduct){
        return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
    }
    return res.status(500).send({message: 'Error in Updating Product'});
    }});

    router.delete("/:id", isAuth, isAdmin, async(req, res) =>{

        const deletedProduct = await Product.findById(req. params.id);
        if (deletedProduct) {
            await deletedProduct.remove();
            res.send({message: "Product Deleted"})
        }
        res.send ("Error When Deleting")
    }
    )
    
export default router;