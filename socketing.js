
const server = (app) => {
  //  console.log('Socket Connection Done!!');
    const server = require('http').createServer(app);
    console.log('Socket Connection Done1!!');
    const io = require('socket.io')(server);
    console.log('Socket Connection Done2!!');
    io.on('connection', socket => {
        console.log('Socket Connection Done3!!');
        socket.on('new-user-joined', userEmail => {
            console.log('UptoHere2');
            socket.broadcast.emit('set-this-active',userEmail);
        });
    });
    return server;
}

module.exports = server;