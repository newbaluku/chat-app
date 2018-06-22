const express = require('express'),
      path = require('path'),
      socketIO = require('socket.io'),
      http = require('http'),
      { generateMessage } = require('./utils/message'),
      app = express();

app.use(express.static(path.resolve(__dirname, '../public')));
port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');

  // send only to this user (socket)
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // send to all user except this user (socket)
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });

  socket.on('createMessage', (message) => {
    io.emit('newMessage', generateMessage(message.from, message.text));  
  });

});

server.listen(port, () => {
  console.log(`server started @ ${port}`);
});