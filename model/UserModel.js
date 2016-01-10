/**
 * Created by AstaTus on 2015/12/7.
 */

sqlManager = require('../database/SqlManager')
log = require('../util/Log')
var UserEntity = require("../entity/UserEntity")
var promise = require('bluebird')
var UserModel = function(){}

UserModel.insertUser = function(email, password, nickname, birth, sex){
    var sql = 'INSERT INTO User (email, password, nickname, birthday, sex) VALUES (?, ?, ?, ?, ?);';
    var options = [email, password, nickname, birth, sex];

    return sqlManager.excuteSqlAsync(sql, options).then(testReslove);

    function testReslove(result){
        if (result){
            return result.insertId;
        }
        return 0;
    }
}


UserModel.queryUserByEmail = function(email){
    var sql = 'SELECT * FROM User WHERE email = ?';
    var options = [email];

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(records){
        console.log('rows', records);

        if(records.length == 0){
            return null;
        }else if (records.length > 1){
            //记录日志
            log.getCurrent().fatal("UserModel.queryUserByEmail: user record is rpeat");
            return null;
        }else{
            var user = new UserEntity();
            user.fromDatabase(records[0]);

            return user;
        }
    }
}

UserModel.queryUserByNickname = function(nickname){
    var sql = 'SELECT * FROM User WHERE nickname = ?';
    var options = [nickname];

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(records){
        console.log('rows', records);

        if(records.length == 0){
            return null;
        }else if (records.length > 1){
            //记录日志
            log.getCurrent().fatal("UserModel.queryUserByNickname: user record is rpeat");
            return promise;
        }else{
            var user = new UserEntity();
            user.fromDatabase(rows[0]);

            return user;
        }
    }
}

module.exports =  UserModel;

