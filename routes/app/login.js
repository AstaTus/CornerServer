/**
 * Created by AstaTus on 2016/1/1.
 */

var express = require('express');
var router = express.Router();
var userService = require("../../service/UserService")
var LoginMsg = require("../../message/LoginMsg");
var MessagePacket = require("../../message/MessagePacket");


router.post('/', function(req, res, next) {
    var params = req.body;
    var session = req.session;
    userService.login(params.email, params.password).spread(checkResult).error(checkErr);

    function checkResult(userGuid){
        var packet = new MessagePacket();
        packet.msg = new LoginMsg();
        packet.result = true;
        session.userGuid = userGuid;
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
