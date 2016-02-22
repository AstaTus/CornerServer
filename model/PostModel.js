/**
 * Created by AstaTus on 2016/2/14.
 */

sqlManager = require('../database/SqlManager')
log = require('../util/Log')
var PostEntity = require("../entity/PostEntity")
var promise = require('bluebird')
var PostModel = function(){}

PostModel.insertPost = function(userGuid, cornerGuid, date, imageUrl, text){
    var sql = 'INSERT INTO post (user_guid, corner_guid, date, image_uri, text) VALUES (?, ?, ?, ?, ?);';
    var options = [userGuid, cornerGuid, date, imageUrl, text];

    return sqlManager.excuteSqlAsync(sql, options).then(checkResult);

    function checkResult(result){
        if (result){
            return result.insertId;
        }
        return 0;
    }
}

/*
PostModel.queryPostByUser = function(guid, date, type){
    var sql;
    var options;
    //大于date时间的数据 --往上拉 更新
    if (type == 0){
        sql = 'SELECT * FROM Post WHERE user_guid = ? ORDER BY date DESC LIMIT ?';
        options = [guid, 20];
    }//小于date时间的数据--往下拉 更新
    else{
        sql = 'SELECT * FROM Post WHERE user_guid = ? AND date < ? ORDER BY date DESC LIMIT ?';
        options = [guid, paginate.items[paginate.items.length - 1].mDate, paginate.perPage];
    }
}
*/

module.exports =  PostModel;