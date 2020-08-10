var mongoose = require('mongoose')
var orderSchema = require('./../schemas/order')

var Order = mongoose.model('Pay', orderSchema)

module.exports = Order