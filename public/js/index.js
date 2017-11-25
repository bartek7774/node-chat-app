let socket = io();

socket.on('connect', function () {
  console.log('connnect client');
});

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('k:mm:ss');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('k:mm:ss');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

$('#message-form').on('submit', function (event) {
  event.preventDefault();
  let message = $('[name=message]');
  socket.emit('createMessage', {
    from: 'me',
    text: message.val()
  }, function () {
    message.val('');
  });
  $('[name=message]').val('');
});

let sendLoc = $('#send-location');
sendLoc.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Your browser does not support geolocation.');
  }
  let locationButton = $('#send-location');

  locationButton.attr({ disabled: true }).text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {

    setTimeout(() => {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, function () {
        locationButton.removeAttr('disabled').text('Send location');
      });
    }, 2000);

  }, function () {
    locationButtonF.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});