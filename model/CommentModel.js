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

CommentModel.NO_CONDITION = 0;
CommentModel.MORE_TIME_CONDITION = 1;
CommentModel.LESS_TIME_CONDITION = 2;

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
    }else if(condition == CommentModel.MORE_TIME_CONDITION){
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

/*CommentModel.queryFreshCommentsByArticle = function(articleGuid, count){
    var sql ='SELECT ' +
                'comment.*, user.nickname, user.head_path, target.nickname, target.head_path ' +
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
}*/

CommentModel.queryCommentByGuid = function(commentGuid) {
    var sql ='SELECT * FROM comment WHERE guid = ?;';
    var options = [commentGuid];

    return sqlManager.excuteSqlAsync(sql, options);

}

module.exports = CommentModel;

