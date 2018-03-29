const roomType = require('../models').roomType;
const room = require('../models').room;

const {checkuserPower,checkauth,checkAuthContain} = require('./auth');

const roomTypeAuth = checkAuthContain('010');



exports.addRoomType = async function(ctx,next){

    // try{
    //     roomTypeAuth(ctx,next);
    // }catch(e){
    //     return ;
    // }
    
    const { body } = ctx.request;
    const {
        room:roomType_name,
        photo:roomType_photo,
        status:roomType_status,
        description:roomType_description
    } = body;
    roomType_name = roomType_name || Date.parse(new Date());
    roomType_photo = roomType_photo || '###';
    roomType_status = !!roomType_status;
    roomType_description = roomType_description || '';
    let saveObj = {
        roomType_name,
        roomType_photo,
        roomType_status,
        roomType_description
    }
    try{
        const result = await roomType.create(saveObj).exec()
        ctx.status = 200;
        ctx.body = {
            data: result
        }
        return await next()
    }catch(e){
        return ctx.throw(500,`房间类型添加失败`)
    }
}
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

exports.updateRoomType = async function(ctx,next){

    // try{
    //     roomTypeAuth(ctx,next);
    // }catch(e){
    //     return ;
    // }


    const { body } = ctx.request;
    const id = ctx.params.roomtypeid || '';
    if(id == ''){
        return ctx.throw(500,`参数错误`);
    }

    const {
        room:roomType_name,
        photo:roomType_photo,
        status:roomType_status,
        description:roomType_description
    } = body;
    roomType_name = roomType_name || Date.parse(new Date());
    roomType_photo = roomType_photo || '###';
    roomType_status = !!roomType_status;
    roomType_description = roomType_description || '';
    let saveObj = {
        roomType_name,
        roomType_photo,
        roomType_status,
        roomType_description
    }

    const result = await roomType.update({_id:id},saveObj);
    ctx.status = 200;
    return ctx.body = {
        result,
        id
    }
}
exports.deleteRoomType = async function deleteRoomType(ctx,next){
    // try{
    //     roomTypeAuth(ctx,next);
    // }catch(e){
    //     return ;
    // }

    const id = ctx.params.roomtypeid || '';
    if(!!id){
        return ctx.throw(500,'id传参出错了')
    }

    await roomType.delete({_id:id});

    ctx.status = 200;
    return ctx.body = {
        success:true
    }
}