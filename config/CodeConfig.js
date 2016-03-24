/**
 * Created by AstaTus on 2016/1/1.
 */
/**********
 * 该Code属于服务器内部使用*/
function CodeConfig(){
}
/*********************************DATABASE********************************************/
CodeConfig.DATABASE_ERROR = 1000;

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

/*********************************ARTICLE********************************************/
CodeConfig.ARTICLE_NOT_EXIST = 190;
CodeConfig.ARTICLE_NO_POWER = 191;
CodeConfig.ARTICLE_SUCCESS_DELETE = 192;

/*********************************UP********************************************/
CodeConfig.UP_MAKE = 200;
CodeConfig.UP_CANCEL = 201;
CodeConfig.UP_CANCEL_NOT_SINGLE = 202;
CodeConfig.UP_MAKE_NOT_SINGLE = 203;
CodeConfig.UP_RECORD_NOT_SINGLE = 204;

/*********************************CORNER********************************************/
CodeConfig.CORNER_ADD_ERROR = 220;
CodeConfig.CORNER_DATABASE_INSERT_ERROR = 221;

/*********************************USER_FLLOW********************************************/
CodeConfig.USER_FLLOW_REPEAT = 250;



module.exports = CodeConfig

