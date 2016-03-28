/**
 * Created by AstaTus on 2016/3/24.
 */
/**********
 * 该Code属于服务器内部使用与ServiceCode取值没有交集
 * 取值范围1-10000*/
function ModelCode(){
}
/*********************************DATABASE********************************************/
ModelCode.DATABASE_KEY_REPEAT = 1;

/*********************************ARTICLE********************************************/
ModelCode.ARTICLE_NOT_EXIST = 100;
ModelCode.ARTICLE_DELETE_SUCCESS = 101;
ModelCode.ARTICLE_INSERT_SUCCESS = 102;

/*********************************COMMENT********************************************/
ModelCode.COMMENT_NOT_EXIST = 200;
ModelCode.COMMENT_DELETE_SUCCESS = 201;

/*********************************CORNER_FLLOW********************************************/
ModelCode.CORNER_FLLOW_INSERT_SUCCESS = 300;
ModelCode.CORNER_FLLOW_NOT_EXIST = 301;
ModelCode.CORNER_FLLOW_DELETE_SUCCESS = 302;
ModelCode.CORNER_FLLOW_RECORD_REPET = 303;
ModelCode.CORNER_FLLOW_UPDATE_STATE_SUCCESS = 304;

/*********************************CORNER********************************************/
ModelCode.CORNER_INSERT_SUCCESS = 300;
ModelCode.CORNER_NOT_EXIST = 301;

/*********************************UP********************************************/
ModelCode.UP_INSERT_SUCCESS = 400;
ModelCode.UP_DELETE_SUCCESS = 401;
ModelCode.UP_NOT_EXIST = 402;
ModelCode.UP_RECORD_REPEAT = 403;

/*********************************USER_FLLOW********************************************/

ModelCode.USER_FLLOW_INSERT_SUCCESS = 500;
ModelCode.USER_FLLOW_NOT_EXIST = 501;
ModelCode.USER_FLLOW_RECORD_REPEAT = 502;
ModelCode.USER_FLLOW_DELETE_SUCCESS = 503;

/*********************************USER********************************************/
//空
ModelCode.USER_INSERT_SUCCESS = 600;
ModelCode.USER_NOT_EXIST = 601;
module.exports = ModelCode

