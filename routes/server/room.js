const router = require('koa-router')()


router.prefix('/server/room')

/**
 * 注册接口
 */
router.post('/new') // 增加一个房间

router.get('/list') // 获得房间列表
router.get('/one/:roomid') // 获得某个房间详情 
router.put('/edit/:roomid') // 更新房间详情
router.delete('/roomitem/:roomid') // 删除某个房间类型


module.exports = router
