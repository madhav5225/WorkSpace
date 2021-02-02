

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
socket.on('recieved', room => {
    console.log('message-recieved');

    if (currentRoom.room_id === room.room_id) {
        messages.forEach(msg => {
            $('#msgIcon' + msg.id).text("done_all");
        });

    }
});
socket.on('set-msg-seen', msg => {
    if (currentRoom.room_id === msg.room_id) {
        $('#msgIcon' + msg.id).addClass('seen');
    }
});


// socket.on('user-list', (users) => {
//     users.forEach(i => {
//         $('#user-list').append($('<li>').text(i));
//     });
//     // $('#user-list').append($('<li>').text())
// })
// socket.on('msg',({username,msg})=>{
//     $('#msg-list').append($('<li  class ="left">').text(msg));
// })
// // function sendMsg(){
// //     var msg = document.getElementById('textMsg').value;
// //     if(msg!=''){
// //         console.log(msg);
// //         socket.emit('msg',{username,msg});
// //         $('#msg-list').append($('<li  class ="right">').text(msg));
// //         document.getElementById('textMsg').value='';
// //     }
// // };
