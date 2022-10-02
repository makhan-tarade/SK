#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('senoirkonnect:server');
var http = require('http');
var path = require('path');
var dotenv = require('dotenv').config();




/**
 * Get port from environment and store in Express.
 */

//const PORT = process.env.PORT || 8080

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

//  -----------------------------------------------------------------------------------------------------------
const { user, users, currentUser } = require('./socket/users');

var io = new require("socket.io")(server);

io.on("connection", (socket) => {
  console.log('connected...');

  // join user
  socket.on('join', ({id, name}) => {
    user(id, name, socket.id);
    console.log(id,name);
    console.log(users)
    socket.emit('joined', {id,name});
  })

  // invite friend
  socket.on('invite-friend', ({senderId, senderName, recieverId}) => {
    socket.emit('friend-request', {senderId, senderName, recieverId})
  })

  //invite video call
  socket.on('invite-video-call', ({ senderId, senderName, senderPic, recieverId, link }) => {
    var vcall = { senderId, senderName, senderPic, recieverId, link };
    console.log(vcall);
    socket.broadcast.emit(`join-video-call-${recieverId}`, { senderId, senderName, senderPic, recieverId, link });
  })

  // invite audio call
  socket.on('invite-audio-call', ({ senderId, senderName, senderPic, recieverId, link }) => {
    var acall = { senderId, senderName, senderPic, recieverId, link };
    console.log(acall);
    socket.emit('join-audio-call', { senderId, senderName, senderPic, recieverId, link });
  })

  // invite chat and send notification
  socket.on('invite-chat', ({senderId, senderName, recieverId}) => {
    socket.emit('chat-notification', {senderId, senderName, recieverId})
  })

  // chat masseges
  socket.on('message-in', ({name, message}) => {
    console.log(name,message);
    socket.emit('massage-out', {name, message})
  })

  // 





  socket.on('joined', (user_name) => {
    console.log(user_name);
  })


});

// ------------------------------------------------------------------------------------------------------------

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
