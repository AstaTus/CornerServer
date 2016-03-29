/**
 * Created by AstaTus on 2016/3/10.
 */

var upModel = require('../model/UpModel')
var ModelCode = require("../config/ModelCode")
var ServiceCode = require("../config/ServiceCode")
var LogicError = require("../util/LogicError");
var promise = require('bluebird');
var log = require('../util/Log')
UpService = function(){
}

UpService.changeUpState = function(userGuid, articleGuid){

    var isUpdateSucess = false;
    var imagePath;
    //检测cornerGuid 是否存在
    return upModel.queryUp(userGuid, articleGuid)
        .then(processChangeUpState);

    function processChangeUpState(record){
        if (record.length == 0) {
            return upModel.insertUp(userGuid, articleGuid).then(checkMakeUpState);
        }
        else if(record.length == 1){
            return upModel.deleteUp(userGuid, articleGuid).then(checkCancelUpState);
        }else{
            //log.getCurrent().fatal("UpService.processChangeUpState: record is not single");
            return promise.reject(new LogicError(ModelCode.UP_RECORD_REPEAT));
        }
    }

    function checkCancelUpState(result){
        if (code == ModelCode.UP_DELETE_SUCCESS){
            return ServiceCode.UP_CANCEL_STATE;
        }else{
            //log.getCurrent().fatal("UpService.checkMakeUpState: nake is not single");
            return promise.reject(new LogicError(code));
        }
    }

    function checkMakeUpState(code){
        if (code == ModelCode.UP_INSERT_SUCCESS){
            return ServiceCode.UP_MAKE_STATE;
        }else{
            //log.getCurrent().fatal("UpService.checkMakeUpState: nake is not single");
            return promise.reject(new LogicError(code));
        }
    }
}

module.exports = UpService;