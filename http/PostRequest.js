/**
 * Created by AstaTus on 2016/3/16.
 */
var promise = require('bluebird');
var request = require('request');
var qs = require('querystring');

var PostRequest = function(){

}

PostRequest.prototype.excute = function(url, body){

    return new promise(function (resolve, reject) {

        request.post(url, {form:body}, function (error, response, body) {
            if (error) {
                return reject(error);
            }
            else if (response.statusCode === 200 && body) {
                return resolve(JSON.parse(body));
            }else{
                return reject();
            }
        });
    });
}

module.exports = PostRequest;