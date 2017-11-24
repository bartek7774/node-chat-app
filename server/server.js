const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const { generateMessage, generateLocationMessage } = require('./utils/message');


const PORT = process.env.PORT || 5000;
const app = new express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to char.'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  socket.on('createLocationMessage', (coords, callback) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    callback();
  });

  socket.on('disconnect', () => {
    console.log('Client was disconnected.');
  });

});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port.`);
});