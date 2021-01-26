var User = require("../models/user.js");


const dashBoardController =  (req, res) => {
    if (!req.session.user)
        return res.redirect('/');

    console.log(req.session.user);
    res.sendFile('/dashboard.html', { root: 'client' });
   // socketing();
}
// function socketing()
// {
// const server=require('http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection',socket=>{
//     console.log('Socket Connection Done!!');
//     socket.on('user-joined',name=>{
//         //users[socket.id]=name;
//         //socket.broadcast.emit('user-joined',name);
// console.log('yep');
//     });
// });
// }
module.exports = dashBoardController;