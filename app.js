var express = require('express');
var routes  = require('./routes');
var http    = require('http');
var path    = require('path');
var app     = express()
, server    = require('http').createServer(app)
, io        = require('socket.io').listen(server);

server.listen(8080);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Nj91nQOpsbv259a'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler());

app.get('/', function(req, res){
	res.sendfile(__dirname + '/public/index.html');
});

setInterval(function(){
	io.sockets.emit(1234, JSON.stringify(Math.floor((Math.random()*40)+1)));
},3000);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
