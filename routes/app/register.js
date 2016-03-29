/**
 * Created by AstaTus on 2016/1/1.
 */

var express = require('express');
var router = express.Router();
var RegisterMsg = require("../../message/RegisterMsg");
var MessagePacket = require("../../message/MessagePacket");
var userService = require("../../service/UserService")
var Log = require('../../util/Log')

router.post('/', function(req, res, next) {
    var params = req.body;
    var session = req.session;
    userService.register(params.email, params.password, params.nickname, params.birthday, params.sex)
        .then(checkResult)
        .error(checkErr)

    function checkResult(insertGuid){
        var packet = new MessagePacket();
        packet.msg = new RegisterMsg();
        packet.result = true;
        packet.msg.mResult = true;
        session.userGuid = insertGuid;

        res.json(packet);
    }

    function checkErr(e){
        var packet = new MessagePacket();
        packet.msg = new RegisterMsg();
        packet.result = false;
        /*if(e.message == CodeConfig.REGISTER_EMAIL_REPEAT){
            msg.code = RegisterMsg.CODE_EMAIL_REAPT;
        }
        else if(e.message == CodeConfig.REGISTER_NICKNAME_REPEAT){
            msg.code = RegisterMsg.CODE_NICKNAME_REPEAT;
        }
        else if(e.message == CodeConfig.REGISTER_PASSWORD_ERROR){
            msg.code = RegisterMsg.PASSWORD_FORMAT_ERROR;
        }
        else{
            packet.result = false;
            packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
            //log error
        }*/

        res.json(packet);
    }
});

module.exports = router;
