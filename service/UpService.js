/**
 * Created by AstaTus on 2016/3/10.
 */

var upModel = require('../model/UpModel')
var CodeConfig = require("../config/CodeConfig")
var log = require('../util/Log')
UpService = function(){
}

UpService.changeUpState = function(userGuid, articleGuid){

    var isUpdateSucess = false;
    var imagePath;
    //检测cornerGuid 是否存在
    return getUpRecord()
        .then(processChangeUpState);


    function getUpRecord(){
        return upModel.queryUp(userGuid, articleGuid);
    }

    function processChangeUpState(record){
        if (record.length == 0) {
            return upModel.insertUp(userGuid, articleGuid).then(checkMakeUpState);
        }
        else if(record.length == 1){
            return upModel.deleteUp(userGuid, articleGuid).then(checkCancelUpState);
        }else{
            log.getCurrent().fatal("UpService.processChangeUpState: record is not single");
            return promise.reject(new Error(CodeConfig.UP_RECORD_NOT_SINGLE));
        }
    }

    function checkCancelUpState(result){
        if (result.affectedRows == 1){
            return CodeConfig.UP_CANCEL;
        }else{
            log.getCurrent().fatal("UpService.checkCancelUpState: cancel is not single");
            return promise.reject(new Error(CodeConfig.UP_CANCEL_NOT_SINGLE));
        }
    }

    function checkMakeUpState(result){
        if (result.affectedRows == 1){
            return CodeConfig.UP_MAKE;
        }else{
            log.getCurrent().fatal("UpService.checkMakeUpState: nake is not single");
            return promise.reject(new Error(CodeConfig.UP_MAKE_NOT_SINGLE));
        }
    }
}

module.exports = UpService;