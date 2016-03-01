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
var fs = require('fs');
var mkdirp = require('mkdirp');
var pictureConfig = require('../../config/PictureConfig');
var uuid = require('node-uuid');

router.post('/', function(req, res, next) {
    var form = new formidable.IncomingForm();
    var session = req.session;
    var path = pictureConfig.rootPath + session.userGuid;
    form.uploadDir = path;
    form.keepExtensions = true;

    if (!fs.existsSync(path)){
        mkdirp.sync(path, 0777)
    }

    form.parse(req, function(err, fields, files) {

        if (err != null || files.image == null || fields.location == null){
            var packet = new MessagePacket();
            packet.result = MessagePacket.RESULT_FAILED;
            packet.resultCode = MessagePacket.RESULT_CODE_PARAM_ERROR;
            res.json(packet);
        }else{
            var fileName = uuid.v1();
            fs.renameSync(files.image.path, form.uploadDir + '/' + fileName);
            publishService.publishArticle(session.userGuid, 1, session.userGuid + '/' + fileName, fields.text)
                .then(checkResult)
                .error(checkErr);
        }
    });



    function createDir(exists){
        if (!exists){
            return fs.mkdirAsync(path);
        }else{
            return promise.resolve();
        }
    }

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