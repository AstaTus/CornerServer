/**
 * Created by AstaTus on 2016/1/1.
 */

var express = require('express');
var router = express.Router();
var userService = require("../../service/UserService")
var LoginMsg = require("../../message/LoginMsg");
var MessagePacket = require("../../message/MessagePacket");
var ModelCode = require("../../config/ModelCode");
var LogicError = require("../../util/LogicError");
var log = require("../../util/Log");

router.post('/', function(req, res, next) {
    var params = req.body;
    var session = req.session;
    userService.login(params.email, params.password).spread(checkResult).error(checkErr).catch(checkErr);

    function checkResult(userGuid){
        var packet = new MessagePacket();
        packet.msg = new LoginMsg();
        packet.result = true;
        session.userGuid = userGuid;

        res.json(packet);
    }

    function checkErr(e){
        var packet = new MessagePacket();
        packet.result = false;
        if (e instanceof LogicError){
            packet.resultCode = e.code;
        }else{
            packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        }

        log.getCurrent().error("Login:" + packet.resultCode);
        res.json(packet);
    }
});

module.exports = router;
