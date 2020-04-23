var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var crypto = require('crypto')
var multipartMiddleware = require('connect-multiparty')()
var { uploadImage } = require('./../middleware/uploadImage.js')
var { handleError } = require('./../public/util/handleError.js')
var { signRequired, adminRole } = require('./../middleware/auth.js')
var User = require('./../app/models/user')
var Info = require('./../app/models/info')

// 查询所有用户信息
// router.get('/', signRequired, (req, res, next) => {
router.get('/', (req, res, next) => {
	User.find({})
		.populate('info')
		.exec()
		.then((users) => {
			if (users) {
				res.json({
					status: '1',
					msg: '',
					result: users
				})
			} else {
				res.json({
					status: '0',
					msg: '没有用户',
					result: ''
				})
			}
		})
})

// 添加用户
router.post('/add', (req, res, next) => {
	var account = req.body.account,
		password = req.body.password,
		avatar = req.body.avatar,
		job = req.body.job,
		address = req.body.address,
		tel = req.body.tel,
		email = req.body.email,
		username = req.body.username


		User.findOne({ account: req.body.account }).then((user) => {
        if (user) {
			return res.status(400).json(
				{
					status: '0',
					msg: '用户已存在',
					result: ''
				}
			);
        }else {
			let newInfo = {
				avatar,
				job,
				address,
				tel,
				email,
				username
			}
			let info = new Info(newInfo)
		
			info.save((err) => {
				if (err) {
					res.json({
						status: '0',
						msg: err.message,
						result: ''
					})
				} else {
					let newUser = {
						account: account,
						password: password,
						pwdKey: '',
						info: info._id
					}
					let user = new User(newUser)
					user.save(err => {
						if (err) {
							res.json({
								status: '0',
								msg: err.message,
								result: ''
							})
						} else {
							res.json({
								status: '1',
								msg: '用户创建成功',
								result: ''
							})
						}
					})
				}
			})
        }
    });
});

// 删除用户  signRequired, adminRole,
router.delete('/del/:id',  (req, res, next) => {
	const id = `${req.params.id}`;
	console.log(id)
	User.findOne({ _id: id }, (err, user) => {
		if (err) {
			res.json({
				status: '0',
				msg: err.message,
				result: ''
			})
		}
		if (user) {
			Info.findOne({ _id: user.info }, (err, info) => {
				if (err) {
					handleError(err)
				} else {
					info.remove((err) => {
						if (err) {
							handleError(err)
						} else {
							user.remove((err) => {
								if (err) {
									handleError(err)
								} else {
									res.json({
										status: '1',
										msg: '删除用户成功',
										result: ''
									})
								}
							})
						}
					})
				}
			})
		} else {
			res.json({
				status: '0',
				msg: '用户不存在',
				result: ''
			})
		}
	})
})

// 修改用户权限
router.post('/modifyRole', signRequired, adminRole, (req, res, next) => {
	let role = req.body.role
	let id = req.body.id
	User.findOne({ _id: id }, (err, user) => {
		if (err) {
			res.json({
				status: '0',
				msg: err.message,
				result: ''
			})
		}
		if (user) {
			if (user.role >= 50) {
				res.json({
					status: '0',
					msg: '权限不够，不能修改',
					result: ''
				})
			} else {
				user.role = role
				user.save(err => {
					if (err) {
						res.json({
							status: '0',
							msg: err.message,
							result: ''
						})
					} else {
						res.json({
							status: '1',
							msg: '权限修改成功',
							result: ''
						})
					}
				})
			}
		} else {
			res.json({
				status: '0',
				msg: '用户不存在',
				result: ''
			})
		}
	})
})

