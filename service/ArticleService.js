/**
 * Created by AstaTus on 2016/2/14.
 */

var articleModel = require('../model/ArticleModel')
var userModel = require('../model/UserModel')
var cornerModel = require('../model/CornerModel')
var commentModel = require('../model/CornerModel')
var upModel = require('../model/CornerModel')
ArticleService = function(){
}

ArticleService.REQUEST_TYPE_PERSONAL = 1;
ArticleService.REQUEST_DIRECTION_UP = 1;
ArticleService.REQUEST_DIRECTION_DOWN = 2;

ArticleService.REQUEST_NEXT_PAGE_COUNT = 3;
ArticleService.REQUEST_NEWER_PAGE_COUNT = 6;

ArticleService.obtainAriticleFromUser = function(userGuid, articleUserGuid, direction, time){
    var conditon;
    var count;
    if(direction == ArticleService.REQUEST_DIRECTION_UP){
        conditon = articleModel.MORE_TIME_CONDITION;
        count = ArticleService.REQUEST_NEWER_PAGE_COUNT;
    }else{
        conditon = articleModel.LESS_TIME_CONDITION;
        count = ArticleService.REQUEST_NEXT_PAGE_COUNT;
    }

    Promise.resolve().then(findArticles).then(findRelativeDatas)


    function findArticles(guid, conditon, time, count){
        return articleModel.
            queryArticleByUser(articleUserGuid, conditon, time, count).
            then(findRelativeDatas);
    }

    function findRelativeDatas(records){

        Promise.map(records, function(record) {
            Promise.join(record,
                cornerModel.queryCornerByGuid(record.corner_guid),
                commentModel.queryFreshCommentsByArticle(record.article_guid, 3),
                upModel.queryUserGuidsByArticle(record.article_guid),
                handleRelativeData);
        });

        function handleRelativeData(article, corner, comments, upers){

        }
    }
}

module.exports = ArticleService;