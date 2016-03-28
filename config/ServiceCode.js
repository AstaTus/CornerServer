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
ServiceCode.ARTICLE_OSS_ADD_FAILED = 10200;

/*********************************COMMENT********************************************/

/*********************************REGISTER********************************************/
ServiceCode.REGISTER_EMAIL_REPEAT = 10301;
ServiceCode.REGISTER_NICKNAME_REPEAT = 10302;
ServiceCode.REGISTER_PASSWORD_ERROR = 10303;

ServiceCode.REGISTER_SUCCESS = 10300;
ServiceCode.REGISTER_SQL_ERROR = 10304;

/*********************************LOGIN********************************************/
ServiceCode.LOGIN_SUCCESS = 10400;
ServiceCode.LOGIN_EMAIL_OR_PASSWORD_ERROR = 10401;

/*********************************LOGOUT********************************************/
ServiceCode.LOGOUT_SUCCESS = 10500;
ServiceCode.LOGOUT_FAILED = 10501;

/*********************************UP********************************************/
ServiceCode.UP_CANCEL_STATE = 10600;
ServiceCode.UP_MAKE_STATE = 10601;

/*********************************CORNER********************************************/


/*********************************USER_FLLOW********************************************/

/*********************************CORNER_FLLOW********************************************/

module.exports = ServiceCode
