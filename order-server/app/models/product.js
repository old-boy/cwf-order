var mongoose = require('mongoose')
var ProductSchema = require('./../schemas/product')

var Product = mongoose.model('Pay', ProductSchema)

module.exports = Product