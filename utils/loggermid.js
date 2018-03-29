const log = require('./log.js')

function logfunction(){ 
    return async function(ctx,next){
        ctx._log = log 
        return await next();
    }
}
module.exports = logfunction