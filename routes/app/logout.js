/**
 * Created by AstaTus on 2016/1/12.
 */
var express = require('express');
var router = express.Router();
var userService = require("../../service/UserService")
var LogoutMsg = require("../../message/LogoutMsg");
var MessagePacket = require("../../message/MessagePacket");
var ModelCode = require("../../config/ModelCode");
var LogicError = require("../../util/LogicError");
var log = require("../../util/Log");

router.post('/', function(req, res, next) {
    var session = req.session;
    userService.logout(session).then(checkResult).error(checkErr);

    function checkResult(){
        var packet = new MessagePacket();
        packet.msg = new LogoutMsg();
        packet.result = true;
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

        log.getCurrent().error("Logout:" + packet.resultCode);

        res.json(packet);
    }
});

module.exports = router;
