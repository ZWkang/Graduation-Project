const log = require('../utils/log.js')
const Star = require('../controller/star.js')
const jwt = require('../utils/token.js')
const replyM = require('../models/index.js').reply
const starM = require('../models/index.js').star

let starAction = async function(ctx,next){
    const body = ctx.request.body;
    let token;
    token = ctx._tokens||''

    let room_id = ctx.params.room_id||'';
    let user_id = token._id;
    let star_time = new Date().toLocaleString();


    if(room_id===''){
        return ctx.throw(400,`room_id is null`);
    }
    
    let obj = {
        room_id,
        user_id,
        star_time
    }
    let replysearch
    let falg
    try{
        if(replysearch.length !==0){
            flag = await starM.findOne({user_id,room_id})
            if(!flag.length){
                await starM.remove({user_id,room_id})
                return ctx.body={
                    success:true,
                    "action":"down"
                }
            }else{
                await starM.create(obj)
                return ctx.body={
                    success:true,
                    "action":"up" 
                }
            }
        }else{
            throw new Error('is not a id')
        }
    }catch(e){
        return ctx.throw(400,'点赞失败')
    }
}

const showAllStar = async function (ctx,next){
    const result = await starM.find({});
    
    return ctx.body = {
        data : result
    }
}
const deleteStar = async function (ctx,next){
    const id = ctx.params._id;
    await starM.remove({_id:id});

    return ctx.body = {
        success: true
    }
}
module.exports = {
    starAction,
    showAllStar
}
