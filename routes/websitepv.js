const router = require('koa-router')()
router.prefix('/pv')

/**
 * 注册接口
 */
router.post('/')// 点击量
router.post('/userlocation') //用户所在地
module.exports = router
