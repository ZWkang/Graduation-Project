let mongoose = require('mongoose')

let Schema = mongoose.Schema

const UsersSchema = new Schema({
    // user_id:{type:ObjectId}, // 用户id 使用自带自增id
    user_name:{type:String}, // 用户名
    user_password:{type:String}, // 用户密码
    user_email:{type:String,unique:true}, // 用户邮箱
    user_phone:{type:String,unique:true}, // 用户电话
    user_active:{type:String}, // 用户是否激活
    user_photo:{type:String,default:'xxx'}, // 用户个人头像
    user_register_time:{type:String}, // 用户创建注册时间
    user_last_login_time:{type:String}, // 用户最后登录时间
    user_auth:{type:String,default:`001`}, // 用户权限 1代表普通用户 11表示普通管理员 111表示后台超级管理员
    user_location:{type:String},// 用户地址
    user_type:{type: Number, default:1}, //1 是用户 2 临时员工 3 普通员工 4 普通管理员 5 超级管理员
})
UsersSchema.index({
    user_id:1,
    user_register_time:-1
})

return mongoose.model('users',UsersSchema)