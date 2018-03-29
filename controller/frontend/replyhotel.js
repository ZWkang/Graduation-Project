const log = require('../utils/log.js')
let replyM = require('../models/index.js').reply;
let Order = require('../models/index.js').order;
const jwt = require('../utils/token')

let replyAddAction = async function (ctx, next) {
    const body = ctx.request.body;

    let token, userid, replyid;
    token = ctx._tokens

    let orderId = ctx.params.orderId || '';
    if (orderId === '') {
        return ctx.throw(400, 'error params')
    }
    try {
        let result = await order.find({ _id:orderId });
        if (result.length === 0) {
            throw new Error('orderId id is error')
        }
    } catch (e) {
        return ctx.throw(400, 'orderId is error')
    }

    let user_id = token._id;
    let reply_content = body['reply_content'] || '';
    let reply_time = Date.parse(new Date());

    let obj = {
        reply_parent_id,
        reply_content,
        article_id,
        reply_time,
        user_id
    };
    let replys;
    let ReplyAddResult;
    try {
        const ReplyAddResult = await replyM.create(obj);
        return ctx.body = {
            success: true,
            'reply_id': ReplyAddResult._id
        }
    } catch (e) {
        log.error(e)
        return ctx.throw('add reply error')
    }
}

exports.getAReplyList = async function (ctx,next){
    const {_id} = ctx._tokens;
    const result = await replyM.find({user_id:user_id})
    // TODO： 增加与订单的关联。
    return ctx.body = {
        data: result
    }
}
exports.getAReplyDetail = async function (ctx,next){
    const {_id} = ctx._tokens;

    const replyid = ctx.params.replyid;
    const result = await replyM.findOne({_id:replyid,user_id:_id})
    // TODO: 增加与订单的关联
    ctx.status = 200;
    return ctx.body = {
        data: result
    }
}
// let replyDeleteAction = async function (ctx, next) {
//     const body = ctx.request.headers;
//     // console.log(headers)
//     let token, userid, replyid;
//     token = ctx._tokens || ''
//     let _id = ctx.params.id || '';

//     if (_id === '') {
//         // return ctx.body={
//         //     success:false,
//         //     errormessage:'参数错误'
//         // }    
//         return ctx.throw(400, 'params is error');
//     }
//     let user_id = token._id;


//     let obj = {
//         user_id,
//         _id
//     };

//     let result, idd, DeleteReplyResult
//     try {
//         result = await replyM.findOne({ _id })
//         idd = result.article_id

//         await articleM.update({ '_id': idd }, { $inc: { reply_count: -1 } })
//         DeleteReplyResult = await replyM.remove(obj)
//         log.info(DeleteReplyResult)
//         return ctx.body = {
//             success: true,
//             DeleteReplyResult
//         }
//     } catch (e) {
//         log.error(e);
//         // return ctx.body = {
//         //     success:false,
//         //     errormessage: '删除评论失败'
//         // }
//         return ctx.throw(400, 'delete reply is error');
//     }


// }

module.exports = {
    replyAddAction,
    replyDeleteAction
}