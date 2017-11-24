let socket = io();

socket.on('connect', function () {
  console.log('connnect client');
});

socket.on('newMessage', function (message) {
  let li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  console.log(message);
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

$('#message-form').on('submit', function (event) {
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'me',
    text: $('[name=message]').val()
  }, function (data) {
    console.log('Got it!', data);
  });
  $('[name=message]').val('');
});

let sendLoc = $('#send-location');
sendLoc.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Your browser does not support geolocation.');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  })
});