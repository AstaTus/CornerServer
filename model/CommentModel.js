/**
 * Created by AstaTus on 2016/3/1.
 */
sqlManager = require('../database/SqlManager')
log = require('../util/Log')
var promise = require('bluebird')
var CommentModel = function(){}

CommentModel.insertComment = function(articleGuid, replyGuid, targetGuid, text){
    var sql = 'INSERT INTO comment (article_guid, reply_guid, target_guid, text) VALUES (?, ?, ?, ?);';
    var options = [articleGuid, replyGuid, targetGuid, text];

    return sqlManager.excuteSqlAsync(sql, options);
}

CommentModel.deleteComment = function(guid){
    var sql = 'DELETE * FROM comment WHERE guid = ?;';
    var options = [guid];

    return sqlManager.excuteSqlAsync(sql, options);
}

CommentModel.queryAllCommentsByArticle = function(articleGuid){
    var sql = 'SELECT * FROM comment WHERE article_guid = ?';
    var options = [articleGuid];

    return sqlManager.excuteSqlAsync(sql, options);
}

CommentModel.queryFreshCommentsByArticle = function(articleGuid, count){
    CommentModel.queryAllCommentsByArticle = function(articleGuid){

        var sql ='SELECT ' +
                    'comment.*, user.nickname, user.image_url, ' +
                    'target.nickname, target.image_url ' +
                 'FROM ' +
                    'comment INNER JOIN user ' +
                    'INNER JOIN user AS target ' +
                 'WHERE ' +
                    'comment.article_guid = ? AND ' +
                    'comment.reply_guid = user.guid AND ' +
                    'comment.target_guid = target.guid ' +
                'ORDER BY ' +
                    'comment.date DESC ' +
                'LIMIT ' +
                    '?';

        var options = [articleGuid, count];

        return sqlManager.excuteSqlAsync(sql, options);
    }
}

module.exports = CommentModel;

