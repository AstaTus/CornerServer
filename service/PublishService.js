/**
 * Created by AstaTus on 2016/2/26.
 */
var articleModel = require('../model/ArticleModel')
var cornerModel = require('../model/CornerModel')
var promise = require('bluebird')
var log = require('../util/Log')
var CodeConfig = require('../config/CodeConfig')
var imageOss = require('../util/ImageOss')
var moment = require('moment');
var oss = require('ali-oss');
var co = require('co');
var uuid = require('node-uuid');

PublishService = function(){
}

PublishService.publishArticle = function(userGuid, cornerGuid, imageUrl, text){

    var isUpdateSucess = false;
    var imagePath;
    //检测cornerGuid 是否存在
    return promise.resolve(cornerGuid)
        .then(getCorner)
        .then(checkCornerValid)
        .then(uploadImageToOSS)
        .then(processPublish);

    function getCorner(cornerGuid){
        return cornerModel.queryCornerByGuid(cornerGuid);
    }

    function checkCornerValid(corner){
        if (corner != null) {
            return promise.resolve();
        }
        else{
            return promise.reject(new Error(CodeConfig.CORNER_NOT_EXIST));
        }
    }




    function uploadImageToOSS(){
        return co(function *(){
            var fileName = uuid.v1();
            var path = userGuid + '\\' + fileName + '.jpg';
            var object = yield imageOss.put(path, imageUrl);
            console.log(object);

            if(object.res.status == '200'){
                isUpdateSucess = true;
                imagePath = object.url;
            }
        });
    }

    function processPublish(){
        if (isUpdateSucess == false){
            return promise.reject(new Error(CodeConfig.PUBLISH_OSS_ERROR));
        }else{
            return articleModel.insertArticle(userGuid, cornerGuid, imagePath, text);
        }
    }
}

module.exports = PublishService;