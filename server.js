
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs')
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.redirect(`/${uuidV4()}`)
// })

// app.get('/:room', (req, res) => {
//   res.render('room', { roomId: req.params.room })
// })

// io.on('connection', socket => {
//   socket.on('join-room', (roomId, userId) => {
//     socket.join(roomId)
//     socket.to(roomId).emit('user-connected', userId)

//     socket.on('disconnect', () => {
//       socket.to(roomId).emit('user-disconnected', userId)
//     })
//   })
// });

app.get('/', (req, res) => {
  res.render('home');
});
io.on('connection', socket => {
  console.log('co nguoi ket noi nhe: ', socket.id);

  //socket phat cho chính nó
  socket.on('disconnect', () => {
    console.log(socket.id + ' ngat ket noi !!!!');
  })

  socket.on("client-send-data", (data) => {
    console.log(data)

    //io.sockets phát cho tất cả mọi người lấy từ serve ra
    // io.sockets.emit('server-send-data', data + '888');

    //socket.broadcast phat cho tất cả nhưng khong phát cho mình
    socket.broadcast.emit('server-send-data', data + '888');

    //io.to chat cho tung người
    // io.to('socketId').emit();
  })

});

server.listen(3000)