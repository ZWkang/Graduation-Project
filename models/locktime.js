'use strict';
let mongoose = require('mongoose')

let Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId;

const schema = {
    // order_id: {type: String},
    start_time: {type: Number, default: Date.parse(new Date())},
    room_id:{type: String},
    order_id:{type: String},
    // start_days: {type: Number, default: 1},
    end_time:{type:Number,default:Date.parse(new Date())+24*60*60*1000},
    lock_status: {type: Boolean, default:true}
}

const lockSchema = new Schema(schema)
module.exports = mongoose.model('locktime',lockSchema)