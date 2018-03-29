exports.checkuserPower = async function checkuserPower(auth,needauth){
    return (ctx,next)=>{
        if(auth - needauth > 0){
            return true;
        }else{
            return ctx.throw(400,`need more auth`)
        }
    }
}
exports.checkauth = async function checkauth(userId){
    if(!!userId){
        return -1;
    }
    try{
        let {user_auth} = await users.findOne({_id:userId});
        return user_auth;
    }catch(e){
        return -1;
    }
}

exports.checkAuthContain = async function checkAuthContain (userId,needauth){
    return checkuserPower(await checkauth(userId),needauth)
}