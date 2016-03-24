/**
 * Created by AstaTus on 2016/3/24.
 */
var sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var promise = require('bluebird')
var CodeConfig = require('../config/CodeConfig')

var UserFllowModel = function(){}

UserFllowModel.insertFllow = function(user_guid, fllow_guid){
    var sql = 'INSERT INTO user_fllow (user_guid, fllow_guid) VALUES (?, ?);';
    var options = [user_guid, fllow_guid];

    return sqlManager.excuteSqlAsync(sql, options).then(checkResult);

    function checkResult(result){
        if (result.affectedRows == 1){
            return true;
        }
        return false;
    }
}

UserFllowModel.deleteFllow = function(user_guid, fllow_guid){
    var sql = 'DELETE * FROM user_fllow WHERE user_guid = ? AND fllow_guid = ?;';
    var options = [user_guid, fllow_guid];

    return sqlManager.excuteSqlAsync(sql, options).then(checkResult);

    function checkResult(result){
        if (result.affectedRows == 1){
            return true;
        }
        return false;
    }
}


UserFllowModel.queryFllow = function(user_guid, fllow_guid){
    var sql = 'SELECT * FROM user_fllow WHERE user_guid = ? AND fllow_guid = ?';
    var options = [user_guid, fllow_guid];

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(records){
        if(records.length == 0){
            return null;
        }else if (records.length > 1){
            //记录日志
            log.getCurrent().fatal("UserFllowModel.queryFllow: user_fllow record is rpeat");
            return promise.reject(new Error(CodeConfig.USER_FLLOW_REPEAT));
        }else{
            return records[0];
        }
    }
}

UserFllowModel.queryUserFllows = function(user_guid){
    var sql = 'SELECT * FROM User WHERE user_guid = ?';
    var options = [user_guid];

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(records){
        return records;
    }
}

UserFllowModel.queryFllowedUsers = function(fllow_guid){
    var sql = 'SELECT * FROM User WHERE fllow_guid = ?';
    var options = [fllow_guid];

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(records){
        return records;
    }
}

module.exports =  UserFllowModel;
