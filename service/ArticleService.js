/**
 * Created by AstaTus on 2016/2/14.
 */

var articleModel = require('../model/ArticleModel')

ArticleService = function(){
}

ArticleService.REQUEST_TYPE_PERSONAL = 1;
ArticleService.REQUEST_DIRECTION_UP = 1;
ArticleService.REQUEST_DIRECTION_DOWN = 2;

ArticleService.REQUEST_NEXT_PAGE_COUNT = 3;
ArticleService.REQUEST_NEWER_PAGE_COUNT = 6;

ArticleService.obtainAriticleFromUser = function(guid, direction, time){
    var conditon;
    var count;
    if(direction == ArticleService.REQUEST_DIRECTION_UP){
        conditon = articleModel.MORE_TIME_CONDITION;
        count = ArticleService.REQUEST_NEWER_PAGE_COUNT;
    }else{
        conditon = articleModel.LESS_TIME_CONDITION;
        count = ArticleService.REQUEST_NEXT_PAGE_COUNT;
    }

    return articleModel.queryArticleByUser(guid, conditon, time, count);
}

module.exports = ArticleService ;