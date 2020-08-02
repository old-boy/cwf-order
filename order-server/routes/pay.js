var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var crypto = require('crypto')
var multipartMiddleware = require('connect-multiparty')()
var Pay = require('./../app/models/pay')

router.get('/',(req,res,next) => {
    Pay.find({})
		.sort({'_id':1})
		.limit(10)
		.populate('type')
		.exec()
		.then((pays) => {
			if (pays) {
				res.json({
					status: '1',
					msg: '',
					result: pays
				})
			} else {
				res.json({
					status: '0',
					msg: '类型不存在',
					result: ''
				})
			}
		})
})

module.exports = router