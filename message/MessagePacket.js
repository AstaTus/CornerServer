/**
 * Created by AstaTus on 2016/1/10.
 */

function MessagePacket(){
    this.result = true;
    this.resultCode = 0;
    this.msg = null;
}

MessagePacket.RESULT_CODE_SERVER_INTER_ERROR = 100001;
MessagePacket.RESULT_CODE_PARAM_ERROR = 100004;

/*MessagePacket.RESULT_CODE_UNDEFINED = 0;
MessagePacket.RESULT_CODE_USER_NOT_VERIFY = 1;
MessagePacket.RESULT_CODE_SERVER_SESSION_ERROR = 2;

MessagePacket.RESULT_CODE_DATABASE_ERROR = 5;*/
module.exports = MessagePacket

