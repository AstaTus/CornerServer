/**
 * Created by AstaTus on 2016/3/24.
 */

var userFollowModel = require('../model/UserFollowModel')
var promise = require('bluebird')
var log = require('../util/Log')
var ModelCode = require("../config/ModelCode")
var ServiceCode = require("../config/ServiceCode")
var LogicError = require("../util/LogicError");

UserFollowService = function(){
}

UserFollowService.changeFollowState = function(userGuid, followedGuid){

    //检测cornerGuid 是否存在
    return getUserFollowRecord()
        .then(processChangeFollowState);

    function getUserFollowRecord(){
        return userFollowModel.queryFollow(userGuid, followedGuid);
    }

    function processChangeFollowState(record){
        if (record.length == 0) {
            return userFollowModel.insertFollow(userGuid, followedGuid).then(checkMakeFllowState);
        }
        else if(record.length == 1){
            return userFollowModel.deleteFollow(userGuid, followedGuid).then(checkCancelFllowState);
        }else{
            //log.getCurrent().fatal("UserFllowService.processChangeFllowState: record is not single");
            return promise.reject(new LogicError(ModelCode.USER_FLLOW_RECORD_REPEAT));
        }
    }

    function checkCancelFollowState(code){
        if (code == ModelCode.USER_FLLOW_DELETE_SUCCESS){
            return ;
        }else{
            //log.getCurrent().fatal("UserFllowService.checkCancelFllowState: cancel is not single");
            return promise.reject(new LogicError(code));
        }
    }

    function checkMakeFollowState(result){
        if (code == ModelCode.USER_FLLOW_INSERT_SUCCESS){
            return ;
        }else{
            //log.getCurrent().fatal("UserFllowService.checkCancelFllowState: cancel is not single");
            return promise.reject(new LogicError(code));
        }
    }
}

UserFollowService.obtainFollowedUsers = function(userGuid){
    return userFollowModel.queryFollowedUsers(userGuid);
}

UserFollowService.obtainUserFollowers = function(userGuid){
    return userFollowModel.queryUserFollowers(userGuid);
}

module.exports = UserFllowService;