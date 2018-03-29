
const LockTime = {};
// exports.checkIsLock = function(time,){}

exports.checkCanAddtoOrder = async function(room_id,starttime,endtime){
    //c  c |a d c d  c |b d  d
    // db.getCollection('locktime').find({room_id:1,lock_status:true,'start_time': {$gt:1522566962000},'end_time':{$lt:1523258162000}})
    
    // 与右侧点有并集
    const result = await LockTime.find({room_id,lock_status:true,start_time:{
        $lt: endtime,
    },end_time:{
        $gt: endtime
    }})
    if(!!result){
        return false;
    }
    // 与左侧始点有交集
    result = await LockTime.find({room_id,lock_status:true,start_time:{
        $lt: starttime ,
    },end_time:{
        $gt: starttime
    }})
    if(!!result){
        return false;
    }
    // 取点是真包含
    result = await LockTime.find({room_id,lock_status:true,start_time:{
        $gt: starttime,
    },end_time:{
        $lt: endtime
    }})
    if(!!result){
        return false;
    }
    // 取点是真子集
    result = await LockTime.find({room_id,lock_status:true,start_time:{
        $lt: starttime,
    },end_time:{
        $gt: endtime
    }})
    if(!!result){
        return false;
    }

    return true;
}
exports.lockRoom = async function(room_id,order_id,starttime,day){
    if(starttime instanceof Date){
        starttime = Date.parse(starttime)
    }
    const data = {
        room_id,
        order_id,
        start_time:starttime,
        end_time:start_time + (day|0) * 24 * 60 * 60 * 1000,
        lock_status: true
    }

    const result = await LockTime.create(data)

    return result;
}
exports.cancelLockRoom = async function(room_id,order_id){
    const result = await LockTime.update({room_id,order_id},{lock_status:false});
    if(!!result){
        return true;
    }else{
        return false;
    }
}