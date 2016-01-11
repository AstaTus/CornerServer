/**
 * Created by AstaTus on 2016/1/1.
 */

var express = require('express');
var router = express.Router();
var userService = require("../../service/UserService")
var LoginMsg = require("../../message/LoginMsg");
var MessagePacket = require("../../message/MessagePacket");
var CodeConfig = require("../../config/CodeConfig")

router.post('/', function(req, res, next) {
    var params = req.body;
    var session = req.session;
    userService.login(params.email, params.password).spread(checkResult).error(checkErr);

    function checkResult(code, userGuid){
        var packet = new MessagePacket();
        packet.msg = new LoginMsg();
        packet.result = MessagePacket.RESULT_SUCESS;
        if (code == CodeConfig.LOGIN_EMAIL_NOT_EXIST){
            packet.msg.state = LoginMsg.ERROR;
        }else if(code == CodeConfig.LOGIN_EMAIL_OR_PASSWORD_ERROR){
            packet.msg.state = LoginMsg.ERROR;
        }else if (code == CodeConfig.LOGIN_SUCCESS){
            session.userGuid = userGuid;
            packet.msg.state = LoginMsg.SUCCESS;
        }
        res.json(packet);
    }

    function checkErr(e){
        var packet = new MessagePacket();
        packet.result = MessagePacket.RESULT_FAILED;
        packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        res.json(packet);
    }
});

module.exports = router;
