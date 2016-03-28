/**
 * Created by AstaTus on 2016/3/24.
 */
var express = require('express');
var router = express.Router();
var cornerFllowService = require('../../service/cornerFllowService');
var MessagePacket = require("../../message/MessagePacket");
var CornerFllowStateMsg = require('../../message/CornerFllowStateMsg');
var CornerFllowUnFllowMsg = require('../../message/CornerFllowUnFllowMsg');
router.post('/BeenTo', function(req, res, next) {
    var params = req.body;
    var session = req.session;
    cornerFllowService
        .BeenTo(session.userGuid, params.cornerGuid)
        .then(checkResult)
        .error(checkErr);

    function checkResult(){
        var packet = new MessagePacket();
        packet.msg = new CornerFllowStateMsg();
        packet.result = true;
        packet.msg.mCornerGuid = params.cornerGuid;
        packet.msg.mState = CornerFllowStateMsg.CODE_STATE_BEEN_TO;

        res.json(packet);
    }

    function checkErr(e){
        var packet = new MessagePacket();
        packet.result = false;
        packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        res.json(packet);
    }
});

router.post('/WantTo', function(req, res, next) {
    var params = req.body;
    var session = req.session;
    cornerFllowService
        .WantTo(session.userGuid, params.cornerGuid)
        .then(checkResult)
        .error(checkErr);

    function checkResult(){

        var packet = new MessagePacket();
        packet.msg = new CornerFllowStateMsg();
        packet.result = true;
        packet.msg.mCornerGuid = params.cornerGuid;
        packet.msg.mState = CornerFllowStateMsg.CODE_STATE_WANT_TO;

        res.json(packet);
    }

    function checkErr(e){
        var packet = new MessagePacket();
        packet.result = false;
        packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        res.json(packet);
    }
});

router.post('/UnFllow', function(req, res, next) {
    var params = req.body;
    var session = req.session;
    cornerFllowService
        .UnFllow(session.userGuid, params.cornerGuid)
        .then(checkResult)
        .error(checkErr);

    function checkResult(){
        var packet = new MessagePacket();
        packet.msg = new CornerFllowUnFllowMsg();
        packet.result = true;
        packet.msg.mCornerGuid = params.cornerGuid;
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
