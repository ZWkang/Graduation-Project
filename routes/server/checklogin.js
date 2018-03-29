const router = require('koa-router')()


router.prefix('/server/check')

/**
 * 入住退房接口
 */


router.put('/checkin/:orderid')// 办理入住操作
router.put('/checkout/:orderid')// 办理退房操作


module.exports = router
