const cloudinary = require('../config/cloudinary.config.js');
const ProductRepository = require('../repository/product.repo.js');
const fs = require('fs/promises');

async function createProduct(productDetails) {
    const imagePath = productDetails.imagePath;
    if(imagePath){
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(req.file.path);
        } catch (error) {
            console.log(error);
            throw {reason: 'Product not created', statusCode: 500};    
        }
    }

    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage: productImage
    })

    if(!product){
        throw {reason: 'Product not created', statusCode: 500};
    }

    return product;
}

module.exports = {
    createProduct
}