const roomType = require('../models').roomType;
const room = require('../models').room;

const {checkuserPower,checkauth,checkAuthContain} = require('./auth');

const roomTypeAuth = checkAuthContain('010');


// 查看一个房间类型。
exports.getOneRoomType = async function (ctx,next){

    const {body } = ctx.request;
    let roomtypeid = ctx.params.roomtypeid;
    if(!!roomtypeid){
        return ctx.throw(400,`请输入正确的房间id`)
    }

    const result = await roomType.findOne({'_id':roomtypeid});
    if(!result){
        return ctx.throw(500,`请输入正确房间类型id`);
    }
    try{
        const roomList = await room.find({room_type:roomtypeid,room_status:true});
    }catch(e){
        return ctx.throw(500,`查询房间列表出错`);
    }
    ctx.status = 200;
    return ctx.body = {
        roomType:result,
        roomList
    }
}

exports.getAllRoomType = async function (ctx,next){
    try{
        const allRoomTypes = await roomType.find({roomType_status:true});
        allRoomTypes = Array.from(allRoomTypes)
        let len = allRoomTypes.length;
        if(len == 0){
            return ctx.body={
                messgae:null
            }
        }
        let roomType;
        for(let i = 0;i < len; i++){
            roomType = allRoomTypes[i];
            roomType['roomlist'] = await room.find({room_type:roomType._id,room_status: true}).where(`order_lock_time`).lt(Date.parse(new Date())).exec()
        }
        ctx.status = 200
        return ctx.body = {
            allRoomTypes
        }
    }catch(e){
        ctx.status = 500;
        return ctx.body = {
            message: '获取所有房间类型失败失败'
        }
    }
}