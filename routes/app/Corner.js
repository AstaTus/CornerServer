/**
 * Created by AstaTus on 2016/3/16.
 */
var express = require('express');
var router = express.Router();
var cornerService = require("../../service/CornerService")
var CornerAddMsg = require("../../message/CornerAddMsg");
var MessagePacket = require("../../message/MessagePacket");


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
        packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        res.json(packet);
    }
})

module.exports = router;