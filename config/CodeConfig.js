/**
 * Created by AstaTus on 2016/1/1.
 */

function CodeConfig(){
    /*********************************COMMON********************************************/
    this.COMMON_INSERT_SUCCESS = 0;


    /*********************************REGISTER********************************************/
    this.REGISTER_SUCCESS = 100;
    this.REGISTER_EMAIL_REPEAT = 101;
    this.REGISTER_NICKNAME_REPEAT = 102;
    this.REGISTER_PASSWORD_ERROR = 103;
    this.REGISTER_SQL_ERROR = 104;

}

module.exports = CodeConfig
