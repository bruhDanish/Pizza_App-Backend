const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['ORDERED', 'CANCELLED', 'DELIVERED', 'PROCESSING', 'OUT_FOR_DELIVERY'],
        default: 'ORDERED',
    },
    address: {
        type: String,
        minLength: [10, 'Address should be at least 10 characters long'],
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'ONLINE'],
        default: 'COD',
    }
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;