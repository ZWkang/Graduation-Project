let mongoose = require('mongoose')

let Schema = mongoose.Schema

const checkin = {
    order_id: {type: String},
    order_checkin_people: {type: Array,default: []},
    order_checkin_time: {type: Number, default: new Date()},
}


const checkinSchema = new Schema(checkin)

module.exports = mongoose.model('checkin',checkinSchema)