const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, // VIMP
        ref : 'User',
        required : true
    },
    items : [ // array of product id
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required : true
            },
            quantity : {
                type : Number,
                required : true,
                default : 1
            }
        }
    ],
    totalPrice : { // calculate when ordering
        type : Number,
        required : true
    },
    status : {
        type : String,
        default : "ORDERED",
        enum : ["ORDERED", "CANCELLED", "DELIVERED", "PROCESSING", "OUT_FOR_DELIVERY"]
    },
    address : {
        type : String,
        minLength : [10, "Addresss should be of atleast 10 chracters"]
    },
    paymentMethod : {
        type : String,
        enum : ["ONLINE", "CASH"],
        default : "CASH"
    },
}, {timestamps : true});

const order = mongoose.model('Order', orderSchema);

module.exports = order; 