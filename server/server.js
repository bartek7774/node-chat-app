const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const { generateMessage } = require('./utils/message');


const PORT = process.env.PORT || 5000;
const app = new express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('createMessage', message => {
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to char.'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  socket.on('disconnect', () => {
    console.log('Client was disconnected.');
  });

});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port.`);
});