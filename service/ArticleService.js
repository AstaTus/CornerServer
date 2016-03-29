/**
 * Created by AstaTus on 2016/2/14.
 */

var articleModel = require('../model/ArticleModel')
var userModel = require('../model/UserModel')
var cornerModel = require('../model/CornerModel')
var commentModel = require('../model/CommentModel')
var upModel = require('../model/upModel')

var ModelCode = require("../config/ModelCode")
var ServiceCode = require("../config/ServiceCode")
var LogicError = require("../util/LogicError");
var promise = require('bluebird')

ArticleService = function(){
}

ArticleService.REQUEST_TYPE_PERSONAL = 1;
ArticleService.REQUEST_DIRECTION_UP = 1;
ArticleService.REQUEST_DIRECTION_DOWN = 2;

ArticleService.REQUEST_NEXT_PAGE_COUNT = 3;
ArticleService.REQUEST_NEWER_PAGE_COUNT = 6;

ArticleService.obtainAriticleFromUser = function(userGuid, articleUserGuid, articleGuid, direction){
    var conditon;
    var count;
    var packages = {
        articles:new Array(),
        corners:new Array(),
        comments:new Array(),
        uperCounts:new Array(),
        isUps:new Array(),
        user:{
            guid:0,
            name:'',
            headPath:'',
        }
    }
    if(direction == ArticleService.REQUEST_DIRECTION_UP){
        conditon = articleModel.NEW_CONDITION;
        count = ArticleService.REQUEST_NEWER_PAGE_COUNT;
    }else{
        conditon = articleModel.OLD_CONDITION;
        count = ArticleService.REQUEST_NEXT_PAGE_COUNT;
    }

    return findArticleUser()
        .then(checkArticleUser)
        .then(findUserArticles)
        .then(findRelativeDatas)
        .then(resolve);

    function findArticleUser(){
        return userModel.queryUserByGuid(articleUserGuid);
    }

    function checkArticleUser(records){
        if(records.length == 1){
            packages.user.guid = records[0].guid;
            packages.user.name = records[0].nickname;
            packages.user.headPath = records[0].head_path;

            return;
        }else if(records.length == 0){
            return promise.reject(new LogicError(ServiceCode.USER_NOT_EXIST));
        }
    }

    function findUserArticles(){
        return articleModel.
            queryArticleByUser(articleUserGuid, articleGuid, conditon, count)
    }

    function findRelativeDatas(articles){
        return promise.all(promise.map(articles, function(article) {
             return promise.join(article,
                cornerModel.queryCornerByGuid(article.corner_guid),
                 commentModel.queryCommentsByArticle(article.guid, 3, commentModel.NO_CONDITION, 0),
                upModel.queryUserGuidsByArticle(article.guid),
                handleRelativeData);
        }));

        function handleRelativeData(article, corner, comments, upers){

            packages.articles.push(article);
            packages.corners.push(corner);
            packages.comments.push(comments);
            packages.uperCounts.push(upers.length);

            var isUp = false;
            for (i = 0; i < upers.length; ++i){
                if (upers[i] == userGuid){
                    isUp = true;
                    break;
                }
            }
            packages.isUps.push(isUp);
        }
    }

    function resolve(){
        var isFull = false;
        if (packages.length == count){
            isFull = true;
        }

        var data = {
            records: packages,
            isFull: isFull
        };

        return data;
    }
}

ArticleService.deleteAriticleByGuid = function(userGuid, articleGuid){

    return articleModel
        .queryArticleByGuid(articleGuid).then(checkArticle);

    function checkArticle(articles){

        if (articles.length == 1){
            if (article.user_guid == userGuid){
                return articleModel.deleteArticle(articleGuid).then(resolve);
            }else{
                return promise.reject(new LogicError(ServiceCode.USER_NO_AUTH));
            }
        }else{
            return promise.reject(new LogicError(ModelCode.ARTICLE_NOT_EXIST));
        }
    }

    function resolve(code){
        if (code == ModelCode.ARTICLE_DELETE_SUCCESS){
            return;
        }else{
            return promise.reject(new LogicError(code));
        }
    }
}

module.exports = ArticleService;