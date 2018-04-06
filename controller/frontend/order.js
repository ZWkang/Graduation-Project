const Order = require('../../models/index.js').order;
const User = require('../../models/index.js').user;
const checkin = require('../../models/index.js').checkin;
exports.getOneOrder = function(ctx,next){
    
    const token = ctx._tokens;
    const { _id } = token;
    let orderId = this.ctx.params.id;
    const data = await Order.findOne({_id:orderId}).lean();
    let { order_status } = data;

    if(/111$/.test(order_status)){
        data['checkin_list'] = await checkin.findOne({order_id:orderId})
    }

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
        const {
            enter_number,enter_days,
            order_room_id,order_roomType_id
        } = body;
        const obj = {
            order_user_id: _id,
            order_create_time: new Date(),
            order_status: '00001',
            order_stop_time: new Date() + 1000*30*60,
            order_enter_number:enter_number,
            order_enter_days: enter_days,
            order_roomType_id,
            order_room_id
        }
        // TODO: 这里还要同步上锁
        const orderObj = await Order.create(obj);
        
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
            return await comfirm(ctx,orderId,_id);
            break;
        case 'cancel':
            return await cancelOrder(ctx,next);
            break;
        default:
            
            break;

    }
}

exports.orderList = async function orderList(ctx,next){
    const {_id} = ctx._token;
    const result = await order.find({order_user_id:_id});
    const ordertype = ctx.request.body.ordertype || 'all';

    let result = {};
    switch(ordertype){
        case 'all':
            result = await order.find({order_user_id:_id});
            break;
        case 'canceled':
            result = await order.find({
                order_user_id:_id,order_status:/^1/
            })
            break;
        case 'needcomfim':
            result = await order.find({
                order_user_id:_id,order_status:/01$/
            })
            break;
        case 'checkined':
            result = await order.find({
                order_user_id:_id,order_status:/^(?!(1))00111$/
            })
            break;
        case 'checkouted':
            result = await order.find({
                order_user_id:_id,order_status:/^(?!(1))01111$/
            })
            break;
        case 'comfirmed':
            result = await order.find({
                order_user_id:_id,order_status:/^(?!(1))00011$/
            })
            break;
        default :
            result = await order.find({order_user_id:_id});
            break;
    }
    return ctx.body = {
        data:result 
    }

}
async function isOwnOrder(orderId,userId){
    const orderObj = await Order.findOne({order_user_id:userId,orderId:orderId})
    return orderObj;
}
exports.comfirm = async function comfirm(ctx,next){
    const {body} = ctx.request;
    let {
        updatetype,
        orderId,
    } = body
    let {_id} = ctx._tokens;

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
    const _id = ctx._token._id;
    // const user = await Users.findOne({_id});

    // let {user_type} = user;
    const orderId = ctx.params.orderid;
    // Order.findOne()
    // if(user_type - 3 > 0 ){
    //     const orderObj = await Order.findOne({_id:orderId});

    //     if(!orderObj){
    //         return ctx.throw(`订单号也许不存在`);
    //     }
    //     let status = orderObj.order_status;
    //     status = status.replace(/^[0|1]/,'1');
    //     // 吧状态值改变

    //     const updateReturn = await Order.update({_id:orderId},{$set:{
    //         order_status: status,
    //         order_cancel_time: Date.parse(new Date())
    //     }})
    //     ctx.status = 200;
    //     // TODO： 解除lock
    //     return ctx.body = {
    //         data:updateReturn
    //     }
    // }else{
        const orderObj = await Order.findOne({_id:orderId,order_user_id:id});
        if(!orderObj){
            throw new Error( '取消订单出错 可能不是你自己的');

            return ;
        }
        let status = orderObj.order_status;
        status = status.replace(/^[0|1]/,'1');
        const orderCancel = await Order.update({_id:orderId,order_user_id:id},{$set:{
            order_status: status,
            order_cancel_time: Date.parse(new Date())
        }})
        // TODO：取消lock 房间
        // 
        ctx.status = 200
        return ctx.body = {
            data: orderCancel
        }
    // }

}