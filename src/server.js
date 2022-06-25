
const express = require('express');
const redis = require('redis');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const route = require('./routes');
// const { use } = require('express/lib/router');

const db = require('./config/db/connect');
const { JsonWebTokenError } = require('jsonwebtoken');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
};

//connect db
db.connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

// Route init
route(app);

server.listen(process.env.PORT || 3000)
