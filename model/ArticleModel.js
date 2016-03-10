/**
 * Created by AstaTus on 2016/2/14.
 */

sqlManager = require('../database/SqlManager')
log = require('../util/Log')
var ArticleEntity = require("../entity/ArticleEntity")
var promise = require('bluebird')
var ArticleModel = function(){}

///////只考虑单库
ArticleModel.insertArticle = function(userGuid, cornerGuid, imageUrl, text){
    var sql = 'INSERT INTO article (user_guid, corner_guid, image_path, text, date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);';
    var options = [userGuid, cornerGuid, imageUrl, text];

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

ArticleModel.queryArticleByUser = function(guid, articleGuid, condition, maxCount){
    var sql;
    var options;
    //拉去最新的article
    if(articleGuid == 0){
        sql = 'SELECT ' +
                  '* ' +
              'FROM ' +
                  'article ' +
              'WHERE ' +
                  'user_guid = ? ' +
              'ORDER BY ' +
                  'article.guid DESC ' +
              'LIMIT ' +
                 '?;';
        options = [guid, maxCount];
    }//拉取比该articleGuid新的article
    else if (condition == ArticleModel.MORE_TIME_CONDITION){
        sql = 'SELECT ' +
                '* ' +
            'FROM ' +
                'article ' +
            'WHERE ' +
                'article.user_guid = ? AND ' +
                'article.guid > ? ' +
            'ORDER BY ' +
                'article.guid DESC ' +
            'LIMIT ' +
                '?;';
        //sql = 'SELECT * FROM article WHERE user_guid = ? AND date > STR_TO_DATE(?, "%Y-%m-%d %T") ORDER BY date DESC LIMIT ?';
        options = [guid, articleGuid, maxCount];
    }//
    else{
        sql = 'SELECT ' +
                '* ' +
            'FROM ' +
                'article ' +
            'WHERE ' +
                'article.user_guid = ? AND ' +
                'article.guid < ? ' +
            'ORDER BY ' +
                'article.guid DESC ' +
            'LIMIT ' +
                '?;';
        //sql = 'SELECT * FROM article WHERE user_guid = ? AND date < STR_TO_DATE(?, "%Y-%m-%d %T") ORDER BY date DESC LIMIT ?';
        options = [guid, articleGuid, maxCount];
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

ArticleModel.queryArticleByGuid = function(articleGuid){
    var sql = 'SELECT * FROM article WHERE guid = ?';
    var options = [articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}

ArticleModel.deleteArticle = function(articleGuid){
    var sql = 'DELETE * FROM article WHERE guid = ?';
    var options = [articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}

module.exports = ArticleModel;