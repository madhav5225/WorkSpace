var messages;
var currentRoom;
function sendMsg(event) {
    event.preventDefault();

    const msg = $('#msg_text').val();
    if (msg != '') {
        const room_id = generateRoomID(currentUser._id, friendUser.id);

        const msgObj = {
            id: messages.length + 1,
            room_id,
            msg,
            msg_type: "txt",
            sender_id: currentUser._id
        }
        socket.emit('send-msg', msgObj);

    }

    $('#msg_text').val('').focus();

}
function setMessageInList(msg) {
    $('#initialMsg').hide();
    if (msg.sender_id == currentUser._id) {
        var listItem = $('<li class="right  message-box" id="msg' + msg.id + '">').text(msg.message_body);
        if (!msg.is_recieved) {
            var statusItem = $('<span class="material-icons " id="msgIcon' + msg.id + '">done</span>');
        }
        else {
            if (!msg.is_seen) {
                var statusItem = $('<span class="material-icons" id="msgIcon' + msg.id + '">done_all</span>');
            }
            else {
                var statusItem = $('<span class="material-icons seen" id="msgIcon' + msg.id + '">done_all</span>');
            }
        }
        $('.chat_ul').append(listItem.append(statusItem));
    }
    else {
        var listItem = $('<li class="left  message-box" id="msg' + msg.id + '">').text(msg.message_body);
        $('.chat_ul').append(listItem);
    }
}
function setChat(x) {
    $('#initialMsg').show();
    var chatList = $('<ul class="chat_ul chat_conatiner w-100" style="list-style-type: none;""></ul>')

    $('#messageHolder').html(chatList);

    friendUser = userList[x];

    var fullName = friendUser.fname + ' ' + friendUser.lname;

    $('#chat-title').text(fullName)

    const room_id = generateRoomID(currentUser._id, friendUser.id);
    $.get('/roomInfo', { room_id, user1: currentUser._id, user2: friendUser.id }, function (room) {
        console.log("room info collected : " + room_id);
        currentRoom = room;
        messages = currentRoom.messages;
        if (messages.length !== 0) {
            messages.forEach(msg => {
                if(msg.sender_id!=currentUser._id){
                    if(!msg.is_recieved){
                        socket.emit('successfully-recieve', msg);
                    }
                    if (!msg.is_seen) {
                        socket.emit('successfully-seen', msg);
                    }
                }
                
                setMessageInList(msg);
            });
        }

    })
}