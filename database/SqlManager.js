/**
 * Created by AstaTus on 2015/12/6.
 */

var mysql = require('mysql')
var config = require('../config/DatabaseConfig')
var promise = require('bluebird')

promise.promisifyAll(mysql);
promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);

function SqlManager(){
}

SqlManager.mPool = null;

SqlManager.init = function(){
    SqlManager.mPool = mysql.createPool({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port,
    });
}

SqlManager.excuteSqlAsync = function(sql, options){

    var sql = mysql.format(sql, options);
    //console.log(sql);
    return SqlManager.mPool.queryAsync(sql, options);
}

module.exports = SqlManager
