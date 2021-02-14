function setUnseenMsgCount(obj) {
    console.log(user_id[obj.sender_id]);
    console.log(obj.unSeenMessages);
}
function ToneForMessages() {
    const sound = new Audio();
    sound.src = '../resources/web_whatsapp.mp3';
    sound.autoplay = true;
    //sound.play()
}
try {
    socket.emit('new-user-joined', currentUser._id);
}
catch (err) {
    alert(err);
}
socket.on('set-this-active', userId => {
    $('#onlineIcon' + user_id[userId]).addClass('online')
});
socket.on('set-this-inactive', userId => {
    $('#onlineIcon' + user_id[userId]).removeClass('online')
});

socket.on('msg-saved', msg => {
    console.log('msg-saved');
    if (typeof currentRoom != 'undefined') {
        console.log('msg-saved2');
        if (currentRoom.room_id === msg.room_id) {
            console.log('msg-saved3');
            console.log(msg);
            setMessageInList(msg);
        }
    }
    var messages = messageObj[msg.reciever_id].messages;
    for (var i = messages.length - 1; i >= 0; i--) {
        if ((msg.reciever_id == messages[i].sender_id)
            || (messages[i].sender_id == msg.sender_id && messages[i].is_recieved == true)) {
            break;
        }
        messageObj[msg.reciever_id].messages[i].is_recieved = true;
        messages[i].is_recieved = true;
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
    $('#messenger'+user_id[msg.sender_id]).parent().prepend($('#messenger'+user_id[msg.sender_id]));
      
    ToneForMessages();
    // setUnseenMsgCount({sender_id:msg.sender_id});
});

socket.on('display-typing', data => {
    if (typeof currentRoom != 'undefined') {
        if (currentRoom.room_id == data.room_id) {
            setTypingOnChat(data.typing);
        }
        else {
            setTypingOnList(data.sender_id, data.typing);
        }
    }
})
socket.on('recieved', roomObj => {
    var messages = messageObj[roomObj.reciever_id].messages;
console.log('msg recieved 1');
    if (typeof currentRoom != 'undefined') {
        for (var i = messages.length - 1; i >= 0; i--) {
            console.log('msg recieved 2');
            if ((roomObj.reciever_id == messages[i].sender_id)
                || (messages[i].sender_id == roomObj.sender_id && messages[i].is_recieved == true)) {
                break;
            }
            if (currentRoom.room_id === roomObj.room_id) {
                console.log('msg recieved 3');
                $('#msgIcon' + messages[i].id).text("done_all");
            }
            messageObj[roomObj.reciever_id].messages[i].is_recieved = true;
            messages[i].is_recieved = true;
        }
    }
    else {
        console.log('msg recieved 4');
        for (var i = messages.length - 1; i >= 0; i--) {
            if ((roomObj.reciever_id == messages[i].sender_id)
                || (messages[i].sender_id == roomObj.sender_id && messages[i].is_recieved == true)) {
                break;
            }
            messageObj[roomObj.reciever_id].messages[i].is_recieved = true;
            messages[i].is_recieved = true;
        }
    }
});
socket.on('set-msg-seen', roomObj => {
     //console.log('message-seen-by-reciever');
    var messages = messageObj[roomObj.reciever_id].messages;

    if (typeof currentRoom != 'undefined') {
        for (var i = messages.length - 1; i >= 0; i--) {
            if ((roomObj.reciever_id == messages[i].sender_id)
                || (messages[i].sender_id == roomObj.sender_id && messages[i].is_seen == true)) {
                break;
            }
          //  console.log('message-seen-by-reciever2');
    
            if (currentRoom.room_id === roomObj.room_id) {
             //   console.log('message-seen-by-reciever3');
    
                $('#msgIcon' + messages[i].id).addClass('seen');
            }
            messageObj[roomObj.reciever_id].messages[i].is_seen= true;
            messages[i].is_seen = true;
        }
    }
    else {
        for (var i = messages.length - 1; i >= 0; i--) {
            if ((roomObj.reciever_id == messages[i].sender_id)
                || (messages[i].sender_id == roomObj.sender_id && messages[i].is_seen== true)) {
                break;
            }
            messageObj[roomObj.reciever_id].messages[i].is_seen = true;
            messages[i].is_seen = true;
        }
    }
});