// 最高权限修改密码
router.post('/adminPwd', signRequired, adminRole, (req, res, next) => {
	let pwd = req.body.password
	let id = req.body.id
	User.findOne({ _id: id }, (err, user) => {
		if (err) {
			res.json({
				status: '0',
				msg: err.message,
				result: ''
			})
		}
		if (user) {
			crypto.randomBytes(16, (err, buf) => {
				let salt = buf.toString('hex')
				user.pwdKey = salt
				crypto.pbkdf2(pwd, salt, 4096, 16, 'sha1', (err, secret) => {
					if (err) throw err
					user.password = secret.toString('hex')
					user.save(err => {
						if (err) {
							res.json({
								status: '0',
								msg: err.message,
								result: ''
							})
						} else {
							res.json({
								status: '1',
								msg: '修改密码成功',
								result: ''
							})
						}
					})
				})
			})
		} else {
			res.json({
				status: '0',
				msg: '用户不存在',
				result: ''
			})
		}
	})
})

// 登陆接口
router.post('/login', (req, res, next) => {
	var account = req.body.account,
		password = req.body.password
	User.findOne({'account': account})
		.populate('info', 'username avatar')
		.exec()
		.then((user) => {
			if (user) {
				user.comparePwd(password, (err, isMatch) => {
					if (err) throw err
					if (isMatch) {
						req.session.user = user
						res.json({
							status: '1',
							msg: '',
							result: {
								'user': user,
								'sessionId': req.session.id
							}
						})
					} else {
						res.json({
							status: '0',
							msg: 'password incorrect',
							result: ''
						})
					}
				})
			} else {
				res.json({
					status: '0',
					msg: '用户不存在',
					result: ''
				})
			}
		})
})

// 登出接口
router.get('/logout', (req, res, next) => {
	delete req.session.user
	res.json({
		status: '1',
		msg: '用户已登出',
		result: ''
	})
})

// 检测是否已经登陆
router.post('/checklogin', (req, res, next) => {
	let sessionId = req.body.sessionId
	let userId = req.session.user._id
	if (req.session.id === sessionId) {
		User.findOne({ _id: userId })
			.populate('info', 'username avatar')
			.exec()
			.then((user) => {
				if (user) {
					req.session.user = user
					res.json({
						status: '1',
						msg: '用户已登陆',
						result: user
					})
				} else {
					res.json({
						status: '0',
						msg: '用户不存在',
						result: ''
					})
				}
			})
	} else {
		res.json({
			status: '0',
			msg: '用户未登陆',
			result: ''
		})
	}
})

// 读取用户资料
router.get('/getUserInfo', signRequired, adminRole, (req, res, next) => {
	let infoId = req.query.infoId
	Info.findOne({ _id: infoId }, (err, info) => {
		if (err) {
			handleError(err)
		}
		if (info) {
			res.json({
				status: '1',
				msg: '',
				result: info
			})
		} else {
			res.json({
				status: '0',
				msg: '用户不存在',
				result: ''
			})
		}
	})
})

// 上传用户资料
router.post('/updateInfo', signRequired, multipartMiddleware, uploadImage, (req, res, next) => {
	let infoId = req.body.infoId
	let username = req.body.username
	let job = req.body.job
	let address = req.body.address
	let tel = req.body.tel
	let email = req.body.email
	let avatarUrl = ''
	if (req.avatarUrl) {
		avatarUrl = req.avatarUrl
	}
	Info.findOne({ _id: infoId }, (err, info) => {
		if (err) {
			handleError(err)
		}
		if (info) {
			// 用于判断是否有新上传图片
			if (info.avatar !== '' && (avatarUrl !== '')) {
				let oldPath = path.join(__dirname, '../', `/public/${info.avatar}`)
				// 删除之前的图片
				fs.unlink(oldPath, (err) => {
					if (err) {
						if (err.code === 'ENOENT') {
							console.error('myfile does not exist')
						}
						handleError(err)
					}
				})
			}
			info.username = username
			info.job = job
			info.address = address
			info.tel = tel
			info.email = email
			avatarUrl && (info.avatar = avatarUrl)
			info.save(err => {
				if (err) {
					handleError(err)
				} else {
					res.json({
						status: '1',
						msg: '用户资料保存成功',
						result: info
					})
				}
			})
		} else {
			res.json({
				status: '0',
				msg: '用户不存在',
				result: ''
			})
		}
	})
})

module.exports = router