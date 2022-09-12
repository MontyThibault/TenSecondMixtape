var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var WebSocketServer = require('ws').Server;

var api = require('./routes/api');

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


app.use('/', express.static('client/public'));

app.use('/api', api);



// 404's are handled client-side by react-router

app.use(function(req, res, next) {

	res.sendFile(__dirname + '/client/public/index.html');

});




var subscribers = new Set();


wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function(ws) {

	subscribers.add(ws);


	ws.on('message', function(message) {

		console.log('Recieved %s', message);

		subscribers.forEach(function(ws) {

			ws.send('Someone said ' + message);

		});

	});


	ws.on('close', function() {


		subscribers.delete(ws);

	});

});



module.exports = app;
