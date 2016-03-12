/**
 * Created by AstaTus on 2016/3/10.
 */

var express = require('express');
var router = express.Router();
var upService = require('../../service/UpService');
var MessagePacket = require("../../message/MessagePacket");
var UpChangeStateMsg = require('../../message/UpChangeStateMsg');
var CodeConfig = require('../../config/CodeConfig');
router.post('/ChangeState', function(req, res, next) {
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
