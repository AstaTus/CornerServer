/**
 * Created by AstaTus on 2016/1/10.
 */

function MessagePacket(){
    this.result = true;
    this.resultCode = MessagePacket.RESULT_CODE_UNDEFINED;
    this.msg = null;
}

//当result为false时, resultCode才有意义
MessagePacket.RESULT_CODE_UNDEFINED = 0;
MessagePacket.RESULT_CODE_USER_NOT_VERIFY = 1;
MessagePacket.RESULT_CODE_SERVER_SESSION_ERROR = 2;
MessagePacket.RESULT_CODE_SERVER_INTER_ERROR = 3;
MessagePacket.RESULT_CODE_PARAM_ERROR = 4;
MessagePacket.RESULT_CODE_DATABASE_ERROR = 5;
module.exports = MessagePacket

