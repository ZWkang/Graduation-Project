const log = require('../utils/log.js')
let collection = require('../models/index.js').collection;
let roomType = require('../models/index.js').room;
const jwt = require('../utils/token.js')


let collectionAddAction = async function(ctx,next){
    const body = ctx.request.body;
    let token,userid,replyid;
    token = ctx._tokens

    let roomType_Id = ctx.params.roomType_Id||'';
    try{
        let result = await roomType.findOne({'_id':roomType_Id})
        if(!result){
            return ctx.throw(400,`目标房间不存在`)
        }
    }catch(e){
        log.error(e);
        return ctx.throw(400,`收藏失败`)
    }

    
    let user_id = token._id
    let collect_time = new Date().toLocaleString();
    let obj = {
        roomType_Id,
        user_id,
        collect_time
    }
    
    try{
        let colresu = await collection.find({roomType_Id,user_id});
        if(colresu.length>0){
            await collection.remove({roomType_Id,user_id})
            return ctx.body = {
                success: true,
                message:'取消收藏成功'
            }
        }
        let suc = await collection.create(obj);
        
        return ctx.body={
            success:true,
            message:'收藏成功'
        }
    }catch(e){
        log.error(e);
        return ctx.throw(400,'( 收藏/取消收藏 )失败')
    }
}


let collectionShowAction = async function(ctx,next){
    let token,userid,replyid;
    let _id = ctx.params.id||'';
    try {
        let collectionResult = await collection.find({'user_id': _id});
        collectionResult = JSON.parse(JSON.stringify(collectionResult));
        let ss
        
        for(let i=0;i<collectionResult.length;i++){
            collectionResult[i]['articlemsg'] = await articleM.find({'_id':collectionResult[i]['article_id']})
        }
        
        return ctx.body = {
            success:true,
            collectionResult
        }
        
    } catch (error) {
        log.error(error)
        return ctx.body = {
            success:false,
            errormessage:'获取失败'
        }
    }


}

let collectionwho = async function(ctx,next){
    return ctx.body = {
        status:ctx.method,
        header:ctx.request.headers
    }
}

let collectionShow = async function (ctx,next){
    const {body} = ctx.request;
    const type = b
}
let collectionLists = async function (ctx,next){

}
// let 
module.exports = {
    collectionAddAction,
    // collectionCancelAction,
    collectionShowAction,
    collectionwho
}