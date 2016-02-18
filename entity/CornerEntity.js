/**
 * Created by AstaTus on 2016/2/18.
 */
function CornerEntity(){
    this.mGuid = 0;
    this.mName = "";
}

CornerEntity.prototype.fromDatabase = function(post){
    this.mGuid = post.guid;
    this.mName = "";
}

module.exports = CornerEntity