const { raw } = require('express');
const cloudinary = require('../config/cloudinaryConfig')
const ProductRepository = require('../repositories/productRepository')
const fs = require('fs/promises');
const Product = require('../schema/productSchema');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {
    // 1. We should check if an image is coming to create the product, then we should first upload it on
    // cloudinary

    const imagePath = productDetails.imagePath
    if(imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        } catch (error) {
            console.log(error)
            throw new InternalServerError();   
        }
    }

    // 2. Then use the url from cloudinary and other product details to add product in db
    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage : productImage
    });

    if(!product) {
        throw {reason : 'Not able to create product', statusCode : 500}
    }
    return product
}

async function getProductById(productId) {
    const response = await ProductRepository.getproductById(productId);
    if(!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

async function deleteProductById(productId) {
    const response = await ProductRepository.deleteProductById(productId);
    if(!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

module.exports = {
    createProduct,
    getProductById, 
    deleteProductById
}