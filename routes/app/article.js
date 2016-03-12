/**
 * Created by AstaTus on 2016/2/26.
 */
var express = require('express');
var router = express.Router();
var MessagePacket = require("../../message/MessagePacket");
var ArticleMsg = require("../../message/ArticleMsg");
var ArticleDeleteMsg = require("../../message/ArticleDeleteMsg");
var CommentBlock = require("../../message/CommentBlock");
var articleService = require("../../service/ArticleService");
var moment = require('moment');
router.get('/Obtain', function(req, res, next) {
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

        var user = data.records.user;

        for(var i = 0; i < data.records.articles.length; ++i){
            var article = data.records.articles[i];
            var corner = data.records.corners[i];
            var comments = data.records.comments[i];
            var uperCount = data.records.uperCounts[i];
            var isUp = data.records.isUps[i];

            msg.mGuids.push(article.guid);
            msg.mUserGuids.push(user.guid);
            msg.mUserNames.push(user.name);
            msg.mHeadUrls.push(user.headPath);
            var time = moment(article.date);
            msg.mTimes.push(time.format('YYYY-MM-DD hh:mm:ss'));
            msg.mImagePaths.push(article.image_path);
            msg.mFeelTexts.push(article.text);
            msg.mUpCounts.push(uperCount);
            msg.mReadCounts.push(article.read_count);
            msg.mLocationGuids.push(corner.guid);
            msg.mLocationNames.push(corner.name);
            msg.mIsUps.push(isUp);

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

                comments.push(comment);
            }

            msg.mComments.push(comments);
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

    articleService
        .deleteAriticleByGuid(session.userGuid, params.articleGuid)
        .then(checkResult)
        .then(checkErr);

    function checkResult(result){
        var packet = new MessagePacket();
        var msg = new ArticleDeleteMsg();
        packet.msg = msg;
        packet.result = true;
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