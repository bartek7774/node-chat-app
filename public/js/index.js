let socket = io();
socket.on('connect', function () {
  console.log('connnect client');
});
socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.emit('createMessage',{
  from: 'bartex',
  text:'Hey'
});

socket.on('newMessage',function (message) {
  console.log(message);
});