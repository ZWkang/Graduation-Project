const room = require('../../models/index').room;
const roomType = require('../../models/index').roomType
// 只是拿所有的roomtype
async function getAllRoomTypes(isShow){
    let result;
    if(!!isShow){
        result = await roomType.find({roomType_status:!!isShow});
    }else{
        result = await roomType.find({});
    }
    return result;
}
// 获得所有展示的房间 //
exports.getAllShowRoom = async function(ctx,next){
    const result = await getAllRoomType(true)
    const roomresult = await room.find({room_status:true}).where(`room_locktime`).lt(Date.parse(new Date())).lean()

    const roomTypeHashResult = result.reducer((a,b)=>{
        a[b['_id']] = b
        return a;
    },{})
    // roomresult = JSON.parse(JSON.stringify(roomresult));
    return roomresult.map((v)=>{
        v['roomType'] = roomTypeHashResult[v['room_type']];
    })
}
exports.getAllRoom = async function (ctx,next){
    const result = await getAllRoomType(false)
    const roomresult = await room.find({}).lean()
    const roomTypeHashResult = result.reducer((a,b)=>{
        a[b['_id']] = b
        return a;
    },{})
    // roomresult = JSON.parse(JSON.stringify(roomresult));
    return roomresult.map((v)=>{
        v['roomType'] = roomTypeHashResult[v['room_type']];
    })
}
exports.getARoomDetail = async function (ctx,next){

    const id = ctx.params.roomid || '';
    if(id === ''){
        return ctx.throw(500,`detail id 错误了`);
    }
    const result = await room.findOne({_id:id}).lean()
    if(!result){
        return ;
    }

    if(!!result['room_type_id']){
        result['room_type_detail'] = await roomType.find({_id:result['room_type_id']}) || '';
    }
    return ctx.body = {
        data: result
    }
}
exports.deleteARoom = async function (ctx,next){
    const id = ctx.params.roomid || '';

    if(id === ''){
        return ctx.throw(500, `id 参数有误`);
    }
    const result = await room.remove({_id:id})

    if((result['n'] === 0)){
        return ctx.throw(500, `id 参数有误`);
    }

    return ctx.body = {
        success:true
    }
}
exports.updateARoomDetail = async function (ctx,next){
    const id = ctx.params.roomid || '';
    if(id === ''){
        return ctx.throw(500, `id 参数有误`);
    }
    const {body} = ctx.request;
    let {
        room_type_id,
        room_name,
        room_description,
        room_status
    } = body;
    let obj = {
        room_type_id,
        room_name,
        room_description,
        room_status
    }
    const result = await room.findByIdAndUpdate({_id:id},obj).lean()

    return ctx.body = {
        success: true,
        data:result
    }

}
exports.addRoomDetail = async function (ctx,next){
    const {body} = ctx.request;
    let {
        room_type_id,
        room_name,
        room_description,
        room_status
    } = body;
    let obj = {
        room_type_id,
        room_name,
        room_description,
        room_status
    }
    const result = await room.create(obj)
    return ctx.body = {
        success:true,
        data: result
    }
}

exports.getAllTypeIdAndName = async function (ctx,next){
    const result = await roomType.find({roomType_status:true},{_id:1,roomType_name:1})
    return ctx.body ={
        data: result
    }
}