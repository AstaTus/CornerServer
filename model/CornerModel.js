/**
 * Created by AstaTus on 2016/2/18.
 */

var sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var promise = require('bluebird')
var ModelCode = require('../config/ModelCode')
var CornerModel = function(){}

CornerModel.insertCorner = function(guid, userGuid, name, location){
    var sql = 'INSERT INTO corner (guid, finder_guid, toper_guid, name, location) VALUES (?, ?, ?, ?, ?);';
    var options = [guid, userGuid, userGuid, name, location];

    return sqlManager.excuteSqlAsync(sql, options).then(resolve);

    function resolve(result){
        return result.insertedId;
    }
}

CornerModel.queryCornerByGuid = function(guid){
    var sql = 'SELECT * FROM Corner WHERE guid = ?;';
    var options = [guid];

    return sqlManager.excuteSqlAsync(sql, options);
}

module.exports =  CornerModel;
