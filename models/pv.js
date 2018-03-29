const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pv = {
    location: {type: String},
    number: {type: Number , default: 1},
    router: {type: String, default: '/index'}
}

const pvSchema = new Schema(pv)

module.exports = mongoose.model('pv',pvSchema)