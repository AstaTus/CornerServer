/**
 * Created by AstaTus on 2016/2/14.
 */

var sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var ArticleEntity = require("../entity/ArticleEntity")
var promise = require('bluebird')
var ModelCode = require("../config/ModelCode")

var ArticleModel = function(){}

///////只考虑单库
ArticleModel.insertArticle = function(userGuid, cornerGuid, imageUrl, text){
    var sql = 'INSERT INTO article (user_guid, corner_guid, image_path, text, date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);';
    var options = [userGuid, cornerGuid, imageUrl, text];

    return sqlManager.excuteSqlAsync(sql, options).then(resolve);

    function resolve(result){
        return result.insertId;
    }
}

ArticleModel.NEW_CONDITION = 1;
ArticleModel.OLD_CONDITION = 2;


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
    else if (condition == ArticleModel.NEW_CONDITION){
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
}

ArticleModel.queryArticleByGuid = function(articleGuid){
    var sql = 'SELECT * FROM article WHERE guid = ?';
    var options = [articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}

ArticleModel.deleteArticle = function(articleGuid){
    var sql = 'DELETE * FROM article WHERE guid = ?';
    var options = [articleGuid];

    return sqlManager.excuteSqlAsync(sql, options).then(resolve);

    function resolve(result){
        if(result.affectedRows == 1)
            return ModelCode.ARTICLE_DELETE_SUCCESS;
        else if(result.affectedRows == 0)
            return ModelCode.ARTICLE_NOT_EXIST;
        else
            return ModelCode.DATABASE_KEY_REPEAT;
    }
}

ArticleModel.queryArticleByUserAndCorner = function(userGuids, cornerGuids, articleGuid, conditon, maxCount){

    var sql;
    var options;

    //拉取最新
    if(articleGuid == 0){

        sql = 'SELECT ' +
                '* ' +
            'FROM ' +
                'article ' +
            'WHERE ' +
                'user_guid in ?? OR corner_guid in ?? ' +
            'ORDER BY ' +
                'article.guid DESC ' +
            'LIMIT ' +
                '?;';

        options = [userGuids, cornerGuids, maxCount];

    }//上拉
    else if (condition == ArticleModel.NEW_CONDITION){
        sql = 'SELECT ' +
            '* ' +
            'FROM ' +
            'article ' +
            'WHERE ' +
            '(user_guid in ?? OR corner_guid in ??) AND article.guid > ?' +
            'ORDER BY ' +
            'article.guid DESC ' +
            'LIMIT ' +
            '?;';

        options = [userGuids, cornerGuids, articleGuid, maxCount];
    }//下拉
    else{
        sql = 'SELECT ' +
            '* ' +
            'FROM ' +
            'article ' +
            'WHERE ' +
            '(user_guid in ?? OR corner_guid in ??) AND article.guid < ? ' +
            'ORDER BY ' +
            'article.guid DESC ' +
            'LIMIT ' +
            '?;';

        options = [userGuids, cornerGuids, articleGuid, maxCount];
    }

    return sqlManager.excuteSqlAsync(sql, options);


}

module.exports = ArticleModel;