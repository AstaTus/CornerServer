/**
 * Created by AstaTus on 2016/3/1.
 */

var sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var promise = require('bluebird')
var UpModel = function(){}

UpModel.insertUp = function(userGuid, articleGuid){
    var sql = 'INSERT INTO up (user_guid, article_guid) VALUES (?, ?);';
    var options = [userGuid, articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);

}


UpModel.deleteUp = function(userGuid, articleGuid){
    var sql = 'DELETE FROM up WHERE user_guid = ? AND article_guid = ?';
    var options = [userGuid, articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}


UpModel.queryUp = function(userGuid, articleGuid){
    var sql = 'SELECT * FROM up WHERE user_guid = ? AND article_guid = ?;';
    var options = [userGuid, articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}

UpModel.queryUpCountByArticle = function(articleGuid){
    var sql = 'SELECT user_guid, COUNT(*) FROM up WHERE article_guid = ?';
    var options = [articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}

UpModel.queryUserGuidsByArticle = function(articleGuid){
    var sql = 'SELECT user_guid FROM up WHERE article_guid = ?';
    var options = [articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}

module.exports =  UpModel;