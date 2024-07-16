const express = require('express');
const { isLoggedIn } = require('../validation/authValidator.js');
const { createNewOrder } = require('../repositories/orderRepository.js');

const orderRouter = express.Router();

orderRouter.post('/',isLoggedIn,  createNewOrder) 

module.exports = orderRouter;