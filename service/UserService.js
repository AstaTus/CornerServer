/**
 * Created by AstaTus on 2015/12/7.
 */

var userModel = require('../model/UserModel')
var promise = require('bluebird')
var log = require('../util/Log')
var CodeConfig = require("../config/CodeConfig")
UserService = function(){
}

UserService.register = function(email, password, nickname, birth, sex){

    //检测密码是否是数字、英文、符号
    var reg = /^[\w.]{6,20}$/;
    var r = reg.test(password);
    if(r == false){
        return promise.reject(CodeConfig.REGISTER_PASSWORD_ERROR);
    }

    //检测邮箱重复
    return promise.resolve(email)
        .then(getUserByEmail)
        .then(checkEmailRepeat)
        .then(getUserByNickname)
        .then(checkNickNameRepeat)
        .then(processRegister);

    function getUserByEmail(email){
        return userModel.queryUserByEmail(email);
    }

    function checkEmailRepeat(user){
        if(user == null)
            return promise.resolve(nickname);
        else
            return promise.reject(new Error(CodeConfig.REGISTER_EMAIL_REPEAT));
    }

    function getUserByNickname(nickname){
        return userModel.queryUserByNickname(nickname);
    }

    function checkNickNameRepeat(user){
        if(user == null)
            return promise.resolve();
        else
            return promise.reject(CodeConfig.REGISTER_NICKNAME_REPEAT);
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

    return promise.resolve(email).then(getUser).then(checkUser);

    function getUser(email){
        return userModel.queryUserByEmail(email);
    }

    function checkUser(user){
        if(user == null)
            return [CodeConfig.LOGIN_EMAIL_NOT_EXIST, 0];
        else if (user.mPassword == password)
            return [CodeConfig.LOGIN_SUCCESS, user.mGuid];
        else
            return [CodeConfig.LOGIN_EMAIL_OR_PASSWORD_ERROR, 0];
    }
}

UserService.logout = function(session){
    session.destroyAsync(destroyCallback);
    function destroyCallback(err){
        if (err == null)
            return true;
        else
            return false;
    }
}

/*UserService.forgetAccount(){

}*/

module.exports = UserService;