const router = require('koa-router')()
const {
    getAllShowRoom,
    getAllRoom,
    getARoomDetail,
    deleteARoom,
    updateARoomDetail,
    addRoomDetail,
    getAllTypeIdAndName
} = require('../../controller/server/room')

router.prefix('/server/room')

/**
 * 注册接口
 */
router.get('/roomtypes',getAllTypeIdAndName) // 获得房间类型做选项卡
router.post('/new',addRoomDetail) // 增加一个房间

router.get('/list',getAllRoom) // 获得房间列表
router.get('/one/:roomid',getARoomDetail) // 获得某个房间详情
router.put('/edit/:roomid',updateARoomDetail) // 更新房间详情
router.delete('/roomitem/:roomid',deleteARoom) // 删除某个房间类型


module.exports = router
