var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var multipartMiddleware = require('connect-multiparty')()
var { signRequired, adminRole } = require('../middleware/auth.js')

var Tag = require('./../app/models/tag')
router.use(signRequired)


module.exports = router