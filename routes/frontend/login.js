const router = require('koa-router')()


router.prefix('/frontend/user')

/**
 * 注册接口
 */
router.post('/register') // 注册
router.post('/login')  // 登录

router.put('/message/:userid') // 更新自己的信息
router.put('/resetpass/:userid') // 重置密码

module.exports = router
