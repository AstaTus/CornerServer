/**
 * Created by AstaTus on 2016/1/1.
 */

var BaseMsg = require('./BaseMsg')
function RegisterMsg(){
    this.code = RegisterMsg.SUCESS;
}

RegisterMsg.SUCESS = 0;
RegisterMsg.EMAIL_REAPT = 1;
RegisterMsg.NICKNAME_REPEAT = 2;
RegisterMsg.PASSWORD_ERROR = 3;

RegisterMsg.prototype = new BaseMsg();

module.exports = RegisterMsg

