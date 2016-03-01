function RegisterMsg(){
    this.mResult;
    this.mCode;


}
RegisterMsg.CODE_EMAIL_REAPT = 1;
RegisterMsg.CODE_NICKNAME_REPEAT = 2;
RegisterMsg.PASSWORD_FORMAT_ERROR = 3;

module.exports = RegisterMsg