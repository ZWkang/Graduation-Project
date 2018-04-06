// 这个文件存储一些常见的关联查询结果返回

const AllModel = require('../models/index.js')

const getHowManyStar = async function (roomId){

    const { star } = AllModel;

    const result = await AllModel.find({roomId});
    return {
        totals: result.length,
        result
    }
    return 0;
}

const getUserMessage = async function (user_id){
    const {users} = AllModel;
    const result = await users.findOne({_id:user_id},{
                            'user_password':0
                        })
    return {
        result
    }
}