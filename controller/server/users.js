const log = require('../../utils/log.js')
const users = require('../../models/index.js').users;
const crypto = require('crypto');
const jwt = require('../../utils/token.js')
const sendmail = require('../../mail/index.js')
const config = require('../../config/index.js')

const {
    checkAuthContain,
    canIEditHimOrHer
} = require('../public/auth')

const proxyfunction = require('../public/proxypublic');

// const checkAuth = checkAuthContain(`10`);
const adminAuthLists = {
    '111': [{
        key:'管理员',
        value: '011'
    },{
        key:'普通用户',
        value: '001'
    }],
    '011': [{
        key:'普通用户',
        value: '001'
    }],
    '001': [{}]
};


// 后台的token会多一个auth字段用于检查权限


// 创建新用户
exports.registerAction = async function(ctx,next){


    ctx.body = {
        test:123
    }

    const {_id} = ctx._tokens;
    // const _id = '5ac23af37260f730f016dbeb';
    const autheng = await checkAuthContain(_id,'10');
    if(!autheng){
        return ctx.throw(403,'没有足够的权限')
    }
    // return ;
    const user_name = ctx.request.body.username||''
    const user_password = ctx.request.body.password||''
    const user_email = ctx.request.body.email||''
    const user_auth = ctx.request.body.auth || '001';
    const user_type = ctx.request.body.type || 1;
    const user_phone = ctx.request.body.phone || 12345678901;

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
            user_type:user_type
        }

        var body = {};


        let ress
        try{
            let ress = await users.create(obj)
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
                isActive:!ress.user_active,
                user_active:user_active,
                token:jwt.sign({
                    '_id':ress._id,'user_type':ress.user_type
                })
            }
        }catch(e){
            log.error(e)
            ctx.throw(500,`用户创建失败`)
        }
}
exports.testRegisterAction = async function(ctx,next){


    ctx.body = {
        test:123
    }

    // const {_id} = ctx._tokens;
    // const autheng = await checkAuthContain(_id,'10');
    // if(!autheng){
    //     return ctx.throw(403,'没有足够的权限')
    // }
    // return ;
    const user_name = ctx.request.body.username||''
    const user_password = ctx.request.body.password||''
    const user_email = ctx.request.body.email||''
    const user_auth = ctx.request.body.auth || '001';
    const user_type = ctx.request.body.type || 1;
    const user_phone = ctx.request.body.phone || 12345678901;

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
            let ress = await users.create(obj)
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
                isActive:!ress.user_active,
                user_active:user_active,
                token:jwt.sign({
                    '_id':ress._id,'user_type':ress.user_type
                })
            }
        }catch(e){
            console.log(users)
            console.log(e);
            log.error(e)
            ctx.throw(500,`用户创建失败`)
        }
}



// TODO 这个接口应该是公共的
let be_active = async function (ctx, next) {
    const { body } = ctx.request;
    let active_value = body['key'] || ''
    if (!active_value) {
        return ctx.throw(400, `请查看传入的key值是否正确`)
    }
    let result
    try {
        result = await users.findOne({ "user_active": active_value })
        if (!result) {

            ctx.throw(400, 'active值有误')
            return next()
        }
        users.update({ "user_active": active_value }, { $set: { "user_active": '' } })
        ctx.status = 200
        return ctx.body = {
            message: 'success'
        }

    } catch (e) {
        log.error(e)
        return next();
    }
    return next()
}

exports.deleteUser = async function (ctx,next){

    // let {_id,user_auth} = ctx._token;
    let user_auth = '111',_id='5ac237bdb5e7da352cc53b95';

    const userid = ctx.params.userid || '0';
    const autheng = await canIEditHimOrHer(user_auth,userid);

    if(!autheng){
        return ctx.throw(403,'没有足够的权限')
    }

    
    if(_id == userid){
        return ctx.throw(400,'不能删除自身')
    }


    await users.remove({_id:userid})
    return ctx.body = {
        success:true 
    }

}
exports.updateInfo = async function (ctx,next){
    const {_id,user_auth:userauth} = ctx._tokens;
    const userid = ctx.params.userid;

    const autheng = await canIEditHimOrHer(userauth,userid);
    if(!autheng&& (_id!=userid)){
        return ctx.throw(403,'没有足够的权限')
    }


    const user_name = ctx.request.body.username||''
    const user_password = ctx.request.body.password||''
    const user_email = ctx.request.body.email||''
    const user_auth = ctx.request.body.auth || '001';
    const user_type = ctx.request.body.type || 1;


    const user_location = ctx.request.body.location || '广州'


    let user_last_login_time = user_register_time;
    let obj = {
            'user_name':user_name,
            'user_password':user_password,
            'user_email':user_email,
            user_phone,
            user_auth:user_auth,
            user_location,
            user_type:user_auth
        }
        if(userid == _id){
            delete obj['user_auth']
            delete obj['user_type']
        }
        var body = {};


        let ress
        try{
            let ress = await users.update({_id:userid},obj)
            sendmail.send({
                'to':user_email,
                'html':`<a href="${config.verifyEmail}/">点击此处进入网站</a>`,
                'text':'刚更新了您的信息 如果不是本人要求操作 可以申请网站申诉'
            })
            ctx.status = 200;
            return ctx.body={
                success:true,
                loginname:ress.user_name,
                id:ress._id,
                user_active:user_active,
                token:jwt.sign({
                    '_id':ress._id,'user_type':ress.user_type,'user_auth':ress.user_auth
                })
            }
        }catch(e){
            log.error(e)
            ctx.throw(500,`用户更新信息失败`)
        }
}
exports.showOneUserInfo = async function (ctx,next){
    const {_id , user_auth} = ctx._tokens;
    const userid = ctx.params.userid;
    const canI = await canIEditHimOrHer(user_auth,userid)
    if(!!canI){
        const userInfo = await proxyfunction.getUserMessage()
        ctx.status = 200;
        return ctx.body = {
            success:true,
            data: userInfo
        }
    }else{
        return ctx.throw(400,`没有足够权限查看`)
    }
}
exports.showAllUserInfo = async function (ctx,next){
    const { body } = ctx.request;
    const { _id, user_auth } = ctx._tokens;
    const { page, size} = ctx.query;
    const result = await proxyfunction.getAllUserMessage(size,page,user_auth);

    ctx.status = 200;
    return ctx.body = {
        totals:result.length,
        data: result
    }
}
exports.loginAction = async function  loginAction (ctx,next){
    let user_name = ctx.request.body.username||''
    let user_password = ctx.request.body.password||''
    
    if(user_name==''||user_password==''){
        return ctx.throw(400, `login error be deny`)
    }
    let obj = {
        user_name,
        user_password
    }
    let result
    try{
        result = await users.findOne(obj).exec();
        if(!result){
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
            'user_auth':result.user_auth,
            'user_type':result.user_type
        })
    }
}

function makeParams(limit){}


// module.exports={
//     registerAction,
//     testRegisterAction
// }

