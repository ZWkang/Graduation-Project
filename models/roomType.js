let mongoose = require('mongoose')

let Schema = mongoose.Schema

let RoomType = new Schema({
        // roomType_id : {type:String},
        roomType_name: {type:String},
        roomType_status: {type:Boolean,default:true},
        // 价格
        // roomType_count: {type:Number,default:1},
        roomType_description: {type:String,default:''},
        roomType_photo:{type:String,default:''},
        create_time:{type:Number,default: Date.parse(new Date())}
    })
module.exports =  mongoose.model('roomtype',RoomType)