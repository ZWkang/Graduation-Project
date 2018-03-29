let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let collectionSchema = new Schema({
    user_id:{type:String}, // 用户id
    roomType_Id:{type:String}, // 房间id 
    collect_time:{type:String}, // 收藏时间
});

module.exports = mongoose.model('collection',collectionSchema)