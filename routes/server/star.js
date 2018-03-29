const router = require('koa-router')()


router.prefix('/server/star')

/**
 * 注册接口
 */

router.get('/list') // 获得点赞列表

router.get('/all') // 获得某个房间的所有点赞人数信息

router.delete('/staritem/:starid') // 删除某个房间类型


module.exports = router
