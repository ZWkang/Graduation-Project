let mongoose = require('mongoose')

let Schema = mongoose.Schema

let Room = new Schema({
        // room_id :{type: String},
        room_type_id : {type:String},
        room_name: {type: String,unique:true},
        room_description: {type:String,default:''},
        room_status: {type: Boolean, default: true},
        // room_locktime: {type: Number, default:Date.parse(new Date())}
    })
    
module.exports = mongoose.model('room',Room)