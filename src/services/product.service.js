const cloudinary = require('../config/cloudinary.config.js');
const ProductRepository = require('../repository/product.repo.js');
const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError.js');
const NotFoundError = require('../utils/notFoundError.js');

async function createProduct(productDetails) {
    const imagePath = productDetails.imagePath;
    if(imagePath){
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(req.file.path);
        } catch (error) {
            console.log(error);
            throw new InternalServerError(); 
        }
    }

    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage: productImage
    })

    return product;
}

async function getProductById(productId) {
    const response = await ProductRepository.getProductById(productId);
    if(!response){
        throw new NotFoundError('Product');
    }
    return response;
}

async function deleteProductById(productId) {
    const response = await ProductRepository.deleteProductById(productId);
    if(!response){
        throw new NotFoundError('Product');
    }
    return response;
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}