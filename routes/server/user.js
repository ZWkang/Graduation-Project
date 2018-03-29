const router = require('koa-router')()


router.prefix('/server/user')

/**
 * 注册接口
 */
router.post('/register')
router.post('/login')
router.get('/userlist')
router.get('/info')// 注册用户列表
router.put('/update/:id') // 更改权限
router.delete('/:id') // 删除一个用户


module.exports = router
