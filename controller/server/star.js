const log = require('../utils/log.js')
const jwt = require('../utils/token.js')
// const replyM = require('../models/index.js').reply
const starM = require('../models/index.js').star
const {
    getRoomFromStar
} = require('../public/proxypublic')
const { getRoomFromStar } = require('../public/proxypublic')


let starAction = async function(ctx,next){
    const body = ctx.request.body;
    let token;
    token = ctx._tokens||''

    let room_type_id = ctx.params.roomtypeid||'';
    let user_id = token._id;
    let star_time = new Date().toLocaleString();


    if(room_type_id===''){
        return ctx.throw(400,`room_type_id is null`);
    }
    
    let obj = {
        room_type_id,
        user_id,
        star_time
    }
    let replysearch
    let falg
    try{
        if(replysearch.length !==0){
            flag = await starM.findOne({user_id,room_type_id})
            if(!flag.length){
                await starM.remove({user_id,room_type_id})
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
const showByStatus = async function (ctx,next){
    const {body} = ctx.request;

    starM.find({})

}

const showAllStar = async function (ctx,next){
    const result = await starM.find({}).lean();
    result = result.map((v)=>{
        let room_type_id = v['room_type_id']
        let results = await getRoomFromStar(room_type_id)
        v['roomtype_detail'] = results;
        return v;
    })
    return ctx.body = {
        data : result
    }
}
const deleteStar = async function (ctx,next){
    const id = ctx.params._id;
    try{
        await starM.remove({_id:id});
    } catch (e){
        console.log(e)
        return ctx.body = {
            success: false
        }
    }
    return ctx.body = {
        success: true
    }
}
const getARoomtypeStars = async function (ctx,next){
    const { body } = ctx.request;
    let roomtype_id = ctx.params.roomtypeid;
    const result = await starM.findOne({room_type_id:roomtype_id}).lean()
    
    if(!result){
        return ;
    }
    // result['roomtype_detail'] = await getRoomFromStar(roomtype_id);
    ctx.status = 200;
    return ctx.body = {
        data: result
    }
    // result[]
}
const searchARoom = async function (ctx,next){

}
module.exports = {
    starAction,
    showAllStar
}
