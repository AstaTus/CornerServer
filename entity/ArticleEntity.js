/**
 * Created by AstaTus on 2016/2/14.
 */

function PostEntity(){
    this.mGuid = 0;
    this.mCornerGuid = 0;
    this.mUserGuid = 0;
    this.mDate = null;
    this.mImageUri = "";
    this.mText = "";
}

PostEntity.prototype.fromDatabase = function(post){
    this.mGuid = post.guid;
    this.mCornerGuid = post.corner_guid;
    this.mUserGuid = post.user_guid;
    this.mDate = post.date;
    this.mImageUri = post.image_uri;
    this.mText = post.text;
}

module.exports = PostEntity