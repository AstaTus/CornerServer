/**
 * Created by AstaTus on 2016/1/1.
 */

var express = require('express');
var router = express.Router();
var userService = require("../../service/UserService")
var LoginMsg = require("../../message/LoginMsg");
var BaseMsg = require("../../message/BaseMsg");
var CodeConfig = require("../../config/CodeConfig")

router.post('/', function(req, res, next) {
    var params = req.body;
    userService.login(params.email, params.password).then(checkResult).error(checkErr);

    function checkResult(code){
        var msg = new LoginMsg();
        msg.result = BaseMsg.SUCESS;
        if (code == CodeConfig.LOGIN_EMAIL_NOT_EXIST){
            msg.state = LoginMsg.INFO_ERROR;

        }else if(code == CodeConfig.LOGIN_EMAIL_OR_PASSWORD_ERROR){
            msg.state = LoginMsg.INFO_ERROR;
        }else if (code == CodeConfig.LOGIN_SUCCESS){
            msg.state = LoginMsg.LOGIN_SUCCESS;
        }

        res.json(msg);
    }

    function checkErr(e){
        var msg = new LoginMsg();
        msg.result = BaseMsg.FAILED;

        res.json(msg);
    }
});

module.exports = router;
