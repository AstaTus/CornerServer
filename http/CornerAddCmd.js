/**
 * Created by AstaTus on 2016/3/16.
 */
var PostRequest = require('./PostRequest')
var AmapConfig = require('../config/AmapConfig')
var urlencode = require('urlencode');
var CornerAddCmd = function(name, location){

    this.CMD_METHOD = 'datamanage/data/create';
    this.body = {
        key:AmapConfig.YUNTU_SERVER_KEY,
        tableid:AmapConfig.YUNTU_TABLE_ID,
        loctype:1,
        data:JSON.stringify({_name:name, _location:location, pic:"aaaaaa"})
    }
}

CornerAddCmd.prototype.excuteAsync = function(){
    var post = new PostRequest();
    return post.excute(AmapConfig.YUNTU_HTTP_ADDRESS + this.CMD_METHOD, this.body);
}

module.exports = CornerAddCmd;