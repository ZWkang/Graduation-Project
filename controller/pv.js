const pv = require('../models/index.js').pv;


exports.addPvLoaction = async function (ctx,next){
    const { body } = ctx.request;

    const {
        location,
        page
    } = body 
    await pv.create({
        location,
        page
    })
    return true;
}

exports.getPvNumbers = async function (ctx,next){
    const count = await pv.count();
    return ctx.body = {
        count
    }
}
exports.getPvLocationLists = async function(ctx, next){
    const result = await pv.find({number:0,router:0})
    return ctx.body = {
        data: result
    }
}