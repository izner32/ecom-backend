var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    products: {
        type: Array,
    },
    totalAmount: {
        type: Number,
    },
    purchasedOn:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);