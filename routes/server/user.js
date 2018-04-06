const router = require('koa-router')()
const {
    registerAction,
    loginAction,
    deleteUser,
    updateInfo,
    showOneUserInfo,
    showAllUserInfo
} = require('../../controller/server/users.js')

router.prefix('/server/user')

/**
 * 注册接口
 */
router.post('/register',registerAction) // 创建用户
router.post('/login',loginAction) // 登录
router.get('/userlist', showAllUserInfo) // 查看用户列表 get参数 page页面码  size页面大小
router.get('/info',showOneUserInfo)// 查看用户信息 
router.put('/update/:userid',updateInfo) // 更改权限
router.delete('/delete/:userid',deleteUser) // 删除一个用户


module.exports = router
