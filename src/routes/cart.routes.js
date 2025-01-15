const express = require('express');
const { getCartByUser } = require('../controllers/cart.controller.js');
const { isLoggedIn } = require('../validators/auth.validator.js');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn ,getCartByUser)

module.exports = cartRouter;