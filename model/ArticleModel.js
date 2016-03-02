/**
 * Created by AstaTus on 2016/2/14.
 */

sqlManager = require('../database/SqlManager')
log = require('../util/Log')
var ArticleEntity = require("../entity/ArticleEntity")
var promise = require('bluebird')
var ArticleModel = function(){}

ArticleModel.insertArticle = function(userGuid, cornerGuid, date, imageUrl, text){
    var sql = 'INSERT INTO article (user_guid, corner_guid, date, image_uri, text) VALUES (?, ?, ?, ?, ?);';
    var options = [userGuid, cornerGuid, date, imageUrl, text];

    return sqlManager.excuteSqlAsync(sql, options).then(checkResult);

    function checkResult(result){
        if (result){
            return result.insertId;
        }
        return 0;
    }
}

ArticleModel.MORE_TIME_CONDITION = 1;
ArticleModel.LESS_TIME_CONDITION = 2;

ArticleModel.queryArticleByUser = function(guid, condition, time, maxCount){
    var sql;
    var options;
    //time 为空的情况
    if(time == null || time == ''){
        sql = 'SELECT ' +
                  'article.*, user.nickname, user.head_url ' +
              'FROM ' +
                  'article INNER JOIN user ' +
              'WHERE ' +
                  'article.user_guid = ? AND ' +
                  'article.user_guid = user.guid ' +
              'ORDER BY ' +
                  'date DESC ' +
              'LIMIT ' +
                 '?;';
        options = [guid, maxCount];
    }//大于date时间的数据, 单服情况下不会有date重复的问题,date精度到毫秒
    else if (condition == ArticleModel.MORE_TIME_CONDITION){
        sql = 'SELECT ' +
                'article.*, user.nickname, user.head_url ' +
            'FROM ' +
                'article INNER JOIN user ' +
            'WHERE ' +
                'article.user_guid = ? AND ' +
                'article.date > ? AND ' +
                'article.user_guid = user.guid ' +
            'ORDER BY ' +
                'date DESC ' +
            'LIMIT ' +
                '?;';
        //sql = 'SELECT * FROM article WHERE user_guid = ? AND date > STR_TO_DATE(?, "%Y-%m-%d %T") ORDER BY date DESC LIMIT ?';
        options = [guid, time, maxCount];
    }//小于date时间的数据
    else{
        sql = 'SELECT ' +
                'article.*, user.nickname, user.head_url ' +
            'FROM ' +
                'article INNER JOIN user ' +
            'WHERE ' +
                'article.user_guid = ? AND ' +
                'article.date < ? AND ' +
                'article.user_guid = user.guid ' +
            'ORDER BY ' +
                'date DESC ' +
            'LIMIT ' +
                '?;';
        //sql = 'SELECT * FROM article WHERE user_guid = ? AND date < STR_TO_DATE(?, "%Y-%m-%d %T") ORDER BY date DESC LIMIT ?';
        options = [guid, time, maxCount];
    }

    return sqlManager.excuteSqlAsync(sql, options);

    /*function reslove(records) {
        console.log('rows', records);

        var array = new Array();
        for(i = 0; i < records.length; ++i){
            var article = new ArticleEntity();
            article.fromDatabase(records[i]);
            array.push(article);
        }

        var isFull = false;
        if (maxCount == records.length){
            isFull = true;
        }
        return [records, isFull];
    }*/
}

module.exports =  ArticleModel;