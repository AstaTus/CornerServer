/**
 * Created by AstaTus on 2016/2/14.
 */
var express = require('express');
var router = express.Router();
var MessagePacket = require("../../message/MessagePacket");
var PublishMsg = require("../../message/PublishMsg");
var formidable = require('formidable');
var publishService = require("../../service/PublishService");
var Promise = require('bluebird');


router.post('/', function(req, res, next) {
    var form = new formidable.IncomingForm();
    var session = req.session;
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024;
    form.parse(req, function(err, fields, files) {

        if (err != null || files.image == null || fields.cornerGuid == null){
            var packet = new MessagePacket();
            packet.result = MessagePacket.RESULT_FAILED;
            packet.resultCode = MessagePacket.RESULT_CODE_PARAM_ERROR;
            res.json(packet);
        }else if(files.image.size > 5 * 1024 * 1024) {
            var packet = new MessagePacket();
            packet.msg = new PublishMsg();
            packet.result = true;
            packet.msg.mResult = false;
            packet.msg.mCode = PublishMsg.CODE_IMAGE_IS_MORE_THAN_5MB;
            res.json(packet);
        }else{
            publishService.publishArticle(session.userGuid, fields.cornerGuid, files.image.path, fields.text)
                .then(checkResult)
                .error(checkErr);
        }
    });

   /* function createDir(exists){
        if (!exists){
            return fs.mkdirAsync(path);
        }else{
            return promise.resolve();
        }
    }*/

    function checkResult(insertGuid){
        var packet = new MessagePacket();
        packet.msg = new PublishMsg();
        packet.result = true;
        if (insertGuid == 0){
            packet.result = false;
            packet.resultCode = MessagePacket.RESULT_CODE_DATABASE_ERROR;
            //log
        }else{
            packet.msg.mResult = true;
        }

        res.json(packet);
    }

    function checkErr(e){
        var packet = new MessagePacket();
        packet.result = false;
        packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        res.json(packet);
    }
});

module.exports = router;