const router = require('koa-router')()


router.prefix('/frontend/reply')

/**
 * 注册接口
 */


router.post('/new') // 新建一条评论

router.get('/detail/:replyid') // 获得评论细节
router.get('/list') // 获得个人评论列表

// router.put('cancel') // 删除个人评论 要不要个人对言论负责

module.exports = router
