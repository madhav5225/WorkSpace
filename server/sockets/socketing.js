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
            console.log('new User active: ' + user_id);
            isOnline[user_id] = true;
            socket_id[user_id] = socket.id;
            clients[socket.id] = user_id;
            socket.broadcast.emit('set-this-active', user_id);
        });

        socket.on('send-msg', async msgObj => {
            const {
                id,
                room_id,
                msg,
                msg_type,
                sender_id
            } = msgObj;
            console.log('meesage is sent by ' + sender_id + 'to room_id ' + room_id);
            var msgSch = new messageModel({
                is_recieved: false,
                id,
                room_id,
                sender_id,
                message_body: msg,
                message_type: msg_type,
            })
            var roomObj = await roomModel.find({ room_id })
            roomObj.forEach(room => {
                var users = room.users;
                users.forEach(user => {
                    if (user != sender_id) {
                        if (isOnline[user])
                            msgSch.is_recieved = true;
                    }
                });
                room.messages.push(msgSch);
                roomModel.findOneAndUpdate({ room_id },
                    {
                        $push:
                        {
                            messages: msgSch
                        }
                    }).exec((err, result) => {
                        if (err || !result) {
                            // nothing for now;
                            console.log('msg Not Saved');
                        }
                        else {
                            console.log('msg Saved');
                            socket.emit('msg-saved', msgSch);
                            users.forEach(user => {
                                if (user != sender_id) {
                                    socket.to(socket_id[user]).emit('incomming-msg', msgSch);
                                    //console.log(user);
                                }
                            });

                        }

                    })
            });
        });
        socket.on('successfully-seen-by-reciever', msgObj => {
            roomModel.updateOne({ "room_id": msgObj.room_id, "messages.id": msgObj.id }, {
                $set: {
                    "messages.$.is_seen": true
                }
            });
            socket.to(socket_id[msgObj.sender_id]).emit('set-msg-seen', msgObj);
        })
        socket.on('successfully-recieve-by-reciever',async roomObj => {
            console.log("reciever: " + roomObj.room_id);
            var rooms=await roomModel.find({room_id:roomObj.room_id});
            rooms.forEach(room=>{
                var messages=room.messages;
                messages.forEach(message=>{
                  if(message.sender_id!=roomObj.reciever_id)
                  message.is_recieved=true;
                  console.log(message);  
                })
                roomModel.findOneAndUpdate({ room_id:roomObj.room_id },
                    {
                        $set:
                        {
                            messages:messages
                        }
                    }).exec((err,result)=>{
                        console.log(err);
                        console.log(result);
                        
                    });  
            })
            console.log('sending socket to client that message is recieved');
            socket.to(socket_id[roomObj.sender_id]).emit('recieved', roomObj);
        })

        socket.on('disconnect', () => {
            socket.broadcast.emit('set-this-inactive', clients[socket.id]);
            isOnline[clients[socket.id]] = false;
            delete socket_id[clients[socket.id]];
            delete clients[socket.id];

        });
    });
    return server;
}

module.exports = server;