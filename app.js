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
    environments = require('./routes/environments')()
    ;
app.use('/', index);
app.use('/environments', environments);

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(config.app.port);
log.info("Server started at %s", config.app.port);

module.exports = app;
