const users = require('../../models/index.js').users;
// 检查用户的权限值
async function checkuserPower(auth,needauth){
    // return (ctx,next)=>{
        if(auth - needauth > 0){
            return true;
        }else{
            // ctx.throw(400,`need more auth`)
            return false;
        }
    // }
}
// 查询某个用户的auth值
async function checkauth(userId){
    if(!userId){
        return -1;
    }
    try{
        let {user_auth} = await users.findOne({_id:userId});
        return user_auth;
    }catch(e){
        return -1;
    }
}

// 检测权限的容器
exports.checkAuthContain = async function checkAuthContain (userId,needauth){
    // return async (userId)=>{
        return await checkuserPower(await checkauth(userId),needauth)
    // }
}
// 查看是否可以操作这个操作
exports.canIEditHimOrHer = async function canIEditHimOrHer(authstatus,editPeo){
    if(authstatus === '111'){
        return true;
    }
    const editPerson = await users.findOne({_id:editPeo});
    if(editPerson){
        return false;
    }
    let {user_auth} = editPerson;
    if(!!user_auth && authstatus - user_auth > 0){
        return true;
    }else{
        return false;
    }
}