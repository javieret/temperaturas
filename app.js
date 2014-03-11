//Variables de inicialización
var express = require('express');
var routes  = require('./routes');
var http    = require('http');
var path    = require('path');
var app     = express()
, server    = require('http').createServer(app)
, io        = require('socket.io').listen(server);


//Configuración por default del framework
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


//Petición GET para hacer un render del archivo index.html
app.get('/', function(req, res){
	res.sendfile(__dirname + '/public/index.html');
});

app.post('/add', function(req, res){
	io.sockets.emit(1234, req.body.temp);
	res.send ("Temperatura = "+req.body.temp);
});

//Aquí es donde se levanta el servidor para que este funcionando
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
