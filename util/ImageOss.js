/**
 * Created by AstaTus on 2016/3/4.
 */

var oss = require('ali-oss');
var config = require('../config/OssConfig');
var Store = oss({
    accessKeyId: config.ACCESS_KEY_ID,
    accessKeySecret: config.ACCESS_KEY_SECRET,
    bucket: config.BUCKET,
    region: config.REGION
});

module.exports = Store;
