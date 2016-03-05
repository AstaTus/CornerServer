/**
 * Created by AstaTus on 2016/1/1.
 */
/**********
 * 该Code属于服务器内部使用*/
function CodeConfig(){
}

/*********************************COMMON********************************************/
CodeConfig.COMMON_INSERT_SUCCESS = 0;


/*********************************REGISTER********************************************/
CodeConfig.REGISTER_SUCCESS = 100;
CodeConfig.REGISTER_EMAIL_REPEAT = 101;
CodeConfig.REGISTER_NICKNAME_REPEAT = 102;
CodeConfig.REGISTER_PASSWORD_ERROR = 103;
CodeConfig.REGISTER_SQL_ERROR = 104;

/*********************************LOGIN********************************************/
CodeConfig.LOGIN_SUCCESS = 150;
CodeConfig.LOGIN_EMAIL_OR_PASSWORD_ERROR = 151;
CodeConfig.LOGIN_EMAIL_NOT_EXIST = 152;

/*********************************PUBLISH********************************************/
CodeConfig.PUBLISH_OSS_ERROR = 160;


/*********************************CORNER********************************************/
CodeConfig.CORNER_NOT_EXIST = 170;

/*********************************USER********************************************/
CodeConfig.USER_REPEAT = 180;
CodeConfig.USER_NOT_EXIST = 181;

module.exports = CodeConfig