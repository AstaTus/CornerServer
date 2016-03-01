/**
 * Created by AstaTus on 2016/2/26.
 */
var express = require('express');
var router = express.Router();
var MessagePacket = require("../../message/MessagePacket");
var ArticleMsg = require("../../message/ArticleMsg");
var articleService = require("../../service/ArticleService");

router.get('/', function(req, res, next) {
    var params = req.query;
    var session = req.session;

    articleService.obtainAriticleFromUser(session.userGuid, params.direction, params.time).spread(checkResult).error(checkErr);

    function checkResult(articleList, isFull){
        var packet = new MessagePacket();
        var msg = new ArticleMsg();
        packet.msg = msg;
        packet.result = true;
        packet.msg.mIsTimeOut = isFull;

        for(i = 0; i < articleList.length; ++i){
            msg.mGuids.push(articleList[i].guid);
            msg.mUserGuids.push(articleList[i].user_guid);
            msg.mCornerGuids.push(articleList[i].corner_guid);
            msg.mUserNames.push(articleList[i].corner_guid);

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