let log = require('../utils/log.js')
let mongoose = require('mongoose')
let MONGDB_URL = require('../config/index.js')['MONGDB_URL']||'mongodb://127.0.0.1'

const locktime = require('./locktime.js')
const order = require('./order');
const replyhotel = require('./replyhotel')
const room = require('./room')
const roomType = require('./roomType')
const star = require('./star');
const users = require('./users');


mongoose.Promise = global.Promise;

mongoose.connect(MONGDB_URL);

let db = mongoose.connection;

db.on('error', (err)=>{
    log.error("connect error:", err);
});

db.once('openUri', () => {
    log.info('MongoDB is ready')
});

module.exports = {
    locktime,order,replyhotel,room,roomType,star,users
}

