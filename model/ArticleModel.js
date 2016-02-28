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
    //大于date时间的数据, 单服情况下不会有date重复的问题,date精度到毫秒
    if (condition == ArticleModel.MORE_TIME_CONDITION){
        sql = 'SELECT * FROM atitcle WHERE user_guid = ? AND date > ? ORDER BY date ASC LIMIT ?';
        options = [guid, time, maxCount];
    }//小于date时间的数据
    else{
        sql = 'SELECT * FROM atitcle WHERE user_guid = ? AND date < ? ORDER BY date ASC LIMIT ?';
        options = [guid, time, maxCount];
    }

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(records) {
        console.log('rows', records);

        var array = new Array();
        for(i = 0; i < records.size(); ++i){
            var article = new ArticleEntity();
            article.fromDatabase(records[i]);
            array.push(article);
        }

        var isFull = false;
        if (maxCount == array.length()){
            isFull = true;
        }
        return [array, isFull];
    }
}

module.exports =  ArticleModel;