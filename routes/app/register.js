/**
 * Created by AstaTus on 2016/1/1.
 */

var express = require('express');
var router = express.Router();
var RegisterMsg = require("../../message/RgisterMsg");
router.post('/', function(req, res, next) {
    var params = req.body;

    userService.register(params.email, params.password, params.nickname, params.birth, params.sex).then(checkResult).error(checkErr);

    function checkResult(valid){

        var msg = new RegisterMsg();
        if (valid){
            msg.state = true;

        }else{
            msg.state = false;

        }

        res.json();
    }

    function checkErr(e){
        log.getCurrent().fatal('userService.login:' + err);
    }
});

module.exports = router;
