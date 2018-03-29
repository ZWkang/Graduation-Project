const router = require('koa-router')()


router.prefix('/frontend/order')

/**
 * 注册接口
 */


router.post('/new') // 提交
router.get('/detail') // 获得个人一个订单详情 
router.get('/list') // 获得个人订单列表
router.put('cancel') // 取消一个订单
router.put('comfirm') // 确认一个订单


module.exports = router
