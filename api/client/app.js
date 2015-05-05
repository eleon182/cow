var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.get('/api/*', function(req, res) {
    var options = {
        host: 'localhost',
        port: 4001,
        path: req.originalUrl.replace('/api', ''),
        method: 'GET',
        headers: req.headers
    };
    var creq = http.request(options, function(cres) {

        // set encoding
        cres.setEncoding('utf8');

        // wait for data
        cres.on('data', function(chunk) {
            console.log('data');
            res.write(chunk);
        });

        cres.on('close', function() {
            // closed, let's end client request as well
            console.log('close');

            res.writeHead(cres.statusCode);
            res.end();
        });

        cres.on('end', function() {
            // finished, let's finish client request as well
            console.log('end');
            //res.writeHead(cres.statusCode);
            res.end();
        });

    }).on('error', function(e) {
        // we got an error, return 500 error to client and log error
        console.log(e.message);
        res.writeHead(500);
        res.end();
    });

    creq.end();

});
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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(4000);
module.exports = app;
