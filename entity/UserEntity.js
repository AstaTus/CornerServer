/**
 * Created by AstaTus on 2016/1/1.
 */

function UserEntity(){
    this.mGuid = 0;
    this.mEmail = "";
    this.mPassword = "";
    this.mSex = 0;
    this.mNickname = "";
    this.mBirth = "";
    this.mImageUrl = "";

}

UserEntity.fromDatabae = function(user){
    this.mGuid = user.guid;
    this.mEmail = user.email;
    this.mPassword = user.password;
    this.mSex = user.sex;
    this.mNickname = user.nickname;
    this.mBirth = user.birth;
    this.mImageUrl = user.image_url;
}