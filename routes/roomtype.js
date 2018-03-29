const router = require('koa-router')()
const regist = require('../controller/register.js')
const login = require('../controller/login.js')
const roomType = require('../controller/roomType.js')
router.prefix('/roomtype')

/**
 * 注册接口
 */

const {
    addRoomType,
    getOneRoomType,
    getAllRoomType,
    updateRoomType,
    deleteRoomType
} = roomType


router.post('/add', regist.registerAction)
// router.post('/login',login.LoginAction)
router.get('/list/:',getOneRoomType)
router.get('/lists',getAllRoomType)// 注册用户列表
router.put('/update/:roomtypeid',updateRoomType) // 更改权限
router.delete('/delete/:roomtypeid',deleteRoomType)
router.post('/new',async function(ctx,next){
    ctx.body = '123'
})
module.exports = router
