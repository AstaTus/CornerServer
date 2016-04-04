/**
 * Created by AstaTus on 2016/3/24.
 */
var express = require('express');
var router = express.Router();
var homeService = require("../../service/UserService")
var userFollowService = require('../../service/UserFollowService')

var LoginMsg = require("../../message/LoginMsg");
var MessagePacket = require("../../message/MessagePacket");
var ModelCode = require("../../config/ModelCode");
var LogicError = require("../../util/LogicError");
var log = require("../../util/Log");

router.post('/', function(req, res, next) {
    var params = req.body;
    var session = req.session;

    userFollowService
        .obtainFollowedUsers(session.userGuid)
        .then(checkFollowedUsers)
        .then(getHomeArticles)
        .then(checkResult)
        .catch(checkErr);

    function checkFollowedUsers(records){

        var followedGuids = new Array();

        for (var i = 0; i < records.length; ++i){
            followedGuids.push(records[i].followed_guid);
        }

        return followedGuids;
    }

    function getHomeArticles(followedGuids){
        return homeService.obtainHomeArticles(
            session.userGuid, followedGuids, params.cornerGuids, params.articleGuid, params.direction);
    }

    function checkResult(userGuid){
        var packet = new MessagePacket();
        packet.msg = new LoginMsg();
        packet.result = true;
        session.userGuid = userGuid;

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

        log.getCurrent().error("Login:" + packet.resultCode);
        res.json(packet);
    }
});

module.exports = router;
