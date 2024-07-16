const order = require("../schema/orderSchema");
const Order = require("../schema/orderSchema");
const InternalServerError = require("../utils/internalServerError");

async function createNewOrder(orderDetails) {
    try {
        const order = await Order.create(orderDetails);
        return order;
    } catch (error) {
        if(error.name == 'MongooseError'){
            throw new InternalServerError()
        }
        else if(error.name == 'ValidationError'){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            console.log(error);
            throw new BadRequestError(errorMessageList);
        }
    }
}

async function getOrderByUserId(userId) {
    try {
        const order = await order.find({user : userId}).populate('items.product')
        return order;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function getOrderById(orderId){
    try {
        const order = await order.findById(orderId).populate('items.product')
        return order;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function updateOrderStatus(orderId, status) {
    try {
        const order = await order.findByIdAndUpdate(orderId, {status : status}, {new : true});
        return order;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports = {
    createNewOrder,
    getOrderById,
    getOrderByUserId,
    updateOrderStatus
}