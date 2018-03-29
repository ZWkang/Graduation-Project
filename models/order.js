'use strict';
let mongoose = require('mongoose')

let Schema = mongoose.Schema
let OrderSchema = new Schema({
    // orderId:{type:String}, // 订单id 使用自增_id
    order_user_id:{type: String}, // 订单用户id
    order_create_time:{type: String}, // 下订单时间
    order_status:{type:String,default:'000001'}, // 当前订单状态//最高为为1代表取消或已完成订单
    order_stop_time: {type: String, default:''}, // 订单取消确认时间
    order_enter_number:{type: Number, default:1}, // 入住人数
    order_room_id:{type:String},// 这个字段与lock字段一起做订单锁定
    order_lock_time:{type: Number , default:new Date() + 24*60*60*1000},//30分钟锁定
    order_roomType_id:{type:String},
    // order_enter_people: {type: Array, default:[{
    //     name:'123',
    //     sex:'123',
    //     idcard: '123'
    // }]}, // 入住人员
    order_enter_time:{type:String, default: new Date()}, // 预计到店时间
    // order_out_time:{type: String, default:new Date()+24*60*60*100}
    order_enter_days:{type:Number, default: 1},// 入住天数 默认1
    order_checkout_time:{type:String,default:''},  // 离店时间
    order_checkin_time:{type: String,default:''}, // checkin时间
    order_comfirm_time:{type: String,default:''}, // 确认时间
    order_cancel_time:{type:String,default:''},//取消时间   

})

module.exports = mongoose.model('order',OrderSchema)