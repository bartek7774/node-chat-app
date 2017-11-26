const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const { Users } = require('./utils/users');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

const PORT = process.env.PORT || 5000;
const app = new express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required.');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getListUsers(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat.'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });


  socket.on('createLocationMessage', (coords, callback) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    callback();
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      socket.to(user.room).emit('updateUserList',users.getListUsers(user.room));
      socket.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
    }
  });

});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port.`);
});