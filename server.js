var express = require('express');
var server = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');
var watch = require('node-watch');

var sockets = [];

server
.get('/', function(req, res) {
  return res.sendFile(path.join(__dirname, 'test.html'));
})
.get('*', function(req, res) {
  return res.sendFile(path.join(__dirname, req.url));
});

http.listen(8080, function() {
  console.log('Server Running at 8080');
});

io.on('connection', function(socket) {
  sockets.push(socket);
});

watch('./dist/vdom.js', function(o, n) {
  sockets.forEach(function(socket) {
    socket.emit('refresh');
  });
});