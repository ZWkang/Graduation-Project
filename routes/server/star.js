const router = require('koa-router')()

const {
    deleteStar,
    showAllStar,
    getARoomtypeStars
} = require('../../controller/server/star')

router.prefix('/server/star')

/**
 * 注册接口
 */

router.get('/list',showAllStar) // 获得点赞列表

router.get('/all/:roomtypeid',getARoomtypeStars) // 获得某个房间的所有点赞人数信息

router.delete('/staritem/:starid',deleteStar) // 删除某个房间类型点赞


module.exports = router
