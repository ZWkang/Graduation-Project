'use strict';
let mongoose = require('mongoose')

let Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId;

const schema = {
    user_id:{type:String},
    location:{type:String},
    create_time:{type:Date,default:new Date()}

}

const locationSchema = new Schema(schema)
locationSchema.index({
    create_time: -1
})
module.exports = mongoose.model('locationM',locationSchema)