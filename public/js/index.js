let socket = io();

socket.on('connect', function () {
  console.log('connnect client');
});

socket.on('newMessage', function (message) {
  console.log(message);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.emit('createMessage', {
  from: 'Tom',
  text: 'Hey'
}, function (data) {
  console.log('Got it!', data);
});