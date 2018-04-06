// 这个文件存储一些常见的关联查询结果返回

const AllModel = require('../../models/index.js')



// 点赞关联房间
const getRoomFromStar = async function (room_id=''){
    const {roomType} = AllModel;
    const result = await roomType.find({_id:room_id},{roomType_name:1,roomType_description:1}).lean()
    return result ;
}


// 获得一个房间类型有多少个点赞
const getHowManyStar = async function (roomId){

    const { star } = AllModel;
    const result = await star.find({roomId});
    return {
        totals: result.length,
        // result
    }
    return 0;
}

// 获得一个用户数据
const getUserMessage = async function (user_id){
    const {users} = AllModel;
    const result = await users.findOne({_id:user_id},{
                            'user_password':0
                        })
    return result
}
// 获得所有用户数据
const getAllUserMessage = async function (limit,page,user_type){
    const {users} = AllModel;
    let page = limit * ((page -1) |0)
    // TODO: 这里是不是可以除去自己？

    const result = await users.find({user_type:{$lte:user_type}},{'user_password':0}).skip(page).limit(limit);

    return result
}
// 获得用户权限
const getUserAuth = async function (user_id){
    const {users} = AllModel;
    const result = await users.findOne({_id:user_id})
    if(!result){
        return '0';
    }
    return result['user_auth'];
}

module.exports = {
    getHowManyStar,
    getUserMessage,
    getUserAuth,
    getRoomFromStar
}