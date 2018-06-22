const socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconected from server');
});

socket.on('newMessage', function (message) {
  console.log(`newMessage: ${JSON.stringify(message, null, 2)}`);
})