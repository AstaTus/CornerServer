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
    var sql ='SELECT ' +
                'comment.*, user.nickname, user.head_url, target.nickname, target.head_url ' +
            'FROM (( ' +
                'comment INNER JOIN user ' +
            'ON ' +
                'comment.article_guid = ? AND comment.reply_guid = user.guid) ' +
            'LEFT JOIN user AS target ' +
            'ON ' +
                'comment.target_guid = target.guid) ' +
            'ORDER BY ' +
                'comment.date DESC ' +
            'LIMIT ' +
                '?';

    var options = [articleGuid, count];

    return sqlManager.excuteSqlAsync(sql, options);
}

CommentModel.queryAllCommentsByArticle = function(articleGuid) {

}

module.exports = CommentModel;

