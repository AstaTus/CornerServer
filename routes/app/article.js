/**
 * Created by AstaTus on 2016/2/26.
 */
var express = require('express');
var router = express.Router();
var MessagePacket = require("../../message/MessagePacket");
var ArticleMsg = require("../../message/ArticleMsg");
var ArticleDeleteMsg = require("../../message/ArticleDeleteMsg");
var CommentBlock = require("../../message/CommentBlock");
var UserArticleBlock = require('../../message/UserArticleBlock');
var UserBlock = require('../../message/UserBlock');
var CornerBlock = require('../../message/CornerBlock');
var articleService = require("../../service/ArticleService");
var ModelCode = require("../../config/ModelCode");
var LogicError = require("../../util/LogicError");
var log = require("../../util/Log");

var moment = require('moment');
router.get('/Obtain/User', function(req, res, next) {
    var params = req.query;
    var session = req.session;

    if(params.articleUserGuid == 0){
        params.articleUserGuid = session.userGuid;
    }

    articleService
        .obtainAriticleFromUser(session.userGuid, params.articleUserGuid, params.articleGuid, params.direction)
        .then(checkResult)
        .error(checkErr);

    function checkResult(data){
        var packet = new MessagePacket();
        var msg = new ArticleMsg();
        packet.msg = msg;
        packet.result = true;
        packet.msg.mIsTimeOut = data.isFull;

        var user = new UserBlock();
        user.mGuid = data.records.user.guid;
        user.mName = data.records.user.name;
        user.mHeadPath = data.records.user.headPath;

        for(var i = 0; i < data.records.articles.length; ++i){
            var article = data.records.articles[i];
            var corner = data.records.corners[i];
            var comments = data.records.comments[i];
            var uperCount = data.records.uperCounts[i];
            var isUp = data.records.isUps[i];

            var userArticleBlock = new UserArticleBlock();
            userArticleBlock.mGuid = article.guid;
            var time = moment(article.date);
            userArticleBlock.mTime = time.format('YYYY-MM-DD hh:mm:ss');
            userArticleBlock.mImagePath = article.image_path;
            userArticleBlock.mFeelText = article.text;
            userArticleBlock.mUpCount = uperCount;
            userArticleBlock.mReadCount = article.read_count;
            userArticleBlock.mIsUp = isUp;

            userArticleBlock.mCorner = new CornerBlock();
            userArticleBlock.mCorner.mGuid = corner.guid;
            userArticleBlock.mCorner.mName = corner.name;

            userArticleBlock.mUser = user;

            var comments = new Array();
            for (var j = 0; j < comments.length; ++j){
                var comment = new CommentBlock();
                comment.mArticleGuid = article.guid;
                comment.mGuid = comments[j].guid;
                comment.mReplyGuid = comments[j].reply_guid;
                comment.mReplyName = comments[j].nickname;
                comment.mHeadUrl = comments[j].head_path;
                comment.mTargetGuid = comments[j].target_guid;
                comment.mTargetName = comments[j].nickname1;
                comment.mFeelText = comment[j].text;
                comment.mTime = comment[j].date;

                userArticleBlock.mComments.push(comment);
            }

            msg.mArticles.push(userArticleBlock);
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

        log.getCurrent().error("Obtain/User:" + packet.resultCode);

        res.json(packet);
    }
});

router.post('/Delete', function(req, res, next) {
    var params = req.body;
    var session = req.session;

    articleService
        .deleteAriticleByGuid(session.userGuid, params.articleGuid)
        .then(checkResult)
        .then(checkErr);

    function checkResult(){
        var packet = new MessagePacket();
        packet.msg = new ArticleDeleteMsg();
        packet.msg.mGuid = params.articleGuid;
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

        log.getCurrent().error("Aarticle/Delete:" + packet.resultCode);

        res.json(packet);
    }
});

module.exports = router;