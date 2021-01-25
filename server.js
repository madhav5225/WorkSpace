const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config({
    path: './.env'
})

const app = express();
<<<<<<< HEAD

app.use(express.static(__dirname));
app.use(bodyParser.json());
=======
app.use(express.static(__dirname+ '/client'));
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
>>>>>>> 7901e2b33433bd2618fabdfb65a1f09ca9d2f4bc

app.get('/',(req,res)=>{
   res.sendFile('./client/home.html',{root:__dirname});
})

<<<<<<< HEAD
const route = require('./routes');

app.use(route);

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection',(socket)=>{
})

http.listen(process.env.PORT,()=>{
=======

 const route = require('./server/routes/routes');
 app.use(route);

// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// io.on('connection',(socket)=>{
// })

app.listen(process.env.PORT,()=>{
>>>>>>> 7901e2b33433bd2618fabdfb65a1f09ca9d2f4bc
    console.log("listening to port: "+process.env.PORT);
})