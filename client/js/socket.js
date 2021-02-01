const socket = io();

socket.emit('new-user-joined', currentUser._id);

socket.on('set-this-active', userId => {
    $('#onlineIcon' + user_id[userId]).addClass('online')
});
socket.on('set-this-inactive', userId => {
    $('#onlineIcon' + user_id[userId]).removeClass('online')
});

socket.on('delivered', msg => {
    if (currentRoom.room_id === msg.room_id) {
        setMessageInList(msg);
    }
})

socket.on('successfully-recieve', msg => {
    msg.is_recieved = true;
    socket.emit('successfully-recieve', msg);
    if (currentRoom.room_id === msg.room_id) {
        msg.is_seen = true;
        socket.emit('successfully-seen', msg);
        setMessageInList(msg);
    }
});

socket.on('recieved', msg => {
    if (currentRoom.room_id === msg.room_id) {
        $('#msgIcon' + msg.id).text("done_all");
    }
});
socket.on('seen', msg => {
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
