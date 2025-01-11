const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        minLength: [5, 'Product name must be at least 5 characters'],
        trim: true
    },
    description:{
        type: String,
        minLength: [5, 'Description must be at least 5 characters'],
    },
    productImage: {
        type: String,
        // required: [true, 'Product image is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    category: {
        type: String,
        enum :['veg', 'non-veg', 'drinks', 'sides'],
        default: 'veg',
        required: [true, 'Category is required']
    },
    inStock: {
        type: Boolean,
        required: [true, 'Stock availability is required'],
        default: true
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;