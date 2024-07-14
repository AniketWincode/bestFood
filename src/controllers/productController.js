const { deleteProductById } = require('../repositories/productRepository');
const { createProduct } = require('../services/productService');
const AppError = require('../utils/appError');

async function addProduct(req, res) {

    try {
        const product = await createProduct({
            productName : req.body.productName,
            discription : req.body.discription,
            imagePath : req.file?.path, // request . file check null or not
            price : req.body.price,
            category : req.body.category, // if category is undefined, veg will be stored
            inStock : req.body.inStock // if instock is undefined then true will be stored
        })
        return res.status(201).json({
            success : true,
            message : 'Succesfully created the product',
            error : {},
            data : product
        });

    } catch (error) {
        if(error instanceof AppError) {
            console.log(error);
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong',
            data : {},
            error : error
        });
    }
}

async function getProduct(req, res) {
    try {
        const response = await getProductById(req.params.id);
        return res.status(200).json({
            success : true,
            message : 'Succesfully fetched the product',
            error : {},
            data : response
        })
    } catch (error) {
        if(error instanceof AppError) {
            console.log(error);
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong',
            data : {},
            error : error
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const response = await deleteProductById(req.params.id);
        return res.status(200).json({
            success : true,
            message : 'Succesfully deleted the product',
            error : {},
            data : response
        })
    } catch (error) {
        if(error instanceof AppError) {
            console.log(error);
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong',
            data : {},
            error : error
        });
    }
}
module.exports = {
    addProduct,
    getProduct,
    deleteProduct
}