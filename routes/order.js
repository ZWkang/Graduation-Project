const router = require('koa-router')()

router.prefix('/order')

/**
 * 注册接口
 */

router.post('/new')
router.get('/detail/:id')
router.put('/update')
router.delete('/delete')
router.get('/')
router.put('detail/update')
module.exports = router
