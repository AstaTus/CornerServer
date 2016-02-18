/**
 * Created by AstaTus on 2016/2/14.
 */

var postModel = require('../model/PostModel')
var cornerModel = require('../model/CornerModel')
var promise = require('bluebird')
var log = require('../util/Log')
var CodeConfig = require("../config/CodeConfig")
PostService = function(){

}

PostService.sendPost = function(userGuid, cornerGuid, imageUrl, text){

    //检测cornerGuid 是否存在
    return promise.resolve(cornerGuid)
        .then(getCorner)
        .then(checkCornerValid)
        .then(processSend);

    function getCorner(cornerGuid){
        return cornerModel.queryUserByEmail(email);
    }

    function checkCornerValid(corner){
        if (corner == null) {
            return promise.resolve();
        }
        else{
           return promise.reject(new Error(CodeConfig.REGISTER_EMAIL_REPEAT));
        }
    }

    function processSend(){
        return postModel.insertPost(userGuid, cornerGuid, date, imageUrl, text);
    }
}