function setUnseenMsgCount(obj)
{
    console.log(user_id[obj.sender_id]);
    console.log(obj.unSeenMessages);
}
function ToneForMessages()
{
    const sound = new Audio() ;
    sound.src = '../resources/web_whatsapp.mp3';
    sound.autoplay = true; 
    //sound.play()
}
try{
socket.emit('new-user-joined', currentUser._id);
}
catch(err){
  alert(err);
}
socket.on('set-this-active', userId => {
    $('#onlineIcon' + user_id[userId]).addClass('online')
});
socket.on('set-this-inactive', userId => {
    $('#onlineIcon' + user_id[userId]).removeClass('online')
});

socket.on('msg-saved', msg => {
   if (typeof currentRoom != 'undefined') {
    if (currentRoom.room_id=== msg.room_id) {
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
        if (typeof messages != 'undefined'){
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
        if (typeof messages != 'undefined'){
        messages.forEach(msg => {
            $('#msgIcon' + msg.id).addClass('seen');
        });
    }
    }
}
});
socket.on('set-unseen-msg-count',obj=>{
    setUnseenMsgCount(obj);
})

