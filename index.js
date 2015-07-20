
// Express initializes app to be a function handler that you can supply 
//to an HTTP server (as seen in line 8).
// We define a route handler / that gets called when we hit our website home.
// We make the http server listen on port 3000.
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

//*** This will tell us in terminal if user is connected or disconnected ***
io.on('connection', function(socket){ //listen on connection event for incoming sockets
  console.log('a user connected'); //user connected will show in terminal
  socket.on('disconnect', function(){
    console.log('user disconnected');//user disconnected will show in terminal
  });
});

//*** Terminal will display the message that is typed in the chat ***
//*** We will not see the message displayed in the chat just yet, only in terminal ***
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

//*** In order to send an event to everyone, Socket.IO gives us the io.emit ***
io.emit('some event', { for: 'everyone' });

//*** If you want to send a message to everyone except for a certain socket, we have the broadcast flag ***
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

//*** This will send a message to everyone, including the sender ***
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});