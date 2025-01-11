const {createProduct} = require('../services/product.service.js');

async function addProduct (req, res) {
    // try {
    //     const result = await cloudinary.uploader.upload(req.file.path);
    //     console.log(result);
    //     await fs.unlink(req.file.path);
    //     return res.json({message: 'OK'});
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({message: 'Internal Server Error'});
    // }
    try {
        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file.path,
            price: req.body.price,
            category: req.body.category,
            inStock: req.body.inStock
        });

        return res.status(201).json({
            message: 'Product created successfully',
            success: true,
            data: product,
            error: {}
        })
            
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.reason,
            success: false,
            data:{},
            error: error
        })
    }
}

module.exports = {
    addProduct
}