const router = require('koa-router')()


router.prefix('/server/orders')

/**
 * 注册接口
 */
router.post('/new')// 添加某个订单
router.get('/list') // 查看订单列表
router.get('/detail/:orderid')//  获得某个订单详情
router.put('/update/:orderid') // 更改订单详情
router.put('/cancel/:orderid') // 取消某个订单

router.put('/updatestatus/:orderid') // 修改某个订单状态



router.delete('/:orderid') // 删除某个订单
module.exports = router