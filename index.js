var arrayUsers = [];
io.on('connection', socket => {
  console.log('co nguoi ket noi nhe: ', socket.id);
  //console.log(socket.adapter.rooms); //liet ke cac room co tren server ra socket.adapter.rooms

  socket.on("client-register", (data) => {
    var name = data.toUpperCase();
    if (arrayUsers.indexOf(name) >= 0) {
      socket.emit('server-send-register-error', 'Tên đã tồn tại đặt tên khác đê bạn ơi...');
    } else {
      arrayUsers.push(name);
      socket.username = name;

      socket.emit('server-send-register-success', name);

      //send data to all user
      io.sockets.emit('server-send-list-data', arrayUsers);
    }
  });

  socket.on("client-logout", () => {
    arrayUsers.splice(arrayUsers.indexOf(socket.username), 1)

    //socket.broadcast phat cho tất cả nhưng khong phát cho mình
    socket.broadcast.emit('server-send-list-data', arrayUsers);

    //subscribe.quit();
  });

  socket.on('user-send-message', (data) => {
    io.sockets.emit('server-send-message', {name: socket.username, message:data});

    if (data !== '') {
      console.log('as: ', data);
      //client.publish('sendMessage', JSON.stringify(data));
    }
  });

  socket.on('start-message', () => {
    var name = socket.username;
    socket.broadcast.emit('start-message', name)
  });

  socket.on('stop-message', () => {
    console.log(socket.username + 'soan');
    socket.broadcast.emit('stop-message', 'stop');
  });

  socket.on('disconnect', () => {
    console.log(socket.id + ' ngat ket noi !!!!');
    arrayUsers.splice(arrayUsers.indexOf(socket.username), 1)

    //socket.broadcast phat cho tất cả nhưng khong phát cho mình
    socket.broadcast.emit('server-send-list-data', arrayUsers);

    subscribe.quit();
  });

  socket.on('create-room', (data) => {
    socket.join(data);
    socket.phong = data;

    var arrayRooms = [];
    for (const [ key, value ] of socket.adapter.rooms) {
      arrayRooms.push(key);
    }

    io.sockets.emit('server-send-rooms', arrayRooms);
    socket.emit('server-send-room-socket', data);
  });

  socket.on('send-message-room', (data) => {
    io.sockets.in(socket.phong).emit('server-chat', data);
  })
  //io.to chat cho tung người
  // io.to('socketId').emit();

  //socket.emit('message', "this is a test"); //sending to sender-client only

  //socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender

  //socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender

  //socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)

  //socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid

  //io.emit('message', "this is a test"); //sending to all clients, include sender

  //io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender

  //io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender

  //socket.emit(); //send to all connected clients

  //socket.broadcast.emit(); //send to all connected clients except the one that sent the message

  //socket.on(); //event listener, can be called on client to execute on server

  //io.sockets.socket(); //for emiting to specific clients

  //io.sockets.emit(); //send to all connected clients (same as socket.emit)

  //io.sockets.on() ; //initial connection from a client.

});