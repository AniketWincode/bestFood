const express = require('express');
const { getCartById, addProduct, getProduct, deleteProduct } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');
const { isLoggedIn } = require('../validation/authValidator');

const productRouter = express.Router();

productRouter.post(
    '/', 
    isLoggedIn,
    isAdmin, 
    uploader.single('productImage'), 
    addProduct
);
productRouter.get('/:id', getProduct);
productRouter.get('/:id', deleteProduct);

module.exports = productRouter;