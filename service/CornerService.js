/**
 * Created by AstaTus on 2016/2/20.
 */
var cornerModel = require('../model/CornerModel')
var promise = require('bluebird')
var log = require('../util/Log')
var CodeConfig = require('../config/CodeConfig')
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
            return promise.reject(new Error(result.info));
        }

    }

    function checkModelResult(result){

        if (true){
            return {
                guid: guid,
                name:name};
        }

        return promise.reject(new Error(CodeConfig.CORNER_DATABASE_INSERT_ERROR));
    }
}

module.exports = CornerService;
