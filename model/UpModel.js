/**
 * Created by AstaTus on 2016/3/1.
 */

var sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var promise = require('bluebird')
var ModelCode = require('../config/ModelCode')

var UpModel = function(){}

UpModel.insertUp = function(userGuid, articleGuid){
    var sql = 'INSERT INTO up (user_guid, article_guid) VALUES (?, ?);';
    var options = [userGuid, articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);

    function resolve(result){
        return ModelCode.UP_INSERT_SUCCESS;
    }
}

UpModel.deleteUp = function(userGuid, articleGuid){
    var sql = 'DELETE FROM up WHERE user_guid = ? AND article_guid = ?';
    var options = [userGuid, articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);

    function reslove(result){

        if(result.affectedRows == 1)
            return ModelCode.UP_DELETE_SUCCESS;
        else if(result.affectedRows == 0)
            return ModelCode.UP_NOT_EXIST;
        else
            return ModelCode.UP_RECORD_REPEAT;
    }
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