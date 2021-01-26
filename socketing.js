
    const server =(app)=>{
        const server=require('http').createServer(app);
        const io = require('socket.io')(server);
        io.on('connection',socket=>{
            console.log('Socket Connection Done!!');
            socket.on('user-joined',name=>{
                //users[socket.id]=name;
                //socket.broadcast.emit('user-joined',name);
        console.log('yep');
            });
        });
        return server;
    }

    module.exports = server;