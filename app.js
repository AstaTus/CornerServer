var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var promise = require('bluebird');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
promise.promisifyAll(session);
var BaseMsg = require('./message/MessagePacket');
var sqlMgr = require("./database/SqlManager");
var MessagePacket = require("./message/MessagePacket");
var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/app/Register');
var login = require('./routes/app/Login');
var logout = require('./routes/app/Logout');
var publish = require('./routes/app/Publish');
var article = require('./routes/app/Article');
var up = require('./routes/app/Up');
var bsend = require('./routes/send');
var index = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  store: new MongoStore({
    url: 'mongodb://localhost:27017',
  }),
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 1000 * 60 * 24 * 30 }//一个月
}))

//除了login 和 register 不需要session 验证 其他需要
app.use(/^(?!(?:\/app\/Login|\/app\/Register)$)/, function(req, res, next) {
  var session = req.session;
  if(session == null){
    var msg = new BaseMsg();
    msg.result = BaseMsg.RESULT_FAILED;
    msg.resultCode = BaseMsg.RESULT_CODE_SERVER_SESSION_ERROR;
    res.json(msg);
  }else if (session.userGuid == null){
    var msg = new BaseMsg();
    msg.result = BaseMsg.RESULT_FAILED;
    msg.resultCode = BaseMsg.RESULT_CODE_USER_NOT_VERIFY;
    res.json(msg);
  }else{
    next();
  }
})

app.use('/', routes);
app.use('/users', users);
app.use('/app/Register', register)
app.use('/app/Login', login)
app.use('/app/Logout', logout)
app.use('/app/Publish', publish)
app.use('/app/Article', article)
app.use('/app/Up', up)
app.use('/send', bsend)

app.use('/index', index)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var packet = new MessagePacket();
    packet.result = false;
    packet.resultCode = MessagePacket.RESULT_CODE_HTTP_500_ERROR;
    res.json(packet);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var packet = new MessagePacket();
  packet.result = false;
  packet.resultCode = MessagePacket.RESULT_CODE_HTTP_500_ERROR;
  res.json(packet);
});

sqlMgr.init();

module.exports = app;
