const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var session = require("express-session");
require('dotenv').config({
    path: './.env'
})

const app = express();
//Middlewares
app.use(express.static(__dirname+ '/client'));
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
    session({
      key: "user_sid",
      secret: "somerandonstuffs",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 600000,
      },
    })
  );
app.get('/',(req,res)=>{
   res.sendFile('./client/home.html',{root:__dirname});
})
app.get('/dashboard',(req,res)=>{
          console.log('yep'+req.session.user);
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