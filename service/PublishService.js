/**
 * Created by AstaTus on 2016/2/26.
 */
var articleModel = require('../model/ArticleModel')
var cornerModel = require('../model/CornerModel')
var promise = require('bluebird')
var log = require('../util/Log')

var ModelCode = require("../config/ModelCode")
var ServiceCode = require("../config/ServiceCode")
var LogicError = require("../../service/LogicError");

var imageOss = require('../util/ImageOss')
var moment = require('moment');
var oss = require('ali-oss');
var co = require('co');
var uuid = require('node-uuid');
var urlencode = require('urlencode');

PublishService = function(){
}

PublishService.publishArticle = function(userGuid, cornerGuid, imageUrl, text){

    var isUpdateSucess = false;
    var imagePath;
    //检测cornerGuid 是否存在
    return cornerModel.queryCornerByGuid(cornerGuid)
        .then(checkCornerValid)
        .then(uploadImageToOSS)
        .then(processPublish);


    function checkCornerValid(records){
        if (records.length == 1) {
            return ;
        }
        else if (records.length == 0){
            return promise.reject(new LogicError(ModelCode.CORNER_NOT_EXIST));
        }else{
            return promise.reject(new LogicError(ModelCode.DATABASE_KEY_REPEAT));
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
                imagePath = urlencode(path);
            }
        });
    }

    function processPublish(){
        if (isUpdateSucess == false){
            return promise.reject(new LogicError(ServiceCode.ARTICLE_OSS_ADD_FAILED));
        }else{
            return articleModel
                .insertArticle(userGuid, cornerGuid, imagePath, text)
                .then(processResolve);
        }
    }

    function processResolve(insertId){
        return ;
    }
}

module.exports = PublishService;