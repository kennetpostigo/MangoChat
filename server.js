import express from 'express';
import http from 'http';
import routes from './routes.js'

var app = express();
var server = http.createServer(app);

//Makes all static assets/files delivered to client & Setting the port to use.
app.use(express.static(__dirname + '/public'));
app.set('port', 3000);

if (process.env.NODE_ENV === 'development') {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

var io = require('socket.io').listen(server);
io.sockets.on('connection', (socket)=> routes(socket));


//Starts the server and logs in the terminal the port the server is on.
server.listen(app.get('port'), function (){
  console.log('Express server listening on port 3000');
});

module.exports = app;
