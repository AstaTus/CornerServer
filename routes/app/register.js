/**
 * Created by AstaTus on 2016/1/1.
 */

var express = require('express');
var router = express.Router();
var RegisterMsg = require("../../message/RegisterMsg");
var MessagePacket = require("../../message/MessagePacket");
var userService = require("../../service/UserService")
var LogicError = require("../../util/LogicError");
var log = require("../../util/Log");

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


        if (e instanceof LogicError){
            packet.resultCode = e.code;
        }else{
            packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        }

        log.getCurrent().error("Register:" + packet.resultCode);

        res.json(packet);
    }
});

module.exports = router;
