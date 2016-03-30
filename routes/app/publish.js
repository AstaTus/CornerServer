/**
 * Created by AstaTus on 2016/2/14.
 */
var express = require('express');
var router = express.Router();
var MessagePacket = require("../../message/MessagePacket");
var PublishMsg = require("../../message/PublishMsg");
var formidable = require('formidable');
var publishService = require("../../service/PublishService");
var promise = require('bluebird');
var ModelCode = require("../../config/ModelCode");
var ServiceCode = require("../../config/ServiceCode");
var LogicError = require("../../util/LogicError");
var log = require("../../util/Log");


router.post('/', function(req, res, next) {
    var form = new formidable.IncomingForm();
    var session = req.session;
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024;
    form.parse(req, function(err, fields, files) {

        if (err != null || files.image == null || fields.cornerGuid == null){
            var packet = new MessagePacket();
            packet.result = false;
            packet.resultCode = MessagePacket.RESULT_CODE_PARAM_ERROR;

            log.getCurrent().error("Publish:" + packet.resultCode);

            res.json(packet);
        }else if(files.image.size > 5 * 1024 * 1024) {
            var packet = new MessagePacket();
            packet.result = false;
            packet.resultCode = ServiceCode.CODE_IMAGE_IS_MORE_THAN_5MB;
            log.getCurrent().error("Publish:" + packet.resultCode);

            res.json(packet);
        }else{
            publishService.publishArticle(session.userGuid, fields.cornerGuid, files.image.path, fields.text)
                .then(checkResult)
                .error(checkErr);
        }
    });


    function checkResult(){
        var packet = new MessagePacket();
        packet.msg = new PublishMsg();
        packet.result = true;

        res.json(packet);
    }

    function checkErr(e){
        var packet = new MessagePacket();
        packet.result = false;
        if (e instanceof LogicError){
            packet.resultCode = e.code;
        }else{
            packet.resultCode = MessagePacket.RESULT_CODE_SERVER_INTER_ERROR;
        }

        log.getCurrent().error("Publish:" + packet.resultCode);

        res.json(packet);
    }
});

module.exports = router;