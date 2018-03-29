const router = require('koa-router')()


router.prefix('/server/roomtype')

/**
 * 注册接口
 */
router.post('/new') // 增加一个房间类型

router.get('/list') // 获得房间类型列表
router.get('/one/:roomtypeid') // 获得某个房间类型详情 
router.put('/edit/:roomtypeid') // 更新房间类型
router.delete('/roomtypeitem/:roomtypeid') // 删除某个房间类型


module.exports = router
