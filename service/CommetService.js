/**
 * Created by AstaTus on 2016/3/10.
 */

var commentModel = require('../model/CommentModel')
var promise = require('bluebird')
CommentService = function(){
}

CommentService.REQUEST_NEXT_PAGE_COUNT = 3;
CommentService.REQUEST_NEW_PAGE_COUNT = 6;

CommentService.obtainCommentFromArticle = function(articleGuid, commentGuid, direction) {

    var condtion;
    var maxCount;
    if(direction == ArticleService.REQUEST_DIRECTION_UP){
        conditon = commentModel.MORE_TIME_CONDITION;
        maxCount = CommentService.REQUEST_NEW_PAGE_COUNT;
    }else{
        conditon = commentModel.LESS_TIME_CONDITION;
        maxCount = CommentService.REQUEST_NEXT_PAGE_COUNT;
    }

    return commentModel.queryCommentsByArticle(articleGuid, maxCount, conditon, commentGuid);
}

CommentService.addComment = function(articleGuid, replyGuid, targetGuid, text){

    return commentModel
        .insertComment(articleGuid, replyGuid, targetGuid, text)
        .then(resolve);

    function resolve(guid){
        return {
            guid:guid,
            articleGuid:articleGuid,
            replyGuid:replyGuid,
            targetGuid:targetGuid,
            text:text,
        };
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
