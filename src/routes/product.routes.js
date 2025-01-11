const express = require('express');
const { addProduct } = require('../controllers/product.controller.js');
const uploader = require('../middlewares/multer.middleware.js');

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage'), addProduct);

module.exports = productRouter;