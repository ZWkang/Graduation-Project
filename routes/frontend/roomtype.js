const router = require('koa-router')()


router.prefix('/frontend/roomtype')

/**
 * 注册接口
 */


router.get('/list') // 获得房间列表
router.get('/one/:roomid') // 获得某个房间详情 


module.exports = router
