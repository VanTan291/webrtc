
const express = require('express');
const redis = require('redis');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

const route = require('./routes');
const { use } = require('express/lib/router');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));
// app.set('views', './views');
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Route init
route(app);

const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);

client.on('connect', function (error) {
  console.log('connect redis');
});

client.on('error', function (error) {
  console.log('error fail');
});
//set response
function setResponse(username, repos) {
  return `<h2>${username} has ${repos} Github</h2>`;
}

//make request to github for data
async function getRepos(req, res, next) {
  try {
    console.log('Fetching data ....');
    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();
    const repos = data.public_repos;

    //set data to redis
    client.setex(username, 3600, repos);

    res.send(setResponse(username, repos));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

//cage middleware
function cache(req, res, next) {
  const {username} = req.params;

  client.get(username, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(setResponse(username, data));
    } else {
      next();
    }
  })
}

app.get('/repos/:username', cache, getRepos);

var arrayUsers = [];
io.on('connection', socket => {
  console.log('co nguoi ket noi nhe: ', socket.id);
  //console.log(socket.adapter.rooms); //liet ke cac room co tren server ra socket.adapter.rooms

  // const subscribe = redis.createClient();
  // subscribe.subscribe('sendMessage');
  // subscribe.on('message', (channel, message) => {
  //   console.log('channel: ', channel);
  //   console.log('data: ', message);
  // });

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

server.listen(process.env.PORT || 3000)
