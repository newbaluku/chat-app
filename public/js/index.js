const socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconected from server');
});

socket.on('newMessage', function (message) {
  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {
  const li = $('<li></li>');
  const a = $(`<a target="_blank" >My current location</a>`);

  // using text and attr methods to add url and text to tags to prevent
  // malicious attempt by user to insert html elements
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);

  $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {

  });
});

const locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('Unable to fetch location');
  });
});