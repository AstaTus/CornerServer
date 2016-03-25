/**
 * Created by AstaTus on 2016/3/24.
 */

var cornerFllowModel = require('../model/CornerFllowModel')
var promise = require('bluebird')
var log = require('../util/Log')

var ModelCode = require("../config/ModelCode")
var ServiceCode = require("../config/ServiceCode")
var LogicError = require("../../service/LogicError");

CornerFllowService = function(){
}

CornerFllowService.BeenTo = function(userGuid, cornerGuid){

    return cornerFllowModel.queryFllow(cornerGuid, userGuid)
        .then(processFlagBeenState);


    function processFlagBeenState(records){
        if (records.length == 0) {
            return cornerFllowModel
                .insertFllow(cornerGuid, userGuid, cornerFllowModel.FLLOW_STATE_BEEN).then(checkFlagBeenState);
        }
        else if(record.length == 1){
            return cornerFllowModel
                .updateFllowState(cornerGuid, userGuid, cornerFllowModel.FLLOW_STATE_BEEN).then(checkFlagBeenState);
        }else{

            return promise.reject(new LogicError(ModelCode.CORNER_FLLOW_RECORD_REPET));
        }
    }

    function checkFlagBeenState(modelCode){
        if (modelCode == ModelCode.CORNER_FLLOW_INSERT_SUCCESS
            || modelCode == ModelCode.CORNER_FLLOW_UPDATE_STATE_SUCCESS){
            return ;
        }else{
            //log.getCurrent().fatal("UserFllowService.checkFlagBeenState: record is not single");
            return promise.reject(new LogicError(modelCode));
        }
    }
}

CornerFllowService.WantTo = function(userGuid, cornerGuid) {
    return cornerFllowModel.queryFllow(cornerGuid, userGuid)
        .then(processFlagWantState);

    function processFlagWantState(record){
        if (record.length == 0) {
            return cornerFllowModel
                .insertFllow(cornerGuid, userGuid, cornerFllowModel.FLLOW_STATE_WANT).then(checkFlagWantState);
        }
        else if(record.length == 1){
            return cornerFllowModel
                .updateFllowState(cornerGuid, userGuid, cornerFllowModel.FLLOW_STATE_WANT).then(checkFlagWantState);
        }else{
            log.getCurrent().fatal("CornerFllowService.processFlagWantState: record is not single");
            return promise.reject(new LogicError(ModelCode.CORNER_FLLOW_RECORD_REPET));
        }
    }

    function checkFlagWantState(modelCode){
        if (modelCode == ModelCode.CORNER_FLLOW_INSERT_SUCCESS
            || modelCode == ModelCode.CORNER_FLLOW_UPDATE_STATE_SUCCESS){
            return ;
        }else{
            //log.getCurrent().fatal("UserFllowService.checkFlagWantState: cancel is not single");
            return promise.reject(new LogicError(modelCode));
        }
    }
}

CornerFllowService.UnFllow = function(userGuid, cornerGuid){
    return cornerFllowModel.deleteFllow(cornerGuid, userGuid).then(resolve);

    function resolve(modelCode){

        if (modelCode == ModelCode.CORNER_FLLOW_DELETE_SUCCESS){
            return;
        }else {
            return promise.reject(new LogicError(modelCode));
        }

    }
}
module.exports = CornerFllowService;