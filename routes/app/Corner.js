/**
 * Created by AstaTus on 2016/3/16.
 */
var express = require('express');
var router = express.Router();
var cornerService = require("../../service/CornerService")
var CornerAddMsg = require("../../message/CornerAddMsg");
var MessagePacket = require("../../message/MessagePacket");

var ModelCode = require("../../config/ModelCode");
var LogicError = require("../../util/LogicError");
var log = require("../../util/Log");

router.post('/Add', function(req, res, next) {

    var params = req.body;
    var session = req.session;

    cornerService.addCorner(session.userGuid, params.name, params.location)
        .then(checkResult)
        .error(checkErr);

    function checkResult(record){
        var packet = new MessagePacket();
        var msg = new CornerAddMsg();
        packet.result = true;
        packet.msg = msg;

        msg.mGuid = record.guid;
        msg.mName = record.name;

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

        log.getCurrent().error("Corner/Add:" + packet.resultCode);
        res.json(packet);
    }
})

module.exports = router;