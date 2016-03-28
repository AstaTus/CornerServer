/**
 * Created by AstaTus on 2015/12/7.
 */

var userModel = require('../model/UserModel')
var promise = require('bluebird')
var log = require('../util/Log')
var ModelCode = require("../config/ModelCode")
var ServiceCode = require("../config/ServiceCode")
var LogicError = require("../../service/LogicError");

UserService = function(){
}

UserService.register = function(email, password, nickname, birth, sex){

    //检测密码是否是数字、英文、符号
    var reg = /^[\w.]{6,20}$/;
    var r = reg.test(password);
    if(r == false){
        return promise.reject(new LogicError(ServiceCode.REGISTER_PASSWORD_ERROR));
    }

    //检测邮箱重复
    return getUserByEmail()
        .then(checkEmailRepeat)
        .then(getUserByNickname)
        .then(checkNickNameRepeat)
        .then(processRegister);

    function getUserByEmail(){
        return userModel.queryUserByEmail(email);
    }

    function checkEmailRepeat(users){
        if(users.length == 0)
            return ;
        else
            return promise.reject(new LogicError(ServiceCode.REGISTER_EMAIL_REPEAT));
    }

    function getUserByNickname(){
        return userModel.queryUserByNickname(nickname);
    }

    function checkNickNameRepeat(users){
        if(users.length == 0)
            return ;
        else
            return promise.reject(new LogicError(ServiceCode.REGISTER_NICKNAME_REPEAT));
    }

    function processRegister(){
        return userModel.insertUser(email, password, nickname, birth, sex);
    }

    function checkResult(insertId){
        return;

    }
}

UserService.login = function(email, password){

    return getUser().then(checkUser);

    function getUser(){
        return userModel.queryUserByEmail(email);
    }

    function checkUser(users){
        if(users.length == 0)
            return promise.reject(new LogicError(ModelCode.USER_NOT_EXIST));
        else if (users.length == 1 && users[0].password == password)
            return users[0].guid;
        else
            return promise.reject(new LogicError(ServiceCode.LOGIN_EMAIL_OR_PASSWORD_ERROR));
    }
}

UserService.logout = function(session){
    session.destroyAsync(destroyCallback);
    function destroyCallback(err){
        if (err == null)
            return;
        else
            return promise.reject(new LogicError(ServiceCode.LOGOUT_FAILED, err)) ;
    }
}

/*UserService.forgetAccount(){

}*/

module.exports = UserService;