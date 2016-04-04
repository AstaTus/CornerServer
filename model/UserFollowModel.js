/**
 * Created by AstaTus on 2016/3/24.
 */
var sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var promise = require('bluebird')
var ModelCode = require('../config/ModelCode')
var UserFllowModel = function(){}

UserFllowModel.insertFollow = function(userGuid, followedGuid){
    var sql = 'INSERT INTO user_follow (user_guid, followed_guid) VALUES (?, ?);';
    var options = [userGuid, followedGuid];

    return sqlManager.excuteSqlAsync(sql, options).then(resolve);

    function resolve(result){
        return ModelCode.USER_FLLOW_INSERT_SUCCESS;
    }
}

UserFllowModel.deleteFollow = function(userGuid, followedGuid){
    var sql = 'DELETE * FROM user_follow WHERE user_guid = ? AND followed_guid = ?;';
    var options = [userGuid, followedGuid];

    return sqlManager.excuteSqlAsync(sql, options).then(resolve);

    function resolve(result){
        if (result.affectedRows == 1)
            return ModelCode.USER_FLLOW_DELETE_SUCCESS;
        else if (result.affectedRows == 0)
            return ModelCode.USER_FLLOW_NOT_EXIST;
        else
            return ModelCode.USER_FLLOW_RECORD_REPEAT;
    }
}


UserFllowModel.queryFollow = function(userGuid, followGuid){
    var sql = 'SELECT * FROM user_follow WHERE user_guid = ? AND followed_guid = ?';
    var options = [userGuid, followGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}

//查找用户的被关注用户
UserFllowModel.queryUserFollowers = function(userGuid){
    var sql = 'SELECT * FROM user_follow WHERE followed_guid = ?';
    var options = [user_guid];

    return sqlManager.excuteSqlAsync(sql, options);
}

//查找用户关注的用户
UserFllowModel.queryFollowedUsers = function(userGuid){
    var sql = 'SELECT * FROM user_follow WHERE user_guid = ?';
    var options = [fllow_guid];

    return sqlManager.excuteSqlAsync(sql, options);
}

module.exports =  UserFllowModel;
