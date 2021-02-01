const { roomModel, messageModel } = require('../models/db_model');
const messageSchema = require('../models/Schema/messageSchema');
const isOnline = require('../userInfo');

// isOnline = require('./../userInfo');
// socketToEmail = require('./../socketInfo');
const socket_id = [];
const clients = [];
const server = (app) => {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    io.on('connection', socket => {

        console.log('Socket Connection Done!!');
        socket.on('new-user-joined', user_id => {
            console.log('new User active: '+user_id);
            isOnline[user_id]=true;
            socket_id[user_id] = socket.id;
            clients[socket.id] = user_id;
            socket.broadcast.emit('set-this-active', user_id);
        });

        socket.on('send-msg', msgObj => {
            const {
                id,
                room_id,
                msg,
                msg_type,
                sender_id
            } = msgObj;
             console.log('meesage is sent by '+sender_id +'to room_id '+room_id);
            var msgSch = new messageModel({
                id,
                room_id,
                sender_id,
                message_body: msg,
                message_type: msg_type,
            })
            roomModel.findOneAndUpdate(
                { room_id },
                { $push: { messages: msgSch } })
                .exec((err, result) => {
                    if (err || !result) {
                        // nothing for now;
                    }
                    else {
                        var users = result.users;
                        users.forEach(user => {
                            if (user != sender_id) {
                                socket.to(socket_id[user]).emit('successfully-recieve', msgSch);
                            }
                            else {
                                socket.emit('delivered', msgSch);
                            }
                        });
                    }
                });
        })

        socket.on('successfully-seen', msgObj => {
            roomModel.updateOne({ "room_id": msgObj.room_id, "messages.id": msgObj.id }, {
                $set: {
                    "messages.$.is_seen": true
                }
            });
            socket.to(socket_id[msgObj.sender_id]).emit('seen', msgObj);
        })
        socket.on('successfully-recieve', msgObj => {
            console.log("reciever: "+msgObj);
            roomModel.updateOne({ "room_id": msgObj.room_id, "messages.id": msgObj.id }, {
                $set: {
                    "messages.$.is_recieved": true
                }
            })
            socket.to(socket_id[msgObj.sender_id]).emit('recieved', msgObj);
        })

        socket.on('disconnect', () => {
            socket.broadcast.emit('set-this-inactive', clients[socket.id]);
            isOnline[clients[socket.id]]=false;
            delete socket_id[clients[socket.id]];
            delete clients[socket.id];

        });
    });
    return server;
}

module.exports = server;