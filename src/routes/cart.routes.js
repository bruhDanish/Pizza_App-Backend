const express = require('express');
const { getCartByUser, modifyProductToCart, clearCartById } = require('../controllers/cart.controller.js');
const { isLoggedIn } = require('../validators/auth.validator.js');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn ,getCartByUser);
cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductToCart);
cartRouter.delete('/products', isLoggedIn, clearCartById)

module.exports = cartRouter;