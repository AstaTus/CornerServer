/**
 * Created by AstaTus on 2016/2/14.
 */

var articleModel = require('../model/ArticleModel')
var userModel = require('../model/UserModel')
var cornerModel = require('../model/CornerModel')
var commentModel = require('../model/CommentModel')
var upModel = require('../model/upModel')
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
    var records = {
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
        conditon = articleModel.MORE_TIME_CONDITION;
        count = ArticleService.REQUEST_NEWER_PAGE_COUNT;
    }else{
        conditon = articleModel.LESS_TIME_CONDITION;
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

    function checkArticleUser(user){
        if (user){
            records.user.guid = user.guid;
            records.user.name = user.nickname;
            records.user.headPath = user.head_path;

            return;

        }else{
                return promise.reject(new Error(CodeConfig.USER_NOT_EXIST));
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
                 commentModel.queryFreshCommentsByArticle(article.guid, 3),
                upModel.queryUserGuidsByArticle(article.guid),
                handleRelativeData);
        }));

        function handleRelativeData(article, corner, comments, upers){

            records.articles.push(article);
            records.corners.push(corner);
            records.comments.push(comments);
            records.uperCounts.push(upers.length);

            var isUp = false;
            for (i = 0; i < upers.length; ++i){
                if (upers[i] == userGuid){
                    isUp = true;
                }
            }
            records.isUps.push(isUp);
        }
    }

    function resolve(){

        var isFull = false;
        if (records.length == count){
            isFull = true;
        }

        var data = {
            records: records,
            isFull: isFull
        };

        return data;
    }
}

module.exports = ArticleService;