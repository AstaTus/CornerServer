/**
 * Created by AstaTus on 2016/2/26.
 */
var articleModel = require('../model/ArticleModel')
var cornerModel = require('../model/CornerModel')
var promise = require('bluebird')
var log = require('../util/Log')
var CodeConfig = require("../config/CodeConfig")
var moment = require('moment');
PublishService = function(){
}

PublishService.publishArticle = function(userGuid, cornerGuid, imageUrl, text){

    //检测cornerGuid 是否存在
    return promise.resolve(cornerGuid)
        .then(getCorner)
        .then(checkCornerValid)
        .then(processSend);

    function getCorner(cornerGuid){
        return cornerModel.queryCornerByGuid(cornerGuid);
    }

    function checkCornerValid(corner){
        if (corner != null) {
            return promise.resolve();
        }
        else{
            return promise.reject(new Error(CodeConfig.REGISTER_EMAIL_REPEAT));
        }
    }

    function processSend(){
        var now = moment();
        return articleModel.insertArticle(userGuid, cornerGuid, now, imageUrl, text);
    }
}

module.exports = PublishService;