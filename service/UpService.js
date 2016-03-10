/**
 * Created by AstaTus on 2016/3/10.
 */

var upModel = require('../model/UpModel')

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
        if (record != null) {
            return upModel.deleteUp(userGuid, articleGuid).then(checkCancelUpState);
        }
        else{
            return upModel.insertUp(userGuid, articleGuid).then(checkMakeUpState);
        }
    }

    function checkCancelUpState(result){
        console.log(result);
    }

    function checkMakeUpState(result){
        console.log(result);
    }
}

module.exports = UpService;