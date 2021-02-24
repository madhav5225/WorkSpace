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
    $('#messenger' + user_id[userId]).addClass('user-active')
    if (friendUser != undefined && friendUser.id == userId) {
        $('#onScreen-status').text("online");
    }
});
socket.on('set-this-inactive', userId => {
    $('#messenger' + user_id[userId]).removeClass('user-active')
    if (friendUser != undefined && friendUser.id == userId) {
        $('#onScreen-status').text("offline");
    }
});

socket.on('msg-saved', msg => {
    if (typeof currentRoom != 'undefined') {
        if (currentRoom.room_id === msg.room_id) {
            setMessageInList(msg);
        }
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
    $('#messenger' + user_id[msg.sender_id]).parent().prepend($('#messenger' + user_id[msg.sender_id]));

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
socket.on('recieved', room => {
    if (typeof currentRoom != 'undefined') {
        if (currentRoom.room_id === room.room_id) {
            if (typeof messages != 'undefined') {
                messages.forEach(msg => {
                    $('#msgIcon' + msg.id).text("done_all");
                });
            }
        }
    }
});
socket.on('set-msg-seen', room => {
    // console.log('message-seen-by-reciever');
    if (typeof currentRoom != 'undefined') {
        if (currentRoom.room_id === room.room_id) {
            if (typeof messages != 'undefined') {
                messages.forEach(msg => {
                    $('#msgIcon' + msg.id).addClass('seen');
                });
            }
        }
    }
});
socket.on('set-unseen-msg-count', obj => {
    setUnseenMsgCount(obj);
})
socket.on('Collabrative-Insert-to-Client', data => {
    var characterCode = data.characterCode;
    var character = String.fromCharCode(characterCode);

    console.log(character);
    console.log(characterCode);
    
    friendUserCursor = data.friendUserCursor;
    if (characterCode == 8) {
        console.log('here');
        
        document.getElementById('collabrativeArea').value =
        document.getElementById('collabrativeArea').value.substring(0, friendUserCursor) +
         document.getElementById('collabrativeArea').value
            .substring(friendUserCursor+1, document.getElementById('collabrativeArea').value.length);
    if (friendUserCursor < currentUserCursor)
        currentUserCursor--;
    }
    else {
        document.getElementById('collabrativeArea').value =
            document.getElementById('collabrativeArea').value.substring(0, friendUserCursor) +
            character
            + document.getElementById('collabrativeArea').value
                .substring(friendUserCursor, document.getElementById('collabrativeArea').value.length);
        if (friendUserCursor < currentUserCursor)
            currentUserCursor++;
        friendUserCursor++;
    }
})

socket.on('Collabrative-Set-Pointer-to-Client', data => {
    var NewFriendUserCursor = data.NewFriendUserCursor;
    friendUserCursor = NewFriendUserCursor;
console.log(friendUserCursor);
})