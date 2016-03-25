/**
 * Created by AstaTus on 2016/3/24.
 */

var userFllowModel = require('../model/UserFllowModel')
var promise = require('bluebird')
var log = require('../util/Log')
var CodeConfig = require("../config/CodeConfig")
UserFllowService = function(){
}

UserFllowService.changeFllowState = function(userGuid, fllowGuid){
    var isUpdateSucess = false;

    //检测cornerGuid 是否存在
    return getUserFllowRecord()
        .then(processChangeFllowState);


    function getUserFllowRecord(){
        return userFllowModel.queryFllow(userGuid, fllowGuid);
    }

    function processChangeFllowState(record){
        if (record.length == 0) {
            return userFllowModel.insertFllow(userGuid, fllowGuid).then(checkMakeFllowState);
        }
        else if(record.length == 1){
            return userFllowModel.deleteFllow(userGuid, fllowGuid).then(checkCancelFllowState);
        }else{
            log.getCurrent().fatal("UserFllowService.processChangeFllowState: record is not single");
            return promise.reject(new Error(CodeConfig.USER_FLLOW_REPEAT));
        }
    }

    function checkCancelFllowState(result){
        if (result.affectedRows == 1){
            return CodeConfig.USER_FLLOW_CANCEL;
        }else{
            log.getCurrent().fatal("UserFllowService.checkCancelFllowState: cancel is not single");
            return promise.reject(new Error(CodeConfig.USER_FLLOW_CANCEL_NOT_SINGLE));
        }
    }

    function checkMakeFllowState(result){
        if (result.affectedRows == 1){
            return CodeConfig.USER_FLLOW_MAKE;
        }else{
            log.getCurrent().fatal("UserFllowService.checkMakeFllowState: make is not single");
            return promise.reject(new Error(CodeConfig.USER_FLLOW_MAKE_NOT_SINGLE));
        }
    }
}

module.exports = UserFllowService;