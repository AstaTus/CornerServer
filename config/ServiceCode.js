/**
 * Created by AstaTus on 2016/3/24.
 */
/**********
 * 该Code属于服务器内部使用与ModelCode取值没有交集
 * 取值范围10001-100000*/
function ServiceCode(){
}

/*********************************USER********************************************/
ServiceCode.USER_NO_AUTH = 10001;

/*********************************CORNER********************************************/
ServiceCode.CORNER_AMAP_ADD_FAILED = 10100;

/*********************************ARTICLE********************************************/


/*********************************COMMENT********************************************/






/*********************************REGISTER********************************************/
ServiceCode.REGISTER_SUCCESS = 100;
ServiceCode.REGISTER_EMAIL_REPEAT = 101;
ServiceCode.REGISTER_NICKNAME_REPEAT = 102;
ServiceCode.REGISTER_PASSWORD_ERROR = 103;
ServiceCode.REGISTER_SQL_ERROR = 104;

/*********************************LOGIN********************************************/
ServiceCode.LOGIN_SUCCESS = 150;
ServiceCode.LOGIN_EMAIL_OR_PASSWORD_ERROR = 151;
ServiceCode.LOGIN_EMAIL_NOT_EXIST = 152;

/*********************************PUBLISH********************************************/
ServiceCode.PUBLISH_OSS_ERROR = 160;








/*********************************UP********************************************/
ServiceCode.UP_MAKE = 200;
ServiceCode.UP_CANCEL = 201;
ServiceCode.UP_CANCEL_NOT_SINGLE = 202;
ServiceCode.UP_MAKE_NOT_SINGLE = 203;
ServiceCode.UP_RECORD_NOT_SINGLE = 204;

/*********************************CORNER********************************************/
ServiceCode.CORNER_ADD_ERROR = 220;
ServiceCode.CORNER_DATABASE_INSERT_ERROR = 221;

/*********************************USER_FLLOW********************************************/
ServiceCode.USER_FLLOW_REPEAT = 250;
ServiceCode.USER_FLLOW_MAKE = 251;
ServiceCode.USER_FLLOW_CANCEL = 252;

ServiceCode.USER_FLLOW_CANCEL_NOT_SINGLE = 253;
ServiceCode.USER_FLLOW_MAKE_NOT_SINGLE = 254;
ServiceCode.USER_FLLOW_RECORD_NOT_SINGLE = 255;


/*********************************USER_FLLOW********************************************/
ServiceCode.CORNER_FLLOW_INSERT_SUCCESS = 300;
ServiceCode.CORNER_FLLOW_INSERT_ERROR = 301;
ServiceCode.CORNER_FLLOW_DELETE_SUCCESS = 302;
ServiceCode.CORNER_FLLOW_DELETE_ERROR = 303;
ServiceCode.CORNER_FLLOW_REPEAT_ERROR = 304;
ServiceCode.CORNER_FLLOW_UPDATE_SUCCESS = 305;
ServiceCode.CORNER_FLLOW_UPDATE_ERROR = 306;

ServiceCode.CORNER_FLLOW_FLAG_BEEN_STATE = 310;
ServiceCode.CORNER_FLLOW_FLAG_WANT_STATE = 311;
ServiceCode.CORNER_FLLOW_FLAG_STATE_ERROR = 312;
module.exports = ServiceCode
