const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./db');
var cookieParser = require("cookie-parser");

require('dotenv').config({
    path: './config.env'
})

const app = express();
try{
connectDb();
}
catch(err)
{
    console.log(err);
}
//Middlewares
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser('secret'));

// initialize express-session to allow us track the logged-in user across sessions.
// app.use(function(req, res) {
    
//     res.redirect("http://" + req.headers.host + req.url);
// });
var forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
 };

 app.configure(function () {      
    if (env === 'production') {
        app.use(forceSsl);
    }

    // other configurations etc for express go here...
 });
require('./session')(app);

const server = require('./server/sockets/socketing.js')(app);
const route = require('./server/routes/routes.js');

app.use(route);
server.listen(process.env.PORT, () => {
    console.log("listening to port: " + process.env.PORT);
})