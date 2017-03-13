var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express(),
    log4js = require('log4js'),
    log = log4js.getLogger('app'),
    config = require('./config/config')
    ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
//app.use(express.static(path.join(__dirname, 'admin_bootstrap')));



var index = require('./routes/index')(),
    instancesCtrl = require('./controllers/instances')(config),
    instancesRouter = require('./routes/instances')(instancesCtrl)
    ;
app.use('/', index);
app.use('/', instancesRouter);


app.listen(config.app.port);
log.info("Server started at %s", config.app.port);

module.exports = app;
