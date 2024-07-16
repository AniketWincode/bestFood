const Order = require("../schema/orderSchema");

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

module.exports = {
    createNewOrder;
}