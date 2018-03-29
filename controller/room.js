

// 只是拿所有的roomtype
async function getAllRoomTypes(isShow){
    const result 
    if(!!isShow){
        result = await roomType.find({roomType_status:!!isShow});
    }else{
        result = await roomType.find({});
    }
    return result;
}

exports.getAllShowRoom = async function(ctx,next){
    const result = await getAllRoomType(true)
    const roomresult = await room.find({room_status:true}).where(`room_locktime`).lt(Date.parse(new Date())).exec()
    
    const roomTypeHashResult = result.reducer((a,b)=>{
        a[b['_id']] = b
        return a;
    },{})
    roomresult = JSON.parse(JSON.stringify(roomresult));
    return roomresult.map((v)=>{
        v['roomType'] = roomTypeHashResult[v['room_type']];
    })
}
exports.getAllRoom = async function (ctx,next){
    const result = await getAllRoomType(false)
    const roomresult = await room.find({})
    const roomTypeHashResult = result.reducer((a,b)=>{
        a[b['_id']] = b
        return a;
    },{})
    roomresult = JSON.parse(JSON.stringify(roomresult));
    return roomresult.map((v)=>{
        v['roomType'] = roomTypeHashResult[v['room_type']];
    })
}
exports.getARoomDetail = async function (ctx,next){

    const id = ctx.params.roomid || '';
    if(id === ''){
        return ctx.throw(500,`detail id 错误了`);
    }
    const result = await room.findOne({_id:id})
    
}