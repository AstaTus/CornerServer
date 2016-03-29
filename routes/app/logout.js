/**
 * Created by AstaTus on 2016/1/12.
 */
var express = require('express');
var router = express.Router();
var userService = require("../../service/UserService")
var LogoutMsg = require("../../message/LogoutMsg");
var MessagePacket = require("../../message/MessagePacket");

router.post('/', function(req, res, next) {
    var session = req.session;
    userService.logout(session).then(checkResult).error(checkErr);

    function checkResult(){
        var packet = new MessagePacket();
        packet.msg = new LogoutMsg();
        packet.result = true;
        packet.msg.mResult = true;
        res.json(packet);
    }

    function checkErr(e){
        var packet = new MessagePacket();
        packet.result = false;
        packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        res.json(packet);
    }
});

module.exports = router;
