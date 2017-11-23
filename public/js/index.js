let socket = io();

socket.on('connect', function () {
  console.log('connnect client');
});

socket.on('newMessage', function (message) {
  console.log(message);
  let li=$('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

// socket.emit('createMessage', {
//   from: 'Tom',
//   text: 'Hey'
// }, function (data) {
//   console.log('Got it!', data);
// });


$('#message-form').on('submit', function (event) {
  event.preventDefault();
  socket.emit('createMessage',{
    from: 'me',
    text: $('[name=message]').val()
  }, function (data) {
    console.log('Got it!', data);
  });
  $('[name=message]').val('');
});