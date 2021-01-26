const socket = (app)=>{
    const http = require('http').Server(app);
    const io = require('socket.io')(http);
    
    io.on('connection',(socket)=>{
    })
    return http;
}

module.exports = socket;