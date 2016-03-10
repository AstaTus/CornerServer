/**
 * Created by AstaTus on 2016/3/10.
 */

var express = require('express');
var router = express.Router();
var commentService = require("../../service/CommentService")
var CommentObtainMsg = require("../../message/CommentObtainMsg");
var CommentDeleteMsg = require("../../message/CommentDeleteMsg");
var MessagePacket = require("../../message/MessagePacket");
var CodeConfig = require("../../config/CodeConfig")

router.get('/Obtain', function(req, res, next) {
    var params = req.query;
    var session = req.session;
    commentService
        .obtainCommentFromArticle(params.articleGuid, params.commentGuid, params.directon)
        .then(checkResult)
        .then(checkErr);

    function checkResult(data){
        var packet = new MessagePacket();
        var msg = new CommentObtainMsg();
        packet.msg = msg;
        packet.result = true;

        for (var i = 0; i < data.length; ++i){
            msg.mGuids.push(data[i].guid);
            msg.mReplyGuids.push(data[i].reply_guid);
            msg.mReplyNames.push(data[i].nickname);
            msg.mHeadUrls.push(data[i].head_path);
            msg.mTargetGuids.push(data[i].target_guid);
            msg.mTargetNames.push(data[i].nickname1);
            msg.mFeelTexts.push(data[i].text);
            msg.mTimes.push(data[i].date);
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

router.post('/Add', function(req, res, next) {
    var params = req.body;
    var session = req.session;

    commentService
        .addComment(params.articleGuid, session.userGuid, params.targetGuid, params.text)
        .then(checkResult)
        .then(checkErr);


    function checkResult(data){
        var packet = new MessagePacket();
        var msg = new CommentObtainMsg();
        packet.msg = msg;
        packet.result = true;

        for (var i = 0; i < data.length; ++i){
            msg.mGuids.push(data[i].guid);
            msg.mReplyGuids.push(data[i].reply_guid);
            msg.mReplyNames.push(data[i].nickname);
            msg.mHeadUrls.push(data[i].head_path);
            msg.mTargetGuids.push(data[i].target_guid);
            msg.mTargetNames.push(data[i].nickname1);
            msg.mFeelTexts.push(data[i].text);
            msg.mTimes.push(data[i].date);
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

router.post('/Delete', function(req, res, next) {
    var params = req.body;
    var session = req.session;

    commentService
        .deleteComment(session.userGuid, params.commentGuid)
        .then(checkResult)
        .then(checkErr);


    function checkResult(result){
        var packet = new MessagePacket();
        var msg = new CommentDeleteMsg();
        packet.msg = msg;
        packet.result = true;
        packet.msg.mResult = result;

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
