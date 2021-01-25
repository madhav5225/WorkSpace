const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config({
    path: './.env'
})

const app = express();
app.use(express.static(__dirname+ '/client'));
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
   res.sendFile('./client/home.html',{root:__dirname});
})


 const route = require('./server/routes/routes');
 app.use(route);

// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// io.on('connection',(socket)=>{
// })

app.listen(process.env.PORT,()=>{
    console.log("listening to port: "+process.env.PORT);
})