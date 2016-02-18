/**
 * Created by AstaTus on 2016/1/12.
 */
var express = require('express');
var router = express.Router();
var userService = require("../../service/UserService")
var LogoutMsg = require("../../message/LogoutMsg");
var MessagePacket = require("../../message/MessagePacket");
var CodeConfig = require("../../config/CodeConfig")

router.post('/', function(req, res, next) {
    var session = req.session;
    userService.logout(session).then(checkResult).error(checkErr);

    function checkResult(success){
        var packet = new MessagePacket();
        packet.msg = new LogoutMsg();
        packet.result = MessagePacket.RESULT_FAILED;
        packet.msg.code = LogoutMsg.SUCCESS;
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
