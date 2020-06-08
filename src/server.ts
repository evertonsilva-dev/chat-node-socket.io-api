import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
const app = express();
const port = process.env.PORT || 4001;
const server = http.createServer(app);
const io = socketIo(server);

app.use(require('./routes/index'));
let messages = [];
io.on('connection', (socket) => {
  console.log('socket conectado', socket.id);
  socket.emit('previousMessages', messages);
  socket.on('sendMessage', (data) => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  });
});
// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   socket.emit('FromAPI', response);
// };
server.listen(port);
