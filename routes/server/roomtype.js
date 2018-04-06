const router = require('koa-router')()
const {
    addRoomType,
    getOneRoomType,
    getAllRoomType,
    updateRoomType,
    deleteRoomType,
} = require('../../controller/server/roomType.js')

router.prefix('/server')

/**
 * 注册接口
 */
router.post('/add',addRoomType) // 增加一个房间类型

router.get('/list',getAllRoomType) // 获得所有房间类型列表
router.get('/one/:roomtypeid',getOneRoomType) // 获得某个房间类型详情 
router.put('/edit/:roomtypeid',updateRoomType) // 更新房间类型
router.delete('/roomtypeitem/:roomtypeid',deleteRoomType) // 删除某个房间类型


module.exports = router
