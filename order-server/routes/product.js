var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var multipartMiddleware = require('connect-multiparty')()
var { signRequired, adminRole } = require('../middleware/auth.js')

var Product = require('./../app/models/product')
router.use(signRequired)

//查询所有的 tags
router.get('/', (req, res, next) => {
	Product.find({})
		.sort({'_id':-1})
		.limit(10)
		.exec()
		.then((product) => {
			if (product) {
				res.json({
					status: '1',
					msg: '',
					result: product
				})
			} else {
				res.json({
					status: '0',
					msg: '没有product',
					result: ''
				})
			}
		})
})

//根据name查询product
router.get('/:productName',(req,res,next) => {
    const productName = req.params.productName;
    Product.find({ productName })
    .sort({'_id':-1})
    .limit(10)
    .exec()
    .then((product) => {
        if (product) {
            res.json({
                status: '1',
                msg: '',
                result: product
            })
        } else {
            res.json({
                status: '0',
                msg: '没有product',
                result: ''
            })
        }
    })
})

//新增tag
router.post('/add',(req,res,next) => {
    const productName = req.body.productName,
          productNum = req.body.productNum,
          productGroup = req.body.productGroup,
          productPrice = req.body.productPrice;

       Product.findOne({productName:req.body.productName}).then((product)　=> {
        if(product){
            return res.status(400).json(
				{
					status: '0',
					msg: '产品已存在',
					result: ''
				}
			);
        }else{
            let newProduct = {
                productName,
                productNum,
                productGroup,
                productPrice
            };

            let productEntity = new Product(newProduct)
            productEntity.save(err => {
                if (err) {
                    res.json({
                        status: '0',
                        msg: err.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '1',
                        msg: '产品创建成功',
                        result: ''
                    })
                }
            })
        }
    })
})

//删除tags
router.delete('/del/:id',(req,res,next) => {
    const id = `${req.params.id}`;
	Product.deleteOne({ _id: id }).then((product) => {
		// console.log(user)
		if(tag){
			res.status(200).json({
				status: '1',
				msg: '删除成功',
				result: ''
			})
		}else{
			res.status(400).json({
				status: '0',
				msg: '产品不存在',
				result: ''
			})
		}
	})
})

module.exports = router