/**
 * Created by AstaTus on 2016/2/14.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var postService = require("../../service/PostService")

router.post('/', function(req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var session = req.session;
        postService.sendPost(session.userGuid, fields[0], files[0].path, fields[1])
            .then(checkResult)
            .error(checkErr)
    });

    function checkResult(insertGuid){

    }

    function checkErr(e){
        var packet = new MessagePacket();
        packet.result = MessagePacket.RESULT_FAILED;
        packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        res.json(packet);
    }
});

module.exports = router;