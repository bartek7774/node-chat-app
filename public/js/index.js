let socket = io();

socket.on('connect', function () {
  console.log('connnect client');
});

socket.on('newMessage',function (message) {
  console.log(message);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});
