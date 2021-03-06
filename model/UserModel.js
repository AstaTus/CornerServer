/**
 * Created by AstaTus on 2015/12/7.
 */

var sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var promise = require('bluebird')
var ModelCode = require('../config/ModelCode')

var UserModel = function(){}

UserModel.insertUser = function(email, password, nickname, birth, sex){
    var sql = 'INSERT INTO User (email, password, nickname, birthday, sex) VALUES (?, ?, ?, ?, ?);';
    var options = [email, password, nickname, birth, sex];

    return sqlManager.excuteSqlAsync(sql, options).then(resolve);

    function resolve(result){
        return result.insertId;
    }
}

UserModel.queryUserByEmail = function(email){
    var sql = 'SELECT * FROM User WHERE email = ?';
    var options = [email];

    return sqlManager.excuteSqlAsync(sql, options);

    /*function reslove(records){
        console.log('rows', records);

        if(records.length == 0){
            return null;
        }else if (records.length > 1){
            //记录日志
            log.getCurrent().fatal("UserModel.queryUserByEmail: user record is rpeat");
            return promise.reject(new Error(CodeConfig.USER_REPEAT));
        }else{
            return records[0];
        }
    }*/
}

UserModel.queryUserByGuid = function(guid){
    var sql = 'SELECT * FROM User WHERE guid = ?';
    var options = [guid];

    return sqlManager.excuteSqlAsync(sql, options);

    /*function reslove(records){
        console.log('rows', records);

        if(records.length == 0){
            return null;
        }else if (records.length > 1){
            //记录日志
            log.getCurrent().fatal("UserModel.queryUserByGuid: user record is rpeat");
            return promise.reject(new Error(CodeConfig.USER_REPEAT));
        }else{
            return records[0];
        }
    }*/
}

UserModel.queryUserByNickname = function(nickname){
    var sql = 'SELECT * FROM User WHERE nickname = ?';
    var options = [nickname];

    return sqlManager.excuteSqlAsync(sql, options);

    /*function reslove(records){
        console.log('rows', records);

        if(records.length == 0){
            return null;
        }else if (records.length > 1){
            //记录日志
            log.getCurrent().fatal("UserModel.queryUserByNickname: user record is rpeat");
            return promise.reject(new Error(CodeConfig.USER_REPEAT));
        }else{
            return records[0];
        }
    }*/
}

module.exports =  UserModel;

