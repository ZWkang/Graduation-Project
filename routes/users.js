const router = require('koa-router')()
const regist = require('../controller/register.js')
const login = require('../controller/login.js')
const userinfo = require('../controller/datagetter.js').userinfo
router.prefix('/users')

/**
 * 注册接口
 */
router.post('/register', regist.registerAction)
router.post('/login',login.LoginAction)
router.get('/info/:id',userinfo)
router.get('/list')// 注册用户列表
router.put('/authchange/:id') // 更改权限
router.delete('/:id')
router.post('/new',async function(ctx,next){
    ctx.body = '123'
})
module.exports = router
