const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./db');
var cookieParser = require("cookie-parser");
var session = require("express-session");
require('dotenv').config({
    path: './config.env'
})

const app = express();

connectDb();

//Middlewares
app.use(express.static(__dirname+ '/client'));
//app.use(bodyParser());
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser('secret'));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
    session({
      key: process.env.session_key,
      secret: process.env.session_secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 24*60*60*1000,
      },
    })
  );

const server = require('./socketing.js')(app);
const route = require('./server/routes/routes.js');
app.use(route);
server.listen(process.env.PORT,()=>{
    console.log("listening to port: "+process.env.PORT);
})