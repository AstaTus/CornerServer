/**
 * Created by AstaTus on 2016/1/1.
 */

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    var params = req.body;
    userService.login(params.email, params.password).then(checkResult).error(checkErr);

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
