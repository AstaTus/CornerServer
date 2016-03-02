/**
 * Created by AstaTus on 2016/2/26.
 */
var express = require('express');
var router = express.Router();
var MessagePacket = require("../../message/MessagePacket");
var ArticleMsg = require("../../message/ArticleMsg");
var CommentMsg = require("../../message/ArticleMsg");
var articleService = require("../../service/ArticleService");
var moment = require('moment');
router.get('/', function(req, res, next) {
    var params = req.query;
    var session = req.session;

    if (params.articleGuid == 0)
        params.articleGuid = session.userGuid;

    articleService.obtainAriticleFromUser(session.userGuid, params.articleGuid, params.direction, params.time).then(checkResult).error(checkErr);

    function checkResult(data){
        var packet = new MessagePacket();
        var msg = new ArticleMsg();
        packet.msg = msg;
        packet.result = true;
        packet.msg.mIsTimeOut = data.isFull;

        for(i = 0; i < data.records.articles.length; ++i){
            var article = data.records.articles[i];
            var corner = data.records.corners[i];
            var comments = data.records.comments[i];
            var uperCount = data.records.uperCounts[i];
            var isUp = data.records.isUps[i];

            msg.mGuids.push(article.guid);
            msg.mUserGuids.push(article.user_guid);
            msg.mUserNames.push(article.nickname);
            msg.mHeadUrls.push(article.head_url);
            var time = moment(article.date);
            msg.mTimes.push(time.format('YYYY-MM-DD hh:mm:ss'));
            msg.mImageUrls.push(article.image_url);
            msg.mFeelTexts.push(article.text);
            msg.mUpCounts.push(uperCount);
            msg.mReadCounts.push(article.read_count);
            msg.mLocationGuids.push(corner.guid);
            msg.mLocationNames.push(corner.name);
            msg.mIsUps.push(isUp);

            var comment = new CommentMsg();
            comment.mArticleGuid = article.guid;
            for (j = 0; j < comments.length; ++j){
                comment.mGuids.push(comments[j].guid);
                comment.mReplyGuids.push(comments[j].reply_guid);
                comment.mReplyNames.push(comments[j].nickname);
                comment.mHeadUrls.push(comments[j].head_url);
                comment.mTargetGuids.push(comments[j].target_guid);
                comment.mTargetNames.push(comments[j].nickname1);
                comment.mFeelTexts.push(comment[j].text);
                comment.mTimes.push(comment[j].date);
            }

            msg.mComments.push(comment);
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