const express = require('express'),
      path = require('path'),
      socketIO = require('socket.io'),
      http = require('http'),
      { generateMessage, generateLocationMessage } = require('./utils/message'),
      { isRealString } = require('./utils/validation'),
      app = express();

app.use(express.static(path.resolve(__dirname, '../public')));
port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }
    else {
      socket.join(params.room);

      // send only to this user (socket)
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

      // send to all user except this user (socket)
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

      callback();
    }
  });

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
});

server.listen(port, () => {
  console.log(`server started @ ${port}`);
});