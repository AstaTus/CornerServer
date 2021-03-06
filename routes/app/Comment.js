/**
 * Created by AstaTus on 2016/3/10.
 */

var express = require('express');
var router = express.Router();
var commentService = require("../../service/CommentService")
var CommentObtainMsg = require("../../message/CommentObtainMsg");
var CommentRemoveMsg = require("../../message/CommentRemoveMsg");
var CommentAddMsg = require("../../message/CommentAddMsg");
var CommentBlock = require("../../message/CommentBlock");
var MessagePacket = require("../../message/MessagePacket");
var moment = require('moment')
var ModelCode = require("../../config/ModelCode");
var LogicError = require("../../util/LogicError");
var log = require("../../util/Log");

router.get('/Obtain', function(req, res, next) {
    var params = req.query;
    var session = req.session;
    commentService
        .obtainCommentFromArticle(params.articleGuid, params.commentGuid, params.direction)
        .then(checkResult)
        .error(checkErr);

    function checkResult(data){
        var packet = new MessagePacket();
        var msg = new CommentObtainMsg();
        packet.msg = msg;
        packet.result = true;

        msg.mIsTimeOut = data.isFull;
        for (var i = 0; i < data.comments.length; ++i){
            var block = new CommentBlock();

            block.mGuid = data.comments[i].guid;
            block.mArticleGuid = data.comments[i].article_guid;
            block.mReplyGuid = data.comments[i].reply_guid;
            block.mReplyName = data.comments[i].nickname;
            block.mHeadUrl = data.comments[i].head_path;

            block.mTargetGuid = data.comments[i].target_guid;
            block.mTargetName = data.comments[i].nickname1;
            var time = moment(data.comments[i].date);
            block.mTime = time.format('YYYY-MM-DD hh:mm:ss');
            block.mText = data.comments[i].text;
            msg.mCommentBlocks.push(block);
        }

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

        log.getCurrent().error("Comment/Obtain:" + packet.resultCode);

        res.json(packet);
    }
});

router.post('/Add', function(req, res, next) {
    var params = req.body;
    var session = req.session;

    if (params.targetGuid == 0){
        params.targetGuid = null;
    }

    commentService
        .addComment(params.articleGuid, session.userGuid, params.targetGuid, params.text)
        .then(checkResult)
        .error(checkErr);


    function checkResult(record){
        var packet = new MessagePacket();
        var msg = new CommentAddMsg();
        var block = new CommentBlock();
        packet.msg = msg;
        msg.mBlock = block;
        packet.result = true;

        block.mGuid = record.guid;
        block.mArticleGuid = record.articleGuid;
        block.mReplyGuid = record.replyGuid;
        block.mReplyName = record.replyName;
        block.mHeadUrl = record.headPath;

        block.mTargetGuid = record.targetGuid;
        block.mTargetName = record.targetName;

        var time = moment(record.time);
        block.mTime = time.format('YYYY-MM-DD hh:mm:ss');
        block.mText = record.text;
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

        log.getCurrent().error("Comment/Add:" + packet.resultCode);

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


    function checkResult(){
        var packet = new MessagePacket();
        var msg = new CommentRemoveMsg();
        packet.msg = msg;
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

        log.getCurrent().error("Comment/Delete:" + packet.resultCode);
        res.json(packet);
    }
});
module.exports = router;
