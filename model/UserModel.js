/**
 * Created by AstaTus on 2015/12/7.
 */

sqlManager = require('../database/SqlManager')
log = require('../utils/Log')
var UserModel = function(){}

UserModel.insertUser = function(email, password, nickname, birth, sex){
    var sql = 'INSERT INTO User (email, password, nickname, birth, sex) VALUES (??);';
    var options = [email, password, nickname, birth, sex];

    return sqlManager.excuteSqlAsync(sql, options);
}


UserModel.queryUser = function(email){
    var sql = 'SELECT * FROM User WHERE email = ?';
    var options = [email];

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(records){
        console.log('rows', records);

        if(records.length == 0){
            return null;
        }else if (records.length > 1){
            //记录日志
            log.getCurrent().fatal("UserModel.findUser: user record is rpeat");
            return null;
        }else{
            var user = new UserEntity();
            user.fromDatabase(rows[0]);

            return user;
        }
    }
}

module.exports =  UserModel;

