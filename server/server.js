const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 5000;

const app = new express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('createMessage', message => {
    message.createdAt = 123;
    io.emit('newMessage', {
      text: message.text,
      from: message.form,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client was disconnected.');
  });

});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port.`);
});