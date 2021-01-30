isOnline = require('./../userInfo');
socketToEmail = require('./../socketInfo');

const server = (app) => {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    io.on('connection', socket => {
        console.log('Socket Connection Done!!');
        socket.on('new-user-joined', userEmail => {
            isOnline[userEmail] = 1;
            socketToEmail[socket.id] = userEmail;
            console.log('New User: ' + userEmail + ' joined socket was sent from server');
            socket.broadcast.emit('set-this-active', userEmail);
        });
        socket.on('disconnect', () => {
            email = socketToEmail[socket.id];
            delete socketToEmail[socket.id];
            delete isOnline[email];
            console.log(' User: ' + email + ' left socket was sent from server');
            socket.broadcast.emit('set-this-inactive', email);
        });
    });
    return server;
}

module.exports = server;