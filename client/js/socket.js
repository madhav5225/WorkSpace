socket.emit('new-user-joined', currentUser._id);

socket.on('set-this-active', userId => {
    $('#onlineIcon' + user_id[userId]).addClass('online')
});
socket.on('set-this-inactive', userId => {
    $('#onlineIcon' + user_id[userId]).removeClass('online')
});

socket.on('msg-saved', msg => {
    console.log('message-saved');
    if (currentRoom.room_id === msg.room_id) {
        setMessageInList(msg);
    }
})
socket.on('incomming-msg', msg => {
    if (typeof currentRoom != 'undefined') {
        if (currentRoom.room_id === msg.room_id) {
            msg.is_seen = true;
            socket.emit('successfully-seen-by-reciever', msg);
            setMessageInList(msg);
        }
    }
});

socket.on('display-typing', data => {
    if (currentRoom.room_id == data.room_id) {
        setTypingOnChat(data.typing);
    }
    else {
        setTypingOnList(data.sender_id, data.typing);
    }
})
socket.on('recieved', room => {

    if (currentRoom.room_id === room.room_id) {
        messages.forEach(msg => {
            $('#msgIcon' + msg.id).text("done_all");
        });

    }
});
socket.on('set-msg-seen', room => {
    // console.log('message-seen-by-reciever');

    if (currentRoom.room_id === room.room_id) {
        messages.forEach(msg => {
            $('#msgIcon' + msg.id).addClass('seen');
        });

    }
});
