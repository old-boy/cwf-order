var express = require('express')
var router = express.Router()
var Category = require('./../app/models/category')
var { handleError } = require('./../public/util/handleError')
var { signRequired, adminRole } = require('./../middleware/auth.js')

router.use(signRequired)

// 分类列表
router.get('/', (req, res, next) => {
    Category.find({}, (err, doc) => {
        if (err) {
            res.json(handleError(err))
        }
        if (doc) {
            res.json({
                status: '1',
                msg: '',
                result: doc
            })
        } else {
            res.json({
                status: '0',
                msg: '没有分类',
                result: ''
            })
        }
    })
})

// 新建分类
router.post('/new', adminRole, (req, res, next) => {
    var obj = {}
    obj.name = req.body.name
    obj.path = req.body.path
    Category.findOne({ name: obj.name }, (err, doc) => {
        if (err) {
            res.json(handleError(err))
        }
        if (!doc) {
            var category = new Category(obj)
            category.save(err => {
                if (err) {
                    res.json({
                        status: '0',
                        msg: err.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '1',
                        msg: '创建分类成功',
                        result: ''
                    })
                }
            })
        } else {
            res.json({
                status: '0',
                msg: '分类已存在',
                result: ''
            })
        }
    })
})

// 修改分类
router.post('/modify', adminRole, (req, res, next) => {
    var id = req.body.id,
        name = req.body.name,
        path = req.body.path,
        visible = req.body.visible
    Category.findOne({ _id: id }, (err, category) => {
        if (err) {
            res.json(handleError(err))
        }
        if (category) {
            if (name && path) {
                category.name = name
                category.path = path
            } else {
                category.visible = visible
            }
            category.save(err => {
                if (err) {
                    res.json(handleError(err))
                } else {
                    res.json({
                        status: '1',
                        msg: '修改分类成功',
                        result: ''
                    })
                }
            })
        } else {
            res.json({
                status: '0',
                msg: '分类不存在',
                result: ''
            })
        }
    })
})

// 删除分类
router.delete('/del', adminRole, (req, res, next) => {
    var id = req.query.id
    Category.findOne({ _id: id }, (err, category) => {
        if (err) {
            res.json(handleError(err))
        }
        if (category) {
            category.remove(err => {
                if (err) {
                    res.json(handleError(err))
                } else {
                    res.json({
                        status: '1',
                        msg: '删除分类成功',
                        result: ''
                    })
                }
            })
        } else {
            res.json({
                status: '0',
                msg: '分类不存在',
                result: ''
            })
        }
    })
})

module.exports = router