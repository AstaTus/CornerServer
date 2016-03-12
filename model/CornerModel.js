/**
 * Created by AstaTus on 2016/2/18.
 */

var sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var CornerEntity = require("../entity/CornerEntity")
var promise = require('bluebird')
var CornerModel = function(){}

CornerModel.insertCorner = function(finderGuid, name, location){
    var sql = 'INSERT INTO corner (finder_guid, name, location) VALUES (?, ?, ?);';
    var options = [finderGuid, name, location];

    return sqlManager.excuteSqlAsync(sql, options).then(checkResult);

    function checkResult(result){
        if (result){
            return result.insertId;
        }
        return 0;
    }
}

CornerModel.queryCornerByGuid = function(guid){
    var sql = 'SELECT * FROM Corner WHERE guid = ?;';
    var options = [guid];

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(records) {
        console.log('rows', records);

        if (records.length == 0) {
            return null;
        } else if (records.length > 1) {
            //记录日志
            log.getCurrent().fatal("UserModel.queryUserByNickname: user record is rpeat");
            return promise;
        } else {
            var user = new CornerEntity();
            user.fromDatabase(records[0]);

            return user;
        }
    }
}

module.exports =  CornerModel;
