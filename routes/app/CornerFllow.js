/**
 * Created by AstaTus on 2016/3/24.
 */
var express = require('express');
var router = express.Router();
var cornerFllowService = require('../../service/cornerFllowService');
var MessagePacket = require("../../message/MessagePacket");
var CornerFllowStateMsg = require('../../message/CornerFllowStateMsg');
var CornerFllowUnFllowMsg = require('../../message/CornerFllowUnFllowMsg');
var CodeConfig = require('../../config/CodeConfig');
router.post('/BeenTo', function(req, res, next) {
    var params = req.body;
    var session = req.session;
    cornerFllowService
        .BeenTo(session.userGuid, params.cornerGuid)
        .then(checkResult)
        .error(checkErr);

    function checkResult(state){
        var packet = new MessagePacket();
        packet.msg = new CornerFllowStateMsg();
        packet.result = true;
        packet.msg.mCornerGuid = params.cornerGuid;
        if (state == CodeConfig.CORNER_FLLOW_FLAG_BEEN_STATE){
            packet.msg.mState = CornerFllowStateMsg.CODE_STATE_BEEN_TO;
        }else{
            packet.msg.mState = CornerFllowStateMsg.CODE_UNFUP_STATE;
        }

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
    upService.changeUpState(session.userGuid, params.articleGuid).then(checkResult).error(checkErr);

    function checkResult(state){
        var packet = new MessagePacket();
        packet.msg = new UpChangeStateMsg();
        packet.result = true;
        packet.msg.mArticleGuid = params.articleGuid;
        if (state == CodeConfig.UP_MAKE){
            packet.msg.mIsUp = UpChangeStateMsg.CODE_UP_STATE;
        }else{
            packet.msg.mIsUp = UpChangeStateMsg.CODE_UNUP_STATE;
        }

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
    upService.changeUpState(session.userGuid, params.articleGuid).then(checkResult).error(checkErr);

    function checkResult(state){
        var packet = new MessagePacket();
        packet.msg = new UpChangeStateMsg();
        packet.result = true;
        packet.msg.mArticleGuid = params.articleGuid;
        if (state == CodeConfig.UP_MAKE){
            packet.msg.mIsUp = UpChangeStateMsg.CODE_UP_STATE;
        }else{
            packet.msg.mIsUp = UpChangeStateMsg.CODE_UNUP_STATE;
        }

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
