/**
 * Created by AstaTus on 2016/1/1.
 */

function RegisterMsg(){
    this.state = true;
    //失败的话,有信息
    this.info = "";

    const EMAIL_REAPT = "该邮箱已经注册。";
    const NICKNAME_REPEAT = "该用户名已经注册";
    const PASSWORD_SHORT = "密码长度为6-20位";
    const PASSWORD_ERROR = "密码只能是英文、数字、符号";
}

module.exports = RegisterMsg

