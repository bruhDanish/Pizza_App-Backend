const express = require('express');
const { getCart } = require('../controllers/cart.controller.js');

const cartRouter = express.Router();

cartRouter.get('/:id', getCart)

module.exports = cartRouter;