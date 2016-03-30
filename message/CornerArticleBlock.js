function CornerArticleBlock(){
    ////角落guid
    //public
    ////角落名字
    //public
    //文章的guid
    this.mGuid;
    this.mCorner;

    this.mImagePath;
    this.mFeelText;
    this.mBeenToCount;
    this.mWantToCount;
    this.mComments = new Array();

    //想去,去过状态
    this.mState;
}

module.exports = CornerArticleBlock