const router = require('koa-router')()


router.prefix('/frontend/pv')

/**
 * 注册接口
 */


router.post('/pv')
router.post('/location')


module.exports = router
