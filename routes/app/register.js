/**
 * Created by AstaTus on 2016/1/1.
 */

var express = require('express');
var router = express.Router();
var RegisterMsg = require("../../message/RegisterMsg");
var BaseMsg = require("../../message/BaseMsg");
var userService = require("../../service/UserService")
var CodeConfig = require("../../config/CodeConfig")
router.post('/', function(req, res, next) {
    var params = req.body;

    userService.register(params.email, params.password, params.nickname, params.birthday, params.sex)
        .then(checkResult)
        .error(checkErr)
        .catch(checkErr);

    function checkResult(valid){
        var msg = new RegisterMsg();
        if (valid){
            msg.state = RegisterMsg.SUCESS;
        }else{
            msg.state = 10;
        }

        res.json(msg);
    }

    function checkErr(e){
        var msg = new RegisterMsg();
        msg.result = BaseMsg.SUCESS;
        msg.code = RegisterMsg.SUCESS;
        if(e.message == CodeConfig.REGISTER_EMAIL_REPEAT){
            msg.code = RegisterMsg.EMAIL_REAPT;
        }
        else if(e.message == CodeConfig.REGISTER_NICKNAME_REPEAT){
            msg.code = RegisterMsg.NICKNAME_REPEAT;
        }
        else if(e.message == CodeConfig.REGISTER_PASSWORD_ERROR){
            msg.code = RegisterMsg.PASSWORD_ERROR;
        }
        else{
            msg.result = BaseMsg.FAILED;
        }

        res.json(msg);
    }
});

module.exports = router;
