var express = require('express')
var router = express.Router()
var Client = require('../app/models/client')
var { handleError } = require('../public/util/handleError')
var { signRequired, adminRole } = require('../middleware/auth.js')

router.use(signRequired)

//查询客户
router.get('/', (req, res, next) => {
	Client.find({})
		.sort({'_id':-1})
		.limit(10)
		.exec()
		.then((clients) => {
			if (clients) {
				res.json({
					status: '1',
					msg: '',
					result: clients
				})
			} else {
				res.json({
					status: '0',
					msg: '客户不存在',
					result: ''
				})
			}
		})
})

//根据客户名称查询客户
router.get('/:name',(req,res,next) => {
    const name = req.params.name;
    Client.find({'clientName':name})
    .sort({'_id':-1})
    .limit(10)
    .exec()
    .then((client) => {
        if (client) {
            res.json({
                status: '1',
                msg: '',
                result: client
            })
        } else {
            res.json({
                status: '0',
                msg: '没有客户',
                result: ''
            })
        }
    })
})

//新增客户
router.post('/add',(req,res,next) => {
    const clientName = req.body.clientName,
          clientType = req.body.clientType,
          address = req.body.address,
          tel = req.body.tel,
          fax = req.body.fax,
          contactPerson = req.body.contactPerson,
          contactTel = req.body.contactTel;

    Client.findOne({clientName:req.body.clientName}).then((client)　=> {
        if(client){
            return res.status(400).json(
				{
					status: '0',
					msg: '客户已存在',
					result: ''
				}
			);
        }else{
            let newClient = {
                clientName,
                clientType,
                address,
                tel,
                fax,
                contactPerson,
                contactTel
            };

            let clientEntity = new Tag(newClient)
            clientEntity.save(err => {
                if (err) {
                    res.json({
                        status: '0',
                        msg: err.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '1',
                        msg: '客户创建成功',
                        result: ''
                    })
                }
            })
        }
    })
})

//删除客户
router.delete('/del/:id',(req,res,next) => {
    const id = `${req.params.id}`;
	Client.deleteOne({ _id: id }).then((client) => {
		// console.log(user)
		if(client){
			res.status(200).json({
				status: '1',
				msg: '删除成功',
				result: ''
			})
		}else{
			res.status(400).json({
				status: '0',
				msg: '不存在',
				result: ''
			})
		}
	})
})

module.exports = router