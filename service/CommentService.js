/**
 * Created by AstaTus on 2016/3/10.
 */

var commentModel = require('../model/CommentModel')
var userModel = require('../model/UserModel')
var promise = require('bluebird')
CommentService = function(){
}

CommentService.REQUEST_NEXT_PAGE_COUNT = 15;
CommentService.REQUEST_NEW_PAGE_COUNT = 15;

CommentService.obtainCommentFromArticle = function(articleGuid, commentGuid, direction) {

    var condtion;
    var maxCount;
    if(direction == ArticleService.REQUEST_DIRECTION_UP){
        conditon = commentModel.NEW_CONDITION;
        maxCount = CommentService.REQUEST_NEW_PAGE_COUNT;
    }else{
        conditon = commentModel.OLD_CONDITION;
        maxCount = CommentService.REQUEST_NEXT_PAGE_COUNT;
    }

    return commentModel
        .queryCommentsByArticle(articleGuid, maxCount, conditon, commentGuid)
        .then(resolve);



    function resolve(comments){
        var isFull = false;
        if (comments.length == maxCount){
            isFull = true;
        }

        var data = {
            comments: comments,
            isFull: isFull
        };

        return data;
    }
}

CommentService.addComment = function(articleGuid, replyGuid, targetGuid, text){

    var record = {
        guid:null,
        articleGuid:null,
        replyGuid:null,
        replyName:null,
        headPath:null,
        targetGuid:null,
        targetName:null,
        time:null,
        text:null
    };

    record.articleGuid = articleGuid;
    record.replyGuid = replyGuid;
    record.targetGuid = targetGuid;
    record.text = text;
    return commentModel
        .insertComment(articleGuid, replyGuid, targetGuid, text)
        .then(checkComment)
        .then(findReplyUser)
        .then(findTargetUser);

    function checkComment(data){
        record.guid = data.guid;
        record.time = data.time;
    }

    function findReplyUser(){
        return userModel.queryUserByGuid(replyGuid).then(checkReplyResult);
    }

    function checkReplyResult(reply){
        if(reply){
            record.replyName = reply.nickname;
            record.headPath = reply.headPath;

            return;
        }else{
            return promise.reject(new Error(CodeConfig.USER_NOT_EXIST));
        }
    }

    function findTargetUser(){
        if (targetGuid == null){
            return record;
        }else{
            return userModel.queryUserByGuid(targetGuid).then(checkTargetResult);;
        }
    }

    function checkTargetResult(target){
        if(target){
            record.targetName = target.nickName;
            return;
        }else{
            return promise.reject(new Error(CodeConfig.USER_NOT_EXIST));
        }
    }
}

CommentService.deleteComment = function(userGuid, commentGuid){
    return commentModel
        .queryCommentByGuid(commentGuid)
        .then(checkComment);

    function checkComment(comment){
        if (comment){
            if (comment.reply_guid == userGuid){
                return commentModel.deleteComment(commentGuid).then(resolve);
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    function  resolve(result){
        return result;
    }
}

module.exports = CommentService;
