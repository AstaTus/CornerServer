/**
 * Created by AstaTus on 2016/3/24.
 */
/**
 * Created by AstaTus on 2015/12/7.
 */

var sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var promise = require('bluebird')
var ModelCode = require('../config/ModelCode')
var ModelDef = require('./ModelDef');

var CornerFollowModel = function(){}

CornerFollowModel.FLLOW_STATE_WANT = 1;
CornerFollowModel.FLLOW_STATE_BEEN = 2;

CornerFollowModel.insertFollow = function(cornerGuid, fllowGuid, state){
    var sql = 'INSERT INTO corner_fllow (corner_guid, fllow_guid, state) VALUES (?, ?, ?);';
    var options = [cornerGuid, fllowGuid, state];

    return sqlManager.excuteSqlAsync(sql, options).then(resolve);

    function resolve(result){
        return ModelCode.CORNER_FLLOW_INSERT_SUCCESS;
    }
}


CornerFollowModel.queryFollow = function(cornerGuid, fllowGuid){
    var sql = 'SELECT * FROM corner_fllow WHERE corner_guid = ? AND fllow_guid = ?';
    var options = [cornerGuid, fllowGuid];

    return sqlManager.excuteSqlAsync(sql, options);

    /*function reslove(records){
        if(records.length == 0){
            return null;
        }else if (records.length > 1){
            //记录日志
            log.getCurrent().fatal("CornerFllowModel.queryFllow: corner_fllow record is rpeat");
            return promise.reject(new Error(CodeConfig.CORNER_FLLOW_REPEAT_ERROR));
        }else{
            return records[0];
        }
    }*/
}

CornerFollowModel.deleteFollow = function(cornerGuid, fllowGuid){
    var sql = 'DELETE * FROM corner_fllow WHERE corner_guid = ? AND fllow_guid = ?';
    var options = [cornerGuid, fllowGuid];

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(result){
        if(result.affectedRows == 1)
            return ModelCode.CORNER_FLLOW_DELETE_SUCCESS;
        else if(result.affectedRows == 0)
            return ModelCode.CORNER_FLLOW_NOT_EXIST;
        else
            return ModelCode.CORNER_FLLOW_RECORD_REPET;
    }
}

CornerFollowModel.updateFollowState = function(cornerGuid, fllowGuid, state){
    var sql = 'UPDATE corner_fllow SET state = ? WHERE corner_guid = ? AND fllow_guid = ?';
    var options = [state, cornerGuid, fllowGuid];

    return sqlManager.excuteSqlAsync(sql, options).then(reslove);

    function reslove(result){

        if(result.affectedRows == 1)
            return ModelCode.CORNER_FLLOW_UPDATE_STATE_SUCCESS;
        else if(result.affectedRows == 0)
            return ModelCode.CORNER_FLLOW_NOT_EXIST;
        else
            return ModelCode.CORNER_FLLOW_RECORD_REPET;
    }
}

CornerFollowModel.queryCornerFollowers = function(cornerGuid, id, condition, maxCount){
    var sql;
    var options;
    if (condition == ModelDef.NO_CONDITON){
        sql = 'SELECT ' +
                '* ' +
            'FROM ' +
             'corner_follow ' +
            'WHERE ' +
                'corner_guid = ? ' +
            'ORDER BY ' +
                'id DESC ' +
            'LIMIT ' +
            '?;';

        options = [cornerGuid, maxCount];
    }else if(condition == ModelDef.NEW_CONDITION){
        sql = 'SELECT ' +
                '* ' +
            'FROM ' +
                'corner_follow ' +
            'WHERE ' +
                'corner_guid = ? AND id > ?' +
            'ORDER BY ' +
                'id DESC ' +
            'LIMIT ' +
                '?;';

        options = [cornerGuid, id, maxCount];
    }else{
        sql = 'SELECT ' +
                '* ' +
            'FROM ' +
                'corner_follow ' +
            'WHERE ' +
                'corner_guid = ? AND id < ?' +
            'ORDER BY ' +
                'id DESC ' +
            'LIMIT ' +
                '?;';

        options = [cornerGuid, id, maxCount];
    }

    var options = [cornerGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}

CornerFollowModel.queryFollowedCorners = function(followedGuid){
    var sql = 'SELECT * FROM corner_fllow WHERE fllow_guid = ?';
    var options = [floowGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}

module.exports =  CornerFllowModel;
