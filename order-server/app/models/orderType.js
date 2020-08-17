var mongoose = require('mongoose')
var orderTypeSchema = require('./../schemas/orderType')

var orderType = mongoose.model('OrderType', orderTypeSchema)

module.exports = orderType