/**
 * Created by AstaTus on 2016/3/1.
 */
sqlManager = require('../database/SqlManager')
var log = require('../util/Log')
var promise = require('bluebird')
var CommentModel = function(){}
var moment = require('moment');
var ModelCode = require("../config/ModelCode")

CommentModel.insertComment = function(articleGuid, replyGuid, targetGuid, text){
    var current_time =  moment().format("YYYY-MM-DD HH:mm:ss");

    var sql = 'INSERT INTO comment (article_guid, reply_guid, target_guid, text, date) VALUES (?, ?, ?, ?, ?);';
    var options = [articleGuid, replyGuid, targetGuid, text, current_time];

    return sqlManager.excuteSqlAsync(sql, options).then(resolve);

    function resolve(packet){
        return{
            guid:packet.insertId,
            time:current_time
        }
    }
}

CommentModel.deleteComment = function(guid){
    var sql = 'DELETE * FROM comment WHERE guid = ?;';
    var options = [guid];

    return sqlManager.excuteSqlAsync(sql, options).then(resolve);

    function resolve(result){
        if(result.affectedRows == 1)
            return ModelCode.COMMENT_DELETE_SUCCESS;
        else if(result.affectedRows == 0)
            return ModelCode.COMMENT_NOT_EXIST;
        else
            return ModelCode.DATABASE_KEY_REPEAT;
    }
}

CommentModel.NO_CONDITION = 0;
CommentModel.NEW_CONDITION = 1;
CommentModel.OLD_CONDITION = 2;

CommentModel.queryCommentsByArticle = function(articleGuid, maxCount, condition, commentGuid){

    var sql;
    var options;
    if(commentGuid == 0){
        sql ='SELECT ' +
                'comment.*, user.nickname, user.head_path, target.nickname, target.head_path ' +
            'FROM (( ' +
                'comment INNER JOIN user ' +
            'ON ' +
                'comment.article_guid = ? AND comment.reply_guid = user.guid) ' +
            'LEFT JOIN user AS target ' +
            'ON ' +
                'comment.target_guid = target.guid) ' +
            'ORDER BY ' +
                'comment.guid DESC ' +
            'LIMIT ' +
                '?';

            options = [articleGuid, maxCount];
    }else if(condition == CommentModel.NEW_CONDITION){
        sql ='SELECT ' +
                'comment.*, user.nickname, user.head_path, target.nickname, target.head_path ' +
            'FROM (( ' +
                'comment INNER JOIN user ' +
            'ON ' +
                'comment.article_guid = ? AND comment.reply_guid = user.guid ' +
                'AND comment.guid > ?) ' +
            'LEFT JOIN user AS target ' +
            'ON ' +
                'comment.target_guid = target.guid) ' +
            'ORDER BY ' +
                'comment.date DESC ' +
            'LIMIT ' +
                '?';

        options = [articleGuid, commentGuid, maxCount];
    }else{
        sql ='SELECT ' +
                'comment.*, user.nickname, user.head_path, target.nickname, target.head_path ' +
            'FROM (( ' +
                'comment INNER JOIN user ' +
            'ON ' +
                'comment.article_guid = ? AND comment.reply_guid = user.guid ' +
                'AND comment.guid < ?) ' +
            'LEFT JOIN user AS target ' +
            'ON ' +
                'comment.target_guid = target.guid) ' +
            'ORDER BY ' +
                'comment.date DESC ' +
            'LIMIT ' +
                '?';
        options = [articleGuid, commentGuid, maxCount];
    }

    return sqlManager.excuteSqlAsync(sql, options);
}

CommentModel.queryCommentByGuid = function(commentGuid) {
    var sql ='SELECT * FROM comment WHERE guid = ?;';
    var options = [commentGuid];

    return sqlManager.excuteSqlAsync(sql, options);

}

module.exports = CommentModel;

