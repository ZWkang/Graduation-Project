const roomType = require('../../models/index.js').roomType;
const room = require('../../models').room;

// const {
//     checkuserPower,checkauth,checkAuthContain,
//     canIEditHimOrHer
// } = require('../public/auth');
const {
    getHowManyStar
} = require('../public/proxypublic')



exports.addRoomType = async function(ctx,next){

    // try{
    //     roomTypeAuth(ctx,next);
    // }catch(e){
    //     console.log(123);
    //     return ;
    // }

    let { body } = ctx.request;
    console.log(body)
    let {
        roomType_name,
        roomType_photo,
        roomType_status,
        roomType_description
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
        const result = await roomType.create(saveObj)
        ctx.status = 200;
        ctx.body = {
            data: result
        }
        // return await next()
    }catch(e){
        console.log(e);
        return ctx.throw(500,`房间类型添加失败`)
    }
}
// 查看一个房间类型。
exports.getOneRoomType = async function (ctx,next){

    const {body } = ctx.request;
    console.log(ctx.params)
    let roomtypeid = ctx.params.roomtypeid;
    if(!roomtypeid){
        return ctx.throw(400,`请输入正确的房间id`)
    }

    const result = await roomType.findOne({'_id':roomtypeid}).lean();
    if(!result){
        return ctx.throw(500,`请输入正确房间类型id`);
    }
    let roomList
    try{
        roomList = await room.find({room_type:roomtypeid,room_status:true});
    }catch(e){
        return ctx.throw(500,`查询房间列表出错`);
    }
    ctx.status = 200;
    result['roomList'] = roomList;
    return ctx.body = {
        data:result,
    }
}

exports.getAllRoomType = async function (ctx,next){
    try{
        const { query } = ctx.request;
        console.log(query);
        let {roomType_status} = query;
        let allRoomTypes
        if(roomType_status === void 0 ){
            allRoomTypes = await roomType.find({roomType_status:true}).lean();
        }else if(roomType_status === 'all'){
            allRoomTypes = await roomType.find({}).lean()
        }else{
            allRoomTypes = await roomType.find({roomType_status:!(roomType_status === 'false')}).lean()
        }
        
        // allRoomTypes = JSON.parse(JSON.stringify(allRoomTypes))
        // allRoomTypes = allRoomTypes.toJSON({getters:true})

        let len = allRoomTypes.length;
        if(len == 0){
            return ctx.body={
                messgae:null
            }
        }
        for(let i = 0;i < len; i++){
            let roomTypes = allRoomTypes[i];
            roomTypes['roomlist'] = await room.find({room_type:roomType._id,room_status: true}).where(`order_lock_time`).lt(Date.parse(new Date())).exec()
            // allRoomTypes[i]['roomlist'] = '123'
            // roomTypes['roomlist'] = ['123']
            roomTypes['stars'] = await getHowManyStar(roomTypes._id)
        }
        ctx.status = 200
        return ctx.body = {
            allRoomTypes
        }
    }catch(e){
        console.log(e)
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

    let {
        roomType_name,
        roomType_photo,
        roomType_status,
        roomType_description
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

    let result = await roomType.update({_id:id},saveObj);
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
    if(!id){
        return ctx.throw(500,'id传参出错了')
    }

    const a = await roomType.remove({_id:id});
    if(a['n'] ==0){
        ctx.status = 404;
        return ctx.body = {
            success:false
        }
    }
    ctx.status = 200;
    return ctx.body = {
        success:a
    }
}