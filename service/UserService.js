/**
 * Created by AstaTus on 2015/12/7.
 */

var userModel = require('../model/UserModel')
var promise = require('bluebird')
var log = require('../util/Log')
var codeConfig = require("../config/CodeConfig")
UserService = function(){
}

UserService.register = function(email, password, nickname, birth, sex){

    //检测密码是否是数字、英文、符号
    var reg = /^[\w.]{6,20}$/;
    var r = reg.test(password);
    if(r == false){
        return promise.reject(codeConfig.REGISTER_PASSWORD_ERROR);
    }

    //检测邮箱重复
    return promise.resolve(email)
        .then(getUserByEmail)
        .then(checkEmailRepeat)
        .then(getUserByNickname)
        .then(checkNickNameRepeat)
        .then(processRegister)
        .then();

    function getUserByEmail(email){
        return userModel.queryUserByEmail(email);
    }

    function checkEmailRepeat(user){
        if(user == null)
            return promise.resolve(nickname);
        else
            return promise.reject(codeConfig.REGISTER_EMAIL_REPEAT);
    }

    function getUserByNickname(nickname){
        return userModel.queryUserByNickname(nickname);
    }

    function checkNickNameRepeat(user){
        if(user == null)
            return promise.resolve();
        else
            return promise.reject(codeConfig.REGISTER_NICKNAME_REPEAT);
    }

    function processRegister(){
        return userModel.insertUser(email, password, nickname, birth, sex);
    }

    function checkResult(insertId){

        if (insertId != 0){
            return true;
        }

        return false;

    }

    /*function insertResult(result){
        if (result == null)
            return codeConfig.REGISTER_SUCCESS;
        else
            return codeConfig.REGISTER_SQL_ERROR;

    }*/
}

UserService.login = function(email, password){

    return promise.all([getUser(email), getPassword(password)]).spread(checkUser);

    function getUser(email){
        return userModel.queryUser(email);
    }

    function getPassword(password){
        return promise.resolve(password);
    }

    function checkUser(user, password){
        if(user == null){
            return false;
        }
        else if (user.password === password)
            return true;
        else
            return false;
    }
}

/*UserService.forgetAccount(){

}*/

module.exports = UserService;