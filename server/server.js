const express = require('express'),
      path = require('path'),
      socketIO = require('socket.io'),
      http = require('http'),
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

  socket.on('createMessage', (message) => {
    console.log(`createMessage: ${JSON.stringify(message, null, 2)}`);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });  
  });

});

server.listen(port, () => {
  console.log(`server started @ ${port}`);
});