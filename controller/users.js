const log = require('../utils/log.js')
const users = require('../models/index.js').users;
const crypto = require('crypto');
const jwt = require('../utils/token.js')
const sendmail = require('../mail/index.js')
const config = require('../config/index.js')

let registerAction = async function(ctx,next){
    const user_name = ctx.request.body.username||''
    const user_password = ctx.request.body.password||''
    const user_email = ctx.request.body.email||''
    const user_auth = ctx.request.body.auth || '001';
    
    const user_location = ctx.request.body.location || '广州'

    let md5sum = crypto.createHash('md5');
    
        let user_register_time = Date.parse(Date('Y-m-d'));
        md5sum.update(
            user_name + config.PROJECT_KEY + user_register_time
        );
        let user_active = md5sum.digest('hex');

        let user_last_login_time = user_register_time;
        let obj = {
            'user_name':user_name,
            'user_password':user_password,
            'user_email':user_email,
            'user_active':user_active,
            'user_register_time':user_register_time,
            'user_last_login_time':user_last_login_time,
            user_phone,
            user_auth,
            user_location,
            user_type:1
        }

        var body = {};


        let ress
        try{
            let ress = await koauser.create(obj)
            sendmail.send({
                'to':user_email,
                'html':`<a href="${config.verifyEmail}/?key = ${user_active}">点击此处验证邮箱</a>`,
                'text':'验证邮箱信息点击'
            })
            ctx.status = 200;
            return ctx.body={
                success:true,
                loginname:ress.user_name,
                id:ress._id,
                isActive:!!ress.user_active,
                token:jwt.sign({
                    '_id':ress._id,'user_type':ress.user_type
                })
            }
        }catch(e){
            log.error(e)
            ctx.throw(500,`用户注册失败`)
        }
}

let be_active = async function(ctx,next){

    // const body = ctx.request&&ctx.request.body
    const { body } = ctx.request;
    let active_value = body['key']||''
    if(!active_value){
        // return ctx.body = {
        //     success:false,
        //     errormessage:'active值为空'
        // }
        return ctx.throw(400,`请查看传入的key值是否正确`)
    }
    let result
    try{
        result = await users.findOne({"user_active":active_value})
        if(!result){
            
            ctx.throw(400,'active值有误')
            return next()
        }
        users.update({"user_active":active_value},{$set:{"user_active":''}})
        ctx.status = 200
        return ctx.body = {
            message: 'success'
        }

    }catch(e){
         log.error(e)
         return next();
    }
    return next()
}

async function adminLogin (ctx,next){
    let user_name = ctx.request.body.username||''
    let user_password = ctx.request.body.password||''
    
    if(user_name==''||user_password==''){
        return ctx.throw(400, `login error be deny`)
    }
    let obj = {
        user_name,
        user_password
    }
    try{
        let result = await koauser.findOne(obj).exec();
        if(result.length==0){
            throw new Error();
        }
    }catch(e){
        return ctx.throw(400,'login be deny')
    }
    ctx.status = 200;
    return ctx.body={
        success:true,
        id:result._id,
        loginname:result.user_name,
        
        tokens:jwt.sign({
            '_id':result._id,
            'user_auth':result.user_auth
        })
    }
}
module.exports={
    registerAction
}