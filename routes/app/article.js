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

    function checkResult(list, isFull){
        var packet = new MessagePacket();
        packet.msg = new ArticleMsg();
        packet.result = MessagePacket.RESULT_SUCESS;
        packet.msg.articleList = list;
        packet.msg.isTimeOut = isFull;
        res.json(packet);
    }

    function checkErr(e){
        var packet = new MessagePacket();
        packet.result = MessagePacket.RESULT_FAILED;
        packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        res.json(packet);
    }
});

module.exports = router;