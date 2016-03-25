/**
 * Created by AstaTus on 2016/3/24.
 */
var sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var promise = require('bluebird')
var ModelCode = require('../config/ModelCode')
var UserFllowModel = function(){}

UserFllowModel.insertFllow = function(user_guid, fllow_guid){
    var sql = 'INSERT INTO user_fllow (user_guid, fllow_guid) VALUES (?, ?);';
    var options = [user_guid, fllow_guid];

    return sqlManager.excuteSqlAsync(sql, options).then(resolve);

    function resolve(result){
        return ModelCode.USER_FLLOW_INSERT_SUCCESS;
    }
}

UserFllowModel.deleteFllow = function(user_guid, fllow_guid){
    var sql = 'DELETE * FROM user_fllow WHERE user_guid = ? AND fllow_guid = ?;';
    var options = [user_guid, fllow_guid];

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


UserFllowModel.queryFllow = function(user_guid, fllow_guid){
    var sql = 'SELECT * FROM user_fllow WHERE user_guid = ? AND fllow_guid = ?';
    var options = [user_guid, fllow_guid];

    return sqlManager.excuteSqlAsync(sql, options);

    /*function reslove(records){
        if(records.length == 0){
            return null;
        }else if (records.length > 1){
            //记录日志
            log.getCurrent().fatal("UserFllowModel.queryFllow: user_fllow record is rpeat");
            return promise.reject(new Error(CodeConfig.USER_FLLOW_REPEAT));
        }else{
            return records[0];
        }
    }*/
}

UserFllowModel.queryUserFllows = function(user_guid){
    var sql = 'SELECT * FROM User WHERE user_guid = ?';
    var options = [user_guid];

    return sqlManager.excuteSqlAsync(sql, options);
}

UserFllowModel.queryFllowedUsers = function(fllow_guid){
    var sql = 'SELECT * FROM User WHERE fllow_guid = ?';
    var options = [fllow_guid];

    return sqlManager.excuteSqlAsync(sql, options);
}

module.exports =  UserFllowModel;
