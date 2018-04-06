const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// const index = require('./routes/index')
// const users = require('./routes/users')
// const articles = require('./routes/article')
// const collection = require('./routes/collect')
const cors = require('kcors');
const handler = require('./utils/hanlerError')
const log = require('./utils/log.js')
const jwt = require('jsonwebtoken')
const jwtcheck = require('./utils/getheader')
const CONFIG = require('./config/index')

const loggers = require('./utils/loggermid.js')

const roomtype = require('./routes/server/roomtype')
const room = require('./routes/server/room')
const users = require('./routes/server/user')

// error handler
onerror(app)




// middlewares
// 注入日志方法
// app.use(loggers)
app.use(async function (ctx,next){
  ctx._config = CONFIG
  await next()
})

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  log.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(handler())
app.use(jwtcheck({"forget":true}))
// console.log(roomtype)
// app.use(roomtype.routes(),roomtype.allowedMethods)

// app.use(room.routes(),room.allowedMethods)

app.use(users.routes(),users.allowedMethods)



// console.log(room.routes())
// app.use(async (ctx,next)=>{
//   return ctx.body = {
//     r: room
//   }
// })
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
// app.use(articles.routes(),articles.allowedMethods())
// app.use(collection.routes(),collection.allowedMethods())



module.exports = app
