/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var config = require('./config');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon(path.join(__dirname, 'src/images/favicon.ico')));
app.use(express.bodyParser({uploadDir: './src/upload'}));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'src') }));
app.use(express.static(path.join(__dirname, 'src')));

// development only
app.set('env', 'development');

if ('development' == app.get('env')) {
    global.staticDomain = config.devStaticDomain;
    global.slateUI = config.devSlateUI;
    app.use(express.errorHandler());
} else {
    global.staticDomain = config.proStaticDomain;
    global.slateUI = config.proSlateUI;
}

routes(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
