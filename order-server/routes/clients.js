var express = require('express')
var router = express.Router()
var Client = require('../app/models/client')
var { handleError } = require('../public/util/handleError')
var { signRequired, adminRole } = require('../middleware/auth.js')

router.use(signRequired)


module.exports = router