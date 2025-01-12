const express = require('express');
const { addProduct, deleteProduct, getProduct } = require('../controllers/product.controller.js');
const uploader = require('../middlewares/multer.middleware.js');

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage'), addProduct);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;