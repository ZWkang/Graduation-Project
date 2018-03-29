const Order = require('../models/index.js').order;
const User = require('../models/index.js').user;
exports.getOneOrder = function(id){
    
    const token = ctx._tokens;
    let orderId = this.ctx.params.id;
    const data = await Order.findOne({orderId});
    if(!data){
        return ctx.throw(404,'无此订单');
    }
    return ctx.body = {
        data
    }

}

exports.makeAOrder = async function (ctx,next){
    try{
        const token = ctx._tokens;
        let {_id} = token;
        const {body} = ctx.request;
        const {enter_number,enter_days} = body;
        const obj = {
            order_user_id: _id,
            order_create_time: new Date(),
            order_status: '00001',
            order_stop_time: '',
            order_enter_number:enter_number,
            order_enter_days: enter_days,
        }

        const orderObj = await Order.create(obj);
        // await Order.findOne({orderObj})
        
        ctx.body = {
            data: orderObj
        }
        CTX.status = 200
    }catch(e){
        return ctx.throw(400, `订单失败`)
    }
}
exports.updateOrder = async function(ctx,next){
    const {body} = ctx.request;
    let {
        updatetype,
        orderId,
    } = body
    let {_id} = ctx._tokens;

    switch(updatetype){
        case 'comfirm':

            break;
        case 'checkout':
            break;
        case 'checkin':
            break;
        case 'cancel':
            break;
        default:
            break;

    }
}
async function isOwnOrder(orderId,userId){
    const orderObj = await Order.findOne({order_user_id:userId,orderId:orderId})
    return orderObj;
}
async function comfirm(ctx,orderid,userId){
    try{
    const orderObj = await Order.findOne(orderid,userId);
    }catch(e){
        ctx.throw(500,'订单数据查询错误')
    }
    if(!orderObj){
        return ctx.throw(404,`订单好像不是您的~~`)
    }
    let {
        _id,
        order_user_id,
        order_status,
        order_cancel_time
    } = orderObj;
    
    if(/^1/.test(order_status) || !!order_cancel_time){
        return ctx.throw(400,`当前订单已被取消或者已经结束`);
    }
    if(!(/01$/.test(order_status))){
        return ctx.throw(400,`当前订单状态异常`)
    }
    try{
        order_status = order_status.replace(/01$/,'11');
        await Order.update({_id,order_user_id},{$set:{
            order_comfirm_time: Date.parse(new Date()),
            order_status
        }})
        ctx.status = 200;
        return ctx.body={
            status:'success',
            order_id:_id
        }
    }catch(e){
        return ctx.throw(500,'订单数据确认失败')
    }
}

async function checkin(ctx,orderid){
        try{
            const orderObj = await Order.findOne(orderid,userId);
        }catch(e){
            return ctx.throw(500,'订单数据查询错误')
        }
        if(!orderObj){
            return ctx.throw(404,`订单好像不是您的~~`)
        }
        let {
            _id,
            order_user_id,
            order_status,
            order_cancel_time
        } = orderObj;
        
        if(/^1/.test(order_status) || !!order_cancel_time){
            return ctx.throw(400,`当前订单已被取消或者已经结束`);
        }
        if(!(/011$/.test(order_status))){
            return ctx.throw(400,`当前订单状态异常`)
        }
        try{
            order_status = order_status.replace(/011$/,'111');
            await Order.update({_id,order_user_id},{$set:{
                order_checkin_time: Date.parse(new Date()),
                order_status
            }})
            ctx.status = 200;
            return ctx.body={
                status:'success',
                order_id:_id
            }
        }catch(e){
            return ctx.throw(500,'订单数据确认失败')
        }
}
async function checkout(ctx,orderid){

}

async function checkuserPower(needauth){
    return (ctx,auth)=>{
        if(auth - needauth > 0){
            return true;
        }else{
            return ctx.throw(400,`need more auth`)
        }
    }
}

exports.cancelOrder = async function cancelOrder (ctx,next){
    const { body } = ctx.request;
    const _id = ctx._id;
    const user = await Users.findOne({_id});

    let {user_type} = user;
    const orderId = ctx.params.orderid;
    // Order.findOne()
    if(user_type - 3 > 0 ){
        const orderObj = await Order.findOne({_id:orderId});

        if(!orderObj){
            return ctx.throw(`订单号也许不存在`);
        }
        let status = orderObj.order_status;
        status = status.replace(/^[0|1]/,'1');
        // 吧状态值改变

        const updateReturn = await Order.update({_id:orderId},{$set:{
            order_status: status,
            order_cancel_time: Date.parse(new Date())
        }})
        ctx.status = 200;

        return ctx.body = {
            data:updateReturn
        }
    }else{
        const orderObj = await Order.findOne({_id:orderId,order_user_id:id});
        
        const orderCancel = await Order.update({_id:orderId,order_user_id:id})
        
        ctx.status = 200
        return ctx.body = {
            data: orderCancel
        }
    }

}