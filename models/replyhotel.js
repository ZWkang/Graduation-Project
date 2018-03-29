let mongoose = require('mongoose')

let Schema = mongoose.Schema

let replySchema = new Schema({
    // reply_parent_id:{type:String,default:''},
    order_id:{type:String}, // 回复订单id
    reply_content:{type:String}, // 回复内容
    reply_time:{type:String}, // 回复时间
    user_id:{type:String} // 用户id
})

module.exports = mongoose.model('reply',replySchema)