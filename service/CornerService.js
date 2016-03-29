/**
 * Created by AstaTus on 2016/2/20.
 */
var cornerModel = require('../model/CornerModel')
var promise = require('bluebird')
var log = require('../util/Log')

var ModelCode = require("../config/ModelCode")
var ServiceCode = require("../config/ServiceCode")
var LogicError = require("../util/LogicError");


var CornerAddCmd = require('../http/CornerAddCmd')
CornerService = function(){
}

CornerService.addCorner = function(userGuid, name, location){

    var cmd = new CornerAddCmd(name, location);
    return cmd.excuteAsync().then(checkAddResult);

    var guid;
    function checkAddResult(result){

        if (result.status == 1){

            return cornerModel
                .insertCorner(result._id, userGuid, name, location)
                .then(checkModelResult);
        }else{
            return promise.reject(new LogicError(ServiceCode.CORNER_AMAP_ADD_FAILED, result.info));
        }
    }

    function checkModelResult(insertId){
        return {
            guid: insertId,
            name:name};
    }
}

module.exports = CornerService;
  