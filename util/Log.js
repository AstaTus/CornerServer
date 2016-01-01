/**
 * Created by AstaTus on 2015/12/12.
 */

var bunyan = require('bunyan')
function Log(){
}

Log.sBunyan = null;

Log.getCurrent = function(){

    if(Log.sBunyan == null){
        Log.sBunyan = bunyan.createLogger({name: "myapp"});
    }

    return Log.sBunyan;
}

module.exports = Log;