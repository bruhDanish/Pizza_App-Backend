const Product = require('../schema/product.schema.js');

async function createProduct(productDetails) {
    try {
        const response = await Product.create({

        }); 
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    createProduct
}