let mongoose = require('mongoose')

let Schema = mongoose.Schema

let Room = new Schema({
        // room_id :{type: String},
        room_type : {type:String},
        room_name: {type: String},
        room_status: {type: Boolean, default: true},
        room_locktime: {type: Number, default:Date.parse(new Date())}
    })
    
module.exports = mongoose.model('room',Room)