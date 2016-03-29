/**
 * Created by AstaTus on 2016/3/24.
 */

var userFllowModel = require('../model/UserFllowModel')
var promise = require('bluebird')
var log = require('../util/Log')
var ModelCode = require("../config/ModelCode")
var ServiceCode = require("../config/ServiceCode")
var LogicError = require("../util/LogicError");

UserFllowService = function(){
}

UserFllowService.changeFllowState = function(userGuid, fllowGuid){

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
            //log.getCurrent().fatal("UserFllowService.processChangeFllowState: record is not single");
            return promise.reject(new LogicError(ModelCode.USER_FLLOW_RECORD_REPEAT));
        }
    }

    function checkCancelFllowState(code){
        if (code == ModelCode.USER_FLLOW_DELETE_SUCCESS){
            return ;
        }else{
            //log.getCurrent().fatal("UserFllowService.checkCancelFllowState: cancel is not single");
            return promise.reject(new LogicError(code));
        }
    }

    function checkMakeFllowState(result){
        if (code == ModelCode.USER_FLLOW_INSERT_SUCCESS){
            return ;
        }else{
            //log.getCurrent().fatal("UserFllowService.checkCancelFllowState: cancel is not single");
            return promise.reject(new LogicError(code));
        }
    }
}

module.exports = UserFllowService;