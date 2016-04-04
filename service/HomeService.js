/**
 * Created by AstaTus on 2016/3/31.
 */

var articleModel = require('../model/ArticleModel')
var userModel = require('../model/UserModel')
var cornerModel = require('../model/CornerModel')
var cornerFollowModel = require('../model/CornerFollowModel');
var commentModel = require('../model/CommentModel')
var upModel = require('../model/upModel')
var userFollowModel = require('../model/UserFollowModel')

var ModelCode = require("../config/ModelCode")
var ServiceCode = require("../config/ServiceCode")
var LogicError = require("../util/LogicError");
var promise = require('bluebird');
var ServiceDef = require('ServiceDef')
var ModelDef = require('ModelDef')
var log = require('../util/Log')

HomeService = function(){
}

HomeService.CORNER_ARTICLE_TYPE = 1;
HomeService.USER_ARTICLE_TYPE = 2;

HomeService.obtainHomeArticles = function(userGuid, followedGuids, cornerGuids, articleGuid, direction){
    var conditon;
    var count;

    var packages = {
        types:new Array(),
        articles:new Array(),
        corners:new Array(),
        comments:new Array(),
        uperCounts:new Array(),
        isUps:new Array(),
        users:new Array(),
        cornerFollowers:new Array(),
        cornerfollowStates:new Array(),
    };

    if(direction == ServiceDef.REQUEST_DIRECTION_UP){
        conditon = ModelDef.NEW_CONDITION;
        count = ServiceDef.NEW_PAGE_COUNT;
    }else{
        conditon = ModelDef.OLD_CONDITION;
        count = ServiceDef.NEW_PAGE_COUNT;
    }

    return getArticles().then(partArticles).then(obtainFullInfoArticles).then(resolve);

    function getArticles(){
        return articleModel.queryArticleByUserAndCorner(followedGuids, cornerGuids, articleGuid, conditon);
    }

    function partArticles(records){
        var articles = new Array();
        for(var i = 0; i < records.length; ++i){
            if(isCornerArticle(records[i])){
                articles.push({data:records[i], type:'corner'});
            }else{
                articles.push({data:records[i], type:'user'});
            }
        }

        return articles;
    }

    function obtainFullInfoArticles(articles) {

        return promise.all(promise.map(articles, function (article) {
            if (article.type == 'corner') {
                return promise.join(article.data,
                    cornerModel.queryCornerByGuid(article.data.corner_guid),
                    cornerFollowModel.queryCornerFollowers(article.data.corner_guid, 0, ModelDef.NO_CONDITON, 3),
                    handleCornerArticleRelativeData);
            } else {
                return promise.join(article.data,
                    userModel.queryUserByGuid(article.data.user_guid),
                    cornerModel.queryCornerByGuid(article.data.corner_guid),
                    commentModel.queryCommentsByArticle(article.data.guid, 0, commentModel.NO_CONDITION, 3),
                    upModel.queryUserGuidsByArticle(article.data.guid),
                    userFollowModel.queryFollow(userGuid, article.data.user_guid),
                    handleUserArticleRelativeData);
            }
        }));


        function handleCornerArticleRelativeData(article, corner, cornerFollowers){

            packages.types.push(HomeService.CORNER_ARTICLE_TYPE);
            packages.articles.push(article);
            packages.corners.push(corner);
            packages.comments.push(null);
            packages.uperCounts.push(null);
            packages.isUps.push(null);
            packages.users.push(null);
            packages.cornerFollowers.push(cornerFollowers);

            var state;
            for (i = 0; i < cornerFollowers.length; ++i){
                if (cornerFollowers[i].followed_guid == userGuid){
                    state = cornerFollowers[i].state;
                    break;
                }
            }

            packages.cornerfollowStates.push(state);
        }

        function handleUserArticleRelativeData(article, user, corner, comments, upers, userFollows){

            packages.types.push(HomeService.USER_ARTICLE_TYPE);
            packages.articles.push(article);
            packages.corners.push(corner);
            packages.comments.push(comments);
            packages.uperCounts.push(upers.length);
            packages.users.push(user);
            packages.cornerFollowers.push(null);
            packages.cornerfollowStates.push(null);

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

    function isCornerArticle(article){

        for (var i = 0; i < cornerGuids.length; ++i){
            if (cornerGuids[i] == article.corner_guid){
                return true;
            }
        }

        return false;
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

module.exports = HomeService;