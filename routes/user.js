const router = require('koa-router')()

router.prefix('/users')

/**
 * 注册接口
 */
router.post('/register', regist.registerAction)
router.post('/login',login.LoginAction)
router.get('/users/info',userinfo)
router.get('/user/info')// 注册用户列表
router.put('/:id') // 更改权限
router.delete('/:id')
router.post('/new',async function(ctx,next){
    ctx.body = '123'
})
module.exports = router
