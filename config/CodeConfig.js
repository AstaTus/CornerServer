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
CodeConfig.USER_FLLOW_MAKE = 251;
CodeConfig.USER_FLLOW_CANCEL = 252;

CodeConfig.USER_FLLOW_CANCEL_NOT_SINGLE = 253;
CodeConfig.USER_FLLOW_MAKE_NOT_SINGLE = 254;
CodeConfig.USER_FLLOW_RECORD_NOT_SINGLE = 255;


/*********************************USER_FLLOW********************************************/
CodeConfig.CORNER_FLLOW_INSERT_SUCCESS = 300;
CodeConfig.CORNER_FLLOW_INSERT_ERROR = 301;
CodeConfig.CORNER_FLLOW_DELETE_SUCCESS = 302;
CodeConfig.CORNER_FLLOW_DELETE_ERROR = 303;
CodeConfig.CORNER_FLLOW_REPEAT_ERROR = 304;
CodeConfig.CORNER_FLLOW_UPDATE_SUCCESS = 305;
CodeConfig.CORNER_FLLOW_UPDATE_ERROR = 306;

CodeConfig.CORNER_FLLOW_FLAG_BEEN_STATE = 310;
CodeConfig.CORNER_FLLOW_FLAG_WANT_STATE = 311;
CodeConfig.CORNER_FLLOW_FLAG_STATE_ERROR = 312;
module.exports = CodeConfig

