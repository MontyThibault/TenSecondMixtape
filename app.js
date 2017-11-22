var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./server/api');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser({ limit: '4mb' }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', express.static('client/public'));

app.use('/api', api);



// 404's are handled client-side by react-router

app.use(function(req, res, next) {

	res.sendFile(__dirname + '/client/public/index.html');

});



//////////////////
// Database


var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);


mongoose.connect('mongodb://localhost/tensecondmixtape', {
	useMongoClient: true
});

var db = mongoose.connection;


db.on('error', function(e) {

	console.log("Mongoose connection error");

});

db.once('open', function(e) {

	console.log("We are connected to MongoDB!");

});





/////////////////
// Sockets

var clipQueue = require('./server/clipQueue');


var SOCKET_PORT = 3001;


io.on('connection', function(socket) {

	socket.emit('clip', clipQueue.lc.lastClip);

});


http.listen(SOCKET_PORT, function() {

	console.log('listening on ' + SOCKET_PORT);

});




function timer() {

	var time = new Date().getTime();


	clipQueue.dequeue(function(clip) {

		io.emit('clip', clip);


		var lookupTime = new Date().getTime() - time;


		var duration = clip.duration || 10000;

		setTimeout(timer, duration - lookupTime);
	
	});

}

timer();





module.exports = app;