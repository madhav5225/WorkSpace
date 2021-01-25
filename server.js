const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config({
    path: './.env'
})

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
   res.sendFile('./client/home.html',{root:__dirname});
})

const route = require('./routes');

app.use(route);

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection',(socket)=>{
})

http.listen(process.env.PORT,()=>{
    console.log("listening to port: "+process.env.PORT);
})