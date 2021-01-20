import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true},
    author: { type: String, required: true},
    image: { type: String, required: true},
    type: { type: String, required: true},
    price: { type: Number, default:0,  required: true},
    category: { type: String, required: true},
    countInStock: { type: Number, default:0,  required: true},
    description: { type: String, required: true},
    rating: { type: Number, default: 0},
    reviews: { type: Number, default: 0},
});

const bookModel = mongoose.model("Book", bookSchema);

export default bookModel;