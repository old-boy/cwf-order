const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 获取ObjectId,populate需用到，用于表与表的关联
const ObjectId = Schema.Types.ObjectId

const orderSchema = new Schema({
    contractNo: {
        unique: true,
        type: String//合同号
    },
    sales: {
        type: ObjectId,
        ref: 'User'
    },
    clientName:{
        type: ObjectId,
        ref: 'Client'
    },
    orderDate:{
        type: Date,
        defalut: Date.now()
    },
    purchasing:Number,
    product:{
        type: ObjectId,
        ref: 'Product'
    },
    receivables:Number,//应收款
    billingDate:{
        type: Date,
        defalut: Date.now()//开票日期
    },
    actuallyArrived:Number,//实际到账
    paymentDate:{
        type: Date,
        defalut: Date.now() //收款日期
    },
    production:String,//生产下单
    followUpType:{
        type: ObjectId,
        ref: 'followUp' //跟单类型
    },
    shipDate:{
        type: Date,
        defalut: Date.now() //发货日期
    },
    arrivalDate:{
        type: Date,
        defalut: Date.now() //到货日期
    },
    waybillNumber:String,//运单号
    shipping:Number,//运费
    courierCompany:String,//快递公司
    createdAt: {
        type: Date,
        defalut: Date.now()
    },
    updatedAt: {
        type: Date,
        defalut: Date.now()
    }
}) 

orderSchema.pre('save', function() {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

module.exports = orderSchema